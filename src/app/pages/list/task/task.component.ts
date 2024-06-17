import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ModelSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AddTaskDialogComponent } from '../../../components/add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataFacadeService } from '../../../shared/services/data-facade.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { List } from '../../../core/models/list.model';
import { CapitalizeFirstLettersPipe } from '../../../shared/pipes/capitalize-first-letters.pipe';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'task',
  standalone: true,
  imports: [
    MatCheckbox,
    NgClass,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    CapitalizeFirstLettersPipe,
    AsyncPipe,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private _dataService = inject(DataFacadeService);
  data: ModelSignal<Task | undefined> = model();
  lists$: Observable<List[] | null> | undefined;
  checkChange: OutputEmitterRef<boolean> = output();
  updatedTask: OutputEmitterRef<Task | void> = output();

  ngOnInit() {
    this.lists$ = this._dataService.lists$;
    this._dataService.getLists();
  }

  changed(cb: MatCheckbox) {
    this.checkChange.emit(cb.checked);
    this.data.update((task: Task | undefined) => {
      if (task) {
        task.done = cb.checked;
      }
      return task;
    });
  }

  addToList(list: List) {
    firstValueFrom(
      this._dataService.editTask({
        ...(this.data() as Task),
        list: list.id,
      })
    ).then(() => {
      this.updatedTask.emit();
    });
  }

  openEditTaskDialog() {
    const dialogRef = this._dialog.open(AddTaskDialogComponent, {
      data: this.data(),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.updatedTask.emit(result);
      }
    });
  }
}
