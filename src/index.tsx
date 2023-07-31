import { NativeModules, Platform, Linking } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-installed-app' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const InstalledAppModule = isTurboModuleEnabled
  ? require('./NativeInstalledApp').default
  : NativeModules.InstalledApp;

const InstalledApp = InstalledAppModule
  ? InstalledAppModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export async function isAppInstalled(
  deepLink?: string,
  packageName?: string
): Promise<boolean> {
  try {
    if (Platform.OS === 'ios') {
      return deepLink ? Linking.canOpenURL(deepLink) : Promise.resolve(false);
    } else if (Platform.OS === 'android') {
      return packageName
        ? InstalledApp.isAppInstalled(packageName)
        : Promise.resolve(false);
    }
  } catch (error) {
    Promise.resolve(false);
  }
  return Promise.resolve(false);
}
