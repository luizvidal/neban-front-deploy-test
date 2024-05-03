import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { LayoutMenuComponent } from '../layout-menu/layout-menu.component';

@Component({
  selector: 'app-layout-sidebar',
  template: `<app-layout-menu />`,
  standalone: true,
  imports: [LayoutMenuComponent],
})
export class LayoutSidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) {}
}
