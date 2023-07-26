import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isAppInstalled(deepLink?: string, packageName?: string): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('InstalledApp');
