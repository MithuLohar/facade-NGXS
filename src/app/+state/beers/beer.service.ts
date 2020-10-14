import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beers } from './beer.model';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { BeersState } from './beer.state';
import {
  PersistBeersLoadAction,
  PersistBeersDeleteAction,
  PersistBeersEditAction,
} from './beer.actions';
import { BASE_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class BeersService {
  @Select(BeersState)
  public data$: Observable<Beers[]>;

  private baseUrl: string;

  public constructor(private injector: Injector, private http: HttpClient) {
    this.baseUrl = this.injector.get(BASE_URL);
  }

  @Dispatch() //@audit-ok //?dispatch actions
  public getAllBeers() {
    return this.http
      .get<Beers[]>(`${this.baseUrl}/v2/beer`) //@audit-issue //? 👈 post man mock server tags
      .pipe(map((beers) => new PersistBeersLoadAction(beers)));
  }

  @Dispatch() //@audit-ok //?dispatch actions
  public deleteBeers(beers: Beers[]) {
    return new PersistBeersDeleteAction(beers);
  }

  @Dispatch() //@audit-ok //?dispatch actions
  public editBeer(beers: Beers) {
    return new PersistBeersEditAction(beers);
  }
}
