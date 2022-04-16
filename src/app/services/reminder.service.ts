import { Injectable } from '@angular/core';
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
  }

  private deactivateReminder(): void {
    window.localStorage.setItem(LOCALSTORAGE_KEY_REMINDER_ACTIVE, 'false');
    this.onReminderStatusChange.next(false);
  }
}
