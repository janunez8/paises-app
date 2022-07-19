import { Component, Input } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor: pointer;
    }
  `]
})
export class PorPaisComponent {

  constructor(private paisService: PaisService) { }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    console.log(this.termino);
    this.termino = termino;
    //Para que un observable se ejecute, se debe subscribir
    this.paisService.buscarPais(termino)
      .subscribe(countries => {
        //console.log(countries)
        this.paises = countries;
      }, (err) => {
        console.log(err)
        this.paises = [];
        this.hayError = true;
      });
  }

  sugerencias(termino: string) {
    this.termino = termino;
    this.hayError = false;
    if (termino.length > 0) {
      this.mostrarSugerencias = true;
    } else {
      this.mostrarSugerencias = false;
    }

    this.paisService.buscarPais(termino).subscribe(countries => {
      this.paisesSugeridos = countries.splice(0, 5);

      console.log(countries)
    }, (err) => this.paisesSugeridos = [])

    console.log(termino);
  }



}
