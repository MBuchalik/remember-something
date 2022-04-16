import { Injectable } from '@angular/core';

const LOCALSTORAGE_KEY_ONBOARDING_SHOWN = 'onboarding-shown';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  shouldShowOnboarding(): boolean {
    const localStorageItem = window.localStorage.getItem(
      LOCALSTORAGE_KEY_ONBOARDING_SHOWN,
    );
    if (localStorageItem == null || localStorageItem !== 'true') {
      return true;
    }

    return false;
  }

  setHasShownOnboarding(): void {
    window.localStorage.setItem(LOCALSTORAGE_KEY_ONBOARDING_SHOWN, 'true');
  }
}
