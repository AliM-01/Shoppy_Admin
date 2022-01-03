import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {

  private loadingSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  loadingOn(){
    this.loadingSubject.next(true);
  }

  loadingOff(){
    this.loadingSubject.next(false);
  }
  
}