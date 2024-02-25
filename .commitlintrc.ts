import type {UserConfig} from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 72],
    'header-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'release',
        'revert',
        'style',
        'test'
      ]
    ],
    'scope-enum': [
      1,
      'always',
      [
        // Components
        'multiple', // For when a commit applies to multiple components.
        'button',
        'card',
        'chips',
        'checkbox',
        'circular-progress',
        'data-table',
        'dialog',
        'drawer',
        'fab',
        'floating-label',
        'form-field',
        'icon-button',
        'image-list',
        'layout-grid',
        'line-ripple',
        'linear-progress',
        'list',
        'material-icon',
        'menu',
        'menu-surface',
        'notched-outline',
        'radio',
        'ripple',
        'segmented-button',
        'select',
        'slider',
        'snackbar',
        'switch',
        'tabs',
        'textfield',
        'tooltip',
        'touch-target',

        // Mixins
        'absolutely-positionable',
        'buttonable',
        'focus-trappable',
        'icon-buttonable',
        'linkable',
        'touch-target-wrappable',

        // Dev app
        'dev',

        // Docs app
        'vuepress',

        // Build
        'rollup',
        'webpack',

        // Chores
        'eslint'
      ]
    ]
  }
}

export default Configuration;
