// import Axios from 'axios'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // linkPhp = 'http://wishlist.irustam.ru/category.php';
  linkPhp = 'category.php';

  constructor(private http: HttpClient) { }

  
// initial state
	category : any = [
    { id: 1, name: 'Овощи', done: '0' },
    { id: 2, name: 'Фрукты', done: '1' }
  ];

  getCategorys() {
    return this.category
  }

  getCategoryRemote() {
    // console.log('getCategoryRemote')
    this.http.get(this.linkPhp).subscribe((value : any) =>{
      value.sort((a,b)=>{
        return a.done - b.done
      })
      this.category = value;
    },
    error => {
      console.log(error)
    });
  }

  toggleDone(id) {
    let el = this.category.find(item => item.id === id)
    el.done = el.done === '1' ? '0' : '1';

    let formData = new FormData();
    formData.append('actions', 'toggle done');
    formData.append('id', id);
    formData.append('done', el.done);

    this.http.post(this.linkPhp, formData,{responseType: 'text'}).subscribe((value : any) =>{
      this.getCategoryRemote()
    },
    error => {
      console.log(error)
    });
  }

  addCategory(name) {
    let formData = new FormData();
    formData.append('actions', 'add new');
    formData.append('name', name);

    this.http.post(this.linkPhp, formData,{responseType: 'text'}).subscribe((value : any) =>{
      // console.log(value)
      this.getCategoryRemote()
    },
    error => {
      console.log(error)
    });
  }

  delCategory (id) {
    this.http.delete(this.linkPhp, {params: {'id': id}}).subscribe((value : any) =>{
      // console.log(value)
      this.getCategoryRemote()
    },
    error => {
      this.getCategoryRemote()
      console.log(error)
    });
  }
}
