import { NativeModules, Platform, Linking } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-installed-app' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

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
  if (Platform.OS === 'ios') {
    try {
      let isInstalled = false;
      if (deepLink) {
        isInstalled = await Linking.canOpenURL(deepLink);
      }
      return Promise.resolve(isInstalled);
    } catch (error) {
      Promise.resolve(false);
    }
  } else if (Platform.OS === 'android') {
    return InstalledApp.isAppInstalled(packageName);
  }
  return Promise.resolve(false);
}
