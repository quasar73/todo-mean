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

    constructor(private listsService: ListsService) {}

    ngOnInit(): void {
        this.uploadLists();
        this.listsService.needUpdate$.subscribe((res) => {
            if (res) {
                this.uploadLists();
            }
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
