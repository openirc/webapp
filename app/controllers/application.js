import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      let notify = this.get('notify');

      this.get('session').invalidate().then(() => {
        notify.success('You have been logged out', {
          closeAfter: 10000
        });
      }).catch((reason) => {
        let message = 'Error logging you out: ';
        if (reason.responseJSON.message instanceof Object) {
          message += 'API error: Please try again.';
        } else {
          message += reason.responseJSON.message;
        }
        notify.alert(message, {
          closeAfter: 10000
        });
      });
    }
  }
});
