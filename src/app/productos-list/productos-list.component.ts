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
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _productoService:ProductoService
  ) { 
      this.titulo = 'Listado de Productos';
  }

  
  ngOnInit() {
    
    console.log("llamado a metodo getPrueba en el servicio",this._productoService.getPrueba());

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
    
  //console.warn(this.productos);
  console.log('se esta ejecutando el componente de lista de productos');
  
  }

}
