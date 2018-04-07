import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AccountsProvider Provider');
  }
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  register_url = "http://localhost:8000/register";
  login_url = "http://localhost:8000/login";
  test_url = "http://localhost:8000/test";
  logout_url = "http://localhost:8000/logout";
  register(data){
    return this.http.post(this.register_url,data,{headers:this.headers});
  }
  login(data){
    return this.http.post(this.login_url,data,{withCredentials: true,headers:this.headers});
  }
  test(){
    return this.http.post(this.test_url,"",{withCredentials: true,
      headers:this.headers});
  }
  logout(){
    return this.http.get(this.logout_url,{withCredentials: true,
      headers:this.headers});
  }

}
