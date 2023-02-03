import {defineConfig} from 'vuepress/config';

export default defineConfig({
  title: 'Material Components Vue',
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
