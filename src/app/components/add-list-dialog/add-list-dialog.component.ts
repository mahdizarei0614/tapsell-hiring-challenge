import { Component, inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DataFacadeService } from '../../shared/services/data-facade.service';
import { firstValueFrom } from 'rxjs';
import { List } from '../../core/models/list.model';

@Component({
  selector: 'add-list-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatLabel,
  ],
  templateUrl: './add-list-dialog.component.html',
  styleUrl: './add-list-dialog.component.scss',
})
export class AddListDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddListDialogComponent>);
  readonly data = inject<List>(MAT_DIALOG_DATA);
  private _dataService = inject(DataFacadeService);

  title = signal('');

  ngOnInit() {
    if (this.data.title) {
      this.title.set(this.data.title);
    }
  }

  addList() {
    firstValueFrom(this._dataService.addList(this.title())).then(() => {
      this.close(this.title());
    });
  }

  editList() {
    firstValueFrom(
      this._dataService.editList({
        ...this.data,
        title: this.title(),
      })
    ).then(() => {
      this.close(this.title());
    });
  }

  close(result?: string): void {
    this.dialogRef.close(result);
  }
}
