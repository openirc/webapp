import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  queryParams: ['token'],
  token: null,

  init() {
    this._super(...arguments);
    this.addObserver('token', this, 'confirm');
    let notify = this.get('notify');
    let t = this;

    /* TODO: Fix this so we aren't guessing when everything is done
     * processing. */
    setTimeout(function() {
      if (!t.token) {
        t.transitionToRoute('index');
        notify.alert('Invalid token', { closeAfter: 3000 });
      }
    }, 450);
  },

  confirm(sender, key, value, rev) {
    if (!this.token) { return }

    let notify = this.get('notify');
    let t = this;
    let url = config.APP.API + '/confirm';

    Ember.$.post(url, {
      token: this.token
    }).done(function(data) {
      if (data.data == 0 || data.data == 1) {
        notify.success(data.message, {
          closeAfter: 10000
        });
        t.transitionToRoute('login');
      } else {
        notify.alert(data.message, {
          closeAfter: 10000
        });
      }
    }).fail(function(xhr, status, error) {
      notify.alert('Error validating confirmation link. Please try again.', {
        closeAfter: 10000
      });
      t.transitionToRoute('index');
    });
  }
});
