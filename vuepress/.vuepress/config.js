const baseHref = !process.env.GITLAB ? '/' : '/portal/';

module.exports = {
  title: 'The portal user guide',
  description: 'Getting started user guide',
  base: baseHref,
  head: [
  ],
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    '/': {
      sidebar: 'auto'
    },
    sidebar: [
      ['/', 'Intro'],
      ['/start/', 'Start'],
      ['/functionality/', 'What you can do'],
      ['/design-portal/', 'Design'],
      ['/docs/', 'Docs'],
    ],
    sidebarDepth: 3,
    navbar: true,
  },
  plugins: [
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
    '@vuepress/pagination',
    '@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
      headerTopOffset: 120
    },
  ],
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-vuepress-code-snippet-enhanced'))
    }
  },
};
