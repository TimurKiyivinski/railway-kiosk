import angular from 'angular';
import angularMeteor from 'angular-meteor';
import kiosk from '../imports/components/kiosk/kiosk';
import '../imports/startup/accounts-config.js'

angular.module('Railway-Kiosk', [
  angularMeteor,
  kiosk.name,
  'accounts.ui'
]);

function onReady() {
    angular.bootstrap(document, ['Railway-Kiosk']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
