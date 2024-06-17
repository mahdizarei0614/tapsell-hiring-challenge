import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFacadeService } from '../../shared/services/data-facade.service';
import { AsyncPipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { LayoutService } from '../../shared/services/layout.service';
import { PageBase } from '../../core/interfaces/page-base';
import { CapitalizeFirstLettersPipe } from '../../shared/pipes/capitalize-first-letters.pipe';
import { TaskComponent } from './task/task.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'list',
  standalone: true,
  imports: [
    AsyncPipe,
    TaskComponent,
    MatButton,
    MatAnchor,
    NgTemplateOutlet,
    JsonPipe,
    MatIcon,
    CapitalizeFirstLettersPipe,
    MatMenuItem,
  ],
  providers: [CapitalizeFirstLettersPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements PageBase, OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _dataService = inject(DataFacadeService);
  private _layoutService = inject(LayoutService);
  private _capitalizeFirstLettersPipe = inject(CapitalizeFirstLettersPipe);
  private readonly _dialog = inject(MatDialog);
  tasks$: Observable<Task[] | null> | undefined;
  error$: Observable<any> | undefined;
  private listId?: string;

  ngOnInit() {
    this.tasks$ = this._dataService.tasks$;
    this.error$ = this._dataService.error$;
    this._activatedRoute.params.subscribe(async () => {
      this.setLayout();
      this._dataService.getLists();
      const list = this._router.getCurrentNavigation()?.extras.state?.['list'];
      let listId: string | undefined = list?.id;
      if (!list) {
        listId = (await firstValueFrom(this._dataService.lists$))?.find(
          l =>
            l.title ==
            this._activatedRoute.snapshot.params['id']?.split('-').join(' ')
        )?.id;
      }
      this.listId = listId;
      this._dataService.getTasks(listId);
    });
  }

  setLayout(): void {
    this._layoutService.setLayout({
      title: this._capitalizeFirstLettersPipe.transform(
        (this._activatedRoute.snapshot.params['id']?.length
          ? this._activatedRoute.snapshot.params['id']
          : 'main') + ' list'
      ) as string,
      hasMenu: true,
      firstButtonIcon: 'add',
      firstButtonAction: () => {
        this.openAddTaskDialog();
      },
    });
  }

  checkChange(isChecked: boolean, task: Task): void {
    this._dataService.editTask({ ...task, done: isChecked });
  }

  openAddTaskDialog() {
    const dialogRef = this._dialog.open(AddTaskDialogComponent, {
      data: { list: this.listId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._dataService.getTasks(this.listId);
      }
    });
  }

  reloadTasks() {
    this._dataService.getTasks(this.listId);
  }
}
