import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy as NgTitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Injectable()
export class TitleStrategy extends NgTitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} - ${AppComponent.title}`);
    } else {
      this.title.setTitle(`${AppComponent.title}`);
    }
  }
}

export const titleStrategyProvider = {
  provide: NgTitleStrategy,
  useClass: TitleStrategy,
};
