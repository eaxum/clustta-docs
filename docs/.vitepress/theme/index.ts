import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import LucideIcon from './LucideIcon.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LucideIcon', LucideIcon)
  },
} satisfies Theme
