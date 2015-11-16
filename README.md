jr-crop cordova example application
=====================

A starting project for Ionic that optionally supports using custom SCSS.

Make sure you have the ionic cli installed.

```bash
$ npm install -g ionic
```

CD into the directory, install the plugins, bower components and add the platform:
```bash
cordova plugin add cordova-plugin-camera cordova-plugin-console cordova-plugin-device cordova-plugin-splashscreen cordova-plugin-statusbar cordova-plugin-whitelist ionic-plugin-keyboard &&
bower install &&
ionic platform add ios
```

Then run:

```bash
$ ionic build ios && ionic emulate ios
```