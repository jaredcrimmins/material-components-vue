import {defineConfig} from 'vuepress/config';

export default defineConfig({
  title: 'Material Components Vue',
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      }
    ],
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
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/site.webmanifest'
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
    logo: '/material-components-vue-logo.png',
    nav: [
      {text: 'Components', link: '/components/'}
    ]
  }
});
