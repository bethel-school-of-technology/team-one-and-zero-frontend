import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private api : ApiService) {
    this.api.getSongs().subscribe(data=>{
      console.log(data)
    }
  )}
}
