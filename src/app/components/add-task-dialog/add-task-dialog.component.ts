import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DataFacadeService } from '../../shared/services/data-facade.service';
import { MatInput } from '@angular/material/input';
import { Task } from '../../core/models/task.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'add-task-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})
export class AddTaskDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddTaskDialogComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);
  private _dataService = inject(DataFacadeService);

  title = signal('');
  description = signal('');

  ngOnInit() {
    if (this.data.date) {
      this.title.set(this.data.title);
      this.description.set(this.data.description ?? '');
    }
  }

  addTask() {
    this._dataService
      .addTask(this.data.list, this.title(), this.description())
      .subscribe(res => {
        this.close(res);
      });
  }

  editTask() {
    firstValueFrom(
      this._dataService.editTask({
        ...this.data,
        title: this.title(),
        description: this.description(),
      })
    ).then(res => {
      this.close(res);
    });
  }

  close(result?: Task): void {
    this.dialogRef.close(result);
  }
}
