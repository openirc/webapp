import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  actions: {
    verifySignup() {
      let api = config.APP.API + '/signup';
      Ember.$("#signupForm").validate();

      /* FIXME: Make this all less awful */
      if (!Ember.$("#signupForm").valid()) {
        return;
      }

      /* FIXME: Should not have to check this */
      let email = this.get('email');
      let pass = this.get('password');
      let confpass = this.get('confpass');
      let notify = this.get('notify');

      if (!email.length || !pass.length || !confpass.length) {
        return;
      }

      Ember.$.post(api, {
        email: email,
        pass: pass
      }).done(function(data) {
        if (data.data == 0 || data.data == 1) {
          notify.success(data.message, {
            closeAfter: 20000
          });
          this.transitionToRoute('index');
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
