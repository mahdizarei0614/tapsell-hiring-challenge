import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Task } from '../../core/models/task.model';
import { firstValueFrom, Subject } from 'rxjs';
import { List } from '../../core/models/list.model';
import { isBrowser } from '../../app.component';

@Injectable({
  providedIn: 'root',
})
export class DataFacadeService {
  private _apiService = inject(ApiService);
  _tasks$ = new Subject<Task[] | null>();
  _lists$ = new Subject<List[] | null>();
  _error$ = new Subject<any>();
  private _firstListCall = false;

  constructor() {
    this.getLists();
  }

  getTasks(list?: string) {
    this._error$.next(null);
    this._tasks$.next(null);
    if (list) {
      this._getList(list).then();
      return;
    }
    this._getTasks().then();
  }

  private async _getTasks() {
    try {
      const response: Task[] = await firstValueFrom(
        this._apiService.getTasks()
      );
      this._tasks$.next(response);
    } catch (e) {
      this._error$.next(e);
    }
  }

  private async _getList(list: string) {
    this._error$.next(null);
    this._tasks$.next(null);
    try {
      const response: Task[] = await firstValueFrom(
        this._apiService.getTasksByList(list)
      );
      this._tasks$.next(response);
    } catch (e) {
      this._error$.next(e);
    }
  }

  editTask(task: Task) {
    return this._apiService.editTask(task);
  }

  get tasks$() {
    return this._tasks$.asObservable();
  }

  get error$() {
    return this._error$.asObservable();
  }

  addTask(listId: string, title: string, description?: string) {
    return this._apiService.createTask(listId, title, description);
  }

  addList(title: string, main = false) {
    return this._apiService.createList(title, main);
  }

  editList(list: List) {
    return this._apiService.editList(list);
  }

  getLists() {
    this._getLists().then();
  }

  private async _getLists() {
    try {
      const response: List[] = await firstValueFrom(
        this._apiService.getLists()
      );
      if (isBrowser()) {
        if (
          Array.isArray(response) &&
          !response.find(l => l.isMain) &&
          !this._firstListCall
        ) {
          this._firstListCall = true;
          const firstList = await firstValueFrom(this.addList('main', true));
          this._lists$.next([firstList]);
          return;
        }
      }
      if (response) {
        this._lists$.next(response);
      }
    } catch (e) {
      this._error$.next(e);
    }
  }

  get lists$() {
    return this._lists$.asObservable();
  }
}
