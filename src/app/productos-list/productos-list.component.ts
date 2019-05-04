import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../producto/producto';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  providers: [ProductoService]
})
export class ProductosListComponent implements OnInit {
  public titulo: string;
  public productos: Producto[];
  public url_uploads = GLOBAL.url_uploads;
  public confirmado: any;
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _productoService:ProductoService
  ) { 
      this.titulo = 'Listado de Productos';
  }

  
  ngOnInit() {
    
    console.log("llamado a metodo getPrueba en el servicio",this._productoService.getPrueba());
	this.getProductos();
     
  //console.warn(this.productos);
  console.log('se esta ejecutando el componente de lista de productos');
  
  }

  getProductos(){
	this._productoService.getProductos().subscribe(
		result => {
			 
			if(result.code != 200){
				console.warn(result);
				this.productos = result;
			}else{
				this.productos = result.data;
				console.log("resultado",result);
			}
  
		},
		error => {
			console.log(<any>error);
		}
	);
  }

borrarConfirm(id){
	this.confirmado = id;
}

cancelarConfirm(){
	this.confirmado = null;
}

onDeleteProducto(id: number){
	this._productoService.deleteProducto(id).subscribe(
		response => {
			if(response.code == 200){
				this.getProductos();
			}else{
				alert('Error en el servidor al intentar borrar el producto.');
			}
		},
		error => {
			console.log(<any>error);
		}
	);
}

}
