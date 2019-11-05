import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../category.service';
import { ItemService } from '../item.service';
import { faTimes, faPlus, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
	@Input() name: string;
	@Input() id: number;
	@Input() done: string;

	faTimes = faTimes;
	faPlus = faPlus;
	faCircle = faCircle;
	faCheckCircle = faCheckCircle;

	collapseName: string = '';
	collapseActive: boolean = false;

	items = [];

	form = {
		name: '',
		link: '',
		description: '',
		price: null,
		category: null
	};

	newItemName = '';
	newItemLink = '';
	newItemDesc = '';
	newItemPrice = null;

	constructor(public itemService: ItemService, public categoryService: CategoryService) { }

	ngOnInit() {
		this.collapseName = 'collapse-' + this.id;
		this.itemService.getItemsRemote();
	}

	itemsStore () {
		let arr = this.itemService.getItems(this.id);
		arr.sort((a,b)=>{
			return a.price - b.price
		})
		return arr
	}
	showMinPrice (id) {
		return this.itemService.getMinPrice(id)
	}
	showMaxPrice (id) {
		return this.itemService.getMaxPrice(id)
	}

	showCollpase () {
		this.collapseActive = !this.collapseActive
	}
	toggleDone(id) {
		this.categoryService.toggleDone(id)
	}
	onSubmit() {
		this.form.category = this.id;
		this.itemService.addItem(this.form)
		this.form = {
			name: '',
			link: '',
			description: '',
			price: null,
			category: null
		};
	}
	delIt(id) {
		this.categoryService.delCategory(id)
		this.itemService.delItemsByCategory(id)
	}

}
