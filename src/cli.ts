#!/usr/bin/env node
import { createCli } from '@geonovum/standards-checker/cli';
import standards from './standards';

createCli({ name: 'ogc-checker', standards });
