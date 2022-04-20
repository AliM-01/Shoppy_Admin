import {Directive, ElementRef, Renderer2} from "@angular/core";

@Directive({
    selector: '[div-center]'
})

export class DivCenterDirective {
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
        ) {
        _renderer.setStyle(_elementRef.nativeElement, 'display', 'flex');
        _renderer.setStyle(_elementRef.nativeElement, 'align-items', 'center');
    }
}