import { StorageService } from './../../shared/services/storage/storage.service';
import { ItemsService } from './../../shared/services/items/items.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemModel } from './../../shared/models/item.model';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'todo-item-info',
    templateUrl: './item-info.component.html',
    styleUrls: ['./item-info.component.scss'],
})
export class ItemInfoComponent implements OnChanges, OnInit {
    @Input() item!: ItemModel;

    notSaved = false;
    pending = false;
    completed = false;
    deleting = false;

    itemForm: FormGroup = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
    });

    constructor(private itemsService: ItemsService, private storageService: StorageService) {}

    ngOnInit(): void {
        this.storageService.changedItem$.subscribe((item) => {
            if (item._id === this.item?._id) {
                this.item = item;
                this.completed = this.item?.completed ?? false;
            }
        });
    }

    ngOnChanges(): void {
        this.itemForm.setValue({
            title: this.item?.title ?? '',
            description: this.item?.description ?? '',
        });
        this.notSaved = false;
        this.completed = this.item?.completed ?? false;
    }

    checkDifferences(): void {
        if (
            this.item?.title !== this.itemForm.controls.title.value ||
            this.item?.description !== this.itemForm.controls.description.value
        ) {
            this.notSaved = true;
        } else {
            this.notSaved = false;
        }
    }

    save(): void {
        this.pending = true;
        this.item.title = this.itemForm.controls.title.value;
        this.item.description = this.itemForm.controls.description.value;
        this.itemsService.updateItem(this.item).subscribe(
            (res) => {
                this.pending = false;
                if (res) {
                    this.notSaved = false;
                    this.item = res;
                    this.storageService.expandedItem$.next(this.item);
                }
            },
            () => {
                this.pending = false;
            }
        );
    }

    completeChanged(): void {
        this.item.completed = this.completed;
        this.itemsService.updateItem(this.item).subscribe((res) => {
            if (res) {
                this.item = res;
                this.storageService.expandedItem$.next(this.item);
            }
        });
    }

    remove(): void {
        this.deleting = true;
        this.itemsService.removeItem(this.item?._id).subscribe(() => {
           this.deleting = false;
           this.storageService.removedItemId$.next(this.item?._id);
        },
        () => {
            this.deleting = false;
        });
    }
}
