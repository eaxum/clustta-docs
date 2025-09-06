import type { NavbarOptions } from '@vuepress/theme-default'
import { VERSION } from '../meta.js'

export const navbarEn: NavbarOptions = [
  {
    text: 'Guide',
    children: [
      '/guide/introduction.md',
      '/guide/getting-started.md',
      '/guide/projects.md',
      '/guide/project-settings.md',
      '/guide/assets-and-collections.md',
      '/guide/the-browser.md',
      '/guide/file-states-task-statuses-and-checkpoints.md',
      '/guide/assignations-dependencies-and-syncing.md',
      '/guide/keymap.md',
      '/guide/frequently-asked-questions.md', 
    ],
  },
  // {
  //   text: 'Reference',
  //   children: [
  //     {
  //       text: 'Core',
  //       children: [
  //         {
  //           text: 'CLI',
  //           link: '/reference/cli.html',
  //         },
  //         '/reference/config.md',
  //         '/reference/frontmatter.md',
  //         '/reference/components.md',
  //         '/reference/plugin-api.md',
  //         '/reference/theme-api.md',
  //         '/reference/client-api.md',
  //         '/reference/node-api.md',
  //       ],
  //     },
  //     {
  //       text: 'Bundlers',
  //       children: [
  //         '/reference/bundler/vite.md',
  //         '/reference/bundler/webpack.md',
  //       ],
  //     },
  //     {
  //       text: 'Ecosystem',
  //       children: [
  //         {
  //           text: 'Default Theme',
  //           link: 'https://ecosystem.vuejs.press/themes/default/',
  //         },
  //         {
  //           text: 'Plugins',
  //           link: 'https://ecosystem.vuejs.press/plugins/',
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   text: 'Learn More',
  //   children: [
  //     {
  //       text: 'Advanced',
  //       children: [
  //         '/advanced/architecture.md',
  //         '/advanced/plugin.md',
  //         '/advanced/theme.md',
  //         {
  //           text: 'Cookbook',
  //           link: '/advanced/cookbook/',
  //         },
  //       ],
  //     },
  //     {
  //       text: 'Resources',
  //       children: [
  //         {
  //           text: 'Ecosystem',
  //           link: 'https://ecosystem.vuejs.press/',
  //         },
  //         {
  //           text: 'MarketPlace',
  //           link: 'https://marketplace.vuejs.press',
  //         },
  //         {
  //           text: 'Contributing Guide',
  //           link: 'https://github.com/vuepress/core/blob/main/CONTRIBUTING.md',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // TODO: remove the type assertion
] as NavbarOptions
