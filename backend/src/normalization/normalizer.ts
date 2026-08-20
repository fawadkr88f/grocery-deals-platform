import { NormalizedProduct, OfferPricing, UnitType } from '../types';

// Canonical brand database for identification
const KNOWN_BRANDS = [
  'Dalda',
  'Sufi',
  'Meezan',
  'Canolive',
  'Kashmir',
  'Habib',
  'Olper\'s',
  'MilkPak',
  'Nurpur',
  'Prema',
  'Anhar',
  'Tapal',
  'Lipton',
  'Supreme',
  'Tetley',
  'Surf Excel',
  'Ariel',
  'Brite',
  'Bonus',
  'Guard',
  'Falad',
  'Sunridge',
  'Bake Parlor',
  'Kolson',
  'National',
  'Shan',
  'Mitchell\'s',
  'Knorr',
  'Maggi',
  'Nestle',
  'Coca-Cola',
  'Pepsi',
  'Sprite',
  '7up',
  'Rooh Afza',
  'Jam-e-Shirin',
  'Dettol',
  'Lifebuoy',
  'Lux',
  'Dove',
  'Head & Shoulders',
  'Pampers',
  'Canbebe',
  'Molfix'
];

interface ExtractedSize {
  size: number;
  unit: UnitType;
  normalizedQuantity: number; // In base units (L or kg)
  normalizedUnit: 'L' | 'kg' | 'unit';
}

export class ProductNormalizer {
  /**
   * Extracts canonical brand from product title.
   */
  public extractBrand(title: string, hintBrand?: string): string {
    if (hintBrand && hintBrand.trim().length > 0) {
      return hintBrand.trim();
    }

    for (const brand of KNOWN_BRANDS) {
      const regex = new RegExp(`\\b${brand}\\b`, 'i');
      if (regex.test(title)) {
        return brand;
      }
    }

    // Default to first word if no known brand matches
    const firstWord = title.trim().split(' ')[0];
    return firstWord || 'Generic';
  }

  /**
   * Parses volumetric/mass sizes and converts to standard metric units.
   * Examples:
   *  "Dalda Cooking Oil 5 Liter" -> size: 5, unit: 'L', normalizedQuantity: 5, normalizedUnit: 'L'
   *  "Tapal Danedar Tea 950g"    -> size: 950, unit: 'g', normalizedQuantity: 0.95, normalizedUnit: 'kg'
   *  "Olpers Milk 250ml Pack"   -> size: 250, unit: 'ml', normalizedQuantity: 0.25, normalizedUnit: 'L'
   *  "Guard Basmati Rice 5kg"    -> size: 5, unit: 'kg', normalizedQuantity: 5, normalizedUnit: 'kg'
   */
  public extractSize(title: string): ExtractedSize {
    // 1. Litres / Millilitres
    const mlMatch = title.match(/(\d+(?:\.\d+)?)\s*(?:ml|milliliter|millilitre)s?\b/i);
    if (mlMatch) {
      const val = parseFloat(mlMatch[1]);
      return {
        size: val,
        unit: 'ml',
        normalizedQuantity: val / 1000,
        normalizedUnit: 'L'
      };
    }

    const literMatch = title.match(/(\d+(?:\.\d+)?)\s*(?:l|ltr|liter|litre|liters|litres)\b/i);
    if (literMatch) {
      const val = parseFloat(literMatch[1]);
      return {
        size: val,
        unit: 'L',
        normalizedQuantity: val,
        normalizedUnit: 'L'
      };
    }

    // 2. Kilograms / Grams
    const gramMatch = title.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|gms|gram|grams)\b/i);
    if (gramMatch) {
      const val = parseFloat(gramMatch[1]);
      return {
        size: val,
        unit: 'g',
        normalizedQuantity: val / 1000,
        normalizedUnit: 'kg'
      };
    }

    const kgMatch = title.match(/(\d+(?:\.\d+)?)\s*(?:kg|kgs|kilo|kilogram|kilograms)\b/i);
    if (kgMatch) {
      const val = parseFloat(kgMatch[1]);
      return {
        size: val,
        unit: 'kg',
        normalizedQuantity: val,
        normalizedUnit: 'kg'
      };
    }

    // 3. Pieces / Count (e.g. 12 Eggs, Pack of 6)
    const packMatch = title.match(/(?:pack\s*of\s*|pack\s*-\s*)(\d+)/i) || title.match(/(\d+)\s*(?:pcs|pieces|pack|eggs|tablets)/i);
    if (packMatch) {
      const val = parseFloat(packMatch[1]);
      return {
        size: val,
        unit: 'pack',
        normalizedQuantity: val,
        normalizedUnit: 'unit'
      };
    }

    // Default fallback
    return {
      size: 1,
      unit: 'unit',
      normalizedQuantity: 1,
      normalizedUnit: 'unit'
    };
  }

  /**
   * Cleans title into a normalized canonical product title.
   */
  public cleanProductName(rawTitle: string, brand: string, sizeInfo: ExtractedSize): string {
    let clean = rawTitle
      .replace(new RegExp(`\\b${brand}\\b`, 'gi'), '')
      .replace(/(\d+(?:\.\d+)?)\s*(?:l|ltr|liter|litre|ml|kg|kgs|g|gm|grams)\b/gi, '')
      .replace(/\s*(?:can|bottle|pouch|polybag|box|pack|carton|tin)\b/gi, '')
      .replace(/[^\w\s-]/g, '')
      .trim();

    // Collapse multiple spaces
    clean = clean.replace(/\s+/g, ' ');

    if (!clean) {
      clean = 'Product';
    }

    const unitStr = sizeInfo.size > 0 ? `${sizeInfo.size}${sizeInfo.unit}` : '';
    return `${brand} ${clean} ${unitStr}`.trim();
  }

  /**
   * Calculates regular/sale pricing, discount %, and standard price per unit.
   */
  public calculatePricing(
    regularPrice: number,
    salePrice: number,
    sizeInfo: ExtractedSize,
    currency = 'PKR'
  ): OfferPricing {
    const reg = Math.max(0, regularPrice);
    const sale = Math.max(0, salePrice);
    const savings = Math.max(0, reg - sale);
    const discountPercent = reg > 0 ? Math.round(((reg - sale) / reg) * 1000) / 10 : 0;

    let unitPrice = sale;
    if (sizeInfo.normalizedQuantity > 0) {
      unitPrice = Math.round((sale / sizeInfo.normalizedQuantity) * 100) / 100;
    }

    return {
      regularPrice: reg,
      salePrice: sale,
      savings,
      discountPercent,
      currency,
      unitPrice,
      unit: sizeInfo.normalizedUnit
    };
  }

  /**
   * Normalizes a raw offer payload into a standardized product representation.
   */
  public normalize(
    id: string,
    rawTitle: string,
    category: string,
    hintBrand?: string,
    imageUrl?: string
  ): NormalizedProduct {
    const brand = this.extractBrand(rawTitle, hintBrand);
    const sizeInfo = this.extractSize(rawTitle);
    const normalizedName = this.cleanProductName(rawTitle, brand, sizeInfo);

    return {
      id,
      name: normalizedName,
      brand,
      category,
      packageSize: sizeInfo.size,
      unit: sizeInfo.unit,
      normalizedQuantity: sizeInfo.normalizedQuantity,
      normalizedUnit: sizeInfo.normalizedUnit,
      imageUrl
    };
  }
}

export const normalizer = new ProductNormalizer();
