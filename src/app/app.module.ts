import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './_utils/http.interceptor';
import { PageModule } from './shared/modules/page/page.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PageModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders],
})
export class AppModule {}
