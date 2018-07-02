import { Directive, Renderer, ElementRef } from '@angular/core';

import {Keyboard} from 'ionic-native';

import { EditprofilePage } from '../../pages/editprofile/editprofile';

/**
 * Generated class for the KeyboardDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[keyboard]' // Attribute selector
})
export class KeyboardDirective {

  constructor(private renderer:Renderer, private elementRef:ElementRef) {
    console.log('Hello KeyboardDirective Directive');
  }
  ngAfterViewInit() {
    const element = this.elementRef.nativeElement.querySelector('input');
    // we need to delay our call in order to work with ionic ...
    setTimeout(() => {
      this.renderer.invokeElementMethod(element, 'focus', []);
      Keyboard.show();
    }, 0);
  }

}
