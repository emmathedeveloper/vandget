
type StyleType = CSSStyleDeclaration | {}

export type PreviousSiblingsOrChildrenCallback = (start?: number , end?: number , called_from_child?: boolean) => (PlugWidget & PlugFragment)[]

export type DOMPositionInfluencerOperation = 'set' | 'add' | 'subtract'

export type Updater<T> = T | (() => T)

export interface MountOptions{

    /**
     * @description The Element to mount the widget's Element on.
     */
    node: Element
    
    /**
     * @description The Position at which to mount the widget's element in the DOM.
     */
    DOMPosition?: number
    
    /**
     * @description Function to get the parent widget childlist.
     */
    getSiblings?: PreviousSiblingsOrChildrenCallback
    
    /**
     * @description Wether to run the provided entry animation when mounting the widget.
     */
    runEntryTransition?: boolean
}

export interface DestroyOptions{    
    /**
     * @description Wether to run the provided exit animation when destroying the widget.
     */
    runExitTransition?: boolean
}


/**
 *@description extends a normal PlugWidget to create fragments that act as a logical fragments widget or normal fragments
*/
export interface PlugFragment extends PlugWidget{

    isFragment?: boolean

    isEachFragment?: boolean

    isNormalFragment?: boolean
}

export interface PlugStyleSheet{
    [name: string] : CSSStyleDeclaration | {}
}


/**
 * @description Builds HTMLElements and inputs them to the DOM
 */
export interface PlugWidget{

    /**
     * @description Gets the id for this particular widget.
     */
    get id() : string
    
    /**
     * @description Returns true if the widget is acting as a component and false if not.
     */
    get isComponent() : boolean
    
    /**
     * @description Returns true if the HTMLElement tied to this widget is present in the DOM and false if not.
     */
    get isMounted() : boolean
    
    /**
     * @description Wether the widget should be affected by parental updates.
     */
    allowStatePassThrough?: boolean
    
    /**
     * @description Interts the HTMLElement tied to this widget into the DOM and mounts it's children widgets if any.
     */
    mount: (options: MountOptions) => void
    
    children?: PreviousSiblingsOrChildrenCallback
    
    /**
     * @description If the widget's HTMLElement is present in the DOM , the HTMLElement is pushed into an array.
     */
    collectMountedElements: (collected: Element[]) => void
    
    /**
     * @description Updates the widget's state and checks for any new change to be applied to it's HTMLElement.
     */
    update: (data?: any) => void
    
    /**
     * @description Destroys the widget and remove it's HTMLElement from the DOM. This method is also called for child widgets if there are any.
     */
    destroy: (options?: DestroyOptions) => void
}

/**
 * @description Configuration used by a PlugWidget to build it's HTMLElement.
 */
export interface PlugWidgetConfig{
    
    tag: keyof HTMLElementTagNameMap

    ref?: PlugRef<unknown>

    transition?: TransitionFunction

    attributes?: {[x: string] : any},
    
    props?: any
    
    style?: StyleType
    
    children?: (PlugWidget & PlugFragment)[]
    
    events?: any
}

/**
 * @description to build it's body.
 */
export interface PlugHigherOrderWidget{

    /**
     * @description Callback to run before the body is mounted on the DOM.
     */
    onBeforeMount?: () => void
    
    /**
     * @description Callback to run after the body is mounted on the DOM.
     */
    onMount?: () => void
    
    /**
     * @description Callback to run when the widget is destroyed.
     */
    onDestroy?: () => void
    
    /**
     * @description Defines the structure of the UI.
     */
    body: PlugWidget | PlugFragment
}

export interface PlugStatelessWidget extends PlugHigherOrderWidget{

    /**
     * @description If set to "true", this widget will update it's body when it's parent is running updates.
     */
    allowParentalUpdate?: boolean
}

export interface PlugStatefulWidget extends PlugHigherOrderWidget{

    /**
     * @description An Array of streams to listen to for updates.
     */
    listen?: PlugStream<any>[]
}

type Unsubscribe = () => void

/**
 * @description Creates a PlugStream which extends a regular stream.
*/
export interface PlugStream<T>{
    
    /**
     * @description Returns true as long as this is a PlugStream.
     */
    get isStream() : boolean

    /**
     * @description Changes the value of the stream to the new value.
     */
    set value(val: T)
    
    /**
     * @description Returns the value of the stream.
     */
    get value() : T
    
    /**
     * @description Adds a component to the stream's watchlist and updates the component whenever it's value changes.
     */
    addToWatchList: (component: PlugWidget) => void
    
    /**
     * @description Removes a component from the stream's watchlist and stops updating the component.
     */
    removeFromWatchList: (id: string) => void
    
    /**
     * @description Changes the value of the PlugStream with reference to it's previous value.
    */
   update: (callback: (value: T) => T) => void

    /**
     * @description Subcribes a callback to this PlugStream and calls the callback whenever it's value changes. Returns an unsubscribe callback .
     * 
     * @returns {Unsubscribe}
     */
    subscribe: (callback:(value: T) => void) => Unsubscribe
}

export interface PlugRef<T>{

    clear() : void

    set current(value: T)

    get current() : T | undefined
}

export interface EachLogicFragmentParams<T>{
    /**
     * @description An Array of values or a function that returns an Array of values.
     */
    values: T[] | PlugStream<T[]>
    
    /**
     * @param {T} value - value to pass to the PlugWidget or Component.
     * 
     * @param {number} index - index of the value in the values Array.
     * 
     * @description A callback that returns a PlugWidget or Component.
     */
    widget: (value: T , index: number) => PlugWidget | PlugWidget | PlugFragment
}

export interface IfLogicFragmentParams{
    condition: Updater<boolean>

    widget: PlugWidget | PlugWidget | PlugFragment
}

export interface AwaitLogicFragmentParams<T>{

    /**
     * @param {Promise<T>} promise - Promise to listen for.
     */
    promise: Promise<T>
    
    /**
     * @param {PlugWidget | PlugFragment} pending - A widget to display while the promise is still pending.
     */
    pending?: PlugWidget | PlugFragment
    
    /**
     * @param {(result: T) => PlugWidget | PlugFragment} fullfilled - A function that takes the resolve value and returns A widget to display when the promise is resolved.
     */
    fullfilled?: (result: T) => PlugWidget | PlugFragment
    
    /**
     * @param {(result: T) => PlugWidget | PlugFragment} fullfilled - A function that takes the reject value and returns A widget to display if the promise is rejected.
     */
    rejected?: (error: any) => PlugWidget | PlugFragment
}

export interface IfLogicFragment extends PlugWidget{
    $elseif: (param: IfLogicFragmentParams) => IfLogicFragment

    $else: (widget: PlugWidget | PlugWidget) => PlugWidget | PlugWidget
}

export type HtmlLogicFragmentParam = string | PlugStream<string>

export type TextTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'b' | 'em' | 'strong' | 'bold'

export type ContainerTypes = 'div' | 'section' 

export type InputTypes = string | 'text' | 'file' | 'password' | 'email' | 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'datetime-local' | 'hidden' | 'image' | 'month' | 'number' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export interface WidgetConfig{

    ref?: PlugRef<unknown>

    id?: Updater<string>,

    className?: Updater<string>

    style?: StyleType

    transition?: TransitionFunction
}

export interface TextConfig extends WidgetConfig{

    type?: TextTypes

    style?: StyleType
}

export interface Alertconfig extends WidgetConfig{

    id?: Updater<string>

    style?: StyleType

    onClick: (e: any) => void

    children?: (PlugWidget | PlugFragment)[]

    onCancel: (e: any) => void 

    child?: PlugWidget | PlugFragment
}

export interface ButtonConfig extends TextConfig{
    
    disabled?: Updater<boolean>
    
    onClick: (e: any) => void
}

export interface ContainerConfig extends WidgetConfig{
    type?: ContainerTypes

    children?: (PlugWidget | PlugFragment)[]
}

export type AnchorTargetTypes = '_blank' | '_parent' | '_self' | '_top'

export interface AnchorConfig extends WidgetConfig{

    href?: Updater<string>
    
    target?: Updater<AnchorTargetTypes>

    child: PlugFragment | PlugWidget
}

export interface InputConfig extends WidgetConfig{
    
    type?: Updater<InputTypes>
    
    value?: Updater<string>

    placeholder?: Updater<string>
    
    onChange?: (e: any) => void
    
    onInput?: (e: any) => void
    
    onBlur?: (e: any) => void
    
    disabled?: Updater<boolean>
    
    multiple?: Updater<boolean>
    
    autoFocus?: boolean
}

export interface TextAreaConfig extends InputConfig{

    cols?: Updater<string | number>

    rows?: Updater<string | number>
}

export interface ImageConfig extends WidgetConfig{

    src?: Updater<string>

    alt?: Updater<string>

    height?: Updater<string|number>

    width?: Updater<string|number>
}

export interface SvgConfig extends WidgetConfig{

    viewBox?: Updater<string>

    height?: Updater<string|number>

    width?: Updater<string|number>

    xlmns?: Updater<string>

    children?: (PlugFragment | PlugWidget)[]
}

export interface SvgPathConfig extends WidgetConfig{
    d?: Updater<string>
}

export interface SvgCircleConfig extends WidgetConfig{
    r?: Updater<string|number>
    
    cx?: Updater<string|number>

    cy?: Updater<string|number>
}

export interface SvgRectConfig extends WidgetConfig{

    x?: Updater<string|number>

    y?: Updater<string|number>

    height?: Updater<string|number>

    width?: Updater<string|number>
}

export interface InteractiveConfig extends WidgetConfig{
    
    type?: ContainerTypes

    child?: PlugWidget | PlugFragment
    
    onBeforexrselect?: (e: any) => void
    
    onAbort?: (e: any) => void
    
    onBeforeinput?: (e: any) => void
    
    onBlur?: (e: any) => void
    
    onCancel?: (e: any) => void

    onCanplay?: (e: any) => void

    onCanplaythrough?: (e: any) => void

    onChange?: (e: any) => void

    onClick?: (e: any) => void

    onClose?: (e: any) => void
    
    onContextlost?: (e: any) => void
    
    onContextmenu?: (e: any) => void
    
    onContextrestored?: (e: any) => void
    
    onCuechange?: (e: any) => void

    onDblclick?: (e: any) => void

    onDrag?: (e: any) => void
    
    onDragend?: (e: any) => void
    
    onDragenter?: (e: any) => void
    
    onDragleave?: (e: any) => void
    
    onDragover?: (e: any) => void
    
    onDragstart?: (e: any) => void
    
    onDrop?: (e: any) => void
    
    onDurationchange?: (e: any) => void
    
    onEmptied?: (e: any) => void
    
    onEnded?: (e: any) => void
    
    onError?: (e: any) => void

    onFocus?: (e: any) => void
    
    onFormdata?: (e: any) => void
    
    onInput?: (e: any) => void
    
    onInvalid?: (e: any) => void
    
    onKeydown?: (e: any) => void

    onKeypress?: (e: any) => void
    
    onKeyup?: (e: any) => void

    onLoad?: (e: any) => void

    onLoadeddata?: (e: any) => void

    onLoadedmetadata?: (e: any) => void
    
    onLoadstart?: (e: any) => void
    
    onMousedown?: (e: any) => void

    onMouseenter?: (e: any) => void
    
    onMouseleave?: (e: any) => void
    
    onMousemove?: (e: any) => void
    
    onMouseout?: (e: any) => void
    
    onMouseover?: (e: any) => void

    onMouseup?: (e: any) => void
    
    onMousewheel?: (e: any) => void
    
    onPause?: (e: any) => void
    
    onPlay?: (e: any) => void

    onPlaying?: (e: any) => void

    onProgress?: (e: any) => void

    onRatechange?: (e: any) => void
    
    onReset?: (e: any) => void
    
    onResize?: (e: any) => void
    
    onScroll?: (e: any) => void
    
    onSecuritypolicyviolation?: (e: any) => void
    
    onSeeked?: (e: any) => void
    
    onSeeking?: (e: any) => void
    
    onSelect?: (e: any) => void
    
    onSlotchange?: (e: any) => void
    
    onStalled?: (e: any) => void
    
    onSubmit?: (e: any) => void

    onSuspend?: (e: any) => void
    
    onTimeupdate?: (e: any) => void
    
    onTouchstart?: (e: any) => void
    
    onTouchcancel?: (e: any) => void

    onTouchmove?: (e: any) => void

    onTouchend?: (e: any) => void

    onToggle?: (e: any) => void
    
    onVolumechange?: (e: any) => void
    
    onWaiting?: (e: any) => void
    
    onWebkitanimationend?: (e: any) => void

    onWebkitanimationiteration?: (e: any) => void
    
    onWebkitanimationstart?: (e: any) => void

    onWebkittransitionend?: (e: any) => void
    
    onWheel?: (e: any) => void

    onAuxclick?: (e: any) => void
    
    onGotpointercapture?: (e: any) => void
    
    onLostpointercapture?: (e: any) => void

    onPointerdown?: (e: any) => void

    onPointermove?: (e: any) => void

    onPointerrawupdate?: (e: any) => void

    onPointerup?: (e: any) => void
    
    onPointercancel?: (e: any) => void

    onPointerover?: (e: any) => void
    
    onPointerout?: (e: any) => void
    
    onPointerenter?: (e: any) => void
    
    onPointerleave?: (e: any) => void

    onSelectstart?: (e: any) => void
    
    onSelectionchange?: (e: any) => void
    
    onAnimationend?: (e: any) => void
    
    onAnimationiteration?: (e: any) => void
    
    onAnimationstart?: (e: any) => void

    onTransitionrun?: (e: any) => void
    
    onTransitionstart?: (e: any) => void
    
    onTransitionend?: (e: any) => void

    onTransitioncancel?: (e: any) => void

    onCopy?: (e: any) => void

    onCut?: (e: any) => void

    onPaste?: (e: any) => void

    onContentvisibilityautostatechange?: (e: any) => void

    onScrollend?: (e: any) => void

    onBeforetoggle?: (e: any) => void

    onBeforematch?: (e: any) => void
    
    onBeforecopy?: (e: any) => void

    onBeforecut?: (e: any) => void

    onBeforepaste?: (e: any) => void

    onSearch?: (e: any) => void

    onFullscreenchange?: (e: any) => void

    onFullscreenerror?: (e: any) => void

    onWebkitfullscreenchange?: (e: any) => void

    onWebkitfullscreenerror?: (e: any) => void
}

export interface TransitionConfig{

    from: CSSStyleDeclaration | {}

    to: CSSStyleDeclaration | {}

    exit?: CSSStyleDeclaration | {},

    duration?: number

    delay?: number
}

export type TransitionFunction = (node?: Element) => TransitionConfig

export interface RouteConfig{
    path: string

    widget: () => PlugWidget
}

export interface RouteMatch{
    isMatch: boolean,

    path: string,

    to: string,

    params: any
}

export interface RouterParams{

    onRouteChange?: (route: RouteMatch) => void,

    routes: RouteConfig[]
}

export interface NavigationOptions{

    replace?: boolean
}

export interface LinkWidget extends WidgetConfig{
    to: string

    options?: NavigationOptions

    child?: PlugWidget | PlugFragment
}

