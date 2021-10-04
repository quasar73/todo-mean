import { ListModel } from './../../models/list.model';
import { Observable, Subject } from 'rxjs';
import { BaseDataService } from './../basedata/basedata.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ListsService {
    needUpdate$ = new Subject<boolean>();

    constructor(private base: BaseDataService) {}

    addList(title: string): Observable<ListModel | null> {
        return this.base.post('list/', { title });
    }

    getLists(): Observable<{ lists: ListModel[] } | null> {
        return this.base.get('list/');
    }

    getById(id: string): Observable<ListModel | null> {
        return this.base.get(`list/${id}`);
    }

    updateTitle(id: string, title: string): Observable<ListModel | null> {
        return this.base.put(`list/${id}`, { title });
    }

    removeList(id: string): Observable<{ message: string } | null> {
        return this.base.delete(`list/${id}`);
    }
}
