import {Injectable} from '@angular/core';
//import {Http, Response, Headers} from '@angular/http';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

import { Producto } from '../producto/producto';
import { GLOBAL } from './global';

//nueva linea
import 'rxjs/add/operator/map';


@Injectable()
export class ProductoService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getProductos(): Observable<any>{
        return this._http.get(this.url+'productos');
        //return this._http.get(this.url).map(response => response);
    }

    addProducto(producto: Producto): Observable<any>{
        let json = JSON.stringify(producto);
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'productos',params,{headers: headers});
    }

    makeFileRequest(url: string, params: Array<string>,files: Array<File>){
        return new Promise((resolve, reject)=>{
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('uploads[]',files[i],files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("POST",url, true);
            xhr.send(formData);

        });
    }

    getPrueba(){
        return "Hola Mundo desde el servicio peticiones!!";
    }

  
}
