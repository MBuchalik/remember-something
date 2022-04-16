import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  @Output()
  closeOnboarding = new EventEmitter<void>();
}
