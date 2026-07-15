import '@geonovum/standards-checker/index.css';
import { mount } from '@geonovum/standards-checker/ui';
import standards from './standards';

mount(document.getElementById('root')!, standards, {
  title: 'Geonovum OGC Checker',
  githubUrl: 'https://github.com/Geonovum/ogc-checker',
});
