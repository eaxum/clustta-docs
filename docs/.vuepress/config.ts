import { createRequire } from 'node:module'
import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import {
  head,
  navbarEn,
  sidebarEn,
} from './configs/index.js'

const __dirname = getDirname(import.meta.url)
const require = createRequire(import.meta.url)
const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // custom destination in root
  dest: './dist',
  // extra tags in `<head>`
  head,

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Clustta',
      description: 'The best way to do creative work',
    },
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  // configure default theme
  theme: defaultTheme({
    hostname: 'https://clustta.com',
    logo: '/images/hero.png',
    docsDir: 'docs',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbarEn,
        // sidebar
        sidebar: sidebarEn,
        editLinkText: 'Edit this page on GitHub',
      },
    },

    themePlugins: {
      // configure git plugin to disable lastUpdated but keep other features
      git: isProd ? {
        updatedTime: false,
      } : false,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
    },
  }),

  // configure markdown
  markdown: {
    importCode: {
      handleImportPath: (importPath) => {
        // handle @vuepress packages import path
        if (importPath.startsWith('@vuepress/')) {
          const packageName = importPath.match(/^(@vuepress\/[^/]*)/)![1]
          return importPath
            .replace(
              packageName,
              path.dirname(require.resolve(`${packageName}/package.json`)),
            )
            .replace('/src/', '/lib/')
            .replace(/hotKey\.ts$/, 'hotKey.d.ts')
        }
        return importPath
      },
    },
  },

  // use plugins
  plugins: [
    googleAnalyticsPlugin({
      // we have multiple deployments, which would use different id
      id: process.env.DOCS_GA_ID ?? '',
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ],
})
