import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isSidenavOpened = true;
  @ViewChild('mat-toolbar', { static: true }) matToolbar!: ElementRef;

  constructor(
    private observer: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe(res => {
      if (res.matches) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
      this.cdRef.detectChanges();
    });
  }

  onScroll(event: any) {
    console.log('dupa');
    console.log(event.target);
  }

  handleToggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  scrolledDown: boolean = false; // Zmienna do śledzenia, czy przewinąłeś stronę w dół
  protected readonly console = console;
}
