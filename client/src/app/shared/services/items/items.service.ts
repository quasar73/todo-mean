import { ItemModel } from './../../models/item.model';
import { ListModel } from './../../models/list.model';
import { Observable } from 'rxjs';
import { BaseDataService } from './../basedata/basedata.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    constructor(private base: BaseDataService) {}

    addItem(title: string, listId: string): Observable<ItemModel | null> {
        return this.base.post('item/', { title, listId });
    }

    getItems(listId: string): Observable<{ items: ItemModel[] } | null> {
        return this.base.get(`item/${listId}`);
    }
}
