import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  windowWidth: number = 0;
  windowHeight: number = 0;

  update(screenWidth: number, screenHeight: number) {
    this.windowWidth = screenWidth;
    this.windowHeight = screenHeight;
  }
}
