import { defineConfig } from 'vite';
import { buildLib } from 'vite-config';
import packageJson from './package.json';

export default defineConfig(buildLib(packageJson.name, __dirname));
