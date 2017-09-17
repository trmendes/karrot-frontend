import { storiesOf } from '@storybook/vue'

import Login from './Login.vue'
import Signup from './Signup.vue'
import i18n from '@/i18n'

storiesOf('Login & Signup', module)
  .add('Login', () => ({
    components: { Login },
    template: `<div id="q-app" style="padding: 2em"><Login @loginDo="loginDo" :error="null"/></div>`,
    i18n,
    methods: {
      loginDo (email, password) {
        this.$emit('loginDo', email, password)
      },
    },
  }))

  .add('Signup', () => ({
    components: { Signup },
    template: '<div id="q-app" style="padding: 2em"><Signup/></div>',
    i18n,
  }))
