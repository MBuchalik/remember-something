import { Phrases } from '../language.model';

export const PHRASES_EN: Phrases = {
  'welcome!': () => 'Welcome!',
  'got_it!': () => 'Got it!',
  onboarding_description_html: () => {
    return `
      Remember Something is probably the world's simplest Reminder App.<br /><br />
      You can't type in what you want to be reminded of. 
      Instead, there is only one button that will remind you of <strong>something</strong>.<br /><br />
      An example: Imagine, you have to do something important today and don't want to forget it.
      Simply press the button "Activate Reminder". 
      You do not need to take any further action.
    `;
  },

  activate_reminder: () => 'Activate Reminder',
  deactivate_reminder: () => 'Deactivate Reminder',

  notification_title: () => 'Remember Something',
  notification_body: () => 'You wanted me to remind you of something...',

  imprint: () => 'Imprint',
  licenses: () => 'Licenses',
};
