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
import { LayoutService } from '../../shared/services/layout.service';
import { PageBase } from '../../core/interfaces/page-base';
import { CapitalizeFirstLettersPipe } from '../../shared/pipes/capitalize-first-letters.pipe';

@Component({
  selector: 'list',
  standalone: true,
  imports: [AsyncPipe],
  providers: [CapitalizeFirstLettersPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements PageBase, OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _dataService = inject(DataFacadeService);
  private _layoutService = inject(LayoutService);
  private _capitalizeFirstLettersPipe = inject(CapitalizeFirstLettersPipe);
  tasks$: Observable<Task[] | null> | undefined;

  ngOnInit() {
    this.setLayout();
    this._dataService.getTasks();
    this._dataService.getList(
      this._activatedRoute.snapshot.params['id'] ?? null
    );
    this.tasks$ = this._dataService.tasks$;
  }

  setLayout(): void {
    this._layoutService.setLayout({
      title: this._capitalizeFirstLettersPipe.transform(
        this._activatedRoute.snapshot.params['id'] ?? 'slm man b to'
      ) as string,
      hasBackButton: true,
    });
  }
}
