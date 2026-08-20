import { RetailerProvider } from './types';

export class RetailerProviderRegistry {
  private providers = new Map<string, RetailerProvider>();

  public register(provider: RetailerProvider): void {
    this.providers.set(provider.id, provider);
  }

  public get(id: string): RetailerProvider | undefined {
    return this.providers.get(id);
  }

  public getAll(): RetailerProvider[] {
    return Array.from(this.providers.values());
  }

  public getByCountry(countryCode: string): RetailerProvider[] {
    const code = countryCode.toUpperCase();
    return this.getAll().filter(p => p.country.toUpperCase() === code);
  }
}

export const providerRegistry = new RetailerProviderRegistry();
