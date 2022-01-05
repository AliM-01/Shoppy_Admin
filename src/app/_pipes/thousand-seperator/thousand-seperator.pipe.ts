import { Pipe, PipeTransform } from '@angular/core';
import { separateThousands } from '@app_services/common/functions/functions';

@Pipe({
  name: 'thousandSeperator'
})
export class ThousandSeperatorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return separateThousands(value);
  }

}