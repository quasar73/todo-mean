import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/dialog-data.model';

@Component({
    selector: 'todo-cahnge-title-dialog',
    templateUrl: './cahnge-title-dialog.component.html',
    styleUrls: ['./cahnge-title-dialog.component.scss'],
})
export class CahngeTitleDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CahngeTitleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
