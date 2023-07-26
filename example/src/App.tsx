import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { isAppInstalled } from 'react-native-installed-app';

export default function App() {
  const [result, setResult] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    isAppInstalled('app-scheme://', 'com.package.name').then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result ? 'true' : 'false'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
