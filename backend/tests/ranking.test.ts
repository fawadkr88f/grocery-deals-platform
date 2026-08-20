import { describe, it, expect } from 'vitest';
import { dealScorer } from '../src/ranking/dealScorer';

describe('Deal Scoring & Value Ranker', () => {
  it('rewards higher discount percentages with higher deal scores', () => {
    const scoreLowDiscount = dealScorer.calculateScore({
      productName: 'Dalda Cooking Oil 5L',
      brand: 'Dalda',
      pricing: {
        regularPrice: 4000,
        salePrice: 3800,
        savings: 200,
        discountPercent: 5,
        currency: 'PKR',
        unitPrice: 760,
        unit: 'L'
      },
      distanceKm: 4,
      maxRadiusKm: 10,
      verificationStatus: 'verified_retailer'
    });

    const scoreHighDiscount = dealScorer.calculateScore({
      productName: 'Dalda Cooking Oil 5L',
      brand: 'Dalda',
      pricing: {
        regularPrice: 4000,
        salePrice: 2800,
        savings: 1200,
        discountPercent: 30,
        currency: 'PKR',
        unitPrice: 560,
        unit: 'L'
      },
      distanceKm: 4,
      maxRadiusKm: 10,
      verificationStatus: 'verified_retailer'
    });

    expect(scoreHighDiscount).toBeGreaterThan(scoreLowDiscount);
  });

  it('rewards closer proximity stores with higher scores for equivalent deals', () => {
    const dealFar = dealScorer.calculateScore({
      productName: 'Sufi Oil 5L',
      brand: 'Sufi',
      pricing: {
        regularPrice: 3800,
        salePrice: 3300,
        savings: 500,
        discountPercent: 13,
        currency: 'PKR',
        unitPrice: 660,
        unit: 'L'
      },
      distanceKm: 9.5,
      maxRadiusKm: 10,
      verificationStatus: 'verified_retailer'
    });

    const dealClose = dealScorer.calculateScore({
      productName: 'Sufi Oil 5L',
      brand: 'Sufi',
      pricing: {
        regularPrice: 3800,
        salePrice: 3300,
        savings: 500,
        discountPercent: 13,
        currency: 'PKR',
        unitPrice: 660,
        unit: 'L'
      },
      distanceKm: 1.5,
      maxRadiusKm: 10,
      verificationStatus: 'verified_retailer'
    });

    expect(dealClose).toBeGreaterThan(dealFar);
  });
});
