import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Producto } from '../producto/producto';
import { ProductoService } from '../services/producto.service';
import { TrustedString } from '@angular/core/src/sanitization/bypass';

@Component({
  selector: 'producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
  providers: [ProductoService]
})
export class ProductoDetailComponent implements OnInit {
  public titulo: string;
  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.titulo = 'Detalle del producto'
  }

  ngOnInit() {
    console.log('Componente producto detail cargado');
  }

}
