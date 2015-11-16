jr-crop cordova example application
=====================

An example cordova application for the jr-crop library.

Make sure you have the ionic cli installed:

```bash
$ npm install -g ionic
```

Clone and `cd` into the directory, install the plugins, bower components and add the platform:
```bash
cordova plugin add cordova-plugin-camera cordova-plugin-console cordova-plugin-device cordova-plugin-splashscreen cordova-plugin-statusbar cordova-plugin-whitelist ionic-plugin-keyboard &&
bower install &&
ionic platform add ios
```

Then run:

```bash
$ ionic build ios && ionic emulate ios
```