import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Subject } from 'rxjs';

const LOCALSTORAGE_KEY_REMINDER_ACTIVE = 'reminder-active';

const LOCAL_NOTIFICATION_ID = 1;
const LOCAL_NOTIFICATION_CHANNEL_ID = 'Channel-1';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  readonly onReminderStatusChange = new Subject<boolean>();

  constructor() {
    void this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.initializeChannel();

    await this.showOrHideLocalNotification();

    await LocalNotifications.addListener(
      'localNotificationActionPerformed',
      () => {
        // For some reason, on Android the notification will be cleared when tapping on it. --> Recreate the notification.
        void this.showOrHideLocalNotification();
      },
    );
  }

  isReminderActive(): boolean {
    const localStorageItem = window.localStorage.getItem(
      LOCALSTORAGE_KEY_REMINDER_ACTIVE,
    );

    if (localStorageItem === 'true') {
      return true;
    }

    return false;
  }

  toggleReminder(): void {
    if (this.isReminderActive()) {
      this.deactivateReminder();
      return;
    }

    this.activateReminder();
  }

  private activateReminder(): void {
    window.localStorage.setItem(LOCALSTORAGE_KEY_REMINDER_ACTIVE, 'true');
    this.onReminderStatusChange.next(true);

    void this.showLocalNotification();
  }

  private deactivateReminder(): void {
    window.localStorage.setItem(LOCALSTORAGE_KEY_REMINDER_ACTIVE, 'false');
    this.onReminderStatusChange.next(false);

    void this.hideLocalNotification();
  }

  private async initializeChannel(): Promise<void> {
    const { channels } = await LocalNotifications.listChannels();

    for (const channel of channels) {
      // We already have created our channel. --> Don't do anything.
      if (channel.id === LOCAL_NOTIFICATION_CHANNEL_ID) {
        return;
      }
    }

    // Remove all channels. This is especially useful for the future if we want to use a new Channel ID. (Using a new Channel ID seems to be required if we want to change something at the channel other than the name or the description, see e.g. https://stackoverflow.com/a/60191482/16058331)
    for (const channel of channels) {
      await LocalNotifications.deleteChannel(channel);
    }

    await LocalNotifications.createChannel({
      id: LOCAL_NOTIFICATION_CHANNEL_ID,
      importance: 3,
      name: 'Remember Something',
      vibration: true,
    });
  }

  private async showOrHideLocalNotification(): Promise<void> {
    if (this.isReminderActive()) {
      await this.showLocalNotification();
      return;
    }

    await this.hideLocalNotification();
  }

  private async showLocalNotification(): Promise<void> {
    // Make sure there are no leftover notifications we did not hide for some reason.
    await this.hideLocalNotification();

    let permissionStatus = await LocalNotifications.checkPermissions();
    if (permissionStatus.display === 'prompt') {
      permissionStatus = await LocalNotifications.requestPermissions();
    }

    if (permissionStatus.display !== 'granted') {
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id: LOCAL_NOTIFICATION_ID,
          channelId: LOCAL_NOTIFICATION_CHANNEL_ID,

          title: 'Remember Something',
          body: 'I should remind you of something...',

          ongoing: true,
          // For some reason, it seems like the notification will still be cleared even if `autoCancel` is set to `false`.
          autoCancel: false,
        },
      ],
    });
  }

  private async hideLocalNotification(): Promise<void> {
    await LocalNotifications.cancel({
      notifications: [{ id: LOCAL_NOTIFICATION_ID }],
    });
  }
}
