import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

    private initialColor = '#f5f5f5';
    private defaultColor = '#009688';
    private defaultHeight = 180;

    constructor(private el: ElementRef) {
        this.setBorder(this.initialColor);
        this.setHeight(this.defaultHeight);
    }

    @Input('pkmnBorderCard') borderColor: string; // ALIAS

    // Detecte les évènements enter & leave via HostListener
    @HostListener('mouseenter') onMouseEnter(){
        this.setBorder(this.borderColor || this.defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.setBorder(this.initialColor);
    }

    private setBorder(color: string) {
        const border = 'solid 4px ' + color;
        this.el.nativeElement.style.border = border;
    }

    private setHeight(height: number) {
        this.el.nativeElement.style.height = height + 'px';
    }
}
