import { providerRegistry } from './registry';
import { CarrefourPakistanProvider } from './CarrefourProvider';
import { MetroPakistanProvider } from './MetroProvider';
import { AlFatahProvider } from './AlFatahProvider';
import { ImtiazProvider } from './ImtiazProvider';
import { JalalSonsProvider } from './JalalSonsProvider';
import { GreenValleyProvider } from './GreenValleyProvider';
import { ReweGermanyProvider } from './ReweGermanyProvider';

export function initializeProviders(): void {
  providerRegistry.register(new CarrefourPakistanProvider());
  providerRegistry.register(new MetroPakistanProvider());
  providerRegistry.register(new AlFatahProvider());
  providerRegistry.register(new ImtiazProvider());
  providerRegistry.register(new JalalSonsProvider());
  providerRegistry.register(new GreenValleyProvider());
  providerRegistry.register(new ReweGermanyProvider());
}

export * from './types';
export * from './registry';
