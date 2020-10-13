import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { BeersState } from '../beers/beer.state';
import { environment } from 'src/environments/environment';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BASE_URL } from '../tokens';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([BeersState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: 'https://97868f0d-816c-4b6e-a8ba-1ecfc3dd7b6c.mock.pstmn.io', // 👈 postman mock server, copy response from data.json
    },
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
