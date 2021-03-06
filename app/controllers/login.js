import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Controller.extend({
  session: inject.service(),

  actions: {
    verifyLogin() {
      Ember.$("#loginForm").validate();

      /* FIXME: Make this all less awful */
      if (!Ember.$("#loginForm").valid()) {
        return;
      }

      /* FIXME: Should not have to check this */
      let email = this.get('email');
      let pass = this.get('password');
      let notify = this.get('notify');

      if (!email.length || !pass.length) {
        return;
      }

      this.get('session').authenticate('authenticator:flask', email, pass).then(() => {
        notify.success('You have been logged in.');
      }).catch((reason) => {
        let message = '';

        if (reason.responseJSON == undefined) {
          // API Offline
          message += 'API error: Please try again.';
        } else if (reason.responseJSON.message instanceof Object) {
          // API Error
          message += 'API error: Please try again.';
        } else {
          message += reason.responseJSON.message;
        }

        this.set('errorMessage', message);
      });
    }
  }
});
