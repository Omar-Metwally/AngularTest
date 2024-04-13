import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
interface ConfirmationDialogData {
  title: string;
  content: string;
  mealOptionID: string;
}
@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule, MatDialogModule, MatButtonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})


export class ConfirmationDialogComponent {

  title: string = '';
  content: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmationDialogData
  ) {
    this.title = data.title;
    this.content = data.content;
  }

  confirmAction() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
