import { OfferPricing, VerificationStatus } from '../types';

export interface DealScoreInput {
  query?: string;
  category?: string;
  productName: string;
  brand: string;
  pricing: OfferPricing;
  distanceKm: number;
  maxRadiusKm: number;
  verificationStatus: VerificationStatus;
  validUntil?: string | null;
}

export class DealScorer {
  /**
   * Computes composite deal score on a scale from 0 to 100.
   */
  public calculateScore(input: DealScoreInput): number {
    let score = 0;

    // 1. Discount Attractiveness (Max 35 pts)
    // 50% discount yields 35 pts
    const discountScore = Math.min(35, (input.pricing.discountPercent / 50) * 35);
    score += Math.max(0, discountScore);

    // 2. Proximity Score (Max 25 pts)
    // Closer distance yields higher proximity score
    if (input.maxRadiusKm > 0) {
      const proximityFraction = Math.max(0, 1 - input.distanceKm / input.maxRadiusKm);
      score += proximityFraction * 25;
    } else {
      score += 20;
    }

    // 3. Absolute Savings Bonus (Max 20 pts)
    // Higher absolute monetary savings gives additional score points
    const savingsCap = input.pricing.currency === 'PKR' ? 1000 : 20;
    const savingsScore = Math.min(20, (input.pricing.savings / savingsCap) * 20);
    score += Math.max(0, savingsScore);

    // 4. Verification & Reliability Bonus (Max 10 pts)
    switch (input.verificationStatus) {
      case 'verified_retailer':
      case 'verified_today':
        score += 10;
        break;
      case 'promotional_catalog':
        score += 7;
        break;
      case 'price_may_have_changed':
        score += 3;
        break;
      default:
        score += 1;
    }

    // 5. Query Relevance (Max 10 pts)
    if (input.query && input.query.trim().length > 0) {
      const q = input.query.trim().toLowerCase();
      const name = input.productName.toLowerCase();
      const brand = input.brand.toLowerCase();

      if (name.includes(q)) {
        score += 10;
      } else if (brand.includes(q)) {
        score += 8;
      } else {
        score += 3;
      }
    } else {
      score += 10; // Default relevance if no query provided
    }

    // Round to 1 decimal place and clamp between 1.0 and 99.9
    const finalScore = Math.min(99.9, Math.max(1.0, Math.round(score * 10) / 10));
    return finalScore;
  }
}

export const dealScorer = new DealScorer();
