import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayNumberToDate'
})
export class ArrayNumberToDatePipe implements PipeTransform {

  transform(value: number[]): Date | null {
    if (!value) return null;
    return new Date(value[0], value[1]-1, value[2], value[3], value[4], value[5]);
  }

}
