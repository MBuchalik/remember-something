import { Component } from '@angular/core';

import { View, ViewService } from '../../services/view.service';

@Component({
  selector: 'app-legal-menu',
  templateUrl: 'legal-menu.component.html',
  styleUrls: ['legal-menu.component.scss'],
})
export class LegalMenuComponent {
  readonly VIEW = View;

  constructor(public viewService: ViewService) {}
}
