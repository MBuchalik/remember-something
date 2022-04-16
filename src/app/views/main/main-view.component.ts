import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReminderService } from '../../services/reminder.service';

const ANIMATION_DURATION_MILLIS = 1000;

@Component({
  selector: 'app-main-view',
  templateUrl: 'main-view.component.html',
  styleUrls: ['main-view.component.scss'],
  animations: [
    trigger('main-button', [
      state(
        'visible',
        style({
          color: '*',
          width: '*',
          paddingRight: '*',
          paddingLeft: '*',
        }),
      ),
      state(
        'invisible',
        style({
          color: '#ffffff',
          width: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
      ),
      transition('invisible => visible', [
        animate(
          `${ANIMATION_DURATION_MILLIS / 2}ms ${
            ANIMATION_DURATION_MILLIS / 2
          }ms`,
        ),
      ]),
      transition('visible => invisible', [
        animate(`${ANIMATION_DURATION_MILLIS / 2}ms`),
      ]),
    ]),
  ],
})
export class MainViewComponent implements OnInit, OnDestroy {
  reminderIsActive = false;
  buttonText = 'Activate Reminder';

  readonly subscriptions: Subscription[] = [];

  constructor(private reminderService: ReminderService) {}

  ngOnInit(): void {
    this.reminderIsActive = this.reminderService.isReminderActive();

    const reminderServiceSubscription =
      this.reminderService.onReminderStatusChange.subscribe((isActive) => {
        this.reminderIsActive = isActive;

        // Right at the "middle" of the animation, we change the button text.
        window.setTimeout(() => {
          this.updateButtonText();
        }, ANIMATION_DURATION_MILLIS / 2);
      });
    this.subscriptions.push(reminderServiceSubscription);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  toggleReminder(): void {
    this.reminderService.toggleReminder();
  }

  private updateButtonText(): void {
    if (this.reminderIsActive) {
      this.buttonText = 'Deactivate Reminder';
      return;
    }
    this.buttonText = 'Activate Reminder';
  }
}
