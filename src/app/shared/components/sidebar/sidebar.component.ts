import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuGroup, SIDEBAR_MENUS } from '../../../app-routing.module';
import { BrowserService } from '../../../_services/browser.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  protected groupMenu: MenuGroup[] = [];

  constructor(private browserService: BrowserService) {}

  ngOnInit(): void {
    const jwt = this.browserService.get();
    if (jwt) {
      this.groupMenu = SIDEBAR_MENUS.filter(group => {
        return group.role
          ? group.role.filter(role => jwt.authorities.includes(role)).length > 0
          : true;
      });
    }
  }
}
