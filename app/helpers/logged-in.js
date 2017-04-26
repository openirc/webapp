import Ember from 'ember';

export function loggedIn() {
  return window.Cookies.get('auth.token') != undefined;
}

export default Ember.Helper.helper(loggedIn);
