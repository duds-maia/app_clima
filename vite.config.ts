import { defineConfig } from 'vite';

const repoName = '/app_clima/';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/',
});
