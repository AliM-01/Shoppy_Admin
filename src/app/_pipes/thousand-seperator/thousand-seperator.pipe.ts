import { Pipe, PipeTransform } from '@angular/core';
import { separateNumbers } from '@app_services/common/functions/functions';

@Pipe({
  name: 'thousand-seperator'
})
export class ThousandSeperatorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return separateNumbers(value);
  }

}