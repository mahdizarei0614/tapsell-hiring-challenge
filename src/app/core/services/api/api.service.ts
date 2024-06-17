import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task, TaskDto } from '../../models/task.model';
import { List, ListDto } from '../../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  public getTasks(): Observable<Task[]> {
    return this._http.get<TaskDto[]>('/api/tasks').pipe(
      map(res => {
        return res.map(i => ({ ...i, id: i._id }) as Task);
      })
    );
  }

  public getTasksById(id: string): Observable<Task> {
    return this._http.get<Task>(`/api/tasks/${id}`);
  }

  public editTask(task: Task): Observable<Task> {
    return this._http.put<Task>(`/api/tasks/${task.id}`, task);
  }

  public deleteTask(id: string): Observable<Task> {
    return this._http.delete<Task>(`/api/tasks/${id}`);
  }

  public getTasksByList(list: string): Observable<Task[]> {
    return this._http.get<TaskDto[]>(`/api/tasks/query/${list}`).pipe(
      map(res => {
        return res.map(i => ({ ...i, id: i._id }) as Task);
      })
    );
  }

  public createTask(
    listId: string,
    title: string,
    description?: string
  ): Observable<Task> {
    return this._http.post<Task>(`/api/tasks`, {
      title,
      description,
      list: listId,
      done: false,
    });
  }

  public createList(title: string, main: boolean): Observable<List> {
    return this._http.post<List>(`/api/lists`, {
      title,
      isMain: main,
    });
  }

  public editList(list: List): Observable<List> {
    return this._http.put<List>(`/api/lists/${list.id}`, {
      ...list,
      title: list.title,
    });
  }

  public getLists(): Observable<List[]> {
    return this._http.get<ListDto[]>('/api/lists').pipe(
      map(res => {
        return res.map(i => ({ ...i, id: i._id }) as List);
      })
    );
  }
}
