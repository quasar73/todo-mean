import { ItemModel } from './../../shared/models/item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListsService } from './../../shared/services/lists/lists.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/shared/services/items/items.service';

@Component({
    selector: 'todo-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
    listTitle = 'Title';
    listId = '';
    items: ItemModel[] = [];
    newToDoForm = new FormGroup({
        title: new FormControl('')
    });

    constructor(
        private activateRoute: ActivatedRoute,
        private listsService: ListsService,
        private itemsService: ItemsService
    ) {}

    ngOnInit(): void {
        this.activateRoute.params.subscribe((params) => {
            this.listsService.getById(params['id']).subscribe((list) => {
                this.listTitle = list?.title ?? 'Title';
                this.listId = params['id'];
                this.getItems();
            });
        });
    }

    add(): void {
        const title = this.newToDoForm.controls.title.value;
        if (title.length > 0) {
            this.itemsService.addItem(title, this.listId).subscribe((res) => {
                this.newToDoForm.reset();
                if (res) {
                    this.items.push(res);
                }
            });
        }
    }

    getItems(): void {
        this.itemsService.getItems(this.listId).subscribe((res) => {
            this.items = res?.items ?? [];
        });
    }
}
