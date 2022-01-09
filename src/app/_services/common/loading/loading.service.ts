import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {

  private loadingSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  loadingOn(){
    if(this.loadingSubject.value === true){
      return;
    }
    this.loadingSubject.next(true);
  }

  loadingOff(){
    if(this.loadingSubject.value === false){
      return;
    }
    this.loadingSubject.next(false);
  }
  
}