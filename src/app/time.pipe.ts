import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.toString().split(" ").splice(0,5).splice(1).join(" ");
  }

}
