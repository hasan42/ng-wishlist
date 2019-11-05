import Axios from 'axios'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // linkPhp = 'http://wishlist.irustam.ru/items.php';
  linkPhp = 'items.php';

  constructor(public http: HttpClient) { }

  
// initial state
state = {
  items: [
    { id: 1, name: 'Картошка', link: 'http://potate.com', description: 'qwe', category: 1, price: 10, done: '0' },
    { id: 2, name: 'Банан', link: 'http://banan.com', description: '', category: 2, price: 20, done: '1' },
    { id: 3, name: 'Яблоко', link: 'http://apple.com', description: '', category: 2, price: 30, done: '0' },
    { id: 4, name: 'Капуста', link: '', description: '', category: 1, price: 40, done: '1' }
  ]
}

  getItems(category) {
    return this.state.items.filter(item => item.category === category)
  }
  getMinPrice(category) {
    let arr = this.state.items.filter(item => item.category === category)
    let min = Math.min.apply(Math, arr.map(item => item.price))
    min = min == Infinity ? 0 : min
    return min
  }
  getMaxPrice(category) {
    let arr = this.state.items.filter(item => item.category === category)
    let max = Math.max.apply(Math, arr.map(item => item.price))
    max = max == -Infinity ? 0 : max
    return max
  }

  getItemsRemote(){
    this.http.get(this.linkPhp).subscribe((value : any) =>{
      this.state.items = value;
    },
    error => {
      console.log(error)
    });
  }

  toggleDone (id) {
    let el = this.state.items.find(item => item.id === id)
    el.done = el.done === '1' ? '0' : '1';


    let formData = new FormData();
    formData.append('actions', 'toggle done');
    formData.append('id', id);
    formData.append('done', el.done);

    this.http.post(this.linkPhp, formData,{responseType: 'text'}).subscribe((value : any) =>{
      this.getItemsRemote()
    },
    error => {
      console.log(error)
    });
  }

  delItem (id) {
    this.http.delete(this.linkPhp, {params: {'id': id}}).subscribe((value : any) =>{
      // console.log(value)
      this.getItemsRemote()
    },
    error => {
      console.log(error)
    });
  }

  delItemsByCategory (id) {
    this.http.delete(this.linkPhp, {params: {'category': id}}).subscribe((value : any) =>{
      // console.log(value)
      this.getItemsRemote()
    },
    error => {
      console.log(error)
    });
  }

  addItem (newItem) {
    let formData = new FormData();
    formData.append('actions', 'add new');
    formData.append('name', newItem.name);
    formData.append('link', newItem.link);
    formData.append('description', newItem.description);
    formData.append('category', newItem.category);
    formData.append('price', newItem.price);

    this.http.post(this.linkPhp, formData).subscribe((value : any) =>{
      this.getItemsRemote()
    },
    error => {
      console.log(error)
    });
  }
}
