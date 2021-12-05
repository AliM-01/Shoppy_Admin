import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[cursor-pointer]'
})

export class CursorPointerDirective {
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
        )
    {
        _renderer.setStyle(_elementRef.nativeElement, 'cursor', 'pointer');
    }
}