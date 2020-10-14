import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Beers } from './+state/beers/beer.model';
import { BeersService } from './+state/beers/beer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public removeBeers: Beers[] = [];

  public currentBeer: Beers;

  public beerForm: FormGroup = this.fb.group({
    name: [''],
    first_brewed: [''],
    tagline: [''],
    description: [''],
  });
  public ngAfterViewInit(): void {
    this.beersService.getAllBeers();
  }
  public constructor(
    public beersService: BeersService,
    private fb: FormBuilder
  ) {}
  title = 'Ngxs-facade';
  public chooseBeer(beer: Beers) {
    const idx = this.removeBeers.indexOf(beer);
    this.currentBeer = beer;

    if (idx !== -1) {
      this.removeBeers.splice(idx, 1);
      this.resetBeerForm();
    } else {
      this.removeBeers.push(beer);
      this.beerForm.setValue({
        name: beer.name,
        first_brewed: beer.first_brewed,
        tagline: beer.tagline,
        description: beer.description,
      });
    }
  }
  public getCurrentBeer() {
    this.currentBeer = this.updateBeer(this.currentBeer, this.beerForm.value);
    if (this.beerForm.status === 'VALID' && this.beerForm.dirty) {
      this.beersService.editBeer(this.currentBeer);
    }
  }

  public resetBeerForm() {
    this.beerForm.reset({});
  }

  private updateBeer(beer: Beers, partial: any) {
    return { ...beer, ...partial };
  }
}
