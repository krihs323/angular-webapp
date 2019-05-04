import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Producto } from '../producto/producto';
import { ProductoService } from '../services/producto.service';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
  providers: [ProductoService]
})
export class ProductoDetailComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public url_uploads = GLOBAL.url_uploads;
  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.titulo = 'Detalle del producto'
  }

  ngOnInit() {
    console.log('Componente producto detail cargado');

    this.getProducto();
  }

	getProducto(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.getProducto(id).subscribe(
				result => {
					
					if(result.code == 200){
						this.producto = result.data;
						console.log("el producto",this.producto)
					}else{
						this._router.navigate(['/productos']);
					}
		
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

}
