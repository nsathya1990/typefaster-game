import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedTime'
})
export class FormattedTimePipe implements PipeTransform {

  transform(timeinMilliseconds: number): string {
    console.log(timeinMilliseconds);
    const onlyMilliseconds = timeinMilliseconds % 1000;
    console.log((timeinMilliseconds - onlyMilliseconds) / 1000 + 's:' + onlyMilliseconds + 'ms');
    return (timeinMilliseconds - onlyMilliseconds) / 1000 + 's:' + onlyMilliseconds + 'ms';
  }

}
