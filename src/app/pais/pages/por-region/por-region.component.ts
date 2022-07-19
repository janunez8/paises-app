import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = 'americas';

  constructor(private paisService: PaisService) { }

  getClaseCss(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  actviarRegion(region: any) {
    if (region === this.regionActiva) return;

    this.regionActiva = region;
    this.paises = [];
    //TODO: hacer el llmadao al servicio
    this.buscar(region);
  }
  termino: string = '';
  paises: Country[] = [];

  buscar(termino: string) {
    this.termino = termino;
    //Para que un observable se ejecute, se debe subscribir
    this.paisService.getPaisesPorRegion(termino)
      .subscribe(countries => {
        console.log(countries)
        this.paises = countries;
      });
  }
}
