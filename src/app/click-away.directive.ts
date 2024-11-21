
import {Directive, ElementRef, Output, EventEmitter, HostListener, Input} from '@angular/core';

/**
 *Example Usage  <a (clickAway)="showChildren=false"/>
 */
@Directive({
    selector: '[clickAway]',standalone:true
})
export class ClickAwayDirective {
    @Input() clickAwayTarget!:string;

    constructor(private _elementRef : ElementRef) {
    }

    @Output()
    public clickAway = new EventEmitter();

    @HostListener('document:mousedown', ['$event.target'])
    public onClick(targetElement:HTMLElement) {
        let clickedInside = this._elementRef.nativeElement.contains(targetElement);

        if(this.clickAwayTarget) {
            const target = document.getElementById(this.clickAwayTarget);
            clickedInside = clickedInside || (target && target.contains(targetElement));
        }

        if (!clickedInside) {
            this.clickAway.emit(targetElement);
        }
    }
}
