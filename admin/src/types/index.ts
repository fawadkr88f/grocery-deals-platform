export interface Retailer {
  id: string;
  name: string;
  country: string;
  currency: string;
  website: string;
  logoUrl?: string;
  status: string;
  lastSync: string;
}

export interface Store {
  id: string;
  retailerId: string;
  retailerName: string;
  branchName: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  phone?: string;
  openingHours?: string;
}

export interface DataSource {
  id: string;
  providerId: string;
  retailerName: string;
  feedType: string;
  status: string;
  lastSync: string;
  errorCount: number;
}
