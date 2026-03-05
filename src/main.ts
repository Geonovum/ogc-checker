import { mount } from '@geonovum/standards-checker-ui';
import specs from './specs';
import './index.css';

mount(document.getElementById('root')!, specs, {
  title: 'Geonovum OGC Checker',
  githubUrl: 'https://github.com/Geonovum/ogc-checker',
});
