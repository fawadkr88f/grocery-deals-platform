import { describe, it, expect } from 'vitest';
import { calculateDistanceKm, isWithinRadius } from '../src/geolocation/distance';

describe('Haversine Distance & Radius Engine', () => {
  it('calculates 0 km for identical coordinates', () => {
    const dist = calculateDistanceKm(31.4697, 74.4107, 31.4697, 74.4107);
    expect(dist).toBe(0);
  });

  it('calculates correct distance between DHA Phase 6 and Packages Mall Lahore (~5-6 km)', () => {
    // DHA Phase 6 (31.4697, 74.4107) -> Packages Mall (31.4746, 74.3582)
    const dist = calculateDistanceKm(31.4697, 74.4107, 31.4746, 74.3582);
    expect(dist).toBeGreaterThan(4.5);
    expect(dist).toBeLessThan(6.0);
  });

  it('calculates correct distance between DHA Phase 6 and Metro Airport Road (~4-5 km)', () => {
    // DHA Phase 6 (31.4697, 74.4107) -> Metro Airport (31.5034, 74.4082)
    const dist = calculateDistanceKm(31.4697, 74.4107, 31.5034, 74.4082);
    expect(dist).toBeGreaterThan(3.5);
    expect(dist).toBeLessThan(5.0);
  });

  it('correctly validates isWithinRadius flag', () => {
    // Within 10 km
    expect(isWithinRadius(31.4697, 74.4107, 31.4746, 74.3582, 10)).toBe(true);
    // Outside 2 km
    expect(isWithinRadius(31.4697, 74.4107, 31.4746, 74.3582, 2)).toBe(false);
  });
});
