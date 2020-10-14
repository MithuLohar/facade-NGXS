import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { BeersState } from '../beers/beer.state';
import { environment } from 'src/environments/environment';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BASE_URL } from '../tokens';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([BeersState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(), //@audit-ok //todo redux devtool module
    NgxsDispatchPluginModule.forRoot(), //@audit-ok //todo dispatch Module
    NgxsLoggerPluginModule.forRoot(), //@audit-ok //todo Logger Module
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: 'https://97868f0d-816c-4b6e-a8ba-1ecfc3dd7b6c.mock.pstmn.io', //@audit  //? postman mock server
    },
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
