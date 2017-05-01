import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('irc-contexts', 'Integration | Component | irc contexts', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{irc-contexts}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#irc-contexts}}
      template block text
    {{/irc-contexts}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
