import { Directive, HostListener, Input } from '@angular/core';
import {NgControl} from '@angular/forms';
@Directive({
  selector: '[appInputTransformCase]'
})
export class CaseTransformDirective {

  @Input('appInputTransformCase') targetCase:string;

  constructor(private readonly control:NgControl) {
   }


  @HostListener('input',['$event'])
  public onInput(event):void {
    this.control.control.setValue(this.transformData(event.target.value));
  }

  private transformData(value):string{
    let data = value;
    switch(this.targetCase.toUpperCase()){
      case 'LOWER' :
        data = value.toLowerCase();
        break;
      case 'UPPER':
        data = value.toUpperCase();
        break;
    }
    return data;
  }
}
