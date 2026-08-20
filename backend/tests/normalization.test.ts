import { describe, it, expect } from 'vitest';
import { normalizer } from '../src/normalization/normalizer';

describe('Product & Price Normalization Engine', () => {
  it('extracts known brands accurately', () => {
    expect(normalizer.extractBrand('Dalda Cooking Oil 5 Liter Can')).toBe('Dalda');
    expect(normalizer.extractBrand('Sufi Canola Oil 5L')).toBe('Sufi');
    expect(normalizer.extractBrand('Olper\'s Pure Milk 1L')).toBe('Olper\'s');
    expect(normalizer.extractBrand('Tapal Danedar Tea 950g')).toBe('Tapal');
  });

  it('normalizes volume variations (Liter, L, ml) to base metric Litres', () => {
    const size5L = normalizer.extractSize('Dalda Cooking Oil 5 Liter Can');
    expect(size5L.size).toBe(5);
    expect(size5L.unit).toBe('L');
    expect(size5L.normalizedQuantity).toBe(5);
    expect(size5L.normalizedUnit).toBe('L');

    const size5000ml = normalizer.extractSize('Dalda Cooking Oil 5000 ml Bottle');
    expect(size5000ml.size).toBe(5000);
    expect(size5000ml.unit).toBe('ml');
    expect(size5000ml.normalizedQuantity).toBe(5);
    expect(size5000ml.normalizedUnit).toBe('L');
  });

  it('normalizes mass variations (kg, g) to base metric Kilograms', () => {
    const size950g = normalizer.extractSize('Tapal Danedar Tea 950g Mega Pack');
    expect(size950g.size).toBe(950);
    expect(size950g.unit).toBe('g');
    expect(size950g.normalizedQuantity).toBe(0.95);
    expect(size950g.normalizedUnit).toBe('kg');

    const size5kg = normalizer.extractSize('Guard Basmati Rice 5kg');
    expect(size5kg.size).toBe(5);
    expect(size5kg.unit).toBe('kg');
    expect(size5kg.normalizedQuantity).toBe(5);
    expect(size5kg.normalizedUnit).toBe('kg');
  });

  it('computes accurate unit price and discount percentages', () => {
    const size5L = normalizer.extractSize('Dalda Cooking Oil 5L Can');
    // Regular: 3999, Sale: 3499
    const pricing = normalizer.calculatePricing(3999, 3499, size5L, 'PKR');

    expect(pricing.savings).toBe(500);
    expect(pricing.discountPercent).toBe(12.5);
    // Unit price = 3499 / 5 = 699.80
    expect(pricing.unitPrice).toBe(699.8);
    expect(pricing.unit).toBe('L');
  });

  it('computes unit price per kg for tea/grains', () => {
    const size950g = normalizer.extractSize('Tapal Danedar Tea 950g');
    // Regular: 1950, Sale: 1649 -> 1649 / 0.95 = 1735.79 per kg
    const pricing = normalizer.calculatePricing(1950, 1649, size950g, 'PKR');

    expect(pricing.savings).toBe(301);
    expect(pricing.unitPrice).toBe(1735.79);
    expect(pricing.unit).toBe('kg');
  });
});
