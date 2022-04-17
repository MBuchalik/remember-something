import { Phrases } from '../language.model';

export const PHRASES_DE: Phrases = {
  'welcome!': () => 'Willkommen!',
  'got_it!': () => 'Verstanden!',
  onboarding_description_html: () => {
    return `
      Remember Something ist die womöglich einfachste Erinnerungs-App der Welt.<br><br>
      Man kann nicht angeben, woran man erinnert werden möchte.
      Es gibt nur einen Button, der einen an <strong>irgendetwas</strong> erinnert.<br><br>
      Ein Beispiel: Wenn du heute noch etwas wichtiges tun musst und es nicht vergessen möchtest, dann klicke einfach auf "Erinnerung aktivieren".
      Mehr musst du nicht tun.
    `;
  },

  activate_reminder: () => 'Erinnerung aktivieren',
  deactivate_reminder: () => 'Erinnerung deaktivieren',

  notification_title: () => 'Remember Something',
  notification_body: () => 'Ich sollte dich an etwas erinnern...',

  imprint: () => 'Impressum',
  licenses: () => 'Lizenzen',
};
