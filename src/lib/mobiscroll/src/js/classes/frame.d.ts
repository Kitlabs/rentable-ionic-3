import { Base, MbscCoreOptions } from '../core/core';

export interface MbscFrameOptions extends MbscCoreOptions {
    // Settings
    anchor?: string | HTMLElement;
    animate?: boolean | 'fade' | 'flip' | 'pop' | 'swing' | 'slidevertical' | 'slidehorizontal' | 'slidedown' | 'slideup';
    buttons?: Array<any>;
    closeOnOverlayTap?: boolean;
    context?: string | HTMLElement;
    cssClass?: string;
    disabled?: boolean;
    display?: 'top' | 'bottom' | 'bubble' | 'inline' | 'center';
    focusOnClose?: boolean | string | HTMLElement;
    focusTrap?: boolean;
    headerText?: string | boolean | ((formattedValue: string) => string);
    showOnFocus?: boolean;
    showOnTap?: boolean;

    // Events
    onBeforeClose?(event: { valueText: string, button: string }, inst: any): void;
    onBeforeShow?(event: any, inst: any): void;
    onCancel?(event: { valuteText: string }, inst: any): void;
    onClose?(event: { valueText: string }, inst: any): void;
    onDestroy?(event: any, inst: any): void;
    onFill?(event: any, inst: any): void;
    onMarkupReady?(event: { target: HTMLElement }, inst: any): void;
    onPosition?(event: { target: HTMLElement, windowWidth: number, windowHeight: number }, inst: any): void;
    onShow?(event: { target: HTMLElement, valueText: string }, inst: any): void;
}

export class Frame extends Base {
    settings: MbscFrameOptions;
    buttons: object;
    handlers: {
        set: () => void,
        cancel: () => void,
        clear: () => void
    };
    _value: any;
    _isValid: boolean;
    _isVisible: boolean;

    constructor(element: any, settings: MbscFrameOptions);
    
    position(check?: boolean): void;
    attachShow(elm: any, beforeShow?: () => void): void;
    select(): void;
    cancel(): void;
    clear(): void;
    enable(): void;
    disable(): void;
    show(prevAnim?: boolean, prevFocus?: boolean): void;
    hide(prevAnim?: boolean, btn?: string, force?: boolean, callback?: () => void): void;
    isVisible(): boolean;

    // type overrides
    option(options: string | MbscFrameOptions, value?: any): void;
}