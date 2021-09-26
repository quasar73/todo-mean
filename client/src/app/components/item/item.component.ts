import { ItemModel } from './../../shared/models/item.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'todo-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
    @Input() item!: ItemModel;

    get title(): string {
        return this.item?.title ?? '<title>';
    }

    constructor() {}

    ngOnInit(): void {}
}
