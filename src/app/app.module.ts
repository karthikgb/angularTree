import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FullTreeComponent } from './fulltree/fulltree.component';
import { TreeModule, TreeDraggedElement } from './TreeModule/angular-tree-component';
import { TemplatesComponent } from './templates/template.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    FullTreeComponent,
    TemplatesComponent
  ],
  imports: [
    BrowserModule,
    TreeModule,
    HttpClientModule
  ],
  providers: [TreeDraggedElement],
  bootstrap: [AppComponent]
})
export class AppModule { }
