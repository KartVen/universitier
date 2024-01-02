import { Component, HostListener, OnInit } from '@angular/core';
import { WindowService } from './shared/component-services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public static title = 'Universitier';

  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.update(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowService.update(window.innerWidth, window.innerHeight);
  }
}
