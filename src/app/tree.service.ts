import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private http: HttpClient) {


  }

  // configUrl = 'assets/json/FDChierarchy.json';
  configUrl = 'assets/json/smallFDCHierarchy.json';
  asyncUrl = 'assets/json/asyncData.json';



  // //  configUrl = 'https://althingblob.blob.core.windows.net/treejson/FDChierarchy.json';
  // configUrl = 'https://althingblob.blob.core.windows.net/treejson/smallFDCHierarchy.json';
  // asyncUrl = 'https://althingblob.blob.core.windows.net/treejson/asyncData.json';


  getConfig() {
    return this.http.get(this.configUrl);
  }
  getAsyncData() {
    return this.http.get(this.asyncUrl);
  }



}
