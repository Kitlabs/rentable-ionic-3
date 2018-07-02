import { mobiscroll, IMobiscroll } from './mobiscroll';
export { mobiscroll, IMobiscroll };
export const $: any;
export const extend: any;

export interface MbscCoreOptions {
    // Settingss
    theme?: string;
    lang?: string;
    rtl?: boolean;

    // Events
    onInit?(event: any, inst: any): void;
    onDestroy?(event: any, inst: any): void;
}

export class Base {
    settings: MbscCoreOptions;

    constructor(element: any, settings: MbscCoreOptions);

    init(settings?: MbscCoreOptions): void;
    destroy(): void;
    tap(el: any, handler: (ev?: any, inst?: any) => void, prevent?: boolean, tolerance?: number, time?: any): void;
    trigger(name: string, event?: any): any;
    option(options: string | MbscCoreOptions, value?: any): void;
    getInst(): Base;
}




