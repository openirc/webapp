import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (window.Cookies.get('auth.token') != undefined) {
      this.get('notify').success('You are already logged in');
      this.transitionTo('index');
    }
  }
});
