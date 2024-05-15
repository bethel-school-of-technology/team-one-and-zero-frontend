import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  searchStr!: string;
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.getSongList()
  }

  getSongList() {
    this.api.getSongs().subscribe(data => {
      console.log(data)
    })
    
    }
    
  }
  


