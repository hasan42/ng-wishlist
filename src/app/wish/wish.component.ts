import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.sass']
})
export class WishComponent implements OnInit {

	faPlus = faPlus;

	form = {
		name: ''
	};

	lists = [
		{ id: 1, name: 'Овощи', done: '0' },
		{ id: 2, name: 'Фрукты', done: '1' }
	];

	constructor( public categoryService: CategoryService ) {
		// this.categoryService.getCategoryRemote()
	}
	ngOnInit() {
		this.categoryService.getCategoryRemote()
	}
	listsStore() {
		return this.categoryService.getCategorys()
	}
	onSubmit(event) {
		this.categoryService.addCategory(this.form.name)
		this.form.name = ''
	}
}
