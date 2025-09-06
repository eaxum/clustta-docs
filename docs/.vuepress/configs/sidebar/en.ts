import type { SidebarOptions } from '@vuepress/theme-default'

export const sidebarEn: SidebarOptions = {
  '/guide/': [
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
  ],
  '/advanced/': [
    {
      text: 'Advanced',
      children: [
        '/advanced/architecture.md',
        '/advanced/plugin.md',
        '/advanced/theme.md',
      ],
    },
    {
      text: 'Cookbook',
      children: [
        '/advanced/cookbook/README.md',
        '/advanced/cookbook/usage-of-client-config.md',
        '/advanced/cookbook/adding-extra-pages.md',
        '/advanced/cookbook/making-a-theme-extendable.md',
        '/advanced/cookbook/passing-data-to-client-code.md',
        '/advanced/cookbook/markdown-and-vue-sfc.md',
        '/advanced/cookbook/resolving-routes.md',
      ],
    },
  ],
  '/reference/': [
    {
      text: 'Core',
      collapsible: true,
      children: [
        '/reference/cli.md',
        '/reference/config.md',
        '/reference/frontmatter.md',
        '/reference/components.md',
        '/reference/plugin-api.md',
        '/reference/theme-api.md',
        '/reference/client-api.md',
        '/reference/node-api.md',
      ],
    },
    {
      text: 'Bundlers',
      children: ['/reference/bundler/vite.md', '/reference/bundler/webpack.md'],
    },
    {
      text: 'Ecosystem',
      children: [
        {
          text: 'Default Theme',
          link: 'https://ecosystem.vuejs.press/themes/default/',
        },
        {
          text: 'Plugins',
          link: 'https://ecosystem.vuejs.press/plugins/',
        },
      ],
    },
  ],
}
