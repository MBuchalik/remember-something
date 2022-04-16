import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Subject } from 'rxjs';

const LOCALSTORAGE_KEY_REMINDER_ACTIVE = 'reminder-active';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  readonly onReminderStatusChange = new Subject<boolean>();

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

    void this.hideAllLocalNotifications();
  }

  private async showLocalNotification(): Promise<void> {
    // Make sure there are no leftover notifications we did not hide for some reason.
    await this.hideAllLocalNotifications();

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
          title: 'Remember Something',
          body: 'I should remind you of something...',
          id: 1,

          ongoing: true,
          autoCancel: false,
        },
      ],
    });
  }

  private async hideAllLocalNotifications(): Promise<void> {
    const { notifications } = await LocalNotifications.getPending();

    await LocalNotifications.cancel({ notifications: notifications });
  }
}
