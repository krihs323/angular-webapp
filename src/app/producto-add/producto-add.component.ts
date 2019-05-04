import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Producto } from '../producto/producto';
import { ProductoService } from '../services/producto.service';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public filesToUpload;
  public resultUpload;
  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = "Crear Producto";
    this.producto = new Producto(0,'','',0,'');
  }

  ngOnInit() {
    console.log('cargo el componente de crear productos');
  }

  onSubmit(){
	console.log("producto creado",this.producto);
	
	if (this.filesToUpload && this.filesToUpload.length>=1) {
		this._productoService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload ).then((result)=>{
			this.resultUpload = result;
			this.producto.imagen = this.resultUpload.file_name;
			console.log("LA IMAGEN",this.resultUpload);
			this.saveProducto();
		});
	}else{
		this.saveProducto();
	}
    
  }

  saveProducto(){
	this._productoService.addProducto(this.producto).subscribe(
		response => {
			console.log('el producto se guardo', response.code);
			if(response.code == 200){
				this._router.navigate(['/productos']);
			}
		},
		error => {
			console.log(<any>error);
		}
	);
  }

 

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
  }

}
