import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  pais!: Country[]; //! tranquis

  constructor(
    private actvatedRouted: ActivatedRoute, //Cabio al cualquier URL
    private paisService: PaisService) { }
  ngOnInit(): void {
    this.actvatedRouted.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
      )
      .subscribe(country => {
        this.pais = country;
        console.log(country[0]);
      })
    /* this.actvatedRouted.params
      .subscribe(({ id }) => {
        console.log(id);
        this.paisService.getPaisPorAlpha(id)
          .subscribe(pais => {
            console.log(pais);
          });
      }); */
  }

}
