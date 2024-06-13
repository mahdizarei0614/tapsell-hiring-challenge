import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Task } from '../../core/models/task.model';
import { map, Subject } from 'rxjs';
import Random from '@skybluedev/random.js';

@Injectable({
  providedIn: 'root',
})
export class DataFacadeService {
  private _apiService = inject(ApiService);
  private random = new Random({
    string: {
      maxLength: 10,
      shuffle: true,
      minLength: 3,
    },
    date: {
      minDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      maxDate: new Date(Date.now()),
    },
  });
  _tasks$ = new Subject<Task[] | null>();
  _selectedList$ = new Subject<Task[] | null>();

  getTasks() {
    this._apiService
      .getTasks()
      .pipe(
        map(res => {
          if (res) {
            return Array(20)
              .fill(null)
              .map(() => ({
                title: this.random.string(),
                date: this.random.date(),
                done: this.random.boolean(),
                description: this.random.string({
                  maxLength: 50,
                  minLength: 20,
                  shuffle: true,
                }),
                list: this.random.string({
                  text: 'main work home personal',
                  fixedLength: 1,
                }),
              }))
              .sort((a, b) => a.date - b.date);
          }
          return null;
        })
      )
      .subscribe(res => {
        this._tasks$.next(res);
      });
  }

  getList(list: string) {
    this._tasks$
      ?.pipe(map(tasks => tasks?.filter(i => i.list === list) ?? null))
      .subscribe(res => {
        this._selectedList$.next(res);
      });
  }

  get tasks$() {
    return this._tasks$.asObservable();
  }

  get selectedList$() {
    return this._selectedList$.asObservable();
  }
}
