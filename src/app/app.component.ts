import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReminderService } from './services/reminder.service';
import { View, ViewService } from './services/view.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly VIEW = View;

  currentView = this.viewService.getCurrentView();

  reminderIsActive = false;

  readonly subscriptions: Subscription[] = [];

  constructor(
    private reminderService: ReminderService,
    private viewService: ViewService,
  ) {}

  ngOnInit(): void {
    this.reminderIsActive = this.reminderService.isReminderActive();

    const reminderServiceSubscription =
      this.reminderService.onReminderStatusChange.subscribe((isActive) => {
        this.reminderIsActive = isActive;
      });
    this.subscriptions.push(reminderServiceSubscription);

    const viewServiceSubscription =
      this.viewService.onViewStatusChange.subscribe((view) => {
        this.currentView = view;
      });
    this.subscriptions.push(viewServiceSubscription);
  }

  // Technically, this will never be called. But let's add it anyways to avoid copy-and-paste issues if we decide to split this component up in the future.
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  handleMenuButtonClick(): void {
    const viewToNextViewMap: Record<View, View> = {
      [View.Main]: View.LegalMenu,
      [View.LegalMenu]: View.Main,
      [View.Imprint]: View.LegalMenu,
      [View.Licenses]: View.LegalMenu,
    };

    this.viewService.setCurrentView(viewToNextViewMap[this.currentView]);
  }
}
