import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFacadeService } from '../../shared/services/data-facade.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _dataService = inject(DataFacadeService);
  tasks$: Observable<Task[] | null> | undefined;

  ngOnInit() {
    this._dataService.getTasks();
    this._dataService.getList(
      this._activatedRoute.snapshot.params['id'] ?? null
    );
    this.tasks$ = this._dataService.tasks$;
  }
}
