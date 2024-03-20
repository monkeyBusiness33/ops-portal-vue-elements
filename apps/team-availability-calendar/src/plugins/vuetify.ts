import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'

const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#515d8a',
    secondary: '#e5e56b'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme
    }
  },
  defaults: {
    global: {
      ripple: false,
      rounded: 'lg'
    },
    VBtn: {
      variant: 'flat',
      style: 'text-transform: none;'
    }
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  }
})
