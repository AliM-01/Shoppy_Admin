import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[div-center-content-center]'
})

export class DivCenterContentCenterDirective {
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
        )
    {
        _renderer.setStyle(_elementRef.nativeElement, 'display', 'flex');
        _renderer.setStyle(_elementRef.nativeElement, 'align-items', 'center');
        _renderer.setStyle(_elementRef.nativeElement, 'justify-content', 'center');
    }
}