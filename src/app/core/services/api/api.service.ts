import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  public getTasks(): Observable<Task[]> {
    return new Observable<Task[]>(observer => {
      setTimeout(() => {
        observer.next([]);
        observer.complete();
      }, 2000);
    });
    return this._http.get<Task[]>('/api/tasks');
  }
}
