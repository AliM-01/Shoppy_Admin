import { Directive, ElementRef, Renderer2, OnInit, DoCheck } from '@angular/core';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: 'input[money-input]',
  providers: [CurrencyPipe]
})

export class ThousandSepratorDirective implements OnInit, DoCheck {

  constructor(public _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
    private currencyPipe: CurrencyPipe) { }

  ngDoCheck(): void {
    fromEvent(this._elementRef.nativeElement, 'blur')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this._elementRef.nativeElement.value = this.currencyPipe.transform(
            this._elementRef.nativeElement.value.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0');
        })
      )
      .subscribe();
  }

  ngOnInit(): void {

  }
}