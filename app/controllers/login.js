import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  actions: {
    verifyLogin() {
      let api = config.APP.API + '/signin';
      Ember.$("#loginForm").validate();

      /* FIXME: Make this all less awful */
      if (!Ember.$("#loginForm").valid()) {
        return;
      }

      /* FIXME: Should not have to check this */
      let t = this;
      let email = t.get('email');
      let pass = t.get('password');
      let notify = t.get('notify');

      if (!email.length || !pass.length) {
        return;
      }

      Ember.$.post(api, {
        email: email,
        pass: pass
      }).done(function(data) {
        if (data.data == 0) {
          notify.success(data.message, {
            closeAfter: 20000
          });
          let token = data.token;
          window.Cookies.set('auth.token', token);
          t.transitionToRoute('index');
        } else {
          notify.alert(data.message, {
            closeAfter: 10000
          });
        }
      }).fail(function(xhr, status, error) {
        notify.alert('An internal error has occured. Please try again.', {
          closeAfter: 10000
        });
      });
    }
  }
});
