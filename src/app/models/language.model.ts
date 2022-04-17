export enum Language {
  German = 'de',
  English = 'en',
}

export interface Phrases {
  'welcome!': () => string;
  'got_it!': () => string;
  onboarding_description_html: () => string;

  activate_reminder: () => string;
  deactivate_reminder: () => string;

  notification_title: () => string;
  notification_body: () => string;

  imprint: () => string;
  licenses: () => string;
}
