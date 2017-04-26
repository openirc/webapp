import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from './config/environment';
import Ember from 'ember';

const Router = Ember.Router.extend(ApplicationRouteMixin, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('confirm');
});

export default Router;
