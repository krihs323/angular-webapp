import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  
  public titulo: string;
  constructor() {
    this.titulo = 'Pagina de error';
  }

  ngOnInit() {
    console.log('ejecutando componente de error');
  }

}
