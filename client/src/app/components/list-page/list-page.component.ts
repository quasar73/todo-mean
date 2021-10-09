import { DeleteListDialogComponent } from './../delete-list-dialog/delete-list-dialog.component';
import { StorageService } from './../../shared/services/storage/storage.service';
import { ItemModel } from './../../shared/models/item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ListsService } from './../../shared/services/lists/lists.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/auth';
import { Title } from '@angular/platform-browser';

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
export class ListPageComponent implements OnInit, OnDestroy {
    listTitle = 'Title';
    listId = '';
    isPending = false;
    changing = false;
    loadingModels = false;
    items: ItemModel[] = [];
    infoExpanded = false;
    expandedId = '';
    expandedItem!: ItemModel;
    deleting = false;
    subscriptions = new Subscription();

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
        private storageService: StorageService,
        private router: Router,
        private storage: StorageService,
        private authenticationService: AuthenticationService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.activateRoute.params.subscribe((params) => {
            this.items = [];
            this.loadingModels = true;
            this.listsService.getById(params['id']).subscribe((list) => {
                this.listTitle = list?.title ?? 'Title';
                this.listId = params['id'];
                this.getItems();
                this.subscriptions.add(
                    this.storageService.items$.subscribe((items) => {
                        this.items = items;
                    })
                );
                this.subscriptions.add(
                    this.authenticationService
                        .getUserData()
                        .subscribe((data) => {
                            this.titleService.setTitle(
                                `${data.userName} | ${this.listTitle}`
                            );
                        })
                );
            });
        });

        this.subscriptions.add(
            this.storageService.expandedItem$.subscribe((item) => {
                if (item) {
                    this.expandedItem = item;
                    const arrayItem = this.items.find(
                        (i) => i._id === item._id
                    );
                    if (arrayItem) {
                        arrayItem.completed = item.completed;
                        arrayItem.title = item.title;
                    }
                }
            })
        );

        this.subscriptions.add(
            this.storageService.removedItemId$.subscribe((id) => {
                const index = this.items.findIndex((i) => i._id === id);
                if (index > -1) {
                    this.items.splice(index, 1);
                    if (this.items.length === 0) {
                        this.infoExpanded = false;
                        this.expandedId = '';
                    } else {
                        this.expandedId =
                            this.items[index % this.items.length]._id;
                        this.storageService.expandedItem$.next(
                            this.items[index % this.items.length]
                        );
                    }
                }
            })
        );
    }

    add(): void {
        const title = this.newToDoForm.controls.title?.value ?? '';
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

    removeList(): void {
        const dialogRef = this.dialog.open(DeleteListDialogComponent, {
            width: '400px',
            data: { title: this.listTitle },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleting = true;
                this.listsService.removeList(this.listId).subscribe(
                    (res) => {
                        this.deleting = false;
                        this.storage.removedListId$.next(this.listId);
                        this.router.navigate(['/main']);
                    },
                    () => {
                        this.deleting = false;
                    }
                );
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
