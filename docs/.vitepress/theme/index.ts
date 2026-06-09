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

    // Always default the docs root to the introduction page.
    if (typeof window !== 'undefined') {
      // Initial direct load of the root in the SPA (dev, or if the server-side
      // redirect is unavailable). Use a hard redirect so the home page layout
      // never partially renders underneath the destination page.
      if (isRoot(window.location.pathname)) {
        window.location.replace(HOME_PATH)
        return
      }

      // In-app navigation to the root (e.g. clicking the logo / site title):
      // cancel it and route to the introduction page instead. This runs before
      // the home page renders, so there is no flash or overlap.
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
