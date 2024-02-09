import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// comme cela, ils sont tous stockes quelque part...
const regNomObjet:RegExp = new RegExp('^[^\\n\\r\\t\\v\\f]{1,30}$');
const regVersion:RegExp = new RegExp('^[a-zA-Z0-9.]{3,15}$');
const regReference:RegExp = new RegExp('^(AN|AP|XX)\\d{3}$');
const regTelephone:RegExp = new RegExp('^\\d{10}$');
const regDate:RegExp = new RegExp('^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\\d{4}$');
const regMail:RegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
const regMatricule:RegExp = new RegExp('^[a-zA-Z0-9]{7}$');
const regNom:RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');
const regPrenom:RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');
const RegPassword:RegExp = new RegExp('^.{4,128}$');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
