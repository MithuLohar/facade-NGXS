import { DesignModule } from './../design/design.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, DesignModule], //*import Design Module //@audit
  exports: [DesignModule], //*export Design Module
})
export class SharedModule {}
