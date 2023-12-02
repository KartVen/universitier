import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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

  @HostListener('window:scroll', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onScroll(event: any): void {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      this.renderer.setStyle(
        this.matToolbar.nativeElement,
        'position',
        'absolute'
      );
    } else {
      this.renderer.setStyle(
        this.matToolbar.nativeElement,
        'position',
        'relative'
      );
    }
  }

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

  handleToggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  scrolledDown: boolean = false; // Zmienna do śledzenia, czy przewinąłeś stronę w dół
}
