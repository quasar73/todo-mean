import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ItemModel } from '../../models/item.model';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    items$ = new BehaviorSubject<ItemModel[]>([]);
    expandedItem$ = new BehaviorSubject<ItemModel | null>(null);
    changedItem$ = new Subject<ItemModel>();

    constructor() {}
}
