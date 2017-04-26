import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';
import config from '../config/environment';

export default Base.extend({

  restore(data) {
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      if (data && data.token) {
        resolve(data);
      } else {
        reject(data);
      }
    });

    return promise;
  },

  authenticate(email, pass) {
    let api = config.APP.API + '/signin';
    var request = new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax(api, {
        type: "POST",
        data: {
          email: email,
          pass: pass
        },
        success: function(response) {
          resolve(response);
        },
        error: function(reason) {
          reject(reason);
        }
      });
    });

    return request;
  },

  invalidate(data) {
    let api = config.APP.API + '/signout';
    let auth_token = data.token;
    var request = new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax(api, {
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-OpenIRC-Auth-Token', auth_token);
        },
        success: function(response) {
          resolve(response);
        },
        error: function(reason) {
          reject(reason);
        }
      });
    });

    return request;
  }
});
