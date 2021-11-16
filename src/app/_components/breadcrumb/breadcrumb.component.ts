import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

  @Input() pageTitle:string;

  constructor() { }

  ngOnInit(): void {
  }

}
