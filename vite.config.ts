import { sharedConfig } from '@geonovum/standards-checker-ui/vite';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig(mergeConfig(sharedConfig, { base: '/ogc-checker/' }));
