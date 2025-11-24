import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const rootDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (baseConfig) => ({
    ...baseConfig,
    resolve: {
      ...baseConfig.resolve,
      alias: {
        ...(baseConfig.resolve?.alias ?? {}),
        '@': resolve(rootDir, '../src'),
        '@components': resolve(rootDir, '../src/components'),
        '@hooks': resolve(rootDir, '../src/hooks'),
        '@services': resolve(rootDir, '../src/services'),
        '@utils': resolve(rootDir, '../src/utils'),
        '@types': resolve(rootDir, '../src/types'),
        '@schemas': resolve(rootDir, '../src/schemas'),
        '@atoms': resolve(rootDir, '../src/atoms'),
        '@styles': resolve(rootDir, '../src/styles'),
      },
    },
  }),
};

export default config;
