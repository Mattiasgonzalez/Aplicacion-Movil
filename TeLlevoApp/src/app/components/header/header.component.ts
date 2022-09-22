import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private Router:Router) { }

  ngOnInit() {}

  @Input() name = '';

  navigate(){
    this.Router.navigate(['/profile'])
  }
}
