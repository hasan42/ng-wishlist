import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';
import { faTimes, faPlus, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit {

	@Input() id: number;
	@Input() name: string;
	@Input() link: string;
	@Input() description: string;
	@Input() price: number;
	@Input() done: string;

	faTimes = faTimes;
	faPlus = faPlus;
	faCircle = faCircle;
	faCheckCircle = faCheckCircle;

  constructor(public itemService: ItemService) { }

  ngOnInit() {
  }

  toggleDone(id) {
		this.itemService.toggleDone(id)
  }
  delIt(id) {
		this.itemService.delItem(id)
  }
}
