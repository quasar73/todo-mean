import { ListModel } from './../../models/list.model';
import { Observable } from 'rxjs';
import { BaseDataService } from './../basedata/basedata.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ListsService {
    constructor(private base: BaseDataService) {}

    addList(title: string): Observable<ListModel | null> {
        return this.base.post('list/', { title });
    }

    getLists(): Observable<{ lists: ListModel[] } | null> {
        return this.base.get('list/');
    }
}
