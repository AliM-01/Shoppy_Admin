import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  template: `
    <div id="preloader">
      <div class="canvas">
          <div class="spinner"></div>
      </div>
    </div>
  `
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
