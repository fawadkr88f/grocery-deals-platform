export interface MarketConfig {
  countryCode: string;
  countryName: string;
  defaultCity: string;
  currencyCode: string;
  currencySymbol: string;
  defaultCoordinates: {
    latitude: number;
    longitude: number;
  };
  supportedRadiiKm: number[];
}

export const SUPPORTED_MARKETS: Record<string, MarketConfig> = {
  PK: {
    countryCode: 'PK',
    countryName: 'Pakistan',
    defaultCity: 'Lahore',
    currencyCode: 'PKR',
    currencySymbol: 'Rs.',
    defaultCoordinates: {
      latitude: 31.4697, // DHA Phase 6, Lahore
      longitude: 74.4107
    },
    supportedRadiiKm: [1, 2, 5, 10, 15, 25]
  },
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    defaultCity: 'Frankfurt am Main',
    currencyCode: 'EUR',
    currencySymbol: '€',
    defaultCoordinates: {
      latitude: 50.1109,
      longitude: 8.6821
    },
    supportedRadiiKm: [1, 2, 5, 10, 15, 25]
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    defaultCity: 'London',
    currencyCode: 'GBP',
    currencySymbol: '£',
    defaultCoordinates: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    supportedRadiiKm: [1, 2, 5, 10, 15, 25]
  },
  US: {
    countryCode: 'US',
    countryName: 'United States',
    defaultCity: 'New York',
    currencyCode: 'USD',
    currencySymbol: '$',
    defaultCoordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    supportedRadiiKm: [1, 2, 5, 10, 15, 25]
  }
};

export const DEFAULT_MARKET = SUPPORTED_MARKETS['PK'];

export const SERVER_CONFIG = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['*']
};
