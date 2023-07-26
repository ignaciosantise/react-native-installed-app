# react-native-installed-app

Simple tool to detect if an app is installed in the device

## Installation

```sh
npm install react-native-installed-app
```

## Usage

```js
import { isAppInstalled } from 'react-native-installed-app';

// ...

const isInstalled = await isAppInstalled('someapp://', 'com.package.someapp');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
