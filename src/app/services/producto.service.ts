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
        return this._http.get(this.url);
    }

    getPrueba(){
        return "Hola mundodo desde el servicio peticiones333!!";
    }

  
}
