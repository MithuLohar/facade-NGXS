import { DesignModule } from './../design/design.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, DesignModule],
  exports: [DesignModule],
})
export class SharedModule {}
