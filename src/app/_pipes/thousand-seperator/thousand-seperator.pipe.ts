/* eslint-disable @typescript-eslint/no-unused-vars */
import {Pipe, PipeTransform} from '@angular/core';
import {separateThousands} from '@app_services/_common/functions/functions';

@Pipe({
  name: 'thousandSeperator'
})
export class ThousandSeperatorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return separateThousands(Number(value));
  }

}
