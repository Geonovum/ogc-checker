#!/usr/bin/env node
import { createCli } from '@geonovum/standards-checker/cli';
import plugins from './index';

createCli({ name: 'ogc-checker', plugins });
