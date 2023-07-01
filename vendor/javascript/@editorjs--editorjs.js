typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"&&self;function xe(g){return g&&g.__esModule&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g}function Be(){}Object.assign(Be,{default:Be,register:Be,revert:function(){},__esModule:!0});Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(g){const f=(this.document||this.ownerDocument).querySelectorAll(g);let b=f.length;for(;--b>=0&&f.item(b)!==this;);return b>-1});Element.prototype.closest||(Element.prototype.closest=function(g){let f=this;if(!document.documentElement.contains(f))return null;do{if(f.matches(g))return f;f=f.parentElement||f.parentNode}while(null!==f);return null});Element.prototype.prepend||(Element.prototype.prepend=function(g){const f=document.createDocumentFragment();Array.isArray(g)||(g=[g]),g.forEach((g=>{const b=g instanceof Node;f.appendChild(b?g:document.createTextNode(g))})),this.insertBefore(f,this.firstChild)});Element.prototype.scrollIntoViewIfNeeded||(Element.prototype.scrollIntoViewIfNeeded=function(g){g=0===arguments.length||!!g;const f=this.parentNode,b=window.getComputedStyle(f,null),v=parseInt(b.getPropertyValue("border-top-width")),w=parseInt(b.getPropertyValue("border-left-width")),E=this.offsetTop-f.offsetTop<f.scrollTop,C=this.offsetTop-f.offsetTop+this.clientHeight-v>f.scrollTop+f.clientHeight,B=this.offsetLeft-f.offsetLeft<f.scrollLeft,T=this.offsetLeft-f.offsetLeft+this.clientWidth-w>f.scrollLeft+f.clientWidth,I=E&&!C;(E||C)&&g&&(f.scrollTop=this.offsetTop-f.offsetTop-f.clientHeight/2-v+this.clientHeight/2),(B||T)&&g&&(f.scrollLeft=this.offsetLeft-f.offsetLeft-f.clientWidth/2-w+this.clientWidth/2),(E||C||B||T)&&!g&&this.scrollIntoView(I)});let Ot=(g=21)=>crypto.getRandomValues(new Uint8Array(g)).reduce(((g,f)=>(f&=63,g+=f<36?f.toString(36):f<62?(f-26).toString(36).toUpperCase():f>62?"-":"_",g)),"");var g=(g=>(g.VERBOSE="VERBOSE",g.INFO="INFO",g.WARN="WARN",g.ERROR="ERROR",g))(g||{});const f={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,LEFT:37,UP:38,DOWN:40,RIGHT:39,DELETE:46,META:91},b={LEFT:0,WHEEL:1,RIGHT:2,BACKWARD:3,FORWARD:4};function ge(g,f,b="log",v,w="color: inherit"){if(!("console"in window)||!window.console[b])return;const E=["info","log","warn","error"].includes(b),C=[];switch(ge.logLevel){case"ERROR":if("error"!==b)return;break;case"WARN":if(!["error","warn"].includes(b))return;break;case"INFO":if(!E||g)return;break}v&&C.push(v);const B="Editor.js 2.27.2",T="line-height: 1em;\n            color: #006FEA;\n            display: inline-block;\n            font-size: 11px;\n            line-height: 1em;\n            background-color: #fff;\n            padding: 4px 9px;\n            border-radius: 30px;\n            border: 1px solid rgba(56, 138, 229, 0.16);\n            margin: 4px 5px 4px 0;";g&&(E?(C.unshift(T,w),f=`%c${B}%c ${f}`):f=`( ${B} )${f}`);try{E?v?console[b](`${f} %o`,...C):console[b](f,...C):console[b](f)}catch{}}ge.logLevel="VERBOSE";function At(g){ge.logLevel=g}const v=ge.bind(window,!1),w=ge.bind(window,!0);function te(g){return Object.prototype.toString.call(g).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function D(g){return"function"===te(g)||"asyncfunction"===te(g)}function j(g){return"object"===te(g)}function J(g){return"string"===te(g)}function Nt(g){return"boolean"===te(g)}function Ve(g){return"number"===te(g)}function Ze(g){return"undefined"===te(g)}function V(g){return!g||0===Object.keys(g).length&&g.constructor===Object}function tt(g){return g>47&&g<58||32===g||13===g||229===g||g>64&&g<91||g>95&&g<112||g>185&&g<193||g>218&&g<223}async function ot(g,f=(()=>{}),b=(()=>{})){async function o(g,f,b){try{await g.function(g.data),await f(Ze(g.data)?{}:g.data)}catch{b(Ze(g.data)?{}:g.data)}}return g.reduce((async(g,v)=>(await g,o(v,f,b))),Promise.resolve())}function it(g){return Array.prototype.slice.call(g)}function oe(g,f){return function(){const b=this,v=arguments;window.setTimeout((()=>g.apply(b,v)),f)}}function Rt(g){return g.name.split(".").pop()}function Dt(g){return/^[-\w]+\/([-+\w]+|\*)$/.test(g)}function Pt(g,f,b){let v;return(...w)=>{const E=this,r=()=>{v=null,b||g.apply(E,w)},C=b&&!v;window.clearTimeout(v),v=window.setTimeout(r,f),C&&g.apply(E,w)}}function Te(g,f,b){let v,w,E,C=null,B=0;b||(b={});const l=function(){B=!1===b.leading?0:Date.now(),C=null,E=g.apply(v,w),C||(v=w=null)};return function(){const T=Date.now();!B&&!1===b.leading&&(B=T);const I=f-(T-B);return v=this,w=arguments,I<=0||I>f?(C&&(clearTimeout(C),C=null),B=T,E=g.apply(v,w),C||(v=w=null)):!C&&!1!==b.trailing&&(C=setTimeout(l,I)),E}}function Ft(){const g={win:!1,mac:!1,x11:!1,linux:!1},f=Object.keys(g).find((g=>-1!==window.navigator.appVersion.toLowerCase().indexOf(g)));return f&&(g[f]=!0),g}function ke(g){return g[0].toUpperCase()+g.slice(1)}function Se(g,...f){if(!f.length)return g;const b=f.shift();if(j(g)&&j(b))for(const f in b)j(b[f])?(g[f]||Object.assign(g,{[f]:{}}),Se(g[f],b[f])):Object.assign(g,{[f]:b[f]});return Se(g,...f)}function nt(g){const f=Ft();return g=g.replace(/shift/gi,"⇧").replace(/backspace/gi,"⌫").replace(/enter/gi,"⏎").replace(/up/gi,"↑").replace(/left/gi,"→").replace(/down/gi,"↓").replace(/right/gi,"←").replace(/escape/gi,"⎋").replace(/insert/gi,"Ins").replace(/delete/gi,"␡").replace(/\+/gi," + "),g=f.mac?g.replace(/ctrl|cmd/gi,"⌘").replace(/alt/gi,"⌥"):g.replace(/cmd/gi,"Ctrl").replace(/windows/gi,"WIN"),g}function Ht(g){try{return new URL(g).href}catch{}return"//"===g.substring(0,2)?window.location.protocol+g:window.location.origin+g}function zt(){return Ot(10)}function jt(g){window.open(g,"_blank")}function Ut(g=""){return`${g}${Math.floor(1e8*Math.random()).toString(16)}`}function Ie(g,f,b){const v=`«${f}» is deprecated and will be removed in the next major release. Please use the «${b}» instead.`;g&&w(v,"warn")}function ae(g,f,b){const v=b.value?"value":"get",w=b[v],E=`#${f}Cache`;if(b[v]=function(...g){return void 0===this[E]&&(this[E]=w.apply(this,...g)),this[E]},"get"===v&&b.set){const f=b.set;b.set=function(b){delete g[E],f.apply(this,b)}}return b}const E=650;function ee(){return window.matchMedia(`(max-width: ${E}px)`).matches}const C=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1);function $t(g,f){const b=Array.isArray(g)||j(g),v=Array.isArray(f)||j(f);return b||v?JSON.stringify(g)===JSON.stringify(f):g===f}class d{
/**
   * Check if passed tag has no closed tag
   *
   * @param {HTMLElement} tag - element to check
   * @returns {boolean}
   */
static isSingleTag(g){return g.tagName&&["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"].includes(g.tagName)}
/**
   * Check if element is BR or WBR
   *
   * @param {HTMLElement} element - element to check
   * @returns {boolean}
   */static isLineBreakTag(g){return g&&g.tagName&&["BR","WBR"].includes(g.tagName)}
/**
   * Helper for making Elements with class name and attributes
   *
   * @param  {string} tagName - new Element tag name
   * @param  {string[]|string} [classNames] - list or name of CSS class name(s)
   * @param  {object} [attributes] - any attributes
   * @returns {HTMLElement}
   */static make(g,f=null,b={}){const v=document.createElement(g);Array.isArray(f)?v.classList.add(...f):f&&v.classList.add(f);for(const g in b)Object.prototype.hasOwnProperty.call(b,g)&&(v[g]=b[g]);return v}
/**
   * Creates Text Node with the passed content
   *
   * @param {string} content - text content
   * @returns {Text}
   */static text(g){return document.createTextNode(g)}
/**
   * Append one or several elements to the parent
   *
   * @param  {Element|DocumentFragment} parent - where to append
   * @param  {Element|Element[]|DocumentFragment|Text|Text[]} elements - element or elements list
   */static append(g,f){Array.isArray(f)?f.forEach((f=>g.appendChild(f))):g.appendChild(f)}
/**
   * Append element or a couple to the beginning of the parent elements
   *
   * @param {Element} parent - where to append
   * @param {Element|Element[]} elements - element or elements list
   */static prepend(g,f){Array.isArray(f)?(f=f.reverse(),f.forEach((f=>g.prepend(f)))):g.prepend(f)}
/**
   * Swap two elements in parent
   *
   * @param {HTMLElement} el1 - from
   * @param {HTMLElement} el2 - to
   * @deprecated
   */static swap(g,f){const b=document.createElement("div"),v=g.parentNode;v.insertBefore(b,g),v.insertBefore(g,f),v.insertBefore(f,b),v.removeChild(b)
/**
   * Selector Decorator
   *
   * Returns first match
   *
   * @param {Element} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {Element}
   */}static find(g=document,f){return g.querySelector(f)}
/**
   * Get Element by Id
   *
   * @param {string} id - id to find
   * @returns {HTMLElement | null}
   */static get(g){return document.getElementById(g)}
/**
   * Selector Decorator.
   *
   * Returns all matches
   *
   * @param {Element|Document} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {NodeList}
   */static findAll(g=document,f){return g.querySelectorAll(f)}static get allInputsSelector(){return"[contenteditable=true], textarea, input:not([type]), "+["text","password","email","number","search","tel","url"].map((g=>`input[type="${g}"]`)).join(", ")}
/**
   * Find all contenteditable, textarea and editable input elements passed holder contains
   *
   * @param holder - element where to find inputs
   */static findAllInputs(g){return it(g.querySelectorAll(d.allInputsSelector)).reduce(((g,f)=>d.isNativeInput(f)||d.containsOnlyInlineElements(f)?[...g,f]:[...g,...d.getDeepestBlockElements(f)]),[])}
/**
   * Search for deepest node which is Leaf.
   * Leaf is the vertex that doesn't have any child nodes
   *
   * @description Method recursively goes throw the all Node until it finds the Leaf
   * @param {Node} node - root Node. From this vertex we start Deep-first search
   *                      {@link https://en.wikipedia.org/wiki/Depth-first_search}
   * @param {boolean} [atLast] - find last text node
   * @returns {Node} - it can be text Node or Element Node, so that caret will able to work with it
   */static getDeepestNode(g,f=!1){const b=f?"lastChild":"firstChild",v=f?"previousSibling":"nextSibling";if(g&&g.nodeType===Node.ELEMENT_NODE&&g[b]){let w=g[b];if(d.isSingleTag(w)&&!d.isNativeInput(w)&&!d.isLineBreakTag(w))if(w[v])w=w[v];else{if(!w.parentNode[v])return w.parentNode;w=w.parentNode[v]}return this.getDeepestNode(w,f)}return g}
/**
   * Check if object is DOM node
   *
   * @param {*} node - object to check
   * @returns {boolean}
   */
static isElement(g){return!Ve(g)&&(g&&g.nodeType&&g.nodeType===Node.ELEMENT_NODE)}
/**
   * Check if object is DocumentFragment node
   *
   * @param {object} node - object to check
   * @returns {boolean}
   */
static isFragment(g){return!Ve(g)&&(g&&g.nodeType&&g.nodeType===Node.DOCUMENT_FRAGMENT_NODE)}
/**
   * Check if passed element is contenteditable
   *
   * @param {HTMLElement} element - html element to check
   * @returns {boolean}
   */static isContentEditable(g){return"true"===g.contentEditable}
/**
   * Checks target if it is native input
   *
   * @param {*} target - HTML element or string
   * @returns {boolean}
   */
static isNativeInput(g){const f=["INPUT","TEXTAREA"];return!(!g||!g.tagName)&&f.includes(g.tagName)}
/**
   * Checks if we can set caret
   *
   * @param {HTMLElement} target - target to check
   * @returns {boolean}
   */static canSetCaret(g){let f=!0;if(d.isNativeInput(g))switch(g.type){case"file":case"checkbox":case"radio":case"hidden":case"submit":case"button":case"image":case"reset":f=!1;break}else f=d.isContentEditable(g);return f}
/**
   * Checks node if it is empty
   *
   * @description Method checks simple Node without any childs for emptiness
   * If you have Node with 2 or more children id depth, you better use {@link Dom#isEmpty} method
   * @param {Node} node - node to check
   * @returns {boolean} true if it is empty
   */static isNodeEmpty(g){let f;return!(this.isSingleTag(g)&&!this.isLineBreakTag(g))&&(f=this.isElement(g)&&this.isNativeInput(g)?g.value:g.textContent.replace("​",""),0===f.trim().length)}
/**
   * checks node if it is doesn't have any child nodes
   *
   * @param {Node} node - node to check
   * @returns {boolean}
   */static isLeaf(g){return!!g&&0===g.childNodes.length}
/**
   * breadth-first search (BFS)
   * {@link https://en.wikipedia.org/wiki/Breadth-first_search}
   *
   * @description Pushes to stack all DOM leafs and checks for emptiness
   * @param {Node} node - node to check
   * @returns {boolean}
   */static isEmpty(g){g.normalize();const f=[g];for(;f.length>0;)if(g=f.shift(),!!g){if(this.isLeaf(g)&&!this.isNodeEmpty(g))return!1;g.childNodes&&f.push(...Array.from(g.childNodes))}return!0}
/**
   * Check if string contains html elements
   *
   * @param {string} str - string to check
   * @returns {boolean}
   */static isHTMLString(g){const f=d.make("div");return f.innerHTML=g,f.childElementCount>0
/**
   * Return length of node`s text content
   *
   * @param {Node} node - node with content
   * @returns {number}
   */}static getContentLength(g){return d.isNativeInput(g)?g.value.length:g.nodeType===Node.TEXT_NODE?g.length:g.textContent.length}
/**
   * Return array of names of block html elements
   *
   * @returns {string[]}
   */static get blockElements(){return["address","article","aside","blockquote","canvas","div","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","li","main","nav","noscript","ol","output","p","pre","ruby","section","table","tbody","thead","tr","tfoot","ul","video"]}
/**
   * Check if passed content includes only inline elements
   *
   * @param {string|HTMLElement} data - element or html string
   * @returns {boolean}
   */static containsOnlyInlineElements(g){let f;J(g)?(f=document.createElement("div"),f.innerHTML=g):f=g;const o=g=>!d.blockElements.includes(g.tagName.toLowerCase())&&Array.from(g.children).every(o);return Array.from(f.children).every(o)}
/**
   * Find and return all block elements in the passed parent (including subtree)
   *
   * @param {HTMLElement} parent - root element
   * @returns {HTMLElement[]}
   */static getDeepestBlockElements(g){return d.containsOnlyInlineElements(g)?[g]:Array.from(g.children).reduce(((g,f)=>[...g,...d.getDeepestBlockElements(f)]),[])}
/**
   * Helper for get holder from {string} or return HTMLElement
   *
   * @param {string | HTMLElement} element - holder's id or holder's HTML Element
   * @returns {HTMLElement}
   */static getHolder(g){return J(g)?document.getElementById(g):g}
/**
   * Returns true if element is anchor (is A tag)
   *
   * @param {Element} element - element to check
   * @returns {boolean}
   */static isAnchor(g){return"a"===g.tagName.toLowerCase()}
/**
   * Return element's offset related to the document
   *
   * @todo handle case when editor initialized in scrollable popup
   * @param el - element to compute offset
   */static offset(g){const f=g.getBoundingClientRect(),b=window.pageXOffset||document.documentElement.scrollLeft,v=window.pageYOffset||document.documentElement.scrollTop,w=f.top+v,E=f.left+b;return{top:w,left:E,bottom:w+f.height,right:E+f.width}}}const B={blockTunes:{toggler:{"Click to tune":"","or drag to move":""}},inlineToolbar:{converter:{"Convert to":""}},toolbar:{toolbox:{Add:""}},popover:{Filter:"","Nothing found":""}},T={Text:"",Link:"",Bold:"",Italic:""},I={link:{"Add a link":""},stub:{"The block can not be displayed correctly.":""}},M={delete:{Delete:"","Click to delete":""},moveUp:{"Move up":""},moveDown:{"Move down":""}},L={ui:B,toolNames:T,tools:I,blockTunes:M},O=class{
/**
   * Type-safe translation for internal UI texts:
   * Perform translation of the string by namespace and a key
   *
   * @example I18n.ui(I18nInternalNS.ui.blockTunes.toggler, 'Click to tune')
   * @param internalNamespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
static ui(g,f){return O._t(g,f)}
/**
   * Translate for external strings that is not presented in default dictionary.
   * For example, for user-specified tool names
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */static t(g,f){return O._t(g,f)}
/**
   * Adjust module for using external dictionary
   *
   * @param dictionary - new messages list to override default
   */static setDictionary(g){O.currentDictionary=g}
/**
   * Perform translation both for internal and external namespaces
   * If there is no translation found, returns passed key as a translated message
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */static _t(g,f){const b=O.getNamespace(g);return b&&b[f]?b[f]:f}
/**
   * Find messages section by namespace path
   *
   * @param namespace - path to section
   */static getNamespace(g){return g.split(".").reduce(((g,f)=>g&&Object.keys(g).length?g[f]:{}),O.currentDictionary)}};let H=O;H.currentDictionary=L;class at extends Error{}class we{constructor(){this.subscribers={}}
/**
   * Subscribe any event on callback
   *
   * @param eventName - event name
   * @param callback - subscriber
   */on(g,f){g in this.subscribers||(this.subscribers[g]=[]),this.subscribers[g].push(f)
/**
   * Subscribe any event on callback. Callback will be called once and be removed from subscribers array after call.
   *
   * @param eventName - event name
   * @param callback - subscriber
   */}once(g,f){g in this.subscribers||(this.subscribers[g]=[]);const o=b=>{const v=f(b),w=this.subscribers[g].indexOf(o);return-1!==w&&this.subscribers[g].splice(w,1),v};this.subscribers[g].push(o)}
/**
   * Emit callbacks with passed data
   *
   * @param eventName - event name
   * @param data - subscribers get this data when they were fired
   */emit(g,f){V(this.subscribers)||!this.subscribers[g]||this.subscribers[g].reduce(((g,f)=>{const b=f(g);return void 0!==b?b:g}),f)}
/**
   * Unsubscribe callback from event
   *
   * @param eventName - event name
   * @param callback - event handler
   */off(g,f){for(let b=0;b<this.subscribers[g].length;b++)if(this.subscribers[g][b]===f){delete this.subscribers[g][b];break}}destroy(){this.subscribers=null}}function he(g){Object.setPrototypeOf(this,{
/**
     * Block id
     *
     * @returns {string}
     */
get id(){return g.id},
/**
     * Tool name
     *
     * @returns {string}
     */
get name(){return g.name},
/**
     * Tool config passed on Editor's initialization
     *
     * @returns {ToolConfig}
     */
get config(){return g.config},
/**
     * .ce-block element, that wraps plugin contents
     *
     * @returns {HTMLElement}
     */
get holder(){return g.holder},
/**
     * True if Block content is empty
     *
     * @returns {boolean}
     */
get isEmpty(){return g.isEmpty},
/**
     * True if Block is selected with Cross-Block selection
     *
     * @returns {boolean}
     */
get selected(){return g.selected},
/**
     * Set Block's stretch state
     *
     * @param {boolean} state — state to set
     */
set stretched(f){g.stretched=f},
/**
     * True if Block is stretched
     *
     * @returns {boolean}
     */
get stretched(){return g.stretched},
/**
     * Call Tool method with errors handler under-the-hood
     *
     * @param {string} methodName - method to call
     * @param {object} param - object with parameters
     * @returns {unknown}
     */
call(f,b){return g.call(f,b)},
/**
     * Save Block content
     *
     * @returns {Promise<void|SavedData>}
     */
save(){return g.save()},
/**
     * Validate Block data
     *
     * @param {BlockToolData} data - data to validate
     * @returns {Promise<boolean>}
     */
validate(f){return g.validate(f)},dispatchChange(){g.dispatchChange()}})}class Re{constructor(){this.allListeners=[]}
/**
   * Assigns event listener on element and returns unique identifier
   *
   * @param {EventTarget} element - DOM element that needs to be listened
   * @param {string} eventType - event type
   * @param {Function} handler - method that will be fired on event
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */on(g,f,b,v=!1){const w=Ut("l"),E={id:w,element:g,eventType:f,handler:b,options:v};if(!this.findOne(g,f,b))return this.allListeners.push(E),g.addEventListener(f,b,v),w
/**
   * Removes event listener from element
   *
   * @param {EventTarget} element - DOM element that we removing listener
   * @param {string} eventType - event type
   * @param {Function} handler - remove handler, if element listens several handlers on the same event type
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */}off(g,f,b,v){const w=this.findAll(g,f,b);w.forEach(((g,f)=>{const b=this.allListeners.indexOf(w[f]);b>-1&&(this.allListeners.splice(b,1),g.element.removeEventListener(g.eventType,g.handler,g.options))}))}
/**
   * Removes listener by id
   *
   * @param {string} id - listener identifier
   */offById(g){const f=this.findById(g);f&&f.element.removeEventListener(f.eventType,f.handler,f.options)}
/**
   * Finds and returns first listener by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} [eventType] - event type
   * @param {Function} [handler] - event handler
   * @returns {ListenerData|null}
   */findOne(g,f,b){const v=this.findAll(g,f,b);return v.length>0?v[0]:null}
/**
   * Return all stored listeners by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} eventType - event type
   * @param {Function} handler - event handler
   * @returns {ListenerData[]}
   */findAll(g,f,b){let v;const w=g?this.findByEventTarget(g):[];return v=g&&f&&b?w.filter((g=>g.eventType===f&&g.handler===b)):g&&f?w.filter((g=>g.eventType===f)):w,v}removeAll(){this.allListeners.map((g=>{g.element.removeEventListener(g.eventType,g.handler,g.options)})),this.allListeners=[]}destroy(){this.removeAll()}
/**
   * Search method: looks for listener by passed element
   *
   * @param {EventTarget} element - searching element
   * @returns {Array} listeners that found on element
   */findByEventTarget(g){return this.allListeners.filter((f=>{if(f.element===g)return f}))}
/**
   * Search method: looks for listener by passed event type
   *
   * @param {string} eventType - event type
   * @returns {ListenerData[]} listeners that found on element
   */findByType(g){return this.allListeners.filter((f=>{if(f.eventType===g)return f}))}
/**
   * Search method: looks for listener by passed handler
   *
   * @param {Function} handler - event handler
   * @returns {ListenerData[]} listeners that found on element
   */findByHandler(g){return this.allListeners.filter((f=>{if(f.handler===g)return f}))}
/**
   * Returns listener data found by id
   *
   * @param {string} id - listener identifier
   * @returns {ListenerData}
   */findById(g){return this.allListeners.find((f=>f.id===g))}}class S{
/**
   * @class
   * @param options - Module options
   * @param options.config - Module config
   * @param options.eventsDispatcher - Common event bus
   */
constructor({config:g,eventsDispatcher:f}){if(this.nodes={},this.listeners=new Re,this.readOnlyMutableListeners={
/**
       * Assigns event listener on DOM element and pushes into special array that might be removed
       *
       * @param {EventTarget} element - DOM Element
       * @param {string} eventType - Event name
       * @param {Function} handler - Event handler
       * @param {boolean|AddEventListenerOptions} options - Listening options
       */
on:(g,f,b,v=!1)=>{this.mutableListenerIds.push(this.listeners.on(g,f,b,v))},clearAll:()=>{for(const g of this.mutableListenerIds)this.listeners.offById(g);this.mutableListenerIds=[]}},this.mutableListenerIds=[],new.target===S)throw new TypeError("Constructors for abstract class Module are not allowed.");this.config=g,this.eventsDispatcher=f
/**
   * Editor modules setter
   *
   * @param {EditorModules} Editor - Editor's Modules
   */}set state(g){this.Editor=g}removeAllNodes(){for(const g in this.nodes){const f=this.nodes[g];f instanceof HTMLElement&&f.remove()}}get isRtl(){return"rtl"===this.config.i18n.direction}}class m{constructor(){this.instance=null,this.selection=null,this.savedSelectionRange=null,this.isFakeBackgroundEnabled=!1,this.commandBackground="backColor",this.commandRemoveFormat="removeFormat"
/**
   * Editor styles
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */}static get CSS(){return{editorWrapper:"codex-editor",editorZone:"codex-editor__redactor"}}
/**
   * Returns selected anchor
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorNode}
   *
   * @returns {Node|null}
   */static get anchorNode(){const g=window.getSelection();return g?g.anchorNode:null}
/**
   * Returns selected anchor element
   *
   * @returns {Element|null}
   */static get anchorElement(){const g=window.getSelection();if(!g)return null;const f=g.anchorNode;return f?d.isElement(f)?f:f.parentElement:null}
/**
   * Returns selection offset according to the anchor node
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorOffset}
   *
   * @returns {number|null}
   */static get anchorOffset(){const g=window.getSelection();return g?g.anchorOffset:null}
/**
   * Is current selection range collapsed
   *
   * @returns {boolean|null}
   */static get isCollapsed(){const g=window.getSelection();return g?g.isCollapsed:null}
/**
   * Check current selection if it is at Editor's zone
   *
   * @returns {boolean}
   */static get isAtEditor(){return this.isSelectionAtEditor(m.get())}
/**
   * Check if passed selection is at Editor's zone
   *
   * @param selection - Selection object to check
   */static isSelectionAtEditor(g){if(!g)return!1;let f=g.anchorNode||g.focusNode;f&&f.nodeType===Node.TEXT_NODE&&(f=f.parentNode);let b=null;return f&&f instanceof Element&&(b=f.closest(`.${m.CSS.editorZone}`)),!!b&&b.nodeType===Node.ELEMENT_NODE
/**
   * Check if passed range at Editor zone
   *
   * @param range - range to check
   */}static isRangeAtEditor(g){if(!g)return;let f=g.startContainer;f&&f.nodeType===Node.TEXT_NODE&&(f=f.parentNode);let b=null;return f&&f instanceof Element&&(b=f.closest(`.${m.CSS.editorZone}`)),!!b&&b.nodeType===Node.ELEMENT_NODE}static get isSelectionExists(){return!!m.get().anchorNode}
/**
   * Return first range
   *
   * @returns {Range|null}
   */static get range(){return this.getRangeFromSelection(this.get())}
/**
   * Returns range from passed Selection object
   *
   * @param selection - Selection object to get Range from
   */static getRangeFromSelection(g){return g&&g.rangeCount?g.getRangeAt(0):null}
/**
   * Calculates position and size of selected text
   *
   * @returns {DOMRect | ClientRect}
   */static get rect(){let g,f=document.selection,b={x:0,y:0,width:0,height:0};if(f&&"Control"!==f.type)return f=f,g=f.createRange(),b.x=g.boundingLeft,b.y=g.boundingTop,b.width=g.boundingWidth,b.height=g.boundingHeight,b;if(!window.getSelection)return v("Method window.getSelection is not supported","warn"),b;if(f=window.getSelection(),null===f.rangeCount||isNaN(f.rangeCount))return v("Method SelectionUtils.rangeCount is not supported","warn"),b;if(0===f.rangeCount)return b;if(g=f.getRangeAt(0).cloneRange(),g.getBoundingClientRect&&(b=g.getBoundingClientRect()),0===b.x&&0===b.y){const f=document.createElement("span");if(f.getBoundingClientRect){f.appendChild(document.createTextNode("​")),g.insertNode(f),b=f.getBoundingClientRect();const v=f.parentNode;v.removeChild(f),v.normalize()}}return b}
/**
   * Returns selected text as String
   *
   * @returns {string}
   */static get text(){return window.getSelection?window.getSelection().toString():""}
/**
   * Returns window SelectionUtils
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Window/getSelection}
   *
   * @returns {Selection}
   */static get(){return window.getSelection()}
/**
   * Set focus to contenteditable or native input element
   *
   * @param element - element where to set focus
   * @param offset - offset of cursor
   */static setCursor(g,f=0){const b=document.createRange(),v=window.getSelection();return d.isNativeInput(g)?d.canSetCaret(g)?(g.focus(),g.selectionStart=g.selectionEnd=f,g.getBoundingClientRect()):void 0:(b.setStart(g,f),b.setEnd(g,f),v.removeAllRanges(),v.addRange(b),b.getBoundingClientRect())}
/**
   * Check if current range exists and belongs to container
   *
   * @param container - where range should be
   */static isRangeInsideContainer(g){const f=m.range;return null!==f&&g.contains(f.startContainer)}static addFakeCursor(){const g=m.range;if(null===g)return;const f=d.make("span","codex-editor__fake-cursor");f.dataset.mutationFree="true",g.collapse(),g.insertNode(f)
/**
   * Check if passed element contains a fake cursor
   *
   * @param el - where to check
   */}static isFakeCursorInsideContainer(g){return null!==d.find(g,".codex-editor__fake-cursor")}
/**
   * Removes fake cursor from a container
   *
   * @param container - container to look for
   */static removeFakeCursor(g=document.body){const f=d.find(g,".codex-editor__fake-cursor");f&&f.remove()}removeFakeBackground(){this.isFakeBackgroundEnabled&&(this.isFakeBackgroundEnabled=!1,document.execCommand(this.commandRemoveFormat))}setFakeBackground(){document.execCommand(this.commandBackground,!1,"#a8d6ff"),this.isFakeBackgroundEnabled=!0}save(){this.savedSelectionRange=m.range}restore(){if(!this.savedSelectionRange)return;const g=window.getSelection();g.removeAllRanges(),g.addRange(this.savedSelectionRange)}clearSaved(){this.savedSelectionRange=null}collapseToEnd(){const g=window.getSelection(),f=document.createRange();f.selectNodeContents(g.focusNode),f.collapse(!1),g.removeAllRanges(),g.addRange(f)
/**
   * Looks ahead to find passed tag from current selection
   *
   * @param  {string} tagName       - tag to found
   * @param  {string} [className]   - tag's class name
   * @param  {number} [searchDepth] - count of tags that can be included. For better performance.
   * @returns {HTMLElement|null}
   */}findParentTag(g,f,b=10){const v=window.getSelection();let w=null;return v&&v.anchorNode&&v.focusNode?([v.anchorNode,v.focusNode].forEach((v=>{let E=b;for(;E>0&&v.parentNode&&!(v.tagName===g&&(w=v,f&&v.classList&&!v.classList.contains(f)&&(w=null),w));)v=v.parentNode,E--})),w):null}
/**
   * Expands selection range to the passed parent node
   *
   * @param {HTMLElement} element - element which contents should be selected
   */expandToTag(g){const f=window.getSelection();f.removeAllRanges();const b=document.createRange();b.selectNodeContents(g),f.addRange(b)}}function Vt(g,f){const{type:b,target:v,addedNodes:w,removedNodes:E}=g;if(v===f)return!0;if(["characterData","attributes"].includes(b)){const g=v.nodeType===Node.TEXT_NODE?v.parentNode:v;return f.contains(g)}const C=Array.from(w).some((g=>f.contains(g))),B=Array.from(E).some((g=>f.contains(g)));return C||B}const z="redactor dom changed",$="block changed",W="fake cursor is about to be toggled",K="fake cursor have been set";var X=(g=>(g.APPEND_CALLBACK="appendCallback",g.RENDERED="rendered",g.MOVED="moved",g.UPDATED="updated",g.REMOVED="removed",g.ON_PASTE="onPaste",g))(X||{});class F extends we{
/**
   * @param options - block constructor options
   * @param [options.id] - block's id. Will be generated if omitted.
   * @param options.data - Tool's initial data
   * @param options.tool — block's tool
   * @param options.api - Editor API module for pass it to the Block Tunes
   * @param options.readOnly - Read-Only flag
   * @param [eventBus] - Editor common event bus. Allows to subscribe on some Editor events. Could be omitted when "virtual" Block is created. See BlocksAPI@composeBlockData.
   */
constructor({id:g=zt(),data:f,tool:b,api:v,readOnly:w,tunesData:E},C){super(),this.cachedInputs=[],this.toolRenderedElement=null,this.tunesInstances=new Map,this.defaultTunesInstances=new Map,this.unavailableTunesData={},this.inputIndex=0,this.editorEventBus=null,this.handleFocus=()=>{this.dropInputsCache(),this.updateCurrentInput()},this.didMutated=g=>{const f=void 0===g,b=g instanceof InputEvent;!f&&!b&&this.detectToolRootChange(g);let v;v=!(!f&&!b)||!(g.length>0&&g.every((g=>{const{addedNodes:f,removedNodes:b,target:v}=g;return[...Array.from(f),...Array.from(b),v].some((g=>!!d.isElement(g)&&"true"===g.dataset.mutationFree))}))),v&&(this.dropInputsCache(),this.updateCurrentInput(),this.call("updated"),this.emit("didMutated",this))},this.name=b.name,this.id=g,this.settings=b.settings,this.config=b.settings.config||{},this.api=v,this.editorEventBus=C||null,this.blockAPI=new he(this),this.tool=b,this.toolInstance=b.create(f,this.blockAPI,w),this.tunes=b.tunes,this.composeTunes(E),this.holder=this.compose(),this.watchBlockMutations(),this.addInputEvents()
/**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */}static get CSS(){return{wrapper:"ce-block",wrapperStretched:"ce-block--stretched",content:"ce-block__content",focused:"ce-block--focused",selected:"ce-block--selected",dropTarget:"ce-block--drop-target"}}
/**
   * Find and return all editable elements (contenteditable and native inputs) in the Tool HTML
   *
   * @returns {HTMLElement[]}
   */get inputs(){if(0!==this.cachedInputs.length)return this.cachedInputs;const g=d.findAllInputs(this.holder);return this.inputIndex>g.length-1&&(this.inputIndex=g.length-1),this.cachedInputs=g,g
/**
   * Return current Tool`s input
   *
   * @returns {HTMLElement}
   */}get currentInput(){return this.inputs[this.inputIndex]}
/**
   * Set input index to the passed element
   *
   * @param {HTMLElement | Node} element - HTML Element to set as current input
   */set currentInput(g){const f=this.inputs.findIndex((f=>f===g||f.contains(g)));-1!==f&&(this.inputIndex=f)}
/**
   * Return first Tool`s input
   *
   * @returns {HTMLElement}
   */get firstInput(){return this.inputs[0]}
/**
   * Return first Tool`s input
   *
   * @returns {HTMLElement}
   */get lastInput(){const g=this.inputs;return g[g.length-1]}
/**
   * Return next Tool`s input or undefined if it doesn't exist
   *
   * @returns {HTMLElement}
   */get nextInput(){return this.inputs[this.inputIndex+1]}
/**
   * Return previous Tool`s input or undefined if it doesn't exist
   *
   * @returns {HTMLElement}
   */get previousInput(){return this.inputs[this.inputIndex-1]}
/**
   * Get Block's JSON data
   *
   * @returns {object}
   */get data(){return this.save().then((g=>g&&!V(g.data)?g.data:{}))}
/**
   * Returns tool's sanitizer config
   *
   * @returns {object}
   */get sanitize(){return this.tool.sanitizeConfig}
/**
   * is block mergeable
   * We plugin have merge function then we call it mergeable
   *
   * @returns {boolean}
   */get mergeable(){return D(this.toolInstance.merge)}
/**
   * Check block for emptiness
   *
   * @returns {boolean}
   */get isEmpty(){const g=d.isEmpty(this.pluginsContent),f=!this.hasMedia;return g&&f}
/**
   * Check if block has a media content such as images, iframe and other
   *
   * @returns {boolean}
   */get hasMedia(){const g=["img","iframe","video","audio","source","input","textarea","twitterwidget"];return!!this.holder.querySelector(g.join(","))}
/**
   * Set focused state
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */set focused(g){this.holder.classList.toggle(F.CSS.focused,g)}get focused(){return this.holder.classList.contains(F.CSS.focused)}
/**
   * Set selected state
   * We don't need to mark Block as Selected when it is empty
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */set selected(g){var f,b;this.holder.classList.toggle(F.CSS.selected,g);const v=!0===g&&m.isRangeInsideContainer(this.holder),w=!1===g&&m.isFakeCursorInsideContainer(this.holder);(v||w)&&(null==(f=this.editorEventBus)||f.emit(W,{state:g}),v?m.addFakeCursor():m.removeFakeCursor(this.holder),null==(b=this.editorEventBus)||b.emit(K,{state:g}))}
/**
   * Returns True if it is Selected
   *
   * @returns {boolean}
   */get selected(){return this.holder.classList.contains(F.CSS.selected)}
/**
   * Set stretched state
   *
   * @param {boolean} state - 'true' to enable, 'false' to disable stretched state
   */set stretched(g){this.holder.classList.toggle(F.CSS.wrapperStretched,g)}
/**
   * Return Block's stretched state
   *
   * @returns {boolean}
   */get stretched(){return this.holder.classList.contains(F.CSS.wrapperStretched)}
/**
   * Toggle drop target state
   *
   * @param {boolean} state - 'true' if block is drop target, false otherwise
   */set dropTarget(g){this.holder.classList.toggle(F.CSS.dropTarget,g)}
/**
   * Returns Plugins content
   *
   * @returns {HTMLElement}
   */get pluginsContent(){return this.toolRenderedElement}
/**
   * Calls Tool's method
   *
   * Method checks tool property {MethodName}. Fires method with passes params If it is instance of Function
   *
   * @param {string} methodName - method to call
   * @param {object} params - method argument
   */call(g,f){if(D(this.toolInstance[g])){"appendCallback"===g&&v("`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead","warn");try{this.toolInstance[g].call(this.toolInstance,f)}catch(f){v(`Error during '${g}' call: ${f.message}`,"error")}}}
/**
   * Call plugins merge method
   *
   * @param {BlockToolData} data - data to merge
   */async mergeWith(g){await this.toolInstance.merge(g)}
/**
   * Extracts data from Block
   * Groups Tool's save processing time
   *
   * @returns {object}
   */async save(){const g=await this.toolInstance.save(this.pluginsContent),f=this.unavailableTunesData;[...this.tunesInstances.entries(),...this.defaultTunesInstances.entries()].forEach((([g,b])=>{if(D(b.save))try{f[g]=b.save()}catch(g){v(`Tune ${b.constructor.name} save method throws an Error %o`,"warn",g)}}));const b=window.performance.now();let w;return Promise.resolve(g).then((g=>(w=window.performance.now(),{id:this.id,tool:this.name,data:g,tunes:f,time:w-b}))).catch((g=>{v(`Saving process for ${this.name} tool failed due to the ${g}`,"log","red")}))}
/**
   * Uses Tool's validation method to check the correctness of output data
   * Tool's validation method is optional
   *
   * @description Method returns true|false whether data passed the validation or not
   * @param {BlockToolData} data - data to validate
   * @returns {Promise<boolean>} valid
   */async validate(g){let f=!0;return this.toolInstance.validate instanceof Function&&(f=await this.toolInstance.validate(g)),f}getTunes(){const g=document.createElement("div"),f=[],b="function"==typeof this.toolInstance.renderSettings?this.toolInstance.renderSettings():[],v=[...this.tunesInstances.values(),...this.defaultTunesInstances.values()].map((g=>g.render()));return[b,v].flat().forEach((b=>{d.isElement(b)?g.appendChild(b):Array.isArray(b)?f.push(...b):f.push(b)})),[f,g]}updateCurrentInput(){this.currentInput=d.isNativeInput(document.activeElement)||!m.anchorNode?document.activeElement:m.anchorNode}dispatchChange(){this.didMutated()}destroy(){this.unwatchBlockMutations(),this.removeInputEvents(),super.destroy(),D(this.toolInstance.destroy)&&this.toolInstance.destroy()}async getActiveToolboxEntry(){const g=this.tool.toolbox;if(1===g.length)return Promise.resolve(this.tool.toolbox[0]);const f=await this.data;return g.find((g=>Object.entries(g.data).some((([g,b])=>f[g]&&$t(f[g],b)))))}
/**
   * Make default Block wrappers and put Tool`s content there
   *
   * @returns {HTMLDivElement}
   */compose(){const g=d.make("div",F.CSS.wrapper),f=d.make("div",F.CSS.content),b=this.toolInstance.render();this.toolRenderedElement=b,f.appendChild(this.toolRenderedElement);let w=f;return[...this.tunesInstances.values(),...this.defaultTunesInstances.values()].forEach((g=>{if(D(g.wrap))try{w=g.wrap(w)}catch(f){v(`Tune ${g.constructor.name} wrap method throws an Error %o`,"warn",f)}})),g.appendChild(w),g
/**
   * Instantiate Block Tunes
   *
   * @param tunesData - current Block tunes data
   * @private
   */}composeTunes(g){Array.from(this.tunes.values()).forEach((f=>{(f.isInternal?this.defaultTunesInstances:this.tunesInstances).set(f.name,f.create(g[f.name],this.blockAPI))})),Object.entries(g).forEach((([g,f])=>{this.tunesInstances.has(g)||(this.unavailableTunesData[g]=f)}))}addInputEvents(){this.inputs.forEach((g=>{g.addEventListener("focus",this.handleFocus),d.isNativeInput(g)&&g.addEventListener("input",this.didMutated)}))}removeInputEvents(){this.inputs.forEach((g=>{g.removeEventListener("focus",this.handleFocus),d.isNativeInput(g)&&g.removeEventListener("input",this.didMutated)}))}watchBlockMutations(){var g;this.redactorDomChangedCallback=g=>{const{mutations:f}=g;f.some((g=>Vt(g,this.toolRenderedElement)))&&this.didMutated(f)},null==(g=this.editorEventBus)||g.on(z,this.redactorDomChangedCallback)}unwatchBlockMutations(){var g;null==(g=this.editorEventBus)||g.off(z,this.redactorDomChangedCallback)}
/**
   * Sometimes Tool can replace own main element, for example H2 -> H4 or UL -> OL
   * We need to detect such changes and update a link to tools main element with the new one
   *
   * @param mutations - records of block content mutations
   */detectToolRootChange(g){g.forEach((g=>{if(Array.from(g.removedNodes).includes(this.toolRenderedElement)){const f=g.addedNodes[g.addedNodes.length-1];this.toolRenderedElement=f}}))}dropInputsCache(){this.cachedInputs=[]}}class Zt extends S{constructor(){super(...arguments),this.insert=(g=this.config.defaultBlock,f={},b={},v,w,E,C)=>{const B=this.Editor.BlockManager.insert({id:C,tool:g,data:f,index:v,needToFocus:w,replace:E});return new he(B)},this.composeBlockData=async g=>{const f=this.Editor.Tools.blockTools.get(g);return new F({tool:f,api:this.Editor.API,readOnly:!0,data:{},tunesData:{}}).data},this.update=(g,f)=>{const{BlockManager:b}=this.Editor,w=b.getBlockById(g);if(!w){v("blocks.update(): Block with passed id was not found","warn");return}const E=b.getBlockIndex(w);b.insert({id:w.id,tool:w.name,data:f,index:E,replace:!0,tunes:w.tunes})}
/**
   * Available methods
   *
   * @returns {Blocks}
   */}get methods(){return{clear:()=>this.clear(),render:g=>this.render(g),renderFromHTML:g=>this.renderFromHTML(g),delete:g=>this.delete(g),swap:(g,f)=>this.swap(g,f),move:(g,f)=>this.move(g,f),getBlockByIndex:g=>this.getBlockByIndex(g),getById:g=>this.getById(g),getCurrentBlockIndex:()=>this.getCurrentBlockIndex(),getBlockIndex:g=>this.getBlockIndex(g),getBlocksCount:()=>this.getBlocksCount(),stretchBlock:(g,f=!0)=>this.stretchBlock(g,f),insertNewBlock:()=>this.insertNewBlock(),insert:this.insert,update:this.update,composeBlockData:this.composeBlockData}}
/**
   * Returns Blocks count
   *
   * @returns {number}
   */getBlocksCount(){return this.Editor.BlockManager.blocks.length}
/**
   * Returns current block index
   *
   * @returns {number}
   */getCurrentBlockIndex(){return this.Editor.BlockManager.currentBlockIndex}
/**
   * Returns the index of Block by id;
   *
   * @param id - block id
   */getBlockIndex(g){const f=this.Editor.BlockManager.getBlockById(g);if(f)return this.Editor.BlockManager.getBlockIndex(f);w("There is no block with id `"+g+"`","warn")}
/**
   * Returns BlockAPI object by Block index
   *
   * @param {number} index - index to get
   */getBlockByIndex(g){const f=this.Editor.BlockManager.getBlockByIndex(g);if(void 0!==f)return new he(f);w("There is no block at index `"+g+"`","warn")}
/**
   * Returns BlockAPI object by Block id
   *
   * @param id - id of block to get
   */getById(g){const f=this.Editor.BlockManager.getBlockById(g);return void 0===f?(w("There is no block with id `"+g+"`","warn"),null):new he(f)}
/**
   * Call Block Manager method that swap Blocks
   *
   * @param {number} fromIndex - position of first Block
   * @param {number} toIndex - position of second Block
   * @deprecated — use 'move' instead
   */swap(g,f){v("`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead","info"),this.Editor.BlockManager.swap(g,f)
/**
   * Move block from one index to another
   *
   * @param {number} toIndex - index to move to
   * @param {number} fromIndex - index to move from
   */}move(g,f){this.Editor.BlockManager.move(g,f)}
/**
   * Deletes Block
   *
   * @param {number} blockIndex - index of Block to delete
   */delete(g){try{this.Editor.BlockManager.removeBlock(g)}catch(g){w(g,"warn");return}0===this.Editor.BlockManager.blocks.length&&this.Editor.BlockManager.insert(),this.Editor.BlockManager.currentBlock&&this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock,this.Editor.Caret.positions.END),this.Editor.Toolbar.close()}clear(){this.Editor.BlockManager.clear(!0),this.Editor.InlineToolbar.close()
/**
   * Fills Editor with Blocks data
   *
   * @param {OutputData} data — Saved Editor data
   */}render(g){return this.Editor.BlockManager.clear(),this.Editor.Renderer.render(g.blocks)
/**
   * Render passed HTML string
   *
   * @param {string} data - HTML string to render
   * @returns {Promise<void>}
   */}renderFromHTML(g){return this.Editor.BlockManager.clear(),this.Editor.Paste.processText(g,!0)
/**
   * Stretch Block's content
   *
   * @param {number} index - index of Block to stretch
   * @param {boolean} status - true to enable, false to disable
   * @deprecated Use BlockAPI interface to stretch Blocks
   */}stretchBlock(g,f=!0){Ie(!0,"blocks.stretchBlock()","BlockAPI");const b=this.Editor.BlockManager.getBlockByIndex(g);b&&(b.stretched=f)}
/**
   * Insert new Block
   * After set caret to this Block
   *
   * @todo remove in 3.0.0
   * @deprecated with insert() method
   */insertNewBlock(){v("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.","warn"),this.insert()}}class Gt extends S{constructor(){super(...arguments),this.setToFirstBlock=(g=this.Editor.Caret.positions.DEFAULT,f=0)=>!!this.Editor.BlockManager.firstBlock&&(this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock,g,f),!0),this.setToLastBlock=(g=this.Editor.Caret.positions.DEFAULT,f=0)=>!!this.Editor.BlockManager.lastBlock&&(this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock,g,f),!0),this.setToPreviousBlock=(g=this.Editor.Caret.positions.DEFAULT,f=0)=>!!this.Editor.BlockManager.previousBlock&&(this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock,g,f),!0),this.setToNextBlock=(g=this.Editor.Caret.positions.DEFAULT,f=0)=>!!this.Editor.BlockManager.nextBlock&&(this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock,g,f),!0),this.setToBlock=(g,f=this.Editor.Caret.positions.DEFAULT,b=0)=>!!this.Editor.BlockManager.blocks[g]&&(this.Editor.Caret.setToBlock(this.Editor.BlockManager.blocks[g],f,b),!0),this.focus=(g=!1)=>g?this.setToLastBlock(this.Editor.Caret.positions.END):this.setToFirstBlock(this.Editor.Caret.positions.START)
/**
   * Available methods
   *
   * @returns {Caret}
   */}get methods(){return{setToFirstBlock:this.setToFirstBlock,setToLastBlock:this.setToLastBlock,setToPreviousBlock:this.setToPreviousBlock,setToNextBlock:this.setToNextBlock,setToBlock:this.setToBlock,focus:this.focus}}}class qt extends S{
/**
   * Available methods
   *
   * @returns {Events}
   */
get methods(){return{emit:(g,f)=>this.emit(g,f),off:(g,f)=>this.off(g,f),on:(g,f)=>this.on(g,f)}}
/**
   * Subscribe on Events
   *
   * @param {string} eventName - event name to subscribe
   * @param {Function} callback - event handler
   */on(g,f){this.eventsDispatcher.on(g,f)}
/**
   * Emit event with data
   *
   * @param {string} eventName - event to emit
   * @param {object} data - event's data
   */emit(g,f){this.eventsDispatcher.emit(g,f)}
/**
   * Unsubscribe from Event
   *
   * @param {string} eventName - event to unsubscribe
   * @param {Function} callback - event handler
   */off(g,f){this.eventsDispatcher.off(g,f)}}class De extends S{
/**
   * Return namespace section for tool or block tune
   *
   * @param tool - tool object
   */
static getNamespace(g){return g.isTune()?`blockTunes.${g.name}`:`tools.${g.name}`}get methods(){return{t:()=>{w("I18n.t() method can be accessed only from Tools","warn")}}}
/**
   * Return I18n API methods with tool namespaced dictionary
   *
   * @param tool - Tool object
   */getMethodsForTool(g){return Object.assign(this.methods,{t:f=>H.t(De.getNamespace(g),f)})}}class Jt extends S{get methods(){return{blocks:this.Editor.BlocksAPI.methods,caret:this.Editor.CaretAPI.methods,events:this.Editor.EventsAPI.methods,listeners:this.Editor.ListenersAPI.methods,notifier:this.Editor.NotifierAPI.methods,sanitizer:this.Editor.SanitizerAPI.methods,saver:this.Editor.SaverAPI.methods,selection:this.Editor.SelectionAPI.methods,styles:this.Editor.StylesAPI.classes,toolbar:this.Editor.ToolbarAPI.methods,inlineToolbar:this.Editor.InlineToolbarAPI.methods,tooltip:this.Editor.TooltipAPI.methods,i18n:this.Editor.I18nAPI.methods,readOnly:this.Editor.ReadOnlyAPI.methods,ui:this.Editor.UiAPI.methods}}
/**
   * Returns Editor.js Core API methods for passed tool
   *
   * @param tool - tool object
   */getMethodsForTool(g){return Object.assign(this.methods,{i18n:this.Editor.I18nAPI.getMethodsForTool(g)})}}class Qt extends S{
/**
   * Available methods
   *
   * @returns {InlineToolbar}
   */
get methods(){return{close:()=>this.close(),open:()=>this.open()}}open(){this.Editor.InlineToolbar.tryToShow()}close(){this.Editor.InlineToolbar.close()}}class eo extends S{
/**
   * Available methods
   *
   * @returns {Listeners}
   */
get methods(){return{on:(g,f,b,v)=>this.on(g,f,b,v),off:(g,f,b,v)=>this.off(g,f,b,v),offById:g=>this.offById(g)}}
/**
   * Ads a DOM event listener. Return it's id.
   *
   * @param {HTMLElement} element - Element to set handler to
   * @param {string} eventType - event type
   * @param {() => void} handler - event handler
   * @param {boolean} useCapture - capture event or not
   */on(g,f,b,v){return this.listeners.on(g,f,b,v)}
/**
   * Removes DOM listener from element
   *
   * @param {Element} element - Element to remove handler from
   * @param eventType - event type
   * @param handler - event handler
   * @param {boolean} useCapture - capture event or not
   */off(g,f,b,v){this.listeners.off(g,f,b,v)}
/**
   * Removes DOM listener by the listener id
   *
   * @param id - id of the listener to remove
   */offById(g){this.listeners.offById(g)}}var q={},Q={get exports(){return q},set exports(g){q=g}};(function(g,f){(function(f,b){g.exports=b()})(window,(function(){return function(g){var f={};function i(b){if(f[b])return f[b].exports;var v=f[b]={i:b,l:!1,exports:{}};return g[b].call(v.exports,v,v.exports,i),v.l=!0,v.exports}return i.m=g,i.c=f,i.d=function(g,f,b){i.o(g,f)||Object.defineProperty(g,f,{enumerable:!0,get:b})},i.r=function(g){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(g,"__esModule",{value:!0})},i.t=function(g,f){if(1&f&&(g=i(g)),8&f||4&f&&"object"==typeof g&&g&&g.__esModule)return g;var b=Object.create(null);if(i.r(b),Object.defineProperty(b,"default",{enumerable:!0,value:g}),2&f&&"string"!=typeof g)for(var v in g)i.d(b,v,function(f){return g[f]}.bind(null,v));return b},i.n=function(g){var f=g&&g.__esModule?function(){return g.default}:function(){return g};return i.d(f,"a",f),f},i.o=function(g,f){return Object.prototype.hasOwnProperty.call(g,f)},i.p="/",i(i.s=0)}([function(g,f,b){b(1),g.exports=function(){var g=b(6),f="cdx-notify--bounce-in",v=null;return{show:function(b){if(b.message){(function(){if(v)return!0;v=g.getWrapper(),document.body.appendChild(v)})();var w=null,E=b.time||8e3;switch(b.type){case"confirm":w=g.confirm(b);break;case"prompt":w=g.prompt(b);break;default:w=g.alert(b),window.setTimeout((function(){w.remove()}),E)}v.appendChild(w),w.classList.add(f)}}}}()},function(g,f,b){var v=b(2);"string"==typeof v&&(v=[[g.i,v,""]]);var w={hmr:!0,transform:void 0,insertInto:void 0};b(4)(v,w),v.locals&&(g.exports=v.locals)},function(g,f,b){(g.exports=b(3)(!1)).push([g.i,'.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:\'\';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:\'\';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}',""])},function(g,f){g.exports=function(g){var f=[];return f.toString=function(){return this.map((function(f){var b=function(g,f){var b=g[1]||"",v=g[3];if(!v)return b;if(f&&"function"==typeof btoa){var w=(C=v,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(C))))+" */"),E=v.sources.map((function(g){return"/*# sourceURL="+v.sourceRoot+g+" */"}));return[b].concat(E).concat([w]).join("\n")}var C;return[b].join("\n")}(f,g);return f[2]?"@media "+f[2]+"{"+b+"}":b})).join("")},f.i=function(g,b){"string"==typeof g&&(g=[[null,g,""]]);for(var v={},w=0;w<this.length;w++){var E=this[w][0];"number"==typeof E&&(v[E]=!0)}for(w=0;w<g.length;w++){var C=g[w];"number"==typeof C[0]&&v[C[0]]||(b&&!C[2]?C[2]=b:b&&(C[2]="("+C[2]+") and ("+b+")"),f.push(C))}},f}},function(g,f,b){var v,w,E={},C=(v=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===w&&(w=v.apply(this,arguments)),w}),B=function(g){var f={};return function(g){if("function"==typeof g)return g();if(void 0===f[g]){var b=function(g){return document.querySelector(g)}.call(this,g);if(window.HTMLIFrameElement&&b instanceof window.HTMLIFrameElement)try{b=b.contentDocument.head}catch{b=null}f[g]=b}return f[g]}}(),T=null,I=0,M=[],L=b(5);function p(g,f){for(var b=0;b<g.length;b++){var v=g[b],w=E[v.id];if(w){w.refs++;for(var C=0;C<w.parts.length;C++)w.parts[C](v.parts[C]);for(;C<v.parts.length;C++)w.parts.push(x(v.parts[C],f))}else{var B=[];for(C=0;C<v.parts.length;C++)B.push(x(v.parts[C],f));E[v.id]={id:v.id,refs:1,parts:B}}}}function k(g,f){for(var b=[],v={},w=0;w<g.length;w++){var E=g[w],C=f.base?E[0]+f.base:E[0],B={css:E[1],media:E[2],sourceMap:E[3]};v[C]?v[C].parts.push(B):b.push(v[C]={id:C,parts:[B]})}return b}function _(g,f){var b=B(g.insertInto);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var v=M[M.length-1];if("top"===g.insertAt)v?v.nextSibling?b.insertBefore(f,v.nextSibling):b.appendChild(f):b.insertBefore(f,b.firstChild),M.push(f);else if("bottom"===g.insertAt)b.appendChild(f);else{if("object"!=typeof g.insertAt||!g.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var w=B(g.insertInto+" "+g.insertAt.before);b.insertBefore(f,w)}}function N(g){if(null===g.parentNode)return!1;g.parentNode.removeChild(g);var f=M.indexOf(g);f>=0&&M.splice(f,1)}function A(g){var f=document.createElement("style");return void 0===g.attrs.type&&(g.attrs.type="text/css"),y(f,g.attrs),_(g,f),f}function y(g,f){Object.keys(f).forEach((function(b){g.setAttribute(b,f[b])}))}function x(g,f){var b,v,w,E;if(f.transform&&g.css){if(!(E=f.transform(g.css)))return function(){};g.css=E}if(f.singleton){var C=I++;b=T||(T=A(f)),v=R.bind(null,b,C,!1),w=R.bind(null,b,C,!0)}else g.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(b=function(g){var f=document.createElement("link");return void 0===g.attrs.type&&(g.attrs.type="text/css"),g.attrs.rel="stylesheet",y(f,g.attrs),_(g,f),f}(f),v=function(g,f,b){var v=b.css,w=b.sourceMap,E=void 0===f.convertToAbsoluteUrls&&w;(f.convertToAbsoluteUrls||E)&&(v=L(v)),w&&(v+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(w))))+" */");var C=new Blob([v],{type:"text/css"}),B=g.href;g.href=URL.createObjectURL(C),B&&URL.revokeObjectURL(B)}.bind(null,b,f),w=function(){N(b),b.href&&URL.revokeObjectURL(b.href)}):(b=A(f),v=function(g,f){var b=f.css,v=f.media;if(v&&g.setAttribute("media",v),g.styleSheet)g.styleSheet.cssText=b;else{for(;g.firstChild;)g.removeChild(g.firstChild);g.appendChild(document.createTextNode(b))}}.bind(null,b),w=function(){N(b)});return v(g),function(f){if(f){if(f.css===g.css&&f.media===g.media&&f.sourceMap===g.sourceMap)return;v(g=f)}else w()}}g.exports=function(g,f){if(typeof DEBUG<"u"&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(f=f||{}).attrs="object"==typeof f.attrs?f.attrs:{},f.singleton||"boolean"==typeof f.singleton||(f.singleton=C()),f.insertInto||(f.insertInto="head"),f.insertAt||(f.insertAt="bottom");var b=k(g,f);return p(b,f),function(g){for(var v=[],w=0;w<b.length;w++){var C=b[w];(B=E[C.id]).refs--,v.push(B)}for(g&&p(k(g,f),f),w=0;w<v.length;w++){var B;if(0===(B=v[w]).refs){for(var T=0;T<B.parts.length;T++)B.parts[T]();delete E[B.id]}}}};var O,H=(O=[],function(g,f){return O[g]=f,O.filter(Boolean).join("\n")});function R(g,f,b,v){var w=b?"":v.css;if(g.styleSheet)g.styleSheet.cssText=H(f,w);else{var E=document.createTextNode(w),C=g.childNodes;C[f]&&g.removeChild(C[f]),C.length?g.insertBefore(E,C[f]):g.appendChild(E)}}},function(g,f){g.exports=function(g){var f=typeof window<"u"&&window.location;if(!f)throw new Error("fixUrls requires window.location");if(!g||"string"!=typeof g)return g;var b=f.protocol+"//"+f.host,v=b+f.pathname.replace(/\/[^\/]*$/,"/");return g.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(g,f){var w,E=f.trim().replace(/^"(.*)"$/,(function(g,f){return f})).replace(/^'(.*)'$/,(function(g,f){return f}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(E)?g:(w=0===E.indexOf("//")?E:0===E.indexOf("/")?b+E:v+E.replace(/^\.\//,""),"url("+JSON.stringify(w)+")")}))}},function(g,f,b){var v,w,E,C,B,T,I,M,L;g.exports=(v="cdx-notifies",w="cdx-notify",E="cdx-notify__cross",C="cdx-notify__button--confirm",B="cdx-notify__button--cancel",T="cdx-notify__input",I="cdx-notify__button",M="cdx-notify__btns-wrapper",{alert:L=function(g){var f=document.createElement("DIV"),b=document.createElement("DIV"),v=g.message,C=g.style;return f.classList.add(w),C&&f.classList.add(w+"--"+C),f.innerHTML=v,b.classList.add(E),b.addEventListener("click",f.remove.bind(f)),f.appendChild(b),f},confirm:function(g){var f=L(g),b=document.createElement("div"),v=document.createElement("button"),w=document.createElement("button"),T=f.querySelector("."+E),O=g.cancelHandler,H=g.okHandler;return b.classList.add(M),v.innerHTML=g.okText||"Confirm",w.innerHTML=g.cancelText||"Cancel",v.classList.add(I),w.classList.add(I),v.classList.add(C),w.classList.add(B),O&&"function"==typeof O&&(w.addEventListener("click",O),T.addEventListener("click",O)),H&&"function"==typeof H&&v.addEventListener("click",H),v.addEventListener("click",f.remove.bind(f)),w.addEventListener("click",f.remove.bind(f)),b.appendChild(v),b.appendChild(w),f.appendChild(b),f},prompt:function(g){var f=L(g),b=document.createElement("div"),v=document.createElement("button"),w=document.createElement("input"),B=f.querySelector("."+E),O=g.cancelHandler,H=g.okHandler;return b.classList.add(M),v.innerHTML=g.okText||"Ok",v.classList.add(I),v.classList.add(C),w.classList.add(T),g.placeholder&&w.setAttribute("placeholder",g.placeholder),g.default&&(w.value=g.default),g.inputType&&(w.type=g.inputType),O&&"function"==typeof O&&B.addEventListener("click",O),H&&"function"==typeof H&&v.addEventListener("click",(function(){H(w.value)})),v.addEventListener("click",f.remove.bind(f)),b.appendChild(w),b.appendChild(v),f.appendChild(b),f},getWrapper:function(){var g=document.createElement("DIV");return g.classList.add(v),g}})}])}))})(Q);const ie=xe(q);class io{
/**
   * Show web notification
   *
   * @param {NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions} options - notification options
   */
show(g){ie.show(g)}}class no extends S{
/**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
constructor({config:g,eventsDispatcher:f}){super({config:g,eventsDispatcher:f}),this.notifier=new io}get methods(){return{show:g=>this.show(g)}}
/**
   * Show notification
   *
   * @param {NotifierOptions} options - message option
   */show(g){return this.notifier.show(g)}}class so extends S{get methods(){const e=()=>this.isEnabled;return{toggle:g=>this.toggle(g),get isEnabled(){return e()}}}
/**
   * Set or toggle read-only state
   *
   * @param {boolean|undefined} state - set or toggle state
   * @returns {boolean} current value
   */toggle(g){return this.Editor.ReadOnly.toggle(g)}get isEnabled(){return this.Editor.ReadOnly.isEnabled}}var ne={},se={get exports(){return ne},set exports(g){ne=g}};(function(g,f){(function(f,b){g.exports=b()})(0,(function(){function t(g){var f=g.tags,b=Object.keys(f),v=b.map((function(g){return typeof f[g]})).every((function(g){return"object"===g||"boolean"===g||"function"===g}));if(!v)throw new Error("The configuration was invalid");this.config=g}var g=["P","LI","TD","TH","DIV","H1","H2","H3","H4","H5","H6","PRE"];function i(f){return-1!==g.indexOf(f.nodeName)}var f=["A","B","STRONG","I","EM","SUB","SUP","U","STRIKE"];function r(g){return-1!==f.indexOf(g.nodeName)}t.prototype.clean=function(g){const f=document.implementation.createHTMLDocument(),b=f.createElement("div");return b.innerHTML=g,this._sanitize(f,b),b.innerHTML},t.prototype._sanitize=function(g,f){var b=a(g,f),v=b.firstChild();if(v)do{if(v.nodeType!==Node.TEXT_NODE){if(v.nodeType===Node.COMMENT_NODE){f.removeChild(v),this._sanitize(g,f);break}var w,E=r(v);E&&(w=Array.prototype.some.call(v.childNodes,i));var C=!!f.parentNode,B=i(f)&&i(v)&&C,T=v.nodeName.toLowerCase(),I=l(this.config,T,v),M=E&&w;if(M||c(v,I)||!this.config.keepNestedBlockElements&&B){if(!("SCRIPT"===v.nodeName||"STYLE"===v.nodeName))for(;v.childNodes.length>0;)f.insertBefore(v.childNodes[0],v);f.removeChild(v),this._sanitize(g,f);break}for(var L=0;L<v.attributes.length;L+=1){var O=v.attributes[L];u(O,I,v)&&(v.removeAttribute(O.name),L-=1)}this._sanitize(g,v)}else if(""===v.data.trim()&&(v.previousElementSibling&&i(v.previousElementSibling)||v.nextElementSibling&&i(v.nextElementSibling))){f.removeChild(v),this._sanitize(g,f);break}}while(v=b.nextSibling())};function a(g,f){return g.createTreeWalker(f,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,null,!1)}function l(g,f,b){return"function"==typeof g.tags[f]?g.tags[f](b):g.tags[f]}function c(g,f){return typeof f>"u"||"boolean"==typeof f&&!f}function u(g,f,b){var v=g.name.toLowerCase();return!0!==f&&("function"==typeof f[v]?!f[v](g.value,b):typeof f[v]>"u"||!1===f[v]||"string"==typeof f[v]&&f[v]!==g.value)}return t}))})(se);const re=ne;function ht(g,f){return g.map((g=>{const b=D(f)?f(g.tool):f;return V(b)||(g.data=Pe(g.data,b)),g}))}function Z(g,f={}){const b={tags:f};return new re(b).clean(g)}function Pe(g,f){return Array.isArray(g)?lo(g,f):j(g)?co(g,f):J(g)?ho(g,f):g}function lo(g,f){return g.map((g=>Pe(g,f)))}function co(g,f){const b={};for(const v in g){if(!Object.prototype.hasOwnProperty.call(g,v))continue;const w=g[v],E=uo(f[v])?f[v]:f;b[v]=Pe(w,E)}return b}function ho(g,f){return j(f)?Z(g,f):!1===f?Z(g,{}):g}function uo(g){return j(g)||Nt(g)||D(g)}class po extends S{
/**
   * Available methods
   *
   * @returns {SanitizerConfig}
   */
get methods(){return{clean:(g,f)=>this.clean(g,f)}}
/**
   * Perform sanitizing of a string
   *
   * @param {string} taintString - what to sanitize
   * @param {SanitizerConfig} config - sanitizer config
   * @returns {string}
   */clean(g,f){return Z(g,f)}}class fo extends S{
/**
   * Available methods
   *
   * @returns {Saver}
   */
get methods(){return{save:()=>this.save()}}
/**
   * Return Editor's data
   *
   * @returns {OutputData}
   */save(){const g="Editor's content can not be saved in read-only mode";return this.Editor.ReadOnly.isEnabled?(w(g,"warn"),Promise.reject(new Error(g))):this.Editor.Saver.save()}}class go extends S{
/**
   * Available methods
   *
   * @returns {SelectionAPIInterface}
   */
get methods(){return{findParentTag:(g,f)=>this.findParentTag(g,f),expandToTag:g=>this.expandToTag(g)}}
/**
   * Looks ahead from selection and find passed tag with class name
   *
   * @param {string} tagName - tag to find
   * @param {string} className - tag's class name
   * @returns {HTMLElement|null}
   */findParentTag(g,f){return(new m).findParentTag(g,f)}
/**
   * Expand selection to passed tag
   *
   * @param {HTMLElement} node - tag that should contain selection
   */expandToTag(g){(new m).expandToTag(g)}}class bo extends S{get classes(){return{block:"cdx-block",inlineToolButton:"ce-inline-tool",inlineToolButtonActive:"ce-inline-tool--active",input:"cdx-input",loader:"cdx-loader",button:"cdx-button",settingsButton:"cdx-settings-button",settingsButtonActive:"cdx-settings-button--active"}}}class mo extends S{
/**
   * Available methods
   *
   * @returns {Toolbar}
   */
get methods(){return{close:()=>this.close(),open:()=>this.open(),toggleBlockSettings:g=>this.toggleBlockSettings(g),toggleToolbox:g=>this.toggleToolbox(g)}}open(){this.Editor.Toolbar.moveAndOpen()}close(){this.Editor.Toolbar.close()}
/**
   * Toggles Block Setting of the current block
   *
   * @param {boolean} openingState —  opening state of Block Setting
   */toggleBlockSettings(g){-1!==this.Editor.BlockManager.currentBlockIndex?g??!this.Editor.BlockSettings.opened?(this.Editor.Toolbar.moveAndOpen(),this.Editor.BlockSettings.open()):this.Editor.BlockSettings.close():w("Could't toggle the Toolbar because there is no block selected ","warn")}
/**
   * Open toolbox
   *
   * @param {boolean} openingState - Opening state of toolbox
   */toggleToolbox(g){-1!==this.Editor.BlockManager.currentBlockIndex?g??!this.Editor.Toolbar.toolbox.opened?(this.Editor.Toolbar.moveAndOpen(),this.Editor.Toolbar.toolbox.open()):this.Editor.Toolbar.toolbox.close():w("Could't toggle the Toolbox because there is no block selected ","warn")}}var le={},ce={get exports(){return le},set exports(g){le=g}};(function(g,f){(function(f,b){g.exports=b()})(window,(function(){return function(g){var f={};function i(b){if(f[b])return f[b].exports;var v=f[b]={i:b,l:!1,exports:{}};return g[b].call(v.exports,v,v.exports,i),v.l=!0,v.exports}return i.m=g,i.c=f,i.d=function(g,f,b){i.o(g,f)||Object.defineProperty(g,f,{enumerable:!0,get:b})},i.r=function(g){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(g,"__esModule",{value:!0})},i.t=function(g,f){if(1&f&&(g=i(g)),8&f||4&f&&"object"==typeof g&&g&&g.__esModule)return g;var b=Object.create(null);if(i.r(b),Object.defineProperty(b,"default",{enumerable:!0,value:g}),2&f&&"string"!=typeof g)for(var v in g)i.d(b,v,function(f){return g[f]}.bind(null,v));return b},i.n=function(g){var f=g&&g.__esModule?function(){return g.default}:function(){return g};return i.d(f,"a",f),f},i.o=function(g,f){return Object.prototype.hasOwnProperty.call(g,f)},i.p="",i(i.s=0)}([function(g,f,b){g.exports=b(1)},function(g,f,b){b.r(f),b.d(f,"default",(function(){return n}));class n{constructor(){this.nodes={wrapper:null,content:null},this.showed=!1,this.offsetTop=10,this.offsetLeft=10,this.offsetRight=10,this.hidingDelay=0,this.handleWindowScroll=()=>{this.showed&&this.hide(!0)},this.loadStyles(),this.prepare(),window.addEventListener("scroll",this.handleWindowScroll,{passive:!0})}get CSS(){return{tooltip:"ct",tooltipContent:"ct__content",tooltipShown:"ct--shown",placement:{left:"ct--left",bottom:"ct--bottom",right:"ct--right",top:"ct--top"}}}show(g,f,b){this.nodes.wrapper||this.prepare(),this.hidingTimeout&&clearTimeout(this.hidingTimeout);const v=Object.assign({placement:"bottom",marginTop:0,marginLeft:0,marginRight:0,marginBottom:0,delay:70,hidingDelay:0},b);if(v.hidingDelay&&(this.hidingDelay=v.hidingDelay),this.nodes.content.innerHTML="","string"==typeof f)this.nodes.content.appendChild(document.createTextNode(f));else{if(!(f instanceof Node))throw Error("[CodeX Tooltip] Wrong type of «content» passed. It should be an instance of Node or String. But "+typeof f+" given.");this.nodes.content.appendChild(f)}switch(this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)),v.placement){case"top":this.placeTop(g,v);break;case"left":this.placeLeft(g,v);break;case"right":this.placeRight(g,v);break;case"bottom":default:this.placeBottom(g,v)}v&&v.delay?this.showingTimeout=setTimeout((()=>{this.nodes.wrapper.classList.add(this.CSS.tooltipShown),this.showed=!0}),v.delay):(this.nodes.wrapper.classList.add(this.CSS.tooltipShown),this.showed=!0)}hide(g=!1){if(this.hidingDelay&&!g)return this.hidingTimeout&&clearTimeout(this.hidingTimeout),void(this.hidingTimeout=setTimeout((()=>{this.hide(!0)}),this.hidingDelay));this.nodes.wrapper.classList.remove(this.CSS.tooltipShown),this.showed=!1,this.showingTimeout&&clearTimeout(this.showingTimeout)}onHover(g,f,b){g.addEventListener("mouseenter",(()=>{this.show(g,f,b)})),g.addEventListener("mouseleave",(()=>{this.hide()}))}destroy(){this.nodes.wrapper.remove(),window.removeEventListener("scroll",this.handleWindowScroll)}prepare(){this.nodes.wrapper=this.make("div",this.CSS.tooltip),this.nodes.content=this.make("div",this.CSS.tooltipContent),this.append(this.nodes.wrapper,this.nodes.content),this.append(document.body,this.nodes.wrapper)}loadStyles(){const g="codex-tooltips-style";if(document.getElementById(g))return;const f=b(2),v=this.make("style",null,{textContent:f.toString(),id:g});this.prepend(document.head,v)}placeBottom(g,f){const b=g.getBoundingClientRect(),v=b.left+g.clientWidth/2-this.nodes.wrapper.offsetWidth/2,w=b.bottom+window.pageYOffset+this.offsetTop+f.marginTop;this.applyPlacement("bottom",v,w)}placeTop(g,f){const b=g.getBoundingClientRect(),v=b.left+g.clientWidth/2-this.nodes.wrapper.offsetWidth/2,w=b.top+window.pageYOffset-this.nodes.wrapper.clientHeight-this.offsetTop;this.applyPlacement("top",v,w)}placeLeft(g,f){const b=g.getBoundingClientRect(),v=b.left-this.nodes.wrapper.offsetWidth-this.offsetLeft-f.marginLeft,w=b.top+window.pageYOffset+g.clientHeight/2-this.nodes.wrapper.offsetHeight/2;this.applyPlacement("left",v,w)}placeRight(g,f){const b=g.getBoundingClientRect(),v=b.right+this.offsetRight+f.marginRight,w=b.top+window.pageYOffset+g.clientHeight/2-this.nodes.wrapper.offsetHeight/2;this.applyPlacement("right",v,w)}applyPlacement(g,f,b){this.nodes.wrapper.classList.add(this.CSS.placement[g]),this.nodes.wrapper.style.left=f+"px",this.nodes.wrapper.style.top=b+"px"}make(g,f=null,b={}){const v=document.createElement(g);Array.isArray(f)?v.classList.add(...f):f&&v.classList.add(f);for(const g in b)b.hasOwnProperty(g)&&(v[g]=b[g]);return v}append(g,f){Array.isArray(f)?f.forEach((f=>g.appendChild(f))):g.appendChild(f)}prepend(g,f){Array.isArray(f)?(f=f.reverse()).forEach((f=>g.prepend(f))):g.prepend(f)}}},function(g,f){g.exports='.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>\') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}'}]).default}))})(ce);const de=xe(le);class Fe{constructor(){this.lib=new de}destroy(){this.lib.destroy()}
/**
   * Shows tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - any HTML element in DOM
   * @param content - tooltip's content
   * @param options - showing settings
   */show(g,f,b){this.lib.show(g,f,b)}
/**
   * Hides tooltip
   *
   * @param skipHidingDelay — pass true to immediately hide the tooltip
   */hide(g=!1){this.lib.hide(g)}
/**
   * Binds 'mouseenter' and 'mouseleave' events that shows/hides the Tooltip
   *
   * @param {HTMLElement} element - any HTML element in DOM
   * @param content - tooltip's content
   * @param options - showing settings
   */onHover(g,f,b){this.lib.onHover(g,f,b)}}class xo extends S{
/**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
constructor({config:g,eventsDispatcher:f}){super({config:g,eventsDispatcher:f}),this.tooltip=new Fe}destroy(){this.tooltip.destroy()}get methods(){return{show:(g,f,b)=>this.show(g,f,b),hide:()=>this.hide(),onHover:(g,f,b)=>this.onHover(g,f,b)}}
/**
   * Method show tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */show(g,f,b){this.tooltip.show(g,f,b)}hide(){this.tooltip.hide()}
/**
   * Decorator for showing Tooltip by mouseenter/mouseleave
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */onHover(g,f,b){this.tooltip.onHover(g,f,b)}}class wo extends S{get methods(){return{nodes:this.editorNodes}}get editorNodes(){return{wrapper:this.Editor.UI.nodes.wrapper,redactor:this.Editor.UI.nodes.redactor}}}function ut(g,f){const b={};return Object.entries(g).forEach((([g,v])=>{if(j(v)){const w=f?`${f}.${g}`:g;Object.values(v).every((g=>J(g)))?b[g]=w:b[g]=ut(v,w)}else b[g]=v})),b}const fe=ut(L);function yo(g,f){const b={};return Object.keys(g).forEach((v=>{const w=f[v];void 0!==w?b[w]=g[v]:b[v]=g[v]})),b}const me='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>',be='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>',ye='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>',Ee='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>',_e='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>',Me='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>',Le='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>',Ae='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>',Oe='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>',Ne='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>',He='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';class P{
/**
   * Constructs popover item instance
   *
   * @param params - popover item construction params
   */
constructor(g){this.nodes={root:null,icon:null},this.confirmationState=null,this.removeSpecialFocusBehavior=()=>{this.nodes.root.classList.remove(P.CSS.noFocus)},this.removeSpecialHoverBehavior=()=>{this.nodes.root.classList.remove(P.CSS.noHover)},this.onErrorAnimationEnd=()=>{this.nodes.icon.classList.remove(P.CSS.wobbleAnimation),this.nodes.icon.removeEventListener("animationend",this.onErrorAnimationEnd)},this.params=g,this.nodes.root=this.make(g)}get isDisabled(){return this.params.isDisabled}get toggle(){return this.params.toggle}get title(){return this.params.title}get closeOnActivate(){return this.params.closeOnActivate}get isConfirmationStateEnabled(){return null!==this.confirmationState}get isFocused(){return this.nodes.root.classList.contains(P.CSS.focused)}static get CSS(){return{container:"ce-popover-item",title:"ce-popover-item__title",secondaryTitle:"ce-popover-item__secondary-title",icon:"ce-popover-item__icon",active:"ce-popover-item--active",disabled:"ce-popover-item--disabled",focused:"ce-popover-item--focused",hidden:"ce-popover-item--hidden",confirmationState:"ce-popover-item--confirmation",noHover:"ce-popover-item--no-hover",noFocus:"ce-popover-item--no-focus",wobbleAnimation:"wobble"}}getElement(){return this.nodes.root}handleClick(){this.isConfirmationStateEnabled?this.activateOrEnableConfirmationMode(this.confirmationState):this.activateOrEnableConfirmationMode(this.params)}
/**
   * Toggles item active state
   *
   * @param isActive - true if item should strictly should become active
   */toggleActive(g){this.nodes.root.classList.toggle(P.CSS.active,g)}
/**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */toggleHidden(g){this.nodes.root.classList.toggle(P.CSS.hidden,g)}reset(){this.isConfirmationStateEnabled&&this.disableConfirmationMode()}onFocus(){this.disableSpecialHoverAndFocusBehavior()}
/**
   * Constructs HTML element corresponding to popover item params
   *
   * @param params - item construction params
   */make(g){const f=d.make("div",P.CSS.container);return g.name&&(f.dataset.itemName=g.name),this.nodes.icon=d.make("div",P.CSS.icon,{innerHTML:g.icon||_e}),f.appendChild(this.nodes.icon),f.appendChild(d.make("div",P.CSS.title,{innerHTML:g.title||""})),g.secondaryLabel&&f.appendChild(d.make("div",P.CSS.secondaryTitle,{textContent:g.secondaryLabel})),g.isActive&&f.classList.add(P.CSS.active),g.isDisabled&&f.classList.add(P.CSS.disabled),f
/**
   * Activates confirmation mode for the item.
   *
   * @param newState - new popover item params that should be applied
   */}enableConfirmationMode(g){const f={...this.params,...g,confirmation:g.confirmation},b=this.make(f);this.nodes.root.innerHTML=b.innerHTML,this.nodes.root.classList.add(P.CSS.confirmationState),this.confirmationState=g,this.enableSpecialHoverAndFocusBehavior()}disableConfirmationMode(){const g=this.make(this.params);this.nodes.root.innerHTML=g.innerHTML,this.nodes.root.classList.remove(P.CSS.confirmationState),this.confirmationState=null,this.disableSpecialHoverAndFocusBehavior()}enableSpecialHoverAndFocusBehavior(){this.nodes.root.classList.add(P.CSS.noHover),this.nodes.root.classList.add(P.CSS.noFocus),this.nodes.root.addEventListener("mouseleave",this.removeSpecialHoverBehavior,{once:!0})}disableSpecialHoverAndFocusBehavior(){this.removeSpecialFocusBehavior(),this.removeSpecialHoverBehavior(),this.nodes.root.removeEventListener("mouseleave",this.removeSpecialHoverBehavior)
/**
   * Executes item's onActivate callback if the item has no confirmation configured
   *
   * @param item - item to activate or bring to confirmation mode
   */}activateOrEnableConfirmationMode(g){if(void 0===g.confirmation)try{g.onActivate(g),this.disableConfirmationMode()}catch{this.animateError()}else this.enableConfirmationMode(g.confirmation)}animateError(){this.nodes.icon.classList.contains(P.CSS.wobbleAnimation)||(this.nodes.icon.classList.add(P.CSS.wobbleAnimation),this.nodes.icon.addEventListener("animationend",this.onErrorAnimationEnd))}}const je=class{
/**
   * @param {HTMLElement[]} nodeList — the list of iterable HTML-items
   * @param {string} focusedCssClass - user-provided CSS-class that will be set in flipping process
   */
constructor(g,f){this.cursor=-1,this.items=[],this.items=g||[],this.focusedCssClass=f
/**
   * Returns Focused button Node
   *
   * @returns {HTMLElement}
   */}get currentItem(){return-1===this.cursor?null:this.items[this.cursor]}
/**
   * Sets cursor to specified position
   *
   * @param cursorPosition - new cursor position
   */setCursor(g){g<this.items.length&&g>=-1&&(this.dropCursor(),this.cursor=g,this.items[this.cursor].classList.add(this.focusedCssClass))}
/**
   * Sets items. Can be used when iterable items changed dynamically
   *
   * @param {HTMLElement[]} nodeList - nodes to iterate
   */setItems(g){this.items=g}next(){this.cursor=this.leafNodesAndReturnIndex(je.directions.RIGHT)}previous(){this.cursor=this.leafNodesAndReturnIndex(je.directions.LEFT)}dropCursor(){-1!==this.cursor&&(this.items[this.cursor].classList.remove(this.focusedCssClass),this.cursor=-1)}
/**
   * Leafs nodes inside the target list from active element
   *
   * @param {string} direction - leaf direction. Can be 'left' or 'right'
   * @returns {number} index of focused node
   */leafNodesAndReturnIndex(g){if(0===this.items.length)return this.cursor;let f=this.cursor;return-1===f?f=g===je.directions.RIGHT?-1:0:this.items[f].classList.remove(this.focusedCssClass),f=g===je.directions.RIGHT?(f+1)%this.items.length:(this.items.length+f-1)%this.items.length,d.canSetCaret(this.items[f])&&oe((()=>m.setCursor(this.items[f])),50)(),this.items[f].classList.add(this.focusedCssClass),f}};let ze=je;ze.directions={RIGHT:"right",LEFT:"left"};class G{
/**
   * @param {FlipperOptions} options - different constructing settings
   */
constructor(g){this.iterator=null,this.activated=!1,this.flipCallbacks=[],this.onKeyDown=g=>{if(this.isEventReadyForHandling(g))switch(G.usedKeys.includes(g.keyCode)&&g.preventDefault(),g.keyCode){case f.TAB:this.handleTabPress(g);break;case f.LEFT:case f.UP:this.flipLeft();break;case f.RIGHT:case f.DOWN:this.flipRight();break;case f.ENTER:this.handleEnterPress(g);break}},this.iterator=new ze(g.items,g.focusedItemClass),this.activateCallback=g.activateCallback,this.allowedKeys=g.allowedKeys||G.usedKeys}get isActivated(){return this.activated}static get usedKeys(){return[f.TAB,f.LEFT,f.RIGHT,f.ENTER,f.UP,f.DOWN]}
/**
   * Active tab/arrows handling by flipper
   *
   * @param items - Some modules (like, InlineToolbar, BlockSettings) might refresh buttons dynamically
   * @param cursorPosition - index of the item that should be focused once flipper is activated
   */activate(g,f){this.activated=!0,g&&this.iterator.setItems(g),void 0!==f&&this.iterator.setCursor(f),document.addEventListener("keydown",this.onKeyDown,!0)}deactivate(){this.activated=!1,this.dropCursor(),document.removeEventListener("keydown",this.onKeyDown)}focusFirst(){this.dropCursor(),this.flipRight()}flipLeft(){this.iterator.previous(),this.flipCallback()}flipRight(){this.iterator.next(),this.flipCallback()}hasFocus(){return!!this.iterator.currentItem}
/**
   * Registeres function that should be executed on each navigation action
   *
   * @param cb - function to execute
   */onFlip(g){this.flipCallbacks.push(g)}
/**
   * Unregisteres function that is executed on each navigation action
   *
   * @param cb - function to stop executing
   */removeOnFlip(g){this.flipCallbacks=this.flipCallbacks.filter((f=>f!==g))}dropCursor(){this.iterator.dropCursor()}
/**
   * This function is fired before handling flipper keycodes
   * The result of this function defines if it is need to be handled or not
   *
   * @param {KeyboardEvent} event - keydown keyboard event
   * @returns {boolean}
   */isEventReadyForHandling(g){return this.activated&&this.allowedKeys.includes(g.keyCode)}
/**
   * When flipper is activated tab press will leaf the items
   *
   * @param {KeyboardEvent} event - tab keydown event
   */handleTabPress(g){switch(g.shiftKey?ze.directions.LEFT:ze.directions.RIGHT){case ze.directions.RIGHT:this.flipRight();break;case ze.directions.LEFT:this.flipLeft();break}}
/**
   * Enter press will click current item if flipper is activated
   *
   * @param {KeyboardEvent} event - enter keydown event
   */handleEnterPress(g){this.activated&&(this.iterator.currentItem&&(g.stopPropagation(),g.preventDefault(),this.iterator.currentItem.click()),D(this.activateCallback)&&this.activateCallback(this.iterator.currentItem))}flipCallback(){this.iterator.currentItem&&this.iterator.currentItem.scrollIntoViewIfNeeded(),this.flipCallbacks.forEach((g=>g()))}}class ue{static get CSS(){return{wrapper:"cdx-search-field",icon:"cdx-search-field__icon",input:"cdx-search-field__input"}}
/**
   * @param options - available config
   * @param options.items - searchable items list
   * @param options.onSearch - search callback
   * @param options.placeholder - input placeholder
   */constructor({items:g,onSearch:f,placeholder:b}){this.listeners=new Re,this.items=g,this.onSearch=f,this.render(b)}getElement(){return this.wrapper}focus(){this.input.focus()}clear(){this.input.value="",this.searchQuery="",this.onSearch("",this.foundItems)}destroy(){this.listeners.removeAll()}
/**
   * Creates the search field
   *
   * @param placeholder - input placeholder
   */render(g){this.wrapper=d.make("div",ue.CSS.wrapper);const f=d.make("div",ue.CSS.icon,{innerHTML:Ne});this.input=d.make("input",ue.CSS.input,{placeholder:g}),this.wrapper.appendChild(f),this.wrapper.appendChild(this.input),this.listeners.on(this.input,"input",(()=>{this.searchQuery=this.input.value,this.onSearch(this.searchQuery,this.foundItems)}))}get foundItems(){return this.items.filter((g=>this.checkItem(g)))}
/**
   * Contains logic for checking whether passed item conforms the search query
   *
   * @param item - item to be checked
   */checkItem(g){var f;const b=(null==(f=g.title)?void 0:f.toLowerCase())||"",v=this.searchQuery.toLowerCase();return b.includes(v)}}const Xe=class{lock(){C?this.lockHard():document.body.classList.add(Xe.CSS.scrollLocked)}unlock(){C?this.unlockHard():document.body.classList.remove(Xe.CSS.scrollLocked)}lockHard(){this.scrollPosition=window.pageYOffset,document.documentElement.style.setProperty("--window-scroll-offset",`${this.scrollPosition}px`),document.body.classList.add(Xe.CSS.scrollLockedHard)}unlockHard(){document.body.classList.remove(Xe.CSS.scrollLockedHard),null!==this.scrollPosition&&window.scrollTo(0,this.scrollPosition),this.scrollPosition=null}};let Ge=Xe;Ge.CSS={scrollLocked:"ce-scroll-locked",scrollLockedHard:"ce-scroll-locked--hard"};var qe=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,No=(g,f,b,v)=>{for(var w,E=v>1?void 0:v?Je(f,b):f,C=g.length-1;C>=0;C--)(w=g[C])&&(E=(v?w(f,b,E):w(E))||E);return v&&E&&qe(f,b,E),E},Qe=(g=>(g.Close="close",g))(Qe||{});const et=class extends we{
/**
   * Constructs the instance
   *
   * @param params - popover construction params
   */
constructor(g){super(),this.scopeElement=document.body,this.listeners=new Re,this.scrollLocker=new Ge,this.nodes={wrapper:null,popover:null,nothingFoundMessage:null,customContent:null,items:null,overlay:null},this.messages={nothingFound:"Nothing found",search:"Search"},this.onFlip=()=>{this.items.find((g=>g.isFocused)).onFocus()},this.items=g.items.map((g=>new P(g))),void 0!==g.scopeElement&&(this.scopeElement=g.scopeElement),g.messages&&(this.messages={...this.messages,...g.messages}),g.customContentFlippableItems&&(this.customContentFlippableItems=g.customContentFlippableItems),this.make(),g.customContent&&this.addCustomContent(g.customContent),g.searchable&&this.addSearch(),this.initializeFlipper()}static get CSS(){return{popover:"ce-popover",popoverOpenTop:"ce-popover--open-top",popoverOpened:"ce-popover--opened",search:"ce-popover__search",nothingFoundMessage:"ce-popover__nothing-found-message",nothingFoundMessageDisplayed:"ce-popover__nothing-found-message--displayed",customContent:"ce-popover__custom-content",customContentHidden:"ce-popover__custom-content--hidden",items:"ce-popover__items",overlay:"ce-popover__overlay",overlayHidden:"ce-popover__overlay--hidden"}}getElement(){return this.nodes.wrapper}hasFocus(){return this.flipper.hasFocus()}show(){this.shouldOpenBottom||(this.nodes.popover.style.setProperty("--popover-height",this.height+"px"),this.nodes.popover.classList.add(et.CSS.popoverOpenTop)),this.nodes.overlay.classList.remove(et.CSS.overlayHidden),this.nodes.popover.classList.add(et.CSS.popoverOpened),this.flipper.activate(this.flippableElements),void 0!==this.search&&setTimeout((()=>{this.search.focus()}),100),ee()&&this.scrollLocker.lock()}hide(){this.nodes.popover.classList.remove(et.CSS.popoverOpened),this.nodes.popover.classList.remove(et.CSS.popoverOpenTop),this.nodes.overlay.classList.add(et.CSS.overlayHidden),this.flipper.deactivate(),this.items.forEach((g=>g.reset())),void 0!==this.search&&this.search.clear(),ee()&&this.scrollLocker.unlock(),this.emit("close")}destroy(){this.flipper.deactivate(),this.listeners.removeAll(),ee()&&this.scrollLocker.unlock()}make(){this.nodes.popover=d.make("div",[et.CSS.popover]),this.nodes.nothingFoundMessage=d.make("div",[et.CSS.nothingFoundMessage],{textContent:this.messages.nothingFound}),this.nodes.popover.appendChild(this.nodes.nothingFoundMessage),this.nodes.items=d.make("div",[et.CSS.items]),this.items.forEach((g=>{this.nodes.items.appendChild(g.getElement())})),this.nodes.popover.appendChild(this.nodes.items),this.listeners.on(this.nodes.popover,"click",(g=>{const f=this.getTargetItem(g);void 0!==f&&this.handleItemClick(f)})),this.nodes.wrapper=d.make("div"),this.nodes.overlay=d.make("div",[et.CSS.overlay,et.CSS.overlayHidden]),this.listeners.on(this.nodes.overlay,"click",(()=>{this.hide()})),this.nodes.wrapper.appendChild(this.nodes.overlay),this.nodes.wrapper.appendChild(this.nodes.popover)}addSearch(){this.search=new ue({items:this.items,placeholder:this.messages.search,onSearch:(g,f)=>{this.items.forEach((g=>{const b=!f.includes(g);g.toggleHidden(b)})),this.toggleNothingFoundMessage(0===f.length),this.toggleCustomContent(""!==g);const b=""===g?this.flippableElements:f.map((g=>g.getElement()));this.flipper.isActivated&&(this.flipper.deactivate(),this.flipper.activate(b))}});const g=this.search.getElement();g.classList.add(et.CSS.search),this.nodes.popover.insertBefore(g,this.nodes.popover.firstChild)
/**
   * Adds custom html content to the popover
   *
   * @param content - html content to append
   */}addCustomContent(g){this.nodes.customContent=g,this.nodes.customContent.classList.add(et.CSS.customContent),this.nodes.popover.insertBefore(g,this.nodes.popover.firstChild)
/**
   * Retrieves popover item that is the target of the specified event
   *
   * @param event - event to retrieve popover item from
   */}getTargetItem(g){return this.items.find((f=>g.composedPath().includes(f.getElement())))}
/**
   * Handles item clicks
   *
   * @param item - item to handle click of
   */handleItemClick(g){g.isDisabled||(this.items.filter((f=>f!==g)).forEach((g=>g.reset())),g.handleClick(),this.toggleItemActivenessIfNeeded(g),g.closeOnActivate&&this.hide())}initializeFlipper(){this.flipper=new G({items:this.flippableElements,focusedItemClass:P.CSS.focused,allowedKeys:[f.TAB,f.UP,f.DOWN,f.ENTER]}),this.flipper.onFlip(this.onFlip)}get flippableElements(){const g=this.items.map((g=>g.getElement()));return(this.customContentFlippableItems||[]).concat(g)}get height(){let g=0;if(null===this.nodes.popover)return g;const f=this.nodes.popover.cloneNode(!0);return f.style.visibility="hidden",f.style.position="absolute",f.style.top="-1000px",f.classList.add(et.CSS.popoverOpened),document.body.appendChild(f),g=f.offsetHeight,f.remove(),g}get shouldOpenBottom(){const g=this.nodes.popover.getBoundingClientRect(),f=this.scopeElement.getBoundingClientRect(),b=this.height,v=g.top+b,w=g.top-b,E=Math.min(window.innerHeight,f.bottom);return w<f.top||v<=E}
/**
   * Toggles nothing found message visibility
   *
   * @param isDisplayed - true if the message should be displayed
   */toggleNothingFoundMessage(g){this.nodes.nothingFoundMessage.classList.toggle(et.CSS.nothingFoundMessageDisplayed,g)}
/**
   * Toggles custom content visibility
   *
   * @param isDisplayed - true if custom content should be displayed
   */toggleCustomContent(g){var f;null==(f=this.nodes.customContent)||f.classList.toggle(et.CSS.customContentHidden,g)}
/**
   * - Toggles item active state, if clicked popover item has property 'toggle' set to true.
   *
   * - Performs radiobutton-like behavior if the item has property 'toggle' set to string key.
   * (All the other items with the same key get inactive, and the item gets active)
   *
   * @param clickedItem - popover item that was clicked
   */toggleItemActivenessIfNeeded(g){if(!0===g.toggle&&g.toggleActive(),"string"==typeof g.toggle){const f=this.items.filter((f=>f.toggle===g.toggle));if(1===f.length){g.toggleActive();return}f.forEach((f=>{f.toggleActive(f===g)}))}}};let st=et;No([ae],st.prototype,"height",1);class Ro extends S{constructor(){super(...arguments),this.opened=!1,this.selection=new m,this.onPopoverClose=()=>{this.close()}
/**
   * Module Events
   *
   * @returns {{opened: string, closed: string}}
   */}get events(){return{opened:"block-settings-opened",closed:"block-settings-closed"}}get CSS(){return{settings:"ce-settings"}}get flipper(){var g;return null==(g=this.popover)?void 0:g.flipper}make(){this.nodes.wrapper=d.make("div",[this.CSS.settings])}destroy(){this.removeAllNodes()}
/**
   * Open Block Settings pane
   *
   * @param targetBlock - near which Block we should open BlockSettings
   */open(g=this.Editor.BlockManager.currentBlock){this.opened=!0,this.selection.save(),g.selected=!0,this.Editor.BlockSelection.clearCache();const[f,b]=g.getTunes();this.eventsDispatcher.emit(this.events.opened),this.popover=new st({searchable:!0,items:f.map((g=>this.resolveTuneAliases(g))),customContent:b,customContentFlippableItems:this.getControls(b),scopeElement:this.Editor.API.methods.ui.nodes.redactor,messages:{nothingFound:H.ui(fe.ui.popover,"Nothing found"),search:H.ui(fe.ui.popover,"Filter")}}),this.popover.on(Qe.Close,this.onPopoverClose),this.nodes.wrapper.append(this.popover.getElement()),this.popover.show()}getElement(){return this.nodes.wrapper}close(){this.opened=!1,m.isAtEditor||this.selection.restore(),this.selection.clearSaved(),!this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted&&this.Editor.BlockManager.currentBlock&&(this.Editor.BlockManager.currentBlock.selected=!1),this.eventsDispatcher.emit(this.events.closed),this.popover&&(this.popover.off(Qe.Close,this.onPopoverClose),this.popover.destroy(),this.popover.getElement().remove(),this.popover=null)
/**
   * Returns list of buttons and inputs inside specified container
   *
   * @param container - container to query controls inside of
   */}getControls(g){const{StylesAPI:f}=this.Editor,b=g.querySelectorAll(`.${f.classes.settingsButton}, ${d.allInputsSelector}`);return Array.from(b)}
/**
   * Resolves aliases in tunes menu items
   *
   * @param item - item with resolved aliases
   */resolveTuneAliases(g){const f=yo(g,{label:"title"});return g.confirmation&&(f.confirmation=this.resolveTuneAliases(g.confirmation)),f}}class Y extends S{constructor(){super(...arguments),this.opened=!1,this.tools=[],this.flipper=null,this.togglingCallback=null}static get CSS(){return{conversionToolbarWrapper:"ce-conversion-toolbar",conversionToolbarShowed:"ce-conversion-toolbar--showed",conversionToolbarTools:"ce-conversion-toolbar__tools",conversionToolbarLabel:"ce-conversion-toolbar__label",conversionTool:"ce-conversion-tool",conversionToolHidden:"ce-conversion-tool--hidden",conversionToolIcon:"ce-conversion-tool__icon",conversionToolFocused:"ce-conversion-tool--focused",conversionToolActive:"ce-conversion-tool--active"}}make(){this.nodes.wrapper=d.make("div",[Y.CSS.conversionToolbarWrapper,...this.isRtl?[this.Editor.UI.CSS.editorRtlFix]:[]]),this.nodes.tools=d.make("div",Y.CSS.conversionToolbarTools);const g=d.make("div",Y.CSS.conversionToolbarLabel,{textContent:H.ui(fe.ui.inlineToolbar.converter,"Convert to")});return this.addTools(),this.enableFlipper(),d.append(this.nodes.wrapper,g),d.append(this.nodes.wrapper,this.nodes.tools),this.nodes.wrapper}destroy(){this.flipper&&(this.flipper.deactivate(),this.flipper=null),this.removeAllNodes()
/**
   * Toggle conversion dropdown visibility
   *
   * @param {Function} [togglingCallback] — callback that will accept opening state
   */}toggle(g){this.opened?this.close():this.open(),D(g)&&(this.togglingCallback=g)}open(){this.filterTools(),this.opened=!0,this.nodes.wrapper.classList.add(Y.CSS.conversionToolbarShowed),window.requestAnimationFrame((()=>{this.flipper.activate(this.tools.map((g=>g.button)).filter((g=>!g.classList.contains(Y.CSS.conversionToolHidden)))),this.flipper.focusFirst(),D(this.togglingCallback)&&this.togglingCallback(!0)}))}close(){this.opened=!1,this.flipper.deactivate(),this.nodes.wrapper.classList.remove(Y.CSS.conversionToolbarShowed),D(this.togglingCallback)&&this.togglingCallback(!1)}hasTools(){return 1!==this.tools.length||this.tools[0].name!==this.config.defaultBlock}
/**
   * Replaces one Block with another
   * For that Tools must provide import/export methods
   *
   * @param {string} replacingToolName - name of Tool which replaces current
   * @param blockDataOverrides - Block data overrides. Could be passed in case if Multiple Toolbox items specified
   */async replaceWithBlock(g,f){const b=this.Editor.BlockManager.currentBlock.tool,w=(await this.Editor.BlockManager.currentBlock.save()).data,E=this.Editor.Tools.blockTools.get(g);let C="";const B=b.conversionConfig.export;if(D(B))C=B(w);else{if(!J(B)){v("Conversion «export» property must be a string or function. String means key of saved data object to export. Function should export processed string to export.");return}C=w[B]}const T=Z(C,E.sanitizeConfig);let I={};const M=E.conversionConfig.import;if(D(M))I=M(T);else{if(!J(M)){v("Conversion «import» property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data.");return}I[M]=T}f&&(I=Object.assign(I,f)),this.Editor.BlockManager.replace({tool:g,data:I}),this.Editor.BlockSelection.clearSelection(),this.close(),this.Editor.InlineToolbar.close(),oe((()=>{this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock)}),10)()}addTools(){const g=this.Editor.Tools.blockTools;Array.from(g.entries()).forEach((([g,f])=>{const b=f.conversionConfig;!b||!b.import||f.toolbox.forEach((f=>this.addToolIfValid(g,f)))}))}
/**
   * Inserts a tool to the ConversionToolbar if the tool's toolbox config is valid
   *
   * @param name - tool's name
   * @param toolboxSettings - tool's single toolbox setting
   */addToolIfValid(g,f){V(f)||!f.icon||this.addTool(g,f)}
/**
   * Add tool to the Conversion Toolbar
   *
   * @param toolName - name of Tool to add
   * @param toolboxItem - tool's toolbox item data
   */addTool(g,f){const b=d.make("div",[Y.CSS.conversionTool]),v=d.make("div",[Y.CSS.conversionToolIcon]);b.dataset.tool=g,v.innerHTML=f.icon,d.append(b,v),d.append(b,d.text(H.t(fe.toolNames,f.title||ke(g)))),d.append(this.nodes.tools,b),this.tools.push({name:g,button:b,toolboxItem:f}),this.listeners.on(b,"click",(async()=>{await this.replaceWithBlock(g,f.data)}))}async filterTools(){const{currentBlock:g}=this.Editor.BlockManager,f=await g.getActiveToolboxEntry();function o(g,f){return g.icon===f.icon&&g.title===f.title}this.tools.forEach((b=>{let v=!1;if(f){const w=o(f,b.toolboxItem);v=b.button.dataset.tool===g.name&&w}b.button.hidden=v,b.button.classList.toggle(Y.CSS.conversionToolHidden,v)}))}enableFlipper(){this.flipper=new G({focusedItemClass:Y.CSS.conversionToolFocused})}}var rt={},lt={get exports(){return rt},set exports(g){rt=g}};
/*!
 * Library for handling keyboard shortcuts
 * @copyright CodeX (https://codex.so)
 * @license MIT
 * @author CodeX (https://codex.so)
 * @version 1.2.0
 */(function(g,f){(function(f,b){g.exports=b()})(window,(function(){return function(g){var f={};function i(b){if(f[b])return f[b].exports;var v=f[b]={i:b,l:!1,exports:{}};return g[b].call(v.exports,v,v.exports,i),v.l=!0,v.exports}return i.m=g,i.c=f,i.d=function(g,f,b){i.o(g,f)||Object.defineProperty(g,f,{enumerable:!0,get:b})},i.r=function(g){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(g,"__esModule",{value:!0})},i.t=function(g,f){if(1&f&&(g=i(g)),8&f||4&f&&"object"==typeof g&&g&&g.__esModule)return g;var b=Object.create(null);if(i.r(b),Object.defineProperty(b,"default",{enumerable:!0,value:g}),2&f&&"string"!=typeof g)for(var v in g)i.d(b,v,function(f){return g[f]}.bind(null,v));return b},i.n=function(g){var f=g&&g.__esModule?function(){return g.default}:function(){return g};return i.d(f,"a",f),f},i.o=function(g,f){return Object.prototype.hasOwnProperty.call(g,f)},i.p="",i(i.s=0)}([function(g,f,b){function n(g,f){for(var b=0;b<f.length;b++){var v=f[b];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(g,v.key,v)}}function r(g,f,b){return f&&n(g.prototype,f),b&&n(g,b),g}b.r(f);var v=function(){function l(g){var f=this;(function(g,f){if(!(g instanceof f))throw new TypeError("Cannot call a class as a function")})(this,l),this.commands={},this.keys={},this.name=g.name,this.parseShortcutName(g.name),this.element=g.on,this.callback=g.callback,this.executeShortcut=function(g){f.execute(g)},this.element.addEventListener("keydown",this.executeShortcut,!1)}return r(l,null,[{key:"supportedCommands",get:function(){return{SHIFT:["SHIFT"],CMD:["CMD","CONTROL","COMMAND","WINDOWS","CTRL"],ALT:["ALT","OPTION"]}}},{key:"keyCodes",get:function(){return{0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,BACKSPACE:8,ENTER:13,ESCAPE:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46,".":190}}}]),r(l,[{key:"parseShortcutName",value:function(g){g=g.split("+");for(var f=0;f<g.length;f++){g[f]=g[f].toUpperCase();var b=!1;for(var v in l.supportedCommands)if(l.supportedCommands[v].includes(g[f])){b=this.commands[v]=!0;break}b||(this.keys[g[f]]=!0)}for(var w in l.supportedCommands)this.commands[w]||(this.commands[w]=!1)}},{key:"execute",value:function(g){var f,b={CMD:g.ctrlKey||g.metaKey,SHIFT:g.shiftKey,ALT:g.altKey},v=!0;for(f in this.commands)this.commands[f]!==b[f]&&(v=!1);var w,E=!0;for(w in this.keys)E=E&&g.keyCode===l.keyCodes[w];v&&E&&this.callback(g)}},{key:"remove",value:function(){this.element.removeEventListener("keydown",this.executeShortcut)}}]),l}();f.default=v}]).default}))})(lt);const ct=xe(rt);class Fo{constructor(){this.registeredShortcuts=new Map}
/**
   * Register shortcut
   *
   * @param shortcut - shortcut options
   */add(g){if(this.findShortcut(g.on,g.name))throw Error(`Shortcut ${g.name} is already registered for ${g.on}. Please remove it before add a new handler.`);const f=new ct({name:g.name,on:g.on,callback:g.handler}),b=this.registeredShortcuts.get(g.on)||[];this.registeredShortcuts.set(g.on,[...b,f])}
/**
   * Remove shortcut
   *
   * @param element - Element shortcut is set for
   * @param name - shortcut name
   */remove(g,f){const b=this.findShortcut(g,f);if(!b)return;b.remove();const v=this.registeredShortcuts.get(g);this.registeredShortcuts.set(g,v.filter((g=>g!==b)))}
/**
   * Get Shortcut instance if exist
   *
   * @param element - Element shorcut is set for
   * @param shortcut - shortcut name
   * @returns {number} index - shortcut index if exist
   */findShortcut(g,f){return(this.registeredShortcuts.get(g)||[]).find((({name:g})=>g===f))}}const dt=new Fo;var pt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,gt=(g,f,b,v)=>{for(var w,E=v>1?void 0:v?ft(f,b):f,C=g.length-1;C>=0;C--)(w=g[C])&&(E=(v?w(f,b,E):w(E))||E);return v&&E&&pt(f,b,E),E},mt=(g=>(g.Opened="toolbox-opened",g.Closed="toolbox-closed",g.BlockAdded="toolbox-block-added",g))(mt||{});const bt=class extends we{
/**
   * Toolbox constructor
   *
   * @param options - available parameters
   * @param options.api - Editor API methods
   * @param options.tools - Tools available to check whether some of them should be displayed at the Toolbox or not
   */
constructor({api:g,tools:f,i18nLabels:b}){super(),this.opened=!1,this.nodes={toolbox:null},this.onPopoverClose=()=>{this.opened=!1,this.emit("toolbox-closed")},this.api=g,this.tools=f,this.i18nLabels=b
/**
   * Returns True if Toolbox is Empty and nothing to show
   *
   * @returns {boolean}
   */}get isEmpty(){return 0===this.toolsToBeDisplayed.length}
/**
   * CSS styles
   *
   * @returns {Object<string, string>}
   */static get CSS(){return{toolbox:"ce-toolbox"}}make(){return this.popover=new st({scopeElement:this.api.ui.nodes.redactor,searchable:!0,messages:{nothingFound:this.i18nLabels.nothingFound,search:this.i18nLabels.filter},items:this.toolboxItemsToBeDisplayed}),this.popover.on(Qe.Close,this.onPopoverClose),this.enableShortcuts(),this.nodes.toolbox=this.popover.getElement(),this.nodes.toolbox.classList.add(bt.CSS.toolbox),this.nodes.toolbox}hasFocus(){var g;return null==(g=this.popover)?void 0:g.hasFocus()}destroy(){var g;super.destroy(),this.nodes&&this.nodes.toolbox&&(this.nodes.toolbox.remove(),this.nodes.toolbox=null),this.removeAllShortcuts(),null==(g=this.popover)||g.off(Qe.Close,this.onPopoverClose)
/**
   * Toolbox Tool's button click handler
   *
   * @param toolName - tool type to be activated
   * @param blockDataOverrides - Block data predefined by the activated Toolbox item
   */}toolButtonActivated(g,f){this.insertNewBlock(g,f)}open(){var g;this.isEmpty||(null==(g=this.popover)||g.show(),this.opened=!0,this.emit("toolbox-opened"))}close(){var g;null==(g=this.popover)||g.hide(),this.opened=!1,this.emit("toolbox-closed")}toggle(){this.opened?this.close():this.open()}get toolsToBeDisplayed(){const g=[];return this.tools.forEach((f=>{f.toolbox&&g.push(f)})),g}get toolboxItemsToBeDisplayed(){const s=(g,f)=>({icon:g.icon,title:H.t(fe.toolNames,g.title||ke(f.name)),name:f.name,onActivate:()=>{this.toolButtonActivated(f.name,g.data)},secondaryLabel:f.shortcut?nt(f.shortcut):""});return this.toolsToBeDisplayed.reduce(((g,f)=>(Array.isArray(f.toolbox)?f.toolbox.forEach((b=>{g.push(s(b,f))})):void 0!==f.toolbox&&g.push(s(f.toolbox,f)),g)),[])}enableShortcuts(){this.toolsToBeDisplayed.forEach((g=>{const f=g.shortcut;f&&this.enableShortcutForTool(g.name,f)}))}
/**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */enableShortcutForTool(g,f){dt.add({name:f,on:this.api.ui.nodes.redactor,handler:f=>{f.preventDefault(),this.insertNewBlock(g)}})}removeAllShortcuts(){this.toolsToBeDisplayed.forEach((g=>{const f=g.shortcut;f&&dt.remove(this.api.ui.nodes.redactor,f)}))}
/**
   * Inserts new block
   * Can be called when button clicked on Toolbox or by ShortcutData
   *
   * @param {string} toolName - Tool name
   * @param blockDataOverrides - predefined Block data
   */async insertNewBlock(g,f){const b=this.api.blocks.getCurrentBlockIndex(),v=this.api.blocks.getBlockByIndex(b);if(!v)return;const w=v.isEmpty?b:b+1;let E;if(f){const b=await this.api.blocks.composeBlockData(g);E=Object.assign(b,f)}const C=this.api.blocks.insert(g,E,void 0,w,void 0,v.isEmpty);C.call(X.APPEND_CALLBACK),this.api.caret.setToBlock(w),this.emit("toolbox-block-added",{block:C}),this.api.toolbar.close()}};let kt=bt;gt([ae],kt.prototype,"toolsToBeDisplayed",1);gt([ae],kt.prototype,"toolboxItemsToBeDisplayed",1);const vt="block hovered";class jo extends S{
/**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
constructor({config:g,eventsDispatcher:f}){super({config:g,eventsDispatcher:f}),this.tooltip=new Fe
/**
   * CSS styles
   *
   * @returns {object}
   */}get CSS(){return{toolbar:"ce-toolbar",content:"ce-toolbar__content",actions:"ce-toolbar__actions",actionsOpened:"ce-toolbar__actions--opened",toolbarOpened:"ce-toolbar--opened",openedToolboxHolderModifier:"codex-editor--toolbox-opened",plusButton:"ce-toolbar__plus",plusButtonShortcut:"ce-toolbar__plus-shortcut",settingsToggler:"ce-toolbar__settings-btn",settingsTogglerHidden:"ce-toolbar__settings-btn--hidden"}}
/**
   * Returns the Toolbar opening state
   *
   * @returns {boolean}
   */get opened(){return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened)}get toolbox(){return{opened:this.toolboxInstance.opened,close:()=>{this.toolboxInstance.close()},open:()=>{this.Editor.BlockManager.currentBlock=this.hoveredBlock,this.toolboxInstance.open()},toggle:()=>this.toolboxInstance.toggle(),hasFocus:()=>this.toolboxInstance.hasFocus()}}get blockActions(){return{hide:()=>{this.nodes.actions.classList.remove(this.CSS.actionsOpened)},show:()=>{this.nodes.actions.classList.add(this.CSS.actionsOpened)}}}get blockTunesToggler(){return{hide:()=>this.nodes.settingsToggler.classList.add(this.CSS.settingsTogglerHidden),show:()=>this.nodes.settingsToggler.classList.remove(this.CSS.settingsTogglerHidden)}}
/**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */toggleReadOnly(g){g?(this.destroy(),this.Editor.BlockSettings.destroy(),this.disableModuleBindings()):(this.drawUI(),this.enableModuleBindings())}
/**
   * Move Toolbar to the passed (or current) Block
   *
   * @param block - block to move Toolbar near it
   */moveAndOpen(g=this.Editor.BlockManager.currentBlock){if(this.toolboxInstance.opened&&this.toolboxInstance.close(),this.Editor.BlockSettings.opened&&this.Editor.BlockSettings.close(),!g)return;this.hoveredBlock=g;const f=g.holder,{isMobile:b}=this.Editor.UI,v=g.pluginsContent,w=window.getComputedStyle(v),E=parseInt(w.paddingTop,10),C=f.offsetHeight;let B;B=b?f.offsetTop+C:f.offsetTop+E,this.nodes.wrapper.style.top=`${Math.floor(B)}px`,1===this.Editor.BlockManager.blocks.length&&g.isEmpty?this.blockTunesToggler.hide():this.blockTunesToggler.show(),this.open()}close(){this.Editor.ReadOnly.isEnabled||(this.nodes.wrapper.classList.remove(this.CSS.toolbarOpened),this.blockActions.hide(),this.toolboxInstance.close(),this.Editor.BlockSettings.close())}
/**
   * Open Toolbar with Plus Button and Actions
   *
   * @param {boolean} withBlockActions - by default, Toolbar opens with Block Actions.
   *                                     This flag allows to open Toolbar without Actions.
   */open(g=!0){oe((()=>{this.nodes.wrapper.classList.add(this.CSS.toolbarOpened),g?this.blockActions.show():this.blockActions.hide()}),50)()}make(){this.nodes.wrapper=d.make("div",this.CSS.toolbar),["content","actions"].forEach((g=>{this.nodes[g]=d.make("div",this.CSS[g])})),d.append(this.nodes.wrapper,this.nodes.content),d.append(this.nodes.content,this.nodes.actions),this.nodes.plusButton=d.make("div",this.CSS.plusButton,{innerHTML:Oe}),d.append(this.nodes.actions,this.nodes.plusButton),this.readOnlyMutableListeners.on(this.nodes.plusButton,"click",(()=>{this.tooltip.hide(!0),this.plusButtonClicked()}),!1);const g=d.make("div");g.appendChild(document.createTextNode(H.ui(fe.ui.toolbar.toolbox,"Add"))),g.appendChild(d.make("div",this.CSS.plusButtonShortcut,{textContent:"⇥ Tab"})),this.tooltip.onHover(this.nodes.plusButton,g,{hidingDelay:400}),this.nodes.settingsToggler=d.make("span",this.CSS.settingsToggler,{innerHTML:Ae}),d.append(this.nodes.actions,this.nodes.settingsToggler),this.tooltip.onHover(this.nodes.settingsToggler,H.ui(fe.ui.blockTunes.toggler,"Click to tune"),{hidingDelay:400}),d.append(this.nodes.actions,this.makeToolbox()),d.append(this.nodes.actions,this.Editor.BlockSettings.getElement()),d.append(this.Editor.UI.nodes.wrapper,this.nodes.wrapper)}makeToolbox(){return this.toolboxInstance=new kt({api:this.Editor.API.methods,tools:this.Editor.Tools.blockTools,i18nLabels:{filter:H.ui(fe.ui.popover,"Filter"),nothingFound:H.ui(fe.ui.popover,"Nothing found")}}),this.toolboxInstance.on(mt.Opened,(()=>{this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier)})),this.toolboxInstance.on(mt.Closed,(()=>{this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier)})),this.toolboxInstance.on(mt.BlockAdded,(({block:g})=>{const{BlockManager:f,Caret:b}=this.Editor,v=f.getBlockById(g.id);0===v.inputs.length&&(v===f.lastBlock?(f.insertAtEnd(),b.setToBlock(f.lastBlock)):b.setToBlock(f.nextBlock))})),this.toolboxInstance.make()}plusButtonClicked(){this.Editor.BlockManager.currentBlock=this.hoveredBlock,this.toolboxInstance.toggle()}enableModuleBindings(){this.readOnlyMutableListeners.on(this.nodes.settingsToggler,"mousedown",(g=>{g.stopPropagation(),this.settingsTogglerClicked(),this.toolboxInstance.opened&&this.toolboxInstance.close(),this.tooltip.hide(!0)}),!0),ee()||this.eventsDispatcher.on(vt,(g=>{this.Editor.BlockSettings.opened||this.toolboxInstance.opened||this.moveAndOpen(g.block)}))}disableModuleBindings(){this.readOnlyMutableListeners.clearAll()}settingsTogglerClicked(){this.Editor.BlockManager.currentBlock=this.hoveredBlock,this.Editor.BlockSettings.opened?this.Editor.BlockSettings.close():this.Editor.BlockSettings.open(this.hoveredBlock)}drawUI(){this.Editor.BlockSettings.make(),this.make()}destroy(){this.removeAllNodes(),this.toolboxInstance&&this.toolboxInstance.destroy(),this.tooltip.destroy()}}var xt=(g=>(g[g.Block=0]="Block",g[g.Inline=1]="Inline",g[g.Tune=2]="Tune",g))(xt||{}),wt=(g=>(g.Shortcut="shortcut",g.Toolbox="toolbox",g.EnabledInlineTools="inlineToolbar",g.EnabledBlockTunes="tunes",g.Config="config",g))(wt||{}),It=(g=>(g.Shortcut="shortcut",g.SanitizeConfig="sanitize",g))(It||{}),_t=(g=>(g.IsEnabledLineBreaks="enableLineBreaks",g.Toolbox="toolbox",g.ConversionConfig="conversionConfig",g.IsReadOnlySupported="isReadOnlySupported",g.PasteConfig="pasteConfig",g))(_t||{}),Mt=(g=>(g.IsInline="isInline",g.Title="title",g))(Mt||{}),Lt=(g=>(g.IsTune="isTune",g))(Lt||{});class Ue{
/**
   * @class
   * @param {ConstructorOptions} options - Constructor options
   */
constructor({name:g,constructable:f,config:b,api:v,isDefault:w,isInternal:E=!1,defaultPlaceholder:C}){this.api=v,this.name=g,this.constructable=f,this.config=b,this.isDefault=w,this.isInternal=E,this.defaultPlaceholder=C}get settings(){const g=this.config.config||{};return this.isDefault&&!("placeholder"in g)&&this.defaultPlaceholder&&(g.placeholder=this.defaultPlaceholder),g}reset(){if(D(this.constructable.reset))return this.constructable.reset()}prepare(){if(D(this.constructable.prepare))return this.constructable.prepare({toolName:this.name,config:this.settings})}get shortcut(){const g=this.constructable.shortcut;return this.config.shortcut||g}get sanitizeConfig(){return this.constructable.sanitize||{}}isInline(){return 1===this.type}isBlock(){return 0===this.type}isTune(){return 2===this.type}}class Uo extends S{
/**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
constructor({config:g,eventsDispatcher:f}){super({config:g,eventsDispatcher:f}),this.CSS={inlineToolbar:"ce-inline-toolbar",inlineToolbarShowed:"ce-inline-toolbar--showed",inlineToolbarLeftOriented:"ce-inline-toolbar--left-oriented",inlineToolbarRightOriented:"ce-inline-toolbar--right-oriented",inlineToolbarShortcut:"ce-inline-toolbar__shortcut",buttonsWrapper:"ce-inline-toolbar__buttons",actionsWrapper:"ce-inline-toolbar__actions",inlineToolButton:"ce-inline-tool",inputField:"cdx-input",focusedButton:"ce-inline-tool--focused",conversionToggler:"ce-inline-toolbar__dropdown",conversionTogglerArrow:"ce-inline-toolbar__dropdown-arrow",conversionTogglerHidden:"ce-inline-toolbar__dropdown--hidden",conversionTogglerContent:"ce-inline-toolbar__dropdown-content",togglerAndButtonsWrapper:"ce-inline-toolbar__toggler-and-button-wrapper"},this.opened=!1,this.toolbarVerticalMargin=ee()?20:6,this.buttonsList=null,this.width=0,this.flipper=null,this.tooltip=new Fe
/**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */}toggleReadOnly(g){g?(this.destroy(),this.Editor.ConversionToolbar.destroy()):this.make()}
/**
   * Shows Inline Toolbar if something is selected
   *
   * @param [needToClose] - pass true to close toolbar if it is not allowed.
   *                                  Avoid to use it just for closing IT, better call .close() clearly.
   * @param [needToShowConversionToolbar] - pass false to not to show Conversion Toolbar
   */tryToShow(g=!1,f=!0){this.allowedToShow()?(this.move(),this.open(f),this.Editor.Toolbar.close()):g&&this.close()}move(){const g=m.rect,f=this.Editor.UI.nodes.wrapper.getBoundingClientRect(),b={x:g.x-f.left,y:g.y+g.height-f.top+this.toolbarVerticalMargin};g.width&&(b.x+=Math.floor(g.width/2));const v=b.x-this.width/2,w=b.x+this.width/2;this.nodes.wrapper.classList.toggle(this.CSS.inlineToolbarLeftOriented,v<this.Editor.UI.contentRect.left),this.nodes.wrapper.classList.toggle(this.CSS.inlineToolbarRightOriented,w>this.Editor.UI.contentRect.right),this.nodes.wrapper.style.left=Math.floor(b.x)+"px",this.nodes.wrapper.style.top=Math.floor(b.y)+"px"}close(){this.opened&&(this.Editor.ReadOnly.isEnabled||(this.nodes.wrapper.classList.remove(this.CSS.inlineToolbarShowed),Array.from(this.toolsInstances.entries()).forEach((([g,f])=>{const b=this.getToolShortcut(g);b&&dt.remove(this.Editor.UI.nodes.redactor,b),D(f.clear)&&f.clear()})),this.opened=!1,this.flipper.deactivate(),this.Editor.ConversionToolbar.close()))}
/**
   * Shows Inline Toolbar
   *
   * @param [needToShowConversionToolbar] - pass false to not to show Conversion Toolbar
   */open(g=!0){if(this.opened)return;this.addToolsFiltered(),this.nodes.wrapper.classList.add(this.CSS.inlineToolbarShowed),this.buttonsList=this.nodes.buttons.querySelectorAll(`.${this.CSS.inlineToolButton}`),this.opened=!0,g&&this.Editor.ConversionToolbar.hasTools()?this.setConversionTogglerContent():this.nodes.conversionToggler.hidden=!0;let f=Array.from(this.buttonsList);f.unshift(this.nodes.conversionToggler),f=f.filter((g=>!g.hidden)),this.flipper.activate(f)
/**
   * Check if node is contained by Inline Toolbar
   *
   * @param {Node} node — node to check
   */}containsNode(g){return this.nodes.wrapper.contains(g)}destroy(){this.flipper&&(this.flipper.deactivate(),this.flipper=null),this.removeAllNodes(),this.tooltip.destroy()}make(){this.nodes.wrapper=d.make("div",[this.CSS.inlineToolbar,...this.isRtl?[this.Editor.UI.CSS.editorRtlFix]:[]]),this.nodes.togglerAndButtonsWrapper=d.make("div",this.CSS.togglerAndButtonsWrapper),this.nodes.buttons=d.make("div",this.CSS.buttonsWrapper),this.nodes.actions=d.make("div",this.CSS.actionsWrapper),this.listeners.on(this.nodes.wrapper,"mousedown",(g=>{g.target.closest(`.${this.CSS.actionsWrapper}`)||g.preventDefault()})),d.append(this.nodes.wrapper,[this.nodes.togglerAndButtonsWrapper,this.nodes.actions]),d.append(this.Editor.UI.nodes.wrapper,this.nodes.wrapper),this.addConversionToggler(),d.append(this.nodes.togglerAndButtonsWrapper,this.nodes.buttons),this.prepareConversionToolbar(),this.recalculateWidth(),this.enableFlipper()}allowedToShow(){const g=["IMG","INPUT"],f=m.get(),b=m.text;if(!f||!f.anchorNode||f.isCollapsed||b.length<1)return!1;const v=d.isElement(f.anchorNode)?f.anchorNode:f.anchorNode.parentElement;if(f&&g.includes(v.tagName)||null===v.closest('[contenteditable="true"]'))return!1;const w=this.Editor.BlockManager.getBlock(f.anchorNode);return!!w&&0!==w.tool.inlineTools.size}recalculateWidth(){this.width=this.nodes.wrapper.offsetWidth}addConversionToggler(){this.nodes.conversionToggler=d.make("div",this.CSS.conversionToggler),this.nodes.conversionTogglerContent=d.make("div",this.CSS.conversionTogglerContent);const g=d.make("div",this.CSS.conversionTogglerArrow,{innerHTML:be});this.nodes.conversionToggler.appendChild(this.nodes.conversionTogglerContent),this.nodes.conversionToggler.appendChild(g),this.nodes.togglerAndButtonsWrapper.appendChild(this.nodes.conversionToggler),this.listeners.on(this.nodes.conversionToggler,"click",(()=>{this.Editor.ConversionToolbar.toggle((g=>{!g&&this.opened?this.flipper.activate():this.opened&&this.flipper.deactivate()}))})),!1===ee()&&this.tooltip.onHover(this.nodes.conversionToggler,H.ui(fe.ui.inlineToolbar.converter,"Convert to"),{placement:"top",hidingDelay:100})}async setConversionTogglerContent(){const{BlockManager:g}=this.Editor,{currentBlock:f}=g,b=f.name,v=f.tool.conversionConfig,w=v&&v.export;this.nodes.conversionToggler.hidden=!w,this.nodes.conversionToggler.classList.toggle(this.CSS.conversionTogglerHidden,!w);const E=await f.getActiveToolboxEntry()||{};this.nodes.conversionTogglerContent.innerHTML=E.icon||E.title||ke(b)}prepareConversionToolbar(){const g=this.Editor.ConversionToolbar.make();d.append(this.nodes.wrapper,g)}addToolsFiltered(){const g=m.get(),f=this.Editor.BlockManager.getBlock(g.anchorNode);this.nodes.buttons.innerHTML="",this.nodes.actions.innerHTML="",this.toolsInstances=new Map,Array.from(f.tool.inlineTools.values()).forEach((g=>{this.addTool(g)})),this.recalculateWidth()
/**
   * Add tool button and activate clicks
   *
   * @param {InlineTool} tool - InlineTool object
   */}addTool(g){const f=g.create(),b=f.render();if(!b){v("Render method must return an instance of Node","warn",g.name);return}if(b.dataset.tool=g.name,this.nodes.buttons.appendChild(b),this.toolsInstances.set(g.name,f),D(f.renderActions)){const g=f.renderActions();this.nodes.actions.appendChild(g)}this.listeners.on(b,"click",(g=>{this.toolClicked(f),g.preventDefault()}));const w=this.getToolShortcut(g.name);if(w)try{this.enableShortcuts(f,w)}catch{}const E=d.make("div"),C=H.t(fe.toolNames,g.title||ke(g.name));E.appendChild(d.text(C)),w&&E.appendChild(d.make("div",this.CSS.inlineToolbarShortcut,{textContent:nt(w)})),!1===ee()&&this.tooltip.onHover(b,E,{placement:"top",hidingDelay:100}),f.checkState(m.get())
/**
   * Get shortcut name for tool
   *
   * @param toolName — Tool name
   */}getToolShortcut(g){const{Tools:f}=this.Editor,b=f.inlineTools.get(g),v=f.internal.inlineTools;return Array.from(v.keys()).includes(g)?this.inlineTools[g][It.Shortcut]:b.shortcut}
/**
   * Enable Tool shortcut with Editor Shortcuts Module
   *
   * @param {InlineTool} tool - Tool instance
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */enableShortcuts(g,f){dt.add({name:f,handler:f=>{const{currentBlock:b}=this.Editor.BlockManager;b&&b.tool.enabledInlineTools&&(f.preventDefault(),this.toolClicked(g))},on:this.Editor.UI.nodes.redactor})}
/**
   * Inline Tool button clicks
   *
   * @param {InlineTool} tool - Tool's instance
   */toolClicked(g){const f=m.range;g.surround(f),this.checkToolsState(),void 0!==g.renderActions&&this.flipper.deactivate()}checkToolsState(){this.toolsInstances.forEach((g=>{g.checkState(m.get())}))}get inlineTools(){const g={};return Array.from(this.Editor.Tools.inlineTools.entries()).forEach((([f,b])=>{g[f]=b.create()})),g}enableFlipper(){this.flipper=new G({focusedItemClass:this.CSS.focusedButton,allowedKeys:[f.ENTER,f.TAB]})}}class $o extends S{
/**
   * All keydowns on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
keydown(g){switch(this.beforeKeydownProcessing(g),g.keyCode){case f.BACKSPACE:this.backspace(g);break;case f.ENTER:this.enter(g);break;case f.DOWN:case f.RIGHT:this.arrowRightAndDown(g);break;case f.UP:case f.LEFT:this.arrowLeftAndUp(g);break;case f.TAB:this.tabPressed(g);break}}
/**
   * Fires on keydown before event processing
   *
   * @param {KeyboardEvent} event - keydown
   */beforeKeydownProcessing(g){this.needToolbarClosing(g)&&tt(g.keyCode)&&(this.Editor.Toolbar.close(),this.Editor.ConversionToolbar.close(),g.ctrlKey||g.metaKey||g.altKey||g.shiftKey||(this.Editor.BlockManager.clearFocused(),this.Editor.BlockSelection.clearSelection(g)))}
/**
   * Key up on Block:
   * - shows Inline Toolbar if something selected
   * - shows conversion toolbar with 85% of block selection
   *
   * @param {KeyboardEvent} event - keyup event
   */keyup(g){g.shiftKey||this.Editor.UI.checkEmptiness()}
/**
   * Open Toolbox to leaf Tools
   *
   * @param {KeyboardEvent} event - tab keydown event
   */tabPressed(g){this.Editor.BlockSelection.clearSelection(g);const{BlockManager:f,InlineToolbar:b,ConversionToolbar:v}=this.Editor,w=f.currentBlock;if(!w)return;const E=w.isEmpty,C=w.tool.isDefault&&E,B=!E&&v.opened,T=!E&&!m.isCollapsed&&b.opened;C?this.activateToolbox():!B&&!T&&this.activateBlockSettings()}
/**
   * Add drop target styles
   *
   * @param {DragEvent} event - drag over event
   */dragOver(g){const f=this.Editor.BlockManager.getBlockByChildNode(g.target);f.dropTarget=!0}
/**
   * Remove drop target style
   *
   * @param {DragEvent} event - drag leave event
   */dragLeave(g){const f=this.Editor.BlockManager.getBlockByChildNode(g.target);f.dropTarget=!1}
/**
   * Copying selected blocks
   * Before putting to the clipboard we sanitize all blocks and then copy to the clipboard
   *
   * @param {ClipboardEvent} event - clipboard event
   */handleCommandC(g){const{BlockSelection:f}=this.Editor;f.anyBlockSelected&&f.copySelectedBlocks(g)}
/**
   * Copy and Delete selected Blocks
   *
   * @param {ClipboardEvent} event - clipboard event
   */handleCommandX(g){const{BlockSelection:f,BlockManager:b,Caret:v}=this.Editor;f.anyBlockSelected&&f.copySelectedBlocks(g).then((()=>{const w=b.removeSelectedBlocks(),E=b.insertDefaultBlockAtIndex(w,!0);v.setToBlock(E,v.positions.START),f.clearSelection(g)}))}
/**
   * ENTER pressed on block
   *
   * @param {KeyboardEvent} event - keydown
   */enter(g){const{BlockManager:f,UI:b}=this.Editor;if(f.currentBlock.tool.isLineBreaksEnabled||b.someToolbarOpened&&b.someFlipperButtonFocused||g.shiftKey)return;let v=this.Editor.BlockManager.currentBlock;this.Editor.Caret.isAtStart&&!this.Editor.BlockManager.currentBlock.hasMedia?this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex):v=this.Editor.Caret.isAtEnd?this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex+1):this.Editor.BlockManager.split(),this.Editor.Caret.setToBlock(v),this.Editor.Toolbar.moveAndOpen(v),g.preventDefault()
/**
   * Handle backspace keydown on Block
   *
   * @param {KeyboardEvent} event - keydown
   */}backspace(g){const{BlockManager:f,BlockSelection:b,Caret:v}=this.Editor,w=f.currentBlock,E=w.tool;if(w.selected||w.isEmpty&&w.currentInput===w.firstInput){g.preventDefault();const w=f.currentBlockIndex;f.previousBlock&&0===f.previousBlock.inputs.length?f.removeBlock(w-1):f.removeBlock(),v.setToBlock(f.currentBlock,w?v.positions.END:v.positions.START),this.Editor.Toolbar.close(),b.clearSelection(g);return}if(E.isLineBreaksEnabled&&!v.isAtStart)return;const C=0===f.currentBlockIndex;v.isAtStart&&m.isCollapsed&&w.currentInput===w.firstInput&&!C&&(g.preventDefault(),this.mergeBlocks())}mergeBlocks(){const{BlockManager:g,Caret:f,Toolbar:b}=this.Editor,v=g.previousBlock,w=g.currentBlock;if(w.name===v.name&&v.mergeable)f.createShadow(v.pluginsContent),g.mergeBlocks(v,w).then((()=>{f.restoreCaret(v.pluginsContent),v.pluginsContent.normalize(),b.close()}))
/**
   * Handle right and down keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */;else{if(0===v.inputs.length||v.isEmpty){g.removeBlock(g.currentBlockIndex-1),f.setToBlock(g.currentBlock),b.close();return}f.navigatePrevious()&&b.close()}}arrowRightAndDown(g){const b=G.usedKeys.includes(g.keyCode)&&(!g.shiftKey||g.keyCode===f.TAB);if(this.Editor.UI.someToolbarOpened&&b)return;this.Editor.BlockManager.clearFocused(),this.Editor.Toolbar.close();const v=this.Editor.Caret.isAtEnd||this.Editor.BlockSelection.anyBlockSelected;g.shiftKey&&g.keyCode===f.DOWN&&v?this.Editor.CrossBlockSelection.toggleBlockSelectedState():((g.keyCode===f.DOWN||g.keyCode===f.RIGHT&&!this.isRtl?this.Editor.Caret.navigateNext():this.Editor.Caret.navigatePrevious())?g.preventDefault():oe((()=>{this.Editor.BlockManager.currentBlock&&this.Editor.BlockManager.currentBlock.updateCurrentInput()}),20)(),this.Editor.BlockSelection.clearSelection(g)
/**
   * Handle left and up keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */)}arrowLeftAndUp(g){if(this.Editor.UI.someToolbarOpened){if(G.usedKeys.includes(g.keyCode)&&(!g.shiftKey||g.keyCode===f.TAB))return;this.Editor.UI.closeAllToolbars()}this.Editor.BlockManager.clearFocused(),this.Editor.Toolbar.close();const b=this.Editor.Caret.isAtStart||this.Editor.BlockSelection.anyBlockSelected;g.shiftKey&&g.keyCode===f.UP&&b?this.Editor.CrossBlockSelection.toggleBlockSelectedState(!1):((g.keyCode===f.UP||g.keyCode===f.LEFT&&!this.isRtl?this.Editor.Caret.navigatePrevious():this.Editor.Caret.navigateNext())?g.preventDefault():oe((()=>{this.Editor.BlockManager.currentBlock&&this.Editor.BlockManager.currentBlock.updateCurrentInput()}),20)(),this.Editor.BlockSelection.clearSelection(g)
/**
   * Cases when we need to close Toolbar
   *
   * @param {KeyboardEvent} event - keyboard event
   */)}needToolbarClosing(g){const b=g.keyCode===f.ENTER&&this.Editor.Toolbar.toolbox.opened,v=g.keyCode===f.ENTER&&this.Editor.BlockSettings.opened,w=g.keyCode===f.ENTER&&this.Editor.InlineToolbar.opened,E=g.keyCode===f.ENTER&&this.Editor.ConversionToolbar.opened,C=g.keyCode===f.TAB;return!(g.shiftKey||C||b||v||w||E)}activateToolbox(){this.Editor.Toolbar.opened||this.Editor.Toolbar.moveAndOpen(),this.Editor.Toolbar.toolbox.open()}activateBlockSettings(){this.Editor.Toolbar.opened||(this.Editor.BlockManager.currentBlock.focused=!0,this.Editor.Toolbar.moveAndOpen()),this.Editor.BlockSettings.opened||this.Editor.BlockSettings.open()}}class Ce{
/**
   * @class
   * @param {HTMLElement} workingArea — editor`s working node
   */
constructor(g){this.blocks=[],this.workingArea=g
/**
   * Get length of Block instances array
   *
   * @returns {number}
   */}get length(){return this.blocks.length}
/**
   * Get Block instances array
   *
   * @returns {Block[]}
   */get array(){return this.blocks}
/**
   * Get blocks html elements array
   *
   * @returns {HTMLElement[]}
   */get nodes(){return it(this.workingArea.children)}
/**
   * Proxy trap to implement array-like setter
   *
   * @example
   * blocks[0] = new Block(...)
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — block index or any Blocks class property key to set
   * @param {Block} value — value to set
   * @returns {boolean}
   */static set(g,f,b){return isNaN(Number(f))?(Reflect.set(g,f,b),!0):(g.insert(+f,b),!0)}
/**
   * Proxy trap to implement array-like getter
   *
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — Blocks class property key
   * @returns {Block|*}
   */static get(g,f){return isNaN(Number(f))?Reflect.get(g,f):g.get(+f)}
/**
   * Push new Block to the blocks array and append it to working area
   *
   * @param {Block} block - Block to add
   */push(g){this.blocks.push(g),this.insertToDOM(g)
/**
   * Swaps blocks with indexes first and second
   *
   * @param {number} first - first block index
   * @param {number} second - second block index
   * @deprecated — use 'move' instead
   */}swap(g,f){const b=this.blocks[f];d.swap(this.blocks[g].holder,b.holder),this.blocks[f]=this.blocks[g],this.blocks[g]=b
/**
   * Move a block from one to another index
   *
   * @param {number} toIndex - new index of the block
   * @param {number} fromIndex - block to move
   */}move(g,f){const b=this.blocks.splice(f,1)[0],v=g-1,w=Math.max(0,v),E=this.blocks[w];g>0?this.insertToDOM(b,"afterend",E):this.insertToDOM(b,"beforebegin",E),this.blocks.splice(g,0,b);const C=this.composeBlockEvent("move",{fromIndex:f,toIndex:g});b.call(X.MOVED,C)}
/**
   * Insert new Block at passed index
   *
   * @param {number} index — index to insert Block
   * @param {Block} block — Block to insert
   * @param {boolean} replace — it true, replace block on given index
   */insert(g,f,b=!1){if(!this.length){this.push(f);return}g>this.length&&(g=this.length),b&&(this.blocks[g].holder.remove(),this.blocks[g].call(X.REMOVED));const v=b?1:0;if(this.blocks.splice(g,v,f),g>0){const b=this.blocks[g-1];this.insertToDOM(f,"afterend",b)}else{const b=this.blocks[g+1];b?this.insertToDOM(f,"beforebegin",b):this.insertToDOM(f)}}
/**
   * Remove block
   *
   * @param {number} index - index of Block to remove
   */remove(g){isNaN(g)&&(g=this.length-1),this.blocks[g].holder.remove(),this.blocks[g].call(X.REMOVED),this.blocks.splice(g,1)}removeAll(){this.workingArea.innerHTML="",this.blocks.forEach((g=>g.call(X.REMOVED))),this.blocks.length=0
/**
   * Insert Block after passed target
   *
   * @todo decide if this method is necessary
   * @param {Block} targetBlock — target after which Block should be inserted
   * @param {Block} newBlock — Block to insert
   */}insertAfter(g,f){const b=this.blocks.indexOf(g);this.insert(b+1,f)}
/**
   * Get Block by index
   *
   * @param {number} index — Block index
   * @returns {Block}
   */get(g){return this.blocks[g]}
/**
   * Return index of passed Block
   *
   * @param {Block} block - Block to find
   * @returns {number}
   */indexOf(g){return this.blocks.indexOf(g)}
/**
   * Insert new Block into DOM
   *
   * @param {Block} block - Block to insert
   * @param {InsertPosition} position — insert position (if set, will use insertAdjacentElement)
   * @param {Block} target — Block related to position
   */insertToDOM(g,f,b){f?b.holder.insertAdjacentElement(f,g.holder):this.workingArea.appendChild(g.holder),g.call(X.RENDERED)
/**
   * Composes Block event with passed type and details
   *
   * @param {string} type - event type
   * @param {object} detail - event detail
   */}composeBlockEvent(g,f){return new CustomEvent(g,{detail:f})}}const Yt="block-removed",Wt="block-added",Kt="block-moved",Xt="block-changed";class Ko extends S{constructor(){super(...arguments),this._currentBlockIndex=-1,this._blocks=null
/**
   * Returns current Block index
   *
   * @returns {number}
   */}get currentBlockIndex(){return this._currentBlockIndex}
/**
   * Set current Block index and fire Block lifecycle callbacks
   *
   * @param {number} newIndex - index of Block to set as current
   */set currentBlockIndex(g){this._currentBlockIndex=g}
/**
   * returns first Block
   *
   * @returns {Block}
   */get firstBlock(){return this._blocks[0]}
/**
   * returns last Block
   *
   * @returns {Block}
   */get lastBlock(){return this._blocks[this._blocks.length-1]}
/**
   * Get current Block instance
   *
   * @returns {Block}
   */get currentBlock(){return this._blocks[this.currentBlockIndex]}
/**
   * Set passed Block as a current
   *
   * @param block - block to set as a current
   */set currentBlock(g){this.currentBlockIndex=this.getBlockIndex(g)}
/**
   * Returns next Block instance
   *
   * @returns {Block|null}
   */get nextBlock(){return this.currentBlockIndex===this._blocks.length-1?null:this._blocks[this.currentBlockIndex+1]}
/**
   * Return first Block with inputs after current Block
   *
   * @returns {Block | undefined}
   */get nextContentfulBlock(){return this.blocks.slice(this.currentBlockIndex+1).find((g=>!!g.inputs.length))}
/**
   * Return first Block with inputs before current Block
   *
   * @returns {Block | undefined}
   */get previousContentfulBlock(){return this.blocks.slice(0,this.currentBlockIndex).reverse().find((g=>!!g.inputs.length))}
/**
   * Returns previous Block instance
   *
   * @returns {Block|null}
   */get previousBlock(){return 0===this.currentBlockIndex?null:this._blocks[this.currentBlockIndex-1]}
/**
   * Get array of Block instances
   *
   * @returns {Block[]} {@link Blocks#array}
   */get blocks(){return this._blocks.array}
/**
   * Check if each Block is empty
   *
   * @returns {boolean}
   */get isEditorEmpty(){return this.blocks.every((g=>g.isEmpty))}prepare(){const g=new Ce(this.Editor.UI.nodes.redactor);this._blocks=new Proxy(g,{set:Ce.set,get:Ce.get}),this.listeners.on(document,"copy",(g=>this.Editor.BlockEvents.handleCommandC(g)))
/**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - Unbind event handlers from created Blocks
   *
   * if readOnly is false:
   *  - Bind event handlers to all existing Blocks
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */}toggleReadOnly(g){g?this.disableModuleBindings():this.enableModuleBindings()}
/**
   * Creates Block instance by tool name
   *
   * @param {object} options - block creation options
   * @param {string} options.tool - tools passed in editor config {@link EditorConfig#tools}
   * @param {string} [options.id] - unique id for this block
   * @param {BlockToolData} [options.data] - constructor params
   * @returns {Block}
   */composeBlock({tool:g,data:f={},id:b,tunes:v={}}){const w=this.Editor.ReadOnly.isEnabled,E=this.Editor.Tools.blockTools.get(g),C=new F({id:b,data:f,tool:E,api:this.Editor.API,readOnly:w,tunesData:v},this.eventsDispatcher);return w||this.bindBlockEvents(C),C
/**
   * Insert new block into _blocks
   *
   * @param {object} options - insert options
   * @param {string} [options.id] - block's unique id
   * @param {string} [options.tool] - plugin name, by default method inserts the default block type
   * @param {object} [options.data] - plugin data
   * @param {number} [options.index] - index where to insert new Block
   * @param {boolean} [options.needToFocus] - flag shows if needed to update current Block index
   * @param {boolean} [options.replace] - flag shows if block by passed index should be replaced with inserted one
   * @returns {Block}
   */}insert({id:g,tool:f=this.config.defaultBlock,data:b={},index:v,needToFocus:w=!0,replace:E=!1,tunes:C={}}={}){let B=v;void 0===B&&(B=this.currentBlockIndex+(E?0:1));const T=this.composeBlock({id:g,tool:f,data:b,tunes:C});return E&&this.blockDidMutated(Yt,this.getBlockByIndex(B),{index:B}),this._blocks.insert(B,T,E),this.blockDidMutated(Wt,T,{index:B}),w?this.currentBlockIndex=B:B<=this.currentBlockIndex&&this.currentBlockIndex++,T
/**
   * Replace current working block
   *
   * @param {object} options - replace options
   * @param {string} options.tool — plugin name
   * @param {BlockToolData} options.data — plugin data
   * @returns {Block}
   */}replace({tool:g=this.config.defaultBlock,data:f={}}){return this.insert({tool:g,data:f,index:this.currentBlockIndex,replace:!0})}
/**
   * Insert pasted content. Call onPaste callback after insert.
   *
   * @param {string} toolName - name of Tool to insert
   * @param {PasteEvent} pasteEvent - pasted data
   * @param {boolean} replace - should replace current block
   */paste(g,f,b=!1){const w=this.insert({tool:g,replace:b});try{w.call(X.ON_PASTE,f)}catch(f){v(`${g}: onPaste callback call is failed`,"error",f)}return w}
/**
   * Insert new default block at passed index
   *
   * @param {number} index - index where Block should be inserted
   * @param {boolean} needToFocus - if true, updates current Block index
   *
   * TODO: Remove method and use insert() with index instead (?)
   * @returns {Block} inserted Block
   */insertDefaultBlockAtIndex(g,f=!1){const b=this.composeBlock({tool:this.config.defaultBlock});return this._blocks[g]=b,this.blockDidMutated(Wt,b,{index:g}),f?this.currentBlockIndex=g:g<=this.currentBlockIndex&&this.currentBlockIndex++,b
/**
   * Always inserts at the end
   *
   * @returns {Block}
   */}insertAtEnd(){return this.currentBlockIndex=this.blocks.length-1,this.insert()
/**
   * Merge two blocks
   *
   * @param {Block} targetBlock - previous block will be append to this block
   * @param {Block} blockToMerge - block that will be merged with target block
   * @returns {Promise} - the sequence that can be continued
   */}async mergeBlocks(g,f){const b=this._blocks.indexOf(f);if(f.isEmpty)return;const v=await f.data;V(v)||await g.mergeWith(v),this.removeBlock(b),this.currentBlockIndex=this._blocks.indexOf(g)
/**
   * Remove block with passed index or remove last
   *
   * @param {number|null} index - index of Block to remove
   * @throws {Error} if Block to remove is not found
   */}removeBlock(g=this.currentBlockIndex){if(!this.validateIndex(g))throw new Error("Can't find a Block to remove");const f=this._blocks[g];f.destroy(),this._blocks.remove(g),this.blockDidMutated(Yt,f,{index:g}),this.currentBlockIndex>=g&&this.currentBlockIndex--,this.blocks.length?0===g&&(this.currentBlockIndex=0):(this.currentBlockIndex=-1,this.insert())
/**
   * Remove only selected Blocks
   * and returns first Block index where started removing...
   *
   * @returns {number|undefined}
   */}removeSelectedBlocks(){let g;for(let f=this.blocks.length-1;f>=0;f--)this.blocks[f].selected&&(this.removeBlock(f),g=f);return g}removeAllBlocks(){for(let g=this.blocks.length-1;g>=0;g--)this._blocks.remove(g);this.currentBlockIndex=-1,this.insert(),this.currentBlock.firstInput.focus()
/**
   * Split current Block
   * 1. Extract content from Caret position to the Block`s end
   * 2. Insert a new Block below current one with extracted content
   *
   * @returns {Block}
   */}split(){const g=this.Editor.Caret.extractFragmentFromCaretPosition(),f=d.make("div");f.appendChild(g);const b={text:d.isEmpty(f)?"":f.innerHTML};return this.insert({data:b})}
/**
   * Returns Block by passed index
   *
   * @param {number} index - index to get. -1 to get last
   * @returns {Block}
   */getBlockByIndex(g){return-1===g&&(g=this._blocks.length-1),this._blocks[g]
/**
   * Returns an index for passed Block
   *
   * @param block - block to find index
   */}getBlockIndex(g){return this._blocks.indexOf(g)}
/**
   * Returns the Block by passed id
   *
   * @param id - id of block to get
   * @returns {Block}
   */getBlockById(g){return this._blocks.array.find((f=>f.id===g))}
/**
   * Get Block instance by html element
   *
   * @param {Node} element - html element to get Block by
   */getBlock(g){d.isElement(g)||(g=g.parentNode);const f=this._blocks.nodes,b=g.closest(`.${F.CSS.wrapper}`),v=f.indexOf(b);if(v>=0)return this._blocks[v]}highlightCurrentNode(){this.clearFocused(),this.currentBlock.focused=!0}clearFocused(){this.blocks.forEach((g=>{g.focused=!1}))}
/**
   * 1) Find first-level Block from passed child Node
   * 2) Mark it as current
   *
   * @param {Node} childNode - look ahead from this node.
   * @returns {Block | undefined} can return undefined in case when the passed child note is not a part of the current editor instance
   */setCurrentBlockByChildNode(g){d.isElement(g)||(g=g.parentNode);const f=g.closest(`.${F.CSS.wrapper}`);if(!f)return;const b=f.closest(`.${this.Editor.UI.CSS.editorWrapper}`);return null!=b&&b.isEqualNode(this.Editor.UI.nodes.wrapper)?(this.currentBlockIndex=this._blocks.nodes.indexOf(f),this.currentBlock.updateCurrentInput(),this.currentBlock
/**
   * Return block which contents passed node
   *
   * @param {Node} childNode - node to get Block by
   * @returns {Block}
   */):void 0}getBlockByChildNode(g){d.isElement(g)||(g=g.parentNode);const f=g.closest(`.${F.CSS.wrapper}`);return this.blocks.find((g=>g.holder===f))}
/**
   * Swap Blocks Position
   *
   * @param {number} fromIndex - index of first block
   * @param {number} toIndex - index of second block
   * @deprecated — use 'move' instead
   */swap(g,f){this._blocks.swap(g,f),this.currentBlockIndex=f
/**
   * Move a block to a new index
   *
   * @param {number} toIndex - index where to move Block
   * @param {number} fromIndex - index of Block to move
   */}move(g,f=this.currentBlockIndex){isNaN(g)||isNaN(f)?v("Warning during 'move' call: incorrect indices provided.","warn"):this.validateIndex(g)&&this.validateIndex(f)?(this._blocks.move(g,f),this.currentBlockIndex=g,this.blockDidMutated(Kt,this.currentBlock,{fromIndex:f,toIndex:g})):v("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.","warn")}dropPointer(){this.currentBlockIndex=-1,this.clearFocused()
/**
   * Clears Editor
   *
   * @param {boolean} needToAddDefaultBlock - 1) in internal calls (for example, in api.blocks.render)
   *                                             we don't need to add an empty default block
   *                                        2) in api.blocks.clear we should add empty block
   */}clear(g=!1){this._blocks.removeAll(),this.dropPointer(),g&&this.insert(),this.Editor.UI.checkEmptiness()}async destroy(){await Promise.all(this.blocks.map((g=>g.destroy())))}
/**
   * Bind Block events
   *
   * @param {Block} block - Block to which event should be bound
   */bindBlockEvents(g){const{BlockEvents:f}=this.Editor;this.readOnlyMutableListeners.on(g.holder,"keydown",(g=>{f.keydown(g)})),this.readOnlyMutableListeners.on(g.holder,"keyup",(g=>{f.keyup(g)})),this.readOnlyMutableListeners.on(g.holder,"dragover",(g=>{f.dragOver(g)})),this.readOnlyMutableListeners.on(g.holder,"dragleave",(g=>{f.dragLeave(g)})),g.on("didMutated",(g=>this.blockDidMutated(Xt,g,{index:this.getBlockIndex(g)})))}disableModuleBindings(){this.readOnlyMutableListeners.clearAll()}enableModuleBindings(){this.readOnlyMutableListeners.on(document,"cut",(g=>this.Editor.BlockEvents.handleCommandX(g))),this.blocks.forEach((g=>{this.bindBlockEvents(g)}))
/**
   * Validates that the given index is not lower than 0 or higher than the amount of blocks
   *
   * @param {number} index - index of blocks array to validate
   * @returns {boolean}
   */}validateIndex(g){return!(g<0||g>=this._blocks.length)}
/**
   * Block mutation callback
   *
   * @param mutationType - what happened with block
   * @param block - mutated block
   * @param detailData - additional data to pass with change event
   */blockDidMutated(g,f,b){const v=new CustomEvent(g,{detail:{target:new he(f),...b}});return this.eventsDispatcher.emit($,{event:v}),f}}class Xo extends S{constructor(){super(...arguments),this.anyBlockSelectedCache=null,this.needToSelectAll=!1,this.nativeInputSelected=!1,this.readyToBlockSelection=!1
/**
   * Sanitizer Config
   *
   * @returns {SanitizerConfig}
   */}get sanitizerConfig(){return{p:{},h1:{},h2:{},h3:{},h4:{},h5:{},h6:{},ol:{},ul:{},li:{},br:!0,img:{src:!0,width:!0,height:!0},a:{href:!0},b:{},i:{},u:{}}}
/**
   * Flag that identifies all Blocks selection
   *
   * @returns {boolean}
   */get allBlocksSelected(){const{BlockManager:g}=this.Editor;return g.blocks.every((g=>!0===g.selected))}
/**
   * Set selected all blocks
   *
   * @param {boolean} state - state to set
   */set allBlocksSelected(g){const{BlockManager:f}=this.Editor;f.blocks.forEach((f=>{f.selected=g})),this.clearCache()
/**
   * Flag that identifies any Block selection
   *
   * @returns {boolean}
   */}get anyBlockSelected(){const{BlockManager:g}=this.Editor;return null===this.anyBlockSelectedCache&&(this.anyBlockSelectedCache=g.blocks.some((g=>!0===g.selected))),this.anyBlockSelectedCache
/**
   * Return selected Blocks array
   *
   * @returns {Block[]}
   */}get selectedBlocks(){return this.Editor.BlockManager.blocks.filter((g=>g.selected))}prepare(){this.selection=new m,dt.add({name:"CMD+A",handler:g=>{const{BlockManager:f,ReadOnly:b}=this.Editor;b.isEnabled?(g.preventDefault(),this.selectAllBlocks()):f.currentBlock&&this.handleCommandA(g)},on:this.Editor.UI.nodes.redactor})}toggleReadOnly(){m.get().removeAllRanges(),this.allBlocksSelected=!1
/**
   * Remove selection of Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */}unSelectBlockByIndex(g){const{BlockManager:f}=this.Editor;let b;b=isNaN(g)?f.currentBlock:f.getBlockByIndex(g),b.selected=!1,this.clearCache()
/**
   * Clear selection from Blocks
   *
   * @param {Event} reason - event caused clear of selection
   * @param {boolean} restoreSelection - if true, restore saved selection
   */}clearSelection(g,f=!1){const{BlockManager:b,Caret:v,RectangleSelection:w}=this.Editor;this.needToSelectAll=!1,this.nativeInputSelected=!1,this.readyToBlockSelection=!1;const E=g&&g instanceof KeyboardEvent,C=E&&tt(g.keyCode);if(this.anyBlockSelected&&E&&C&&!m.isSelectionExists){const f=b.removeSelectedBlocks();b.insertDefaultBlockAtIndex(f,!0),v.setToBlock(b.currentBlock),oe((()=>{const f=g.key;v.insertContentAtCaretPosition(f.length>1?"":f)}),20)()}this.Editor.CrossBlockSelection.clear(g),this.anyBlockSelected&&!w.isRectActivated()?(f&&this.selection.restore(),this.allBlocksSelected=!1
/**
   * Reduce each Block and copy its content
   *
   * @param {ClipboardEvent} e - copy/cut event
   * @returns {Promise<void>}
   */):this.Editor.RectangleSelection.clearSelection()}copySelectedBlocks(g){g.preventDefault();const f=d.make("div");this.selectedBlocks.forEach((g=>{const b=Z(g.holder.innerHTML,this.sanitizerConfig),v=d.make("p");v.innerHTML=b,f.appendChild(v)}));const b=Array.from(f.childNodes).map((g=>g.textContent)).join("\n\n"),v=f.innerHTML;return g.clipboardData.setData("text/plain",b),g.clipboardData.setData("text/html",v),Promise.all(this.selectedBlocks.map((g=>g.save()))).then((f=>{try{g.clipboardData.setData(this.Editor.Paste.MIME_TYPE,JSON.stringify(f))}catch{}}))
/**
   * select Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */}selectBlockByIndex(g){const{BlockManager:f}=this.Editor;f.clearFocused();let b;b=isNaN(g)?f.currentBlock:f.getBlockByIndex(g),this.selection.save(),m.get().removeAllRanges(),b.selected=!0,this.clearCache(),this.Editor.InlineToolbar.close()}clearCache(){this.anyBlockSelectedCache=null}destroy(){dt.remove(this.Editor.UI.nodes.redactor,"CMD+A")}
/**
   * First CMD+A selects all input content by native behaviour,
   * next CMD+A keypress selects all blocks
   *
   * @param {KeyboardEvent} event - keyboard event
   */handleCommandA(g){if(this.Editor.RectangleSelection.clearSelection(),d.isNativeInput(g.target)&&!this.readyToBlockSelection){this.readyToBlockSelection=!0;return}const f=this.Editor.BlockManager.getBlock(g.target).inputs;f.length>1&&!this.readyToBlockSelection?this.readyToBlockSelection=!0:1!==f.length||this.needToSelectAll?this.needToSelectAll?(g.preventDefault(),this.selectAllBlocks(),this.needToSelectAll=!1,this.readyToBlockSelection=!1,this.Editor.ConversionToolbar.close()):this.readyToBlockSelection&&(g.preventDefault(),this.selectBlockByIndex(),this.needToSelectAll=!0):this.needToSelectAll=!0}selectAllBlocks(){this.selection.save(),m.get().removeAllRanges(),this.allBlocksSelected=!0,this.Editor.InlineToolbar.close()}}class ve extends S{
/**
   * Allowed caret positions in input
   *
   * @static
   * @returns {{START: string, END: string, DEFAULT: string}}
   */
get positions(){return{START:"start",END:"end",DEFAULT:"default"}}static get CSS(){return{shadowCaret:"cdx-shadow-caret"}}
/**
   * Get's deepest first node and checks if offset is zero
   *
   * @returns {boolean}
   */get isAtStart(){const g=m.get(),f=d.getDeepestNode(this.Editor.BlockManager.currentBlock.currentInput);let b=g.focusNode;if(d.isNativeInput(f))return 0===f.selectionEnd;if(!g.anchorNode)return!1;let v=b.textContent.search(/\S/);-1===v&&(v=0);let w=g.focusOffset;return b.nodeType!==Node.TEXT_NODE&&b.childNodes.length&&(b.childNodes[w]?(b=b.childNodes[w],w=0):(b=b.childNodes[w-1],w=b.textContent.length)),!(!d.isLineBreakTag(f)&&!d.isEmpty(f)||!this.getHigherLevelSiblings(b,"left").every((g=>{const f=d.isLineBreakTag(g),b=1===g.children.length&&d.isLineBreakTag(g.children[0]),v=f||b;return d.isEmpty(g)&&!v}))||w!==v)||(null===f||b===f&&w<=v)
/**
   * Get's deepest last node and checks if offset is last node text length
   *
   * @returns {boolean}
   */}get isAtEnd(){const g=m.get();let f=g.focusNode;const b=d.getDeepestNode(this.Editor.BlockManager.currentBlock.currentInput,!0);if(d.isNativeInput(b))return b.selectionEnd===b.value.length;if(!g.focusNode)return!1;let v=g.focusOffset;if(f.nodeType!==Node.TEXT_NODE&&f.childNodes.length&&(f.childNodes[v-1]?(f=f.childNodes[v-1],v=f.textContent.length):(f=f.childNodes[0],v=0)),d.isLineBreakTag(b)||d.isEmpty(b)){const g=this.getHigherLevelSiblings(f,"right");if(g.every(((f,b)=>b===g.length-1&&d.isLineBreakTag(f)||d.isEmpty(f)&&!d.isLineBreakTag(f)))&&v===f.textContent.length)return!0}const w=b.textContent.replace(/\s+$/,"");return f===b&&v>=w.length}
/**
   * Method gets Block instance and puts caret to the text node with offset
   * There two ways that method applies caret position:
   *   - first found text node: sets at the beginning, but you can pass an offset
   *   - last found text node: sets at the end of the node. Also, you can customize the behaviour
   *
   * @param {Block} block - Block class
   * @param {string} position - position where to set caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */setToBlock(g,f=this.positions.DEFAULT,b=0){const{BlockManager:v}=this.Editor;let w;switch(f){case this.positions.START:w=g.firstInput;break;case this.positions.END:w=g.lastInput;break;default:w=g.currentInput}if(!w)return;const E=d.getDeepestNode(w,f===this.positions.END),C=d.getContentLength(E);switch(!0){case f===this.positions.START:b=0;break;case f===this.positions.END:case b>C:b=C;break}oe((()=>{this.set(E,b)}),20)(),v.setCurrentBlockByChildNode(g.holder),v.currentBlock.currentInput=w
/**
   * Set caret to the current input of current Block.
   *
   * @param {HTMLElement} input - input where caret should be set
   * @param {string} position - position of the caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */}setToInput(g,f=this.positions.DEFAULT,b=0){const{currentBlock:v}=this.Editor.BlockManager,w=d.getDeepestNode(g);switch(f){case this.positions.START:this.set(w,0);break;case this.positions.END:this.set(w,d.getContentLength(w));break;default:b&&this.set(w,b)}v.currentInput=g}
/**
   * Creates Document Range and sets caret to the element with offset
   *
   * @param {HTMLElement} element - target node.
   * @param {number} offset - offset
   */set(g,f=0){const{top:b,bottom:v}=m.setCursor(g,f),{innerHeight:w}=window;b<0&&window.scrollBy(0,b),v>w&&window.scrollBy(0,v-w)}setToTheLastBlock(){const g=this.Editor.BlockManager.lastBlock;if(g)if(g.tool.isDefault&&g.isEmpty)this.setToBlock(g);else{const g=this.Editor.BlockManager.insertAtEnd();this.setToBlock(g)}}extractFragmentFromCaretPosition(){const g=m.get();if(g.rangeCount){const f=g.getRangeAt(0),b=this.Editor.BlockManager.currentBlock.currentInput;if(f.deleteContents(),b){if(d.isNativeInput(b)){const g=b,f=document.createDocumentFragment(),v=g.value.substring(0,g.selectionStart),w=g.value.substring(g.selectionStart);return f.textContent=w,g.value=v,f}{const g=f.cloneRange();return g.selectNodeContents(b),g.setStart(f.endContainer,f.endOffset),g.extractContents()}}}}
/**
   * Set's caret to the next Block or Tool`s input
   * Before moving caret, we should check if caret position is at the end of Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @returns {boolean}
   */navigateNext(){const{BlockManager:g}=this.Editor,{currentBlock:f,nextContentfulBlock:b}=g,{nextInput:v}=f,w=this.isAtEnd;let E=b;if(!E&&!v){if(f.tool.isDefault||!w)return!1;E=g.insertAtEnd()}return!!w&&(v?this.setToInput(v,this.positions.START):this.setToBlock(E,this.positions.START),!0)}
/**
   * Set's caret to the previous Tool`s input or Block
   * Before moving caret, we should check if caret position is start of the Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @returns {boolean}
   */navigatePrevious(){const{currentBlock:g,previousContentfulBlock:f}=this.Editor.BlockManager;if(!g)return!1;const{previousInput:b}=g;return!(!f&&!b)&&(!!this.isAtStart&&(b?this.setToInput(b,this.positions.END):this.setToBlock(f,this.positions.END),!0))}
/**
   * Inserts shadow element after passed element where caret can be placed
   *
   * @param {Element} element - element after which shadow caret should be inserted
   */createShadow(g){const f=document.createElement("span");f.classList.add(ve.CSS.shadowCaret),g.insertAdjacentElement("beforeend",f)
/**
   * Restores caret position
   *
   * @param {HTMLElement} element - element where caret should be restored
   */}restoreCaret(g){const f=g.querySelector(`.${ve.CSS.shadowCaret}`);f&&((new m).expandToTag(f),setTimeout((()=>{const g=document.createRange();g.selectNode(f),g.extractContents()}),50)
/**
   * Inserts passed content at caret position
   *
   * @param {string} content - content to insert
   */)}insertContentAtCaretPosition(g){const f=document.createDocumentFragment(),b=document.createElement("div"),v=m.get(),w=m.range;b.innerHTML=g,Array.from(b.childNodes).forEach((g=>f.appendChild(g))),0===f.childNodes.length&&f.appendChild(new Text);const E=f.lastChild;w.deleteContents(),w.insertNode(f);const C=document.createRange();C.setStart(E,E.textContent.length),v.removeAllRanges(),v.addRange(C)
/**
   * Get all first-level (first child of [contenteditable]) siblings from passed node
   * Then you can check it for emptiness
   *
   * @example
   * <div contenteditable>
   * <p></p>                            |
   * <p></p>                            | left first-level siblings
   * <p></p>                            |
   * <blockquote><a><b>adaddad</b><a><blockquote>       <-- passed node for example <b>
   * <p></p>                            |
   * <p></p>                            | right first-level siblings
   * <p></p>                            |
   * </div>
   * @param {HTMLElement} from - element from which siblings should be searched
   * @param {'left' | 'right'} direction - direction of search
   * @returns {HTMLElement[]}
   */}getHigherLevelSiblings(g,f){let b=g;const v=[];for(;b.parentNode&&"true"!==b.parentNode.contentEditable;)b=b.parentNode;const w="left"===f?"previousSibling":"nextSibling";for(;b[w];)b=b[w],v.push(b);return v}}class Vo extends S{constructor(){super(...arguments),this.onMouseUp=()=>{this.listeners.off(document,"mouseover",this.onMouseOver),this.listeners.off(document,"mouseup",this.onMouseUp)},this.onMouseOver=g=>{const{BlockManager:f,BlockSelection:b}=this.Editor,v=f.getBlockByChildNode(g.relatedTarget)||this.lastSelectedBlock,w=f.getBlockByChildNode(g.target);if(!(!v||!w)&&w!==v){if(v===this.firstSelectedBlock){m.get().removeAllRanges(),v.selected=!0,w.selected=!0,b.clearCache();return}if(w===this.firstSelectedBlock){v.selected=!1,w.selected=!1,b.clearCache();return}this.Editor.InlineToolbar.close(),this.toggleBlocksSelectedState(v,w),this.lastSelectedBlock=w}}
/**
   * Module preparation
   *
   * @returns {Promise}
   */}async prepare(){this.listeners.on(document,"mousedown",(g=>{this.enableCrossBlockSelection(g)}))}
/**
   * Sets up listeners
   *
   * @param {MouseEvent} event - mouse down event
   */watchSelection(g){if(g.button!==b.LEFT)return;const{BlockManager:f}=this.Editor;this.firstSelectedBlock=f.getBlock(g.target),this.lastSelectedBlock=this.firstSelectedBlock,this.listeners.on(document,"mouseover",this.onMouseOver),this.listeners.on(document,"mouseup",this.onMouseUp)}get isCrossBlockSelectionStarted(){return!!this.firstSelectedBlock&&!!this.lastSelectedBlock}
/**
   * Change selection state of the next Block
   * Used for CBS via Shift + arrow keys
   *
   * @param {boolean} next - if true, toggle next block. Previous otherwise
   */toggleBlockSelectedState(g=!0){const{BlockManager:f,BlockSelection:b}=this.Editor;this.lastSelectedBlock||(this.lastSelectedBlock=this.firstSelectedBlock=f.currentBlock),this.firstSelectedBlock===this.lastSelectedBlock&&(this.firstSelectedBlock.selected=!0,b.clearCache(),m.get().removeAllRanges());const v=f.blocks.indexOf(this.lastSelectedBlock)+(g?1:-1),w=f.blocks[v];w&&(this.lastSelectedBlock.selected!==w.selected?(w.selected=!0,b.clearCache()):(this.lastSelectedBlock.selected=!1,b.clearCache()),this.lastSelectedBlock=w,this.Editor.InlineToolbar.close(),w.holder.scrollIntoView({block:"nearest"}))}
/**
   * Clear saved state
   *
   * @param {Event} reason - event caused clear of selection
   */clear(g){const{BlockManager:b,BlockSelection:v,Caret:w}=this.Editor,E=b.blocks.indexOf(this.firstSelectedBlock),C=b.blocks.indexOf(this.lastSelectedBlock);if(v.anyBlockSelected&&E>-1&&C>-1)if(g&&g instanceof KeyboardEvent)switch(g.keyCode){case f.DOWN:case f.RIGHT:w.setToBlock(b.blocks[Math.max(E,C)],w.positions.END);break;case f.UP:case f.LEFT:w.setToBlock(b.blocks[Math.min(E,C)],w.positions.START);break;default:w.setToBlock(b.blocks[Math.max(E,C)],w.positions.END)}else w.setToBlock(b.blocks[Math.max(E,C)],w.positions.END);this.firstSelectedBlock=this.lastSelectedBlock=null}
/**
   * Enables Cross Block Selection
   *
   * @param {MouseEvent} event - mouse down event
   */enableCrossBlockSelection(g){const{UI:f}=this.Editor;m.isCollapsed||this.Editor.BlockSelection.clearSelection(g),f.nodes.redactor.contains(g.target)?this.watchSelection(g):this.Editor.BlockSelection.clearSelection(g)
/**
   * Change blocks selection state between passed two blocks.
   *
   * @param {Block} firstBlock - first block in range
   * @param {Block} lastBlock - last block in range
   */}toggleBlocksSelectedState(g,f){const{BlockManager:b,BlockSelection:v}=this.Editor,w=b.blocks.indexOf(g),E=b.blocks.indexOf(f),C=g.selected!==f.selected;for(let B=Math.min(w,E);B<=Math.max(w,E);B++){const w=b.blocks[B];w!==this.firstSelectedBlock&&w!==(C?g:f)&&(b.blocks[B].selected=!b.blocks[B].selected,v.clearCache())}}}class Zo extends S{constructor(){super(...arguments),this.isStartedAtEditor=!1
/**
   * Toggle read-only state
   *
   * if state is true:
   *  - disable all drag-n-drop event handlers
   *
   * if state is false:
   *  - restore drag-n-drop event handlers
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */}toggleReadOnly(g){g?this.disableModuleBindings():this.enableModuleBindings()}enableModuleBindings(){const{UI:g}=this.Editor;this.readOnlyMutableListeners.on(g.nodes.holder,"drop",(async g=>{await this.processDrop(g)}),!0),this.readOnlyMutableListeners.on(g.nodes.holder,"dragstart",(()=>{this.processDragStart()})),this.readOnlyMutableListeners.on(g.nodes.holder,"dragover",(g=>{this.processDragOver(g)}),!0)}disableModuleBindings(){this.readOnlyMutableListeners.clearAll()}
/**
   * Handle drop event
   *
   * @param {DragEvent} dropEvent - drop event
   */async processDrop(g){const{BlockManager:f,Caret:b,Paste:v}=this.Editor;g.preventDefault(),f.blocks.forEach((g=>{g.dropTarget=!1})),m.isAtEditor&&!m.isCollapsed&&this.isStartedAtEditor&&document.execCommand("delete"),this.isStartedAtEditor=!1;const w=f.setCurrentBlockByChildNode(g.target);if(w)this.Editor.Caret.setToBlock(w,b.positions.END);else{const g=f.setCurrentBlockByChildNode(f.lastBlock.holder);this.Editor.Caret.setToBlock(g,b.positions.END)}await v.processDataTransfer(g.dataTransfer,!0)}processDragStart(){m.isAtEditor&&!m.isCollapsed&&(this.isStartedAtEditor=!0),this.Editor.InlineToolbar.close()
/**
   * @param {DragEvent} dragEvent - drag event
   */}processDragOver(g){g.preventDefault()}}class Go extends S{
/**
   * Prepare the module
   *
   * @param options - options used by the modification observer module
   * @param options.config - Editor configuration object
   * @param options.eventsDispatcher - common Editor event bus
   */
constructor({config:g,eventsDispatcher:f}){super({config:g,eventsDispatcher:f}),this.disabled=!1,this.batchingTimeout=null,this.batchingOnChangeQueue=new Map,this.batchTime=400,this.mutationObserver=new MutationObserver((g=>{this.redactorChanged(g)})),this.eventsDispatcher.on($,(g=>{this.particularBlockChanged(g.event)})),this.eventsDispatcher.on(W,(()=>{this.disable()})),this.eventsDispatcher.on(K,(()=>{this.enable()}))}enable(){this.mutationObserver.observe(this.Editor.UI.nodes.redactor,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),this.disabled=!1}disable(){this.mutationObserver.disconnect(),this.disabled=!0
/**
   * Call onChange event passed to Editor.js configuration
   *
   * @param event - some of our custom change events
   */}particularBlockChanged(g){this.disabled||!D(this.config.onChange)||(this.batchingOnChangeQueue.set(`block:${g.detail.target.id}:event:${g.type}`,g),this.batchingTimeout&&clearTimeout(this.batchingTimeout),this.batchingTimeout=setTimeout((()=>{let g;g=1===this.batchingOnChangeQueue.size?this.batchingOnChangeQueue.values().next().value:Array.from(this.batchingOnChangeQueue.values()),this.config.onChange&&this.config.onChange(this.Editor.API.methods,g),this.batchingOnChangeQueue.clear()}),this.batchTime))}
/**
   * Fired on every blocks wrapper dom change
   *
   * @param mutations - mutations happened
   */redactorChanged(g){this.eventsDispatcher.emit(z,{mutations:g})}}const to=class extends S{constructor(){super(...arguments),this.MIME_TYPE="application/x-editor-js",this.toolsTags={},this.tagsByTool={},this.toolsPatterns=[],this.toolsFiles={},this.exceptionList=[],this.processTool=g=>{try{const f=g.create({},{},!1);if(!1===g.pasteConfig){this.exceptionList.push(g.name);return}if(!D(f.onPaste))return;this.getTagsConfig(g),this.getFilesConfig(g),this.getPatternsConfig(g)}catch(f){v(`Paste handling for «${g.name}» Tool hasn't been set up because of the error`,"warn",f)}},this.handlePasteEvent=async g=>{const{BlockManager:f,Toolbar:b}=this.Editor;!f.currentBlock||this.isNativeBehaviour(g.target)&&!g.clipboardData.types.includes("Files")||f.currentBlock&&this.exceptionList.includes(f.currentBlock.name)||(g.preventDefault(),this.processDataTransfer(g.clipboardData),f.clearFocused(),b.close())}}async prepare(){this.processTools()}
/**
   * Set read-only state
   *
   * @param {boolean} readOnlyEnabled - read only flag value
   */toggleReadOnly(g){g?this.unsetCallback():this.setCallback()}
/**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */async processDataTransfer(g,f=!1){const{Tools:b}=this.Editor,v=g.types;if((v.includes?v.includes("Files"):v.contains("Files"))&&!V(this.toolsFiles)){await this.processFiles(g.files);return}const w=g.getData(this.MIME_TYPE),E=g.getData("text/plain");let C=g.getData("text/html");if(w)try{this.insertEditorJSData(JSON.parse(w));return}catch{}f&&E.trim()&&C.trim()&&(C="<p>"+(C.trim()?C:E)+"</p>");const B=Object.keys(this.toolsTags).reduce(((g,f)=>(g[f.toLowerCase()]=this.toolsTags[f].sanitizationConfig??{},g)),{}),T=Object.assign({},B,b.getAllInlineToolsSanitizeConfig(),{br:{}}),I=Z(C,T);I.trim()&&I.trim()!==E&&d.isHTMLString(I)?await this.processText(I,!0):await this.processText(E)}
/**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */async processText(g,f=!1){const{Caret:b,BlockManager:v}=this.Editor,w=f?this.processHTML(g):this.processPlain(g);if(!w.length)return;if(1===w.length){w[0].isBlock?this.processSingleBlock(w.pop()):this.processInlinePaste(w.pop());return}const E=v.currentBlock&&v.currentBlock.tool.isDefault&&v.currentBlock.isEmpty;w.map((async(g,f)=>this.insertBlock(g,0===f&&E))),v.currentBlock&&b.setToBlock(v.currentBlock,b.positions.END)}setCallback(){this.listeners.on(this.Editor.UI.nodes.holder,"paste",this.handlePasteEvent)}unsetCallback(){this.listeners.off(this.Editor.UI.nodes.holder,"paste",this.handlePasteEvent)}processTools(){const g=this.Editor.Tools.blockTools;Array.from(g.values()).forEach(this.processTool)}
/**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */collectTagNames(g){return J(g)?[g]:j(g)?Object.keys(g):[]}
/**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */getTagsConfig(g){if(!1===g.pasteConfig)return;const f=g.pasteConfig.tags||[],b=[];f.forEach((f=>{const w=this.collectTagNames(f);b.push(...w),w.forEach((b=>{if(Object.prototype.hasOwnProperty.call(this.toolsTags,b)){v(`Paste handler for «${g.name}» Tool on «${b}» tag is skipped because it is already used by «${this.toolsTags[b].tool.name}» Tool.`,"warn");return}const w=j(f)?f[b]:null;this.toolsTags[b.toUpperCase()]={tool:g,sanitizationConfig:w}}))})),this.tagsByTool[g.name]=b.map((g=>g.toUpperCase()))
/**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */}getFilesConfig(g){if(!1===g.pasteConfig)return;const{files:f={}}=g.pasteConfig;let{extensions:b,mimeTypes:w}=f;!b&&!w||(b&&!Array.isArray(b)&&(v(`«extensions» property of the onDrop config for «${g.name}» Tool should be an array`),b=[]),w&&!Array.isArray(w)&&(v(`«mimeTypes» property of the onDrop config for «${g.name}» Tool should be an array`),w=[]),w&&(w=w.filter((f=>!!Dt(f)||(v(`MIME type value «${f}» for the «${g.name}» Tool is not a valid MIME type`,"warn"),!1)))),this.toolsFiles[g.name]={extensions:b||[],mimeTypes:w||[]})}
/**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */getPatternsConfig(g){!1===g.pasteConfig||!g.pasteConfig.patterns||V(g.pasteConfig.patterns)||Object.entries(g.pasteConfig.patterns).forEach((([f,b])=>{b instanceof RegExp||v(`Pattern ${b} for «${g.name}» Tool is skipped because it should be a Regexp instance.`,"warn"),this.toolsPatterns.push({key:f,pattern:b,tool:g})}))}
/**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */isNativeBehaviour(g){return d.isNativeInput(g)}
/**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */async processFiles(g){const{BlockManager:f}=this.Editor;let b;b=await Promise.all(Array.from(g).map((g=>this.processFile(g)))),b=b.filter((g=>!!g));const v=f.currentBlock.tool.isDefault&&f.currentBlock.isEmpty;b.forEach(((g,b)=>{f.paste(g.type,g.event,0===b&&v)}))}
/**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */async processFile(g){const f=Rt(g),b=Object.entries(this.toolsFiles).find((([b,{mimeTypes:v,extensions:w}])=>{const[E,C]=g.type.split("/"),B=w.find((g=>g.toLowerCase()===f.toLowerCase())),T=v.find((g=>{const[f,b]=g.split("/");return f===E&&(b===C||"*"===b)}));return!!B||!!T}));if(!b)return;const[v]=b;return{event:this.composePasteEvent("file",{file:g}),type:v}}
/**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */processHTML(g){const{Tools:f}=this.Editor,b=d.make("DIV");return b.innerHTML=g,this.getNodes(b).map((g=>{let b,v=f.defaultTool,w=!1;switch(g.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:b=d.make("div"),b.appendChild(g);break;case Node.ELEMENT_NODE:b=g,w=!0,this.toolsTags[b.tagName]&&(v=this.toolsTags[b.tagName].tool);break}const{tags:E}=v.pasteConfig||{tags:[]},C=E.reduce(((g,f)=>(this.collectTagNames(f).forEach((b=>{const v=j(f)?f[b]:null;g[b.toLowerCase()]=v||{}})),g)),{}),B=Object.assign({},C,v.baseSanitizeConfig);if("table"===b.tagName.toLowerCase()){const g=Z(b.outerHTML,B);b=d.make("div",void 0,{innerHTML:g}).firstChild}else b.innerHTML=Z(b.innerHTML,B);const T=this.composePasteEvent("tag",{data:b});return{content:b,isBlock:w,tool:v.name,event:T}})).filter((g=>{const f=d.isEmpty(g.content),b=d.isSingleTag(g.content);return!f||b}))
/**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */}processPlain(g){const{defaultBlock:f}=this.config;if(!g)return[];const b=f;return g.split(/\r?\n/).filter((g=>g.trim())).map((g=>{const f=d.make("div");f.textContent=g;const v=this.composePasteEvent("tag",{data:f});return{content:f,tool:b,isBlock:!1,event:v}}))}
/**
   * Process paste of single Block tool content
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */async processSingleBlock(g){const{Caret:f,BlockManager:b}=this.Editor,{currentBlock:v}=b;v&&g.tool===v.name&&d.containsOnlyInlineElements(g.content.innerHTML)?f.insertContentAtCaretPosition(g.content.innerHTML):this.insertBlock(g,(null==v?void 0:v.tool.isDefault)&&v.isEmpty)}
/**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */async processInlinePaste(g){const{BlockManager:f,Caret:b}=this.Editor,{content:v}=g;if(f.currentBlock&&f.currentBlock.tool.isDefault&&v.textContent.length<to.PATTERN_PROCESSING_MAX_LENGTH){const g=await this.processPattern(v.textContent);if(g){const v=f.currentBlock&&f.currentBlock.tool.isDefault&&f.currentBlock.isEmpty,w=f.paste(g.tool,g.event,v);b.setToBlock(w,b.positions.END);return}}if(f.currentBlock&&f.currentBlock.currentInput){const g=f.currentBlock.tool.baseSanitizeConfig;document.execCommand("insertHTML",!1,Z(v.innerHTML,g))}else this.insertBlock(g)}
/**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */async processPattern(g){const f=this.toolsPatterns.find((f=>{const b=f.pattern.exec(g);return!!b&&g===b.shift()}));return f?{event:this.composePasteEvent("pattern",{key:f.key,data:g}),tool:f.tool.name}:void 0}
/**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */insertBlock(g,f=!1){const{BlockManager:b,Caret:v}=this.Editor,{currentBlock:w}=b;let E;f&&w&&w.isEmpty?(E=b.paste(g.tool,g.event,!0),v.setToBlock(E,v.positions.END)):(E=b.paste(g.tool,g.event),v.setToBlock(E,v.positions.END)
/**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */)}insertEditorJSData(g){const{BlockManager:f,Caret:b,Tools:v}=this.Editor;ht(g,(g=>v.blockTools.get(g).sanitizeConfig)).forEach((({tool:g,data:v},w)=>{let E=!1;0===w&&(E=f.currentBlock&&f.currentBlock.tool.isDefault&&f.currentBlock.isEmpty);const C=f.insert({tool:g,data:v,replace:E});b.setToBlock(C,b.positions.END)}))}
/**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */processElementNode(g,f,b){const v=Object.keys(this.toolsTags),w=g,{tool:E}=this.toolsTags[w.tagName]||{},C=this.tagsByTool[null==E?void 0:E.name]||[],B=v.includes(w.tagName),T=d.blockElements.includes(w.tagName.toLowerCase()),I=Array.from(w.children).some((({tagName:g})=>v.includes(g)&&!C.includes(g))),M=Array.from(w.children).some((({tagName:g})=>d.blockElements.includes(g.toLowerCase())));return T||B||I?B&&!I||T&&!M&&!I?[...f,b,w]:void 0:(b.appendChild(w),[...f,b])}
/**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */getNodes(g){const f=Array.from(g.childNodes);let b;const o=(g,f)=>{if(d.isEmpty(f)&&!d.isSingleTag(f))return g;const v=g[g.length-1];let w=new DocumentFragment;switch(v&&d.isFragment(v)&&(w=g.pop()),f.nodeType){case Node.ELEMENT_NODE:if(b=this.processElementNode(f,g,w),b)return b;break;case Node.TEXT_NODE:return w.appendChild(f),[...g,w];default:return[...g,w]}return[...g,...Array.from(f.childNodes).reduce(o,[])]};return f.reduce(o,[])}
/**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */composePasteEvent(g,f){return new CustomEvent(g,{detail:f})}};let oo=to;oo.PATTERN_PROCESSING_MAX_LENGTH=450;class qo extends S{constructor(){super(...arguments),this.toolsDontSupportReadOnly=[],this.readOnlyEnabled=!1}get isEnabled(){return this.readOnlyEnabled}async prepare(){const{Tools:g}=this.Editor,{blockTools:f}=g,b=[];Array.from(f.entries()).forEach((([g,f])=>{f.isReadOnlySupported||b.push(g)})),this.toolsDontSupportReadOnly=b,this.config.readOnly&&b.length>0&&this.throwCriticalError(),this.toggle(this.config.readOnly)
/**
   * Set read-only mode or toggle current state
   * Call all Modules `toggleReadOnly` method and re-render Editor
   *
   * @param {boolean} state - (optional) read-only state or toggle
   */}async toggle(g=!this.readOnlyEnabled){g&&this.toolsDontSupportReadOnly.length>0&&this.throwCriticalError();const f=this.readOnlyEnabled;this.readOnlyEnabled=g;for(const f in this.Editor)this.Editor[f].toggleReadOnly&&this.Editor[f].toggleReadOnly(g);if(f===g)return this.readOnlyEnabled;const b=await this.Editor.Saver.save();return await this.Editor.BlockManager.clear(),await this.Editor.Renderer.render(b.blocks),this.readOnlyEnabled}throwCriticalError(){throw new at(`To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`)}}class pe extends S{constructor(){super(...arguments),this.isRectSelectionActivated=!1,this.SCROLL_SPEED=3,this.HEIGHT_OF_SCROLL_ZONE=40,this.BOTTOM_SCROLL_ZONE=1,this.TOP_SCROLL_ZONE=2,this.MAIN_MOUSE_BUTTON=0,this.mousedown=!1,this.isScrolling=!1,this.inScrollZone=null,this.startX=0,this.startY=0,this.mouseX=0,this.mouseY=0,this.stackOfSelected=[],this.listenerIds=[]
/**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */}static get CSS(){return{overlay:"codex-editor-overlay",overlayContainer:"codex-editor-overlay__container",rect:"codex-editor-overlay__rectangle",topScrollZone:"codex-editor-overlay__scroll-zone--top",bottomScrollZone:"codex-editor-overlay__scroll-zone--bottom"}}prepare(){this.enableModuleBindings()}
/**
   * Init rect params
   *
   * @param {number} pageX - X coord of mouse
   * @param {number} pageY - Y coord of mouse
   */startSelection(g,f){const b=document.elementFromPoint(g-window.pageXOffset,f-window.pageYOffset);b.closest(`.${this.Editor.Toolbar.CSS.toolbar}`)||(this.Editor.BlockSelection.allBlocksSelected=!1,this.clearSelection(),this.stackOfSelected=[]);const v=[`.${F.CSS.content}`,`.${this.Editor.Toolbar.CSS.toolbar}`,`.${this.Editor.InlineToolbar.CSS.inlineToolbar}`],w=b.closest("."+this.Editor.UI.CSS.editorWrapper),E=v.some((g=>!!b.closest(g)));!w||E||(this.mousedown=!0,this.startX=g,this.startY=f)}endSelection(){this.mousedown=!1,this.startX=0,this.startY=0,this.overlayRectangle.style.display="none"}isRectActivated(){return this.isRectSelectionActivated}clearSelection(){this.isRectSelectionActivated=!1}enableModuleBindings(){const{container:g}=this.genHTML();this.listeners.on(g,"mousedown",(g=>{this.processMouseDown(g)}),!1),this.listeners.on(document.body,"mousemove",Te((g=>{this.processMouseMove(g)}),10),{passive:!0}),this.listeners.on(document.body,"mouseleave",(()=>{this.processMouseLeave()})),this.listeners.on(window,"scroll",Te((g=>{this.processScroll(g)}),10),{passive:!0}),this.listeners.on(document.body,"mouseup",(()=>{this.processMouseUp()}),!1)
/**
   * Handle mouse down events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */}processMouseDown(g){g.button===this.MAIN_MOUSE_BUTTON&&(null!==g.target.closest(d.allInputsSelector)||this.startSelection(g.pageX,g.pageY))}
/**
   * Handle mouse move events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */processMouseMove(g){this.changingRectangle(g),this.scrollByZones(g.clientY)}processMouseLeave(){this.clearSelection(),this.endSelection()
/**
   * @param {MouseEvent} mouseEvent - mouse event payload
   */}processScroll(g){this.changingRectangle(g)}processMouseUp(){this.clearSelection(),this.endSelection()
/**
   * Scroll If mouse in scroll zone
   *
   * @param {number} clientY - Y coord of mouse
   */}scrollByZones(g){this.inScrollZone=null,g<=this.HEIGHT_OF_SCROLL_ZONE&&(this.inScrollZone=this.TOP_SCROLL_ZONE),document.documentElement.clientHeight-g<=this.HEIGHT_OF_SCROLL_ZONE&&(this.inScrollZone=this.BOTTOM_SCROLL_ZONE),this.inScrollZone?this.isScrolling||(this.scrollVertical(this.inScrollZone===this.TOP_SCROLL_ZONE?-this.SCROLL_SPEED:this.SCROLL_SPEED),this.isScrolling=!0):this.isScrolling=!1}
/**
   * Generates required HTML elements
   *
   * @returns {Object<string, Element>}
   */genHTML(){const{UI:g}=this.Editor,f=g.nodes.holder.querySelector("."+g.CSS.editorWrapper),b=d.make("div",pe.CSS.overlay,{}),v=d.make("div",pe.CSS.overlayContainer,{}),w=d.make("div",pe.CSS.rect,{});return v.appendChild(w),b.appendChild(v),f.appendChild(b),this.overlayRectangle=w,{container:f,overlay:b}
/**
   * Activates scrolling if blockSelection is active and mouse is in scroll zone
   *
   * @param {number} speed - speed of scrolling
   */}scrollVertical(g){if(!(this.inScrollZone&&this.mousedown))return;const f=window.pageYOffset;window.scrollBy(0,g),this.mouseY+=window.pageYOffset-f,setTimeout((()=>{this.scrollVertical(g)}),0)
/**
   * Handles the change in the rectangle and its effect
   *
   * @param {MouseEvent} event - mouse event
   */}changingRectangle(g){if(!this.mousedown)return;void 0!==g.pageY&&(this.mouseX=g.pageX,this.mouseY=g.pageY);const{rightPos:f,leftPos:b,index:v}=this.genInfoForMouseSelection(),w=this.startX>f&&this.mouseX>f,E=this.startX<b&&this.mouseX<b;this.rectCrossesBlocks=!(w||E),this.isRectSelectionActivated||(this.rectCrossesBlocks=!1,this.isRectSelectionActivated=!0,this.shrinkRectangleToPoint(),this.overlayRectangle.style.display="block"),this.updateRectangleSize(),this.Editor.Toolbar.close(),void 0!==v&&(this.trySelectNextBlock(v),this.inverseSelection(),m.get().removeAllRanges())}shrinkRectangleToPoint(){this.overlayRectangle.style.left=this.startX-window.pageXOffset+"px",this.overlayRectangle.style.top=this.startY-window.pageYOffset+"px",this.overlayRectangle.style.bottom=`calc(100% - ${this.startY-window.pageYOffset}px`,this.overlayRectangle.style.right=`calc(100% - ${this.startX-window.pageXOffset}px`}inverseSelection(){const g=this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;if(this.rectCrossesBlocks&&!g)for(const g of this.stackOfSelected)this.Editor.BlockSelection.selectBlockByIndex(g);if(!this.rectCrossesBlocks&&g)for(const g of this.stackOfSelected)this.Editor.BlockSelection.unSelectBlockByIndex(g)}updateRectangleSize(){this.mouseY>=this.startY?(this.overlayRectangle.style.top=this.startY-window.pageYOffset+"px",this.overlayRectangle.style.bottom=`calc(100% - ${this.mouseY-window.pageYOffset}px`):(this.overlayRectangle.style.bottom=`calc(100% - ${this.startY-window.pageYOffset}px`,this.overlayRectangle.style.top=this.mouseY-window.pageYOffset+"px"),this.mouseX>=this.startX?(this.overlayRectangle.style.left=this.startX-window.pageXOffset+"px",this.overlayRectangle.style.right=`calc(100% - ${this.mouseX-window.pageXOffset}px`):(this.overlayRectangle.style.right=`calc(100% - ${this.startX-window.pageXOffset}px`,this.overlayRectangle.style.left=this.mouseX-window.pageXOffset+"px")
/**
   * Collects information needed to determine the behavior of the rectangle
   *
   * @returns {object} index - index next Block, leftPos - start of left border of Block, rightPos - right border
   */}genInfoForMouseSelection(){const g=document.body.offsetWidth/2,f=this.mouseY-window.pageYOffset,b=document.elementFromPoint(g,f),v=this.Editor.BlockManager.getBlockByChildNode(b);let w;void 0!==v&&(w=this.Editor.BlockManager.blocks.findIndex((g=>g.holder===v.holder)));const E=this.Editor.BlockManager.lastBlock.holder.querySelector("."+F.CSS.content),C=Number.parseInt(window.getComputedStyle(E).width,10)/2,B=g-C,T=g+C;return{index:w,leftPos:B,rightPos:T}}
/**
   * Select block with index index
   *
   * @param index - index of block in redactor
   */addBlockInSelection(g){this.rectCrossesBlocks&&this.Editor.BlockSelection.selectBlockByIndex(g),this.stackOfSelected.push(g)
/**
   * Adds a block to the selection and determines which blocks should be selected
   *
   * @param {object} index - index of new block in the reactor
   */}trySelectNextBlock(g){const f=this.stackOfSelected[this.stackOfSelected.length-1]===g,b=this.stackOfSelected.length,v=1,w=-1,E=0;if(f)return;const C=this.stackOfSelected[b-1]-this.stackOfSelected[b-2]>0;let B=E;b>1&&(B=C?v:w);const T=g>this.stackOfSelected[b-1]&&B===v,I=g<this.stackOfSelected[b-1]&&B===w,M=!(T||I||B===E);if(!M&&(g>this.stackOfSelected[b-1]||void 0===this.stackOfSelected[b-1])){let f=this.stackOfSelected[b-1]+1||g;for(f;f<=g;f++)this.addBlockInSelection(f);return}if(!M&&g<this.stackOfSelected[b-1]){for(let f=this.stackOfSelected[b-1]-1;f>=g;f--)this.addBlockInSelection(f);return}if(!M)return;let L,O=b-1;for(L=g>this.stackOfSelected[b-1]?()=>g>this.stackOfSelected[O]:()=>g<this.stackOfSelected[O];L();)this.rectCrossesBlocks&&this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[O]),this.stackOfSelected.pop(),O--}}class Jo extends S{
/**
   * @typedef {object} RendererBlocks
   * @property {string} type - tool name
   * @property {object} data - tool data
   */
/**
   * Make plugin blocks from array of plugin`s data
   *
   * @param {OutputBlockData[]} blocks - blocks to render
   */
async render(g){const f=g.map((g=>({function:()=>this.insertBlock(g)})));this.Editor.ModificationsObserver.disable();const b=await ot(f);return this.Editor.ModificationsObserver.enable(),this.Editor.UI.checkEmptiness(),b
/**
   * Get plugin instance
   * Add plugin instance to BlockManager
   * Insert block to working zone
   *
   * @param {object} item - Block data to insert
   * @returns {Promise<void>}
   */}async insertBlock(g){var f;const{Tools:b,BlockManager:w}=this.Editor,{type:E,data:C,tunes:B,id:T}=g;if(b.available.has(E))try{w.insert({id:T,tool:E,data:C,tunes:B})}catch(g){throw v(`Block «${E}» skipped because of plugins error`,"warn",{data:C,error:g}),Error(g)}else{const g={savedData:{id:T,type:E,data:C},title:E};if(b.unavailable.has(E)){const v=null==(f=b.unavailable.get(E).toolbox[0])?void 0:f.title;g.title=v||g.title}const B=w.insert({id:T,tool:b.stubTool,data:g});B.stretched=!0,v(`Tool «${E}» is not found. Check 'tools' property at your initial Editor.js config.`,"warn")}}}class Qo extends S{
/**
   * Composes new chain of Promises to fire them alternatelly
   *
   * @returns {OutputData}
   */
async save(){const{BlockManager:g,Tools:f}=this.Editor,b=g.blocks,v=[];try{b.forEach((g=>{v.push(this.getSavedData(g))}));const g=await Promise.all(v),w=await ht(g,(g=>f.blockTools.get(g).sanitizeConfig));return this.makeOutput(w)}catch(g){w("Saving failed due to the Error %o","error",g)}}
/**
   * Saves and validates
   *
   * @param {Block} block - Editor's Tool
   * @returns {ValidatedData} - Tool's validated data
   */async getSavedData(g){const f=await g.save(),b=f&&await g.validate(f.data);return{...f,isValid:b}}
/**
   * Creates output object with saved data, time and version of editor
   *
   * @param {ValidatedData} allExtractedData - data extracted from Blocks
   * @returns {OutputData}
   */makeOutput(g){let f=0;const b=[];return v("[Editor.js saving]:","groupCollapsed"),g.forEach((({id:g,tool:w,data:E,tunes:C,time:B,isValid:T})=>{if(f+=B,v(`${w.charAt(0).toUpperCase()+w.slice(1)}`,"group"),!T){v(`Block «${w}» skipped because saved data is invalid`),v(void 0,"groupEnd");return}v(E),v(void 0,"groupEnd");if(w===this.Editor.Tools.stubTool){b.push(E);return}const I={id:g,type:w,data:E,...!V(C)&&{tunes:C}};b.push(I)})),v("Total","log",f),v(void 0,"groupEnd"),{time:+new Date,blocks:b,version:"2.27.2"}}}var ro={},ao={get exports(){return ro},set exports(g){ro=g}};(function(g,f){(function(f,b){g.exports=b()})(window,(function(){return function(g){var f={};function i(b){if(f[b])return f[b].exports;var v=f[b]={i:b,l:!1,exports:{}};return g[b].call(v.exports,v,v.exports,i),v.l=!0,v.exports}return i.m=g,i.c=f,i.d=function(g,f,b){i.o(g,f)||Object.defineProperty(g,f,{enumerable:!0,get:b})},i.r=function(g){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(g,"__esModule",{value:!0})},i.t=function(g,f){if(1&f&&(g=i(g)),8&f||4&f&&"object"==typeof g&&g&&g.__esModule)return g;var b=Object.create(null);if(i.r(b),Object.defineProperty(b,"default",{enumerable:!0,value:g}),2&f&&"string"!=typeof g)for(var v in g)i.d(b,v,function(f){return g[f]}.bind(null,v));return b},i.n=function(g){var f=g&&g.__esModule?function(){return g.default}:function(){return g};return i.d(f,"a",f),f},i.o=function(g,f){return Object.prototype.hasOwnProperty.call(g,f)},i.p="/",i(i.s=4)}([function(g,f,b){var v=b(1),w=b(2);"string"==typeof(w=w.__esModule?w.default:w)&&(w=[[g.i,w,""]]);var E={insert:"head",singleton:!1};v(w,E),g.exports=w.locals||{}},function(g,f,b){var v,r=function(){return void 0===v&&(v=!!(window&&document&&document.all&&!window.atob)),v},w=function(){var g={};return function(f){if(void 0===g[f]){var b=document.querySelector(f);if(window.HTMLIFrameElement&&b instanceof window.HTMLIFrameElement)try{b=b.contentDocument.head}catch{b=null}g[f]=b}return g[f]}}(),E=[];function c(g){for(var f=-1,b=0;b<E.length;b++)if(E[b].identifier===g){f=b;break}return f}function u(g,f){for(var b={},v=[],w=0;w<g.length;w++){var C=g[w],B=f.base?C[0]+f.base:C[0],T=b[B]||0,I="".concat(B," ").concat(T);b[B]=T+1;var M=c(I),L={css:C[1],media:C[2],sourceMap:C[3]};-1!==M?(E[M].references++,E[M].updater(L)):E.push({identifier:I,updater:A(L,f),references:1}),v.push(I)}return v}function h(g){var f=document.createElement("style"),v=g.attributes||{};if(void 0===v.nonce){var E=b.nc;E&&(v.nonce=E)}if(Object.keys(v).forEach((function(g){f.setAttribute(g,v[g])})),"function"==typeof g.insert)g.insert(f);else{var C=w(g.insert||"head");if(!C)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");C.appendChild(f)}return f}var C,B=(C=[],function(g,f){return C[g]=f,C.filter(Boolean).join("\n")});function p(g,f,b,v){var w=b?"":v.media?"@media ".concat(v.media," {").concat(v.css,"}"):v.css;if(g.styleSheet)g.styleSheet.cssText=B(f,w);else{var E=document.createTextNode(w),C=g.childNodes;C[f]&&g.removeChild(C[f]),C.length?g.insertBefore(E,C[f]):g.appendChild(E)}}function k(g,f,b){var v=b.css,w=b.media,E=b.sourceMap;if(w?g.setAttribute("media",w):g.removeAttribute("media"),E&&btoa&&(v+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(E))))," */")),g.styleSheet)g.styleSheet.cssText=v;else{for(;g.firstChild;)g.removeChild(g.firstChild);g.appendChild(document.createTextNode(v))}}var T=null,I=0;function A(g,f){var b,v,w;if(f.singleton){var E=I++;b=T||(T=h(f)),v=p.bind(null,b,E,!1),w=p.bind(null,b,E,!0)}else b=h(f),v=k.bind(null,b,f),w=function(){(function(g){if(null===g.parentNode)return!1;g.parentNode.removeChild(g)})(b)};return v(g),function(f){if(f){if(f.css===g.css&&f.media===g.media&&f.sourceMap===g.sourceMap)return;v(g=f)}else w()}}g.exports=function(g,f){(f=f||{}).singleton||"boolean"==typeof f.singleton||(f.singleton=r());var b=u(g=g||[],f);return function(g){if(g=g||[],"[object Array]"===Object.prototype.toString.call(g)){for(var v=0;v<b.length;v++){var w=c(b[v]);E[w].references--}for(var C=u(g,f),B=0;B<b.length;B++){var T=c(b[B]);0===E[T].references&&(E[T].updater(),E.splice(T,1))}b=C}}}},function(g,f,b){(f=b(3)(!1)).push([g.i,".ce-paragraph {\n    line-height: 1.6em;\n    outline: none;\n}\n\n.ce-paragraph[data-placeholder]:empty::before{\n  content: attr(data-placeholder);\n  color: #707684;\n  font-weight: normal;\n  opacity: 0;\n}\n\n/** Show placeholder at the first paragraph if Editor is empty */\n.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty::before {\n  opacity: 1;\n}\n\n.codex-editor--toolbox-opened .ce-block:first-child .ce-paragraph[data-placeholder]:empty::before,\n.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:focus::before {\n  opacity: 0;\n}\n\n.ce-paragraph p:first-of-type{\n    margin-top: 0;\n}\n\n.ce-paragraph p:last-of-type{\n    margin-bottom: 0;\n}\n",""]),g.exports=f},function(g,f,b){g.exports=function(g){var f=[];return f.toString=function(){return this.map((function(f){var b=function(g,f){var b=g[1]||"",v=g[3];if(!v)return b;if(f&&"function"==typeof btoa){var w=(C=v,B=btoa(unescape(encodeURIComponent(JSON.stringify(C)))),T="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(B),"/*# ".concat(T," */")),E=v.sources.map((function(g){return"/*# sourceURL=".concat(v.sourceRoot||"").concat(g," */")}));return[b].concat(E).concat([w]).join("\n")}var C,B,T;return[b].join("\n")}(f,g);return f[2]?"@media ".concat(f[2]," {").concat(b,"}"):b})).join("")},f.i=function(g,b,v){"string"==typeof g&&(g=[[null,g,""]]);var w={};if(v)for(var E=0;E<this.length;E++){var C=this[E][0];null!=C&&(w[C]=!0)}for(var B=0;B<g.length;B++){var T=[].concat(g[B]);v&&w[T[0]]||(b&&(T[2]?T[2]="".concat(b," and ").concat(T[2]):T[2]=b),f.push(T))}},f}},function(g,f,b){b.r(f),b.d(f,"default",(function(){return v})),b(0);function n(g,f){for(var b=0;b<f.length;b++){var v=f[b];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(g,v.key,v)}}function r(g,f,b){return f&&n(g.prototype,f),b&&n(g,b),g
/**
       * Base Paragraph Block for the Editor.js.
       * Represents simple paragraph
       *
       * @author CodeX (team@codex.so)
       * @copyright CodeX 2018
       * @license The MIT License (MIT)
       */}var v=function(){function l(g){var f=g.data,b=g.config,v=g.api,w=g.readOnly;(function(g,f){if(!(g instanceof f))throw new TypeError("Cannot call a class as a function")})(this,l),this.api=v,this.readOnly=w,this._CSS={block:this.api.styles.block,wrapper:"ce-paragraph"},this.readOnly||(this.onKeyUp=this.onKeyUp.bind(this)),this._placeholder=b.placeholder?b.placeholder:l.DEFAULT_PLACEHOLDER,this._data={},this._element=this.drawView(),this._preserveBlank=void 0!==b.preserveBlank&&b.preserveBlank,this.data=f}return r(l,null,[{key:"DEFAULT_PLACEHOLDER",get:function(){return""}}]),r(l,[{key:"onKeyUp",value:function(g){"Backspace"!==g.code&&"Delete"!==g.code||""===this._element.textContent&&(this._element.innerHTML="")}},{key:"drawView",value:function(){var g=document.createElement("DIV");return g.classList.add(this._CSS.wrapper,this._CSS.block),g.contentEditable=!1,g.dataset.placeholder=this.api.i18n.t(this._placeholder),this.readOnly||(g.contentEditable=!0,g.addEventListener("keyup",this.onKeyUp)),g}},{key:"render",value:function(){return this._element}},{key:"merge",value:function(g){var f={text:this.data.text+g.text};this.data=f}},{key:"validate",value:function(g){return!(""===g.text.trim()&&!this._preserveBlank)}},{key:"save",value:function(g){return{text:g.innerHTML}}},{key:"onPaste",value:function(g){var f={text:g.detail.data.innerHTML};this.data=f}},{key:"data",get:function(){var g=this._element.innerHTML;return this._data.text=g,this._data},set:function(g){this._data=g||{},this._element.innerHTML=this._data.text||""}}],[{key:"conversionConfig",get:function(){return{export:"text",import:"text"}}},{key:"sanitize",get:function(){return{text:{br:!0}}}},{key:"isReadOnlySupported",get:function(){return!0}},{key:"pasteConfig",get:function(){return{tags:["P"]}}},{key:"toolbox",get:function(){return{icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>',title:"Text"}}}]),l}()}]).default}))})(ao);const ko=xe(ro);class $e{constructor(){this.commandName="bold",this.CSS={button:"ce-inline-tool",buttonActive:"ce-inline-tool--active",buttonModifier:"ce-inline-tool--bold"},this.nodes={button:void 0}
/**
   * Sanitizer Rule
   * Leave <b> tags
   *
   * @returns {object}
   */}static get sanitize(){return{b:{}}}render(){return this.nodes.button=document.createElement("button"),this.nodes.button.type="button",this.nodes.button.classList.add(this.CSS.button,this.CSS.buttonModifier),this.nodes.button.innerHTML=me,this.nodes.button}surround(){document.execCommand(this.commandName)}
/**
   * Check selection and set activated state to button if there are <b> tag
   *
   * @returns {boolean}
   */checkState(){const g=document.queryCommandState(this.commandName);return this.nodes.button.classList.toggle(this.CSS.buttonActive,g),g
/**
   * Set a shortcut
   *
   * @returns {boolean}
   */}get shortcut(){return"CMD+B"}}$e.isInline=!0;$e.title="Bold";class We{constructor(){this.commandName="italic",this.CSS={button:"ce-inline-tool",buttonActive:"ce-inline-tool--active",buttonModifier:"ce-inline-tool--italic"},this.nodes={button:null}
/**
   * Sanitizer Rule
   * Leave <i> tags
   *
   * @returns {object}
   */}static get sanitize(){return{i:{}}}render(){return this.nodes.button=document.createElement("button"),this.nodes.button.type="button",this.nodes.button.classList.add(this.CSS.button,this.CSS.buttonModifier),this.nodes.button.innerHTML=Me,this.nodes.button}surround(){document.execCommand(this.commandName)}checkState(){const g=document.queryCommandState(this.commandName);return this.nodes.button.classList.toggle(this.CSS.buttonActive,g),g}get shortcut(){return"CMD+I"}}We.isInline=!0;We.title="Italic";class Ye{
/**
   * @param api - Editor.js API
   */
constructor({api:g}){this.commandLink="createLink",this.commandUnlink="unlink",this.ENTER_KEY=13,this.CSS={button:"ce-inline-tool",buttonActive:"ce-inline-tool--active",buttonModifier:"ce-inline-tool--link",buttonUnlink:"ce-inline-tool--unlink",input:"ce-inline-tool-input",inputShowed:"ce-inline-tool-input--showed"},this.nodes={button:null,input:null},this.inputOpened=!1,this.toolbar=g.toolbar,this.inlineToolbar=g.inlineToolbar,this.notifier=g.notifier,this.i18n=g.i18n,this.selection=new m
/**
   * Sanitizer Rule
   * Leave <a> tags
   *
   * @returns {object}
   */}static get sanitize(){return{a:{href:!0,target:"_blank",rel:"nofollow"}}}render(){return this.nodes.button=document.createElement("button"),this.nodes.button.type="button",this.nodes.button.classList.add(this.CSS.button,this.CSS.buttonModifier),this.nodes.button.innerHTML=Le,this.nodes.button}renderActions(){return this.nodes.input=document.createElement("input"),this.nodes.input.placeholder=this.i18n.t("Add a link"),this.nodes.input.classList.add(this.CSS.input),this.nodes.input.addEventListener("keydown",(g=>{g.keyCode===this.ENTER_KEY&&this.enterPressed(g)})),this.nodes.input
/**
   * Handle clicks on the Inline Toolbar icon
   *
   * @param {Range} range - range to wrap with link
   */}surround(g){if(g){this.inputOpened?(this.selection.restore(),this.selection.removeFakeBackground()):(this.selection.setFakeBackground(),this.selection.save());const g=this.selection.findParentTag("A");if(g){this.selection.expandToTag(g),this.unlink(),this.closeActions(),this.checkState(),this.toolbar.close();return}}this.toggleActions()}checkState(){const g=this.selection.findParentTag("A");if(g){this.nodes.button.innerHTML=He,this.nodes.button.classList.add(this.CSS.buttonUnlink),this.nodes.button.classList.add(this.CSS.buttonActive),this.openActions();const f=g.getAttribute("href");this.nodes.input.value="null"!==f?f:"",this.selection.save()}else this.nodes.button.innerHTML=Le,this.nodes.button.classList.remove(this.CSS.buttonUnlink),this.nodes.button.classList.remove(this.CSS.buttonActive);return!!g}clear(){this.closeActions()}get shortcut(){return"CMD+K"}toggleActions(){this.inputOpened?this.closeActions(!1):this.openActions(!0)}
/**
   * @param {boolean} needFocus - on link creation we need to focus input. On editing - nope.
   */openActions(g=!1){this.nodes.input.classList.add(this.CSS.inputShowed),g&&this.nodes.input.focus(),this.inputOpened=!0
/**
   * Close input
   *
   * @param {boolean} clearSavedSelection — we don't need to clear saved selection
   *                                        on toggle-clicks on the icon of opened Toolbar
   */}closeActions(g=!0){if(this.selection.isFakeBackgroundEnabled){const g=new m;g.save(),this.selection.restore(),this.selection.removeFakeBackground(),g.restore()}this.nodes.input.classList.remove(this.CSS.inputShowed),this.nodes.input.value="",g&&this.selection.clearSaved(),this.inputOpened=!1
/**
   * Enter pressed on input
   *
   * @param {KeyboardEvent} event - enter keydown event
   */}enterPressed(g){let f=this.nodes.input.value||"";f.trim()?this.validateURL(f)?(f=this.prepareLink(f),this.selection.restore(),this.selection.removeFakeBackground(),this.insertLink(f),g.preventDefault(),g.stopPropagation(),g.stopImmediatePropagation(),this.selection.collapseToEnd(),this.inlineToolbar.close()
/**
   * Detects if passed string is URL
   *
   * @param {string} str - string to validate
   * @returns {boolean}
   */):(this.notifier.show({message:"Pasted link is not valid.",style:"error"}),v("Incorrect Link pasted","warn",f)):(this.selection.restore(),this.unlink(),g.preventDefault(),this.closeActions())}validateURL(g){return!/\s/.test(g)}
/**
   * Process link before injection
   * - sanitize
   * - add protocol for links like 'google.com'
   *
   * @param {string} link - raw user input
   */prepareLink(g){return g=g.trim(),g=this.addProtocol(g),g
/**
   * Add 'http' protocol to the links like 'vc.ru', 'google.com'
   *
   * @param {string} link - string to process
   */}addProtocol(g){if(/^(\w+):(\/\/)?/.test(g))return g;const f=/^\/[^/\s]/.test(g),b="#"===g.substring(0,1),v=/^\/\/[^/\s]/.test(g);return!f&&!b&&!v&&(g="http://"+g),g
/**
   * Inserts <a> tag with "href"
   *
   * @param {string} link - "href" value
   */}insertLink(g){const f=this.selection.findParentTag("A");f&&this.selection.expandToTag(f),document.execCommand(this.commandLink,!1,g)}unlink(){document.execCommand(this.commandUnlink)}}Ye.isInline=!0;Ye.title="Link";class yt{
/**
   * @param options - constructor options
   * @param options.data - stub tool data
   * @param options.api - Editor.js API
   */
constructor({data:g,api:f}){this.CSS={wrapper:"ce-stub",info:"ce-stub__info",title:"ce-stub__title",subtitle:"ce-stub__subtitle"},this.api=f,this.title=g.title||this.api.i18n.t("Error"),this.subtitle=this.api.i18n.t("The block can not be displayed correctly."),this.savedData=g.savedData,this.wrapper=this.make()
/**
   * Returns stub holder
   *
   * @returns {HTMLElement}
   */}render(){return this.wrapper}
/**
   * Return original Tool data
   *
   * @returns {BlockToolData}
   */save(){return this.savedData}
/**
   * Create Tool html markup
   *
   * @returns {HTMLElement}
   */make(){const g=d.make("div",this.CSS.wrapper),f='<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52"><path fill="#D76B6B" fill-rule="nonzero" d="M26 52C11.64 52 0 40.36 0 26S11.64 0 26 0s26 11.64 26 26-11.64 26-26 26zm0-3.25c12.564 0 22.75-10.186 22.75-22.75S38.564 3.25 26 3.25 3.25 13.436 3.25 26 13.436 48.75 26 48.75zM15.708 33.042a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334zm23.834 0a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334zm-15.875 5.452a1.083 1.083 0 1 1-1.834-1.155c1.331-2.114 3.49-3.179 6.334-3.179 2.844 0 5.002 1.065 6.333 3.18a1.083 1.083 0 1 1-1.833 1.154c-.913-1.45-2.366-2.167-4.5-2.167s-3.587.717-4.5 2.167z"/></svg>',b=d.make("div",this.CSS.info),v=d.make("div",this.CSS.title,{textContent:this.title}),w=d.make("div",this.CSS.subtitle,{textContent:this.subtitle});return g.innerHTML=f,b.appendChild(v),b.appendChild(w),g.appendChild(b),g}}yt.isReadOnlySupported=!0;class oi extends Ue{constructor(){super(...arguments),this.type=xt.Inline}get title(){return this.constructable[Mt.Title]}create(){return new this.constructable({api:this.api.getMethodsForTool(this),config:this.settings})}}class ii extends Ue{constructor(){super(...arguments),this.type=xt.Tune
/**
   * Constructs new BlockTune instance from constructable
   *
   * @param data - Tune data
   * @param block - Block API object
   */}create(g,f){return new this.constructable({api:this.api.getMethodsForTool(this),config:this.settings,block:f,data:g})}}class U extends Map{get blockTools(){const g=Array.from(this.entries()).filter((([,g])=>g.isBlock()));return new U(g)}get inlineTools(){const g=Array.from(this.entries()).filter((([,g])=>g.isInline()));return new U(g)}get blockTunes(){const g=Array.from(this.entries()).filter((([,g])=>g.isTune()));return new U(g)}get internalTools(){const g=Array.from(this.entries()).filter((([,g])=>g.isInternal));return new U(g)}get externalTools(){const g=Array.from(this.entries()).filter((([,g])=>!g.isInternal));return new U(g)}}var vo=Object.defineProperty,Eo=Object.getOwnPropertyDescriptor,Et=(g,f,b,v)=>{for(var w,E=v>1?void 0:v?Eo(f,b):f,C=g.length-1;C>=0;C--)(w=g[C])&&(E=(v?w(f,b,E):w(E))||E);return v&&E&&vo(f,b,E),E};class Ke extends Ue{constructor(){super(...arguments),this.type=xt.Block,this.inlineTools=new U,this.tunes=new U
/**
   * Creates new Tool instance
   *
   * @param data - Tool data
   * @param block - BlockAPI for current Block
   * @param readOnly - True if Editor is in read-only mode
   */}create(g,f,b){return new this.constructable({data:g,block:f,readOnly:b,api:this.api.getMethodsForTool(this),config:this.settings})}get isReadOnlySupported(){return!0===this.constructable[_t.IsReadOnlySupported]}get isLineBreaksEnabled(){return this.constructable[_t.IsEnabledLineBreaks]}get toolbox(){const g=this.constructable[_t.Toolbox],f=this.config[wt.Toolbox];if(!V(g)&&!1!==f)return f?Array.isArray(g)?Array.isArray(f)?f.map(((f,b)=>{const v=g[b];return v?{...v,...f}:f})):[f]:Array.isArray(f)?f:[{...g,...f}]:Array.isArray(g)?g:[g]}get conversionConfig(){return this.constructable[_t.ConversionConfig]}get enabledInlineTools(){return this.config[wt.EnabledInlineTools]||!1}get enabledBlockTunes(){return this.config[wt.EnabledBlockTunes]}get pasteConfig(){return this.constructable[_t.PasteConfig]??{}}get sanitizeConfig(){const g=super.sanitizeConfig,f=this.baseSanitizeConfig;if(V(g))return f;const b={};for(const v in g)if(Object.prototype.hasOwnProperty.call(g,v)){const w=g[v];j(w)?b[v]=Object.assign({},f,w):b[v]=w}return b}get baseSanitizeConfig(){const g={};return Array.from(this.inlineTools.values()).forEach((f=>Object.assign(g,f.sanitizeConfig))),Array.from(this.tunes.values()).forEach((f=>Object.assign(g,f.sanitizeConfig))),g}}Et([ae],Ke.prototype,"sanitizeConfig",1);Et([ae],Ke.prototype,"baseSanitizeConfig",1);class ri{
/**
   * @class
   * @param config - tools config
   * @param editorConfig - EditorJS config
   * @param api - EditorJS API module
   */
constructor(g,f,b){this.api=b,this.config=g,this.editorConfig=f
/**
   * Returns Tool object based on it's type
   *
   * @param name - tool name
   */}get(g){const{class:f,isInternal:b=!1,...v}=this.config[g],w=this.getConstructor(f);return new w({name:g,constructable:f,config:v,api:this.api,isDefault:g===this.editorConfig.defaultBlock,defaultPlaceholder:this.editorConfig.placeholder,isInternal:b})}
/**
   * Find appropriate Tool object constructor for Tool constructable
   *
   * @param constructable - Tools constructable
   */getConstructor(g){switch(!0){case g[Mt.IsInline]:return oi;case g[Lt.IsTune]:return ii;default:return Ke}}}class Bt{
/**
   * MoveDownTune constructor
   *
   * @param {API} api — Editor's API
   */
constructor({api:g}){this.CSS={animation:"wobble"},this.api=g}render(){return{icon:be,title:this.api.i18n.t("Move down"),onActivate:()=>this.handleClick(),name:"move-down"}}handleClick(){const g=this.api.blocks.getCurrentBlockIndex(),f=this.api.blocks.getBlockByIndex(g+1);if(!f)throw new Error("Unable to move Block down since it is already the last");const b=f.holder,v=b.getBoundingClientRect();let w=Math.abs(window.innerHeight-b.offsetHeight);v.top<window.innerHeight&&(w=window.scrollY+b.offsetHeight),window.scrollTo(0,w),this.api.blocks.move(g+1),this.api.toolbar.toggleBlockSettings(!0)}}Bt.isTune=!0;class Ct{
/**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
constructor({api:g}){this.api=g}render(){return{icon:Ee,title:this.api.i18n.t("Delete"),name:"delete",confirmation:{title:this.api.i18n.t("Click to delete"),onActivate:()=>this.handleClick()}}}handleClick(){this.api.blocks.delete()}}Ct.isTune=!0;class Tt{
/**
   * MoveUpTune constructor
   *
   * @param {API} api - Editor's API
   */
constructor({api:g}){this.CSS={animation:"wobble"},this.api=g}render(){return{icon:ye,title:this.api.i18n.t("Move up"),onActivate:()=>this.handleClick(),name:"move-up"}}handleClick(){const g=this.api.blocks.getCurrentBlockIndex(),f=this.api.blocks.getBlockByIndex(g),b=this.api.blocks.getBlockByIndex(g-1);if(0===g||!f||!b)throw new Error("Unable to move Block up since it is already the first");const v=f.holder,w=b.holder,E=v.getBoundingClientRect(),C=w.getBoundingClientRect();let B;B=C.top>0?Math.abs(E.top)-Math.abs(C.top):Math.abs(E.top)+C.height,window.scrollBy(0,-1*B),this.api.blocks.move(g-1),this.api.toolbar.toggleBlockSettings(!0)}}Tt.isTune=!0;var So=Object.defineProperty,Co=Object.getOwnPropertyDescriptor,ci=(g,f,b,v)=>{for(var w,E=v>1?void 0:v?Co(f,b):f,C=g.length-1;C>=0;C--)(w=g[C])&&(E=(v?w(f,b,E):w(E))||E);return v&&E&&So(f,b,E),E};class St extends S{constructor(){super(...arguments),this.stubTool="stub",this.toolsAvailable=new U,this.toolsUnavailable=new U}get available(){return this.toolsAvailable}get unavailable(){return this.toolsUnavailable}get inlineTools(){return this.available.inlineTools}get blockTools(){return this.available.blockTools}
/**
   * Return available Block Tunes
   *
   * @returns {object} - object of Inline Tool's classes
   */get blockTunes(){return this.available.blockTunes}get defaultTool(){return this.blockTools.get(this.config.defaultBlock)}get internal(){return this.available.internalTools}
/**
   * Creates instances via passed or default configuration
   *
   * @returns {Promise<void>}
   */async prepare(){if(this.validateTools(),this.config.tools=Se({},this.internalTools,this.config.tools),!Object.prototype.hasOwnProperty.call(this.config,"tools")||0===Object.keys(this.config.tools).length)throw Error("Can't start without tools");const g=this.prepareConfig();this.factory=new ri(g,this.config,this.Editor.API);const f=this.getListOfPrepareFunctions(g);if(0===f.length)return Promise.resolve();await ot(f,(g=>{this.toolPrepareMethodSuccess(g)}),(g=>{this.toolPrepareMethodFallback(g)})),this.prepareBlockTools()}getAllInlineToolsSanitizeConfig(){const g={};return Array.from(this.inlineTools.values()).forEach((f=>{Object.assign(g,f.sanitizeConfig)})),g}destroy(){Object.values(this.available).forEach((async g=>{D(g.reset)&&await g.reset()}))}get internalTools(){return{bold:{class:$e,isInternal:!0},italic:{class:We,isInternal:!0},link:{class:Ye,isInternal:!0},paragraph:{class:ko,inlineToolbar:!0,isInternal:!0},stub:{class:yt,isInternal:!0},moveUp:{class:Tt,isInternal:!0},delete:{class:Ct,isInternal:!0},moveDown:{class:Bt,isInternal:!0}}}
/**
   * Tool prepare method success callback
   *
   * @param {object} data - append tool to available list
   */toolPrepareMethodSuccess(g){const f=this.factory.get(g.toolName);if(f.isInline()){const g=["render","surround","checkState"].filter((g=>!f.create()[g]));if(g.length){v(`Incorrect Inline Tool: ${f.name}. Some of required methods is not implemented %o`,"warn",g),this.toolsUnavailable.set(f.name,f);return}}this.toolsAvailable.set(f.name,f)}
/**
   * Tool prepare method fail callback
   *
   * @param {object} data - append tool to unavailable list
   */toolPrepareMethodFallback(g){this.toolsUnavailable.set(g.toolName,this.factory.get(g.toolName))}
/**
   * Binds prepare function of plugins with user or default config
   *
   * @returns {Array} list of functions that needs to be fired sequentially
   * @param config - tools config
   */getListOfPrepareFunctions(g){const f=[];return Object.entries(g).forEach((([g,b])=>{f.push({function:D(b.class.prepare)?b.class.prepare:()=>{},data:{toolName:g,config:b.config}})})),f}prepareBlockTools(){Array.from(this.blockTools.values()).forEach((g=>{this.assignInlineToolsToBlockTool(g),this.assignBlockTunesToBlockTool(g)}))}
/**
   * Assign enabled Inline Tools for Block Tool
   *
   * @param tool - Block Tool
   */assignInlineToolsToBlockTool(g){if(!1!==this.config.inlineToolbar){if(!0===g.enabledInlineTools){g.inlineTools=new U(Array.isArray(this.config.inlineToolbar)?this.config.inlineToolbar.map((g=>[g,this.inlineTools.get(g)])):Array.from(this.inlineTools.entries()));return}Array.isArray(g.enabledInlineTools)&&(g.inlineTools=new U(g.enabledInlineTools.map((g=>[g,this.inlineTools.get(g)]))))}}
/**
   * Assign enabled Block Tunes for Block Tool
   *
   * @param tool — Block Tool
   */assignBlockTunesToBlockTool(g){if(!1!==g.enabledBlockTunes){if(Array.isArray(g.enabledBlockTunes)){const f=new U(g.enabledBlockTunes.map((g=>[g,this.blockTunes.get(g)])));g.tunes=new U([...f,...this.blockTunes.internalTools]);return}if(Array.isArray(this.config.tunes)){const f=new U(this.config.tunes.map((g=>[g,this.blockTunes.get(g)])));g.tunes=new U([...f,...this.blockTunes.internalTools]);return}g.tunes=this.blockTunes.internalTools}}validateTools(){for(const g in this.config.tools)if(Object.prototype.hasOwnProperty.call(this.config.tools,g)){if(g in this.internalTools)return;const f=this.config.tools[g];if(!D(f)&&!D(f.class))throw Error(`Tool «${g}» must be a constructor function or an object with function in the «class» property`)}}prepareConfig(){const g={};for(const f in this.config.tools)j(this.config.tools[f])?g[f]=this.config.tools[f]:g[f]={class:this.config.tools[f]};return g}}ci([ae],St.prototype,"getAllInlineToolsSanitizeConfig",1);const Bo=':root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide,.codex-editor__redactor--hidden{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor__loader{position:relative;height:30vh}.codex-editor__loader:before{content:"";position:absolute;left:50%;top:50%;width:30px;height:30px;margin-top:-15px;margin-left:-15px;border-radius:50%;border:2px solid rgba(201,201,204,.48);border-top-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-animation:editor-loader-spin .8s infinite linear;animation:editor-loader-spin .8s infinite linear;will-change:transform}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}::-moz-selection{background-color:#d4ecff}::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}@-webkit-keyframes editor-loader-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes editor-loader-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;-webkit-transform:translateX(-50%) translateY(8px) scale(.94);transform:translate(-50%) translateY(8px) scale(.94);opacity:0;visibility:hidden;-webkit-transition:opacity .25s ease,-webkit-transform .15s ease;transition:opacity .25s ease,-webkit-transform .15s ease;transition:transform .15s ease,opacity .25s ease;transition:transform .15s ease,opacity .25s ease,-webkit-transform .15s ease;will-change:transform,opacity;top:0;left:0;z-index:3}.ce-inline-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-inline-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-inline-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:translateX(-50%);transform:translate(-50%)}.ce-inline-toolbar--left-oriented{-webkit-transform:translateX(-23px) translateY(8px) scale(.94);transform:translate(-23px) translateY(8px) scale(.94)}.ce-inline-toolbar--left-oriented.ce-inline-toolbar--showed{-webkit-transform:translateX(-23px);transform:translate(-23px)}.ce-inline-toolbar--right-oriented{-webkit-transform:translateX(-100%) translateY(8px) scale(.94);transform:translate(-100%) translateY(8px) scale(.94);margin-left:23px}.ce-inline-toolbar--right-oriented.ce-inline-toolbar--showed{-webkit-transform:translateX(-100%);transform:translate(-100%)}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;border-radius:0;line-height:normal}.ce-inline-tool svg{width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#eff2f5}}.ce-inline-tool--active{color:#388ae5}.ce-inline-tool--focused{background:rgba(34,186,255,.08)!important}.ce-inline-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-inline-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{outline:none;border:0;border-radius:0 0 4px 4px;margin:0;font-size:13px;padding:10px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;border-top:1px solid rgba(201,201,204,.48);-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-conversion-toolbar{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;opacity:0;visibility:hidden;will-change:transform,opacity;-webkit-transition:opacity .1s ease,-webkit-transform .1s ease;transition:opacity .1s ease,-webkit-transform .1s ease;transition:transform .1s ease,opacity .1s ease;transition:transform .1s ease,opacity .1s ease,-webkit-transform .1s ease;-webkit-transform:translateY(-8px);transform:translateY(-8px);left:-1px;width:150px;margin-top:5px;-webkit-box-sizing:content-box;box-sizing:content-box}.ce-conversion-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-conversion-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-conversion-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:none;transform:none}.ce-conversion-toolbar [hidden]{display:none!important}.ce-conversion-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-conversion-toolbar__label{color:#707684;font-size:11px;font-weight:500;letter-spacing:.33px;padding:10px 10px 5px;text-transform:uppercase}.ce-conversion-tool{display:-webkit-box;display:-ms-flexbox;display:flex;padding:5px 10px;font-size:14px;line-height:20px;font-weight:500;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-conversion-tool--hidden{display:none}.ce-conversion-tool--focused{background:rgba(34,186,255,.08)!important}.ce-conversion-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-conversion-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-conversion-tool:hover{background:#eff2f5}.ce-conversion-tool__icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px rgba(201,201,204,.48);box-shadow:0 0 0 1px #c9c9cc7a;border-radius:5px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background:#fff;-webkit-box-sizing:content-box;box-sizing:content-box;-ms-flex-negative:0;flex-shrink:0;margin-right:10px}.ce-conversion-tool__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-conversion-tool__icon{width:36px;height:36px;border-radius:8px}.ce-conversion-tool__icon svg{width:28px;height:28px}}.ce-conversion-tool--last{margin-right:0!important}.ce-conversion-tool--active{color:#388ae5!important}.ce-conversion-tool--active{-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-settings__button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;line-height:32px}.ce-settings__button svg{width:20px;height:20px}@media (max-width: 650px){.ce-settings__button svg{width:28px;height:28px}}@media (hover: hover){.ce-settings__button:hover{background-color:#eff2f5}}.ce-settings__button--active{color:#388ae5}.ce-settings__button--focused{background:rgba(34,186,255,.08)!important}.ce-settings__button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-settings__button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-settings__button:not(:nth-child(3n+3)){margin-right:3px}.ce-settings__button:nth-child(n+4){margin-top:3px}.ce-settings__button--disabled{cursor:not-allowed!important}.ce-settings__button--disabled{opacity:.3}.ce-settings__button--selected{color:#388ae5}@media (min-width: 651px){.codex-editor--narrow .ce-settings .ce-popover{right:0;left:auto;left:initial}}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@media (min-width: 651px){.codex-editor--narrow .ce-block--focused{margin-right:-50px;padding-right:50px}}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button svg{width:20px;height:20px}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;padding:3.5em 0;margin:17px 0;border-radius:3px;background:#fcf7f7;color:#b46262}.ce-stub__info{margin-left:20px}.ce-stub__title{margin-bottom:3px;font-weight:600;font-size:18px;text-transform:capitalize}.ce-stub__subtitle{font-size:16px}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0px;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:rgba(232,232,235,.49);border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #e8e8eb;--color-shadow: rgba(13,20,33,.13);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #eff2f5;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:0;top:calc(100% + var(--offset-from-target));background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}.ce-popover--open-top{top:calc(-1 * (var(--offset-from-target) + var(--popover-height)))}@media (max-width: 650px){.ce-popover{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}.ce-popover .ce-popover__search{display:none}}.ce-popover__search,.ce-popover__custom-content:not(:empty){margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover__custom-content:not(:empty){padding:4px}@media (min-width: 651px){.ce-popover__custom-content:not(:empty){padding:0}}.ce-popover__custom-content--hidden{display:none}.ce-popover-item{--border-radius: 6px;--icon-size: 20px;--icon-size-mobile: 28px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:3px;color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{border-radius:5px;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px var(--color-border-icon);box-shadow:0 0 0 1px var(--color-border-icon);background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:10px}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:var(--icon-size-mobile);height:var(--icon-size-mobile)}}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;margin-left:auto;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;margin-bottom:-2px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--active .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--disabled .ce-popover-item__icon{-webkit-box-shadow:0 0 0 1px var(--color-border-icon-disabled);box-shadow:0 0 0 1px var(--color-border-icon-disabled)}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--focused:not(.ce-popover-item--no-focus){-webkit-box-shadow:inset 0 0 0px 1px var(--color-shadow-item-focus);box-shadow:inset 0 0 0 1px var(--color-shadow-item-focus)}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}.ce-popover-item:hover .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__icon{color:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}.ce-popover-item--confirmation .ce-popover-item__icon,.ce-popover-item--active .ce-popover-item__icon,.ce-popover-item--focused .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}\n';class hi extends S{constructor(){super(...arguments),this.isMobile=!1,this.contentRectCache=void 0,this.resizeDebouncer=Pt((()=>{this.windowResize()}),200)
/**
   * Editor.js UI CSS class names
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */}get CSS(){return{editorWrapper:"codex-editor",editorWrapperNarrow:"codex-editor--narrow",editorZone:"codex-editor__redactor",editorZoneHidden:"codex-editor__redactor--hidden",editorLoader:"codex-editor__loader",editorEmpty:"codex-editor--empty",editorRtlFix:"codex-editor--rtl"}}
/**
   * Return Width of center column of Editor
   *
   * @returns {DOMRect}
   */get contentRect(){if(this.contentRectCache)return this.contentRectCache;const g=this.nodes.wrapper.querySelector(`.${F.CSS.content}`);return g?(this.contentRectCache=g.getBoundingClientRect(),this.contentRectCache):{width:650,left:0,right:0}}addLoader(){this.nodes.loader=d.make("div",this.CSS.editorLoader),this.nodes.wrapper.prepend(this.nodes.loader),this.nodes.redactor.classList.add(this.CSS.editorZoneHidden)}removeLoader(){this.nodes.loader.remove(),this.nodes.redactor.classList.remove(this.CSS.editorZoneHidden)}async prepare(){this.checkIsMobile(),this.make(),this.addLoader(),this.loadStyles()
/**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - removes all listeners from main UI module elements
   *
   * if readOnly is false:
   *  - enables all listeners to UI module elements
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */}toggleReadOnly(g){g?this.disableModuleBindings():this.enableModuleBindings()}checkEmptiness(){const{BlockManager:g}=this.Editor;this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty,g.isEditorEmpty)}
/**
   * Check if one of Toolbar is opened
   * Used to prevent global keydowns (for example, Enter) conflicts with Enter-on-toolbar
   *
   * @returns {boolean}
   */get someToolbarOpened(){const{Toolbar:g,BlockSettings:f,InlineToolbar:b,ConversionToolbar:v}=this.Editor;return f.opened||b.opened||v.opened||g.toolbox.opened}get someFlipperButtonFocused(){return!!this.Editor.Toolbar.toolbox.hasFocus()||Object.entries(this.Editor).filter((([g,f])=>f.flipper instanceof G)).some((([g,f])=>f.flipper.hasFocus()))}destroy(){this.nodes.holder.innerHTML=""}closeAllToolbars(){const{Toolbar:g,BlockSettings:f,InlineToolbar:b,ConversionToolbar:v}=this.Editor;f.close(),b.close(),v.close(),g.toolbox.close()}checkIsMobile(){this.isMobile=window.innerWidth<E}make(){this.nodes.holder=d.getHolder(this.config.holder),this.nodes.wrapper=d.make("div",[this.CSS.editorWrapper,...this.isRtl?[this.CSS.editorRtlFix]:[]]),this.nodes.redactor=d.make("div",this.CSS.editorZone),this.nodes.holder.offsetWidth<this.contentRect.width&&this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow),this.nodes.redactor.style.paddingBottom=this.config.minHeight+"px",this.nodes.wrapper.appendChild(this.nodes.redactor),this.nodes.holder.appendChild(this.nodes.wrapper)}loadStyles(){const g="editor-js-styles";if(d.get(g))return;const f=d.make("style",null,{id:g,textContent:Bo.toString()});d.prepend(document.head,f)}enableModuleBindings(){this.readOnlyMutableListeners.on(this.nodes.redactor,"click",(g=>{this.redactorClicked(g)}),!1),this.readOnlyMutableListeners.on(this.nodes.redactor,"mousedown",(g=>{this.documentTouched(g)}),!0),this.readOnlyMutableListeners.on(this.nodes.redactor,"touchstart",(g=>{this.documentTouched(g)}),!0),this.readOnlyMutableListeners.on(document,"keydown",(g=>{this.documentKeydown(g)}),!0),this.readOnlyMutableListeners.on(document,"mousedown",(g=>{this.documentClicked(g)}),!0),this.readOnlyMutableListeners.on(document,"selectionchange",(()=>{this.selectionChanged()}),!0),this.readOnlyMutableListeners.on(window,"resize",(()=>{this.resizeDebouncer()}),{passive:!0}),this.watchBlockHoveredEvents()}watchBlockHoveredEvents(){let g;this.readOnlyMutableListeners.on(this.nodes.redactor,"mousemove",Te((f=>{const b=f.target.closest(".ce-block");this.Editor.BlockSelection.anyBlockSelected||b&&g!==b&&(g=b,this.eventsDispatcher.emit(vt,{block:this.Editor.BlockManager.getBlockByChildNode(b)}))}),20),{passive:!0})}disableModuleBindings(){this.readOnlyMutableListeners.clearAll()}windowResize(){this.contentRectCache=null,this.checkIsMobile()
/**
   * All keydowns on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */}documentKeydown(g){switch(g.keyCode){case f.ENTER:this.enterPressed(g);break;case f.BACKSPACE:this.backspacePressed(g);break;case f.ESC:this.escapePressed(g);break;default:this.defaultBehaviour(g);break}}
/**
   * Ignore all other document's keydown events
   *
   * @param {KeyboardEvent} event - keyboard event
   */defaultBehaviour(g){const{currentBlock:f}=this.Editor.BlockManager,b=g.target.closest(`.${this.CSS.editorWrapper}`),v=g.altKey||g.ctrlKey||g.metaKey||g.shiftKey;void 0===f||null!==b?b||f&&v||(this.Editor.BlockManager.dropPointer(),this.Editor.Toolbar.close()):this.Editor.BlockEvents.keydown(g)}
/**
   * @param {KeyboardEvent} event - keyboard event
   */backspacePressed(g){const{BlockManager:f,BlockSelection:b,Caret:v}=this.Editor;if(b.anyBlockSelected&&!m.isSelectionExists){const w=f.removeSelectedBlocks();v.setToBlock(f.insertDefaultBlockAtIndex(w,!0),v.positions.START),b.clearSelection(g),g.preventDefault(),g.stopPropagation(),g.stopImmediatePropagation()}}
/**
   * Escape pressed
   * If some of Toolbar components are opened, then close it otherwise close Toolbar
   *
   * @param {Event} event - escape keydown event
   */escapePressed(g){this.Editor.BlockSelection.clearSelection(g),this.Editor.Toolbar.toolbox.opened?(this.Editor.Toolbar.toolbox.close(),this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock)):this.Editor.BlockSettings.opened?this.Editor.BlockSettings.close():this.Editor.ConversionToolbar.opened?this.Editor.ConversionToolbar.close():this.Editor.InlineToolbar.opened?this.Editor.InlineToolbar.close():this.Editor.Toolbar.close()
/**
   * Enter pressed on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */}enterPressed(g){const{BlockManager:f,BlockSelection:b}=this.Editor,v=f.currentBlockIndex>=0;if(!b.anyBlockSelected||m.isSelectionExists){if(!this.someToolbarOpened&&v&&"BODY"===g.target.tagName){const g=this.Editor.BlockManager.insert();this.Editor.Caret.setToBlock(g),this.Editor.BlockManager.highlightCurrentNode(),this.Editor.Toolbar.moveAndOpen(g)}this.Editor.BlockSelection.clearSelection(g)}else b.clearSelection(g),g.preventDefault(),g.stopImmediatePropagation(),g.stopPropagation()}
/**
   * All clicks on document
   *
   * @param {MouseEvent} event - Click event
   */documentClicked(g){if(!g.isTrusted)return;const f=g.target;this.nodes.holder.contains(f)||m.isAtEditor||(this.Editor.BlockManager.dropPointer(),this.Editor.Toolbar.close());const b=this.Editor.BlockSettings.nodes.wrapper.contains(f),v=this.Editor.Toolbar.nodes.settingsToggler.contains(f),w=b||v;if(this.Editor.BlockSettings.opened&&!w){this.Editor.BlockSettings.close();const g=this.Editor.BlockManager.getBlockByChildNode(f);this.Editor.Toolbar.moveAndOpen(g)}this.Editor.BlockSelection.clearSelection(g)}
/**
   * First touch on editor
   * Fired before click
   *
   * Used to change current block — we need to do it before 'selectionChange' event.
   * Also:
   * - Move and show the Toolbar
   * - Set a Caret
   *
   * @param {MouseEvent | TouchEvent} event - touch or mouse event
   */documentTouched(g){let f=g.target;if(f===this.nodes.redactor){const b=g instanceof MouseEvent?g.clientX:g.touches[0].clientX,v=g instanceof MouseEvent?g.clientY:g.touches[0].clientY;f=document.elementFromPoint(b,v)}try{this.Editor.BlockManager.setCurrentBlockByChildNode(f),this.Editor.BlockManager.highlightCurrentNode()}catch{this.Editor.RectangleSelection.isRectActivated()||this.Editor.Caret.setToTheLastBlock()}this.Editor.Toolbar.moveAndOpen()}
/**
   * All clicks on the redactor zone
   *
   * @param {MouseEvent} event - click event
   * @description
   * - By clicks on the Editor's bottom zone:
   *      - if last Block is empty, set a Caret to this
   *      - otherwise, add a new empty Block and set a Caret to that
   */redactorClicked(g){const{BlockSelection:f}=this.Editor;if(!m.isCollapsed)return;const o=()=>{g.stopImmediatePropagation(),g.stopPropagation()},b=g.target,v=g.metaKey||g.ctrlKey;if(d.isAnchor(b)&&v){o();const g=b.getAttribute("href"),f=Ht(g);jt(f);return}const w=this.Editor.BlockManager.getBlockByIndex(-1),E=d.offset(w.holder).bottom,C=g.pageY;if(g.target instanceof Element&&g.target.isEqualNode(this.nodes.redactor)&&!f.anyBlockSelected&&E<C){o();const{BlockManager:g,Caret:f,Toolbar:b}=this.Editor;(!g.lastBlock.tool.isDefault||!g.lastBlock.isEmpty)&&g.insertAtEnd(),f.setToTheLastBlock(),b.moveAndOpen(g.lastBlock)}}selectionChanged(){const{CrossBlockSelection:g,BlockSelection:f}=this.Editor,b=m.anchorElement;if(g.isCrossBlockSelectionStarted&&f.anyBlockSelected&&m.get().removeAllRanges(),!b){m.range||this.Editor.InlineToolbar.close();return}const v=null===b.closest(`.${F.CSS.content}`);if(v&&(this.Editor.InlineToolbar.containsNode(b)||this.Editor.InlineToolbar.close(),!("true"===b.dataset.inlineToolbar)))return;this.Editor.BlockManager.currentBlock||this.Editor.BlockManager.setCurrentBlockByChildNode(b);const w=!0!==v;this.Editor.InlineToolbar.tryToShow(!0,w)}}const To={BlocksAPI:Zt,CaretAPI:Gt,EventsAPI:qt,I18nAPI:De,API:Jt,InlineToolbarAPI:Qt,ListenersAPI:eo,NotifierAPI:no,ReadOnlyAPI:so,SanitizerAPI:po,SaverAPI:fo,SelectionAPI:go,StylesAPI:bo,ToolbarAPI:mo,TooltipAPI:xo,UiAPI:wo,BlockSettings:Ro,ConversionToolbar:Y,Toolbar:jo,InlineToolbar:Uo,BlockEvents:$o,BlockManager:Ko,BlockSelection:Xo,Caret:ve,CrossBlockSelection:Vo,DragNDrop:Zo,ModificationsObserver:Go,Paste:oo,ReadOnly:qo,RectangleSelection:pe,Renderer:Jo,Saver:Qo,Tools:St,UI:hi};class pi{
/**
   * @param {EditorConfig} config - user configuration
   */
constructor(g){this.moduleInstances={},this.eventsDispatcher=new we;let f,b;this.isReady=new Promise(((g,v)=>{f=g,b=v})),Promise.resolve().then((async()=>{this.configuration=g,await this.validate(),await this.init(),await this.start(),w("I'm ready! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧","log","","color: #E24A75"),setTimeout((async()=>{if(await this.render(),this.configuration.autofocus){const{BlockManager:g,Caret:f}=this.moduleInstances;f.setToBlock(g.blocks[0],f.positions.START),g.highlightCurrentNode()}this.moduleInstances.UI.removeLoader(),f()}),500)})).catch((g=>{v(`Editor.js is not ready because of ${g}`,"error"),b(g)}))
/**
   * Setting for configuration
   *
   * @param {EditorConfig|string} config - Editor's config to set
   */}set configuration(f){var b,v;j(f)?this.config={...f}:this.config={holder:f},Ie(!!this.config.holderId,"config.holderId","config.holder"),this.config.holderId&&!this.config.holder&&(this.config.holder=this.config.holderId,this.config.holderId=null),null==this.config.holder&&(this.config.holder="editorjs"),this.config.logLevel||(this.config.logLevel=g.VERBOSE),At(this.config.logLevel),Ie(!!this.config.initialBlock,"config.initialBlock","config.defaultBlock"),this.config.defaultBlock=this.config.defaultBlock||this.config.initialBlock||"paragraph",this.config.minHeight=void 0!==this.config.minHeight?this.config.minHeight:300;const w={type:this.config.defaultBlock,data:{}};this.config.placeholder=this.config.placeholder||!1,this.config.sanitizer=this.config.sanitizer||{p:!0,b:!0,a:!0},this.config.hideToolbar=!!this.config.hideToolbar&&this.config.hideToolbar,this.config.tools=this.config.tools||{},this.config.i18n=this.config.i18n||{},this.config.data=this.config.data||{blocks:[]},this.config.onReady=this.config.onReady||(()=>{}),this.config.onChange=this.config.onChange||(()=>{}),this.config.inlineToolbar=void 0===this.config.inlineToolbar||this.config.inlineToolbar,(V(this.config.data)||!this.config.data.blocks||0===this.config.data.blocks.length)&&(this.config.data={blocks:[w]}),this.config.readOnly=this.config.readOnly||!1,null!=(b=this.config.i18n)&&b.messages&&H.setDictionary(this.config.i18n.messages),this.config.i18n.direction=(null==(v=this.config.i18n)?void 0:v.direction)||"ltr"
/**
   * Returns private property
   *
   * @returns {EditorConfig}
   */}get configuration(){return this.config}
/**
   * Checks for required fields in Editor's config
   *
   * @returns {Promise<void>}
   */async validate(){const{holderId:g,holder:f}=this.config;if(g&&f)throw Error("«holderId» and «holder» param can't assign at the same time.");if(J(f)&&!d.get(f))throw Error(`element with ID «${f}» is missing. Pass correct holder's ID.`);if(f&&j(f)&&!d.isElement(f))throw Error("«holder» value must be an Element node")}init(){this.constructModules(),this.configureModules()
/**
   * Start Editor!
   *
   * Get list of modules that needs to be prepared and return a sequence (Promise)
   *
   * @returns {Promise<void>}
   */}async start(){await["Tools","UI","BlockManager","Paste","BlockSelection","RectangleSelection","CrossBlockSelection","ReadOnly"].reduce(((g,f)=>g.then((async()=>{try{await this.moduleInstances[f].prepare()}catch(g){if(g instanceof at)throw new Error(g.message);v(`Module ${f} was skipped because of %o`,"warn",g)}}))),Promise.resolve())}render(){return this.moduleInstances.Renderer.render(this.config.data.blocks)}constructModules(){Object.entries(To).forEach((([g,f])=>{try{this.moduleInstances[g]=new f({config:this.configuration,eventsDispatcher:this.eventsDispatcher})}catch(f){v("[constructModules]",`Module ${g} skipped because`,"error",f)}}))}configureModules(){for(const g in this.moduleInstances)Object.prototype.hasOwnProperty.call(this.moduleInstances,g)&&(this.moduleInstances[g].state=this.getModulesDiff(g))}
/**
   * Return modules without passed name
   *
   * @param {string} name - module for witch modules difference should be calculated
   */getModulesDiff(g){const f={};for(const b in this.moduleInstances)b!==g&&(f[b]=this.moduleInstances[b]);return f}}
/**
 * Editor.js
 *
 * @license Apache-2.0
 * @see Editor.js <https://editorjs.io>
 * @author CodeX Team <https://codex.so>
 */class fi{static get version(){return"2.27.2"}
/**
   * @param {EditorConfig|string|undefined} [configuration] - user configuration
   */constructor(g){let t=()=>{};j(g)&&D(g.onReady)&&(t=g.onReady);const f=new pi(g);this.isReady=f.isReady.then((()=>{this.exportAPI(f),t()}))}
/**
   * Export external API methods
   *
   * @param {Core} editor — Editor's instance
   */exportAPI(g){const f=["configuration"],o=()=>{Object.values(g.moduleInstances).forEach((g=>{D(g.destroy)&&g.destroy(),g.listeners.removeAll()})),g=null;for(const g in this)Object.prototype.hasOwnProperty.call(this,g)&&delete this[g];Object.setPrototypeOf(this,null)};f.forEach((f=>{this[f]=g[f]})),this.destroy=o,Object.setPrototypeOf(this,g.moduleInstances.API.methods),delete this.exportAPI,Object.entries({blocks:{clear:"clear",render:"render"},caret:{focus:"focus"},events:{on:"on",off:"off",emit:"emit"},saver:{save:"save"}}).forEach((([f,b])=>{Object.entries(b).forEach((([b,v])=>{this[v]=g.moduleInstances.API.methods[f][b]}))}))}}export{fi as default};

