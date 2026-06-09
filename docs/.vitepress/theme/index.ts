import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import LucideIcon from './LucideIcon.vue'

const HOME_PATH = '/welcome/introduction.html'

function isRoot(path: string): boolean {
  return path === '/' || path === '/index.html'
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('LucideIcon', LucideIcon)

    // Always default the docs root to the introduction page, including
    // client-side (SPA) navigation such as clicking the logo / site title.
    if (typeof window !== 'undefined') {
      if (isRoot(window.location.pathname)) {
        router.go(HOME_PATH)
      }

      const originalBeforeRouteChange = router.onBeforeRouteChange
      router.onBeforeRouteChange = (to) => {
        if (isRoot(to)) {
          router.go(HOME_PATH)
          return false
        }
        return originalBeforeRouteChange?.(to)
      }
    }
  },
} satisfies Theme
