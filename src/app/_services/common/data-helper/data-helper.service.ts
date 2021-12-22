import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHelperService {

  constructor() { }

  toSlug(text: string): string{
    return text.trim().replace(' ', '-')
  }

}