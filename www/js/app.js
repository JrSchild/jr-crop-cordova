// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'jrCrop'])

.run(function($ionicPlatform, $jrCrop) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var nativeCameraOpts = {
      quality: 90,
      targetWidth: 2000,
      targetHeight: 2000,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: false,
      mediaType: Camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    navigator.camera.getPicture(cameraSuccess, function (err) {
      throw err;
    }, nativeCameraOpts);

    function cameraSuccess(imageURI) {
      console.log(imageURI);

      // An example of `imageURI` is "file:///var/mobile/Containers/Data/Application/F0C5EC0D-23EA-4D43-83BE-A850FA89FCEC/tmp/cdv_photo_005.jpg"
      console.log('Picture source URI: ' + imageURI);  

      // For debugging, to make sure the image coming from `cordova-plugin-camera` is valid.
      angular.element('<img />')
        .bind('load', function(e) {
          console.log('Width: ' + this.naturalWidth);
          console.log('Height: ' + this.naturalHeight);
        })
        .prop('src', imageURI);

      $jrCrop.crop({
        url: imageURI,
        width: 320,
        height: 320,
        title: 'Move and Scale',
        circle: true
      }).then(cropPictureSucc);

      function cropPictureSucc(cropped) {
        console.log('cropped', cropped); // `cropped` is `{}`

        var dataUrl = cropped.toDataURL();  // `toDataUrl` does not exist because `cropped` is an empty object.
        console.log(dataUrl.substr(0, 100));

        // ... send `dataUrl` to the server.
      }
    }

    // setInterval(function () {
    //   console.log('b', $jrCrop, navigator.camera);
    // }, 1000);
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
