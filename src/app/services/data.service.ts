import { Injectable } from '@angular/core';

@Injectable()
export class myService {
  public sharedData: Array<any>;

  constructor() {

  }

  setData (data) {
    this.sharedData = data;
  }
  getData () {
    return this.sharedData;
  }
}
