import * as  singleSpa from 'single-spa';

window.singleSpa = singleSpa

singleSpa.registerApplication(
  'spa',
  () => import('spa/AppModule'),
  location => location.pathname.startsWith('/')
);

singleSpa.start();
