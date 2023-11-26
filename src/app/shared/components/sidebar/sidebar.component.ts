import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SIDEBAR_MENUS } from '../../../app-routing.module';

type Menu = {
  name: string;
  icon: string;
  router: string;
};

export type MenuGroup = {
  name?: string;
  menus: Menu[];
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly groupMenu = SIDEBAR_MENUS;
}
