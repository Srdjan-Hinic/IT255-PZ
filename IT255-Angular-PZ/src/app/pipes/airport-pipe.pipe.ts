import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'AirportPipe' })
export class AirportPipePipe implements PipeTransform {


  transform(airports: any[], country: any): any[] {

    return !!country ? airports.filter(x => x.country === country) : airports;

  }

}
