import { StorageService } from './../../shared/services/storage/storage.service';
import { ItemModel } from './../../shared/models/item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ListsService } from './../../shared/services/lists/lists.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/shared/services/items/items.service';
import { MatDialog } from '@angular/material/dialog';
import { CahngeTitleDialogComponent } from '../cahnge-title-dialog/cahnge-title-dialog.component';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'todo-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss'],
    animations: [
        trigger('expandInfo', [
            state(
                'false',
                style({
                    width: '0px',
                })
            ),
            state(
                'true',
                style({
                    width: '440px',
                })
            ),
            transition('false<=>true', animate('0.15s')),
        ]),
    ],
})
export class ListPageComponent implements OnInit {
    listTitle = 'Title';
    listId = '';
    isPending = false;
    changing = false;
    loadingModels = false;
    items: ItemModel[] = [];
    infoExpanded = false;
    expandedId = '';
    expandedItem!: ItemModel;

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
        private dialog: MatDialog,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.activateRoute.params.subscribe((params) => {
            this.items = [];
            this.loadingModels = true;
            this.listsService.getById(params['id']).subscribe((list) => {
                this.listTitle = list?.title ?? 'Title';
                this.listId = params['id'];
                this.getItems();
                this.storageService.items$.subscribe((items) => {
                    this.items = items;
                });
            });
        });

        this.storageService.expandedItem$.subscribe((item) => {
            if (item) {
                this.expandedItem = item;
                const arrayItem = this.items.find(i => i._id === item._id);
                if (arrayItem) {
                    arrayItem.completed = item.completed;
                    arrayItem.title = item.title;
                }
            }
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
            this.storageService.items$.next(res?.items ?? []);
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
                this.listsService
                    .updateTitle(this.listId, result)
                    .subscribe((res) => {
                        if (res) {
                            this.listTitle = res?.title;
                            this.listsService.needUpdate$.next(true);
                            this.changing = false;
                        }
                    });
            }
        });
    }

    onItemClick(item: ItemModel): void {
        if (this.expandedId === item._id) {
            this.infoExpanded = false;
            this.expandedId = '';
        } else {
            this.infoExpanded = true;
            this.expandedId = item._id;
            this.expandedItem = item;
        }
    }

    onUpdate(): void {
        this.getItems();
    }
}
