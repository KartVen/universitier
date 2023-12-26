import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Data, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserService, Jwt } from '../../../_services/browser.service';
import { Menu } from '../../../app-routing.module';

const MENUS: Menu[] = [
  { name: 'Profil', icon: 'person', router: '/profile' },
  { name: 'Ustawienia', icon: 'settings', router: '/settings' },
];

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  @Input({ required: true }) isSidenavOpened!: boolean;
  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('userButton', { static: true }) userButton!: ElementRef;
  isUserMenuOpened = false;
  menus = MENUS;
  title: string | undefined;
  user!: Jwt | null;

  constructor(
    private route: ActivatedRoute,
    private readonly browserService: BrowserService,
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    this.user = this.browserService.get();
    this.route.data.subscribe((data: Data) => {
      this.title = data['title'] ? data['title'] : 'Universitier';
    });
  }

  handleToggleSidenav() {
    this.toggleSidenav.emit();
  }

  handleToggleUserMenu() {
    this.isUserMenuOpened = !this.isUserMenuOpened;
  }

  logout = () => this.browserService.clean();
}
