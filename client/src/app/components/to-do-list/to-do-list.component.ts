import { StorageService } from './../../shared/services/storage/storage.service';
import { ListModel } from './../../shared/models/list.model';
import { ListsService } from './../../shared/services/lists/lists.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'todo-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
    userLists: ListModel[] = [];

    constructor(private listsService: ListsService, private storage: StorageService) {}

    ngOnInit(): void {
        this.uploadLists();
        this.listsService.needUpdate$.subscribe((res) => {
            if (res) {
                this.uploadLists();
            }
        });

        this.storage.removedListId$.subscribe((id) => {
            const index = this.userLists.findIndex(l => l._id === id);
            this.userLists.splice(index, 1);
        });
    }

    add(): void {
        this.listsService.addList('New list').subscribe((res) => {
            this.uploadLists();
        });
    }

    uploadLists(): void {
        this.listsService.getLists().subscribe((res) => {
            this.userLists = res?.lists ?? [];
        });
    }
}
