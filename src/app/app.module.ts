import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RbiMatrixComponent } from './rbi-matrix/rbi-matrix.component';


@NgModule({
  declarations: [
    AppComponent,
    RbiMatrixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //MatTableModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
