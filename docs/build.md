# Build the app

The app is available on the Google Play Store. However, you can also build it yourself.

## Prerequisites

To build the app, you need:

- An up-to-date version of [NodeJS + NPM](https://nodejs.org/en/)
- [Android Studio](https://developer.android.com/studio)

In the root of this project, first install all dependencies:

```
npm install
```

Then, it is time to build the web assets:

```
npx ionic capacitor build android
```

If you have made changes to the native plugins, use `npx ionic capacitor sync android` instead.

Finally, you can open the app in Android Studio using the following command:

```
npx ionic capacitor open android
```

Now, you can run the app in an emulator or on a real device. Or, you can build a release version of the app. All of this is done in Android Studio and is not part of this documentation. See the [Android Studio Documentation](https://developer.android.com/studio/run) for more details.
