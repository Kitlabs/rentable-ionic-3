var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Renderer, ElementRef } from '@angular/core';
import { Keyboard } from 'ionic-native';
/**
 * Generated class for the KeyboardDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
var KeyboardDirective = /** @class */ (function () {
    function KeyboardDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        console.log('Hello KeyboardDirective Directive');
    }
    KeyboardDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var element = this.elementRef.nativeElement.querySelector('input');
        // we need to delay our call in order to work with ionic ...
        setTimeout(function () {
            _this.renderer.invokeElementMethod(element, 'focus', []);
            Keyboard.show();
        }, 0);
    };
    KeyboardDirective = __decorate([
        Directive({
            selector: '[keyboard]' // Attribute selector
        }),
        __metadata("design:paramtypes", [Renderer, ElementRef])
    ], KeyboardDirective);
    return KeyboardDirective;
}());
export { KeyboardDirective };
//# sourceMappingURL=keyboard.js.map