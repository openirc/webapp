import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Component.extend({
  session: inject.service(),
  notify: inject.service(),

  actions: {
    invalidateSession() {
      let notify = this.get('notify');

      this.get('session').invalidate().then(() => {
        notify.success('You have been logged out', {
          closeAfter: 10000
        });
      }).catch((reason) => {
        let message = 'Error logging you out: ';

        if (reason.responseJSON == undefined) {
          // API Offline
          message += 'API error: Please try again.';
        } else if (reason.responseJSON.message instanceof Object) {
          // API Error
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
