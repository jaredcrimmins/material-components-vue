import {defineConfig} from 'vuepress/config';

export default defineConfig({
  title: 'Material Components Vue',
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone'
      }
    ]
  ],
  scss: {
    sassOptions: {
      includePaths: ['./node_modules'],
      indentedSyntax: false,
    }
  },
  themeConfig: {
    nav: [
      {text: 'Components', link: '/components/'}
    ]
  }
});
