import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AmSelectModule } from '../../projects/am-select-lib/src/lib/am-select.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
