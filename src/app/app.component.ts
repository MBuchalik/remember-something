import { Component, OnDestroy, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Subscription } from 'rxjs';

import { OnboardingService } from './services/onboarding.service';
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

  showOnboarding = false;

  readonly subscriptions: Subscription[] = [];

  constructor(
    private onboardingService: OnboardingService,
    private reminderService: ReminderService,
    private viewService: ViewService,
  ) {}

  ngOnInit(): void {
    this.showOnboarding = this.onboardingService.shouldShowOnboarding();

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

    window.setTimeout(() => {
      void StatusBar.setBackgroundColor({ color: '#000000' });
      void SplashScreen.hide();
    }, 0);
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

  handleOnboardingClose(): void {
    this.onboardingService.setHasShownOnboarding();
    this.showOnboarding = false;
  }
}
