import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

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
        // dunno how this happens but it shouldn't
        if (reason.responseJSON.message instanceof Object) {
          message += 'API error: Please try again.';
        } else {
          message += reason.responseJSON.message;
        }
        this.set('errorMessage', message);
      });
    }
  }
});
