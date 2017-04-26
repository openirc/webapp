import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.try_signout();
  },

  try_signout() {
    let notify = this.get('notify');
    let url = config.APP.API + '/signout';
    let t = this;

    if (!window.Cookies.get('auth.token')) {
      notify.success('You are not signed in', {
        closeAfter: 20000
      });
      t.transitionToRoute('index');
      return;
    }

    Ember.$.ajax({
      url: url,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-OpenIRC-Auth-Token', window.Cookies.get('auth.token'));
      },
      success: function(data) {
        if (data.data == 0) {
          notify.success('You have been logged out', {
            closeAfter: 10000
          });
          window.Cookies.remove('auth.token');
        } else {
          notify.success(data.message, {
            closeAfter: 20000
          });
        }
        t.transitionToRoute('index');
      },
      error: function(textStatus, errorThrown) {
        notify.alert('An internal error has occured. Please try again.', {
          closeAfter: 20000
        });
        t.transitionToRoute('index');
      }
    });
  }
});
