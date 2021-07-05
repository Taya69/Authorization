import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserImageService {
  private src :string = `/assets/users/user${Number(localStorage.getItem('id'))}.jpg`;

  constructor() {}

  public setParams(img: string) {
      this.src = img
  }

  public getParams() {
      return this.src;
  }
}
