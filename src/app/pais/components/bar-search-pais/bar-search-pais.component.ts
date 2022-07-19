import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-bar-search-pais',
  templateUrl: './bar-search-pais.component.html',
  styleUrls: ['./bar-search-pais.component.css']
})
export class BarSearchPaisComponent implements OnInit {

  constructor() { }

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  termino: string = '';
  @Input() placeholder: string = '';

  buscar() {
    this.onEnter.emit(this.termino);
  }

  ngOnInit() {
    this.debouncer
      .pipe(
        debounceTime(200)
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor);
        console.log("debouncer: " + valor)
      });
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
    console.log(this.termino);
  }


}
