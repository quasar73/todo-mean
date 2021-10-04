import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/dialog-data.model';

@Component({
    selector: 'todo-delete-list-dialog',
    templateUrl: './delete-list-dialog.component.html',
    styleUrls: ['./delete-list-dialog.component.scss'],
})
export class DeleteListDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
