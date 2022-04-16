import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ImprintComponent } from './views/imprint/imprint.component';
import { LegalMenuComponent } from './views/legal-menu/legal-menu.component';
import { LicensesComponent } from './views/licenses/licenses.component';
import { MainViewComponent } from './views/main/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ImprintComponent,
    LegalMenuComponent,
    LicensesComponent,
    MainViewComponent,
    OnboardingComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot()],
  bootstrap: [AppComponent],
})
export class AppModule {}
