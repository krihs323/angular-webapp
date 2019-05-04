import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Producto } from '../producto/producto';
import { ProductoService } from '../services/producto.service';
import { GLOBAL } from '../services/global';


@Component({
  selector: 'producto-edit',
  templateUrl: '../producto-add/producto-add.component.html',
  styleUrls: ['./producto-edit.component.css'],
  providers: [ProductoService]
})

export class ProductoEditComponent implements OnInit {
	public titulo: string;
	public producto: Producto;
	public is_edit: boolean;
	public url_uploads = GLOBAL.url_uploads;
	public filesToUpload;
	public resultUpload;
	constructor(
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.titulo = "Editar Producto";
		this.producto = new Producto(1,'','',1,'');
		this.is_edit = true;
	}

  ngOnInit() {
    console.log('el componente editar se cargo correctamente');
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
  
	onSubmit(){
		console.log("producto creado",this.producto);

		if (this.filesToUpload && this.filesToUpload.length>=1) {
			this._productoService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload ).then((result)=>{
			this.resultUpload = result;
			this.producto.imagen = this.resultUpload.file_name;
			console.log("LA IMAGEN",this.resultUpload);
			this.updateProducto();
			});
		}else{
			this.updateProducto();
		}

	}
	
    updateProducto(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.editProducto(id, this.producto).subscribe(
			response => {
				console.log('el producto se guardo', response.code);
				if(response.code == 200){
				this._router.navigate(['/producto',id]);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
		});
    }
  
   
  
    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
    }

}
