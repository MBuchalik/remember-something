import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum View {
  Main = 'Main',
  LegalMenu = 'LegalMenu',
  Imprint = 'Imprint',
  Licenses = 'Licenses',
}

/**
 * Instead of using the Router, we simply have a list of possible "Views" we can navigate to.
 * For this small application, this is much easier than using the Router.
 */
@Injectable({
  providedIn: 'root',
})
export class ViewService {
  readonly onViewStatusChange = new Subject<View>();

  private currentView = View.Main;

  getCurrentView(): View {
    return this.currentView;
  }

  setCurrentView(view: View): void {
    this.currentView = view;

    this.onViewStatusChange.next(view);
  }
}
