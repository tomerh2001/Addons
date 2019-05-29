//================================================================//
//                          - Addons -                            //
//================================================================//
/*
    This is a part of a personal libary created by Tomer Horowitz, 
    @ All rights reserved to and for Tomer Horowitz the creator of the libary
*/

let UID: string;
let clearConsoleOnReady = false;
let clearConsoleOnReadyDelay = 500;
let customRequestSettings: JQueryAjaxSettings;
let customRequestError: (message: string, stacktrace: string) => any;
let isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));


// #region Extentions
interface Number {
    /**
    * Indicates if the current Number does not contain any value, NaN/Null/Undefined
    */
    empty(this: this);
    /**
    * Calculates how much is the current number from the specified number in precents
    */
    precentFrom(from: number): number;
    /**
    * Calculates how much is the specified precent from the current number
    */
    precent(precent: number): number;
    /**
    * Clamps the current number between a minimum and a maximum
    */
    clamp(min: number, max: number): number;
    /**
    * Rounds the current number.
    */
    round(): number;
}
interface String {
    /**
    * Converts the current String to its Number Representation
    */
    toNumber(): number;
    /**
    * Combining all numbers from the current String by removing any character that is not a Number and returning the resulted Number
    */
    getNumbers(this: this): number;
    /**
    * Executing the specified function for every character within the current String, optionally filtered by a specific amount
    */
    foreach(f: (char: string, index: number) => string | void, amount?: number): any;
    /**
    * Indicates if the current String contains the specified String, optionally not case sensitive
    */
    contains(text: string, ignoreCase?: boolean): boolean;
    /**
    * Indicates if the current String contains only numbers (space is ignored) by testing the following regex for result
    * Regex: ^(\d|\d | \d)+$
    */
    numbersOnly(this: this)
    /**
    * Removes the specified String by the selector from the current String
    */
    remove(selector: string | ((i: string) => boolean | string)): string;
    /**
    * Indicates if the current String is does not contain any value, Undefined/Null/Only-Whitespaces
    */
    empty(this: this): boolean;
    /**
    * Returns all the matches of the specified regex from the current string
    */
    matches(reg: RegExp | string): RegExpMatchArray[];

    replaceAll(search: string | RegExp, replacement): string;

    title(upperSpace?: boolean): string;

    startsWith(...args): boolean;

    addToStart(value: any): string;
    addToStart(value: any, condition?: (str: string, value?: string) => boolean): string;

    all(predicate?: string | number | ((char: string) => boolean)): boolean;
}
interface Array<T> {
    /**
    * Returns the element in the first index of the current array, if has.
    */
    first(): T
    /**
    * Returns the first match for the specified selector from the array
    */
    first(selector: (item: T, index: number) => boolean): T;
    /**
    * Selecting items from the current array using the specified selector and returning an array of the resulted items
    */
    select<T2>(selector: (item: T, index: number) => T2): T2[];
    /**
    * Executing and returning the specified action result on the current array
    */
    to<T2>(action: (array: T[]) => T2[]): T2[];
    /**
    * Returns if the current collection contains the specified object
    */
    contains(object: T): boolean;
    /**
    * Returns if the current collection contains the specified object, filtered from a specific index
    */
    contains(object: T, fromIndex: number): boolean;
    contains(fn: (obj: T) => boolean): boolean;
    /**
    * Parse the current array values with a separator
    */
    parse(separator: string, fn: (s: T) => any): string;

    /**
    * Returns the last element in the current array
    */
    last(): T;

    /**
    * Returns the element at the specified index.
    */
    at(index: number): T;
    /**
    * Returns the element at the specified index, if null specified default value is returned.
    */
    at(index: number, defaultValue: T): T;

    /**
    * Returns the lower case string representation of each element in the current array.
    */
    toLowerCase(): T[];

    /**
    * Indicates if at least one member in the current array satisfies the specified criteria
    */
    any(fn: (obj: T) => boolean): boolean;
}
interface Date {
    /**
    * Returns a date that is day is previous to the current by the specified days
    */
    previousDaysBy(Days: number): Date;
    /**
    * Returns a date that is week is previous to the current by the specified weeks
    */
    previousWeeksBy(Weeks: number): Date;
    /**
    * Returns a date that is month is previous to the current by the specified months
    */
    previousMonthsBy(Months: number): Date;
    /**
    * Returns a date that is year is previous to the current by the specified years
    */
    previousYearsBy(Years: number): Date;
    /**
    * Returns the current date as string with the specified format
    */
    dateToString(format?: string): string;
    /**
    * Returns the amount of days from current date to the specified date
    */
    diffInDays(date: Date): number;

    /**
    * Returns the last day in the current month.
    */
    lastDayInMonth(): Date;
    /**
    * Returns the amount of days within the current month
    */
    daysInMonth(): number;

    /**
    * Returns the date month.
    */
    currentMonth(): number;
    /**
    * Returns the date year.
    */
    currentYear(): number;

    /**
    * Returns the next day.
    */
    nextDay(): Date;
    /**
    * Returns the next day.
    */
    nextDay(days: number): Date;

    /**
    * Returns the next month.
    */
    nextMonth(): Date;
    /**
    * Returns the next month.
    */
    nextMonth(months: number): Date;

    /**
    * Returns the next year.
    */
    nextYear(): Date;
    /**
    * Returns the next year.
    */
    nextYear(years: number): Date;

    /**
    * Returns the name of the month.
    */
    getMonthName(): string;

    /**
    * Returns the name of the day.
    */
    getDayName(): string;
}
interface JQuery {
    /**
    * Indicates if the current set of matched elements are within the specified offset of the viewport area.
    */
    enterView(offset: number, fn?: Function): JQuery;
    /**
    * Triggers the specified callback for the current set of matched elements individually when CSS animation is finished
    */
    finishCss(handler: (eventObject: JQueryEventObject) => any, transitions?: boolean, all?: boolean): JQuery;
    /**
    * Removes the 'finishCss' event handler from each element within the set of matched elements.
    */
    offFinishCss(transitions?: boolean, all?: boolean): JQuery;
    /**
    * Replaces the specified class name with the specified new class name
    */
    replaceClass(oldClass: string, newClass: string): JQuery;
    /**
    * Saves the value of the specified css property to the current JQuery data
    */
    saveCss(name: string): JQuery;
    /**
    * Saves the values of the specified css properties to the current JQuery data individually
    */
    saveCss(names: string[]): JQuery;
    /**
    * Loads the value of the specified saved css property from the current JQuery data
    */
    loadCss(name: string): any;
    /**
    * Returns if the first element within the set of matched elements contains the specified attribute name
    */
    hasAttr(name: string);

    /**
    * Scaling the current set of matched elements to a certain value (optionaly from a certain value)
    */
    scale(value?: number | string | FromTo, fn?: Function): JQuery;
    /**
    * Scaling the current set of matched elements to a certain value (optionaly from a certain value)
    */
    scale(value?: number | string | FromTo, duration?: number | string, fn?: Function): JQuery;
    /**
    * Scaling the current set of matched elements to a certain value (optionaly from a certain value)
    */
    scale(value?: number | string | FromTo, duration?: number | string, axis?: string, fn?: Function): JQuery;

    /**
    * Gets the opacity value of the first element within the current set of matched elements.
    */
    opacity(): number;
    /**
    * Sets the opacity value for each element within the current set of matched elements.
    */
    opacity(value: number | string): JQuery;
    /**
    * Sets the opacity value for each element within the current set of matched elements.
    */
    opacity(value: number | string, duration?: number | string): JQuery;
    /**
    * Sets the opacity value for each element within the current set of matched elements.
    */
    opacity(value: number | string, duration?: number | string, easing?: string): JQuery;

    /**
    * Returns the tag of the first element within the current set of matched elements.
    */
    tag(): string;

    /**
    * Iterates trough the current set of matched elements with a delay between each iteration.
    */
    iter(fn: (index?: number, element?: Element) => any, delay?: number): JQuery;
    /**
    * Iterates trough the current set of matched elements with a delay between each iteration, each delay is progressively added with the delta value.
    */
    iter(fn: (index?: number, element?: Element) => any, delay: number, delta: number): JQuery;

    /**
    * Reverse the current set of matched elements.
    */
    reverse(): JQuery;

    /**
    * Binds a tooltip with the specified message to each element in the current set of matched elements.
    */
    tooltip(message): JQuery;
    /**
    * Binds a tooltip with the specified message to each element in the current set of matched elements.
    */
    tooltip(message, direction?: 'left' | 'right' | 'top' | 'bottom', timeout?: number): JQuery;

    /**
    * Returns the shadow value of the first element within the current set of matched elements.
    */
    shadow(): string;
    /**
    * Sets the shadow value for each element in the current set of matched elements.
    */
    shadow(value: number | string): JQuery;
    /**
    * Sets the shadow value for each element in the current set of matched elements.
    */
    shadow(value: number | string, raw: boolean): JQuery;

    /**
    * Returns the Hover-CSS properties of the first element in the current set of matched elements if has.
    */
    hoverCss(): JQuery;
    /**
    * Hover-CSS for each element in the current set of matched elements.
    */
    hoverCss(name, value: string | number): JQuery;
    /**
    * Hover-CSS for each element in the current set of matched elements.
    */
    hoverCss(properties: object): JQuery;

    /**
    * Returns the Hover-Classes of the first element in the current set of matched elements if has.
    */
    hoverClass(): string;
    /**
    * Add specified classes to each element in the current set of matched elements when mouse hover and removes them on out.
    */
    hoverClass(...classes: string[]): JQuery;

    /**
    * Plays the video/audio track.
    */
    play(): JQuery;
    /**
    * Returns if the video/audio track is playing.
    */
    playing(): boolean;
    /**
    * Pauses the video/audio track.
    */
    pause(): JQuery;
    /**
    * Returns if the video/audio track is paused.
    */
    paused(): boolean;
    /**
    * Toggle play/pause for each video/audio track in the current set of matched elements.
    */
    togglePlay(): JQuery;
    /**
    * Gets the current duration of the video/audio track.
    */
    duration(): number;
    /**
    * Gets the volume value of the current video/audio track.
    */
    volume(): number;
    /**
    * Sets the volume value of the video/audio track.
    */
    volume(value: string | number): JQuery;
    /**
    * Gets the video/audio time position.
    */
    playtime(): number;
    /**
    * Sets the video/audio time position.
    */
    playtime(value: string | number): JQuery;

    /**
    * Sets the rotation for each element in the current set of matched elements
    */
    rotate(value: number | string): JQuery;

    /**
    * Changes a font-awesome icon, optionaly change prefix.
    */
    changeIcon(icon: string, prefix?: string): JQuery;

    /**
    * Returns the overlay of every element in the current set of matched elements if has.
    */
    overlay(): JQuery;
    /**
    * Creates, appends and returns an overlay for each element in the current set of matched elements, replace existing if already has.
    */
    overlay(opacity: string | number, duartion?: string | number, color?: string): JQuery;

    /**
    * Triggers the 'valchange' event on an element.
    */
    valchange(): JQuery;
    /**
    * Binds an event handler to the 'valchange' JavaScript event.
    */
    valchange(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
    * Binds an event handler to the 'valchange' JavaScript event.
    */
    valchange(eventData, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
    * Triggers the 'attrchange' event on an element.
    */
    attrchange(): JQuery;
    /**
    * Binds an event handler to the 'attrchange' JavaScript event.
    */
    attrchange(handler: (eventObject: JQueryEventObject) => any): JQuery;
    /**
    * Binds an event handler to the 'valchange' JavaScript event.
    */
    attrchange(eventData, handler: (eventObject: JQueryEventObject) => any): JQuery;

    /**
    * Returns the coordinates relative to the 'position' property.
    */
    cords(): JQueryCoordinates;
    /**
    * Sets the 'left' & 'top' properties of each element in the current set of matched elements.
    */
    cords(coordinates: JQueryCoordinates | any[] | Element | JQuery | string | Array<number | string>, offset?): JQuery;

    /**
    * Claps each element in the current set of matched elements at the specified boundaries.
    */
    bounds(boundaries: JQueryCoordinates | any[] | Element | JQuery | string | [number, number], full?: boolean): JQuery;
    /**
    * Claps each element in the current set of matched elements from the specified start coordinates to the specified target boundaries.
    */
    bounds(boundaries: any, start: JQueryCoordinates | any[] | Element | JQuery | string | [number, number], full?: boolean): JQuery;

    /**
    * Gets the scroll percentage progress of the first element in the current set of matched elements.
    */
    scrollProgress(): number;
    /**
    * Binds an event handler that executes only when the scroll percentage is above the specified minimum value.
    */
    scrollProgress(min, handler: (ev: JQueryEventObject, diff?, pos?) => any): JQuery;
    /**
    * Binds an event handler that executes only when the scroll percentage is within the specified min-max range.
    */
    scrollProgress(min, max, handler: (ev: JQueryEventObject, diff?, pos?) => any): JQuery;
    /**
    * Binds an event handler that executes only when the specified target is within viewport.
    */
    scrollProgress(target, handler: (ev: JQueryEventObject, diff?, pos?) => any): JQuery;

    /**
    * Scrolls the first element from the set of matched elements into view
    */
    scrollIntoView(): JQuery;

    /**
    * Execute an event handler when certain events are being fired outside from one of the current elements in the set of matched elements, optionaly specify the events names.
    */
    out(handler: (eventObject: JQueryEventObject) => any, events?: string): JQuery;

    /**
    * Binds a ripple effect to every element within the current set of matched elements.
    */
    ripple(): JQuery;
    /**
    * Binds a ripple effect with the specified theme color to every element within the current set of matched elements.
    */
    ripple(color: string, duration?: number): JQuery;
    /**
    * Binds a ripple effect with the specified theme color to every element within the current set of matched elements.
    */
    ripple(color: string, duration: number, overlay: boolean | string | number, position?: boolean | string): JQuery;
    /**
    * Binds a ripple effect with the specified theme color to every element within the current set of matched elements.
    */
    ripple(color: string, duration: number, overlay, position, multi?: boolean): JQuery;
}
interface JQueryStatic {
    /**
    * Parses and injects the specified stylesheet rules
    @param rules One or more stylesheet rules structured by Selector and Properties
    */
    injectStyle(rules: StyleRules): void;
    /**
    * Injects the specified stylesheet
    @param style string containing a style representation 
    */
    injectStyle(style: string): void;

    /**
    * Parses the specified stylesheet rules to a css representation
    @param rules One or more stylesheet rules structured by Selector and Properties
    */
    parseStyle(rules: StyleRules): string;

    /**
    * Returns the properties of the specified object
    */
    props(object: any): MemberInfo[];
    /**
    * Iterates trough the properties of the specified object
    */
    props(object: any, fn: (value: any, name: string, i: number) => void): void;
    /**
    * Constructs an instance of properties from a specific type and checks two objects for each property value,
    if one of the two is not null than property is added, if both not null than property from the first object is added, if both null than null is added.
    */
    props<T>(object1: T, object2: T): T;

    /**
    * Checks if the specified object is a function, if successful than the function is called (optionally with arguments), if unsuccessful than the original object is returned
    */
    valFn(obj, args?: any[], thisArg?): any

    /**
    * Returns the specified value without any change. (Mainly for dynamic use)
    */
    defval<T>(value: T): T;
    /**
    * Returns specified value if its not empty, otherwise specified default is returned.
    */
    defval<T>(value: T, def: T): T;
    /**
    * Returns specified value if its satisfies the specified condition, otherwise specified default is returned.
    */
    defval<T>(value: T, def: T, cond: (v: T, d?: T | T[]) => boolean): T;
    /**
    * Returns the first value that is not empty from the specified values.
    */
    defval<T>(values: T[]): T;
    /**
    * Returns the first value that satisfies the specified condition from the specified values.
    */
    defval<T>(values: T[], cond: (v: T, d?: T | T[]) => boolean): T;
    /**
    * Returns the first value that is not empty from the specified values, if not found default is returned.
    */
    defval<T>(values: T[], def: T): T;
    /**
    * Returns the first value that satisfies the specified condition from the specified values, if not found default is returned.
    */
    defval<T>(values: T[], def: T, cond: (v: T, d?: T | T[]) => boolean): T;

    /**
    * Returns the specified color HEX value.
    */
    color(name: ColorPalette | string): string;
    /**
    * Returns the specified color HEX value.
    */
    color(name: keyof { Red, Pink, Purple, DeepPurple, Indigo, Blue, LightBlue, Cyan, Teal, Green, LightGreen, Lime, Yellow, Amber, Orange, DeepOrange, Brown, Grey, BlueGrey }): string;
    /**
    * Returns the specified color with shade HEX value.
    */
    color(name: ColorPalette | string, shade: ColorShade): string;

    /**
    * Calls the specific function or functions and returns an array of results, (optionaly with arguments)
    */
    call(fn: Function | Function[], ...args): any[];
    /**
    * Calls the specific function or functions with a specific thisArg and returns an array of results, (optionaly with arguments)
    */
    call(fn: Function | Function[], thisArg?: any, ...args): any[];

    /**
    * Get the current url hash
    */
    hash(): string;
    /**
    * Set the current url hash
    */
    hash(value: string): void;
    /**
    * Iterates trough the current url hash parameters
    */
    hash(fn: (name: string, value: string) => void): void;
    /**
    * Set the value of the specified url hash parameter
    */
    hash(name: string, value: string): void;
    /**
    * Set one or more of the current url hash parameters
    */
    hash(obj: object): void;

    /**
    * Get the current url
    */
    url(): string;
    /**
    * Set the current url
    */
    url(value: string): void;
    /**
    * Iterates trough the current url search parameters
    */
    url(fn: (name: string, value: string) => void): void;
    /**
    * Set the value of the specified url search parameter
    */
    url(name: string, value: string): void;
    /**
    * Set one or more of the current url search parameters
    */
    url(obj: object): void;

    /**
    * Returns if the specified value is empty (null or undefined)
    */
    isEmpty(val): boolean;

    /**
    * Returns if the specified target is within the specified values.
    */
    isval<T>(target: T, ...values: T[]): boolean;

    /**
    * Writes an empty line to the console.
    */
    console();
    /**
    * Writes the specified value into the console.
    */
    console(value);
    /**
    * Writes the specified values into the console.
    */
    console(...values);

    /**
    * Clears the console.
    */
    clear();
    /**
    * Clears the console after the specified timeout delay (milliseconds) has passed.
    */
    clear(delay: string | number);
    /**
    * Clears the console after the specified timeout delay (milliseconds) has passed if the condition was satisfied.
    */
    clear(delay, condition: Boolean | Function);
    /**
    * Clears the console if the condition is satisfied.
    */
    clear(condition: Boolean | Function);

    scrollLock(): void;
    scrollUnlock(): void;

    hyper(events: string, fn: Function);
    hyper(events: string, selector, fn: Function);

    /**
    * Set parameters used when sending custom ajax request (see 'request').
    */
    setRequest(url: string, error?: Function): JQueryAjaxSettings;
    /**
    * Set parameters used when sending custom ajax request (see 'request').
    */
    setRequest(settings: JQueryAjaxSettings, error?: Function): JQueryAjaxSettings;

    /**
    * Send a request using predefined parameters (see 'setRequest') and the specified key.
    */
    request(key: string, fn?: Function): JQueryXHR;
    /**
    * Send a request using predefined parameters (see 'setRequest') and the specified key.
    */
    request(key: string, fn: Function, error: Function): JQueryXHR;
    /**
    * Send a request using predefined parameters (see 'setRequest') and the specified key and data.
    */
    request(key: string, data, fn?: Function): JQueryXHR;
    /**
    * Send a request using predefined parameters (see 'setRequest') and the specified key and data.
    */
    request(key: string, data, fn: Function, error: Function): JQueryXHR;

    /**
    * Shows a message dialog with the optionaly specified content.
    */
    message(label?, content?, buttons?, color?): JQuery

    /**
    * Returns a new element with the specified tag.
    */
    elem(tag, className?): JQuery;
    /**
    * Returns a new element with the specified tag.
    */
    elem(tag, className, content): JQuery;

    /**
    * Simply creating a new div HtmlElement, optionally with one or more class names.
    */
    div(className?: string): JQuery;
    /**
    * Simply creating a new div HtmlElement, optionally with one or more class names and text value.
    */
    div(className: string, text?): JQuery;

    /**
    * Return a <video> DOM element with the specified source.
    */
    video(src: string | number): JQuery;
    /**
    * Return a <video> DOM element with the specified options.
    */
    video(options: VideoOptions): JQuery;

    /**
    * Create a new <i> DOM element with the specified classess.
    */
    icon(iconClasses?): JQuery;
    /**
    * Create a new <i> DOM element with the specified classess wrapped with a <div> DOM element with it's specified classes.
    */
    icon(iconClasses, wrapperClasses): JQuery;

    /**
    * Returns a <div> DOM element with 100% screen fixed position.
    */
    dialog(className?: string): JQuery;
    /**
    * Returns a <div> DOM element with 100% screen fixed position, optionally with specified background opacity.
    *
    * @param opacity The value for the opacity of the dialog background.
    */
    dialog(className?: string, opacity?: string | number): JQuery;
    /**
    * Returns a <div> DOM element with 100% screen fixed position, optionally with specified background opacity.
    *
    * @param opacity The value for the opacity of the dialog background.
    */
    dialog(className?: string, opacity?: string | number, duartion?: string | number, color?: string): JQuery;

    /**
    * Creates a wrapped <input> DOM element, optionaly with specified label.
    */
    textinput(label?: string | number): JQuery;
    /**
    * Creates a wrapped <input> DOM element, optionaly with specified label and theme color.
    *
    * @param effects Indication of the text-input effects, boolean for disable/enable all effects, To specify specific types: 
    * - 0 (no effects, same as False).
    * - 1 (default, same as True).
    * - 2 (only label raised).
    * - 3 (only label fade).
    * - 4 (label fade, bottom ripple).
    */
    textinput(label, color, effects?): JQuery;
    /**
    * Creates a wrapped <input> DOM element, optionaly with specified label and theme color.
    *
    * @param effects Indication of the text-input effects, boolean for disable/enable all effects, To specify specific types: 
    * - 0 (no effects, same as False).
    * - 1 (default, same as True).
    * - 2 (only label raised).
    * - 3 (only label fade).
    * - 4 (label fade, bottom ripple).
    *
    * @param textarea Indicates if the input should be a textarea element or an input element.
    */
    textinput(label, color, effects, textarea?: boolean): JQuery;

    /**
    * Creates a wrapped date picker, wrapped with an <input> DOM element.
    */
    datepicker(label?: string | number): JQuery;
    /**
    * Creates a wrapped date picker, wrapped with an <input> DOM element.
    */
    datepicker(label, color): JQuery;
    /**
    * Creates a wrapped date picker, wrapped with an <input> DOM element.
    *
    * @param iconclass the classes of the icon for the datepicker.
    * 
    */
    datepicker(label, color, iconclass): JQuery;
    /**
    * Creates a wrapped date picker, wrapped with an <input> DOM element.
    * 
    * @param iconclass the classes of the icon for the datepicker.
    * @param texteffect Indication of the text-input effects, boolean for disable/enable all effects, To specify specific types:
    * - 0 (no effects, same as False).
    * - 1 (default, same as True).
    * - 2 (only label raised).
    * - 3 (only label fade).
    * - 4 (label fade, bottom ripple).
    */
    datepicker(label, color, iconclass, texteffect?): JQuery;

    /**
    * Creates a wrapped select menu, similar to a dropdown menu.
    */
    selectmenu(options, color?): JQuery

    /**
    * Creates a wrapped dropdown, wrapped with an <input> DOM element.
    */
    dropdown(label?): JQuery;
    /**
    * Creates a wrapped dropdown, wrapped with an <input> DOM element.
    */
    dropdown(label, options: string | number | any[] | object): JQuery;
    /**
    * Creates a wrapped dropdown, wrapped with an <input> DOM element.
    */
    dropdown(label, color, options): JQuery;

    /**
    * Displays a snackbar with the specified message, optionally for a specific duration.
    */
    snackbar(message, duration?: number): JQuery;
    /**
    * Displays a snackbar with the specified message and action, optionally for a specific duration.
    */
    snackbar(message, action: JQuery, duration?: number): JQuery;
    /**
    * Displays a snackbar with the specified message and action, optionally for a specific duration.
    */
    snackbar(message, actionText: string, action: Function, duration?: number): JQuery;

    /**
    * Creates a wrapped tabs menu, where each tab consist of an handler which can be specified
    * as a value, element or a function which can optionaly return the value to be displayed.
    *
    * @param tab The tabs of the tab menu, can be a single tab specified by a string, number or JQuery object,
    * or multiple tabs specified by an array of elements or an object with a structure of label-handler.
    *
    * @param handler Value, element or elements to be displayed, or an event handler function to be called when the specified single tab is selected,
    * optionaly can return a value to be displayed.
    *
    * @param color The theme color.
    */
    tabs(tab: JQuery | string | number, handler?: any, color?): JQuery;
    /**
    * Creates a wrapped tabs menu, where each tab consist of an handler which can be specified
    * as a value, element or a function which can optionaly return the value to be displayed.
    *
    * @param tabs The tabs of the tab menu, can be a single tab specified by a string, number or JQuery object,
    * or multiple tabs specified by an array of elements or an object with a structure of label-handler.
    *
    * @param color The theme color.
    */
    tabs(tabs: object, color?): JQuery
    /**
    * Creates a wrapped tabs menu, where each tab consist of an handler which can be specified
    * as a value, element or a function which can optionaly return the value to be displayed.
    *
    * @param tabs The tabs of the tab menu, can be a single tab specified by a string, number or JQuery object,
    * or multiple tabs specified by an array of elements or an object with a structure of label-handler.
    *
    * @param color The theme color.
    */
    tabs(tabs: any[], color?): JQuery

    /**
    * Creates a wrapped checkbox element.
    */
    checkbox(label?, color?): JQuery;

    /**
    * Creates a wrapped button element.
    */
    button(label: string | number | JQuery | any[]): JQuery;
    /**
    * Creates a wrapped button element.
    */
    button(label, className): JQuery;
    /**
    * Creates a wrapped button element.
    */
    button(label, className, click: Function): JQuery;

    /**
     * Creates a wrapped stepper element with the specified steps. optionaly with the specified theme color.
     */
    stepper(steps: any[] | JQuery | object, color?: string): JQuery;
}
interface JQueryEventObject {
    value: any;
}

//- Declare original functions
var originalValFunction: Function = $.fn.val;
var originalAttrFunction: Function = $.fn.attr;

//- Initializations For The Extentions
$(function () {
    //- String
    String.prototype.toNumber = function () {
        var val = this
        if (val.toLowerCase() == 'true') val = 1
        else if (val.toLowerCase() == 'false') val = 0
        return <number>new Number(val)
    }
    String.prototype.foreach = function (f: (char: string, index: number) => string | void, amount?: number): any {

        if (amount == null || amount <= 0) {
            if (typeof (f) == typeof ((char, index) => String)) {
                var Result = "";

                for (var i = 0; i < this.length; i++)
                    Result += f(this.charAt(i), i);

                return Result;
            }
            else
                for (var i = 0; i < this.length; i++)
                    f(this.charAt(i), i);
        }
        else {
            if (typeof (f) == typeof ((char, index) => String)) {
                var Result = "";

                var CurrentResult = "";
                this.foreach((c, i) => {

                    if (i % amount == 0) {
                        Result += f(CurrentResult, i);
                        CurrentResult = "";
                    }
                    else
                        CurrentResult += c;
                });

                return Result;
            }
            else {
                var CurrentResult = "";
                this.foreach((c, i) => {

                    if (i % amount == 0) {
                        f(CurrentResult, i);
                        CurrentResult = "";
                    }
                    else
                        CurrentResult += c;

                });
            }
        }

    }
    String.prototype.remove = function (selector: string | ((i: string) => string)) {
        var Result = "";

        if (typeof (selector) == typeof (String))
            return selector.length > 0 ? this.foreach((c, i) => { return c != selector ? c : null }
                , selector.length) : selector;
        //else if (typeof (selector) == typeof ((i) => String))
        //return selector.length > 0 ? this.foreach((c, i) => selector(c), selector.length) : selector;
        //else if (typeof (selector) == typeof ((i) => Boolean))
        //return selector.length > 0 ? this.foreach((c, i) => (selector typeof ((i) => Boolean)) ? c : null, selector.length) : selector;
        else
            return this;
    }
    String.prototype.empty = function () {
        var Result: string = this.remove(" ");

        if (Result == undefined || Result == null || Result.length == 0)
            return true;

        return false;
    }
    String.prototype.getNumbers = function () {
        return this.replace(new RegExp("\d"), '').toNumber();
    }
    String.prototype.contains = function (text: string, ignoreCase?: boolean) {
        var base = ignoreCase ? this.toLowerCase() : this;
        var selector = ignoreCase ? text.toLowerCase() : text;
        var index = base.indexOf(selector);
        return index >= 0;
    }
    String.prototype.numbersOnly = function () {
        return /^(\d|\d | \d)+$/.test(<string>this);
    }
    String.prototype.matches = function (reg: RegExp | string) {
        var re = new RegExp(reg);
        var s = <string>this;
        var m;

        var rsl = [];
        do {
            m = re.exec(s);
            if (m) {
                rsl.push(m);
            }
        } while (m);
        return rsl;
    }
    String.prototype.addToStart = function (value, condition?: Function) {
        if (!isEmpty(condition) && condition(this, value))
            return value + this
        else if (!this.startsWith(value))
            return value + this
        else
            return this
    }
    String.prototype.title = function (upperSpace?) {
        //- Create local variables
        var value: string = this;

        //- Replace all split characters
        value = value.replaceAll(/[-_]/g, ' ')

        //- Start by removing any extra white-spaces
        value = value.replaceAll(/ {2,}/g, ' ')

        //- Remove any white spaces from start and end
        value = value.replaceAll(/^ *(\S.*\S) *$/g, '$1')

        //- Split inner sentences
        if (upperSpace) {
            if (value.all(i => /[A-Z]/.test(i)))
                value = value.toLowerCase()
            value = value.replaceAll(/([A-Z][^A-Z]*)/g, ' $1')
        }

        //- Set first letter uppercase
        if (!isEmpty(value) && value.length >= 1)
            value = value[0].toUpperCase() + value.substring(1);

        //- Return value
        return value
    }
    String.prototype.all = function (pred) {
        //- Parse predicate
        if ($.type(pred) != 'function')
            pred = i => i == pred

        for (var i = 0; i < this.length; i++)
            if (!(<any>pred)(this[i]))
                return false
        return true
    }
    String.prototype.replaceAll = function (search: string | RegExp, replacement) {
        var target: string = this;
        if (typeof search == 'string')
            return target.split(search).join(replacement);
        else
            return target.replace(search, replacement);
    }

    //- Number
    Number.prototype.empty = function (): boolean {
        if (this == null || this == undefined || <Number>this == Number.NaN || this.toString() == "NaN")
            return true;
        else return false;
    }
    Number.prototype.precentFrom = function (from: number) {
        return (<number>this) / from * 100;
    }
    Number.prototype.precent = function (precent: number) {
        return precent * (<number>this) / 100;
    }
    Number.prototype.clamp = function (min: number, max: number) {
        if (this < min)
            return min
        else if (this > max)
            return max
        else
            return this
    }
    Number.prototype.round = function () {
        return Math.round(this)
    }

    //- Array
    Array.prototype.contains = function (...args) {
        var tar: any[] = this;

        if (args.length == 1) {
            var o = args[0];

            if (typeof o == 'function') {
                for (var i = 0; i < tar.length; i++)
                    if (o(tar[i]))
                        return true;
            }
            else {
                return tar.indexOf(o) >= 0;
            }
        }
        else
            return tar.indexOf(args[0], args[1]) >= 0;

    }
    Array.prototype.first = function (selector?: (item: any, index: number) => boolean) {
        if (isEmpty(selector)) {
            return this.length > 0 ? this[0] : undefined
        }
        else {
            for (var i = 0; i < this.length; i++) {
                var currentItem = this[i];
                if (selector(currentItem, i))
                    return currentItem;
            }
        }
    }
    Array.prototype.select = function (selector: (item: any, index: number) => any): any[] {
        var result = [];

        this.forEach((v, i) => result.push(selector(v, i)));

        return result;
    }
    Array.prototype.to = (action: (array: any[]) => any[]) => action(this);
    Array.prototype.parse = function (separator: string, fn: (s) => any) {
        var s = '';

        this.forEach(function (v, i, a) {
            s += fn(v);
            if (i + 1 != a.length)
                s += separator;
        });

        return s;
    }
    Array.prototype.last = function () {
        if (!isEmpty(this) && this.length - 1 >= 0)
            return this[this.length - 1]
    }
    Array.prototype.at = function (index, def?) {
        var val;

        if (index <= this.length - 1)
            val = this[index]

        if (val == null)
            val = def

        return val
    }
    Array.prototype.toLowerCase = function () {
        return this.select(i => i != null ? i.toString().toLowerCase() : null)
    }
    Array.prototype.any = function (fn) {
        for (var i = 0; i < this.length; i++)
            if (fn(this[i]))
                return true
        return false
    }

    //- JQuery
    jQuery.prototype.finishCss = function (callback?: (j: JQueryEventObject) => any, transitions = true, all = false): JQuery {
        var events = 'animationend'

        if (transitions)
            events += ' transitionend';

        if (all)
            events += ' webkitAnimationEnd oanimationend MSAnimationEnd' + (transitions ? ' webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd' : '');

        //- Create local variables
        var handler = ev => callback.apply(ev.currentTarget, [ev])

        //- Bind events
        return $(this).one(events, handler).data('finish-css-handler', handler);
    }
    jQuery.prototype.offFinishCss = function (transitions = true, all = false) {
        var events: any = 'animationend'

        if (transitions)
            events += ' transitionend';

        if (all)
            events += ' webkitAnimationEnd oanimationend MSAnimationEnd' + (transitions ? ' webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd' : '');

        //- Create local variables
        var handler: (eventObject: JQueryEventObject) => any = $(this).data('finish-css-handler')

        //- Unbind events
        events = events.split(' ')

        return $(this).each((i, e) => {
            events.forEach(n => $(e).off(n, handler))
        })
    }
    jQuery.prototype.replaceClass = function (oldClass: string, newClass: string): JQuery {
        return $(this).removeClass(oldClass).addClass(newClass);
    }
    jQuery.prototype.saveCss = function (name: string | string[]) {
        var tar = $(this);

        if ($.isArray(name)) {
            var names = <string[]>name;

            names.forEach(name => {
                var val = tar.css(name);
                tar = tar.data('data-css-' + name, val);
            });

            return tar;
        }
        else {
            var val = tar.css(name);

            return tar.data('data-css-' + name, val);
        }
    }
    jQuery.prototype.loadCss = function (name: string) {
        return $(this).data('data-css-' + name);
    }
    jQuery.prototype.hasAttr = function (name: string) {
        if (!isEmpty($(this).attr(name)))
            return true;
        else
            return false;
    }
    jQuery.prototype.tag = function (value?) {
        //- Return element tag
        if (isEmpty(value)) {
            return $(this).prop('tagName').toLowerCase();
        }
        //- Change element tag
        else { }

    }
    jQuery.prototype.scale = function (...args) {
        var tar = $(this), sc: string, val, from, to, fn, duration, axis = '', obj = {};

        if ($.isFunction(args[1])) {
            val = args[0];
            fn = args[1];
            axis = '';
        }
        else if ($.isFunction(args[2])) {
            val = args[0];
            duration = args[1];
            fn = args[2];
            axis = '';
        }
        else if ($.isFunction(args[3])) {
            val = args[0];
            duration = args[1];
            axis = args[2].toUpperCase();
            fn = args[3];
        }
        else {
            val = args[0];
            if (args.length >= 2)
                duration = args[1];
            if (args.length >= 3)
                axis = args[2];
        }

        if ($.isPlainObject(val)) {
            from = val.from;
            to = val.to;
        }
        else {
            to = val;
            sc = tar.css('transform');
            if (!isEmpty(sc) && sc.toLowerCase().contains('scale'))
                from = sc.getNumbers();
            else
                from = 1;
        }

        $({ 'scale': from }).animate({ 'scale': to }, {
            duration: duration,
            queue: true,
            start: function () {
                tar.css('transform', 'scale' + axis + '(' + from + ')');
            },
            step: function (v) {
                tar.css('transform', 'scale' + axis + '(' + v + ')');
            },
            always: function () {
                if (!isEmpty(fn))
                    return fn(tar);
            }
        });

        return tar;
    }
    jQuery.prototype.reverse = function () {
        return $($(this).get().reverse());
    }
    jQuery.prototype.iter = function (...args) {
        var fn = args[0], delay = args[1], delta: number;

        if (args.length == 3)
            delta = args[2];
        else
            delta = 0;

        return $(this).each(function (i, e) {
            var deltaDelay = delay;
            delay += delta;

            setTimeout(function () {
                if (!isEmpty(fn))
                    fn(i, e);
            }, (deltaDelay + delta) * (i + 1));

        });
    }
    jQuery.prototype.enterView = function (offset: number, fn?: Function) {
        //- Define local variables
        var ticking: boolean, elements = $(this),
            raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
                return setTimeout(callback, 1000 / 60)
            }

        //- Bind events
        window.addEventListener('resize', () => updateScroll(), true)
        window.addEventListener('scroll', onScroll, true)
        updateScroll()

        function getOffset() {
            const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            if (offset) {
                const num = +(offset.toString().replace('%', '')) / 100
                const fraction = Math.max(0, Math.min(100, num))
                return h - fraction * h
            }
            return h
        }
        function updateScroll() {
            ticking = false
            const distanceFromTop = getOffset();

            elements = elements.filter(function (i, e) {
                const rect = e.getBoundingClientRect();
                const top = rect.top;

                if (top < distanceFromTop) {
                    fn(e)
                    return false
                }

                return true
            })

            if (!elements.length) {
                window.removeEventListener('scroll', onScroll, true)
            }
        }
        function onScroll() {
            if (!ticking) {
                ticking = true
                raf(updateScroll)
            }
        }

        updateScroll();

        return $(this);
    }
    jQuery.prototype.opacity = function (value?, duration?, easing?) {
        if (isEmpty(value)) {
            return $(this).css('opacity')
        }
        else if (isEmpty(duration)) {
            return $(this).css('opacity', value);
        }
        else if (isEmpty(easing)) {
            return $(this).animate({ 'opacity': value }, duration);
        }
        else {
            return $(this).animate({ 'opacity': value }, duration, easing);
        }

    }
    jQuery.prototype.tooltip = function (message, direction?, timeout?) {
        //- Create local variables
        timeout = $.defval(timeout, 300), direction = $.defval(direction, 'left')

        //- Bind events
        $(this).on({
            'mouseenter': ev => {
                //- Match active tooltip
                var tooltip = $('tooltip')

                //- Check if any tooltip matched
                if (!tooltip.length) {
                    tooltip = $.elem('tooltip', '', message).attr('index', 1).appendTo('body')
                }
                else {
                    //- Set tooltip text & index
                    tooltip.text(message).attr('index', tooltip.attr('index').toNumber() + 1)
                }


                //- Position tooltip
                tooltip.cords(ev.currentTarget).css({
                    'left': '+=' + (($(ev.currentTarget).outerWidth(true) / 2) - (tooltip.outerWidth(true) / 2)),
                    'top': '+=' + (($(ev.currentTarget).outerHeight(true) / 2) - (tooltip.outerHeight(true) / 2)),
                })
                switch (direction) {
                    case 'left':
                        tooltip.css({
                            'left': '-=' + (($(ev.currentTarget).outerWidth(true) / 2) - (tooltip.outerWidth(true) / 2) + (tooltip.outerWidth(true))),
                            'margin-left': '-1em'
                        })
                        break;
                    case 'right':
                        tooltip.css({
                            'right': '-=' + (($(ev.currentTarget).outerWidth(true) / 2) - (tooltip.outerWidth(true) / 2) + tooltip.outerWidth(true)),
                            'margin-right': '-1em'
                        })
                        break;
                    case 'top~':
                        tooltip.css({
                            'top': '-=' + (($(ev.currentTarget).outerHeight(true) / 2) - (tooltip.outerHeight(true) / 2) + tooltip.outerHeight(true)),
                            'margin-top': '-1em'
                        })
                        break;
                    case 'bottom~':
                        tooltip.css({
                            'bottom': '-=' + (($(ev.currentTarget).outerHeight(true) / 2) - (tooltip.outerHeight(true) / 2) + tooltip.outerHeight(true)),
                            'margin-bottom': '-1em'
                        })
                        break;
                }
                tooltip.bounds('screen')
            },
            'mouseleave': ev => {
                //- Match active tooltip
                var tooltip = $('tooltip')

                //- Check if any tooltip matched
                if (!tooltip.length) {
                    tooltip = $.elem('tooltip', '', message).attr('index', 1).appendTo('body')
                }

                //- Create local variables
                var index = tooltip.attr('index')

                //- Timeout tooltip
                setTimeout(function () {
                    if (index == tooltip.attr('index'))
                        tooltip.addClass('hide').finishCss(ev => $(ev.currentTarget).remove())
                }, timeout)
            },
        })

        //- Return target
        return $(this)
    }
    jQuery.prototype.shadow = function (value?, raw?) {
        if (isEmpty(value)) {
            return $(this).css('box-shadow')
        }
        else {
            //- Define shadow if 'dp' was specified
            if (/^\d+dp$/.test(value.toString())) {
                if (raw || value.toString().match(/(\d+)dp/) <= 0)
                    return $(this).css('box-shadow', shadows[value.toString()])
                else
                    return $(this).attr('shadow', value.toString().match(/(\d+)dp/).at(1))
            }
        }
        return $(this)
    }
    jQuery.prototype.hoverCss = function (...args) {
        if (typeof (args[0]) == 'object') {
            //- Get specified properties
            var props = args[0]

            //- Check if special shadow specified
            if (/^\d+dp$/.test(props['box-shadow'])) {
                props['box-shadow'] = shadows[props['box-shadow'].toString()]
            }

            return $(this).each((i, e) => {
                //- Define utility functions
                var onenter = function () {
                    //- Save previous css
                    var prev = {}
                    $.props(props).forEach(i => prev[i.Name] = $(e).css(i.Name))
                    $(e).data({
                        'hover-css-prev': prev,
                        'hover-css-props': props,
                    })

                    //- Set css
                    $(e).addClass('hovering').css($(e).data('hover-css-props'))
                }
                var onleave = function () {
                    //- Set css
                    $(e).removeClass('hovering').css($(e).data('hover-css-prev'))
                }

                //- Unbind any previous hover-css event handlers
                if ($(e).has('.has-hover-css'))
                    $(e).off('mouseenter', $(e).data('hover-css-enter'))
                        .off('mouseleave', $(e).data('hover-css-leave'))

                //- Bind current hover-css event handlers
                $(e).addClass('has-hover-css').data({
                    'hover-css-enter': onenter,
                    'hover-css-leave': onleave
                }).on({
                    'mouseenter': onenter,
                    'mouseleave': onleave
                })
            })
        }
        else if (args.length == 2) {
            props = {}
            props[args[0]] = args[1]
            return $(this).hoverCss(props)
        }

        return $(this).data('hover-css-props')
    }
    jQuery.prototype.hoverClass = function (classes?) {

        //- Classes specified
        if (classes != undefined) {

            //- Join classes to one string
            if (typeof classes != 'string')
                classes = (<Array<string>>classes).join(' ')

            //- Return iterate through each element
            return $(this).each((i, e) => {

                //- Define utility functions
                var onenter = function (ev) {
                    $(ev.currentTarget).addClass(classes)
                }
                var onleave = function (ev) {
                    $(ev.currentTarget).removeClass(classes)
                }

                //- Unbind any previous hover-css event handlers
                if ($(e).has('.has-hover-class'))
                    $(e).off('mouseenter', $(e).data('hover-class-enter'))
                        .off('mouseleave', $(e).data('hover-class-leave'))

                //- Bind events and data
                $(e).addClass('has-hover-class').data({
                    'hover-class-enter': onenter,
                    'hover-class-leave': onleave
                }).on({
                    'mouseenter': onenter,
                    'mouseleave': onleave
                })

            })
        }

        //- No argument specified
        else {

            //- Return previous specified classes if has
            return $(this).data('hover-class-classes')

        }

    }
    jQuery.prototype.play = function () {
        return $(this).each((i, e) => (<any>$(e).get(0)).play())
    }
    jQuery.prototype.playing = function () {
        return !(<any>$(this).get(0)).paused
    }
    jQuery.prototype.pause = function () {
        return $(this).each((i, e) => (<any>$(e).get(0)).pause())
    }
    jQuery.prototype.paused = function () {
        return (<any>$(this).get(0)).paused
    }
    jQuery.prototype.togglePlay = function () {
        return $(this).each((i, e) => {
            if (!$(e).playing())
                $(e).play()
            else
                $(e).pause()
        })
    }
    jQuery.prototype.duration = function () {
        return (<any>$(this).get(0)).duration
    }
    jQuery.prototype.volume = function (value?) {
        if (!isEmpty(value))
            return $(this).each((i, e) => (<any>$(e).get(0)).volume = num(value).clamp(0, 1))
        else
            return (<any>$(this).get(0)).volume
    }
    jQuery.prototype.playtime = function (value?) {
        if (!isEmpty(value))
            return $(this).each((i, e) => (<any>$(e).get(0)).currentTime = num(value).clamp(0, $(e).duration()))
        else
            return (<any>$(this).get(0)).currentTime
    }
    jQuery.prototype.rotate = function (value?) {
        if (typeof (value) == 'string')
            value = value.replace('deg', '')
        return $(this).each((i, e) => $(e).css('transform', 'rotate(' + value + 'deg)'))
    }
    jQuery.prototype.changeIcon = function (icon, prefix?) {
        var target = $(this).children('svg').addBack('svg')
        if (!isEmpty(icon))
            target.attr('data-icon', icon)
        if (!isEmpty(prefix))
            target.attr('data-prefix', prefix)
        return $(this)
    }
    jQuery.prototype.overlay = function (opacity, duration = 0, color = '#212121') {
        //- Return overlay of each element if specified
        if (isEmpty(opacity))
            return $(this).children('.overlay-element')

        //- Create local variables
        var overlays = []

        //- Iterate through elements
        $(this).each((i, e) => {
            //- Remove previous overlay if has
            if ($(e).is('.has-overlay'))
                $(e).children('.overlay-element').remove()

            //- Check if special color specified
            switch (color.toLowerCase()) {
                case 'background':
                    color = $(e).css('background')
                    break
                case 'color':
                case 'auto':
                    color = $(e).css('color')
                    break;
            }

            //- Create overlay
            var overlay = $.div('overlay-element')
                .css('background', color)
                .opacity(opacity, duration)
                .appendTo($(e).addClass('has-overlay'))

            //- Append overlay
            overlays.push(overlay)
        })

        //- Return overlays array
        return $(overlays)
    }
    jQuery.prototype.val = function (value) {

        //- Check if any arguments was specified
        if (value != undefined) {

            //- Call original function (Setter)
            var result = originalValFunction.call(this, value)

            //- Fire all 'valchange' events safely
            if (isEmpty($(this).data('valchange-status')))
                $(this).data('valchange-status', 'fired').valchange().removeData('valchange-status')

            //- Return result
            return result
        }

        //- No arguments were specified
        //- Call original function (Getter)
        else
            return originalValFunction.call(this)
    }
    jQuery.prototype.valchange = function (...args) {

        //- No arguments were specified
        if (args.length == 0)
            return $(this).each(function (i, e) {

                //- Trigger all 'valchange' events.
                $(e).trigger($.Event('valchange', { value: $(e).val() }))

            })

        //- Function was specified
        else if (typeof args[0] == 'function')
            return $(this).on('valchange', args[0])

        //- EventData and function was specified
        else
            return $(this).bind('valchange', args[0], args[1])

    }
    jQuery.prototype.attr = function (...args) {
        //- Check if any argument than attribute name was specified
        if (typeof args[0] != 'string' || args.length > 1) {
            if (args.length > 1 && typeof args[1] == 'function') {
                return $(this).each((i, e) => {
                    $(e).attr(args[0], args[1](i, args[0]))
                })
            }
            else if (args.length == 1) {
                var props = $.props(args[0])
                for (var i = 0; i < props.length; i++)
                    $(this).attr(props[i].Name, props[i].Value)
                return $(this)
            }
            else {
                //- Call original function (Setter)
                var result = originalAttrFunction.apply(this, args)

                //- Fire all 'attrchange' events safely
                if (isEmpty($(this).data('attrchange-status')))
                    $(this).data({
                        'attrchange-status': 'fired',
                        'attrchange-value': args
                    }).attrchange().removeData(['attrchange-status', 'attrchange-value'])

                //- Return result
                return result
            }
        }

        //- No arguments were specified
        //- Call original function (Getter)
        else
            return originalAttrFunction.apply(this, args)
    }
    jQuery.prototype.attrchange = function (...args) {
        //- No arguments were specified
        if (args.length == 0)
            return $(this).each(function (i, e) {

                //- Trigger all 'attrchange' events.
                $(e).trigger($.Event('attrchange', { value: $(e).data('attrchange-value') }))

            })

        //- Function was specified
        else if (typeof args[0] == 'function')
            return $(this).on('attrchange', args[0])

        //- EventData and function was specified
        else
            return $(this).bind('attrchange', args[0], args[1])
    }
    jQuery.prototype.cords = function (cords?, offset?) {

        //- Coordinates not specified (Getter)
        if ($.isEmpty(cords) || $.type(cords) == 'boolean') {
            if ($(this).css('position') == 'absolute' && $(this).parent().css('position') == 'relative')
                return $(this).position()
            else {
                cords = $(this).offset()

                //- Scroll offset
                cords.top -= scrollY
                cords.left -= scrollX

                return cords
            }
        }

        //- Coordinates specified (Setter)
        else {
            //- Create local variables
            var offsetLeft: any = '+=0', offsetTop: any = '+=0';

            //- Coordinates target specified
            if ($.type(cords) == 'array') {
                if (cords.length < 2)
                    cords = undefined
                else
                    cords = { left: cords[0], top: cords[1] }
            }
            else {
                if (!($.props(cords).first(i => i.Name.toLowerCase() == 'left') && $.props(cords).first(i => i.Name.toLowerCase() == 'top')))
                    if ($(this).parent().get(0) == $(cords).parent().get(0) && $(this).parent().css('position') == 'relative') {
                        if ($(this).css('position') == 'fixed')
                            $(this).css('position', 'absolute')

                        cords = $(cords).position()
                    }
                    else {
                        cords = $(cords).offset()

                        if (!isEmpty(cords)) {
                            cords.left -= scrollX
                            cords.top -= scrollY
                        }
                    }
            }

            //- Check if target coordinates found
            if (isEmpty(cords))
                return $(this);

            //- Offset was specified
            if (!isEmpty(offset)) {
                if ($.type(offset) == 'number' || $.type(offset) == 'string') {
                    var tempOffset = String(offset).addToStart('+=', (s, v) => !s.startsWith('+=') && !s.startsWith('-='));
                    offsetLeft = tempOffset
                    offsetTop = tempOffset
                }
                else if ($.type(offset) == 'array') {
                    offsetLeft = String(offset[0]).addToStart('+=', (s, v) => !s.startsWith('+=') && !s.startsWith('-='))
                    offsetTop = String(offset[1]).addToStart('+=', (s, v) => !s.startsWith('+=') && !s.startsWith('-='))
                }
                else if ($.type(offset) == 'object') {
                    offsetLeft = String(offset['left']).addToStart('+=', (s, v) => !s.startsWith('+=') && !s.startsWith('-='))
                    offsetTop = String(offset['top']).addToStart('+=', (s, v) => !s.startsWith('+=') && !s.startsWith('-='))
                }
            }

            //- Apply CSS 
            $(this).css({
                'top': cords.top,
                'left': cords.left,
            })

            //- Apply offset
            $(this).css({
                'top': offsetTop,
                'left': offsetLeft,
            })

            //- Return element
            return $(this)
        }

    }
    jQuery.prototype.bounds = function (...args) {
        //- Create local variables
        var current: JQueryCoordinates = $(this).cords()
        var target: JQueryCoordinates = getbounds(args[0])
        var start: JQueryCoordinates = { top: 0, left: 0 }
        var full = true;

        //- Define utility functions
        function getbounds(target) {
            if ($.type(target) == 'array') {
                return { left: target[0], top: target[1] }
            }
            else if ($.type(target) != 'object') {
                if ($.isval(target, 'screen', 'body', 'viewport', 'window', 'document'))
                    return { left: $(window).outerWidth(), top: $(window).outerHeight() }
                else
                    return $(target).cords()
            }

            return target
        }

        //- Parse specified arguments
        if (args.length > 1) {
            if ($.type(args[1]) == 'boolean') {
                full = args[1]
            }
            else if (args.length == 3) {
                start = getbounds(args[1])
                full = args[2]
            }
            else {
                start = getbounds(args[1])
            }
        }

        if (full) {
            target.left -= $(this).outerWidth()
            target.top -= $(this).outerHeight()
        }

        //- Left property
        if (current.left < start.left)
            current.left = start.left
        else if (current.left > target.left)
            current.left = target.left

        //- Top property
        if (current.top < start.top)
            current.top = start.top
        else if (current.top > target.top)
            current.top = target.top

        //- Return element
        return $(this).css({
            left: current.left,
            top: current.top,
        })
    }
    jQuery.prototype.scrollProgress = function (...args) {
        //- Create local variables
        var target: any = $(this).get(0);

        //- Replace html with window
        if (target == $('html').get(0))
            target = $(window).get(0)

        //- Check specified arguments
        if (args.length == 0 && $(this).length) {
            return scrollPrecentage(target);
        }
        else {
            //- Create local variables
            var min = args[0], max = 100, callback, delta = null;

            //- Parse arguments
            if (typeof (args[1]) == 'number')
                max = args[1], callback = args[2];
            else
                callback = args[1];

            //- Bind scroll event
            $(target).scroll(ev => {
                //- Parse dynamic arguments
                if (typeof (args[0]) == 'object' || typeof (args[0]) == 'string')
                    min = scrollPrecentage(target, Math.max($(args[0]).get(0).offsetTop, 0)), max = scrollPrecentage(target, $(args[0]).get(0).offsetTop + $(args[0]).outerHeight(true)), callback = args[1];

                //- Create local variables
                var pos = $(ev.currentTarget).scrollProgress();

                //- Check if pos within minmax
                if (pos >= min && pos <= max && delta) {
                    //- Save position relative to target
                    var targetPos = pos;

                    //- Set pos relative to minmax
                    pos = ((pos - min) / (max - min)) * 100;

                    //- Call callback function
                    callback(ev, pos - delta, pos, targetPos);
                }

                //- Set delta
                delta = pos;
            })
        }
    }
    jQuery.prototype.scrollIntoView = function () {
        //- Create local variables
        var offsetTop = $(this).get(0).offsetTop

        //- Scroll current element into view
        $('html').get(0).scrollTop = isIOS() ? -offsetTop : offsetTop

        //- Return target
        return $(this)
    }
    jQuery.prototype.out = function (handler, events?) {
        //- Create local variables
        var This = this
        var events = $.defval(events, 'mousedown keypress focusin')

        //- Define utility functions
        var onevents = function (ev: JQueryEventObject) {

            if (!$(ev.target).is($(This).find('*')) && !$(ev.target).is(This)) {
                ev.currentTarget = This
                handler(ev)
            }

        }

        //- Raise events
        $('*').one(events, onevents)

        //- Return element
        return $(this)
    }
    jQuery.prototype.ripple = function (color?, duration?, overlay: any = true, position?, multi?) {
        //- Create local variables
        var color = $.defval(color, 'auto')
        var position = isEmpty(position) ? false : position
        var duration = $.defval(duration, position ? 1000 : 500)
        var overlay = $.defval(overlay, true)
        var multi = $.defval(multi, true)
        var on = $.defval(on, 'mousedown')
        var end = $.defval(end, 'mouseleave mouseup')

        //- Define utility functions
        var rippleStart = function (ev: JQueryEventObject) {
            //- Create local variables
            var size = Math.max($(ev.currentTarget).outerWidth(), $(ev.currentTarget).outerHeight())

            //- Remove previous ripples if specified
            if (!multi)
                $(ev.currentTarget).children('.ripple-effect').remove()

            //- Create ripple
            var ripple = $.div('ripple-effect')

            //- Get correct color
            if ($(ev.currentTarget).attr('ripple-color').toLowerCase() == 'auto')
                color = $(ev.currentTarget).css('color')

            //- Apply ripple CSS
            ripple.css({
                'background': color,
                'animation-duration': duration + 'ms',
                width: size,
                height: size,
            })

            //- Define utility functions
            var rippleEnd = function (ev: JQueryEventObject) {
                //- Get all current ripples at element
                var ripples = $(ev.currentTarget).find('.ripple-effect')

                //- Iterate through the ripples of the element
                ripples.each((i, e) => {
                    //- Ripple is finished animating
                    if ($(e).is('.finished')) {
                        $(e).fadeOut(200, () => $(e).remove())
                    }
                    //- Ripple is still active
                    else {
                        $(e).finishCss(ev => $(ev.currentTarget).fadeOut(200, () => $(e).remove()))
                    }
                })

                //- Trigger 'RippleEnd' event
                $(ev.currentTarget).triggerHandler('rippleEnd')
            }

            //- Bind ripple end event
            $(ev.currentTarget).on({
                [end]: ev2 => rippleEnd(ev2)
            })

            //- Bind ripple animation end event
            ripple.finishCss(ev2 => {
                $(ev2.currentTarget).addClass('finished')
            })

            //- Append ripple
            ripple.appendTo(ev.currentTarget)

            //- Apply ripple CSS (2)
            if (!position)
                ripple.css({
                    left: ev.pageX - $(ev.currentTarget).offset().left - ripple.width() / 2,
                    top: ev.pageY - $(ev.currentTarget).offset().top - ripple.height() / 2,
                    right: '',
                    bottom: '',
                })
            else
                if (position == true)
                    ripple.css({
                        margin: 'auto',
                        left: '',
                        top: '',
                    })
                else
                    ripple.css({
                        margin: 'auto',
                        left: '',
                        top: '',
                        right: '',
                        bottom: '',
                        [position]: '-50%',
                    })

            //- Fire rippleStart events
            $(ev.currentTarget).triggerHandler('rippleStart')
        }

        //- Iterate through the elements
        $(this).each((i, e) => {

            //- Bind events
            $(e).on({
                [on]: rippleStart,
                'mouseenter ': ev => {
                    //- Get correct color
                    if ($(ev.currentTarget).attr('ripple-color').toLowerCase() == 'auto')
                        color = $(ev.currentTarget).css('color')

                    //- Append overlay
                    if (!isEmpty(overlay)) {
                        //- Create overlay element
                        var overlayElement = $.div('ripple-effect-overlay')

                        //- Parse overlay color
                        switch ($.type(overlay)) {
                            case 'boolean':
                                if (!overlay) return
                                else overlayElement.css('background', color)
                                break;
                            case 'number':
                                overlayElement.css({ 'background': color, 'opacity': overlay })
                                break
                            case 'string':
                                overlayElement.css('background', overlay)
                                break
                        }

                        //- Remove previous overlay
                        $(e).find('.ripple-effect-overlay').remove()

                        //- Append overlay element
                        overlayElement.appendTo(e)
                    }
                },
                'mouseleave focusout': ev => {
                    //- Fadeout and remove overlay
                    if (!isEmpty(overlay))
                        $(e).find('.ripple-effect-overlay').addClass('hide')
                            .finishCss(() => $(e).find('.ripple-effect-overlay.hide').remove())
                },
                'keyup': ev => {
                    if ($.isval(ev.key, 'Enter', ' ')) {
                        $(ev.currentTarget).click().focusout()
                    }
                    else if ($.isval(ev.key, 'Escape')) {
                        $(ev.currentTarget).focusout()
                    }
                }
            })

        })

        //- Apply element class & attributes
        $(this).attr({
            'ripple-color': color,
            'tabindex': 0,
        })

        //- Return element
        return $(this)
    }

    //- JQueryStatic
    jQuery.props = function (...args) {
        var obj = args[0];

        if (isEmpty(obj))
            obj = {};

        if (typeof obj == 'string' || $.type(obj) == 'array' || obj instanceof Array)
            return [];
        else
            var members = Object.getOwnPropertyNames(obj).select(i => new MemberInfo(i, Object.getOwnPropertyDescriptor(obj, i)));

        if (args.length == 1) {
            return members;
        }
        else if (args.length == 2) {
            if ($.isFunction(args[1])) {
                members.forEach((e, i) => (<Function>args[1])(e.Value, e.Name, i));
            }
            else {
                var obj2 = args[1];
                if (isEmpty(obj2))
                    return obj;
                var members2 = Object.getOwnPropertyNames(obj2).select(i => new MemberInfo(i, Object.getOwnPropertyDescriptor(obj2, i)));
                var result = Object.create(Object.getPrototypeOf(obj));

                var covered = new Array<string>();
                function cover(m: MemberInfo, m2: MemberInfo) {
                    var name = null;
                    var value = null;

                    name = notEmpty(m, m2, (m: MemberInfo) => m.Name);

                    if (!isEmpty(m) && !isEmpty(m.Value) && $.isPlainObject(m.Value) && !isEmpty(m2) && !isEmpty(m2.Value) && $.isPlainObject(m2.Value))
                        value = $.props(m.Value, m2.Value);
                    else
                        value = notEmpty(m, m2, (m: MemberInfo) => m.Value);

                    result[name] = value;
                }

                members.forEach(m => {
                    if (!covered.contains(m.Name)) {
                        var m2 = members2.first(i => i.Name == m.Name);
                        return cover(m, m2);
                    }
                });
                members2.forEach(m2 => {
                    if (!covered.contains(m2.Name)) {
                        var m = members.first(i => i.Name == m2.Name);
                        cover(m, m2);
                    }
                });

                return result;
            }
        }
    }
    jQuery.parseStyle = function (rules: StyleRules) {
        var cssText = '';
        var propWhitespace = '   ';

        $.props(rules, (p, selector: string) => {
            if (selector[0] == '@') {
                cssText += selector + ' {' + '\r\n';

                cssText += $.parseStyle(p);

                cssText += '}' + '\r\n';
            }
            else {
                cssText += selector + ' {' + '\r\n';

                if (typeof p == 'string')
                    cssText += p.replace('\r\n', propWhitespace + '\r\n') + '\r\n';
                else
                    $.props(p, (propVal, propName: string) => cssText += propWhitespace + propName + ': ' + propVal + ';' + '\r\n');

                cssText += '}' + '\r\n';
            }
        });

        return cssText;
    }
    jQuery.injectStyle = function (rules: StyleRules | string) {
        var cssText = "\r\n";

        if (typeof rules == 'string')
            cssText += rules;
        else
            cssText += $.parseStyle(rules);

        if (!$('head').has('style'))
            $('head').append($('<style type="text/css">' + cssText + '</style>'));
        else {
            $('head').append($('<style type="text/css">' +
                $('head style').remove().text() + cssText +
                '</style>'));
        }
    }
    jQuery.valFn = function (obj, args: any[], thisArg) {
        if ($.isFunction(obj)) {
            if (!isEmpty(args) && args.length > 0)
                return (<Function>obj).apply(thisArg, args);
            else
                return (<Function>obj).apply(thisArg);
        }
        else
            return obj;
    }
    jQuery.defval = function (...args) {
        //- One value specified
        if (isEmpty(args[0]) || $.type(args[0]) != 'array') {

            //- Only value specified (Unlikely)
            if (args.length == 1) {

                //- Return specified value
                return args[0]

            }

            //- Value and default was specified
            if (args.length == 2) {

                return !isEmpty(args[0]) ? args[0] : args[1];

            }

            //- Value, default and condition was specified
            else if (args.length == 3) {

                return args[2](args[0], args[1]) ? args[0] : args[1];

            }

        }

        //- Multiple values specified
        else {

            //- Get values
            var arr: Array<any> = args[0]

            //- Only values specified
            if (args.length == 1) {

                //- Return first value that is not empty
                return arr.first(i => !isEmpty(i))

            }

            //- Values and only condition OR only default specified
            else if (args.length == 2) {

                //- Values and condition specified
                if (typeof (args[1]) == 'function') {

                    //- Return the first value that satisfies the specified condition
                    return arr.first(i => args[1](i))

                }

                //- Values and default specified
                else {

                    var val = arr.first(i => !isEmpty(i))
                    return !isEmpty(val) ? val : args[1]

                }

            }

            //- Values, default and condition specified
            else if (args.length == 3) {

                var val = arr.first(i => args[2](i, args[1]))
                return !isEmpty(val) ? val : args[1]

            }

        }

    }
    jQuery.call = function (fn: Function | Function[], thisArg: any, ...args) {
        /**
        * The function to call a single function
        */
        function callF(f: Function) {
            if (!isEmpty(thisArg))
                return f.call(thisArg, args);
            else
                return f.call(undefined, args);
        }
        if (!isEmpty(fn)) {
            if (typeof fn == 'function')
                return [callF(fn)];
            else
                return fn.select(curFn => callF(curFn));
        }
    }
    jQuery.color = function (name?: ColorPalette | string, shade?: ColorShade) {
        if (typeof name == 'string')
            return getColorCode(ColorPalette[name], shade);
        else
            return getColorCode(name, shade);
    }
    jQuery.hash = function (val?: string | object | Function, value?: string) {
        if (val != undefined) {
            if (value == undefined) {
                if (typeof val == 'string') {
                    document.location.hash = val;
                }
                else if (typeof val == 'object') {
                    $.props(val, function (v, n) {
                        $.hash(n, v);
                    });
                }
                else if (typeof val == 'function') {
                    parseHash().forEach((i) => val(i.name, i.value));
                }
            }
            else {
                var h = parseHash();

                if (h.contains(i => i.name.toLowerCase() == val.toString().toLowerCase())) {
                    document.location.hash = h.parse('/', function (i) {
                        if (i.name.toLowerCase() == val.toString().toLowerCase()) {
                            if (isEmpty(value))
                                return '';
                            else
                                return i.name + '=' + value;
                        }
                        else
                            return i.name + '=' + i.value;
                    });
                }
                else {
                    if (!isEmpty(value))
                        h.push({ name: <string>val, value: value });

                    document.location.hash = h.parse('/', i => i.name + '=' + i.value);
                }
            }
        }
        else
            return document.location.hash.substr(1);
    }
    jQuery.url = function (val?: string | object | Function, value?: string) {
        if (val != undefined) {
            if (value == undefined) {
                if (typeof val == 'string') {
                    history.replaceState(null, document.title,
                        encodeURI(
                            encodeURI(value)
                        )
                    );
                }
                else if (typeof val == 'object') {
                    var parts = window.location.toString().split('#');
                    var url = new URL(parts[0]);

                    $.props(val, function (v, n, i) {
                        url.searchParams.set(n, v);
                    });

                    if (parts.length == 2)
                        history.replaceState(null, document.title,
                            encodeURI(
                                encodeURI(url.toString() + '#' + parts[1])
                            )
                        );
                    else
                        history.replaceState(null, document.title,
                            encodeURI(
                                encodeURI(url.toString())
                            )
                        );
                }
                else if (typeof val == 'function') {
                    var parts = window.location.toString().split('#');
                    var url = new URL(parts[0]);

                    url.search
                        .matches(/\??((\w+)=(\w+))&?/gm)
                        .forEach(function (v, i) {
                            val(v[1], decodeURIComponent(val[2]));
                        });
                }

            }
            else {
                var parts = window.location.toString().split('#');
                var url = new URL(parts[0]);

                url.searchParams.set(<string>val, value);

                if (parts.length == 2)
                    history.replaceState(null, document.title,
                        encodeURI(
                            url.toString() + '#' + parts[1]
                        )
                    );
                else
                    history.replaceState(null, document.title,
                        encodeURI(
                            url.toString()
                        )
                    );
            }

        }
        else {
            return decodeURI(document.location.href);
        }
    }
    jQuery.isEmpty = function (val) {
        return isEmpty(val)
    }
    jQuery.isval = function (target: any, ...values) {
        //- Return if values contains target
        return values.contains(target)
    }
    jQuery.console = function (values?) {
        console.log(values)
        return values;
    }
    jQuery.clear = function (...args) {
        //- Create local variables
        var delay, condition;

        if (args.length > 0)
            if ($.isval($.type(args[0]), 'string', 'number')) {
                delay = args[0]

                if (args.length > 1)
                    condition = args[1]
            }
            else if ($.isval($.type(args[0]), 'boolean', 'function')) {
                condition = args[0]
            }

        if (!isEmpty(delay) && !isEmpty(condition))
            setTimeout(() => $.valFn(condition) ? clear() : '', delay)
        else if (!isEmpty(delay))
            setTimeout(() => clear(), delay)
        else if (!isEmpty(condition))
            $.valFn(condition) ? clear() : '';
        else
            clear()
    }
    jQuery.scrollLock = function () {
        //- Create local variables
        var count = 0

        //- Set the scroll lock
        $('html').css('overflow', 'hidden')

        count = !isEmpty($('html').attr('lock-scroll-count')) ? $('html').attr('lock-scroll-count').toString().toNumber() : 0

        if (count < 0) count = 0

        //- Set attr
        $('html').attr('lock-scroll-count', count + 1)
    }
    jQuery.scrollUnlock = function () {
        //- Create local variables
        var count = $('html').attr('lock-scroll-count').toNumber() - 1
        if (count < 0) count = 0

        //- Check if target found
        if (count == 0)
            $('html').css('overflow', '')
        $('html').attr('lock-scroll-count', count)

        return count;
    }
    jQuery.hyper = function (...args) {
        //- Create local variables
        var events = '', selector: any = '*', fn

        //- Parse arguments
        if (args.length == 2) {
            events = args[0]
            fn = args[1]
        }
        else if (args.length == 3) {
            events = args[0]
            fn = args[2]
            selector = args[1]
        }

        //- Bind HTML events
        $(document).on(events, selector, {}, (ev: any) => {
            if ($(ev.target).is(selector)) {
                ev.currentTarget = ev.target
            }
            else if ($(ev.fromElement).is(selector))
                ev.currentTarget = ev.fromElement

            fn(ev)
        })
    }
    jQuery.setRequest = function (...args) {
        //- Parse arguments
        if ($.type(args[0]) == 'string') {
            customRequestSettings = {
                url: args[0]
            }
        }
        else if ($.type(args[0]) == 'object') {
            customRequestSettings = args[0]
        }

        //- Set default error callback if specified
        if (!isEmpty(args[1]))
            customRequestError = args[1]

        //- Validate settings
        if (isEmpty(customRequestSettings.dataType))
            customRequestSettings.dataType = 'Json'
        if (isEmpty(customRequestSettings.type))
            customRequestSettings.type = 'POST'
        if (isEmpty(customRequestSettings.contentType))
            customRequestSettings.contentType = 'application/json; charset=UTF-8'

        return customRequestSettings;
    }
    jQuery.request = function (...args) {
        //- Create local variables
        var settings: JQueryAjaxSettings = customRequestSettings
        var complete: Function, error: Function;

        //- Make sure any settings specified
        if (isEmpty(settings) || isEmpty(settings.url))
            throw 'Cant send request without assigning url'

        //- Parse arguments
        if ($.type(args[1]) != 'function') {
            settings.data = { key: args[0], data: args[1] }
            complete = args[2]
            error = args[3]
        }
        else {
            settings.data = { key: args[0] }
            complete = args[1]
            error = args[2]
        }

        //- Serialize data to JSON
        settings.data = escape(JSON.stringify(settings.data))

        //- Set callbacks
        settings.success = function (response) {
            if (response.result) {
                if (!isEmpty(complete))
                    complete(response.data)
            }
            else {
                if (!isEmpty(error)) {
                    error(response.message, response.stacktrace)
                }
                if (!isEmpty(customRequestError)) {
                    customRequestError(response.message, response.stacktrace)
                }
            }
        }

        //- Send ajax
        return $.ajax(settings)
    }
    jQuery.message = function (label?, content?, buttons?, color?) {
        //- Create overlay
        var overlay = $.dialog('message-overlay', .2).appendTo('body')
        overlay.children().click(ev => {
            dialog.removeClass('active').finishCss(ev => {
                $(ev.currentTarget).remove()
                overlay.fadeOut(200, () => overlay.remove())
            })
        })

        //- Create dialog
        var dialog = $.div('message-dialog').appendTo(overlay)

        //- Create label
        var labelElm = $.elem('label', 'message-dialog-label', label).appendTo(dialog)

        //- Create content
        var contentElm = $.div('message-dialog-content', content).appendTo(dialog)

        //- Create buttons
        var buttonsElm = $.div('message-dialog-buttons').appendTo(dialog)
        if ($.isPlainObject(buttons)) {
            //- Iterate through the specified buttons
            $.props(buttons, function (v, n) {
                //- Create button
                var button = $.button(n, 'message-dialog-button', v).appendTo(buttonsElm)
            })
        }
        else if ($.type(buttons) == 'string') {
            //- Create button
            var button = $.button(buttons, 'message-dialog-button').appendTo(buttonsElm)
        }
        else {
            //- Append specified buttons
            buttonsElm.append(buttons)
        }

        throw 'Message is not implemented yet.'

        //- Return dialog
        //return dialog
    }

    //- JQueryStatic DOMs
    jQuery.elem = function (tag, className?, content?) {
        return $('<' + tag + '></' + tag + '>').addClass(className).append(content)
    }
    jQuery.div = function (className: string = '', text: string = '') {
        return $('<div></div>').addClass(className).text(text);
    }
    jQuery.video = function (options: string | number | VideoOptions) {
        if (typeof (options) == 'string' || typeof (options) == 'number') {
            return $.video({ src: options })
        }
        else {
            var vid = $.elem('video').css({
                'width': options.width,
                'height': options.height,
            })
            if (options.autoplay) vid.attr('autoplay', '')
            if (options.muted) vid.attr('muted', '')
            if (options.controls) vid.attr('controls', '')
            if (options.loop) vid.attr('loop', '')
            if (!isEmpty(options.poster)) vid.attr('poster', options.poster)
            if (!isEmpty(options.preload)) vid.attr('preload', options.preload)
            if (!isEmpty(options.src)) vid.attr('src', options.src)
            return vid
        }
    }
    jQuery.icon = function (iconClasses?, wrapperClasses?) {
        //- Create local variables
        var icon = $.elem('i', iconClasses)
        var wrapper = $.elem('icon', wrapperClasses).append(icon)

        //- Return element
        return wrapperClasses == null ? icon : wrapper
    }
    jQuery.dialog = function (className?, opacity?, duration?, color?) {
        var dialog = $.div('dialog-element ' + className)

        if (!isEmpty(opacity))
            dialog.overlay(opacity, duration, color).addClass('dialog-background')

        return dialog
    }
    jQuery.textinput = function (labeltext?, theme?, effects?, textarea?) {
        //- Create Local Variables
        theme = $.defval(theme, '#008aff')
        effects = $.defval(effects, true)
        textarea = $.defval(textarea, false)

        //- Create element
        var elm = $.div('text-input-element').attr({
            textarea: textarea
        })

        //- Create label if specified
        if (!isEmpty(labeltext)) {

            //- Create labels
            var label = $.div('text-input-element-label').text(labeltext)

            //- Append label
            label.appendTo(elm)

        }

        //- Create input
        var input = $.elem(textarea ? 'textarea' : 'input', 'text-input-element-input').attr({
            'type': 'text',
            'textarea': textarea
        }).appendTo(elm)

        //- Create bottom
        var bottom = $.div('text-input-element-bottom')
            .appendTo(elm)

        //- Define utility functions
        var refreshEffects = function (elem) {
            //- Get effect type
            var effectType = $(elem).attr('effect-type').toNumber()

            //- Apply correct effects
            switch (+effectType) {
                case 0:
                    $(elem).addClass('no-effects')
                    break;
                case 1:
                    $(elem).addClass('label-raise bottom-ripple')
                    break;
                case 2:
                    $(elem).addClass('label-raise')
                    break;
                case 3:
                    $(elem).addClass('label-fade')
                    break;
                case 4:
                    $(elem).addClass('label-fade bottom-ripple')
                    break;
            }
        }

        //- Bind element events & attributes
        elm.hoverClass('hover').attr({
            'effect-type': effects,
        })
            .on({
                'focusin click': ev => {
                    //- Check if input is disabled
                    if ($(ev.currentTarget).children(textarea ? 'textarea' : 'input').is('[disabled]'))
                        return;

                    //- Refresh effects
                    refreshEffects(ev.currentTarget)

                    //- Add class 'active'
                    $(ev.currentTarget).addClass('active focused')

                    //- Apply CSS
                    $(ev.currentTarget).filter('.label-raise')
                        .find('.text-input-element-label')
                        .css('color', theme)
                        .end().end().css('color', theme)

                    //- Apply CSS to bottom
                    $(ev.currentTarget).find('.text-input-element-bottom')
                        .css('border-bottom-color', theme)
                        .css('transform-origin', ev.offsetX + 'px center 0px')

                },
                'focusout': ev => {
                    //- Check if input is disabled
                    if ($(ev.currentTarget).children(textarea ? 'textarea' : 'input').is('[disabled]'))
                        return;

                    //- Check if has any input
                    if (isEmpty($(ev.currentTarget).children(textarea ? 'textarea' : 'input').val()))
                        $(ev.currentTarget).removeClass('active')

                    //- Remove class 'focused' & Apply CSS
                    $(ev.currentTarget).removeClass('focused').filter('.label-raise')
                        .find('.text-input-element-label')
                        .css('color', $.defval($(ev.currentTarget).attr('label-color'), ''))
                        .end().end().css('color', '')
                },
                'valchange': ev => {
                    if (typeof ev.value != 'string')
                        ev.value = ev.value.toString()
                    $(ev.currentTarget).find(textarea ? 'textarea' : 'input').val(ev.value)
                },
                'attrchange': ev => {
                    switch (ev.value[0]) {
                        case 'input-color':
                            $(ev.currentTarget).find(textarea ? 'textarea' : 'input').css('color', ev.value[1])
                            break;
                        case 'bottom-color':
                            $(ev.currentTarget).find('.text-input-element-bottom').css('border-bottom-color', ev.value[1])
                            break;
                        case 'label-color':
                            $(ev.currentTarget).find('.text-input-element-label').css('color', ev.value[1])
                            break;
                        case 'textarea':
                            break;
                    }
                },
            })

        //- Bind input events
        input.on({
            'valchange': ev => {
                //- Fire 'focusin' & 'focusout' events
                $(ev.currentTarget).parent('.text-input-element').focusin().focusout()
            },
            'change': ev => {
                $(ev.currentTarget).parent('.text-input-element').change()
            },
            'keypress keydown keyup mouseclick mousedown mouseup': (ev: JQueryEventObject) => {
                //if (textarea)
                //    $(ev.currentTarget).height('auto').height($(ev.currentTarget).get(0).scrollHeight).resize()

                $(ev.currentTarget).parent('.text-input-element').trigger(ev)
            }
        })

        //- Refresh element effects
        refreshEffects(elm)

        //- Return element
        return elm
    }
    jQuery.datepicker = function (label?, theme?, iconclass?, texteffects?) {
        //- Create local variables
        label = $.defval(label, 'Choose a date')
        theme = $.defval(theme, '#008aff')
        iconclass = $.defval(iconclass, 'far fa-calendar fa-fw')

        //- Create input
        var input = $.textinput(label, theme, texteffects).addClass('date-picker-element')

        //- Create icon
        var icon = $.icon(iconclass, 'text-input-icon date-picker-element-icon fa-layers fa-fw').ripple('rgba(0,0,0,.5)', null, false, true)

        //- Append to input
        input.append([icon])

        //- Define utility functions
        var open = function () {
            //- Create local variables
            var now = new Date()
            var selected = new Date(input.find('input').val())
            var current: Date = now

            if (selected.toString() == 'Invalid Date')
                selected = null

            //- Create dialog element
            var dialog = $.div('date-picker-dialog')

            //- Create table element
            var table = $.elem('table', 'date-picker-dialog-table')

            //- Define utility functions
            var showMonth = function (date: Date) {
                //- Clear current days & Set current date
                $('.date-picker-dialog-week').remove()
                current = date

                //- Iterate through the days of the specified date
                for (var i = 1; i <= date.daysInMonth(); i++) {
                    //- Create week element if needed
                    if (i == 1 || week.children().length == 7)
                        var week = $.elem('tr', 'date-picker-dialog-week').appendTo(table)

                    //- Gap date value
                    if (i == 1) {
                        var currentDay = new Date(date.getFullYear(), date.getMonth(), i);
                        for (var i2 = 0; i2 < currentDay.getDay(); i2++)
                            $.elem('td', 'date-picker-dialog-day date-picker-dialog-day-gap')
                                .text(currentDay.nextMonth(-1).daysInMonth() - i2)
                                .prependTo(week)
                    }

                    //- Create element
                    var elem = $.elem('td', 'date-picker-dialog-day').text(i).ripple(null, null, true, true)
                        .click(ev => {
                            current = new Date(date.getFullYear(), date.getMonth(), $(ev.currentTarget).text().toNumber())
                            input.val(current.dateToString('mm/dd/yyyy'))
                            close()
                        })

                    //- Check for current day
                    if (now.currentYear() == date.currentYear() && now.currentMonth() == date.currentMonth() && now.getDate() == i)
                        elem.addClass('date-picker-dialog-day-current')

                    //- Check for selected day
                    if (!isEmpty(selected) && selected.currentYear() == date.currentYear() && selected.currentMonth() == date.currentMonth() && selected.getDate() == i)
                        elem.addClass('date-picker-dialog-day-selected').css('background', theme).shadow('3dp')
                    else
                        elem.fadeIn(300)

                    //- Append element
                    elem.appendTo(week)
                }

                //- Set date header
                dateHeader.text(date.getFullYear() + ' ' + date.getMonthName())
            }

            //- Buttons wrapper
            var btns = $.div('date-picker-dialog-btns')

            //- Presets wrapper
            var presets = $.div('date-picker-dialog-presets')

            //- Date header button
            var dateHeader = $.div('date-picker-dialog-header-btn').appendTo(btns)

            //- Prev/next buttons
            var moveBtns = $.div('date-picker-dialog-move-btns fa-lg').appendTo(btns)
            var prevIcon = $.icon('fas fa-angle-left fa-fw', 'date-picker-dialog-move-btn').ripple(null, null, .1, true).click(ev => showMonth(current.nextMonth(-1))).appendTo(moveBtns)
            var nextIcon = $.icon('fas fa-angle-right fa-fw', 'date-picker-dialog-move-btn').ripple(null, null, .1, true).click(ev => showMonth(current.nextMonth())).appendTo(moveBtns)

            //- Day titles
            var titles = $.elem('tr', 'date-picker-dialog-titles'), gap = $.elem('th', 'date-picker-dialog-titles-gap')
            'S,M,T,W,T,F,S'.split(',').forEach(i => {
                //- Create element
                var elem = $.elem('th', 'date-picker-dialog-title').text(i)

                //- Append element
                elem.appendTo(titles)
            })

            //- presets
            var preset_now = $.div('date-picker-dialog-preset', 'NOW').appendTo(presets).css('color', theme).ripple().click(ev => {
                current = new Date()
                input.val(current.dateToString('mm/dd/yyyy'))
                close()
            })
            var preset_custom = $.div('date-picker-dialog-preset date-picker-dialog-preset-custom', 'CUSTOM')/*.appendTo(presets)*/.css('color', theme).ripple()
                .click(ev => {
                    $.message('Custom date preset', '', { ACCEPT: ev => { } })
                })

            //- Append to table
            table.append([titles, gap])

            //- Append to dialog
            dialog.append([btns, table, presets])

            //- Show selected month
            showMonth($.defval(selected, now))

            //- Append & Align dialog element dialog
            dialog.shadow('6dp').appendTo('body')
                .cords(icon).bounds('screen')
                .fadeIn(50)
            presets.width(dialog.width())

            //- Bind dialog events
            dialog.out(close)

            //- Lock scroll
            $.scrollLock();
        }
        var close = function () {
            var ev = $('.date-picker-dialog').first()
                .fadeOut(200, () => {
                    //- Remove element
                    $(ev).remove()

                    //- Unlock scroll
                    $.scrollUnlock();
                })
        }

        //- Bind icon events
        icon.on({
            'click': ev => {
                //- Focus on text input
                $(ev.currentTarget).parent().find('input').focusin()

                //- Close any open dialogs
                close()

                //- Open dialog
                open()
            },
        })

        //- Bind input events
        input.on({
            'valchange change': ev => {
                icon.find('span').remove()

                var date = new Date($(ev.currentTarget).find('input').val())
                if (date.toString() != 'Invalid Date')
                    $.elem('span', 'date-picker-element-icon-text fa-layers-text fa-fw fa-inverse')
                        .prop({
                            'data-fa-transform': 'shrink-8 down-3'
                        })
                        .css({
                            'margin-top': '.25em',
                            'font-weight': 900,
                            'font-size': '0.65rem',
                            'color': 'inherit',
                            'left': '1.7em',
                        })
                        .appendTo(icon)
                        .text(date.getDate())
            },
        })

        //- Bind element events
        input.on({
            'valchange': ev => $(ev.currentTarget).find('input').val(ev.value),
        })

        //- Return element
        return input
    }
    jQuery.selectmenu = function (options, color?) {
        //- Create local variables
        var theme = $.defval(theme, color)

        //- Null check options
        if (isEmpty(options))
            options = {}

        //- Create menu
        var menu = $.div('select-menu')

        //- Parse options
        if ($.type(options) == 'array') {
            var tempoptions = {}
            options.forEach(i => tempoptions[i] = null)
            options = tempoptions
        }

        //- Iterate through the options
        $.props(options, function (f, n) {
            //- Create option
            var option = $.div('select-menu-option', n).ripple()

            //- Set option CSS
            option.css({
                'color': theme
            })

            //- Bind option events
            option.on({
                'click': ev => {
                    //- Execute callback if specified
                    if (!isEmpty(f))
                        f(ev)

                    //- Set target classes
                    $(ev.currentTarget).addClass('selected')

                    //- Execute event handlers
                    menu.change()
                },
                'select': ev => option.click()
            })

            //- Append option
            option.appendTo(menu)
        })

        //- Set menu CSS
        menu.shadow('5dp')

        //- Return menu
        return menu
    }
    jQuery.dropdown = function (...args) {
        //- Create local variables
        var label = '', theme = '#008aff', options: any = [], texteffects = true, iconclass = 'fa fa-sort-down fa-fw';

        //- Parse specified arguments
        if (args.length == 1) {
            label = args[0]
        }
        else if (args.length == 2) {
            label = args[0]
            options = args[1]
        }
        else if (args.length == 3) {
            label = args[0]
            theme = args[1]
            options = args[2]
        }

        //- Parse specified options
        if ($.type(options) == 'array') {
            var obj = {};
            options.select(i => obj[i] = null)
            options = obj
        }
        else if ($.type(options) != 'object') {
            options = { [options]: null }
        }

        //- Create input element
        var input = $.textinput(label, theme, texteffects).addClass('dropdown-element')

        //- Create icon element
        var icon = $.icon(iconclass, 'text-input-icon dropdown-element-icon').appendTo(input)

        //- Define utility functions
        var open = function (target: Element | JQuery) {
            if (!isEmpty(input.attr('disabled')) || !isEmpty(input.find('input').attr('disabled')))
                return

            //- Lock scroll
            $.scrollLock();

            //- Close any previous dialogs
            $('.dropdown-element-dialog').each((i, e) => close(e))

            //- Create dropdown dialog
            var drp = $.div('dropdown-element-dialog').attr({ 'tab-index': -1 }).shadow('6dp').appendTo('body')

            //- Define utility functions
            var newOption = function (name, fn?, noneOpt?: boolean) {
                //- Create option element
                var opt = $.div('dropdown-element-dialog-option').text(name)

                if (noneOpt)
                    opt.addClass('none-option')

                //- Bind option effects
                opt.ripple()

                //- Bind option events
                opt.data('dropdown-option-function', fn).on({
                    'click': ev => {
                        if (!$(ev.currentTarget).parent().find('.selected').is(ev.currentTarget)) {
                            $(ev.currentTarget).select()
                            close(drp)
                        }
                    },
                    'select': ev => {
                        //- Define local variables
                        var tar = $(ev.currentTarget)

                        //- Set CSS & classes (1)
                        tar.parent().find('.selected').removeClass('selected').css('color', '')

                        //- Check if option is none option
                        if (!noneOpt) {
                            //- Set CSS & classes (2)
                            tar.addClass('selected').css('color', $.defval(tar.attr('selected-color'), theme))

                            //- Change input value
                            input.find('input').val(tar.text())
                        }

                        //- Check for specified function
                        if (!isEmpty(tar.data('dropdown-option-function')))
                            tar.data('dropdown-option-function')(ev.currentTarget)

                        //- Raise change event
                        drp.change()
                    },
                })

                //- Check if option is selected
                if ($(target).find('input').val() == name)
                    opt.select();

                //- Append option
                return opt.appendTo(drp)
            }

            //- Create default option
            if (!isEmpty(input.attr('no-none')))
                newOption('None', ev => input.val(''), true)

            //- Iterate through the options
            var opts = $.props($(target).data('dropdown-options'))
            if (input.hasAttr('sort'))
                opts.sort().forEach(i => newOption(i.Name, i.Value))
            else
                opts.forEach(i => newOption(i.Name, i.Value))

            //- Bind dropdown events
            drp.out(ev => close(ev.currentTarget))
            drp.on({
                'keydown': ev => {
                    switch (ev.key) {
                        case 'Escape':
                            close(ev.currentTarget)
                            break;
                    }
                },
            })

            //- Align dropdown at target
            drp.cords(target)
                .css({
                    'width': input.width(),
                    'top': '+=' + input.height(),
                })
                .bounds('screen')

        }
        var close = function (target: Element | JQuery) {
            if (!$(target).hasClass('hide'))
                $(target).addClass('hide').fadeOut(200, function () {
                    //- Remove element
                    $(target).remove()

                    //- Unlock scroll
                    $.scrollUnlock();
                })
        }

        //- Bind icon events
        icon.on({
            'click': ev => open($(ev.currentTarget).parent().parent())
        })

        //- Bind input events
        input.on({
            'keyup': ev => {
                if (ev.keyCode == 32 || ev.keyCode == 13)
                    $(ev.currentTarget).parent().find('.dropdown-element-icon').click()
            },
            'click': ev => {
                open(ev.currentTarget)
            },
            'valchange': ev => {
                var match = $.props($(ev.currentTarget).data('dropdown-options')).contains(i => i.Name.toLowerCase() == ev.value.toLowerCase())

                if (!isEmpty(match))
                    $(ev.currentTarget).find('input').val(ev.value)
            }
        })
            .data({
                'dropdown-options': options,
            })
            .find('input').prop('readonly', true)

        //- Return element
        return input
    }
    jQuery.snackbar = function (...args) {
        //- Create local variables
        var message = args.at(0), duration = 4500, action: JQuery;

        //- Parse specified arguments
        if (args.length > 1) {
            //- Message and duration
            if ($.type(args[1]) == 'number') {
                duration = args.at(1, duration)
            }

            //- Message, action and duration
            else if ($.type(args[1]) == 'object') {
                action = args.at(1)
                duration = args.at(2, duration)
            }

            //- Message, actionText, actionFunction, duration
            else if ($.type(args[1]) == 'string') {
                action = $.button(args.at(1), '', args.at(2)).ripple()
                duration = args.at(3, duration)
            }
        }

        //- Create snackbar
        var snack = $.div('snackbar')

        //- Create snackbar message
        var text = $.elem('label', 'snackbar-message', message)

        //- Create utility functions
        var hide = function (target) {
            if (!$(target).is('.hide'))
                $(target).addClass('hide')

            return $(target).finishCss(ev => {
                $(ev.currentTarget).remove()
            })
        }

        //- Set action class
        if (!isEmpty(action))
            action.addClass('snackbar-action')

        //- Set snackbar CSS
        snack.shadow('4dp').hoverClass('hover')

        //- Remove previous snackbar
        hide('.snackbar')

        //- Append snackbar
        snack.append([text, action]).appendTo('body')

        //- Bind events
        snack.mouseleave(ev => {
            if ($(ev.currentTarget).hasClass('timeout'))
                hide(ev.currentTarget)
        })

        //- Hide snackback in duration of time
        if (duration > 0)
            setTimeout(function () {
                snack.addClass('timeout')
                if (!snack.hasClass('hover'))
                    hide(snack)
            }, duration)

        if (snack.outerWidth(true) >= $('html').width() / 2)
            snack.addClass('mobile')

        //- return snackbar
        return snack
    }
    jQuery.tabs = function (...args) {
        //- Create local variables
        var items = [], theme = '#008aff'

        //- Parse specified arguments
        if ($.isval($.type(args[0]), 'string', 'number') || args[0] instanceof jQuery) {
            items.push([args[0], args[1]])
            theme = $.defval(args[2], theme)
        }
        else if ($.type(args[0]) == 'object') {
            $.props(args[0], function (v, n) {
                items.push([n, v])
            })
        }
        else if ($.type(args[0]) == 'array') {
            items = args[0].select(i => [i, null])
        }

        //- Create tabs wrapper
        var wrapper = $.div('tabs-wrapper')/*.attr('slide-height', '')*/
        var tabs = $.div('tabs-menu')

        //- Create bottom wrapper
        var bottomWrapper = $.div('tabs-menu-divider-wrapper')
        var bottom = $.div('tabs-menu-divider-bottom')

        //- Create content view
        var view = $.div('tabs-menu-tab-content-viewer')

        //- Iterate through the items
        items.forEach(i => {
            //- Create tab
            var tab = $.div('tabs-menu-tab')

            //- Create tab label
            var label = $.div('tabs-menu-tab-label').append(i[0])

            //- Create content
            var content = $.div('tabs-menu-tab-content-view').append($.valFn($.defval(i[1], '')))

            //- Bind tab events && data
            tab.on({
                'click select': (ev: JQueryEventObject) => {
                    //- Check if tab is already selected
                    if ($(ev.currentTarget).is('.selected'))
                        return

                    //- Remove previous selected tab
                    $(ev.currentTarget).siblings('.selected').removeClass('selected').css('color', '')

                    //- Set target classes and CSS
                    $(ev.currentTarget).addClass('selected').css('color', theme)

                    //- Create local variables
                    var left = $(ev.currentTarget).position().left, right = $(ev.currentTarget).parent().width() - ($(ev.currentTarget).position().left + $(ev.currentTarget).outerWidth())

                    //- Goes right
                    if (left - bottom.css('left').toNumber() < right - bottom.css('right').toNumber())
                        var transition = 'left .3s, right .5s cubic-bezier(0, 0, 0.34, .8)'
                    //- Goes left
                    else
                        var transition = 'left .5s cubic-bezier(0, 0, 0.34, .8), right .3s'

                    //- Set bottom CSS
                    bottom.css({
                        background: theme,
                        left: left,
                        right: right,
                        transition: transition
                    })

                    //- Hide previous content
                    view.replaceClass('active', 'hide').finishCss(ev => {
                        //- Show current content
                        $(ev.currentTarget).replaceClass('hide', 'active')

                        //- Slide height if specified
                        //if (wrapper.attr('slide-height') != null && !content.hasClass('height-adjusted')) {
                        //}

                        //- Show current view
                        $(ev.currentTarget).children('.tabs-menu-tab-content-view').css('display', 'none')
                        content.css('display', '')
                    })
                    wrapper.change()
                }
            }).data('tab-content', content)

            //- Append tab
            tab.append([label]).appendTo(tabs)

            //- Append view
            view.append([content])
        })

        //- Append to divider wrapper
        bottomWrapper.append([bottom])

        //- Append to tabs
        tabs.append([bottomWrapper])

        //- Append to wrapper
        wrapper.append([tabs, '<hr>', view])

        //- Return tabs
        return wrapper
    }
    jQuery.checkbox = function (text, theme?) {
        //- Create local variables
        theme = $.defval(theme, '#008aff')

        //- Create wrapper
        var wrapper = $.div('checkbox-wrapper').attr('tab-index', 1)

        //- Create label
        var label = $.div('checkbox-element-label', text)

        //- Create element wrapper
        var elementWrapper = $.div('checkbox-element-wrapper').ripple(theme, null, false, true, false)

        //- Create checkbox
        var checkbox = $.div('checkbox-element')

        //- Create input
        var input = $.elem('input', 'checkbox-element-input').attr('type', 'checkbox')

        //- Create checkbox frame
        var frame = $.div('checkbox-element-frame')

        //- Create background
        var background = $.div('checkbox-element-background').css('background', theme)
        var icon = $.icon('far fa-check', 'checkbox-element-background-icon').appendTo(background)

        //- Bind events
        input.on({
            'valchange change click': ev => {
                //- Create local variables
                var v = $(ev.currentTarget).val()

                if (!isEmpty(v))
                    v = parseBoolean(v)

                if (isEmpty(v) || v == false)
                    $(ev.currentTarget).removeAttr('checked').val('false').parentsUntil('.checkbox-wrapper').removeClass('checked')
                else if (!isEmpty(v) && v == true)
                    $(ev.currentTarget).attr('checked', '').val('true').parentsUntil('.checkbox-wrapper').addClass('checked')
            }
        })
        wrapper.on({
            'click': (ev: JQueryEventObject) => {
                //- Set 'checked' attribute
                if ($(ev.currentTarget).find('input').hasAttr('checked'))
                    $(ev.currentTarget).val('false')
                else
                    $(ev.currentTarget).val('true')

                //- Raise 'change' event wrapper
                $(ev.currentTarget).change()
            },
            'valchange': ev => {
                //- Set value to input 
                $(ev.currentTarget).find('input').val(ev.value)

                //- Raise 'change' event wrapper
                $(ev.currentTarget).change()
            }
        })

        //- Append to checkbox
        checkbox.append([input, frame, background])

        //- Append to element wrapper
        elementWrapper.append([checkbox])

        //- Append to wrapper
        wrapper.append([elementWrapper, text != null ? label : null])

        //- Set default value false
        wrapper.val('false')

        //- Return wrapper
        return wrapper
    }
    jQuery.button = function (label, classes?, fn?) {
        //- Create button element
        var btn = $.elem('button', classes, label).attr('type', 'button')

        //- Set events
        btn.click(fn).ready(e => $(btn).mouseleave())

        //- Return button
        return btn
    }
    jQuery.stepper = function (steps: any[] | JQuery | object, theme?) {
        //- Create local variables
        var id = random()

        //- Create stepper
        var stepper = $.elem('stepper').attr('direction', '1'), theme = $.defval(theme, '#008aff');

        //- Create steps & contents
        var stepsElm = $.elem('steps').data('stepper-id', id), contents = $.elem('contents').data('stepper-id', id)

        //- Define utility functions
        var createStep = function (name, v, index) {
            //- Create step
            var step = $.elem('step').ripple('rgba(0,0,0,.2)')

            //- Create title & icon
            var title = $.elem('step-title', '', name),
                icon = $.elem('step-icon', '', index + 1),
                content = $.elem('step-content', '', $.valFn(v)).attr('stage', index + 1)

            //- Set step events
            step.on({
                'click': ev => {
                    //- Raise target 'select' event
                    $(ev.currentTarget).select()
                },
                'select': ev => {
                    //- Remove any previous selections
                    $(ev.currentTarget).siblings('.selected').removeClass('selected').find('step-icon').css('background', '')

                    //- Set current target as selected
                    $(ev.currentTarget).addClass('selected').find('step-icon').css('background', theme)

                    // - Remove previous content selections
                    content.siblings('.selected').removeClass('selected')//-.siblings('[stage=' + (i) + ']').removeClass('selected')

                    //- Show content
                    content.addClass('selected')

                    //- Align content if specified
                    if (stepper.hasClass('align-content'))
                        content.css('top', stepsElm.children('.selected').cords().top)

                    //- Raise stepper 'change' event
                    stepper.change()
                }
            })

            //- Append step
            step.append([title, icon]).appendTo(stepsElm)

            //- Append content
            content.appendTo(contents)
        }

        //- Parse steps
        if ($.isPlainObject(steps)) {
            //- Iterate thorugh the steps
            $.props(steps, (v, n, i) => createStep(n, v, i))
        }
        else if ($.type(steps) == 'array') {
            //- Iterate thorugh the steps
            (<any[]>steps).forEach((n, i) => createStep(n, null, i))
        }
        else {
            //- Iterate thorugh the steps
            $(steps).each((i, e) => createStep(e, null, i))
        }

        //- Append line
        stepsElm.children('step:not(:last-of-type)').after($.elem('line'))

        //- Default select first step
        stepsElm.children('step:first-of-type').select()

        //- Append stepper        
        stepper.append([stepsElm, contents])

        //- Return stepper
        return stepper
    }

    //- Date
    Date.prototype.previousDaysBy = function (Days: number) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() - Days);
    }
    Date.prototype.previousWeeksBy = function (Weeks: number) {
        return this.previousDaysBy((7 * Weeks));
    }
    Date.prototype.previousMonthsBy = function (Months: number) {
        return new Date(this.getFullYear(), this.getMonth() - Months, this.getDate());
    }
    Date.prototype.previousYearsBy = function (Years: number) {
        return this.previousMonthsBy((12 * Years));
    }
    Date.prototype.dateToString = function (Format: string) {
        if (Format == undefined && Format == null)
            Format = "dd/mm/yyyy";

        var Day = this.getDate().toString();
        var Month = (this.getMonth() + 1).toString();
        var Year = this.getFullYear().toString();
        var Hours = this.getHours().toString();
        var Minutes = this.getMinutes().toString();
        var Seconds = this.getSeconds().toString();
        var Milliseconds = this.getMilliseconds().toString();

        if (Day.length == 1)
            Day = "0" + Day;
        if (Month.length == 1)
            Month = "0" + Month;

        Format = Format.replace("d", Day.charAt(0));
        if (Day.length > 1)
            Format = Format.replace("d", Day.charAt(1));

        Format = Format.replace("m", Month.charAt(0));
        if (Month.length > 1)
            Format = Format.replace("m", Month.charAt(1));

        Format = Format.replace("y", Year.charAt(0));
        if (Year.length > 1) {
            Format = Format.replace("y", Year.charAt(1));
            if (Year.length > 2) {
                Format = Format.replace("y", Year.charAt(2));
                if (Year.length > 3)
                    Format = Format.replace("y", Year.charAt(3));
            }
        }

        Format = Format.replace('HH', Hours.length == 1 ? '0' + Hours : Hours)
        Format = Format.replace('MM', Minutes.length == 1 ? '0' + Minutes : Minutes)
        Format = Format.replace('SS', Seconds.length == 1 ? '0' + Seconds : Seconds)
        Format = Format.replace('MS', Milliseconds.length == 1 ? '0' + Milliseconds : Milliseconds)

        return Format;
    }
    Date.prototype.diffInDays = function (date: Date) {
        var one_day = 1000 * 60 * 60 * 24;
        var date1_ms = this.getTime();
        var date2_ms = date.getTime();
        var difference_ms = date2_ms - date1_ms;
        return difference_ms / one_day;
    }
    Date.prototype.currentMonth = function () {
        return this.getUTCMonth() + 1; //months from 1-12
    }
    Date.prototype.currentYear = function () {
        return this.getUTCFullYear()
    }
    Date.prototype.daysInMonth = function () {
        return new Date(this.currentYear(), this.currentMonth(), 0).getDate()
    }
    Date.prototype.lastDayInMonth = function () {
        return new Date(this.currentYear(), this.currentMonth(), 0)
    }
    Date.prototype.nextDay = function (days = 1) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + days);
    }
    Date.prototype.nextMonth = function (months = 1) {
        return new Date(this.getFullYear(), this.getMonth() + months, this.getDate());
    }
    Date.prototype.nextYear = function (years = 1) {
        return new Date(this.getFullYear(), this.getMonth() + years, this.getDate());
    }
    Date.prototype.getMonthName = function () {
        var months = "January, February, March, April, May, June, July, August, September, October, November, December".split(', ')
        return months[this.getMonth()]
    }
    Date.prototype.getDayName = function () {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[this.getDay()];
    }
});

// #endregion

// #region Declarations

var endAnimationEvents = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

/**
* Represents information of a property from an object
*/

class MemberInfo {

    constructor(Name: string, Desc: PropertyDescriptor) {
        this.Name = Name;
        this.Desc = Desc;
    }
    /**
    * The name of the current member 
    */
    public Name: string;

    /**
     * Gets the value of the current member
     */
    public get Value(): any {
        try {
            var val = this.Desc.value;

            if (val == undefined)
                val = this.Desc.get();

            return val;
        } catch (e) { }
    }

    /**
     * The property descriptor of the current member
     */
    public Desc: PropertyDescriptor;

    /**
    * Returns the current member info in the format [Name: Value]
    */
    public toString() {
        return '[' + this.Name + ': ' + this.Value + ']';
    }
}

/**
* Represents one or more stylesheet rules
*/
interface StyleRules {
    /**
    * The selector and properties used for the current stylesheet rule
    */
    [Selector: string]: StyleProperties | string;
}
/**
* Represents one or more stylesheet properties
*/
interface StyleProperties {
    /**
    * The name and value of the current stylesheet property
    */
    [Name: string]: string | number | StyleProperties;
}

interface FromTo {
    from?: string | number;
    to?: string | number;
}

interface VideoOptions {
    src?: number | string;
    width?: number | string;
    height?: number | string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    poster?: any;
    preload?: 'auto' | 'metadata' | 'none' | any;
}


enum ColorPalette { Black, White, Red, Pink, Purple, DeepPurple, Indigo, Blue, LightBlue, Cyan, Teal, Green, LightGreen, Lime, Yellow, Amber, Orange, DeepOrange, Brown, Grey, BlueGrey }
type ColorShade = keyof { 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, A100, A200, A400, A700 }
type ToolTipPos = keyof { Top, Bottom, Left, Right }

var shadows = {
    '0dp': '0 0 0 0 rgba(0,0,0,.2), 0 0 0 0 rgba(0,0,0,.14), 0 0 0 0 rgba(0,0,0,.12)',
    '1dp': '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)',
    '2dp': '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
    '3dp': '0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12)',
    '4dp': '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)',
    '5dp': '0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)',
    '6dp': '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
    '7dp': '0 4px 5px -2px rgba(0,0,0,.2), 0 7px 10px 1px rgba(0,0,0,.14), 0 2px 16px 1px rgba(0,0,0,.12)',
    '8dp': '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
    '9dp': '0 5px 6px -3px rgba(0,0,0,.2), 0 9px 12px 1px rgba(0,0,0,.14), 0 3px 16px 2px rgba(0,0,0,.12)',
    '10dp': '0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12)',
    '11dp': '0 6px 7px -4px rgba(0,0,0,.2), 0 11px 15px 1px rgba(0,0,0,.14), 0 4px 20px 3px rgba(0,0,0,.12)',
    '12dp': '0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)',
    '13dp': '0 7px 8px -4px rgba(0,0,0,.2), 0 13px 19px 2px rgba(0,0,0,.14), 0 5px 24px 4px rgba(0,0,0,.12)',
    '14dp': '0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12)',
    '15dp': '0 8px 9px -5px rgba(0,0,0,.2), 0 15px 22px 2px rgba(0,0,0,.14), 0 6px 28px 5px rgba(0,0,0,.12)',
    '16dp': '0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)',
    '17dp': '0 8px 11px -5px rgba(0,0,0,.2), 0 17px 26px 2px rgba(0,0,0,.14), 0 6px 32px 5px rgba(0,0,0,.12)',
    '18dp': '0 9px 11px -5px rgba(0,0,0,.2), 0 18px 28px 2px rgba(0,0,0,.14), 0 7px 34px 6px rgba(0,0,0,.12)',
    '19dp': '0 9px 12px -6px rgba(0,0,0,.2), 0 19px 29px 2px rgba(0,0,0,.14), 0 7px 36px 6px rgba(0,0,0,.12)',
    '20dp': '0 10px 13px -6px rgba(0,0,0,.2), 0 20px 31px 3px rgba(0,0,0,.14), 0 8px 38px 7px rgba(0,0,0,.12)',
    '21dp': '0 10px 13px -6px rgba(0,0,0,.2), 0 21px 33px 3px rgba(0,0,0,.14), 0 8px 40px 7px rgba(0,0,0,.12)',
    '22dp': '0 10px 14px -6px rgba(0,0,0,.2), 0 22px 35px 3px rgba(0,0,0,.14), 0 8px 42px 7px rgba(0,0,0,.12)',
    '23dp': '0 11px 14px -7px rgba(0,0,0,.2), 0 23px 36px 3px rgba(0,0,0,.14), 0 9px 44px 8px rgba(0,0,0,.12)',
    '24dp': '0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)',
}

// #endregion

// #region Global Functions

/**
 * Unescapes the specified escaped string
 */
declare function unescape(s: string): string;
/**
 * Escapes the specified string
 */
declare function escape(s: string): string;
/**
* Returns a random number
*/
function random() {
    return Math.random();
}
/**
* Returns if the specified value is empty (null or undefined)
*/
function isEmpty(val: any) {
    if (val == null || val == undefined)
        return true;
    else if (typeof val == 'string' && val.empty())
        return true;
    else if (typeof val == 'number' && (isNaN(val) || val == undefined || val == null))
        return true;

    return false;
}
/**
* Checks both objects for 'isEmpty()', if one of the two is not empty than is returned,
  if both not empty than first object is returned, if both empty than null is returned
*/
function notEmpty(obj1, obj2);
/**
* Checks both objects selected value for 'isEmpty()', if one of the two is not empty than is returned,
  if both not empty than first object is returned, if both empty than null is returned
*/
function notEmpty(obj1, obj2, selector?: (obj: any) => any);
/**
* Not empty
*/
function notEmpty(...args) {
    var obj1 = args[0];
    var obj2 = args[1];

    if (args.length == 3) {
        var selector: (obj: any) => any = args[2];

        if (isEmpty(obj1))
            return selector(obj2);
        else if (isEmpty(obj2))
            return selector(obj1);

        obj1 = selector(obj1);
        obj2 = selector(obj2);
    }

    if (!isEmpty(obj1))
        return obj1;
    else
        return obj2;
}
/**
 * Gets and returns the specified URL parameter by name
 */
function getUrlValue(name: string) {
    try {
        return new URL(window.location.toString()).searchParams.get(name);
    } catch (e) { }
}
/**
* Sets the url value by the specified name and returns the full url
*/
function setUrlValue(...params: { name: string, value: any }[]) {
    var parts = window.location.toString().split('#');
    var url = new URL(parts[0]);
    params.forEach(i => {
        if (!isEmpty(i.value))
            url.searchParams.set(i.name, i.value);
        else if (url.searchParams.has(i.name))
            url.searchParams.delete(i.name);
    });

    if (parts.length == 2)
        return url.toString() + '#' + parts[1];
    else
        return url.toString();
}
/**
* Parse the current url hash
*/
function parseHash() {
    return ('#' + document.location.hash).matches(/[#//](\w+)=([^/]+)\\*/g).select(i => { return { name: i[1], value: i[2] } });
}
/**
* Converts the base64 to byte[]
*/
function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
/**
* Gets the unique page id (UID) if exists, if not than a new one is generated and returned
*/
function getUniquePageID() {
    if (isEmpty(UID))
        UID = getUniqueID();

    return UID;
}
/**
* Generates a random Unique ID
*/
function getUniqueID() {
    var val = random().toString();
    return val;
}
function getColorCode(palette: ColorPalette, tone: ColorShade = '500'): string {
    switch (palette) {
        case ColorPalette.Red:
            switch (tone) {
                case '50': return '#FFEBEE';
                case '100': return '#FFCDD2';
                case '200': return '#EF9A9A';
                case '300': return '#E57373';
                case '400': return '#EF5350';
                case '600': return '#E53935';
                case '700': return '#D32F2F';
                case '800': return '#C62828';
                case '900': return '#B71C1C';
                case 'A100': return '#FF8A80';
                case 'A200': return '#FF5252';
                case 'A400': return '#FF1744';
                case 'A700': return '#D50000';

                default:
                case '500':
                    return '#F44336';
            }
        case ColorPalette.Pink:
            switch (tone) {
                case '50': return '#FCE4EC';
                case '100': return '#F8BBD0';
                case '200': return '#F48FB1';
                case '300': return '#F06292';
                case '400': return '#EC407A';
                case '600': return '#D81B60';
                case '700': return '#C2185B';
                case '800': return '#AD1457';
                case '900': return '#880E4F';
                case 'A100': return '#FF80AB';
                case 'A200': return '#FF4081';
                case 'A400': return '#F50057';
                case 'A700': return '#C51162';

                default:
                case '500':
                    return '#E91E63';
            }
        case ColorPalette.Purple:
            switch (tone) {
                case '50': return '#F3E5F5';
                case '100': return '#E1BEE7';
                case '200': return '#CE93D8';
                case '300': return '#BA68C8';
                case '400': return '#AB47BC';
                case '600': return '#8E24AA';
                case '700': return '#7B1FA2';
                case '800': return '#6A1B9A';
                case '900': return '#4A148C';
                case 'A100': return '#EA80FC';
                case 'A200': return '#E040FB';
                case 'A400': return '#D500F9';
                case 'A700': return '#AA00FF';

                default:
                case '500':
                    return '#9C27B0';
            }
        case ColorPalette.DeepPurple:
            switch (tone) {
                case '50': return '#EDE7F6';
                case '100': return '#D1C4E9';
                case '200': return '#B39DDB';
                case '300': return '#9575CD';
                case '400': return '#7E57C2';
                case '600': return '#5E35B1';
                case '700': return '#512DA8';
                case '800': return '#4527A0';
                case '900': return '#311B92';
                case 'A100': return '#B388FF';
                case 'A200': return '#7C4DFF';
                case 'A400': return '#651FFF';
                case 'A700': return '#6200EA';

                default:
                case '500':
                    return '#673AB7';
            }
        case ColorPalette.Indigo:
            switch (tone) {
                case '50': return '#E8EAF6';
                case '100': return '#C5CAE9';
                case '200': return '#9FA8DA';
                case '300': return '#7986CB';
                case '400': return '#5C6BC0';
                case '600': return '#3949AB';
                case '700': return '#303F9F';
                case '800': return '#283593';
                case '900': return '#1A237E';
                case 'A100': return '#8C9EFF';
                case 'A200': return '#536DFE';
                case 'A400': return '#3D5AFE';
                case 'A700': return '#304FFE';

                default:
                case '500':
                    return '#3F51B5';
            }
        case ColorPalette.Blue:
            switch (tone) {
                case '50': return '#E3F2FD';
                case '100': return '#BBDEFB';
                case '200': return '#90CAF9';
                case '300': return '#64B5F6';
                case '400': return '#42A5F5';
                case '600': return '#1E88E5';
                case '700': return '#1976D2';
                case '800': return '#1565C0';
                case '900': return '#0D47A1';
                case 'A100': return '#82B1FF';
                case 'A200': return '#448AFF';
                case 'A400': return '#2979FF';
                case 'A700': return '#2962FF';

                default:
                case '500':
                    return '#2196F3';
            }
        case ColorPalette.LightBlue:
            switch (tone) {
                case '50': return '#E1F5FE';
                case '100': return '#B3E5FC';
                case '200': return '#81D4FA';
                case '300': return '#4FC3F7';
                case '400': return '#29B6F6';
                case '600': return '#039BE5';
                case '700': return '#0288D1';
                case '800': return '#0277BD';
                case '900': return '#01579B';
                case 'A100': return '#80D8FF';
                case 'A200': return '#40C4FF';
                case 'A400': return '#00B0FF';
                case 'A700': return '#0091EA';

                default:
                case '500':
                    return '#03A9F4';
            }
        case ColorPalette.Cyan:
            switch (tone) {
                case '50': return '#E0F7FA';
                case '100': return '#B2EBF2';
                case '200': return '#80DEEA';
                case '300': return '#4DD0E1';
                case '400': return '#26C6DA';
                case '600': return '#00ACC1';
                case '700': return '#0097A7';
                case '800': return '#00838F';
                case '900': return '#006064';
                case 'A100': return '#84FFFF';
                case 'A200': return '#18FFFF';
                case 'A400': return '#00E5FF';
                case 'A700': return '#00B8D4';

                default:
                case '500':
                    return '#00BCD4';
            }
        case ColorPalette.Teal:
            switch (tone) {
                case '50': return '#E0F2F1';
                case '100': return '#B2DFDB';
                case '200': return '#80CBC4';
                case '300': return '#4DB6AC';
                case '400': return '#26A69A';
                case '600': return '#00897B';
                case '700': return '#00796B';
                case '800': return '#00695C';
                case '900': return '#004D40';
                case 'A100': return '#A7FFEB';
                case 'A200': return '#64FFDA';
                case 'A400': return '#1DE9B6';
                case 'A700': return '#00BFA5';

                default:
                case '500':
                    return '#009688';
            }
        case ColorPalette.Green:
            switch (tone) {
                case '50': return '#E8F5E9';
                case '100': return '#C8E6C9';
                case '200': return '#A5D6A7';
                case '300': return '#81C784';
                case '400': return '#66BB6A';
                case '600': return '#43A047';
                case '700': return '#388E3C';
                case '800': return '#2E7D32';
                case '900': return '#1B5E20';
                case 'A100': return '#B9F6CA';
                case 'A200': return '#69F0AE';
                case 'A400': return '#00E676';
                case 'A700': return '#00C853';

                default:
                case '500':
                    return '#4CAF50';
            }
        case ColorPalette.LightGreen:
            switch (tone) {
                case '50': return '#F1F8E9';
                case '100': return '#DCEDC8';
                case '200': return '#C5E1A5';
                case '300': return '#AED581';
                case '400': return '#9CCC65';
                case '600': return '#7CB342';
                case '700': return '#689F38';
                case '800': return '#558B2F';
                case '900': return '#33691E';
                case 'A100': return '#CCFF90';
                case 'A200': return '#B2FF59';
                case 'A400': return '#76FF03';
                case 'A700': return '#64DD17';

                default:
                case '500':
                    return '#8BC34A';
            }
        case ColorPalette.Lime:
            switch (tone) {
                case '50': return '#F9FBE7';
                case '100': return '#F0F4C3';
                case '200': return '#E6EE9C';
                case '300': return '#DCE775';
                case '400': return '#D4E157';
                case '600': return '#C0CA33';
                case '700': return '#AFB42B';
                case '800': return '#9E9D24';
                case '900': return '#827717';
                case 'A100': return '#F4FF81';
                case 'A200': return '#EEFF41';
                case 'A400': return '#C6FF00';
                case 'A700': return '#AEEA00';

                default:
                case '500':
                    return '#CDDC39';
            }
        case ColorPalette.Yellow:
            switch (tone) {
                case '50': return '#FFFDE7';
                case '100': return '#FFF9C4';
                case '200': return '#FFF59D';
                case '300': return '#FFF176';
                case '400': return '#FFEE58';
                case '600': return '#FDD835';
                case '700': return '#FBC02D';
                case '800': return '#F9A825';
                case '900': return '#F57F17';
                case 'A100': return '#FFFF8D';
                case 'A200': return '#FFFF00';
                case 'A400': return '#FFEA00';
                case 'A700': return '#FFD600';

                default:
                case '500':
                    return '#FFEB3B';
            }
        case ColorPalette.Amber:
            switch (tone) {
                case '50': return '#FFF8E1';
                case '100': return '#FFECB3';
                case '200': return '#FFE082';
                case '300': return '#FFD54F';
                case '400': return '#FFCA28';
                case '600': return '#FFB300';
                case '700': return '#FFA000';
                case '800': return '#FF8F00';
                case '900': return '#FF6F00';
                case 'A100': return '#FFE57F';
                case 'A200': return '#FFD740';
                case 'A400': return '#FFC400';
                case 'A700': return '#FFAB00';

                default:
                case '500':
                    return '#FFC107';
            }
        case ColorPalette.Orange:
            switch (tone) {
                case '50': return '#FFF3E0';
                case '100': return '#FFE0B2';
                case '200': return '#FFCC80';
                case '300': return '#FFB74D';
                case '400': return '#FFA726';
                case '600': return '#FB8C00';
                case '700': return '#F57C00';
                case '800': return '#EF6C00';
                case '900': return '#E65100';
                case 'A100': return '#FFD180';
                case 'A200': return '#FFAB40';
                case 'A400': return '#FF9100';
                case 'A700': return '#FF6D00';

                default:
                case '500':
                    return '#FF9800';
            }
        case ColorPalette.DeepOrange:
            switch (tone) {
                case '50': return '#FBE9E7';
                case '100': return '#FFCCBC';
                case '200': return '#FFAB91';
                case '300': return '#FF8A65';
                case '400': return '#FF7043';
                case '600': return '#F4511E';
                case '700': return '#E64A19';
                case '800': return '#D84315';
                case '900': return '#BF360C';
                case 'A100': return '#FF9E80';
                case 'A200': return '#FF6E40';
                case 'A400': return '#FF3D00';
                case 'A700': return '#DD2C00';

                default:
                case '500':
                    return '#FF5722';
            }
        case ColorPalette.Brown:
            switch (tone) {
                case '50': return '#EFEBE9';
                case '100': return '#D7CCC8';
                case '200': return '#BCAAA4';
                case '300': return '#A1887F';
                case '400': return '#8D6E63';
                case '600': return '#6D4C41';
                case '700': return '#5D4037';
                case '800': return '#4E342E';
                case '900': return '#3E2723';

                default:
                case '500':
                    return '#795548';
            }
        case ColorPalette.Grey:
            switch (tone) {
                case '50': return '#FAFAFA';
                case '100': return '#F5F5F5';
                case '200': return '#EEEEEE';
                case '300': return '#E0E0E0';
                case '400': return '#BDBDBD';
                case '600': return '#757575';
                case '700': return '#616161';
                case '800': return '#424242';
                case '900': return '#212121';

                default:
                case '500':
                    return '#9E9E9E';
            }
        case ColorPalette.BlueGrey:
            switch (tone) {
                case '50': return '#ECEFF1';
                case '100': return '#CFD8DC';
                case '200': return '#B0BEC5';
                case '300': return '#90A4AE';
                case '400': return '#78909C';
                case '600': return '#546E7A';
                case '700': return '#455A64';
                case '800': return '#37474F';
                case '900': return '#263238';

                default:
                case '500':
                    return '#607D8B';
            }

        case ColorPalette.Black:
            return '000000';
        case ColorPalette.White:
            return 'ffffff';
    }
}
/**
* Performs a precision round to the specified number by the specified precision
*/
function precisionRound(number: number, precision: number) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function pointWithin(point: [number, number], bounderies: [number, number], bounderiesStart: [number, number] = [0, 0]) {
    var pointX = point[0], pointY = point[1]
    var boundX = bounderies[0], boundY = bounderies[1]
    var boundXstart = bounderiesStart[0], boundYstart = bounderiesStart[1]

    return (pointX >= boundXstart && pointX <= boundX) && (pointY >= boundYstart && pointY <= boundY)
}
function clampPoint(point: [number, number], bounderies: [number, number], bounderiesStart: [number, number] = [0, 0], factor: [number, number] = [0, 0]): [number, number] {
    var pointX = point[0], pointY = point[1]
    var boundX = bounderies[0], boundY = bounderies[1]
    var boundXstart = bounderiesStart[0], boundYstart = bounderiesStart[1]
    var factorX = factor[0], factorY = factor[1]

    if (pointX < boundXstart)
        pointX = boundXstart + factorX
    else if (pointX > boundX)
        pointX = boundX - factorX

    if (pointY < boundYstart)
        pointY = boundYstart + factorY
    else if (pointY > boundY)
        pointY = boundY - factorY

    return [pointX, pointY]
}

function pointWithinScreen(point: [number, number], bounderiesStart: [number, number] = [0, 0]) {
    return pointWithin(point, [screen.width, screen.height], bounderiesStart)
}
function clampPointInScreen(point: [number, number], bounderiesStart: [number, number] = [0, 0], factor: [number, number] = [0, 0]): [number, number] {
    return clampPoint(point, [screen.width, screen.height], bounderiesStart, factor)
}

function num(v): number {
    if (typeof (v) == 'string')
        return v.toNumber()
    else
        return v
}

function clear() {
    console.clear()
}

function dateSwitchDaysAndMonths(date: string, delimiter: string) {
    if (isEmpty(date))
        return;

    var ddmmyy = date.split(delimiter)
    var dd = ddmmyy[0], mm = ddmmyy[1]
    ddmmyy[0] = mm
    ddmmyy[1] = dd
    return ddmmyy.join(delimiter)
}

function download(filename, text) {
    //- Create local vairables
    var element = document.createElement('a');

    //octet-stream
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    // Append anchor to body.
    document.body.appendChild(element);
    element.click();

    // Remove anchor from body
    document.body.removeChild(element);
}

function parseBoolean(val) {
    if ($.type(val) == 'string') {
        if (val.toLowerCase() == 'true')
            val = true
        else if (val.toLowerCase() == 'false')
            val = false
    }
    return new Boolean(val)
}

function isIOS() {
    var x1 = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(<any>window).MSStream;
    var x2 = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    return x1 || x2;
}

function enumKeys(items) {
    return Object.keys(items).filter(k => typeof items[k as any] === "number");
}
function enumValues(items) {
    const keys = enumKeys(items)
    return keys.map(k => items[k as any])
}

const Clipboard = (function (window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        $(textArea).css({
            'opacity': 0,
            'width': 0,
            'height': 0,
            'position': 'fixed'
        })
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range, selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        }
        else
            textArea.select();

        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function (text) {
        createTextArea(text);
        selectText();
    };

    return {
        copy: copy
    };
})(window, document, navigator);

function scrollPrecentage(target, scrollTop = null) {
    //- Create local variables
    var target: any = $(target).get(0), customTop = !!scrollTop;
    var clientHeight = target.clientHeight, scrollHeight = target.scrollHeight;

    //- Set scroll top
    if (!customTop)
        var scrollTop = target.scrollTop;

    //- Check if specified target is window
    if (target == window) {
        if (!customTop)
            scrollTop = $(window).scrollTop();
        clientHeight = $(window).outerHeight(true), scrollHeight = $('html').get(0).scrollHeight;
    }

    //- Return target scroll percentage
    return scrollTop / Math.abs((scrollHeight - clientHeight)) * 100;
}
// #endregion

// #region On ready
$(function () {
    //- Clear console on ready.
    $.clear(clearConsoleOnReadyDelay, () => clearConsoleOnReady)

    //- Set default custom request error callback if not specified
    if (isEmpty(customRequestError))
        customRequestError = function (message, stacktrace) {
            //- Show snackbar
            $.snackbar(message, $.icon('far fa-exclamation-triangle fa-fw', 'error-icon'), 10000).addClass('error-snackbar')

            //- Create local variables
            var exception = new Error(message)

            //- Set exception stacktrace to the specified stacktrace
            if (!isEmpty(stacktrace))
                exception.stack = '\r\n' + stacktrace

            //- Throw exception
            throw exception
        }

    //- Apply default hyper classes
    $.hyper('mouseenter mouseleave mousedown mouseup focusin focusout', '[overlay]', ev => {
        //- Make sure target has 'overlay' attr
        if (!$(ev.currentTarget).hasAttr('overlay'))
            $(ev.currentTarget).attr('overlay', '1-2-3')

        //- Get overlay value
        var overlays = $(ev.currentTarget).attr('overlay').trim().split('-')

        //- Check for overlays length
        if (overlays.length == 1)
            overlays = [null, overlays[0], null]
        else if (overlays.length == 2)
            overlays = [null, overlays[0], overlays[1]]

        //- Define utility functions
        var setOverlay = function (target, opacity) {
            //- Check if target has overlay
            if ($(target).children('overlay').length <= 0)
                $.elem('overlay').appendTo(target)

            //- Set overlay background
            $(target).children('overlay').css({
                opacity: opacity,
                background: $(target).css('color')
            })
        }

        //- Set overlay by event
        switch (ev.type) {
            case 'mouseenter':
            case 'mouseup':
                if (!isEmpty(overlays[1]))
                    setOverlay(ev.currentTarget, (overlays[1].toNumber() / 10))
                break;
            case 'mousedown':
            case 'focusin':
                if (!isEmpty(overlays[2]))
                    setOverlay(ev.currentTarget, (overlays[2].toNumber() / 10))
                break;
            case 'mouseleave':
            case 'focusout':
                if (!isEmpty(overlays[0]))
                    setOverlay(ev.currentTarget, (overlays[0].toNumber() / 10))
                else
                    $(ev.currentTarget).children('overlay').remove()
                break;
        }
    })
    $.hyper('mouseenter mouseleave mousedown mouseup', '[float]', ev => {
        //- Make sure floating target has 'float' attr
        if (!$(ev.currentTarget).hasAttr('float'))
            $(ev.currentTarget).attr('float', '2-3-6')

        //- Get float value
        var floats = $(ev.currentTarget).attr('float').trim().split('-')

        //- Check for floats length
        if (floats.length == 1)
            floats = [null, floats[0], null]
        else if (floats.length == 2)
            floats = [null, floats[0], floats[1]]

        //- Set float by event
        switch (ev.type) {
            case 'mouseenter':
            case 'mouseup':
                if (!isEmpty(floats[1]))
                    $(ev.currentTarget).shadow(floats[1] + 'dp')
                break;
            case 'mousedown':
                if (!isEmpty(floats[2]))
                    $(ev.currentTarget).shadow(floats[2] + 'dp')
                break;
            case 'mouseleave':
                if (!isEmpty(floats[0]))
                    $(ev.currentTarget).shadow(floats[0] + 'dp')
                else
                    $(ev.currentTarget).shadow('')
                break;
        }
    })
    $.hyper('mouseenter mouseleave mousedown mouseup', '.action', ev => {
        if (!isEmpty($(ev.currentTarget).text()))
            $(ev.currentTarget).css('border-radius', '4px')
        else
            $(ev.currentTarget).css('border-radius', '')
    })
    $.hyper('click', '.next-step-btn', (ev: JQueryEventObject) => {
        //- Get id
        var id = $(ev.currentTarget).parents('contents').data('stepper-id')

        //- Get corresponding steps
        $('steps').filter((i, e) => $(e).data('stepper-id') == id).find('step.selected').nextAll('step').first().select()
    })

    //- Initiate needed default hyper classes
    $('[overlay], [float], .action').mouseleave()

    //- Identify IOS
    if (isIOS())
        $('html').attr('ios', '')
    else if (navigator.userAgent.match(/(android)|(webOS)/i))
        $('html').attr('mobile', '')
    else
        $('html').attr('desktop', '')
})
// #endregion

