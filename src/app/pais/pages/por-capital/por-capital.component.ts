import { Component, Input } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {
  constructor(private paisService: PaisService) { }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];



  buscar(termino: string) {
    this.hayError = false;
    console.log(this.termino);
    this.termino = termino;
    //Para que un observable se ejecute, se debe subscribir
    this.paisService.buscarPorCapital(termino)
      .subscribe(countries => {
        console.log("hola")
        console.log(countries)
        this.paises = countries;
      }, (err) => {
        console.log(err)
        this.paises = [];
        this.hayError = true;
      });
  }

  // sugerencias(event: string) {
  //   this.hayError = false;
  //   console.log(event);
  // }

}
