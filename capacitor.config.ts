import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.martin_buchalik.remember_something',
  appName: 'Remember Something',
  webDir: 'www',
  bundledWebRuntime: false,

  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_notification',
      iconColor: '#2f86ef',
    },
  },
};

export default config;
