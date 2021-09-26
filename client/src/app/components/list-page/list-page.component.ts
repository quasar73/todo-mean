import { ListsService } from './../../shared/services/lists/lists.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'todo-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
    listTitle = 'Title';

    constructor(private activateRoute: ActivatedRoute, private listsService: ListsService) {}

    ngOnInit(): void {
        this.activateRoute.params.subscribe((params) => {
            this.listsService.getById(params['id']).subscribe((list) => {
                this.listTitle = list?.title ?? 'Title';
            });
        });
    }
}
