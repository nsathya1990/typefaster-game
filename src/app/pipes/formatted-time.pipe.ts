import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedTime'
})
export class FormattedTimePipe implements PipeTransform {

  transform(timeinMilliseconds: number): string {
    const onlyMilliseconds = timeinMilliseconds % 1000;
    return (timeinMilliseconds - onlyMilliseconds) / 1000 + 's:' + onlyMilliseconds + 'ms';
  }

}
