import { StorageService } from './../../shared/services/storage/storage.service';
import { ItemsService } from 'src/app/shared/services/items/items.service';
import { ItemModel } from './../../shared/models/item.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'todo-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
    @Output() itemClick = new EventEmitter();

    @Input() item!: ItemModel;

    completed = false;
    pending = false;

    get title(): string {
        return this.item?.title ?? '<title>';
    }

    constructor(private itemsService: ItemsService, private storageService: StorageService) {}

    ngOnInit(): void {
        this.completed = this.item?.completed ?? false;
    }

    onCheck(): void {
        this.item.completed = this.completed;
        this.pending = true;
        this.itemsService.updateItem(this.item).subscribe(
            (res) => {
                if (res) {
                    this.item = res;
                    this.storageService.changedItem$.next(this.item);
                }
                this.pending = false;
            },
            () => {
                this.completed = !this.completed;
                this.item.completed = this.completed;
                this.pending = false;
            }
        );
    }

    checkClick(e: any): void {
        e.stopPropagation();
    }

    onItemClick(): void {
        this.itemClick.emit(this.item);
    }
}
