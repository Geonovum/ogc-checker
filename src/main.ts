import '@geonovum/standards-checker/index.css';
import { mount } from '@geonovum/standards-checker/ui';
import specs from './specs';

mount(document.getElementById('root')!, specs, {
  title: 'Geonovum OGC Checker',
  githubUrl: 'https://github.com/Geonovum/ogc-checker',
});
