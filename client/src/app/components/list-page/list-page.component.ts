import { ItemModel } from './../../shared/models/item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ListsService } from './../../shared/services/lists/lists.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/shared/services/items/items.service';
import { MatDialog } from '@angular/material/dialog';
import { CahngeTitleDialogComponent } from '../cahnge-title-dialog/cahnge-title-dialog.component';

@Component({
    selector: 'todo-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
    listTitle = 'Title';
    listId = '';
    isPending = false;
    changing = false;
    loadingModels = false;
    items: ItemModel[] = [];
    newToDoForm = new FormGroup({
        title: new FormControl(''),
    });

    get openItems(): ItemModel[] {
        return this.items.filter((i) => !i.completed);
    }

    get completedItems(): ItemModel[] {
        return this.items.filter((i) => i.completed);
    }

    constructor(
        private activateRoute: ActivatedRoute,
        private listsService: ListsService,
        private itemsService: ItemsService,
        private dialog: MatDialog
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
            this.itemsService.addItem(title, this.listId).subscribe(
                (res) => {
                    this.newToDoForm.reset();
                    this.isPending = false;
                    if (res) {
                        this.items.push(res);
                    }
                },
                () => {
                    this.isPending = false;
                }
            );
        }
    }

    getItems(): void {
        this.itemsService.getItems(this.listId).subscribe((res) => {
            this.items = res?.items ?? [];
            this.loadingModels = false;
        });
    }

    editTitle(): void {
        const dialogRef = this.dialog.open(CahngeTitleDialogComponent, {
            width: '400px',
            data: { title: this.listTitle },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.changing = true;
                this.listsService.updateTitle(this.listId, result).subscribe((res) => {
                    if (res) {
                        this.listTitle = res?.title;
                        this.listsService.needUpdate$.next(true);
                        this.changing = false;
                    }
                });
            }
        });
    }
}
