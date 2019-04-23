import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public titulo: string;
	constructor() {
		this.titulo="Bienvenido al curso de Angular";
	}

	ngOnInit() {
		console.log("Se ha cargado el componente Home");
	}

}
