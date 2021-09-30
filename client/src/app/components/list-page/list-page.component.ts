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
    isPending = false;
    loadingModels = false;
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
            this.items = [];
            this.loadingModels = true;
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
            this.isPending = true;
            this.itemsService.addItem(title, this.listId).subscribe((res) => {
                this.newToDoForm.reset();
                this.isPending = false;
                if (res) {
                    this.items.push(res);
                }
            },
            () => {
                this.isPending = false;
            });
        }
    }

    getItems(): void {
        this.itemsService.getItems(this.listId).subscribe((res) => {
            this.items = res?.items ?? [];
            this.loadingModels = false;
        });
    }
}
