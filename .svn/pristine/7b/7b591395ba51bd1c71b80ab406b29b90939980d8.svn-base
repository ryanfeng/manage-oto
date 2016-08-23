
//vue 
/*! 
 * Vue.js v1.0.26
 * (c) 2016 Evan You
 * Released under the MIT License.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('common_init',factory) :
            (global.Vue = factory());
}(this, function () {
    

    function set(obj, key, val) {
        if (hasOwn(obj, key)) {
            obj[key] = val;
            return;
        }
        if (obj._isVue) {
            set(obj._data, key, val);
            return;
        }
        var ob = obj.__ob__;
        if (!ob) {
            obj[key] = val;
            return;
        }
        ob.convert(key, val);
        ob.dep.notify();
        if (ob.vms) {
            var i = ob.vms.length;
            while (i--) {
                var vm = ob.vms[i];
                vm._proxy(key);
                vm._digest();
            }
        }
        return val;
    }

    /**
     * Delete a property and trigger change if necessary.
     *
     * @param {Object} obj
     * @param {String} key
     */

    function del(obj, key) {
        if (!hasOwn(obj, key)) {
            return;
        }
        delete obj[key];
        var ob = obj.__ob__;
        if (!ob) {
            if (obj._isVue) {
                delete obj._data[key];
                obj._digest();
            }
            return;
        }
        ob.dep.notify();
        if (ob.vms) {
            var i = ob.vms.length;
            while (i--) {
                var vm = ob.vms[i];
                vm._unproxy(key);
                vm._digest();
            }
        }
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
     * Check whether the object has the property.
     *
     * @param {Object} obj
     * @param {String} key
     * @return {Boolean}
     */

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }

    /**
     * Check if an expression is a literal value.
     *
     * @param {String} exp
     * @return {Boolean}
     */

    var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

    function isLiteral(exp) {
        return literalValueRE.test(exp);
    }

    /**
     * Check if a string starts with $ or _
     *
     * @param {String} str
     * @return {Boolean}
     */

    function isReserved(str) {
        var c = (str + '').charCodeAt(0);
        return c === 0x24 || c === 0x5F;
    }

    /**
     * Guard text output, make sure undefined outputs
     * empty string
     *
     * @param {*} value
     * @return {String}
     */

    function _toString(value) {
        return value == null ? '' : value.toString();
    }

    /**
     * Check and convert possible numeric strings to numbers
     * before setting back to data
     *
     * @param {*} value
     * @return {*|Number}
     */

    function toNumber(value) {
        if (typeof value !== 'string') {
            return value;
        } else {
            var parsed = Number(value);
            return isNaN(parsed) ? value : parsed;
        }
    }

    /**
     * Convert string boolean literals into real booleans.
     *
     * @param {*} value
     * @return {*|Boolean}
     */

    function toBoolean(value) {
        return value === 'true' ? true : value === 'false' ? false : value;
    }

    /**
     * Strip quotes from a string
     *
     * @param {String} str
     * @return {String | false}
     */

    function stripQuotes(str) {
        var a = str.charCodeAt(0);
        var b = str.charCodeAt(str.length - 1);
        return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
    }

    /**
     * Camelize a hyphen-delmited string.
     *
     * @param {String} str
     * @return {String}
     */

    var camelizeRE = /-(\w)/g;

    function camelize(str) {
        return str.replace(camelizeRE, toUpper);
    }

    function toUpper(_, c) {
        return c ? c.toUpperCase() : '';
    }

    /**
     * Hyphenate a camelCase string.
     *
     * @param {String} str
     * @return {String}
     */

    var hyphenateRE = /([a-z\d])([A-Z])/g;

    function hyphenate(str) {
        return str.replace(hyphenateRE, '$1-$2').toLowerCase();
    }

    /**
     * Converts hyphen/underscore/slash delimitered names into
     * camelized classNames.
     *
     * e.g. my-component => MyComponent
     *      some_else    => SomeElse
     *      some/comp    => SomeComp
     *
     * @param {String} str
     * @return {String}
     */

    var classifyRE = /(?:^|[-_\/])(\w)/g;

    function classify(str) {
        return str.replace(classifyRE, toUpper);
    }

    /**
     * Simple bind, faster than native
     *
     * @param {Function} fn
     * @param {Object} ctx
     * @return {Function}
     */

    function bind(fn, ctx) {
        return function (a) {
            var l = arguments.length;
            return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
        };
    }

    /**
     * Convert an Array-like object to a real Array.
     *
     * @param {Array-like} list
     * @param {Number} [start] - start index
     * @return {Array}
     */

    function toArray(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
            ret[i] = list[i + start];
        }
        return ret;
    }

    /**
     * Mix properties into target object.
     *
     * @param {Object} to
     * @param {Object} from
     */

    function extend(to, from) {
        var keys = Object.keys(from);
        var i = keys.length;
        while (i--) {
            to[keys[i]] = from[keys[i]];
        }
        return to;
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     *
     * @param {*} obj
     * @return {Boolean}
     */

    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     *
     * @param {*} obj
     * @return {Boolean}
     */

    var toString = Object.prototype.toString;
    var OBJECT_STRING = '[object Object]';

    function isPlainObject(obj) {
        return toString.call(obj) === OBJECT_STRING;
    }

    /**
     * Array type check.
     *
     * @param {*} obj
     * @return {Boolean}
     */

    var isArray = Array.isArray;

    /**
     * Define a property.
     *
     * @param {Object} obj
     * @param {String} key
     * @param {*} val
     * @param {Boolean} [enumerable]
     */

    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        });
    }

    /**
     * Debounce a function so it only gets called after the
     * input stops arriving after the given wait period.
     *
     * @param {Function} func
     * @param {Number} wait
     * @return {Function} - the debounced function
     */

    function _debounce(func, wait) {
        var timeout, args, context, timestamp, result;
        var later = function later() {
            var last = Date.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            return result;
        };
    }

    /**
     * Manual indexOf because it's slightly faster than
     * native.
     *
     * @param {Array} arr
     * @param {*} obj
     */

    function indexOf(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) return i;
        }
        return -1;
    }

    /**
     * Make a cancellable version of an async callback.
     *
     * @param {Function} fn
     * @return {Function}
     */

    function cancellable(fn) {
        var cb = function cb() {
            if (!cb.cancelled) {
                return fn.apply(this, arguments);
            }
        };
        cb.cancel = function () {
            cb.cancelled = true;
        };
        return cb;
    }

    /**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     *
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     */

    function looseEqual(a, b) {
        /* eslint-disable eqeqeq */
        return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
        /* eslint-enable eqeqeq */
    }

    var hasProto = ('__proto__' in {});

    // Browser environment sniffing
    var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

    // detect devtools
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    // UA sniffing for working around browser-specific quirks
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && UA.indexOf('trident') > 0;
    var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    var isAndroid = UA && UA.indexOf('android') > 0;
    var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
    var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
    var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

    // detecting iOS UIWebView by indexedDB
    var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

    var transitionProp = undefined;
    var transitionEndEvent = undefined;
    var animationProp = undefined;
    var animationEndEvent = undefined;

    // Transition property/event sniffing
    if (inBrowser && !isIE9) {
        var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
        var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
        transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
        transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
        animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
        animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
    }

    /**
     * Defer a task to execute it asynchronously. Ideally this
     * should be executed as a microtask, so we leverage
     * MutationObserver if it's available, and fallback to
     * setTimeout(0).
     *
     * @param {Function} cb
     * @param {Object} ctx
     */

    var nextTick = (function () {
        var callbacks = [];
        var pending = false;
        var timerFunc;
        function nextTickHandler() {
            pending = false;
            var copies = callbacks.slice(0);
            callbacks = [];
            for (var i = 0; i < copies.length; i++) {
                copies[i]();
            }
        }

        /* istanbul ignore if */
        if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
            var counter = 1;
            var observer = new MutationObserver(nextTickHandler);
            var textNode = document.createTextNode(counter);
            observer.observe(textNode, {
                characterData: true
            });
            timerFunc = function () {
                counter = (counter + 1) % 2;
                textNode.data = counter;
            };
        } else {
            // webpack attempts to inject a shim for setImmediate
            // if it is used as a global, so we have to work around that to
            // avoid bundling unnecessary code.
            var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
            timerFunc = context.setImmediate || setTimeout;
        }
        return function (cb, ctx) {
            var func = ctx ? function () {
                cb.call(ctx);
            } : cb;
            callbacks.push(func);
            if (pending) return;
            pending = true;
            timerFunc(nextTickHandler, 0);
        };
    })();

    var _Set = undefined;
    /* istanbul ignore if */
    if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
        // use native Set when available.
        _Set = Set;
    } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = function () {
            this.set = Object.create(null);
        };
        _Set.prototype.has = function (key) {
            return this.set[key] !== undefined;
        };
        _Set.prototype.add = function (key) {
            this.set[key] = 1;
        };
        _Set.prototype.clear = function () {
            this.set = Object.create(null);
        };
    }

    function Cache(limit) {
        this.size = 0;
        this.limit = limit;
        this.head = this.tail = undefined;
        this._keymap = Object.create(null);
    }

    var p = Cache.prototype;

    /**
     * Put <value> into the cache associated with <key>.
     * Returns the entry which was removed to make room for
     * the new entry. Otherwise undefined is returned.
     * (i.e. if there was enough room already).
     *
     * @param {String} key
     * @param {*} value
     * @return {Entry|undefined}
     */

    p.put = function (key, value) {
        var removed;

        var entry = this.get(key, true);
        if (!entry) {
            if (this.size === this.limit) {
                removed = this.shift();
            }
            entry = {
                key: key
            };
            this._keymap[key] = entry;
            if (this.tail) {
                this.tail.newer = entry;
                entry.older = this.tail;
            } else {
                this.head = entry;
            }
            this.tail = entry;
            this.size++;
        }
        entry.value = value;

        return removed;
    };

    /**
     * Purge the least recently used (oldest) entry from the
     * cache. Returns the removed entry or undefined if the
     * cache was empty.
     */

    p.shift = function () {
        var entry = this.head;
        if (entry) {
            this.head = this.head.newer;
            this.head.older = undefined;
            entry.newer = entry.older = undefined;
            this._keymap[entry.key] = undefined;
            this.size--;
        }
        return entry;
    };

    /**
     * Get and register recent use of <key>. Returns the value
     * associated with <key> or undefined if not in cache.
     *
     * @param {String} key
     * @param {Boolean} returnEntry
     * @return {Entry|*}
     */

    p.get = function (key, returnEntry) {
        var entry = this._keymap[key];
        if (entry === undefined) return;
        if (entry === this.tail) {
            return returnEntry ? entry : entry.value;
        }
        // HEAD--------------TAIL
        //   <.older   .newer>
        //  <--- add direction --
        //   A  B  C  <D>  E
        if (entry.newer) {
            if (entry === this.head) {
                this.head = entry.newer;
            }
            entry.newer.older = entry.older; // C <-- E.
        }
        if (entry.older) {
            entry.older.newer = entry.newer; // C. --> E
        }
        entry.newer = undefined; // D --x
        entry.older = this.tail; // D. --> E
        if (this.tail) {
            this.tail.newer = entry; // E. <-- D
        }
        this.tail = entry;
        return returnEntry ? entry : entry.value;
    };

    var cache$1 = new Cache(1000);
    var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
    var reservedArgRE = /^in$|^-?\d+/;

    /**
     * Parser state
     */

    var str;
    var dir;
    var c;
    var prev;
    var i;
    var l;
    var lastFilterIndex;
    var inSingle;
    var inDouble;
    var curly;
    var square;
    var paren;
    /**
     * Push a filter to the current directive object
     */

    function pushFilter() {
        var exp = str.slice(lastFilterIndex, i).trim();
        var filter;
        if (exp) {
            filter = {};
            var tokens = exp.match(filterTokenRE);
            filter.name = tokens[0];
            if (tokens.length > 1) {
                filter.args = tokens.slice(1).map(processFilterArg);
            }
        }
        if (filter) {
            (dir.filters = dir.filters || []).push(filter);
        }
        lastFilterIndex = i + 1;
    }

    /**
     * Check if an argument is dynamic and strip quotes.
     *
     * @param {String} arg
     * @return {Object}
     */

    function processFilterArg(arg) {
        if (reservedArgRE.test(arg)) {
            return {
                value: toNumber(arg),
                dynamic: false
            };
        } else {
            var stripped = stripQuotes(arg);
            var dynamic = stripped === arg;
            return {
                value: dynamic ? arg : stripped,
                dynamic: dynamic
            };
        }
    }

    /**
     * Parse a directive value and extract the expression
     * and its filters into a descriptor.
     *
     * Example:
     *
     * "a + 1 | uppercase" will yield:
     * {
   *   expression: 'a + 1',
   *   filters: [
   *     { name: 'uppercase', args: null }
   *   ]
   * }
     *
     * @param {String} s
     * @return {Object}
     */

    function parseDirective(s) {
        var hit = cache$1.get(s);
        if (hit) {
            return hit;
        }

        // reset parser state
        str = s;
        inSingle = inDouble = false;
        curly = square = paren = 0;
        lastFilterIndex = 0;
        dir = {};

        for (i = 0, l = str.length; i < l; i++) {
            prev = c;
            c = str.charCodeAt(i);
            if (inSingle) {
                // check single quote
                if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
            } else if (inDouble) {
                // check double quote
                if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
            } else if (c === 0x7C && // pipe
                str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
                if (dir.expression == null) {
                    // first filter, end of expression
                    lastFilterIndex = i + 1;
                    dir.expression = str.slice(0, i).trim();
                } else {
                    // already has filter
                    pushFilter();
                }
            } else {
                switch (c) {
                    case 0x22:
                        inDouble = true;break; // "
                    case 0x27:
                        inSingle = true;break; // '
                    case 0x28:
                        paren++;break; // (
                    case 0x29:
                        paren--;break; // )
                    case 0x5B:
                        square++;break; // [
                    case 0x5D:
                        square--;break; // ]
                    case 0x7B:
                        curly++;break; // {
                    case 0x7D:
                        curly--;break; // }
                }
            }
        }

        if (dir.expression == null) {
            dir.expression = str.slice(0, i).trim();
        } else if (lastFilterIndex !== 0) {
            pushFilter();
        }

        cache$1.put(s, dir);
        return dir;
    }

    var directive = Object.freeze({
        parseDirective: parseDirective
    });

    var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
    var cache = undefined;
    var tagRE = undefined;
    var htmlRE = undefined;
    /**
     * Escape a string so it can be used in a RegExp
     * constructor.
     *
     * @param {String} str
     */

    function escapeRegex(str) {
        return str.replace(regexEscapeRE, '\\$&');
    }

    function compileRegex() {
        var open = escapeRegex(config.delimiters[0]);
        var close = escapeRegex(config.delimiters[1]);
        var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
        var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
        tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
        htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
        // reset cache
        cache = new Cache(1000);
    }

    /**
     * Parse a template text string into an array of tokens.
     *
     * @param {String} text
     * @return {Array<Object> | null}
     *               - {String} type
     *               - {String} value
     *               - {Boolean} [html]
     *               - {Boolean} [oneTime]
     */

    function parseText(text) {
        if (!cache) {
            compileRegex();
        }
        var hit = cache.get(text);
        if (hit) {
            return hit;
        }
        if (!tagRE.test(text)) {
            return null;
        }
        var tokens = [];
        var lastIndex = tagRE.lastIndex = 0;
        var match, index, html, value, first, oneTime;
        /* eslint-disable no-cond-assign */
        while (match = tagRE.exec(text)) {
            /* eslint-enable no-cond-assign */
            index = match.index;
            // push text token
            if (index > lastIndex) {
                tokens.push({
                    value: text.slice(lastIndex, index)
                });
            }
            // tag token
            html = htmlRE.test(match[0]);
            value = html ? match[1] : match[2];
            first = value.charCodeAt(0);
            oneTime = first === 42; // *
            value = oneTime ? value.slice(1) : value;
            tokens.push({
                tag: true,
                value: value.trim(),
                html: html,
                oneTime: oneTime
            });
            lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
            tokens.push({
                value: text.slice(lastIndex)
            });
        }
        cache.put(text, tokens);
        return tokens;
    }

    /**
     * Format a list of tokens into an expression.
     * e.g. tokens parsed from 'a {{b}} c' can be serialized
     * into one single expression as '"a " + b + " c"'.
     *
     * @param {Array} tokens
     * @param {Vue} [vm]
     * @return {String}
     */

    function tokensToExp(tokens, vm) {
        if (tokens.length > 1) {
            return tokens.map(function (token) {
                return formatToken(token, vm);
            }).join('+');
        } else {
            return formatToken(tokens[0], vm, true);
        }
    }

    /**
     * Format a single token.
     *
     * @param {Object} token
     * @param {Vue} [vm]
     * @param {Boolean} [single]
     * @return {String}
     */

    function formatToken(token, vm, single) {
        return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
    }

    /**
     * For an attribute with multiple interpolation tags,
     * e.g. attr="some-{{thing | filter}}", in order to combine
     * the whole thing into a single watchable expression, we
     * have to inline those filters. This function does exactly
     * that. This is a bit hacky but it avoids heavy changes
     * to directive parser and watcher mechanism.
     *
     * @param {String} exp
     * @param {Boolean} single
     * @return {String}
     */

    var filterRE = /[^|]\|[^|]/;
    function inlineFilters(exp, single) {
        if (!filterRE.test(exp)) {
            return single ? exp : '(' + exp + ')';
        } else {
            var dir = parseDirective(exp);
            if (!dir.filters) {
                return '(' + exp + ')';
            } else {
                return 'this._applyFilters(' + dir.expression + // value
                    ',null,' + // oldValue (null for read)
                    JSON.stringify(dir.filters) + // filter descriptors
                    ',false)'; // write?
            }
        }
    }

    var text = Object.freeze({
        compileRegex: compileRegex,
        parseText: parseText,
        tokensToExp: tokensToExp
    });

    var delimiters = ['{{', '}}'];
    var unsafeDelimiters = ['{{{', '}}}'];

    var config = Object.defineProperties({

        /**
         * Whether to print debug messages.
         * Also enables stack trace for warnings.
         *
         * @type {Boolean}
         */

        debug: false,

        /**
         * Whether to suppress warnings.
         *
         * @type {Boolean}
         */

        silent: false,

        /**
         * Whether to use async rendering.
         */

        async: true,

        /**
         * Whether to warn against errors caught when evaluating
         * expressions.
         */

        warnExpressionErrors: true,

        /**
         * Whether to allow devtools inspection.
         * Disabled by default in production builds.
         */

        devtools: 'development' !== 'production',

        /**
         * Internal flag to indicate the delimiters have been
         * changed.
         *
         * @type {Boolean}
         */

        _delimitersChanged: true,

        /**
         * List of asset types that a component can own.
         *
         * @type {Array}
         */

        _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

        /**
         * prop binding modes
         */

        _propBindingModes: {
            ONE_WAY: 0,
            TWO_WAY: 1,
            ONE_TIME: 2
        },

        /**
         * Max circular updates allowed in a batcher flush cycle.
         */

        _maxUpdateCount: 100

    }, {
        delimiters: { /**
         * Interpolation delimiters. Changing these would trigger
         * the text parser to re-compile the regular expressions.
         *
         * @type {Array<String>}
         */

        get: function get() {
            return delimiters;
        },
            set: function set(val) {
                delimiters = val;
                compileRegex();
            },
            configurable: true,
            enumerable: true
        },
        unsafeDelimiters: {
            get: function get() {
                return unsafeDelimiters;
            },
            set: function set(val) {
                unsafeDelimiters = val;
                compileRegex();
            },
            configurable: true,
            enumerable: true
        }
    });

    var warn = undefined;
    var formatComponentName = undefined;

    if ('development' !== 'production') {
        (function () {
            var hasConsole = typeof console !== 'undefined';

            warn = function (msg, vm) {
                if (hasConsole && !config.silent) {
                    console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
                }
            };

            formatComponentName = function (vm) {
                var name = vm._isVue ? vm.$options.name : vm.name;
                return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
            };
        })();
    }

    /**
     * Append with transition.
     *
     * @param {Element} el
     * @param {Element} target
     * @param {Vue} vm
     * @param {Function} [cb]
     */

    function appendWithTransition(el, target, vm, cb) {
        applyTransition(el, 1, function () {
            target.appendChild(el);
        }, vm, cb);
    }

    /**
     * InsertBefore with transition.
     *
     * @param {Element} el
     * @param {Element} target
     * @param {Vue} vm
     * @param {Function} [cb]
     */

    function beforeWithTransition(el, target, vm, cb) {
        applyTransition(el, 1, function () {
            before(el, target);
        }, vm, cb);
    }

    /**
     * Remove with transition.
     *
     * @param {Element} el
     * @param {Vue} vm
     * @param {Function} [cb]
     */

    function removeWithTransition(el, vm, cb) {
        applyTransition(el, -1, function () {
            remove(el);
        }, vm, cb);
    }

    /**
     * Apply transitions with an operation callback.
     *
     * @param {Element} el
     * @param {Number} direction
     *                  1: enter
     *                 -1: leave
     * @param {Function} op - the actual DOM operation
     * @param {Vue} vm
     * @param {Function} [cb]
     */

    function applyTransition(el, direction, op, vm, cb) {
        var transition = el.__v_trans;
        if (!transition ||
            // skip if there are no js hooks and CSS transition is
            // not supported
            !transition.hooks && !transitionEndEvent ||
            // skip transitions for initial compile
            !vm._isCompiled ||
            // if the vm is being manipulated by a parent directive
            // during the parent's compilation phase, skip the
            // animation.
            vm.$parent && !vm.$parent._isCompiled) {
            op();
            if (cb) cb();
            return;
        }
        var action = direction > 0 ? 'enter' : 'leave';
        transition[action](op, cb);
    }

    var transition = Object.freeze({
        appendWithTransition: appendWithTransition,
        beforeWithTransition: beforeWithTransition,
        removeWithTransition: removeWithTransition,
        applyTransition: applyTransition
    });

    /**
     * Query an element selector if it's not an element already.
     *
     * @param {String|Element} el
     * @return {Element}
     */

    function query(el) {
        if (typeof el === 'string') {
            var selector = el;
            el = document.querySelector(el);
            if (!el) {
                'development' !== 'production' && warn('Cannot find element: ' + selector);
            }
        }
        return el;
    }

    /**
     * Check if a node is in the document.
     * Note: document.documentElement.contains should work here
     * but always returns false for comment nodes in phantomjs,
     * making unit tests difficult. This is fixed by doing the
     * contains() check on the node's parentNode instead of
     * the node itself.
     *
     * @param {Node} node
     * @return {Boolean}
     */

    function inDoc(node) {
        if (!node) return false;
        var doc = node.ownerDocument.documentElement;
        var parent = node.parentNode;
        return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
    }

    /**
     * Get and remove an attribute from a node.
     *
     * @param {Node} node
     * @param {String} _attr
     */

    function getAttr(node, _attr) {
        var val = node.getAttribute(_attr);
        if (val !== null) {
            node.removeAttribute(_attr);
        }
        return val;
    }

    /**
     * Get an attribute with colon or v-bind: prefix.
     *
     * @param {Node} node
     * @param {String} name
     * @return {String|null}
     */

    function getBindAttr(node, name) {
        var val = getAttr(node, ':' + name);
        if (val === null) {
            val = getAttr(node, 'v-bind:' + name);
        }
        return val;
    }

    /**
     * Check the presence of a bind attribute.
     *
     * @param {Node} node
     * @param {String} name
     * @return {Boolean}
     */

    function hasBindAttr(node, name) {
        return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
    }

    /**
     * Insert el before target
     *
     * @param {Element} el
     * @param {Element} target
     */

    function before(el, target) {
        target.parentNode.insertBefore(el, target);
    }

    /**
     * Insert el after target
     *
     * @param {Element} el
     * @param {Element} target
     */

    function after(el, target) {
        if (target.nextSibling) {
            before(el, target.nextSibling);
        } else {
            target.parentNode.appendChild(el);
        }
    }

    /**
     * Remove el from DOM
     *
     * @param {Element} el
     */

    function remove(el) {
        el.parentNode.removeChild(el);
    }

    /**
     * Prepend el to target
     *
     * @param {Element} el
     * @param {Element} target
     */

    function prepend(el, target) {
        if (target.firstChild) {
            before(el, target.firstChild);
        } else {
            target.appendChild(el);
        }
    }

    /**
     * Replace target with el
     *
     * @param {Element} target
     * @param {Element} el
     */

    function replace(target, el) {
        var parent = target.parentNode;
        if (parent) {
            parent.replaceChild(el, target);
        }
    }

    /**
     * Add event listener shorthand.
     *
     * @param {Element} el
     * @param {String} event
     * @param {Function} cb
     * @param {Boolean} [useCapture]
     */

    function on(el, event, cb, useCapture) {
        el.addEventListener(event, cb, useCapture);
    }

    /**
     * Remove event listener shorthand.
     *
     * @param {Element} el
     * @param {String} event
     * @param {Function} cb
     */

    function off(el, event, cb) {
        el.removeEventListener(event, cb);
    }

    /**
     * For IE9 compat: when both class and :class are present
     * getAttribute('class') returns wrong value...
     *
     * @param {Element} el
     * @return {String}
     */

    function getClass(el) {
        var classname = el.className;
        if (typeof classname === 'object') {
            classname = classname.baseVal || '';
        }
        return classname;
    }

    /**
     * In IE9, setAttribute('class') will result in empty class
     * if the element also has the :class attribute; However in
     * PhantomJS, setting `className` does not work on SVG elements...
     * So we have to do a conditional check here.
     *
     * @param {Element} el
     * @param {String} cls
     */

    function setClass(el, cls) {
        /* istanbul ignore if */
        if (isIE9 && !/svg$/.test(el.namespaceURI)) {
            el.className = cls;
        } else {
            el.setAttribute('class', cls);
        }
    }

    /**
     * Add class with compatibility for IE & SVG
     *
     * @param {Element} el
     * @param {String} cls
     */

    function addClass(el, cls) {
        if (el.classList) {
            el.classList.add(cls);
        } else {
            var cur = ' ' + getClass(el) + ' ';
            if (cur.indexOf(' ' + cls + ' ') < 0) {
                setClass(el, (cur + cls).trim());
            }
        }
    }

    /**
     * Remove class with compatibility for IE & SVG
     *
     * @param {Element} el
     * @param {String} cls
     */

    function removeClass(el, cls) {
        if (el.classList) {
            el.classList.remove(cls);
        } else {
            var cur = ' ' + getClass(el) + ' ';
            var tar = ' ' + cls + ' ';
            while (cur.indexOf(tar) >= 0) {
                cur = cur.replace(tar, ' ');
            }
            setClass(el, cur.trim());
        }
        if (!el.className) {
            el.removeAttribute('class');
        }
    }

    /**
     * Extract raw content inside an element into a temporary
     * container div
     *
     * @param {Element} el
     * @param {Boolean} asFragment
     * @return {Element|DocumentFragment}
     */

    function extractContent(el, asFragment) {
        var child;
        var rawContent;
        /* istanbul ignore if */
        if (isTemplate(el) && isFragment(el.content)) {
            el = el.content;
        }
        if (el.hasChildNodes()) {
            trimNode(el);
            rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
            /* eslint-disable no-cond-assign */
            while (child = el.firstChild) {
                /* eslint-enable no-cond-assign */
                rawContent.appendChild(child);
            }
        }
        return rawContent;
    }

    /**
     * Trim possible empty head/tail text and comment
     * nodes inside a parent.
     *
     * @param {Node} node
     */

    function trimNode(node) {
        var child;
        /* eslint-disable no-sequences */
        while ((child = node.firstChild, isTrimmable(child))) {
            node.removeChild(child);
        }
        while ((child = node.lastChild, isTrimmable(child))) {
            node.removeChild(child);
        }
        /* eslint-enable no-sequences */
    }

    function isTrimmable(node) {
        return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
    }

    /**
     * Check if an element is a template tag.
     * Note if the template appears inside an SVG its tagName
     * will be in lowercase.
     *
     * @param {Element} el
     */

    function isTemplate(el) {
        return el.tagName && el.tagName.toLowerCase() === 'template';
    }

    /**
     * Create an "anchor" for performing dom insertion/removals.
     * This is used in a number of scenarios:
     * - fragment instance
     * - v-html
     * - v-if
     * - v-for
     * - component
     *
     * @param {String} content
     * @param {Boolean} persist - IE trashes empty textNodes on
     *                            cloneNode(true), so in certain
     *                            cases the anchor needs to be
     *                            non-empty to be persisted in
     *                            templates.
     * @return {Comment|Text}
     */

    function createAnchor(content, persist) {
        var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
        anchor.__v_anchor = true;
        return anchor;
    }

    /**
     * Find a component ref attribute that starts with $.
     *
     * @param {Element} node
     * @return {String|undefined}
     */

    var refRE = /^v-ref:/;

    function findRef(node) {
        if (node.hasAttributes()) {
            var attrs = node.attributes;
            for (var i = 0, l = attrs.length; i < l; i++) {
                var name = attrs[i].name;
                if (refRE.test(name)) {
                    return camelize(name.replace(refRE, ''));
                }
            }
        }
    }

    /**
     * Map a function to a range of nodes .
     *
     * @param {Node} node
     * @param {Node} end
     * @param {Function} op
     */

    function mapNodeRange(node, end, op) {
        var next;
        while (node !== end) {
            next = node.nextSibling;
            op(node);
            node = next;
        }
        op(end);
    }

    /**
     * Remove a range of nodes with transition, store
     * the nodes in a fragment with correct ordering,
     * and call callback when done.
     *
     * @param {Node} start
     * @param {Node} end
     * @param {Vue} vm
     * @param {DocumentFragment} frag
     * @param {Function} cb
     */

    function removeNodeRange(start, end, vm, frag, cb) {
        var done = false;
        var removed = 0;
        var nodes = [];
        mapNodeRange(start, end, function (node) {
            if (node === end) done = true;
            nodes.push(node);
            removeWithTransition(node, vm, onRemoved);
        });
        function onRemoved() {
            removed++;
            if (done && removed >= nodes.length) {
                for (var i = 0; i < nodes.length; i++) {
                    frag.appendChild(nodes[i]);
                }
                cb && cb();
            }
        }
    }

    /**
     * Check if a node is a DocumentFragment.
     *
     * @param {Node} node
     * @return {Boolean}
     */

    function isFragment(node) {
        return node && node.nodeType === 11;
    }

    /**
     * Get outerHTML of elements, taking care
     * of SVG elements in IE as well.
     *
     * @param {Element} el
     * @return {String}
     */

    function getOuterHTML(el) {
        if (el.outerHTML) {
            return el.outerHTML;
        } else {
            var container = document.createElement('div');
            container.appendChild(el.cloneNode(true));
            return container.innerHTML;
        }
    }

    var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
    var reservedTagRE = /^(slot|partial|component)$/i;

    var isUnknownElement = undefined;
    if ('development' !== 'production') {
        isUnknownElement = function (el, tag) {
            if (tag.indexOf('-') > -1) {
                // http://stackoverflow.com/a/28210364/1070244
                return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
            } else {
                return (/HTMLUnknownElement/.test(el.toString()) &&
                    // Chrome returns unknown for several HTML5 elements.
                    // https://code.google.com/p/chromium/issues/detail?id=540526
                    // Firefox returns unknown for some "Interactive elements."
                    !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
                    );
            }
        };
    }

    /**
     * Check if an element is a component, if yes return its
     * component id.
     *
     * @param {Element} el
     * @param {Object} options
     * @return {Object|undefined}
     */

    function checkComponentAttr(el, options) {
        var tag = el.tagName.toLowerCase();
        var hasAttrs = el.hasAttributes();
        if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
            if (resolveAsset(options, 'components', tag)) {
                return { id: tag };
            } else {
                var is = hasAttrs && getIsBinding(el, options);
                if (is) {
                    return is;
                } else if ('development' !== 'production') {
                    var expectedTag = options._componentNameMap && options._componentNameMap[tag];
                    if (expectedTag) {
                        warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
                    } else if (isUnknownElement(el, tag)) {
                        warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
                    }
                }
            }
        } else if (hasAttrs) {
            return getIsBinding(el, options);
        }
    }

    /**
     * Get "is" binding from an element.
     *
     * @param {Element} el
     * @param {Object} options
     * @return {Object|undefined}
     */

    function getIsBinding(el, options) {
        // dynamic syntax
        var exp = el.getAttribute('is');
        if (exp != null) {
            if (resolveAsset(options, 'components', exp)) {
                el.removeAttribute('is');
                return { id: exp };
            }
        } else {
            exp = getBindAttr(el, 'is');
            if (exp != null) {
                return { id: exp, dynamic: true };
            }
        }
    }

    /**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     *
     * All strategy functions follow the same signature:
     *
     * @param {*} parentVal
     * @param {*} childVal
     * @param {Vue} [vm]
     */

    var strats = config.optionMergeStrategies = Object.create(null);

    /**
     * Helper that recursively merges two data objects together.
     */

    function mergeData(to, from) {
        var key, toVal, fromVal;
        for (key in from) {
            toVal = to[key];
            fromVal = from[key];
            if (!hasOwn(to, key)) {
                set(to, key, fromVal);
            } else if (isObject(toVal) && isObject(fromVal)) {
                mergeData(toVal, fromVal);
            }
        }
        return to;
    }

    /**
     * Data
     */

    strats.data = function (parentVal, childVal, vm) {
        if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
                return parentVal;
            }
            if (typeof childVal !== 'function') {
                'development' !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
                return parentVal;
            }
            if (!parentVal) {
                return childVal;
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn() {
                return mergeData(childVal.call(this), parentVal.call(this));
            };
        } else if (parentVal || childVal) {
            return function mergedInstanceDataFn() {
                // instance merge
                var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
                var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
                if (instanceData) {
                    return mergeData(instanceData, defaultData);
                } else {
                    return defaultData;
                }
            };
        }
    };

    /**
     * El
     */

    strats.el = function (parentVal, childVal, vm) {
        if (!vm && childVal && typeof childVal !== 'function') {
            'development' !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
            return;
        }
        var ret = childVal || parentVal;
        // invoke the element factory if this is instance merge
        return vm && typeof ret === 'function' ? ret.call(vm) : ret;
    };

    /**
     * Hooks and param attributes are merged as arrays.
     */

    strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
        return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    };

    /**
     * Assets
     *
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */

    function mergeAssets(parentVal, childVal) {
        var res = Object.create(parentVal || null);
        return childVal ? extend(res, guardArrayAssets(childVal)) : res;
    }

    config._assetTypes.forEach(function (type) {
        strats[type + 's'] = mergeAssets;
    });

    /**
     * Events & Watchers.
     *
     * Events & watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */

    strats.watch = strats.events = function (parentVal, childVal) {
        if (!childVal) return parentVal;
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key in childVal) {
            var parent = ret[key];
            var child = childVal[key];
            if (parent && !isArray(parent)) {
                parent = [parent];
            }
            ret[key] = parent ? parent.concat(child) : [child];
        }
        return ret;
    };

    /**
     * Other object hashes.
     */

    strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
        if (!childVal) return parentVal;
        if (!parentVal) return childVal;
        var ret = Object.create(null);
        extend(ret, parentVal);
        extend(ret, childVal);
        return ret;
    };

    /**
     * Default strategy.
     */

    var defaultStrat = function defaultStrat(parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal;
    };

    /**
     * Make sure component options get converted to actual
     * constructors.
     *
     * @param {Object} options
     */

    function guardComponents(options) {
        if (options.components) {
            var components = options.components = guardArrayAssets(options.components);
            var ids = Object.keys(components);
            var def;
            if ('development' !== 'production') {
                var map = options._componentNameMap = {};
            }
            for (var i = 0, l = ids.length; i < l; i++) {
                var key = ids[i];
                if (commonTagRE.test(key) || reservedTagRE.test(key)) {
                    'development' !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
                    continue;
                }
                // record a all lowercase <-> kebab-case mapping for
                // possible custom element case error warning
                if ('development' !== 'production') {
                    map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
                }
                def = components[key];
                if (isPlainObject(def)) {
                    components[key] = Vue.extend(def);
                }
            }
        }
    }

    /**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     *
     * @param {Object} options
     */

    function guardProps(options) {
        var props = options.props;
        var i, val;
        if (isArray(props)) {
            options.props = {};
            i = props.length;
            while (i--) {
                val = props[i];
                if (typeof val === 'string') {
                    options.props[val] = null;
                } else if (val.name) {
                    options.props[val.name] = val;
                }
            }
        } else if (isPlainObject(props)) {
            var keys = Object.keys(props);
            i = keys.length;
            while (i--) {
                val = props[keys[i]];
                if (typeof val === 'function') {
                    props[keys[i]] = { type: val };
                }
            }
        }
    }

    /**
     * Guard an Array-format assets option and converted it
     * into the key-value Object format.
     *
     * @param {Object|Array} assets
     * @return {Object}
     */

    function guardArrayAssets(assets) {
        if (isArray(assets)) {
            var res = {};
            var i = assets.length;
            var asset;
            while (i--) {
                asset = assets[i];
                var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
                if (!id) {
                    'development' !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
                } else {
                    res[id] = asset;
                }
            }
            return res;
        }
        return assets;
    }

    /**
     * Merge two option objects into a new one.
     * Core utility used in both instantiation and inheritance.
     *
     * @param {Object} parent
     * @param {Object} child
     * @param {Vue} [vm] - if vm is present, indicates this is
     *                     an instantiation merge.
     */

    function mergeOptions(parent, child, vm) {
        guardComponents(child);
        guardProps(child);
        if ('development' !== 'production') {
            if (child.propsData && !vm) {
                warn('propsData can only be used as an instantiation option.');
            }
        }
        var options = {};
        var key;
        if (child['extends']) {
            parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                var mixin = child.mixins[i];
                var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
                parent = mergeOptions(parent, mixinOptions, vm);
            }
        }
        for (key in parent) {
            mergeField(key);
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key);
            }
        }
        function mergeField(key) {
            var strat = strats[key] || defaultStrat;
            options[key] = strat(parent[key], child[key], vm, key);
        }
        return options;
    }

    /**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     *
     * @param {Object} options
     * @param {String} type
     * @param {String} id
     * @param {Boolean} warnMissing
     * @return {Object|Function}
     */

    function resolveAsset(options, type, id, warnMissing) {
        /* istanbul ignore if */
        if (typeof id !== 'string') {
            return;
        }
        var assets = options[type];
        var camelizedId;
        var res = assets[id] ||
            // camelCase ID
            assets[camelizedId = camelize(id)] ||
            // Pascal Case ID
            assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
        if ('development' !== 'production' && warnMissing && !res) {
            warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
        }
        return res;
    }

    var uid$1 = 0;

    /**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     *
     * @constructor
     */
    function Dep() {
        this.id = uid$1++;
        this.subs = [];
    }

    // the current target watcher being evaluated.
    // this is globally unique because there could be only one
    // watcher being evaluated at any time.
    Dep.target = null;

    /**
     * Add a directive subscriber.
     *
     * @param {Directive} sub
     */

    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };

    /**
     * Remove a directive subscriber.
     *
     * @param {Directive} sub
     */

    Dep.prototype.removeSub = function (sub) {
        this.subs.$remove(sub);
    };

    /**
     * Add self as a dependency to the target watcher.
     */

    Dep.prototype.depend = function () {
        Dep.target.addDep(this);
    };

    /**
     * Notify all subscribers of a new value.
     */

    Dep.prototype.notify = function () {
        // stablize the subscriber list first
        var subs = toArray(this.subs);
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    };

    var arrayProto = Array.prototype;
    var arrayMethods = Object.create(arrayProto)

    /**
     * Intercept mutating methods and emit events
     */

        ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
        // cache original method
        var original = arrayProto[method];
        def(arrayMethods, method, function mutator() {
            // avoid leaking arguments:
            // http://jsperf.com/closure-with-arguments
            var i = arguments.length;
            var args = new Array(i);
            while (i--) {
                args[i] = arguments[i];
            }
            var result = original.apply(this, args);
            var ob = this.__ob__;
            var inserted;
            switch (method) {
                case 'push':
                    inserted = args;
                    break;
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }
            if (inserted) ob.observeArray(inserted);
            // notify change
            ob.dep.notify();
            return result;
        });
    });

    /**
     * Swap the element at the given index with a new value
     * and emits corresponding event.
     *
     * @param {Number} index
     * @param {*} val
     * @return {*} - replaced element
     */

    def(arrayProto, '$set', function $set(index, val) {
        if (index >= this.length) {
            this.length = Number(index) + 1;
        }
        return this.splice(index, 1, val)[0];
    });

    /**
     * Convenience method to remove the element at given index or target element reference.
     *
     * @param {*} item
     */

    def(arrayProto, '$remove', function $remove(item) {
        /* istanbul ignore if */
        if (!this.length) return;
        var index = indexOf(this, item);
        if (index > -1) {
            return this.splice(index, 1);
        }
    });

    var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

    /**
     * By default, when a reactive property is set, the new value is
     * also converted to become reactive. However in certain cases, e.g.
     * v-for scope alias and props, we don't want to force conversion
     * because the value may be a nested value under a frozen data structure.
     *
     * So whenever we want to set a reactive property without forcing
     * conversion on the new value, we wrap that call inside this function.
     */

    var shouldConvert = true;

    function withoutConversion(fn) {
        shouldConvert = false;
        fn();
        shouldConvert = true;
    }

    /**
     * Observer class that are attached to each observed
     * object. Once attached, the observer converts target
     * object's property keys into getter/setters that
     * collect dependencies and dispatches updates.
     *
     * @param {Array|Object} value
     * @constructor
     */

    function Observer(value) {
        this.value = value;
        this.dep = new Dep();
        def(value, '__ob__', this);
        if (isArray(value)) {
            var augment = hasProto ? protoAugment : copyAugment;
            augment(value, arrayMethods, arrayKeys);
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    // Instance methods

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     *
     * @param {Object} obj
     */

    Observer.prototype.walk = function (obj) {
        var keys = Object.keys(obj);
        for (var i = 0, l = keys.length; i < l; i++) {
            this.convert(keys[i], obj[keys[i]]);
        }
    };

    /**
     * Observe a list of Array items.
     *
     * @param {Array} items
     */

    Observer.prototype.observeArray = function (items) {
        for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    };

    /**
     * Convert a property into getter/setter so we can emit
     * the events when the property is accessed/changed.
     *
     * @param {String} key
     * @param {*} val
     */

    Observer.prototype.convert = function (key, val) {
        defineReactive(this.value, key, val);
    };

    /**
     * Add an owner vm, so that when $set/$delete mutations
     * happen we can notify owner vms to proxy the keys and
     * digest the watchers. This is only called when the object
     * is observed as an instance's root $data.
     *
     * @param {Vue} vm
     */

    Observer.prototype.addVm = function (vm) {
        (this.vms || (this.vms = [])).push(vm);
    };

    /**
     * Remove an owner vm. This is called when the object is
     * swapped out as an instance's $data object.
     *
     * @param {Vue} vm
     */

    Observer.prototype.removeVm = function (vm) {
        this.vms.$remove(vm);
    };

    // helpers

    /**
     * Augment an target Object or Array by intercepting
     * the prototype chain using __proto__
     *
     * @param {Object|Array} target
     * @param {Object} src
     */

    function protoAugment(target, src) {
        /* eslint-disable no-proto */
        target.__proto__ = src;
        /* eslint-enable no-proto */
    }

    /**
     * Augment an target Object or Array by defining
     * hidden properties.
     *
     * @param {Object|Array} target
     * @param {Object} proto
     */

    function copyAugment(target, src, keys) {
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            def(target, key, src[key]);
        }
    }

    /**
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     *
     * @param {*} value
     * @param {Vue} [vm]
     * @return {Observer|undefined}
     * @static
     */

    function observe(value, vm) {
        if (!value || typeof value !== 'object') {
            return;
        }
        var ob;
        if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
            ob = value.__ob__;
        } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
            ob = new Observer(value);
        }
        if (ob && vm) {
            ob.addVm(vm);
        }
        return ob;
    }

    /**
     * Define a reactive property on an Object.
     *
     * @param {Object} obj
     * @param {String} key
     * @param {*} val
     */

    function defineReactive(obj, key, val) {
        var dep = new Dep();

        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
            return;
        }

        // cater for pre-defined getter/setters
        var getter = property && property.get;
        var setter = property && property.set;

        var childOb = observe(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                var value = getter ? getter.call(obj) : val;
                if (Dep.target) {
                    dep.depend();
                    if (childOb) {
                        childOb.dep.depend();
                    }
                    if (isArray(value)) {
                        for (var e, i = 0, l = value.length; i < l; i++) {
                            e = value[i];
                            e && e.__ob__ && e.__ob__.dep.depend();
                        }
                    }
                }
                return value;
            },
            set: function reactiveSetter(newVal) {
                var value = getter ? getter.call(obj) : val;
                if (newVal === value) {
                    return;
                }
                if (setter) {
                    setter.call(obj, newVal);
                } else {
                    val = newVal;
                }
                childOb = observe(newVal);
                dep.notify();
            }
        });
    }



    var util = Object.freeze({
        defineReactive: defineReactive,
        set: set,
        del: del,
        hasOwn: hasOwn,
        isLiteral: isLiteral,
        isReserved: isReserved,
        _toString: _toString,
        toNumber: toNumber,
        toBoolean: toBoolean,
        stripQuotes: stripQuotes,
        camelize: camelize,
        hyphenate: hyphenate,
        classify: classify,
        bind: bind,
        toArray: toArray,
        extend: extend,
        isObject: isObject,
        isPlainObject: isPlainObject,
        def: def,
        debounce: _debounce,
        indexOf: indexOf,
        cancellable: cancellable,
        looseEqual: looseEqual,
        isArray: isArray,
        hasProto: hasProto,
        inBrowser: inBrowser,
        devtools: devtools,
        isIE: isIE,
        isIE9: isIE9,
        isAndroid: isAndroid,
        isIos: isIos,
        iosVersionMatch: iosVersionMatch,
        iosVersion: iosVersion,
        hasMutationObserverBug: hasMutationObserverBug,
        get transitionProp () { return transitionProp; },
        get transitionEndEvent () { return transitionEndEvent; },
        get animationProp () { return animationProp; },
        get animationEndEvent () { return animationEndEvent; },
        nextTick: nextTick,
        get _Set () { return _Set; },
        query: query,
        inDoc: inDoc,
        getAttr: getAttr,
        getBindAttr: getBindAttr,
        hasBindAttr: hasBindAttr,
        before: before,
        after: after,
        remove: remove,
        prepend: prepend,
        replace: replace,
        on: on,
        off: off,
        setClass: setClass,
        addClass: addClass,
        removeClass: removeClass,
        extractContent: extractContent,
        trimNode: trimNode,
        isTemplate: isTemplate,
        createAnchor: createAnchor,
        findRef: findRef,
        mapNodeRange: mapNodeRange,
        removeNodeRange: removeNodeRange,
        isFragment: isFragment,
        getOuterHTML: getOuterHTML,
        mergeOptions: mergeOptions,
        resolveAsset: resolveAsset,
        checkComponentAttr: checkComponentAttr,
        commonTagRE: commonTagRE,
        reservedTagRE: reservedTagRE,
        get warn () { return warn; }
    });

    var uid = 0;

    function initMixin (Vue) {
        /**
         * The main init sequence. This is called for every
         * instance, including ones that are created from extended
         * constructors.
         *
         * @param {Object} options - this options object should be
         *                           the result of merging class
         *                           options and the options passed
         *                           in to the constructor.
         */

        Vue.prototype._init = function (options) {
            options = options || {};

            this.$el = null;
            this.$parent = options.parent;
            this.$root = this.$parent ? this.$parent.$root : this;
            this.$children = [];
            this.$refs = {}; // child vm references
            this.$els = {}; // element references
            this._watchers = []; // all watchers as an array
            this._directives = []; // all directives

            // a uid
            this._uid = uid++;

            // a flag to avoid this being observed
            this._isVue = true;

            // events bookkeeping
            this._events = {}; // registered callbacks
            this._eventsCount = {}; // for $broadcast optimization

            // fragment instance properties
            this._isFragment = false;
            this._fragment = // @type {DocumentFragment}
                this._fragmentStart = // @type {Text|Comment}
                    this._fragmentEnd = null; // @type {Text|Comment}

            // lifecycle state
            this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
            this._unlinkFn = null;

            // context:
            // if this is a transcluded component, context
            // will be the common parent vm of this instance
            // and its host.
            this._context = options._context || this.$parent;

            // scope:
            // if this is inside an inline v-for, the scope
            // will be the intermediate scope created for this
            // repeat fragment. this is used for linking props
            // and container directives.
            this._scope = options._scope;

            // fragment:
            // if this instance is compiled inside a Fragment, it
            // needs to reigster itself as a child of that fragment
            // for attach/detach to work properly.
            this._frag = options._frag;
            if (this._frag) {
                this._frag.children.push(this);
            }

            // push self into parent / transclusion host
            if (this.$parent) {
                this.$parent.$children.push(this);
            }

            // merge options.
            options = this.$options = mergeOptions(this.constructor.options, options, this);

            // set ref
            this._updateRef();

            // initialize data as empty object.
            // it will be filled up in _initData().
            this._data = {};

            // call init hook
            this._callHook('init');

            // initialize data observation and scope inheritance.
            this._initState();

            // setup event system and option events.
            this._initEvents();

            // call created hook
            this._callHook('created');

            // if `el` option is passed, start compilation.
            if (options.el) {
                this.$mount(options.el);
            }
        };
    }

    var pathCache = new Cache(1000);

    // actions
    var APPEND = 0;
    var PUSH = 1;
    var INC_SUB_PATH_DEPTH = 2;
    var PUSH_SUB_PATH = 3;

    // states
    var BEFORE_PATH = 0;
    var IN_PATH = 1;
    var BEFORE_IDENT = 2;
    var IN_IDENT = 3;
    var IN_SUB_PATH = 4;
    var IN_SINGLE_QUOTE = 5;
    var IN_DOUBLE_QUOTE = 6;
    var AFTER_PATH = 7;
    var ERROR = 8;

    var pathStateMachine = [];

    pathStateMachine[BEFORE_PATH] = {
        'ws': [BEFORE_PATH],
        'ident': [IN_IDENT, APPEND],
        '[': [IN_SUB_PATH],
        'eof': [AFTER_PATH]
    };

    pathStateMachine[IN_PATH] = {
        'ws': [IN_PATH],
        '.': [BEFORE_IDENT],
        '[': [IN_SUB_PATH],
        'eof': [AFTER_PATH]
    };

    pathStateMachine[BEFORE_IDENT] = {
        'ws': [BEFORE_IDENT],
        'ident': [IN_IDENT, APPEND]
    };

    pathStateMachine[IN_IDENT] = {
        'ident': [IN_IDENT, APPEND],
        '0': [IN_IDENT, APPEND],
        'number': [IN_IDENT, APPEND],
        'ws': [IN_PATH, PUSH],
        '.': [BEFORE_IDENT, PUSH],
        '[': [IN_SUB_PATH, PUSH],
        'eof': [AFTER_PATH, PUSH]
    };

    pathStateMachine[IN_SUB_PATH] = {
        "'": [IN_SINGLE_QUOTE, APPEND],
        '"': [IN_DOUBLE_QUOTE, APPEND],
        '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
        ']': [IN_PATH, PUSH_SUB_PATH],
        'eof': ERROR,
        'else': [IN_SUB_PATH, APPEND]
    };

    pathStateMachine[IN_SINGLE_QUOTE] = {
        "'": [IN_SUB_PATH, APPEND],
        'eof': ERROR,
        'else': [IN_SINGLE_QUOTE, APPEND]
    };

    pathStateMachine[IN_DOUBLE_QUOTE] = {
        '"': [IN_SUB_PATH, APPEND],
        'eof': ERROR,
        'else': [IN_DOUBLE_QUOTE, APPEND]
    };

    /**
     * Determine the type of a character in a keypath.
     *
     * @param {Char} ch
     * @return {String} type
     */

    function getPathCharType(ch) {
        if (ch === undefined) {
            return 'eof';
        }

        var code = ch.charCodeAt(0);

        switch (code) {
            case 0x5B: // [
            case 0x5D: // ]
            case 0x2E: // .
            case 0x22: // "
            case 0x27: // '
            case 0x30:
                // 0
                return ch;

            case 0x5F: // _
            case 0x24:
                // $
                return 'ident';

            case 0x20: // Space
            case 0x09: // Tab
            case 0x0A: // Newline
            case 0x0D: // Return
            case 0xA0: // No-break space
            case 0xFEFF: // Byte Order Mark
            case 0x2028: // Line Separator
            case 0x2029:
                // Paragraph Separator
                return 'ws';
        }

        // a-z, A-Z
        if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
            return 'ident';
        }

        // 1-9
        if (code >= 0x31 && code <= 0x39) {
            return 'number';
        }

        return 'else';
    }

    /**
     * Format a subPath, return its plain form if it is
     * a literal string or number. Otherwise prepend the
     * dynamic indicator (*).
     *
     * @param {String} path
     * @return {String}
     */

    function formatSubPath(path) {
        var trimmed = path.trim();
        // invalid leading 0
        if (path.charAt(0) === '0' && isNaN(path)) {
            return false;
        }
        return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
    }

    /**
     * Parse a string path into an array of segments
     *
     * @param {String} path
     * @return {Array|undefined}
     */

    function parse(path) {
        var keys = [];
        var index = -1;
        var mode = BEFORE_PATH;
        var subPathDepth = 0;
        var c, newChar, key, type, transition, action, typeMap;

        var actions = [];

        actions[PUSH] = function () {
            if (key !== undefined) {
                keys.push(key);
                key = undefined;
            }
        };

        actions[APPEND] = function () {
            if (key === undefined) {
                key = newChar;
            } else {
                key += newChar;
            }
        };

        actions[INC_SUB_PATH_DEPTH] = function () {
            actions[APPEND]();
            subPathDepth++;
        };

        actions[PUSH_SUB_PATH] = function () {
            if (subPathDepth > 0) {
                subPathDepth--;
                mode = IN_SUB_PATH;
                actions[APPEND]();
            } else {
                subPathDepth = 0;
                key = formatSubPath(key);
                if (key === false) {
                    return false;
                } else {
                    actions[PUSH]();
                }
            }
        };

        function maybeUnescapeQuote() {
            var nextChar = path[index + 1];
            if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
                index++;
                newChar = '\\' + nextChar;
                actions[APPEND]();
                return true;
            }
        }

        while (mode != null) {
            index++;
            c = path[index];

            if (c === '\\' && maybeUnescapeQuote()) {
                continue;
            }

            type = getPathCharType(c);
            typeMap = pathStateMachine[mode];
            transition = typeMap[type] || typeMap['else'] || ERROR;

            if (transition === ERROR) {
                return; // parse error
            }

            mode = transition[0];
            action = actions[transition[1]];
            if (action) {
                newChar = transition[2];
                newChar = newChar === undefined ? c : newChar;
                if (action() === false) {
                    return;
                }
            }

            if (mode === AFTER_PATH) {
                keys.raw = path;
                return keys;
            }
        }
    }

    /**
     * External parse that check for a cache hit first
     *
     * @param {String} path
     * @return {Array|undefined}
     */

    function parsePath(path) {
        var hit = pathCache.get(path);
        if (!hit) {
            hit = parse(path);
            if (hit) {
                pathCache.put(path, hit);
            }
        }
        return hit;
    }

    /**
     * Get from an object from a path string
     *
     * @param {Object} obj
     * @param {String} path
     */

    function getPath(obj, path) {
        return parseExpression(path).get(obj);
    }

    /**
     * Warn against setting non-existent root path on a vm.
     */

    var warnNonExistent;
    if ('development' !== 'production') {
        warnNonExistent = function (path, vm) {
            warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
        };
    }

    /**
     * Set on an object from a path
     *
     * @param {Object} obj
     * @param {String | Array} path
     * @param {*} val
     */

    function setPath(obj, path, val) {
        var original = obj;
        if (typeof path === 'string') {
            path = parse(path);
        }
        if (!path || !isObject(obj)) {
            return false;
        }
        var last, key;
        for (var i = 0, l = path.length; i < l; i++) {
            last = obj;
            key = path[i];
            if (key.charAt(0) === '*') {
                key = parseExpression(key.slice(1)).get.call(original, original);
            }
            if (i < l - 1) {
                obj = obj[key];
                if (!isObject(obj)) {
                    obj = {};
                    if ('development' !== 'production' && last._isVue) {
                        warnNonExistent(path, last);
                    }
                    set(last, key, obj);
                }
            } else {
                if (isArray(obj)) {
                    obj.$set(key, val);
                } else if (key in obj) {
                    obj[key] = val;
                } else {
                    if ('development' !== 'production' && obj._isVue) {
                        warnNonExistent(path, obj);
                    }
                    set(obj, key, val);
                }
            }
        }
        return true;
    }

    var path = Object.freeze({
        parsePath: parsePath,
        getPath: getPath,
        setPath: setPath
    });

    var expressionCache = new Cache(1000);

    var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
    var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

    // keywords that don't make sense inside expressions
    var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
    var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

    var wsRE = /\s/g;
    var newlineRE = /\n/g;
    var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
    var restoreRE = /"(\d+)"/g;
    var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
    var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
    var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

    function noop() {}

    /**
     * Save / Rewrite / Restore
     *
     * When rewriting paths found in an expression, it is
     * possible for the same letter sequences to be found in
     * strings and Object literal property keys. Therefore we
     * remove and store these parts in a temporary array, and
     * restore them after the path rewrite.
     */

    var saved = [];

    /**
     * Save replacer
     *
     * The save regex can match two possible cases:
     * 1. An opening object literal
     * 2. A string
     * If matched as a plain string, we need to escape its
     * newlines, since the string needs to be preserved when
     * generating the function body.
     *
     * @param {String} str
     * @param {String} isString - str if matched as a string
     * @return {String} - placeholder with index
     */

    function save(str, isString) {
        var i = saved.length;
        saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
        return '"' + i + '"';
    }

    /**
     * Path rewrite replacer
     *
     * @param {String} raw
     * @return {String}
     */

    function rewrite(raw) {
        var c = raw.charAt(0);
        var path = raw.slice(1);
        if (allowedKeywordsRE.test(path)) {
            return raw;
        } else {
            path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
            return c + 'scope.' + path;
        }
    }

    /**
     * Restore replacer
     *
     * @param {String} str
     * @param {String} i - matched save index
     * @return {String}
     */

    function restore(str, i) {
        return saved[i];
    }

    /**
     * Rewrite an expression, prefixing all path accessors with
     * `scope.` and generate getter/setter functions.
     *
     * @param {String} exp
     * @return {Function}
     */

    function compileGetter(exp) {
        if (improperKeywordsRE.test(exp)) {
            'development' !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
        }
        // reset state
        saved.length = 0;
        // save strings and object literal keys
        var body = exp.replace(saveRE, save).replace(wsRE, '');
        // rewrite all paths
        // pad 1 space here because the regex matches 1 extra char
        body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
        return makeGetterFn(body);
    }

    /**
     * Build a getter function. Requires eval.
     *
     * We isolate the try/catch so it doesn't affect the
     * optimization of the parse function when it is not called.
     *
     * @param {String} body
     * @return {Function|undefined}
     */

    function makeGetterFn(body) {
        try {
            /* eslint-disable no-new-func */
            return new Function('scope', 'return ' + body + ';');
            /* eslint-enable no-new-func */
        } catch (e) {
            if ('development' !== 'production') {
                /* istanbul ignore if */
                if (e.toString().match(/unsafe-eval|CSP/)) {
                    warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
                } else {
                    warn('Invalid expression. ' + 'Generated function body: ' + body);
                }
            }
            return noop;
        }
    }

    /**
     * Compile a setter function for the expression.
     *
     * @param {String} exp
     * @return {Function|undefined}
     */

    function compileSetter(exp) {
        var path = parsePath(exp);
        if (path) {
            return function (scope, val) {
                setPath(scope, path, val);
            };
        } else {
            'development' !== 'production' && warn('Invalid setter expression: ' + exp);
        }
    }

    /**
     * Parse an expression into re-written getter/setters.
     *
     * @param {String} exp
     * @param {Boolean} needSet
     * @return {Function}
     */

    function parseExpression(exp, needSet) {
        exp = exp.trim();
        // try cache
        var hit = expressionCache.get(exp);
        if (hit) {
            if (needSet && !hit.set) {
                hit.set = compileSetter(hit.exp);
            }
            return hit;
        }
        var res = { exp: exp };
        res.get = isSimplePath(exp) && exp.indexOf('[') < 0
            // optimized super simple getter
            ? makeGetterFn('scope.' + exp)
            // dynamic getter
            : compileGetter(exp);
        if (needSet) {
            res.set = compileSetter(exp);
        }
        expressionCache.put(exp, res);
        return res;
    }

    /**
     * Check if an expression is a simple path.
     *
     * @param {String} exp
     * @return {Boolean}
     */

    function isSimplePath(exp) {
        return pathTestRE.test(exp) &&
            // don't treat literal values as paths
            !literalValueRE$1.test(exp) &&
            // Math constants e.g. Math.PI, Math.E etc.
            exp.slice(0, 5) !== 'Math.';
    }

    var expression = Object.freeze({
        parseExpression: parseExpression,
        isSimplePath: isSimplePath
    });

    // we have two separate queues: one for directive updates
    // and one for user watcher registered via $watch().
    // we want to guarantee directive updates to be called
    // before user watchers so that when user watchers are
    // triggered, the DOM would have already been in updated
    // state.

    var queue = [];
    var userQueue = [];
    var has = {};
    var circular = {};
    var waiting = false;

    /**
     * Reset the batcher's state.
     */

    function resetBatcherState() {
        queue.length = 0;
        userQueue.length = 0;
        has = {};
        circular = {};
        waiting = false;
    }

    /**
     * Flush both queues and run the watchers.
     */

    function flushBatcherQueue() {
        var _again = true;

        _function: while (_again) {
            _again = false;

            runBatcherQueue(queue);
            runBatcherQueue(userQueue);
            // user watchers triggered more watchers,
            // keep flushing until it depletes
            if (queue.length) {
                _again = true;
                continue _function;
            }
            // dev tool hook
            /* istanbul ignore if */
            if (devtools && config.devtools) {
                devtools.emit('flush');
            }
            resetBatcherState();
        }
    }

    /**
     * Run the watchers in a single queue.
     *
     * @param {Array} queue
     */

    function runBatcherQueue(queue) {
        // do not cache length because more watchers might be pushed
        // as we run existing watchers
        for (var i = 0; i < queue.length; i++) {
            var watcher = queue[i];
            var id = watcher.id;
            has[id] = null;
            watcher.run();
            // in dev build, check and stop circular updates.
            if ('development' !== 'production' && has[id] != null) {
                circular[id] = (circular[id] || 0) + 1;
                if (circular[id] > config._maxUpdateCount) {
                    warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
                    break;
                }
            }
        }
        queue.length = 0;
    }

    /**
     * Push a watcher into the watcher queue.
     * Jobs with duplicate IDs will be skipped unless it's
     * pushed when the queue is being flushed.
     *
     * @param {Watcher} watcher
     *   properties:
     *   - {Number} id
     *   - {Function} run
     */

    function pushWatcher(watcher) {
        var id = watcher.id;
        if (has[id] == null) {
            // push watcher into appropriate queue
            var q = watcher.user ? userQueue : queue;
            has[id] = q.length;
            q.push(watcher);
            // queue the flush
            if (!waiting) {
                waiting = true;
                nextTick(flushBatcherQueue);
            }
        }
    }

    var uid$2 = 0;

    /**
     * A watcher parses an expression, collects dependencies,
     * and fires callback when the expression value changes.
     * This is used for both the $watch() api and directives.
     *
     * @param {Vue} vm
     * @param {String|Function} expOrFn
     * @param {Function} cb
     * @param {Object} options
     *                 - {Array} filters
     *                 - {Boolean} twoWay
     *                 - {Boolean} deep
     *                 - {Boolean} user
     *                 - {Boolean} sync
     *                 - {Boolean} lazy
     *                 - {Function} [preProcess]
     *                 - {Function} [postProcess]
     * @constructor
     */
    function Watcher(vm, expOrFn, cb, options) {
        // mix in options
        if (options) {
            extend(this, options);
        }
        var isFn = typeof expOrFn === 'function';
        this.vm = vm;
        vm._watchers.push(this);
        this.expression = expOrFn;
        this.cb = cb;
        this.id = ++uid$2; // uid for batching
        this.active = true;
        this.dirty = this.lazy; // for lazy watchers
        this.deps = [];
        this.newDeps = [];
        this.depIds = new _Set();
        this.newDepIds = new _Set();
        this.prevError = null; // for async error stacks
        // parse expression for getter/setter
        if (isFn) {
            this.getter = expOrFn;
            this.setter = undefined;
        } else {
            var res = parseExpression(expOrFn, this.twoWay);
            this.getter = res.get;
            this.setter = res.set;
        }
        this.value = this.lazy ? undefined : this.get();
        // state for avoiding false triggers for deep and Array
        // watchers during vm._digest()
        this.queued = this.shallow = false;
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */

    Watcher.prototype.get = function () {
        this.beforeGet();
        var scope = this.scope || this.vm;
        var value;
        try {
            value = this.getter.call(scope, scope);
        } catch (e) {
            if ('development' !== 'production' && config.warnExpressionErrors) {
                warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
            }
        }
        // "touch" every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
            traverse(value);
        }
        if (this.preProcess) {
            value = this.preProcess(value);
        }
        if (this.filters) {
            value = scope._applyFilters(value, null, this.filters, false);
        }
        if (this.postProcess) {
            value = this.postProcess(value);
        }
        this.afterGet();
        return value;
    };

    /**
     * Set the corresponding value with the setter.
     *
     * @param {*} value
     */

    Watcher.prototype.set = function (value) {
        var scope = this.scope || this.vm;
        if (this.filters) {
            value = scope._applyFilters(value, this.value, this.filters, true);
        }
        try {
            this.setter.call(scope, scope, value);
        } catch (e) {
            if ('development' !== 'production' && config.warnExpressionErrors) {
                warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
            }
        }
        // two-way sync for v-for alias
        var forContext = scope.$forContext;
        if (forContext && forContext.alias === this.expression) {
            if (forContext.filters) {
                'development' !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
                return;
            }
            forContext._withLock(function () {
                if (scope.$key) {
                    // original is an object
                    forContext.rawValue[scope.$key] = value;
                } else {
                    forContext.rawValue.$set(scope.$index, value);
                }
            });
        }
    };

    /**
     * Prepare for dependency collection.
     */

    Watcher.prototype.beforeGet = function () {
        Dep.target = this;
    };

    /**
     * Add a dependency to this directive.
     *
     * @param {Dep} dep
     */

    Watcher.prototype.addDep = function (dep) {
        var id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    };

    /**
     * Clean up for dependency collection.
     */

    Watcher.prototype.afterGet = function () {
        Dep.target = null;
        var i = this.deps.length;
        while (i--) {
            var dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this);
            }
        }
        var tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
    };

    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     *
     * @param {Boolean} shallow
     */

    Watcher.prototype.update = function (shallow) {
        if (this.lazy) {
            this.dirty = true;
        } else if (this.sync || !config.async) {
            this.run();
        } else {
            // if queued, only overwrite shallow with non-shallow,
            // but not the other way around.
            this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
            this.queued = true;
            // record before-push error stack in debug mode
            /* istanbul ignore if */
            if ('development' !== 'production' && config.debug) {
                this.prevError = new Error('[vue] async stack trace');
            }
            pushWatcher(this);
        }
    };

    /**
     * Batcher job interface.
     * Will be called by the batcher.
     */

    Watcher.prototype.run = function () {
        if (this.active) {
            var value = this.get();
            if (value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated; but only do so if this is a
                // non-shallow update (caused by a vm digest).
                (isObject(value) || this.deep) && !this.shallow) {
                // set new value
                var oldValue = this.value;
                this.value = value;
                // in debug + async mode, when a watcher callbacks
                // throws, we also throw the saved before-push error
                // so the full cross-tick stack trace is available.
                var prevError = this.prevError;
                /* istanbul ignore if */
                if ('development' !== 'production' && config.debug && prevError) {
                    this.prevError = null;
                    try {
                        this.cb.call(this.vm, value, oldValue);
                    } catch (e) {
                        nextTick(function () {
                            throw prevError;
                        }, 0);
                        throw e;
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue);
                }
            }
            this.queued = this.shallow = false;
        }
    };

    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */

    Watcher.prototype.evaluate = function () {
        // avoid overwriting another watcher that is being
        // collected.
        var current = Dep.target;
        this.value = this.get();
        this.dirty = false;
        Dep.target = current;
    };

    /**
     * Depend on all deps collected by this watcher.
     */

    Watcher.prototype.depend = function () {
        var i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    };

    /**
     * Remove self from all dependencies' subcriber list.
     */

    Watcher.prototype.teardown = function () {
        if (this.active) {
            // remove self from vm's watcher list
            // this is a somewhat expensive operation so we skip it
            // if the vm is being destroyed or is performing a v-for
            // re-render (the watcher list is then filtered by v-for).
            if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
                this.vm._watchers.$remove(this);
            }
            var i = this.deps.length;
            while (i--) {
                this.deps[i].removeSub(this);
            }
            this.active = false;
            this.vm = this.cb = this.value = null;
        }
    };

    /**
     * Recrusively traverse an object to evoke all converted
     * getters, so that every nested property inside the object
     * is collected as a "deep" dependency.
     *
     * @param {*} val
     */

    var seenObjects = new _Set();
    function traverse(val, seen) {
        var i = undefined,
            keys = undefined;
        if (!seen) {
            seen = seenObjects;
            seen.clear();
        }
        var isA = isArray(val);
        var isO = isObject(val);
        if ((isA || isO) && Object.isExtensible(val)) {
            if (val.__ob__) {
                var depId = val.__ob__.dep.id;
                if (seen.has(depId)) {
                    return;
                } else {
                    seen.add(depId);
                }
            }
            if (isA) {
                i = val.length;
                while (i--) traverse(val[i], seen);
            } else if (isO) {
                keys = Object.keys(val);
                i = keys.length;
                while (i--) traverse(val[keys[i]], seen);
            }
        }
    }

    var text$1 = {

        bind: function bind() {
            this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
        },

        update: function update(value) {
            this.el[this.attr] = _toString(value);
        }
    };

    var templateCache = new Cache(1000);
    var idSelectorCache = new Cache(1000);

    var map = {
        efault: [0, '', ''],
        legend: [1, '<fieldset>', '</fieldset>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
    };

    map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

    map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

    map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

    map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

    /**
     * Check if a node is a supported template node with a
     * DocumentFragment content.
     *
     * @param {Node} node
     * @return {Boolean}
     */

    function isRealTemplate(node) {
        return isTemplate(node) && isFragment(node.content);
    }

    var tagRE$1 = /<([\w:-]+)/;
    var entityRE = /&#?\w+?;/;
    var commentRE = /<!--/;

    /**
     * Convert a string template to a DocumentFragment.
     * Determines correct wrapping by tag types. Wrapping
     * strategy found in jQuery & component/domify.
     *
     * @param {String} templateString
     * @param {Boolean} raw
     * @return {DocumentFragment}
     */

    function stringToFragment(templateString, raw) {
        // try a cache hit first
        var cacheKey = raw ? templateString : templateString.trim();
        var hit = templateCache.get(cacheKey);
        if (hit) {
            return hit;
        }

        var frag = document.createDocumentFragment();
        var tagMatch = templateString.match(tagRE$1);
        var entityMatch = entityRE.test(templateString);
        var commentMatch = commentRE.test(templateString);

        if (!tagMatch && !entityMatch && !commentMatch) {
            // text only, return a single text node.
            frag.appendChild(document.createTextNode(templateString));
        } else {
            var tag = tagMatch && tagMatch[1];
            var wrap = map[tag] || map.efault;
            var depth = wrap[0];
            var prefix = wrap[1];
            var suffix = wrap[2];
            var node = document.createElement('div');

            node.innerHTML = prefix + templateString + suffix;
            while (depth--) {
                node = node.lastChild;
            }

            var child;
            /* eslint-disable no-cond-assign */
            while (child = node.firstChild) {
                /* eslint-enable no-cond-assign */
                frag.appendChild(child);
            }
        }
        if (!raw) {
            trimNode(frag);
        }
        templateCache.put(cacheKey, frag);
        return frag;
    }

    /**
     * Convert a template node to a DocumentFragment.
     *
     * @param {Node} node
     * @return {DocumentFragment}
     */

    function nodeToFragment(node) {
        // if its a template tag and the browser supports it,
        // its content is already a document fragment. However, iOS Safari has
        // bug when using directly cloned template content with touch
        // events and can cause crashes when the nodes are removed from DOM, so we
        // have to treat template elements as string templates. (#2805)
        /* istanbul ignore if */
        if (isRealTemplate(node)) {
            return stringToFragment(node.innerHTML);
        }
        // script template
        if (node.tagName === 'SCRIPT') {
            return stringToFragment(node.textContent);
        }
        // normal node, clone it to avoid mutating the original
        var clonedNode = cloneNode(node);
        var frag = document.createDocumentFragment();
        var child;
        /* eslint-disable no-cond-assign */
        while (child = clonedNode.firstChild) {
            /* eslint-enable no-cond-assign */
            frag.appendChild(child);
        }
        trimNode(frag);
        return frag;
    }

    // Test for the presence of the Safari template cloning bug
    // https://bugs.webkit.org/showug.cgi?id=137755
    var hasBrokenTemplate = (function () {
        /* istanbul ignore else */
        if (inBrowser) {
            var a = document.createElement('div');
            a.innerHTML = '<template>1</template>';
            return !a.cloneNode(true).firstChild.innerHTML;
        } else {
            return false;
        }
    })();

    // Test for IE10/11 textarea placeholder clone bug
    var hasTextareaCloneBug = (function () {
        /* istanbul ignore else */
        if (inBrowser) {
            var t = document.createElement('textarea');
            t.placeholder = 't';
            return t.cloneNode(true).value === 't';
        } else {
            return false;
        }
    })();

    /**
     * 1. Deal with Safari cloning nested <template> bug by
     *    manually cloning all template instances.
     * 2. Deal with IE10/11 textarea placeholder bug by setting
     *    the correct value after cloning.
     *
     * @param {Element|DocumentFragment} node
     * @return {Element|DocumentFragment}
     */

    function cloneNode(node) {
        /* istanbul ignore if */
        if (!node.querySelectorAll) {
            return node.cloneNode();
        }
        var res = node.cloneNode(true);
        var i, original, cloned;
        /* istanbul ignore if */
        if (hasBrokenTemplate) {
            var tempClone = res;
            if (isRealTemplate(node)) {
                node = node.content;
                tempClone = res.content;
            }
            original = node.querySelectorAll('template');
            if (original.length) {
                cloned = tempClone.querySelectorAll('template');
                i = cloned.length;
                while (i--) {
                    cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
                }
            }
        }
        /* istanbul ignore if */
        if (hasTextareaCloneBug) {
            if (node.tagName === 'TEXTAREA') {
                res.value = node.value;
            } else {
                original = node.querySelectorAll('textarea');
                if (original.length) {
                    cloned = res.querySelectorAll('textarea');
                    i = cloned.length;
                    while (i--) {
                        cloned[i].value = original[i].value;
                    }
                }
            }
        }
        return res;
    }

    /**
     * Process the template option and normalizes it into a
     * a DocumentFragment that can be used as a partial or a
     * instance template.
     *
     * @param {*} template
     *        Possible values include:
     *        - DocumentFragment object
     *        - Node object of type Template
     *        - id selector: '#some-template-id'
     *        - template string: '<div><span>{{msg}}</span></div>'
     * @param {Boolean} shouldClone
     * @param {Boolean} raw
     *        inline HTML interpolation. Do not check for id
     *        selector and keep whitespace in the string.
     * @return {DocumentFragment|undefined}
     */

    function parseTemplate(template, shouldClone, raw) {
        var node, frag;

        // if the template is already a document fragment,
        // do nothing
        if (isFragment(template)) {
            trimNode(template);
            return shouldClone ? cloneNode(template) : template;
        }

        if (typeof template === 'string') {
            // id selector
            if (!raw && template.charAt(0) === '#') {
                // id selector can be cached too
                frag = idSelectorCache.get(template);
                if (!frag) {
                    node = document.getElementById(template.slice(1));
                    if (node) {
                        frag = nodeToFragment(node);
                        // save selector to cache
                        idSelectorCache.put(template, frag);
                    }
                }
            } else {
                // normal string template
                frag = stringToFragment(template, raw);
            }
        } else if (template.nodeType) {
            // a direct node
            frag = nodeToFragment(template);
        }

        return frag && shouldClone ? cloneNode(frag) : frag;
    }

    var template = Object.freeze({
        cloneNode: cloneNode,
        parseTemplate: parseTemplate
    });

    var html = {

        bind: function bind() {
            // a comment node means this is a binding for
            // {{{ inline unescaped html }}}
            if (this.el.nodeType === 8) {
                // hold nodes
                this.nodes = [];
                // replace the placeholder with proper anchor
                this.anchor = createAnchor('v-html');
                replace(this.el, this.anchor);
            }
        },

        update: function update(value) {
            value = _toString(value);
            if (this.nodes) {
                this.swap(value);
            } else {
                this.el.innerHTML = value;
            }
        },

        swap: function swap(value) {
            // remove old nodes
            var i = this.nodes.length;
            while (i--) {
                remove(this.nodes[i]);
            }
            // convert new value to a fragment
            // do not attempt to retrieve from id selector
            var frag = parseTemplate(value, true, true);
            // save a reference to these nodes so we can remove later
            this.nodes = toArray(frag.childNodes);
            before(frag, this.anchor);
        }
    };

    /**
     * Abstraction for a partially-compiled fragment.
     * Can optionally compile content with a child scope.
     *
     * @param {Function} linker
     * @param {Vue} vm
     * @param {DocumentFragment} frag
     * @param {Vue} [host]
     * @param {Object} [scope]
     * @param {Fragment} [parentFrag]
     */
    function Fragment(linker, vm, frag, host, scope, parentFrag) {
        this.children = [];
        this.childFrags = [];
        this.vm = vm;
        this.scope = scope;
        this.inserted = false;
        this.parentFrag = parentFrag;
        if (parentFrag) {
            parentFrag.childFrags.push(this);
        }
        this.unlink = linker(vm, frag, host, scope, this);
        var single = this.single = frag.childNodes.length === 1 &&
            // do not go single mode if the only node is an anchor
            !frag.childNodes[0].__v_anchor;
        if (single) {
            this.node = frag.childNodes[0];
            this.before = singleBefore;
            this.remove = singleRemove;
        } else {
            this.node = createAnchor('fragment-start');
            this.end = createAnchor('fragment-end');
            this.frag = frag;
            prepend(this.node, frag);
            frag.appendChild(this.end);
            this.before = multiBefore;
            this.remove = multiRemove;
        }
        this.node.__v_frag = this;
    }

    /**
     * Call attach/detach for all components contained within
     * this fragment. Also do so recursively for all child
     * fragments.
     *
     * @param {Function} hook
     */

    Fragment.prototype.callHook = function (hook) {
        var i, l;
        for (i = 0, l = this.childFrags.length; i < l; i++) {
            this.childFrags[i].callHook(hook);
        }
        for (i = 0, l = this.children.length; i < l; i++) {
            hook(this.children[i]);
        }
    };

    /**
     * Insert fragment before target, single node version
     *
     * @param {Node} target
     * @param {Boolean} withTransition
     */

    function singleBefore(target, withTransition) {
        this.inserted = true;
        var method = withTransition !== false ? beforeWithTransition : before;
        method(this.node, target, this.vm);
        if (inDoc(this.node)) {
            this.callHook(attach);
        }
    }

    /**
     * Remove fragment, single node version
     */

    function singleRemove() {
        this.inserted = false;
        var shouldCallRemove = inDoc(this.node);
        var self = this;
        this.beforeRemove();
        removeWithTransition(this.node, this.vm, function () {
            if (shouldCallRemove) {
                self.callHook(detach);
            }
            self.destroy();
        });
    }

    /**
     * Insert fragment before target, multi-nodes version
     *
     * @param {Node} target
     * @param {Boolean} withTransition
     */

    function multiBefore(target, withTransition) {
        this.inserted = true;
        var vm = this.vm;
        var method = withTransition !== false ? beforeWithTransition : before;
        mapNodeRange(this.node, this.end, function (node) {
            method(node, target, vm);
        });
        if (inDoc(this.node)) {
            this.callHook(attach);
        }
    }

    /**
     * Remove fragment, multi-nodes version
     */

    function multiRemove() {
        this.inserted = false;
        var self = this;
        var shouldCallRemove = inDoc(this.node);
        this.beforeRemove();
        removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
            if (shouldCallRemove) {
                self.callHook(detach);
            }
            self.destroy();
        });
    }

    /**
     * Prepare the fragment for removal.
     */

    Fragment.prototype.beforeRemove = function () {
        var i, l;
        for (i = 0, l = this.childFrags.length; i < l; i++) {
            // call the same method recursively on child
            // fragments, depth-first
            this.childFrags[i].beforeRemove(false);
        }
        for (i = 0, l = this.children.length; i < l; i++) {
            // Call destroy for all contained instances,
            // with remove:false and defer:true.
            // Defer is necessary because we need to
            // keep the children to call detach hooks
            // on them.
            this.children[i].$destroy(false, true);
        }
        var dirs = this.unlink.dirs;
        for (i = 0, l = dirs.length; i < l; i++) {
            // disable the watchers on all the directives
            // so that the rendered content stays the same
            // during removal.
            dirs[i]._watcher && dirs[i]._watcher.teardown();
        }
    };

    /**
     * Destroy the fragment.
     */

    Fragment.prototype.destroy = function () {
        if (this.parentFrag) {
            this.parentFrag.childFrags.$remove(this);
        }
        this.node.__v_frag = null;
        this.unlink();
    };

    /**
     * Call attach hook for a Vue instance.
     *
     * @param {Vue} child
     */

    function attach(child) {
        if (!child._isAttached && inDoc(child.$el)) {
            child._callHook('attached');
        }
    }

    /**
     * Call detach hook for a Vue instance.
     *
     * @param {Vue} child
     */

    function detach(child) {
        if (child._isAttached && !inDoc(child.$el)) {
            child._callHook('detached');
        }
    }

    var linkerCache = new Cache(5000);

    /**
     * A factory that can be used to create instances of a
     * fragment. Caches the compiled linker if possible.
     *
     * @param {Vue} vm
     * @param {Element|String} el
     */
    function FragmentFactory(vm, el) {
        this.vm = vm;
        var template;
        var isString = typeof el === 'string';
        if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
            template = parseTemplate(el, true);
        } else {
            template = document.createDocumentFragment();
            template.appendChild(el);
        }
        this.template = template;
        // linker can be cached, but only for components
        var linker;
        var cid = vm.constructor.cid;
        if (cid > 0) {
            var cacheId = cid + (isString ? el : getOuterHTML(el));
            linker = linkerCache.get(cacheId);
            if (!linker) {
                linker = compile(template, vm.$options, true);
                linkerCache.put(cacheId, linker);
            }
        } else {
            linker = compile(template, vm.$options, true);
        }
        this.linker = linker;
    }

    /**
     * Create a fragment instance with given host and scope.
     *
     * @param {Vue} host
     * @param {Object} scope
     * @param {Fragment} parentFrag
     */

    FragmentFactory.prototype.create = function (host, scope, parentFrag) {
        var frag = cloneNode(this.template);
        return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
    };

    var ON = 700;
    var MODEL = 800;
    var BIND = 850;
    var TRANSITION = 1100;
    var EL = 1500;
    var COMPONENT = 1500;
    var PARTIAL = 1750;
    var IF = 2100;
    var FOR = 2200;
    var SLOT = 2300;

    var uid$3 = 0;

    var vFor = {

        priority: FOR,
        terminal: true,

        params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

        bind: function bind() {
            // support "item in/of items" syntax
            var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
            if (inMatch) {
                var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
                if (itMatch) {
                    this.iterator = itMatch[1].trim();
                    this.alias = itMatch[2].trim();
                } else {
                    this.alias = inMatch[1].trim();
                }
                this.expression = inMatch[2];
            }

            if (!this.alias) {
                'development' !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
                return;
            }

            // uid as a cache identifier
            this.id = '__v-for__' + ++uid$3;

            // check if this is an option list,
            // so that we know if we need to update the <select>'s
            // v-model when the option list has changed.
            // because v-model has a lower priority than v-for,
            // the v-model is not bound here yet, so we have to
            // retrive it in the actual updateModel() function.
            var tag = this.el.tagName;
            this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

            // setup anchor nodes
            this.start = createAnchor('v-for-start');
            this.end = createAnchor('v-for-end');
            replace(this.el, this.end);
            before(this.start, this.end);

            // cache
            this.cache = Object.create(null);

            // fragment factory
            this.factory = new FragmentFactory(this.vm, this.el);
        },

        update: function update(data) {
            this.diff(data);
            this.updateRef();
            this.updateModel();
        },

        /**
         * Diff, based on new data and old data, determine the
         * minimum amount of DOM manipulations needed to make the
         * DOM reflect the new data Array.
         *
         * The algorithm diffs the new data Array by storing a
         * hidden reference to an owner vm instance on previously
         * seen data. This allows us to achieve O(n) which is
         * better than a levenshtein distance based algorithm,
         * which is O(m * n).
         *
         * @param {Array} data
         */

        diff: function diff(data) {
            // check if the Array was converted from an Object
            var item = data[0];
            var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

            var trackByKey = this.params.trackBy;
            var oldFrags = this.frags;
            var frags = this.frags = new Array(data.length);
            var alias = this.alias;
            var iterator = this.iterator;
            var start = this.start;
            var end = this.end;
            var inDocument = inDoc(start);
            var init = !oldFrags;
            var i, l, frag, key, value, primitive;

            // First pass, go through the new Array and fill up
            // the new frags array. If a piece of data has a cached
            // instance for it, we reuse it. Otherwise build a new
            // instance.
            for (i = 0, l = data.length; i < l; i++) {
                item = data[i];
                key = convertedFromObject ? item.$key : null;
                value = convertedFromObject ? item.$value : item;
                primitive = !isObject(value);
                frag = !init && this.getCachedFrag(value, i, key);
                if (frag) {
                    // reusable fragment
                    frag.reused = true;
                    // update $index
                    frag.scope.$index = i;
                    // update $key
                    if (key) {
                        frag.scope.$key = key;
                    }
                    // update iterator
                    if (iterator) {
                        frag.scope[iterator] = key !== null ? key : i;
                    }
                    // update data for track-by, object repeat &
                    // primitive values.
                    if (trackByKey || convertedFromObject || primitive) {
                        withoutConversion(function () {
                            frag.scope[alias] = value;
                        });
                    }
                } else {
                    // new isntance
                    frag = this.create(value, alias, i, key);
                    frag.fresh = !init;
                }
                frags[i] = frag;
                if (init) {
                    frag.before(end);
                }
            }

            // we're done for the initial render.
            if (init) {
                return;
            }

            // Second pass, go through the old fragments and
            // destroy those who are not reused (and remove them
            // from cache)
            var removalIndex = 0;
            var totalRemoved = oldFrags.length - frags.length;
            // when removing a large number of fragments, watcher removal
            // turns out to be a perf bottleneck, so we batch the watcher
            // removals into a single filter call!
            this.vm._vForRemoving = true;
            for (i = 0, l = oldFrags.length; i < l; i++) {
                frag = oldFrags[i];
                if (!frag.reused) {
                    this.deleteCachedFrag(frag);
                    this.remove(frag, removalIndex++, totalRemoved, inDocument);
                }
            }
            this.vm._vForRemoving = false;
            if (removalIndex) {
                this.vm._watchers = this.vm._watchers.filter(function (w) {
                    return w.active;
                });
            }

            // Final pass, move/insert new fragments into the
            // right place.
            var targetPrev, prevEl, currentPrev;
            var insertionIndex = 0;
            for (i = 0, l = frags.length; i < l; i++) {
                frag = frags[i];
                // this is the frag that we should be after
                targetPrev = frags[i - 1];
                prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
                if (frag.reused && !frag.staggerCb) {
                    currentPrev = findPrevFrag(frag, start, this.id);
                    if (currentPrev !== targetPrev && (!currentPrev ||
                        // optimization for moving a single item.
                        // thanks to suggestions by @livoras in #1807
                        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
                        this.move(frag, prevEl);
                    }
                } else {
                    // new instance, or still in stagger.
                    // insert with updated stagger index.
                    this.insert(frag, insertionIndex++, prevEl, inDocument);
                }
                frag.reused = frag.fresh = false;
            }
        },

        /**
         * Create a new fragment instance.
         *
         * @param {*} value
         * @param {String} alias
         * @param {Number} index
         * @param {String} [key]
         * @return {Fragment}
         */

        create: function create(value, alias, index, key) {
            var host = this._host;
            // create iteration scope
            var parentScope = this._scope || this.vm;
            var scope = Object.create(parentScope);
            // ref holder for the scope
            scope.$refs = Object.create(parentScope.$refs);
            scope.$els = Object.create(parentScope.$els);
            // make sure point $parent to parent scope
            scope.$parent = parentScope;
            // for two-way binding on alias
            scope.$forContext = this;
            // define scope properties
            // important: define the scope alias without forced conversion
            // so that frozen data structures remain non-reactive.
            withoutConversion(function () {
                defineReactive(scope, alias, value);
            });
            defineReactive(scope, '$index', index);
            if (key) {
                defineReactive(scope, '$key', key);
            } else if (scope.$key) {
                // avoid accidental fallback
                def(scope, '$key', null);
            }
            if (this.iterator) {
                defineReactive(scope, this.iterator, key !== null ? key : index);
            }
            var frag = this.factory.create(host, scope, this._frag);
            frag.forId = this.id;
            this.cacheFrag(value, frag, index, key);
            return frag;
        },

        /**
         * Update the v-ref on owner vm.
         */

        updateRef: function updateRef() {
            var ref = this.descriptor.ref;
            if (!ref) return;
            var hash = (this._scope || this.vm).$refs;
            var refs;
            if (!this.fromObject) {
                refs = this.frags.map(findVmFromFrag);
            } else {
                refs = {};
                this.frags.forEach(function (frag) {
                    refs[frag.scope.$key] = findVmFromFrag(frag);
                });
            }
            hash[ref] = refs;
        },

        /**
         * For option lists, update the containing v-model on
         * parent <select>.
         */

        updateModel: function updateModel() {
            if (this.isOption) {
                var parent = this.start.parentNode;
                var model = parent && parent.__v_model;
                if (model) {
                    model.forceUpdate();
                }
            }
        },

        /**
         * Insert a fragment. Handles staggering.
         *
         * @param {Fragment} frag
         * @param {Number} index
         * @param {Node} prevEl
         * @param {Boolean} inDocument
         */

        insert: function insert(frag, index, prevEl, inDocument) {
            if (frag.staggerCb) {
                frag.staggerCb.cancel();
                frag.staggerCb = null;
            }
            var staggerAmount = this.getStagger(frag, index, null, 'enter');
            if (inDocument && staggerAmount) {
                // create an anchor and insert it synchronously,
                // so that we can resolve the correct order without
                // worrying about some elements not inserted yet
                var anchor = frag.staggerAnchor;
                if (!anchor) {
                    anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
                    anchor.__v_frag = frag;
                }
                after(anchor, prevEl);
                var op = frag.staggerCb = cancellable(function () {
                    frag.staggerCb = null;
                    frag.before(anchor);
                    remove(anchor);
                });
                setTimeout(op, staggerAmount);
            } else {
                var target = prevEl.nextSibling;
                /* istanbul ignore if */
                if (!target) {
                    // reset end anchor position in case the position was messed up
                    // by an external drag-n-drop library.
                    after(this.end, prevEl);
                    target = this.end;
                }
                frag.before(target);
            }
        },

        /**
         * Remove a fragment. Handles staggering.
         *
         * @param {Fragment} frag
         * @param {Number} index
         * @param {Number} total
         * @param {Boolean} inDocument
         */

        remove: function remove(frag, index, total, inDocument) {
            if (frag.staggerCb) {
                frag.staggerCb.cancel();
                frag.staggerCb = null;
                // it's not possible for the same frag to be removed
                // twice, so if we have a pending stagger callback,
                // it means this frag is queued for enter but removed
                // before its transition started. Since it is already
                // destroyed, we can just leave it in detached state.
                return;
            }
            var staggerAmount = this.getStagger(frag, index, total, 'leave');
            if (inDocument && staggerAmount) {
                var op = frag.staggerCb = cancellable(function () {
                    frag.staggerCb = null;
                    frag.remove();
                });
                setTimeout(op, staggerAmount);
            } else {
                frag.remove();
            }
        },

        /**
         * Move a fragment to a new position.
         * Force no transition.
         *
         * @param {Fragment} frag
         * @param {Node} prevEl
         */

        move: function move(frag, prevEl) {
            // fix a common issue with Sortable:
            // if prevEl doesn't have nextSibling, this means it's
            // been dragged after the end anchor. Just re-position
            // the end anchor to the end of the container.
            /* istanbul ignore if */
            if (!prevEl.nextSibling) {
                this.end.parentNode.appendChild(this.end);
            }
            frag.before(prevEl.nextSibling, false);
        },

        /**
         * Cache a fragment using track-by or the object key.
         *
         * @param {*} value
         * @param {Fragment} frag
         * @param {Number} index
         * @param {String} [key]
         */

        cacheFrag: function cacheFrag(value, frag, index, key) {
            var trackByKey = this.params.trackBy;
            var cache = this.cache;
            var primitive = !isObject(value);
            var id;
            if (key || trackByKey || primitive) {
                id = getTrackByKey(index, key, value, trackByKey);
                if (!cache[id]) {
                    cache[id] = frag;
                } else if (trackByKey !== '$index') {
                    'development' !== 'production' && this.warnDuplicate(value);
                }
            } else {
                id = this.id;
                if (hasOwn(value, id)) {
                    if (value[id] === null) {
                        value[id] = frag;
                    } else {
                        'development' !== 'production' && this.warnDuplicate(value);
                    }
                } else if (Object.isExtensible(value)) {
                    def(value, id, frag);
                } else if ('development' !== 'production') {
                    warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
                }
            }
            frag.raw = value;
        },

        /**
         * Get a cached fragment from the value/index/key
         *
         * @param {*} value
         * @param {Number} index
         * @param {String} key
         * @return {Fragment}
         */

        getCachedFrag: function getCachedFrag(value, index, key) {
            var trackByKey = this.params.trackBy;
            var primitive = !isObject(value);
            var frag;
            if (key || trackByKey || primitive) {
                var id = getTrackByKey(index, key, value, trackByKey);
                frag = this.cache[id];
            } else {
                frag = value[this.id];
            }
            if (frag && (frag.reused || frag.fresh)) {
                'development' !== 'production' && this.warnDuplicate(value);
            }
            return frag;
        },

        /**
         * Delete a fragment from cache.
         *
         * @param {Fragment} frag
         */

        deleteCachedFrag: function deleteCachedFrag(frag) {
            var value = frag.raw;
            var trackByKey = this.params.trackBy;
            var scope = frag.scope;
            var index = scope.$index;
            // fix #948: avoid accidentally fall through to
            // a parent repeater which happens to have $key.
            var key = hasOwn(scope, '$key') && scope.$key;
            var primitive = !isObject(value);
            if (trackByKey || key || primitive) {
                var id = getTrackByKey(index, key, value, trackByKey);
                this.cache[id] = null;
            } else {
                value[this.id] = null;
                frag.raw = null;
            }
        },

        /**
         * Get the stagger amount for an insertion/removal.
         *
         * @param {Fragment} frag
         * @param {Number} index
         * @param {Number} total
         * @param {String} type
         */

        getStagger: function getStagger(frag, index, total, type) {
            type = type + 'Stagger';
            var trans = frag.node.__v_trans;
            var hooks = trans && trans.hooks;
            var hook = hooks && (hooks[type] || hooks.stagger);
            return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
        },

        /**
         * Pre-process the value before piping it through the
         * filters. This is passed to and called by the watcher.
         */

        _preProcess: function _preProcess(value) {
            // regardless of type, store the un-filtered raw value.
            this.rawValue = value;
            return value;
        },

        /**
         * Post-process the value after it has been piped through
         * the filters. This is passed to and called by the watcher.
         *
         * It is necessary for this to be called during the
         * watcher's dependency collection phase because we want
         * the v-for to update when the source Object is mutated.
         */

        _postProcess: function _postProcess(value) {
            if (isArray(value)) {
                return value;
            } else if (isPlainObject(value)) {
                // convert plain object to array.
                var keys = Object.keys(value);
                var i = keys.length;
                var res = new Array(i);
                var key;
                while (i--) {
                    key = keys[i];
                    res[i] = {
                        $key: key,
                        $value: value[key]
                    };
                }
                return res;
            } else {
                if (typeof value === 'number' && !isNaN(value)) {
                    value = range(value);
                }
                return value || [];
            }
        },

        unbind: function unbind() {
            if (this.descriptor.ref) {
                (this._scope || this.vm).$refs[this.descriptor.ref] = null;
            }
            if (this.frags) {
                var i = this.frags.length;
                var frag;
                while (i--) {
                    frag = this.frags[i];
                    this.deleteCachedFrag(frag);
                    frag.destroy();
                }
            }
        }
    };

    /**
     * Helper to find the previous element that is a fragment
     * anchor. This is necessary because a destroyed frag's
     * element could still be lingering in the DOM before its
     * leaving transition finishes, but its inserted flag
     * should have been set to false so we can skip them.
     *
     * If this is a block repeat, we want to make sure we only
     * return frag that is bound to this v-for. (see #929)
     *
     * @param {Fragment} frag
     * @param {Comment|Text} anchor
     * @param {String} id
     * @return {Fragment}
     */

    function findPrevFrag(frag, anchor, id) {
        var el = frag.node.previousSibling;
        /* istanbul ignore if */
        if (!el) return;
        frag = el.__v_frag;
        while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
            el = el.previousSibling;
            /* istanbul ignore if */
            if (!el) return;
            frag = el.__v_frag;
        }
        return frag;
    }

    /**
     * Find a vm from a fragment.
     *
     * @param {Fragment} frag
     * @return {Vue|undefined}
     */

    function findVmFromFrag(frag) {
        var node = frag.node;
        // handle multi-node frag
        if (frag.end) {
            while (!node.__vue__ && node !== frag.end && node.nextSibling) {
                node = node.nextSibling;
            }
        }
        return node.__vue__;
    }

    /**
     * Create a range array from given number.
     *
     * @param {Number} n
     * @return {Array}
     */

    function range(n) {
        var i = -1;
        var ret = new Array(Math.floor(n));
        while (++i < n) {
            ret[i] = i;
        }
        return ret;
    }

    /**
     * Get the track by key for an item.
     *
     * @param {Number} index
     * @param {String} key
     * @param {*} value
     * @param {String} [trackByKey]
     */

    function getTrackByKey(index, key, value, trackByKey) {
        return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
    }

    if ('development' !== 'production') {
        vFor.warnDuplicate = function (value) {
            warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
        };
    }

    var vIf = {

        priority: IF,
        terminal: true,

        bind: function bind() {
            var el = this.el;
            if (!el.__vue__) {
                // check else block
                var next = el.nextElementSibling;
                if (next && getAttr(next, 'v-else') !== null) {
                    remove(next);
                    this.elseEl = next;
                }
                // check main block
                this.anchor = createAnchor('v-if');
                replace(el, this.anchor);
            } else {
                'development' !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
                this.invalid = true;
            }
        },

        update: function update(value) {
            if (this.invalid) return;
            if (value) {
                if (!this.frag) {
                    this.insert();
                }
            } else {
                this.remove();
            }
        },

        insert: function insert() {
            if (this.elseFrag) {
                this.elseFrag.remove();
                this.elseFrag = null;
            }
            // lazy init factory
            if (!this.factory) {
                this.factory = new FragmentFactory(this.vm, this.el);
            }
            this.frag = this.factory.create(this._host, this._scope, this._frag);
            this.frag.before(this.anchor);
        },

        remove: function remove() {
            if (this.frag) {
                this.frag.remove();
                this.frag = null;
            }
            if (this.elseEl && !this.elseFrag) {
                if (!this.elseFactory) {
                    this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
                }
                this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
                this.elseFrag.before(this.anchor);
            }
        },

        unbind: function unbind() {
            if (this.frag) {
                this.frag.destroy();
            }
            if (this.elseFrag) {
                this.elseFrag.destroy();
            }
        }
    };

    var show = {

        bind: function bind() {
            // check else block
            var next = this.el.nextElementSibling;
            if (next && getAttr(next, 'v-else') !== null) {
                this.elseEl = next;
            }
        },

        update: function update(value) {
            this.apply(this.el, value);
            if (this.elseEl) {
                this.apply(this.elseEl, !value);
            }
        },

        apply: function apply(el, value) {
            if (inDoc(el)) {
                applyTransition(el, value ? 1 : -1, toggle, this.vm);
            } else {
                toggle();
            }
            function toggle() {
                el.style.display = value ? '' : 'none';
            }
        }
    };

    var text$2 = {

        bind: function bind() {
            var self = this;
            var el = this.el;
            var isRange = el.type === 'range';
            var lazy = this.params.lazy;
            var number = this.params.number;
            var debounce = this.params.debounce;

            // handle composition events.
            //   http://blog.evanyou.me/2014/01/03/composition-event/
            // skip this for Android because it handles composition
            // events quite differently. Android doesn't trigger
            // composition events for language input methods e.g.
            // Chinese, but instead triggers them for spelling
            // suggestions... (see Discussion/#162)
            var composing = false;
            if (!isAndroid && !isRange) {
                this.on('compositionstart', function () {
                    composing = true;
                });
                this.on('compositionend', function () {
                    composing = false;
                    // in IE11 the "compositionend" event fires AFTER
                    // the "input" event, so the input handler is blocked
                    // at the end... have to call it here.
                    //
                    // #1327: in lazy mode this is unecessary.
                    if (!lazy) {
                        self.listener();
                    }
                });
            }

            // prevent messing with the input when user is typing,
            // and force update on blur.
            this.focused = false;
            if (!isRange && !lazy) {
                this.on('focus', function () {
                    self.focused = true;
                });
                this.on('blur', function () {
                    self.focused = false;
                    // do not sync value after fragment removal (#2017)
                    if (!self._frag || self._frag.inserted) {
                        self.rawListener();
                    }
                });
            }

            // Now attach the main listener
            this.listener = this.rawListener = function () {
                if (composing || !self._bound) {
                    return;
                }
                var val = number || isRange ? toNumber(el.value) : el.value;
                self.set(val);
                // force update on next tick to avoid lock & same value
                // also only update when user is not typing
                nextTick(function () {
                    if (self._bound && !self.focused) {
                        self.update(self._watcher.value);
                    }
                });
            };

            // apply debounce
            if (debounce) {
                this.listener = _debounce(this.listener, debounce);
            }

            // Support jQuery events, since jQuery.trigger() doesn't
            // trigger native events in some cases and some plugins
            // rely on $.trigger()
            //
            // We want to make sure if a listener is attached using
            // jQuery, it is also removed with jQuery, that's why
            // we do the check for each directive instance and
            // store that check result on itself. This also allows
            // easier test coverage control by unsetting the global
            // jQuery variable in tests.
            this.hasjQuery = typeof jQuery === 'function';
            if (this.hasjQuery) {
                var method = jQuery.fn.on ? 'on' : 'bind';
                jQuery(el)[method]('change', this.rawListener);
                if (!lazy) {
                    jQuery(el)[method]('input', this.listener);
                }
            } else {
                this.on('change', this.rawListener);
                if (!lazy) {
                    this.on('input', this.listener);
                }
            }

            // IE9 doesn't fire input event on backspace/del/cut
            if (!lazy && isIE9) {
                this.on('cut', function () {
                    nextTick(self.listener);
                });
                this.on('keyup', function (e) {
                    if (e.keyCode === 46 || e.keyCode === 8) {
                        self.listener();
                    }
                });
            }

            // set initial value if present
            if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
                this.afterBind = this.listener;
            }
        },

        update: function update(value) {
            // #3029 only update when the value changes. This prevent
            // browsers from overwriting values like selectionStart
            value = _toString(value);
            if (value !== this.el.value) this.el.value = value;
        },

        unbind: function unbind() {
            var el = this.el;
            if (this.hasjQuery) {
                var method = jQuery.fn.off ? 'off' : 'unbind';
                jQuery(el)[method]('change', this.listener);
                jQuery(el)[method]('input', this.listener);
            }
        }
    };

    var radio = {

        bind: function bind() {
            var self = this;
            var el = this.el;

            this.getValue = function () {
                // value overwrite via v-bind:value
                if (el.hasOwnProperty('_value')) {
                    return el._value;
                }
                var val = el.value;
                if (self.params.number) {
                    val = toNumber(val);
                }
                return val;
            };

            this.listener = function () {
                self.set(self.getValue());
            };
            this.on('change', this.listener);

            if (el.hasAttribute('checked')) {
                this.afterBind = this.listener;
            }
        },

        update: function update(value) {
            this.el.checked = looseEqual(value, this.getValue());
        }
    };

    var select = {

        bind: function bind() {
            var _this = this;

            var self = this;
            var el = this.el;

            // method to force update DOM using latest value.
            this.forceUpdate = function () {
                if (self._watcher) {
                    self.update(self._watcher.get());
                }
            };

            // check if this is a multiple select
            var multiple = this.multiple = el.hasAttribute('multiple');

            // attach listener
            this.listener = function () {
                var value = getValue(el, multiple);
                value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
                self.set(value);
            };
            this.on('change', this.listener);

            // if has initial value, set afterBind
            var initValue = getValue(el, multiple, true);
            if (multiple && initValue.length || !multiple && initValue !== null) {
                this.afterBind = this.listener;
            }

            // All major browsers except Firefox resets
            // selectedIndex with value -1 to 0 when the element
            // is appended to a new parent, therefore we have to
            // force a DOM update whenever that happens...
            this.vm.$on('hook:attached', function () {
                nextTick(_this.forceUpdate);
            });
            if (!inDoc(el)) {
                nextTick(this.forceUpdate);
            }
        },

        update: function update(value) {
            var el = this.el;
            el.selectedIndex = -1;
            var multi = this.multiple && isArray(value);
            var options = el.options;
            var i = options.length;
            var op, val;
            while (i--) {
                op = options[i];
                val = op.hasOwnProperty('_value') ? op._value : op.value;
                /* eslint-disable eqeqeq */
                op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
                /* eslint-enable eqeqeq */
            }
        },

        unbind: function unbind() {
            /* istanbul ignore next */
            this.vm.$off('hook:attached', this.forceUpdate);
        }
    };

    /**
     * Get select value
     *
     * @param {SelectElement} el
     * @param {Boolean} multi
     * @param {Boolean} init
     * @return {Array|*}
     */

    function getValue(el, multi, init) {
        var res = multi ? [] : null;
        var op, val, selected;
        for (var i = 0, l = el.options.length; i < l; i++) {
            op = el.options[i];
            selected = init ? op.hasAttribute('selected') : op.selected;
            if (selected) {
                val = op.hasOwnProperty('_value') ? op._value : op.value;
                if (multi) {
                    res.push(val);
                } else {
                    return val;
                }
            }
        }
        return res;
    }

    /**
     * Native Array.indexOf uses strict equal, but in this
     * case we need to match string/numbers with custom equal.
     *
     * @param {Array} arr
     * @param {*} val
     */

    function indexOf$1(arr, val) {
        var i = arr.length;
        while (i--) {
            if (looseEqual(arr[i], val)) {
                return i;
            }
        }
        return -1;
    }

    var checkbox = {

        bind: function bind() {
            var self = this;
            var el = this.el;

            this.getValue = function () {
                return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
            };

            function getBooleanValue() {
                var val = el.checked;
                if (val && el.hasOwnProperty('_trueValue')) {
                    return el._trueValue;
                }
                if (!val && el.hasOwnProperty('_falseValue')) {
                    return el._falseValue;
                }
                return val;
            }

            this.listener = function () {
                var model = self._watcher.value;
                if (isArray(model)) {
                    var val = self.getValue();
                    if (el.checked) {
                        if (indexOf(model, val) < 0) {
                            model.push(val);
                        }
                    } else {
                        model.$remove(val);
                    }
                } else {
                    self.set(getBooleanValue());
                }
            };

            this.on('change', this.listener);
            if (el.hasAttribute('checked')) {
                this.afterBind = this.listener;
            }
        },

        update: function update(value) {
            var el = this.el;
            if (isArray(value)) {
                el.checked = indexOf(value, this.getValue()) > -1;
            } else {
                if (el.hasOwnProperty('_trueValue')) {
                    el.checked = looseEqual(value, el._trueValue);
                } else {
                    el.checked = !!value;
                }
            }
        }
    };

    var handlers = {
        text: text$2,
        radio: radio,
        select: select,
        checkbox: checkbox
    };

    var model = {

        priority: MODEL,
        twoWay: true,
        handlers: handlers,
        params: ['lazy', 'number', 'debounce'],

        /**
         * Possible elements:
         *   <select>
         *   <textarea>
         *   <input type="*">
         *     - text
         *     - checkbox
         *     - radio
         *     - number
         */

        bind: function bind() {
            // friendly warning...
            this.checkFilters();
            if (this.hasRead && !this.hasWrite) {
                'development' !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
            }
            var el = this.el;
            var tag = el.tagName;
            var handler;
            if (tag === 'INPUT') {
                handler = handlers[el.type] || handlers.text;
            } else if (tag === 'SELECT') {
                handler = handlers.select;
            } else if (tag === 'TEXTAREA') {
                handler = handlers.text;
            } else {
                'development' !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
                return;
            }
            el.__v_model = this;
            handler.bind.call(this);
            this.update = handler.update;
            this._unbind = handler.unbind;
        },

        /**
         * Check read/write filter stats.
         */

        checkFilters: function checkFilters() {
            var filters = this.filters;
            if (!filters) return;
            var i = filters.length;
            while (i--) {
                var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
                if (typeof filter === 'function' || filter.read) {
                    this.hasRead = true;
                }
                if (filter.write) {
                    this.hasWrite = true;
                }
            }
        },

        unbind: function unbind() {
            this.el.__v_model = null;
            this._unbind && this._unbind();
        }
    };

    // keyCode aliases
    var keyCodes = {
        esc: 27,
        tab: 9,
        enter: 13,
        space: 32,
        'delete': [8, 46],
        up: 38,
        left: 37,
        right: 39,
        down: 40
    };

    function keyFilter(handler, keys) {
        var codes = keys.map(function (key) {
            var charCode = key.charCodeAt(0);
            if (charCode > 47 && charCode < 58) {
                return parseInt(key, 10);
            }
            if (key.length === 1) {
                charCode = key.toUpperCase().charCodeAt(0);
                if (charCode > 64 && charCode < 91) {
                    return charCode;
                }
            }
            return keyCodes[key];
        });
        codes = [].concat.apply([], codes);
        return function keyHandler(e) {
            if (codes.indexOf(e.keyCode) > -1) {
                return handler.call(this, e);
            }
        };
    }

    function stopFilter(handler) {
        return function stopHandler(e) {
            e.stopPropagation();
            return handler.call(this, e);
        };
    }

    function preventFilter(handler) {
        return function preventHandler(e) {
            e.preventDefault();
            return handler.call(this, e);
        };
    }

    function selfFilter(handler) {
        return function selfHandler(e) {
            if (e.target === e.currentTarget) {
                return handler.call(this, e);
            }
        };
    }

    var on$1 = {

        priority: ON,
        acceptStatement: true,
        keyCodes: keyCodes,

        bind: function bind() {
            // deal with iframes
            if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
                var self = this;
                this.iframeBind = function () {
                    on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
                };
                this.on('load', this.iframeBind);
            }
        },

        update: function update(handler) {
            // stub a noop for v-on with no value,
            // e.g. @mousedown.prevent
            if (!this.descriptor.raw) {
                handler = function () {};
            }

            if (typeof handler !== 'function') {
                'development' !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
                return;
            }

            // apply modifiers
            if (this.modifiers.stop) {
                handler = stopFilter(handler);
            }
            if (this.modifiers.prevent) {
                handler = preventFilter(handler);
            }
            if (this.modifiers.self) {
                handler = selfFilter(handler);
            }
            // key filter
            var keys = Object.keys(this.modifiers).filter(function (key) {
                return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
            });
            if (keys.length) {
                handler = keyFilter(handler, keys);
            }

            this.reset();
            this.handler = handler;

            if (this.iframeBind) {
                this.iframeBind();
            } else {
                on(this.el, this.arg, this.handler, this.modifiers.capture);
            }
        },

        reset: function reset() {
            var el = this.iframeBind ? this.el.contentWindow : this.el;
            if (this.handler) {
                off(el, this.arg, this.handler);
            }
        },

        unbind: function unbind() {
            this.reset();
        }
    };

    var prefixes = ['-webkit-', '-moz-', '-ms-'];
    var camelPrefixes = ['Webkit', 'Moz', 'ms'];
    var importantRE = /!important;?$/;
    var propCache = Object.create(null);

    var testEl = null;

    var style = {

        deep: true,

        update: function update(value) {
            if (typeof value === 'string') {
                this.el.style.cssText = value;
            } else if (isArray(value)) {
                this.handleObject(value.reduce(extend, {}));
            } else {
                this.handleObject(value || {});
            }
        },

        handleObject: function handleObject(value) {
            // cache object styles so that only changed props
            // are actually updated.
            var cache = this.cache || (this.cache = {});
            var name, val;
            for (name in cache) {
                if (!(name in value)) {
                    this.handleSingle(name, null);
                    delete cache[name];
                }
            }
            for (name in value) {
                val = value[name];
                if (val !== cache[name]) {
                    cache[name] = val;
                    this.handleSingle(name, val);
                }
            }
        },

        handleSingle: function handleSingle(prop, value) {
            prop = normalize(prop);
            if (!prop) return; // unsupported prop
            // cast possible numbers/booleans into strings
            if (value != null) value += '';
            if (value) {
                var isImportant = importantRE.test(value) ? 'important' : '';
                if (isImportant) {
                    /* istanbul ignore if */
                    if ('development' !== 'production') {
                        warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
                    }
                    value = value.replace(importantRE, '').trim();
                    this.el.style.setProperty(prop.kebab, value, isImportant);
                } else {
                    this.el.style[prop.camel] = value;
                }
            } else {
                this.el.style[prop.camel] = '';
            }
        }

    };

    /**
     * Normalize a CSS property name.
     * - cache result
     * - auto prefix
     * - camelCase -> dash-case
     *
     * @param {String} prop
     * @return {String}
     */

    function normalize(prop) {
        if (propCache[prop]) {
            return propCache[prop];
        }
        var res = prefix(prop);
        propCache[prop] = propCache[res] = res;
        return res;
    }

    /**
     * Auto detect the appropriate prefix for a CSS property.
     * https://gist.github.com/paulirish/523692
     *
     * @param {String} prop
     * @return {String}
     */

    function prefix(prop) {
        prop = hyphenate(prop);
        var camel = camelize(prop);
        var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
        if (!testEl) {
            testEl = document.createElement('div');
        }
        var i = prefixes.length;
        var prefixed;
        if (camel !== 'filter' && camel in testEl.style) {
            return {
                kebab: prop,
                camel: camel
            };
        }
        while (i--) {
            prefixed = camelPrefixes[i] + upper;
            if (prefixed in testEl.style) {
                return {
                    kebab: prefixes[i] + prop,
                    camel: prefixed
                };
            }
        }
    }

    // xlink
    var xlinkNS = 'http://www.w3.org/1999/xlink';
    var xlinkRE = /^xlink:/;

    // check for attributes that prohibit interpolations
    var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
    // these attributes should also set their corresponding properties
    // because they only affect the initial state of the element
    var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
    // these attributes expect enumrated values of "true" or "false"
    // but are not boolean attributes
    var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

    // these attributes should set a hidden property for
    // binding v-model to object values
    var modelProps = {
        value: '_value',
        'true-value': '_trueValue',
        'false-value': '_falseValue'
    };

    var bind$1 = {

        priority: BIND,

        bind: function bind() {
            var attr = this.arg;
            var tag = this.el.tagName;
            // should be deep watch on object mode
            if (!attr) {
                this.deep = true;
            }
            // handle interpolation bindings
            var descriptor = this.descriptor;
            var tokens = descriptor.interp;
            if (tokens) {
                // handle interpolations with one-time tokens
                if (descriptor.hasOneTime) {
                    this.expression = tokensToExp(tokens, this._scope || this.vm);
                }

                // only allow binding on native attributes
                if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
                    'development' !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
                    this.el.removeAttribute(attr);
                    this.invalid = true;
                }

                /* istanbul ignore if */
                if ('development' !== 'production') {
                    var raw = attr + '="' + descriptor.raw + '": ';
                    // warn src
                    if (attr === 'src') {
                        warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
                    }

                    // warn style
                    if (attr === 'style') {
                        warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
                    }
                }
            }
        },

        update: function update(value) {
            if (this.invalid) {
                return;
            }
            var attr = this.arg;
            if (this.arg) {
                this.handleSingle(attr, value);
            } else {
                this.handleObject(value || {});
            }
        },

        // share object handler with v-bind:class
        handleObject: style.handleObject,

        handleSingle: function handleSingle(attr, value) {
            var el = this.el;
            var interp = this.descriptor.interp;
            if (this.modifiers.camel) {
                attr = camelize(attr);
            }
            if (!interp && attrWithPropsRE.test(attr) && attr in el) {
                var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
                    ? '' : value : value;

                if (el[attr] !== attrValue) {
                    el[attr] = attrValue;
                }
            }
            // set model props
            var modelProp = modelProps[attr];
            if (!interp && modelProp) {
                el[modelProp] = value;
                // update v-model if present
                var model = el.__v_model;
                if (model) {
                    model.listener();
                }
            }
            // do not set value attribute for textarea
            if (attr === 'value' && el.tagName === 'TEXTAREA') {
                el.removeAttribute(attr);
                return;
            }
            // update attribute
            if (enumeratedAttrRE.test(attr)) {
                el.setAttribute(attr, value ? 'true' : 'false');
            } else if (value != null && value !== false) {
                if (attr === 'class') {
                    // handle edge case #1960:
                    // class interpolation should not overwrite Vue transition class
                    if (el.__v_trans) {
                        value += ' ' + el.__v_trans.id + '-transition';
                    }
                    setClass(el, value);
                } else if (xlinkRE.test(attr)) {
                    el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
                } else {
                    el.setAttribute(attr, value === true ? '' : value);
                }
            } else {
                el.removeAttribute(attr);
            }
        }
    };

    var el = {

        priority: EL,

        bind: function bind() {
            /* istanbul ignore if */
            if (!this.arg) {
                return;
            }
            var id = this.id = camelize(this.arg);
            var refs = (this._scope || this.vm).$els;
            if (hasOwn(refs, id)) {
                refs[id] = this.el;
            } else {
                defineReactive(refs, id, this.el);
            }
        },

        unbind: function unbind() {
            var refs = (this._scope || this.vm).$els;
            if (refs[this.id] === this.el) {
                refs[this.id] = null;
            }
        }
    };

    var ref = {
        bind: function bind() {
            'development' !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
        }
    };

    var cloak = {
        bind: function bind() {
            var el = this.el;
            this.vm.$once('pre-hook:compiled', function () {
                el.removeAttribute('v-cloak');
            });
        }
    };

    // must export plain object
    var directives = {
        text: text$1,
        html: html,
        'for': vFor,
        'if': vIf,
        show: show,
        model: model,
        on: on$1,
        bind: bind$1,
        el: el,
        ref: ref,
        cloak: cloak
    };

    var vClass = {

        deep: true,

        update: function update(value) {
            if (!value) {
                this.cleanup();
            } else if (typeof value === 'string') {
                this.setClass(value.trim().split(/\s+/));
            } else {
                this.setClass(normalize$1(value));
            }
        },

        setClass: function setClass(value) {
            this.cleanup(value);
            for (var i = 0, l = value.length; i < l; i++) {
                var val = value[i];
                if (val) {
                    apply(this.el, val, addClass);
                }
            }
            this.prevKeys = value;
        },

        cleanup: function cleanup(value) {
            var prevKeys = this.prevKeys;
            if (!prevKeys) return;
            var i = prevKeys.length;
            while (i--) {
                var key = prevKeys[i];
                if (!value || value.indexOf(key) < 0) {
                    apply(this.el, key, removeClass);
                }
            }
        }
    };

    /**
     * Normalize objects and arrays (potentially containing objects)
     * into array of strings.
     *
     * @param {Object|Array<String|Object>} value
     * @return {Array<String>}
     */

    function normalize$1(value) {
        var res = [];
        if (isArray(value)) {
            for (var i = 0, l = value.length; i < l; i++) {
                var _key = value[i];
                if (_key) {
                    if (typeof _key === 'string') {
                        res.push(_key);
                    } else {
                        for (var k in _key) {
                            if (_key[k]) res.push(k);
                        }
                    }
                }
            }
        } else if (isObject(value)) {
            for (var key in value) {
                if (value[key]) res.push(key);
            }
        }
        return res;
    }

    /**
     * Add or remove a class/classes on an element
     *
     * @param {Element} el
     * @param {String} key The class name. This may or may not
     *                     contain a space character, in such a
     *                     case we'll deal with multiple class
     *                     names at once.
     * @param {Function} fn
     */

    function apply(el, key, fn) {
        key = key.trim();
        if (key.indexOf(' ') === -1) {
            fn(el, key);
            return;
        }
        // The key contains one or more space characters.
        // Since a class name doesn't accept such characters, we
        // treat it as multiple classes.
        var keys = key.split(/\s+/);
        for (var i = 0, l = keys.length; i < l; i++) {
            fn(el, keys[i]);
        }
    }

    var component = {

        priority: COMPONENT,

        params: ['keep-alive', 'transition-mode', 'inline-template'],

        /**
         * Setup. Two possible usages:
         *
         * - static:
         *   <comp> or <div v-component="comp">
         *
         * - dynamic:
         *   <component :is="view">
         */

        bind: function bind() {
            if (!this.el.__vue__) {
                // keep-alive cache
                this.keepAlive = this.params.keepAlive;
                if (this.keepAlive) {
                    this.cache = {};
                }
                // check inline-template
                if (this.params.inlineTemplate) {
                    // extract inline template as a DocumentFragment
                    this.inlineTemplate = extractContent(this.el, true);
                }
                // component resolution related state
                this.pendingComponentCb = this.Component = null;
                // transition related state
                this.pendingRemovals = 0;
                this.pendingRemovalCb = null;
                // create a ref anchor
                this.anchor = createAnchor('v-component');
                replace(this.el, this.anchor);
                // remove is attribute.
                // this is removed during compilation, but because compilation is
                // cached, when the component is used elsewhere this attribute
                // will remain at link time.
                this.el.removeAttribute('is');
                this.el.removeAttribute(':is');
                // remove ref, same as above
                if (this.descriptor.ref) {
                    this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
                }
                // if static, build right now.
                if (this.literal) {
                    this.setComponent(this.expression);
                }
            } else {
                'development' !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
            }
        },

        /**
         * Public update, called by the watcher in the dynamic
         * literal scenario, e.g. <component :is="view">
         */

        update: function update(value) {
            if (!this.literal) {
                this.setComponent(value);
            }
        },

        /**
         * Switch dynamic components. May resolve the component
         * asynchronously, and perform transition based on
         * specified transition mode. Accepts a few additional
         * arguments specifically for vue-router.
         *
         * The callback is called when the full transition is
         * finished.
         *
         * @param {String} value
         * @param {Function} [cb]
         */

        setComponent: function setComponent(value, cb) {
            this.invalidatePending();
            if (!value) {
                // just remove current
                this.unbuild(true);
                this.remove(this.childVM, cb);
                this.childVM = null;
            } else {
                var self = this;
                this.resolveComponent(value, function () {
                    self.mountComponent(cb);
                });
            }
        },

        /**
         * Resolve the component constructor to use when creating
         * the child vm.
         *
         * @param {String|Function} value
         * @param {Function} cb
         */

        resolveComponent: function resolveComponent(value, cb) {
            var self = this;
            this.pendingComponentCb = cancellable(function (Component) {
                self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
                self.Component = Component;
                cb();
            });
            this.vm._resolveComponent(value, this.pendingComponentCb);
        },

        /**
         * Create a new instance using the current constructor and
         * replace the existing instance. This method doesn't care
         * whether the new component and the old one are actually
         * the same.
         *
         * @param {Function} [cb]
         */

        mountComponent: function mountComponent(cb) {
            // actual mount
            this.unbuild(true);
            var self = this;
            var activateHooks = this.Component.options.activate;
            var cached = this.getCached();
            var newComponent = this.build();
            if (activateHooks && !cached) {
                this.waitingFor = newComponent;
                callActivateHooks(activateHooks, newComponent, function () {
                    if (self.waitingFor !== newComponent) {
                        return;
                    }
                    self.waitingFor = null;
                    self.transition(newComponent, cb);
                });
            } else {
                // update ref for kept-alive component
                if (cached) {
                    newComponent._updateRef();
                }
                this.transition(newComponent, cb);
            }
        },

        /**
         * When the component changes or unbinds before an async
         * constructor is resolved, we need to invalidate its
         * pending callback.
         */

        invalidatePending: function invalidatePending() {
            if (this.pendingComponentCb) {
                this.pendingComponentCb.cancel();
                this.pendingComponentCb = null;
            }
        },

        /**
         * Instantiate/insert a new child vm.
         * If keep alive and has cached instance, insert that
         * instance; otherwise build a new one and cache it.
         *
         * @param {Object} [extraOptions]
         * @return {Vue} - the created instance
         */

        build: function build(extraOptions) {
            var cached = this.getCached();
            if (cached) {
                return cached;
            }
            if (this.Component) {
                // default options
                var options = {
                    name: this.ComponentName,
                    el: cloneNode(this.el),
                    template: this.inlineTemplate,
                    // make sure to add the child with correct parent
                    // if this is a transcluded component, its parent
                    // should be the transclusion host.
                    parent: this._host || this.vm,
                    // if no inline-template, then the compiled
                    // linker can be cached for better performance.
                    _linkerCachable: !this.inlineTemplate,
                    _ref: this.descriptor.ref,
                    _asComponent: true,
                    _isRouterView: this._isRouterView,
                    // if this is a transcluded component, context
                    // will be the common parent vm of this instance
                    // and its host.
                    _context: this.vm,
                    // if this is inside an inline v-for, the scope
                    // will be the intermediate scope created for this
                    // repeat fragment. this is used for linking props
                    // and container directives.
                    _scope: this._scope,
                    // pass in the owner fragment of this component.
                    // this is necessary so that the fragment can keep
                    // track of its contained components in order to
                    // call attach/detach hooks for them.
                    _frag: this._frag
                };
                // extra options
                // in 1.0.0 this is used by vue-router only
                /* istanbul ignore if */
                if (extraOptions) {
                    extend(options, extraOptions);
                }
                var child = new this.Component(options);
                if (this.keepAlive) {
                    this.cache[this.Component.cid] = child;
                }
                /* istanbul ignore if */
                if ('development' !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
                    warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
                }
                return child;
            }
        },

        /**
         * Try to get a cached instance of the current component.
         *
         * @return {Vue|undefined}
         */

        getCached: function getCached() {
            return this.keepAlive && this.cache[this.Component.cid];
        },

        /**
         * Teardown the current child, but defers cleanup so
         * that we can separate the destroy and removal steps.
         *
         * @param {Boolean} defer
         */

        unbuild: function unbuild(defer) {
            if (this.waitingFor) {
                if (!this.keepAlive) {
                    this.waitingFor.$destroy();
                }
                this.waitingFor = null;
            }
            var child = this.childVM;
            if (!child || this.keepAlive) {
                if (child) {
                    // remove ref
                    child._inactive = true;
                    child._updateRef(true);
                }
                return;
            }
            // the sole purpose of `deferCleanup` is so that we can
            // "deactivate" the vm right now and perform DOM removal
            // later.
            child.$destroy(false, defer);
        },

        /**
         * Remove current destroyed child and manually do
         * the cleanup after removal.
         *
         * @param {Function} cb
         */

        remove: function remove(child, cb) {
            var keepAlive = this.keepAlive;
            if (child) {
                // we may have a component switch when a previous
                // component is still being transitioned out.
                // we want to trigger only one lastest insertion cb
                // when the existing transition finishes. (#1119)
                this.pendingRemovals++;
                this.pendingRemovalCb = cb;
                var self = this;
                child.$remove(function () {
                    self.pendingRemovals--;
                    if (!keepAlive) child._cleanup();
                    if (!self.pendingRemovals && self.pendingRemovalCb) {
                        self.pendingRemovalCb();
                        self.pendingRemovalCb = null;
                    }
                });
            } else if (cb) {
                cb();
            }
        },

        /**
         * Actually swap the components, depending on the
         * transition mode. Defaults to simultaneous.
         *
         * @param {Vue} target
         * @param {Function} [cb]
         */

        transition: function transition(target, cb) {
            var self = this;
            var current = this.childVM;
            // for devtool inspection
            if (current) current._inactive = true;
            target._inactive = false;
            this.childVM = target;
            switch (self.params.transitionMode) {
                case 'in-out':
                    target.$before(self.anchor, function () {
                        self.remove(current, cb);
                    });
                    break;
                case 'out-in':
                    self.remove(current, function () {
                        target.$before(self.anchor, cb);
                    });
                    break;
                default:
                    self.remove(current);
                    target.$before(self.anchor, cb);
            }
        },

        /**
         * Unbind.
         */

        unbind: function unbind() {
            this.invalidatePending();
            // Do not defer cleanup when unbinding
            this.unbuild();
            // destroy all keep-alive cached instances
            if (this.cache) {
                for (var key in this.cache) {
                    this.cache[key].$destroy();
                }
                this.cache = null;
            }
        }
    };

    /**
     * Call activate hooks in order (asynchronous)
     *
     * @param {Array} hooks
     * @param {Vue} vm
     * @param {Function} cb
     */

    function callActivateHooks(hooks, vm, cb) {
        var total = hooks.length;
        var called = 0;
        hooks[0].call(vm, next);
        function next() {
            if (++called >= total) {
                cb();
            } else {
                hooks[called].call(vm, next);
            }
        }
    }

    var propBindingModes = config._propBindingModes;
    var empty = {};

    // regexes
    var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
    var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

    /**
     * Compile props on a root element and return
     * a props link function.
     *
     * @param {Element|DocumentFragment} el
     * @param {Array} propOptions
     * @param {Vue} vm
     * @return {Function} propsLinkFn
     */

    function compileProps(el, propOptions, vm) {
        var props = [];
        var names = Object.keys(propOptions);
        var i = names.length;
        var options, name, attr, value, path, parsed, prop;
        while (i--) {
            name = names[i];
            options = propOptions[name] || empty;

            if ('development' !== 'production' && name === '$data') {
                warn('Do not use $data as prop.', vm);
                continue;
            }

            // props could contain dashes, which will be
            // interpreted as minus calculations by the parser
            // so we need to camelize the path here
            path = camelize(name);
            if (!identRE$1.test(path)) {
                'development' !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
                continue;
            }

            prop = {
                name: name,
                path: path,
                options: options,
                mode: propBindingModes.ONE_WAY,
                raw: null
            };

            attr = hyphenate(name);
            // first check dynamic version
            if ((value = getBindAttr(el, attr)) === null) {
                if ((value = getBindAttr(el, attr + '.sync')) !== null) {
                    prop.mode = propBindingModes.TWO_WAY;
                } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
                    prop.mode = propBindingModes.ONE_TIME;
                }
            }
            if (value !== null) {
                // has dynamic binding!
                prop.raw = value;
                parsed = parseDirective(value);
                value = parsed.expression;
                prop.filters = parsed.filters;
                // check binding type
                if (isLiteral(value) && !parsed.filters) {
                    // for expressions containing literal numbers and
                    // booleans, there's no need to setup a prop binding,
                    // so we can optimize them as a one-time set.
                    prop.optimizedLiteral = true;
                } else {
                    prop.dynamic = true;
                    // check non-settable path for two-way bindings
                    if ('development' !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
                        prop.mode = propBindingModes.ONE_WAY;
                        warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
                    }
                }
                prop.parentPath = value;

                // warn required two-way
                if ('development' !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
                    warn('Prop "' + name + '" expects a two-way binding type.', vm);
                }
            } else if ((value = getAttr(el, attr)) !== null) {
                // has literal binding!
                prop.raw = value;
            } else if ('development' !== 'production') {
                // check possible camelCase prop usage
                var lowerCaseName = path.toLowerCase();
                value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
                if (value) {
                    warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
                } else if (options.required) {
                    // warn missing required
                    warn('Missing required prop: ' + name, vm);
                }
            }
            // push prop
            props.push(prop);
        }
        return makePropsLinkFn(props);
    }

    /**
     * Build a function that applies props to a vm.
     *
     * @param {Array} props
     * @return {Function} propsLinkFn
     */

    function makePropsLinkFn(props) {
        return function propsLinkFn(vm, scope) {
            // store resolved props info
            vm._props = {};
            var inlineProps = vm.$options.propsData;
            var i = props.length;
            var prop, path, options, value, raw;
            while (i--) {
                prop = props[i];
                raw = prop.raw;
                path = prop.path;
                options = prop.options;
                vm._props[path] = prop;
                if (inlineProps && hasOwn(inlineProps, path)) {
                    initProp(vm, prop, inlineProps[path]);
                }if (raw === null) {
                    // initialize absent prop
                    initProp(vm, prop, undefined);
                } else if (prop.dynamic) {
                    // dynamic prop
                    if (prop.mode === propBindingModes.ONE_TIME) {
                        // one time binding
                        value = (scope || vm._context || vm).$get(prop.parentPath);
                        initProp(vm, prop, value);
                    } else {
                        if (vm._context) {
                            // dynamic binding
                            vm._bindDir({
                                name: 'prop',
                                def: propDef,
                                prop: prop
                            }, null, null, scope); // el, host, scope
                        } else {
                            // root instance
                            initProp(vm, prop, vm.$get(prop.parentPath));
                        }
                    }
                } else if (prop.optimizedLiteral) {
                    // optimized literal, cast it and just set once
                    var stripped = stripQuotes(raw);
                    value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
                    initProp(vm, prop, value);
                } else {
                    // string literal, but we need to cater for
                    // Boolean props with no value, or with same
                    // literal value (e.g. disabled="disabled")
                    // see https://github.com/vuejs/vue-loader/issues/182
                    value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
                    initProp(vm, prop, value);
                }
            }
        };
    }

    /**
     * Process a prop with a rawValue, applying necessary coersions,
     * default values & assertions and call the given callback with
     * processed value.
     *
     * @param {Vue} vm
     * @param {Object} prop
     * @param {*} rawValue
     * @param {Function} fn
     */

    function processPropValue(vm, prop, rawValue, fn) {
        var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
        var value = rawValue;
        if (value === undefined) {
            value = getPropDefaultValue(vm, prop);
        }
        value = coerceProp(prop, value, vm);
        var coerced = value !== rawValue;
        if (!assertProp(prop, value, vm)) {
            value = undefined;
        }
        if (isSimple && !coerced) {
            withoutConversion(function () {
                fn(value);
            });
        } else {
            fn(value);
        }
    }

    /**
     * Set a prop's initial value on a vm and its data object.
     *
     * @param {Vue} vm
     * @param {Object} prop
     * @param {*} value
     */

    function initProp(vm, prop, value) {
        processPropValue(vm, prop, value, function (value) {
            defineReactive(vm, prop.path, value);
        });
    }

    /**
     * Update a prop's value on a vm.
     *
     * @param {Vue} vm
     * @param {Object} prop
     * @param {*} value
     */

    function updateProp(vm, prop, value) {
        processPropValue(vm, prop, value, function (value) {
            vm[prop.path] = value;
        });
    }

    /**
     * Get the default value of a prop.
     *
     * @param {Vue} vm
     * @param {Object} prop
     * @return {*}
     */

    function getPropDefaultValue(vm, prop) {
        // no default, return undefined
        var options = prop.options;
        if (!hasOwn(options, 'default')) {
            // absent boolean value defaults to false
            return options.type === Boolean ? false : undefined;
        }
        var def = options['default'];
        // warn against non-factory defaults for Object & Array
        if (isObject(def)) {
            'development' !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
        }
        // call factory function for non-Function types
        return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
    }

    /**
     * Assert whether a prop is valid.
     *
     * @param {Object} prop
     * @param {*} value
     * @param {Vue} vm
     */

    function assertProp(prop, value, vm) {
        if (!prop.options.required && ( // non-required
            prop.raw === null || // abscent
                value == null) // null or undefined
            ) {
            return true;
        }
        var options = prop.options;
        var type = options.type;
        var valid = !type;
        var expectedTypes = [];
        if (type) {
            if (!isArray(type)) {
                type = [type];
            }
            for (var i = 0; i < type.length && !valid; i++) {
                var assertedType = assertType(value, type[i]);
                expectedTypes.push(assertedType.expectedType);
                valid = assertedType.valid;
            }
        }
        if (!valid) {
            if ('development' !== 'production') {
                warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
            }
            return false;
        }
        var validator = options.validator;
        if (validator) {
            if (!validator(value)) {
                'development' !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
                return false;
            }
        }
        return true;
    }

    /**
     * Force parsing value with coerce option.
     *
     * @param {*} value
     * @param {Object} options
     * @return {*}
     */

    function coerceProp(prop, value, vm) {
        var coerce = prop.options.coerce;
        if (!coerce) {
            return value;
        }
        if (typeof coerce === 'function') {
            return coerce(value);
        } else {
            'development' !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
            return value;
        }
    }

    /**
     * Assert the type of a value
     *
     * @param {*} value
     * @param {Function} type
     * @return {Object}
     */

    function assertType(value, type) {
        var valid;
        var expectedType;
        if (type === String) {
            expectedType = 'string';
            valid = typeof value === expectedType;
        } else if (type === Number) {
            expectedType = 'number';
            valid = typeof value === expectedType;
        } else if (type === Boolean) {
            expectedType = 'boolean';
            valid = typeof value === expectedType;
        } else if (type === Function) {
            expectedType = 'function';
            valid = typeof value === expectedType;
        } else if (type === Object) {
            expectedType = 'object';
            valid = isPlainObject(value);
        } else if (type === Array) {
            expectedType = 'array';
            valid = isArray(value);
        } else {
            valid = value instanceof type;
        }
        return {
            valid: valid,
            expectedType: expectedType
        };
    }

    /**
     * Format type for output
     *
     * @param {String} type
     * @return {String}
     */

    function formatType(type) {
        return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
    }

    /**
     * Format value
     *
     * @param {*} value
     * @return {String}
     */

    function formatValue(val) {
        return Object.prototype.toString.call(val).slice(8, -1);
    }

    var bindingModes = config._propBindingModes;

    var propDef = {

        bind: function bind() {
            var child = this.vm;
            var parent = child._context;
            // passed in from compiler directly
            var prop = this.descriptor.prop;
            var childKey = prop.path;
            var parentKey = prop.parentPath;
            var twoWay = prop.mode === bindingModes.TWO_WAY;

            var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
                updateProp(child, prop, val);
            }, {
                twoWay: twoWay,
                filters: prop.filters,
                // important: props need to be observed on the
                // v-for scope if present
                scope: this._scope
            });

            // set the child initial value.
            initProp(child, prop, parentWatcher.value);

            // setup two-way binding
            if (twoWay) {
                // important: defer the child watcher creation until
                // the created hook (after data observation)
                var self = this;
                child.$once('pre-hook:created', function () {
                    self.childWatcher = new Watcher(child, childKey, function (val) {
                        parentWatcher.set(val);
                    }, {
                        // ensure sync upward before parent sync down.
                        // this is necessary in cases e.g. the child
                        // mutates a prop array, then replaces it. (#1683)
                        sync: true
                    });
                });
            }
        },

        unbind: function unbind() {
            this.parentWatcher.teardown();
            if (this.childWatcher) {
                this.childWatcher.teardown();
            }
        }
    };

    var queue$1 = [];
    var queued = false;

    /**
     * Push a job into the queue.
     *
     * @param {Function} job
     */

    function pushJob(job) {
        queue$1.push(job);
        if (!queued) {
            queued = true;
            nextTick(flush);
        }
    }

    /**
     * Flush the queue, and do one forced reflow before
     * triggering transitions.
     */

    function flush() {
        // Force layout
        var f = document.documentElement.offsetHeight;
        for (var i = 0; i < queue$1.length; i++) {
            queue$1[i]();
        }
        queue$1 = [];
        queued = false;
        // dummy return, so js linters don't complain about
        // unused variable f
        return f;
    }

    var TYPE_TRANSITION = 'transition';
    var TYPE_ANIMATION = 'animation';
    var transDurationProp = transitionProp + 'Duration';
    var animDurationProp = animationProp + 'Duration';

    /**
     * If a just-entered element is applied the
     * leave class while its enter transition hasn't started yet,
     * and the transitioned property has the same value for both
     * enter/leave, then the leave transition will be skipped and
     * the transitionend event never fires. This function ensures
     * its callback to be called after a transition has started
     * by waiting for double raf.
     *
     * It falls back to setTimeout on devices that support CSS
     * transitions but not raf (e.g. Android 4.2 browser) - since
     * these environments are usually slow, we are giving it a
     * relatively large timeout.
     */

    var raf = inBrowser && window.requestAnimationFrame;
    var waitForTransitionStart = raf
        /* istanbul ignore next */
        ? function (fn) {
        raf(function () {
            raf(fn);
        });
    } : function (fn) {
        setTimeout(fn, 50);
    };

    /**
     * A Transition object that encapsulates the state and logic
     * of the transition.
     *
     * @param {Element} el
     * @param {String} id
     * @param {Object} hooks
     * @param {Vue} vm
     */
    function Transition(el, id, hooks, vm) {
        this.id = id;
        this.el = el;
        this.enterClass = hooks && hooks.enterClass || id + '-enter';
        this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
        this.hooks = hooks;
        this.vm = vm;
        // async state
        this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
        this.justEntered = false;
        this.entered = this.left = false;
        this.typeCache = {};
        // check css transition type
        this.type = hooks && hooks.type;
        /* istanbul ignore if */
        if ('development' !== 'production') {
            if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
                warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
            }
        }
        // bind
        var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
            self[m] = bind(self[m], self);
        });
    }

    var p$1 = Transition.prototype;

    /**
     * Start an entering transition.
     *
     * 1. enter transition triggered
     * 2. call beforeEnter hook
     * 3. add enter class
     * 4. insert/show element
     * 5. call enter hook (with possible explicit js callback)
     * 6. reflow
     * 7. based on transition type:
     *    - transition:
     *        remove class now, wait for transitionend,
     *        then done if there's no explicit js callback.
     *    - animation:
     *        wait for animationend, remove class,
     *        then done if there's no explicit js callback.
     *    - no css transition:
     *        done now if there's no explicit js callback.
     * 8. wait for either done or js callback, then call
     *    afterEnter hook.
     *
     * @param {Function} op - insert/show the element
     * @param {Function} [cb]
     */

    p$1.enter = function (op, cb) {
        this.cancelPending();
        this.callHook('beforeEnter');
        this.cb = cb;
        addClass(this.el, this.enterClass);
        op();
        this.entered = false;
        this.callHookWithCb('enter');
        if (this.entered) {
            return; // user called done synchronously.
        }
        this.cancel = this.hooks && this.hooks.enterCancelled;
        pushJob(this.enterNextTick);
    };

    /**
     * The "nextTick" phase of an entering transition, which is
     * to be pushed into a queue and executed after a reflow so
     * that removing the class can trigger a CSS transition.
     */

    p$1.enterNextTick = function () {
        var _this = this;

        // prevent transition skipping
        this.justEntered = true;
        waitForTransitionStart(function () {
            _this.justEntered = false;
        });
        var enterDone = this.enterDone;
        var type = this.getCssTransitionType(this.enterClass);
        if (!this.pendingJsCb) {
            if (type === TYPE_TRANSITION) {
                // trigger transition by removing enter class now
                removeClass(this.el, this.enterClass);
                this.setupCssCb(transitionEndEvent, enterDone);
            } else if (type === TYPE_ANIMATION) {
                this.setupCssCb(animationEndEvent, enterDone);
            } else {
                enterDone();
            }
        } else if (type === TYPE_TRANSITION) {
            removeClass(this.el, this.enterClass);
        }
    };

    /**
     * The "cleanup" phase of an entering transition.
     */

    p$1.enterDone = function () {
        this.entered = true;
        this.cancel = this.pendingJsCb = null;
        removeClass(this.el, this.enterClass);
        this.callHook('afterEnter');
        if (this.cb) this.cb();
    };

    /**
     * Start a leaving transition.
     *
     * 1. leave transition triggered.
     * 2. call beforeLeave hook
     * 3. add leave class (trigger css transition)
     * 4. call leave hook (with possible explicit js callback)
     * 5. reflow if no explicit js callback is provided
     * 6. based on transition type:
     *    - transition or animation:
     *        wait for end event, remove class, then done if
     *        there's no explicit js callback.
     *    - no css transition:
     *        done if there's no explicit js callback.
     * 7. wait for either done or js callback, then call
     *    afterLeave hook.
     *
     * @param {Function} op - remove/hide the element
     * @param {Function} [cb]
     */

    p$1.leave = function (op, cb) {
        this.cancelPending();
        this.callHook('beforeLeave');
        this.op = op;
        this.cb = cb;
        addClass(this.el, this.leaveClass);
        this.left = false;
        this.callHookWithCb('leave');
        if (this.left) {
            return; // user called done synchronously.
        }
        this.cancel = this.hooks && this.hooks.leaveCancelled;
        // only need to handle leaveDone if
        // 1. the transition is already done (synchronously called
        //    by the user, which causes this.op set to null)
        // 2. there's no explicit js callback
        if (this.op && !this.pendingJsCb) {
            // if a CSS transition leaves immediately after enter,
            // the transitionend event never fires. therefore we
            // detect such cases and end the leave immediately.
            if (this.justEntered) {
                this.leaveDone();
            } else {
                pushJob(this.leaveNextTick);
            }
        }
    };

    /**
     * The "nextTick" phase of a leaving transition.
     */

    p$1.leaveNextTick = function () {
        var type = this.getCssTransitionType(this.leaveClass);
        if (type) {
            var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
            this.setupCssCb(event, this.leaveDone);
        } else {
            this.leaveDone();
        }
    };

    /**
     * The "cleanup" phase of a leaving transition.
     */

    p$1.leaveDone = function () {
        this.left = true;
        this.cancel = this.pendingJsCb = null;
        this.op();
        removeClass(this.el, this.leaveClass);
        this.callHook('afterLeave');
        if (this.cb) this.cb();
        this.op = null;
    };

    /**
     * Cancel any pending callbacks from a previously running
     * but not finished transition.
     */

    p$1.cancelPending = function () {
        this.op = this.cb = null;
        var hasPending = false;
        if (this.pendingCssCb) {
            hasPending = true;
            off(this.el, this.pendingCssEvent, this.pendingCssCb);
            this.pendingCssEvent = this.pendingCssCb = null;
        }
        if (this.pendingJsCb) {
            hasPending = true;
            this.pendingJsCb.cancel();
            this.pendingJsCb = null;
        }
        if (hasPending) {
            removeClass(this.el, this.enterClass);
            removeClass(this.el, this.leaveClass);
        }
        if (this.cancel) {
            this.cancel.call(this.vm, this.el);
            this.cancel = null;
        }
    };

    /**
     * Call a user-provided synchronous hook function.
     *
     * @param {String} type
     */

    p$1.callHook = function (type) {
        if (this.hooks && this.hooks[type]) {
            this.hooks[type].call(this.vm, this.el);
        }
    };

    /**
     * Call a user-provided, potentially-async hook function.
     * We check for the length of arguments to see if the hook
     * expects a `done` callback. If true, the transition's end
     * will be determined by when the user calls that callback;
     * otherwise, the end is determined by the CSS transition or
     * animation.
     *
     * @param {String} type
     */

    p$1.callHookWithCb = function (type) {
        var hook = this.hooks && this.hooks[type];
        if (hook) {
            if (hook.length > 1) {
                this.pendingJsCb = cancellable(this[type + 'Done']);
            }
            hook.call(this.vm, this.el, this.pendingJsCb);
        }
    };

    /**
     * Get an element's transition type based on the
     * calculated styles.
     *
     * @param {String} className
     * @return {Number}
     */

    p$1.getCssTransitionType = function (className) {
        /* istanbul ignore if */
        if (!transitionEndEvent ||
            // skip CSS transitions if page is not visible -
            // this solves the issue of transitionend events not
            // firing until the page is visible again.
            // pageVisibility API is supported in IE10+, same as
            // CSS transitions.
            document.hidden ||
            // explicit js-only transition
            this.hooks && this.hooks.css === false ||
            // element is hidden
            isHidden(this.el)) {
            return;
        }
        var type = this.type || this.typeCache[className];
        if (type) return type;
        var inlineStyles = this.el.style;
        var computedStyles = window.getComputedStyle(this.el);
        var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
        if (transDuration && transDuration !== '0s') {
            type = TYPE_TRANSITION;
        } else {
            var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
            if (animDuration && animDuration !== '0s') {
                type = TYPE_ANIMATION;
            }
        }
        if (type) {
            this.typeCache[className] = type;
        }
        return type;
    };

    /**
     * Setup a CSS transitionend/animationend callback.
     *
     * @param {String} event
     * @param {Function} cb
     */

    p$1.setupCssCb = function (event, cb) {
        this.pendingCssEvent = event;
        var self = this;
        var el = this.el;
        var onEnd = this.pendingCssCb = function (e) {
            if (e.target === el) {
                off(el, event, onEnd);
                self.pendingCssEvent = self.pendingCssCb = null;
                if (!self.pendingJsCb && cb) {
                    cb();
                }
            }
        };
        on(el, event, onEnd);
    };

    /**
     * Check if an element is hidden - in that case we can just
     * skip the transition alltogether.
     *
     * @param {Element} el
     * @return {Boolean}
     */

    function isHidden(el) {
        if (/svg$/.test(el.namespaceURI)) {
            // SVG elements do not have offset(Width|Height)
            // so we need to check the client rect
            var rect = el.getBoundingClientRect();
            return !(rect.width || rect.height);
        } else {
            return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }
    }

    var transition$1 = {

        priority: TRANSITION,

        update: function update(id, oldId) {
            var el = this.el;
            // resolve on owner vm
            var hooks = resolveAsset(this.vm.$options, 'transitions', id);
            id = id || 'v';
            oldId = oldId || 'v';
            el.__v_trans = new Transition(el, id, hooks, this.vm);
            removeClass(el, oldId + '-transition');
            addClass(el, id + '-transition');
        }
    };

    var internalDirectives = {
        style: style,
        'class': vClass,
        component: component,
        prop: propDef,
        transition: transition$1
    };

    // special binding prefixes
    var bindRE = /^v-bind:|^:/;
    var onRE = /^v-on:|^@/;
    var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
    var modifierRE = /\.[^\.]+/g;
    var transitionRE = /^(v-bind:|:)?transition$/;

    // default directive priority
    var DEFAULT_PRIORITY = 1000;
    var DEFAULT_TERMINAL_PRIORITY = 2000;

    /**
     * Compile a template and return a reusable composite link
     * function, which recursively contains more link functions
     * inside. This top level compile function would normally
     * be called on instance root nodes, but can also be used
     * for partial compilation if the partial argument is true.
     *
     * The returned composite link function, when called, will
     * return an unlink function that tearsdown all directives
     * created during the linking phase.
     *
     * @param {Element|DocumentFragment} el
     * @param {Object} options
     * @param {Boolean} partial
     * @return {Function}
     */

    function compile(el, options, partial) {
        // link function for the node itself.
        var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
        // link function for the childNodes
        var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

        /**
         * A composite linker function to be called on a already
         * compiled piece of DOM, which instantiates all directive
         * instances.
         *
         * @param {Vue} vm
         * @param {Element|DocumentFragment} el
         * @param {Vue} [host] - host vm of transcluded content
         * @param {Object} [scope] - v-for scope
         * @param {Fragment} [frag] - link context fragment
         * @return {Function|undefined}
         */

        return function compositeLinkFn(vm, el, host, scope, frag) {
            // cache childNodes before linking parent, fix #657
            var childNodes = toArray(el.childNodes);
            // link
            var dirs = linkAndCapture(function compositeLinkCapturer() {
                if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
                if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
            }, vm);
            return makeUnlinkFn(vm, dirs);
        };
    }

    /**
     * Apply a linker to a vm/element pair and capture the
     * directives created during the process.
     *
     * @param {Function} linker
     * @param {Vue} vm
     */

    function linkAndCapture(linker, vm) {
        /* istanbul ignore if */
        if ('development' === 'production') {}
        var originalDirCount = vm._directives.length;
        linker();
        var dirs = vm._directives.slice(originalDirCount);
        dirs.sort(directiveComparator);
        for (var i = 0, l = dirs.length; i < l; i++) {
            dirs[i]._bind();
        }
        return dirs;
    }

    /**
     * Directive priority sort comparator
     *
     * @param {Object} a
     * @param {Object} b
     */

    function directiveComparator(a, b) {
        a = a.descriptor.def.priority || DEFAULT_PRIORITY;
        b = b.descriptor.def.priority || DEFAULT_PRIORITY;
        return a > b ? -1 : a === b ? 0 : 1;
    }

    /**
     * Linker functions return an unlink function that
     * tearsdown all directives instances generated during
     * the process.
     *
     * We create unlink functions with only the necessary
     * information to avoid retaining additional closures.
     *
     * @param {Vue} vm
     * @param {Array} dirs
     * @param {Vue} [context]
     * @param {Array} [contextDirs]
     * @return {Function}
     */

    function makeUnlinkFn(vm, dirs, context, contextDirs) {
        function unlink(destroying) {
            teardownDirs(vm, dirs, destroying);
            if (context && contextDirs) {
                teardownDirs(context, contextDirs);
            }
        }
        // expose linked directives
        unlink.dirs = dirs;
        return unlink;
    }

    /**
     * Teardown partial linked directives.
     *
     * @param {Vue} vm
     * @param {Array} dirs
     * @param {Boolean} destroying
     */

    function teardownDirs(vm, dirs, destroying) {
        var i = dirs.length;
        while (i--) {
            dirs[i]._teardown();
            if ('development' !== 'production' && !destroying) {
                vm._directives.$remove(dirs[i]);
            }
        }
    }

    /**
     * Compile link props on an instance.
     *
     * @param {Vue} vm
     * @param {Element} el
     * @param {Object} props
     * @param {Object} [scope]
     * @return {Function}
     */

    function compileAndLinkProps(vm, el, props, scope) {
        var propsLinkFn = compileProps(el, props, vm);
        var propDirs = linkAndCapture(function () {
            propsLinkFn(vm, scope);
        }, vm);
        return makeUnlinkFn(vm, propDirs);
    }

    /**
     * Compile the root element of an instance.
     *
     * 1. attrs on context container (context scope)
     * 2. attrs on the component template root node, if
     *    replace:true (child scope)
     *
     * If this is a fragment instance, we only need to compile 1.
     *
     * @param {Element} el
     * @param {Object} options
     * @param {Object} contextOptions
     * @return {Function}
     */

    function compileRoot(el, options, contextOptions) {
        var containerAttrs = options._containerAttrs;
        var replacerAttrs = options._replacerAttrs;
        var contextLinkFn, replacerLinkFn;

        // only need to compile other attributes for
        // non-fragment instances
        if (el.nodeType !== 11) {
            // for components, container and replacer need to be
            // compiled separately and linked in different scopes.
            if (options._asComponent) {
                // 2. container attributes
                if (containerAttrs && contextOptions) {
                    contextLinkFn = compileDirectives(containerAttrs, contextOptions);
                }
                if (replacerAttrs) {
                    // 3. replacer attributes
                    replacerLinkFn = compileDirectives(replacerAttrs, options);
                }
            } else {
                // non-component, just compile as a normal element.
                replacerLinkFn = compileDirectives(el.attributes, options);
            }
        } else if ('development' !== 'production' && containerAttrs) {
            // warn container directives for fragment instances
            var names = containerAttrs.filter(function (attr) {
                // allow vue-loader/vueify scoped css attributes
                return attr.name.indexOf('_v-') < 0 &&
                    // allow event listeners
                    !onRE.test(attr.name) &&
                    // allow slots
                    attr.name !== 'slot';
            }).map(function (attr) {
                    return '"' + attr.name + '"';
                });
            if (names.length) {
                var plural = names.length > 1;
                warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
            }
        }

        options._containerAttrs = options._replacerAttrs = null;
        return function rootLinkFn(vm, el, scope) {
            // link context scope dirs
            var context = vm._context;
            var contextDirs;
            if (context && contextLinkFn) {
                contextDirs = linkAndCapture(function () {
                    contextLinkFn(context, el, null, scope);
                }, context);
            }

            // link self
            var selfDirs = linkAndCapture(function () {
                if (replacerLinkFn) replacerLinkFn(vm, el);
            }, vm);

            // return the unlink function that tearsdown context
            // container directives.
            return makeUnlinkFn(vm, selfDirs, context, contextDirs);
        };
    }

    /**
     * Compile a node and return a nodeLinkFn based on the
     * node type.
     *
     * @param {Node} node
     * @param {Object} options
     * @return {Function|null}
     */

    function compileNode(node, options) {
        var type = node.nodeType;
        if (type === 1 && !isScript(node)) {
            return compileElement(node, options);
        } else if (type === 3 && node.data.trim()) {
            return compileTextNode(node, options);
        } else {
            return null;
        }
    }

    /**
     * Compile an element and return a nodeLinkFn.
     *
     * @param {Element} el
     * @param {Object} options
     * @return {Function|null}
     */

    function compileElement(el, options) {
        // preprocess textareas.
        // textarea treats its text content as the initial value.
        // just bind it as an attr directive for value.
        if (el.tagName === 'TEXTAREA') {
            var tokens = parseText(el.value);
            if (tokens) {
                el.setAttribute(':value', tokensToExp(tokens));
                el.value = '';
            }
        }
        var linkFn;
        var hasAttrs = el.hasAttributes();
        var attrs = hasAttrs && toArray(el.attributes);
        // check terminal directives (for & if)
        if (hasAttrs) {
            linkFn = checkTerminalDirectives(el, attrs, options);
        }
        // check element directives
        if (!linkFn) {
            linkFn = checkElementDirectives(el, options);
        }
        // check component
        if (!linkFn) {
            linkFn = checkComponent(el, options);
        }
        // normal directives
        if (!linkFn && hasAttrs) {
            linkFn = compileDirectives(attrs, options);
        }
        return linkFn;
    }

    /**
     * Compile a textNode and return a nodeLinkFn.
     *
     * @param {TextNode} node
     * @param {Object} options
     * @return {Function|null} textNodeLinkFn
     */

    function compileTextNode(node, options) {
        // skip marked text nodes
        if (node._skip) {
            return removeText;
        }

        var tokens = parseText(node.wholeText);
        if (!tokens) {
            return null;
        }

        // mark adjacent text nodes as skipped,
        // because we are using node.wholeText to compile
        // all adjacent text nodes together. This fixes
        // issues in IE where sometimes it splits up a single
        // text node into multiple ones.
        var next = node.nextSibling;
        while (next && next.nodeType === 3) {
            next._skip = true;
            next = next.nextSibling;
        }

        var frag = document.createDocumentFragment();
        var el, token;
        for (var i = 0, l = tokens.length; i < l; i++) {
            token = tokens[i];
            el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
            frag.appendChild(el);
        }
        return makeTextNodeLinkFn(tokens, frag, options);
    }

    /**
     * Linker for an skipped text node.
     *
     * @param {Vue} vm
     * @param {Text} node
     */

    function removeText(vm, node) {
        remove(node);
    }

    /**
     * Process a single text token.
     *
     * @param {Object} token
     * @param {Object} options
     * @return {Node}
     */

    function processTextToken(token, options) {
        var el;
        if (token.oneTime) {
            el = document.createTextNode(token.value);
        } else {
            if (token.html) {
                el = document.createComment('v-html');
                setTokenType('html');
            } else {
                // IE will clean up empty textNodes during
                // frag.cloneNode(true), so we have to give it
                // something here...
                el = document.createTextNode(' ');
                setTokenType('text');
            }
        }
        function setTokenType(type) {
            if (token.descriptor) return;
            var parsed = parseDirective(token.value);
            token.descriptor = {
                name: type,
                def: directives[type],
                expression: parsed.expression,
                filters: parsed.filters
            };
        }
        return el;
    }

    /**
     * Build a function that processes a textNode.
     *
     * @param {Array<Object>} tokens
     * @param {DocumentFragment} frag
     */

    function makeTextNodeLinkFn(tokens, frag) {
        return function textNodeLinkFn(vm, el, host, scope) {
            var fragClone = frag.cloneNode(true);
            var childNodes = toArray(fragClone.childNodes);
            var token, value, node;
            for (var i = 0, l = tokens.length; i < l; i++) {
                token = tokens[i];
                value = token.value;
                if (token.tag) {
                    node = childNodes[i];
                    if (token.oneTime) {
                        value = (scope || vm).$eval(value);
                        if (token.html) {
                            replace(node, parseTemplate(value, true));
                        } else {
                            node.data = _toString(value);
                        }
                    } else {
                        vm._bindDir(token.descriptor, node, host, scope);
                    }
                }
            }
            replace(el, fragClone);
        };
    }

    /**
     * Compile a node list and return a childLinkFn.
     *
     * @param {NodeList} nodeList
     * @param {Object} options
     * @return {Function|undefined}
     */

    function compileNodeList(nodeList, options) {
        var linkFns = [];
        var nodeLinkFn, childLinkFn, node;
        for (var i = 0, l = nodeList.length; i < l; i++) {
            node = nodeList[i];
            nodeLinkFn = compileNode(node, options);
            childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
            linkFns.push(nodeLinkFn, childLinkFn);
        }
        return linkFns.length ? makeChildLinkFn(linkFns) : null;
    }

    /**
     * Make a child link function for a node's childNodes.
     *
     * @param {Array<Function>} linkFns
     * @return {Function} childLinkFn
     */

    function makeChildLinkFn(linkFns) {
        return function childLinkFn(vm, nodes, host, scope, frag) {
            var node, nodeLinkFn, childrenLinkFn;
            for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
                node = nodes[n];
                nodeLinkFn = linkFns[i++];
                childrenLinkFn = linkFns[i++];
                // cache childNodes before linking parent, fix #657
                var childNodes = toArray(node.childNodes);
                if (nodeLinkFn) {
                    nodeLinkFn(vm, node, host, scope, frag);
                }
                if (childrenLinkFn) {
                    childrenLinkFn(vm, childNodes, host, scope, frag);
                }
            }
        };
    }

    /**
     * Check for element directives (custom elements that should
     * be resovled as terminal directives).
     *
     * @param {Element} el
     * @param {Object} options
     */

    function checkElementDirectives(el, options) {
        var tag = el.tagName.toLowerCase();
        if (commonTagRE.test(tag)) {
            return;
        }
        var def = resolveAsset(options, 'elementDirectives', tag);
        if (def) {
            return makeTerminalNodeLinkFn(el, tag, '', options, def);
        }
    }

    /**
     * Check if an element is a component. If yes, return
     * a component link function.
     *
     * @param {Element} el
     * @param {Object} options
     * @return {Function|undefined}
     */

    function checkComponent(el, options) {
        var component = checkComponentAttr(el, options);
        if (component) {
            var ref = findRef(el);
            var descriptor = {
                name: 'component',
                ref: ref,
                expression: component.id,
                def: internalDirectives.component,
                modifiers: {
                    literal: !component.dynamic
                }
            };
            var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
                if (ref) {
                    defineReactive((scope || vm).$refs, ref, null);
                }
                vm._bindDir(descriptor, el, host, scope, frag);
            };
            componentLinkFn.terminal = true;
            return componentLinkFn;
        }
    }

    /**
     * Check an element for terminal directives in fixed order.
     * If it finds one, return a terminal link function.
     *
     * @param {Element} el
     * @param {Array} attrs
     * @param {Object} options
     * @return {Function} terminalLinkFn
     */

    function checkTerminalDirectives(el, attrs, options) {
        // skip v-pre
        if (getAttr(el, 'v-pre') !== null) {
            return skip;
        }
        // skip v-else block, but only if following v-if
        if (el.hasAttribute('v-else')) {
            var prev = el.previousElementSibling;
            if (prev && prev.hasAttribute('v-if')) {
                return skip;
            }
        }

        var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
        for (var i = 0, j = attrs.length; i < j; i++) {
            attr = attrs[i];
            name = attr.name.replace(modifierRE, '');
            if (matched = name.match(dirAttrRE)) {
                def = resolveAsset(options, 'directives', matched[1]);
                if (def && def.terminal) {
                    if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
                        termDef = def;
                        rawName = attr.name;
                        modifiers = parseModifiers(attr.name);
                        value = attr.value;
                        dirName = matched[1];
                        arg = matched[2];
                    }
                }
            }
        }

        if (termDef) {
            return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
        }
    }

    function skip() {}
    skip.terminal = true;

    /**
     * Build a node link function for a terminal directive.
     * A terminal link function terminates the current
     * compilation recursion and handles compilation of the
     * subtree in the directive.
     *
     * @param {Element} el
     * @param {String} dirName
     * @param {String} value
     * @param {Object} options
     * @param {Object} def
     * @param {String} [rawName]
     * @param {String} [arg]
     * @param {Object} [modifiers]
     * @return {Function} terminalLinkFn
     */

    function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
        var parsed = parseDirective(value);
        var descriptor = {
            name: dirName,
            arg: arg,
            expression: parsed.expression,
            filters: parsed.filters,
            raw: value,
            attr: rawName,
            modifiers: modifiers,
            def: def
        };
        // check ref for v-for and router-view
        if (dirName === 'for' || dirName === 'router-view') {
            descriptor.ref = findRef(el);
        }
        var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
            if (descriptor.ref) {
                defineReactive((scope || vm).$refs, descriptor.ref, null);
            }
            vm._bindDir(descriptor, el, host, scope, frag);
        };
        fn.terminal = true;
        return fn;
    }

    /**
     * Compile the directives on an element and return a linker.
     *
     * @param {Array|NamedNodeMap} attrs
     * @param {Object} options
     * @return {Function}
     */

    function compileDirectives(attrs, options) {
        var i = attrs.length;
        var dirs = [];
        var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
        while (i--) {
            attr = attrs[i];
            name = rawName = attr.name;
            value = rawValue = attr.value;
            tokens = parseText(value);
            // reset arg
            arg = null;
            // check modifiers
            modifiers = parseModifiers(name);
            name = name.replace(modifierRE, '');

            // attribute interpolations
            if (tokens) {
                value = tokensToExp(tokens);
                arg = name;
                pushDir('bind', directives.bind, tokens);
                // warn against mixing mustaches with v-bind
                if ('development' !== 'production') {
                    if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
                        return attr.name === ':class' || attr.name === 'v-bind:class';
                    })) {
                        warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
                    }
                }
            } else

            // special attribute: transition
            if (transitionRE.test(name)) {
                modifiers.literal = !bindRE.test(name);
                pushDir('transition', internalDirectives.transition);
            } else

            // event handlers
            if (onRE.test(name)) {
                arg = name.replace(onRE, '');
                pushDir('on', directives.on);
            } else

            // attribute bindings
            if (bindRE.test(name)) {
                dirName = name.replace(bindRE, '');
                if (dirName === 'style' || dirName === 'class') {
                    pushDir(dirName, internalDirectives[dirName]);
                } else {
                    arg = dirName;
                    pushDir('bind', directives.bind);
                }
            } else

            // normal directives
            if (matched = name.match(dirAttrRE)) {
                dirName = matched[1];
                arg = matched[2];

                // skip v-else (when used with v-show)
                if (dirName === 'else') {
                    continue;
                }

                dirDef = resolveAsset(options, 'directives', dirName, true);
                if (dirDef) {
                    pushDir(dirName, dirDef);
                }
            }
        }

        /**
         * Push a directive.
         *
         * @param {String} dirName
         * @param {Object|Function} def
         * @param {Array} [interpTokens]
         */

        function pushDir(dirName, def, interpTokens) {
            var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
            var parsed = !hasOneTimeToken && parseDirective(value);
            dirs.push({
                name: dirName,
                attr: rawName,
                raw: rawValue,
                def: def,
                arg: arg,
                modifiers: modifiers,
                // conversion from interpolation strings with one-time token
                // to expression is differed until directive bind time so that we
                // have access to the actual vm context for one-time bindings.
                expression: parsed && parsed.expression,
                filters: parsed && parsed.filters,
                interp: interpTokens,
                hasOneTime: hasOneTimeToken
            });
        }

        if (dirs.length) {
            return makeNodeLinkFn(dirs);
        }
    }

    /**
     * Parse modifiers from directive attribute name.
     *
     * @param {String} name
     * @return {Object}
     */

    function parseModifiers(name) {
        var res = Object.create(null);
        var match = name.match(modifierRE);
        if (match) {
            var i = match.length;
            while (i--) {
                res[match[i].slice(1)] = true;
            }
        }
        return res;
    }

    /**
     * Build a link function for all directives on a single node.
     *
     * @param {Array} directives
     * @return {Function} directivesLinkFn
     */

    function makeNodeLinkFn(directives) {
        return function nodeLinkFn(vm, el, host, scope, frag) {
            // reverse apply because it's sorted low to high
            var i = directives.length;
            while (i--) {
                vm._bindDir(directives[i], el, host, scope, frag);
            }
        };
    }

    /**
     * Check if an interpolation string contains one-time tokens.
     *
     * @param {Array} tokens
     * @return {Boolean}
     */

    function hasOneTime(tokens) {
        var i = tokens.length;
        while (i--) {
            if (tokens[i].oneTime) return true;
        }
    }

    function isScript(el) {
        return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
    }

    var specialCharRE = /[^\w\-:\.]/;

    /**
     * Process an element or a DocumentFragment based on a
     * instance option object. This allows us to transclude
     * a template node/fragment before the instance is created,
     * so the processed fragment can then be cloned and reused
     * in v-for.
     *
     * @param {Element} el
     * @param {Object} options
     * @return {Element|DocumentFragment}
     */

    function transclude(el, options) {
        // extract container attributes to pass them down
        // to compiler, because they need to be compiled in
        // parent scope. we are mutating the options object here
        // assuming the same object will be used for compile
        // right after this.
        if (options) {
            options._containerAttrs = extractAttrs(el);
        }
        // for template tags, what we want is its content as
        // a documentFragment (for fragment instances)
        if (isTemplate(el)) {
            el = parseTemplate(el);
        }
        if (options) {
            if (options._asComponent && !options.template) {
                options.template = '<slot></slot>';
            }
            if (options.template) {
                options._content = extractContent(el);
                el = transcludeTemplate(el, options);
            }
        }
        if (isFragment(el)) {
            // anchors for fragment instance
            // passing in `persist: true` to avoid them being
            // discarded by IE during template cloning
            prepend(createAnchor('v-start', true), el);
            el.appendChild(createAnchor('v-end', true));
        }
        return el;
    }

    /**
     * Process the template option.
     * If the replace option is true this will swap the $el.
     *
     * @param {Element} el
     * @param {Object} options
     * @return {Element|DocumentFragment}
     */

    function transcludeTemplate(el, options) {
        var template = options.template;
        var frag = parseTemplate(template, true);
        if (frag) {
            var replacer = frag.firstChild;
            var tag = replacer.tagName && replacer.tagName.toLowerCase();
            if (options.replace) {
                /* istanbul ignore if */
                if (el === document.body) {
                    'development' !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
                }
                // there are many cases where the instance must
                // become a fragment instance: basically anything that
                // can create more than 1 root nodes.
                if (
                // multi-children template
                    frag.childNodes.length > 1 ||
                        // non-element template
                        replacer.nodeType !== 1 ||
                        // single nested component
                        tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
                        // element directive
                        resolveAsset(options, 'elementDirectives', tag) ||
                        // for block
                        replacer.hasAttribute('v-for') ||
                        // if block
                        replacer.hasAttribute('v-if')) {
                    return frag;
                } else {
                    options._replacerAttrs = extractAttrs(replacer);
                    mergeAttrs(el, replacer);
                    return replacer;
                }
            } else {
                el.appendChild(frag);
                return el;
            }
        } else {
            'development' !== 'production' && warn('Invalid template option: ' + template);
        }
    }

    /**
     * Helper to extract a component container's attributes
     * into a plain object array.
     *
     * @param {Element} el
     * @return {Array}
     */

    function extractAttrs(el) {
        if (el.nodeType === 1 && el.hasAttributes()) {
            return toArray(el.attributes);
        }
    }

    /**
     * Merge the attributes of two elements, and make sure
     * the class names are merged properly.
     *
     * @param {Element} from
     * @param {Element} to
     */

    function mergeAttrs(from, to) {
        var attrs = from.attributes;
        var i = attrs.length;
        var name, value;
        while (i--) {
            name = attrs[i].name;
            value = attrs[i].value;
            if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
                to.setAttribute(name, value);
            } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
                value.split(/\s+/).forEach(function (cls) {
                    addClass(to, cls);
                });
            }
        }
    }

    /**
     * Scan and determine slot content distribution.
     * We do this during transclusion instead at compile time so that
     * the distribution is decoupled from the compilation order of
     * the slots.
     *
     * @param {Element|DocumentFragment} template
     * @param {Element} content
     * @param {Vue} vm
     */

    function resolveSlots(vm, content) {
        if (!content) {
            return;
        }
        var contents = vm._slotContents = Object.create(null);
        var el, name;
        for (var i = 0, l = content.children.length; i < l; i++) {
            el = content.children[i];
            /* eslint-disable no-cond-assign */
            if (name = el.getAttribute('slot')) {
                (contents[name] || (contents[name] = [])).push(el);
            }
            /* eslint-enable no-cond-assign */
            if ('development' !== 'production' && getBindAttr(el, 'slot')) {
                warn('The "slot" attribute must be static.', vm.$parent);
            }
        }
        for (name in contents) {
            contents[name] = extractFragment(contents[name], content);
        }
        if (content.hasChildNodes()) {
            var nodes = content.childNodes;
            if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
                return;
            }
            contents['default'] = extractFragment(content.childNodes, content);
        }
    }

    /**
     * Extract qualified content nodes from a node list.
     *
     * @param {NodeList} nodes
     * @return {DocumentFragment}
     */

    function extractFragment(nodes, parent) {
        var frag = document.createDocumentFragment();
        nodes = toArray(nodes);
        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
                parent.removeChild(node);
                node = parseTemplate(node, true);
            }
            frag.appendChild(node);
        }
        return frag;
    }



    var compiler = Object.freeze({
        compile: compile,
        compileAndLinkProps: compileAndLinkProps,
        compileRoot: compileRoot,
        transclude: transclude,
        resolveSlots: resolveSlots
    });

    function stateMixin (Vue) {
        /**
         * Accessor for `$data` property, since setting $data
         * requires observing the new object and updating
         * proxied properties.
         */

        Object.defineProperty(Vue.prototype, '$data', {
            get: function get() {
                return this._data;
            },
            set: function set(newData) {
                if (newData !== this._data) {
                    this._setData(newData);
                }
            }
        });

        /**
         * Setup the scope of an instance, which contains:
         * - observed data
         * - computed properties
         * - user methods
         * - meta properties
         */

        Vue.prototype._initState = function () {
            this._initProps();
            this._initMeta();
            this._initMethods();
            this._initData();
            this._initComputed();
        };

        /**
         * Initialize props.
         */

        Vue.prototype._initProps = function () {
            var options = this.$options;
            var el = options.el;
            var props = options.props;
            if (props && !el) {
                'development' !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
            }
            // make sure to convert string selectors into element now
            el = options.el = query(el);
            this._propsUnlinkFn = el && el.nodeType === 1 && props
                // props must be linked in proper scope if inside v-for
                ? compileAndLinkProps(this, el, props, this._scope) : null;
        };

        /**
         * Initialize the data.
         */

        Vue.prototype._initData = function () {
            var dataFn = this.$options.data;
            var data = this._data = dataFn ? dataFn() : {};
            if (!isPlainObject(data)) {
                data = {};
                'development' !== 'production' && warn('data functions should return an object.', this);
            }
            var props = this._props;
            // proxy data on instance
            var keys = Object.keys(data);
            var i, key;
            i = keys.length;
            while (i--) {
                key = keys[i];
                // there are two scenarios where we can proxy a data key:
                // 1. it's not already defined as a prop
                // 2. it's provided via a instantiation option AND there are no
                //    template prop present
                if (!props || !hasOwn(props, key)) {
                    this._proxy(key);
                } else if ('development' !== 'production') {
                    warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
                }
            }
            // observe data
            observe(data, this);
        };

        /**
         * Swap the instance's $data. Called in $data's setter.
         *
         * @param {Object} newData
         */

        Vue.prototype._setData = function (newData) {
            newData = newData || {};
            var oldData = this._data;
            this._data = newData;
            var keys, key, i;
            // unproxy keys not present in new data
            keys = Object.keys(oldData);
            i = keys.length;
            while (i--) {
                key = keys[i];
                if (!(key in newData)) {
                    this._unproxy(key);
                }
            }
            // proxy keys not already proxied,
            // and trigger change for changed values
            keys = Object.keys(newData);
            i = keys.length;
            while (i--) {
                key = keys[i];
                if (!hasOwn(this, key)) {
                    // new property
                    this._proxy(key);
                }
            }
            oldData.__ob__.removeVm(this);
            observe(newData, this);
            this._digest();
        };

        /**
         * Proxy a property, so that
         * vm.prop === vm._data.prop
         *
         * @param {String} key
         */

        Vue.prototype._proxy = function (key) {
            if (!isReserved(key)) {
                // need to store ref to self here
                // because these getter/setters might
                // be called by child scopes via
                // prototype inheritance.
                var self = this;
                Object.defineProperty(self, key, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyGetter() {
                        return self._data[key];
                    },
                    set: function proxySetter(val) {
                        self._data[key] = val;
                    }
                });
            }
        };

        /**
         * Unproxy a property.
         *
         * @param {String} key
         */

        Vue.prototype._unproxy = function (key) {
            if (!isReserved(key)) {
                delete this[key];
            }
        };

        /**
         * Force update on every watcher in scope.
         */

        Vue.prototype._digest = function () {
            for (var i = 0, l = this._watchers.length; i < l; i++) {
                this._watchers[i].update(true); // shallow updates
            }
        };

        /**
         * Setup computed properties. They are essentially
         * special getter/setters
         */

        function noop() {}
        Vue.prototype._initComputed = function () {
            var computed = this.$options.computed;
            if (computed) {
                for (var key in computed) {
                    var userDef = computed[key];
                    var def = {
                        enumerable: true,
                        configurable: true
                    };
                    if (typeof userDef === 'function') {
                        def.get = makeComputedGetter(userDef, this);
                        def.set = noop;
                    } else {
                        def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
                        def.set = userDef.set ? bind(userDef.set, this) : noop;
                    }
                    Object.defineProperty(this, key, def);
                }
            }
        };

        function makeComputedGetter(getter, owner) {
            var watcher = new Watcher(owner, getter, null, {
                lazy: true
            });
            return function computedGetter() {
                if (watcher.dirty) {
                    watcher.evaluate();
                }
                if (Dep.target) {
                    watcher.depend();
                }
                return watcher.value;
            };
        }

        /**
         * Setup instance methods. Methods must be bound to the
         * instance since they might be passed down as a prop to
         * child components.
         */

        Vue.prototype._initMethods = function () {
            var methods = this.$options.methods;
            if (methods) {
                for (var key in methods) {
                    this[key] = bind(methods[key], this);
                }
            }
        };

        /**
         * Initialize meta information like $index, $key & $value.
         */

        Vue.prototype._initMeta = function () {
            var metas = this.$options._meta;
            if (metas) {
                for (var key in metas) {
                    defineReactive(this, key, metas[key]);
                }
            }
        };
    }

    var eventRE = /^v-on:|^@/;

    function eventsMixin (Vue) {
        /**
         * Setup the instance's option events & watchers.
         * If the value is a string, we pull it from the
         * instance's methods by name.
         */

        Vue.prototype._initEvents = function () {
            var options = this.$options;
            if (options._asComponent) {
                registerComponentEvents(this, options.el);
            }
            registerCallbacks(this, '$on', options.events);
            registerCallbacks(this, '$watch', options.watch);
        };

        /**
         * Register v-on events on a child component
         *
         * @param {Vue} vm
         * @param {Element} el
         */

        function registerComponentEvents(vm, el) {
            var attrs = el.attributes;
            var name, value, handler;
            for (var i = 0, l = attrs.length; i < l; i++) {
                name = attrs[i].name;
                if (eventRE.test(name)) {
                    name = name.replace(eventRE, '');
                    // force the expression into a statement so that
                    // it always dynamically resolves the method to call (#2670)
                    // kinda ugly hack, but does the job.
                    value = attrs[i].value;
                    if (isSimplePath(value)) {
                        value += '.apply(this, $arguments)';
                    }
                    handler = (vm._scope || vm._context).$eval(value, true);
                    handler._fromParent = true;
                    vm.$on(name.replace(eventRE), handler);
                }
            }
        }

        /**
         * Register callbacks for option events and watchers.
         *
         * @param {Vue} vm
         * @param {String} action
         * @param {Object} hash
         */

        function registerCallbacks(vm, action, hash) {
            if (!hash) return;
            var handlers, key, i, j;
            for (key in hash) {
                handlers = hash[key];
                if (isArray(handlers)) {
                    for (i = 0, j = handlers.length; i < j; i++) {
                        register(vm, action, key, handlers[i]);
                    }
                } else {
                    register(vm, action, key, handlers);
                }
            }
        }

        /**
         * Helper to register an event/watch callback.
         *
         * @param {Vue} vm
         * @param {String} action
         * @param {String} key
         * @param {Function|String|Object} handler
         * @param {Object} [options]
         */

        function register(vm, action, key, handler, options) {
            var type = typeof handler;
            if (type === 'function') {
                vm[action](key, handler, options);
            } else if (type === 'string') {
                var methods = vm.$options.methods;
                var method = methods && methods[handler];
                if (method) {
                    vm[action](key, method, options);
                } else {
                    'development' !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
                }
            } else if (handler && type === 'object') {
                register(vm, action, key, handler.handler, handler);
            }
        }

        /**
         * Setup recursive attached/detached calls
         */

        Vue.prototype._initDOMHooks = function () {
            this.$on('hook:attached', onAttached);
            this.$on('hook:detached', onDetached);
        };

        /**
         * Callback to recursively call attached hook on children
         */

        function onAttached() {
            if (!this._isAttached) {
                this._isAttached = true;
                this.$children.forEach(callAttach);
            }
        }

        /**
         * Iterator to call attached hook
         *
         * @param {Vue} child
         */

        function callAttach(child) {
            if (!child._isAttached && inDoc(child.$el)) {
                child._callHook('attached');
            }
        }

        /**
         * Callback to recursively call detached hook on children
         */

        function onDetached() {
            if (this._isAttached) {
                this._isAttached = false;
                this.$children.forEach(callDetach);
            }
        }

        /**
         * Iterator to call detached hook
         *
         * @param {Vue} child
         */

        function callDetach(child) {
            if (child._isAttached && !inDoc(child.$el)) {
                child._callHook('detached');
            }
        }

        /**
         * Trigger all handlers for a hook
         *
         * @param {String} hook
         */

        Vue.prototype._callHook = function (hook) {
            this.$emit('pre-hook:' + hook);
            var handlers = this.$options[hook];
            if (handlers) {
                for (var i = 0, j = handlers.length; i < j; i++) {
                    handlers[i].call(this);
                }
            }
            this.$emit('hook:' + hook);
        };
    }

    function noop$1() {}

    /**
     * A directive links a DOM element with a piece of data,
     * which is the result of evaluating an expression.
     * It registers a watcher with the expression and calls
     * the DOM update function when a change is triggered.
     *
     * @param {Object} descriptor
     *                 - {String} name
     *                 - {Object} def
     *                 - {String} expression
     *                 - {Array<Object>} [filters]
     *                 - {Object} [modifiers]
     *                 - {Boolean} literal
     *                 - {String} attr
     *                 - {String} arg
     *                 - {String} raw
     *                 - {String} [ref]
     *                 - {Array<Object>} [interp]
     *                 - {Boolean} [hasOneTime]
     * @param {Vue} vm
     * @param {Node} el
     * @param {Vue} [host] - transclusion host component
     * @param {Object} [scope] - v-for scope
     * @param {Fragment} [frag] - owner fragment
     * @constructor
     */
    function Directive(descriptor, vm, el, host, scope, frag) {
        this.vm = vm;
        this.el = el;
        // copy descriptor properties
        this.descriptor = descriptor;
        this.name = descriptor.name;
        this.expression = descriptor.expression;
        this.arg = descriptor.arg;
        this.modifiers = descriptor.modifiers;
        this.filters = descriptor.filters;
        this.literal = this.modifiers && this.modifiers.literal;
        // private
        this._locked = false;
        this._bound = false;
        this._listeners = null;
        // link context
        this._host = host;
        this._scope = scope;
        this._frag = frag;
        // store directives on node in dev mode
        if ('development' !== 'production' && this.el) {
            this.el._vue_directives = this.el._vue_directives || [];
            this.el._vue_directives.push(this);
        }
    }

    /**
     * Initialize the directive, mixin definition properties,
     * setup the watcher, call definition bind() and update()
     * if present.
     */

    Directive.prototype._bind = function () {
        var name = this.name;
        var descriptor = this.descriptor;

        // remove attribute
        if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
            var attr = descriptor.attr || 'v-' + name;
            this.el.removeAttribute(attr);
        }

        // copy def properties
        var def = descriptor.def;
        if (typeof def === 'function') {
            this.update = def;
        } else {
            extend(this, def);
        }

        // setup directive params
        this._setupParams();

        // initial bind
        if (this.bind) {
            this.bind();
        }
        this._bound = true;

        if (this.literal) {
            this.update && this.update(descriptor.raw);
        } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
            // wrapped updater for context
            var dir = this;
            if (this.update) {
                this._update = function (val, oldVal) {
                    if (!dir._locked) {
                        dir.update(val, oldVal);
                    }
                };
            } else {
                this._update = noop$1;
            }
            var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
            var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
            var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
                {
                    filters: this.filters,
                    twoWay: this.twoWay,
                    deep: this.deep,
                    preProcess: preProcess,
                    postProcess: postProcess,
                    scope: this._scope
                });
            // v-model with inital inline value need to sync back to
            // model instead of update to DOM on init. They would
            // set the afterBind hook to indicate that.
            if (this.afterBind) {
                this.afterBind();
            } else if (this.update) {
                this.update(watcher.value);
            }
        }
    };

    /**
     * Setup all param attributes, e.g. track-by,
     * transition-mode, etc...
     */

    Directive.prototype._setupParams = function () {
        if (!this.params) {
            return;
        }
        var params = this.params;
        // swap the params array with a fresh object.
        this.params = Object.create(null);
        var i = params.length;
        var key, val, mappedKey;
        while (i--) {
            key = hyphenate(params[i]);
            mappedKey = camelize(key);
            val = getBindAttr(this.el, key);
            if (val != null) {
                // dynamic
                this._setupParamWatcher(mappedKey, val);
            } else {
                // static
                val = getAttr(this.el, key);
                if (val != null) {
                    this.params[mappedKey] = val === '' ? true : val;
                }
            }
        }
    };

    /**
     * Setup a watcher for a dynamic param.
     *
     * @param {String} key
     * @param {String} expression
     */

    Directive.prototype._setupParamWatcher = function (key, expression) {
        var self = this;
        var called = false;
        var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
            self.params[key] = val;
            // since we are in immediate mode,
            // only call the param change callbacks if this is not the first update.
            if (called) {
                var cb = self.paramWatchers && self.paramWatchers[key];
                if (cb) {
                    cb.call(self, val, oldVal);
                }
            } else {
                called = true;
            }
        }, {
            immediate: true,
            user: false
        });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
    };

    /**
     * Check if the directive is a function caller
     * and if the expression is a callable one. If both true,
     * we wrap up the expression and use it as the event
     * handler.
     *
     * e.g. on-click="a++"
     *
     * @return {Boolean}
     */

    Directive.prototype._checkStatement = function () {
        var expression = this.expression;
        if (expression && this.acceptStatement && !isSimplePath(expression)) {
            var fn = parseExpression(expression).get;
            var scope = this._scope || this.vm;
            var handler = function handler(e) {
                scope.$event = e;
                fn.call(scope, scope);
                scope.$event = null;
            };
            if (this.filters) {
                handler = scope._applyFilters(handler, null, this.filters);
            }
            this.update(handler);
            return true;
        }
    };

    /**
     * Set the corresponding value with the setter.
     * This should only be used in two-way directives
     * e.g. v-model.
     *
     * @param {*} value
     * @public
     */

    Directive.prototype.set = function (value) {
        /* istanbul ignore else */
        if (this.twoWay) {
            this._withLock(function () {
                this._watcher.set(value);
            });
        } else if ('development' !== 'production') {
            warn('Directive.set() can only be used inside twoWay' + 'directives.');
        }
    };

    /**
     * Execute a function while preventing that function from
     * triggering updates on this directive instance.
     *
     * @param {Function} fn
     */

    Directive.prototype._withLock = function (fn) {
        var self = this;
        self._locked = true;
        fn.call(self);
        nextTick(function () {
            self._locked = false;
        });
    };

    /**
     * Convenience method that attaches a DOM event listener
     * to the directive element and autometically tears it down
     * during unbind.
     *
     * @param {String} event
     * @param {Function} handler
     * @param {Boolean} [useCapture]
     */

    Directive.prototype.on = function (event, handler, useCapture) {
        on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
    };

    /**
     * Teardown the watcher and call unbind.
     */

    Directive.prototype._teardown = function () {
        if (this._bound) {
            this._bound = false;
            if (this.unbind) {
                this.unbind();
            }
            if (this._watcher) {
                this._watcher.teardown();
            }
            var listeners = this._listeners;
            var i;
            if (listeners) {
                i = listeners.length;
                while (i--) {
                    off(this.el, listeners[i][0], listeners[i][1]);
                }
            }
            var unwatchFns = this._paramUnwatchFns;
            if (unwatchFns) {
                i = unwatchFns.length;
                while (i--) {
                    unwatchFns[i]();
                }
            }
            if ('development' !== 'production' && this.el) {
                this.el._vue_directives.$remove(this);
            }
            this.vm = this.el = this._watcher = this._listeners = null;
        }
    };

    function lifecycleMixin (Vue) {
        /**
         * Update v-ref for component.
         *
         * @param {Boolean} remove
         */

        Vue.prototype._updateRef = function (remove) {
            var ref = this.$options._ref;
            if (ref) {
                var refs = (this._scope || this._context).$refs;
                if (remove) {
                    if (refs[ref] === this) {
                        refs[ref] = null;
                    }
                } else {
                    refs[ref] = this;
                }
            }
        };

        /**
         * Transclude, compile and link element.
         *
         * If a pre-compiled linker is available, that means the
         * passed in element will be pre-transcluded and compiled
         * as well - all we need to do is to call the linker.
         *
         * Otherwise we need to call transclude/compile/link here.
         *
         * @param {Element} el
         */

        Vue.prototype._compile = function (el) {
            var options = this.$options;

            // transclude and init element
            // transclude can potentially replace original
            // so we need to keep reference; this step also injects
            // the template and caches the original attributes
            // on the container node and replacer node.
            var original = el;
            el = transclude(el, options);
            this._initElement(el);

            // handle v-pre on root node (#2026)
            if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
                return;
            }

            // root is always compiled per-instance, because
            // container attrs and props can be different every time.
            var contextOptions = this._context && this._context.$options;
            var rootLinker = compileRoot(el, options, contextOptions);

            // resolve slot distribution
            resolveSlots(this, options._content);

            // compile and link the rest
            var contentLinkFn;
            var ctor = this.constructor;
            // component compilation can be cached
            // as long as it's not using inline-template
            if (options._linkerCachable) {
                contentLinkFn = ctor.linker;
                if (!contentLinkFn) {
                    contentLinkFn = ctor.linker = compile(el, options);
                }
            }

            // link phase
            // make sure to link root with prop scope!
            var rootUnlinkFn = rootLinker(this, el, this._scope);
            var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

            // register composite unlink function
            // to be called during instance destruction
            this._unlinkFn = function () {
                rootUnlinkFn();
                // passing destroying: true to avoid searching and
                // splicing the directives
                contentUnlinkFn(true);
            };

            // finally replace original
            if (options.replace) {
                replace(original, el);
            }

            this._isCompiled = true;
            this._callHook('compiled');
        };

        /**
         * Initialize instance element. Called in the public
         * $mount() method.
         *
         * @param {Element} el
         */

        Vue.prototype._initElement = function (el) {
            if (isFragment(el)) {
                this._isFragment = true;
                this.$el = this._fragmentStart = el.firstChild;
                this._fragmentEnd = el.lastChild;
                // set persisted text anchors to empty
                if (this._fragmentStart.nodeType === 3) {
                    this._fragmentStart.data = this._fragmentEnd.data = '';
                }
                this._fragment = el;
            } else {
                this.$el = el;
            }
            this.$el.__vue__ = this;
            this._callHook('beforeCompile');
        };

        /**
         * Create and bind a directive to an element.
         *
         * @param {Object} descriptor - parsed directive descriptor
         * @param {Node} node   - target node
         * @param {Vue} [host] - transclusion host component
         * @param {Object} [scope] - v-for scope
         * @param {Fragment} [frag] - owner fragment
         */

        Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
            this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
        };

        /**
         * Teardown an instance, unobserves the data, unbind all the
         * directives, turn off all the event listeners, etc.
         *
         * @param {Boolean} remove - whether to remove the DOM node.
         * @param {Boolean} deferCleanup - if true, defer cleanup to
         *                                 be called later
         */

        Vue.prototype._destroy = function (remove, deferCleanup) {
            if (this._isBeingDestroyed) {
                if (!deferCleanup) {
                    this._cleanup();
                }
                return;
            }

            var destroyReady;
            var pendingRemoval;

            var self = this;
            // Cleanup should be called either synchronously or asynchronoysly as
            // callback of this.$remove(), or if remove and deferCleanup are false.
            // In any case it should be called after all other removing, unbinding and
            // turning of is done
            var cleanupIfPossible = function cleanupIfPossible() {
                if (destroyReady && !pendingRemoval && !deferCleanup) {
                    self._cleanup();
                }
            };

            // remove DOM element
            if (remove && this.$el) {
                pendingRemoval = true;
                this.$remove(function () {
                    pendingRemoval = false;
                    cleanupIfPossible();
                });
            }

            this._callHook('beforeDestroy');
            this._isBeingDestroyed = true;
            var i;
            // remove self from parent. only necessary
            // if parent is not being destroyed as well.
            var parent = this.$parent;
            if (parent && !parent._isBeingDestroyed) {
                parent.$children.$remove(this);
                // unregister ref (remove: true)
                this._updateRef(true);
            }
            // destroy all children.
            i = this.$children.length;
            while (i--) {
                this.$children[i].$destroy();
            }
            // teardown props
            if (this._propsUnlinkFn) {
                this._propsUnlinkFn();
            }
            // teardown all directives. this also tearsdown all
            // directive-owned watchers.
            if (this._unlinkFn) {
                this._unlinkFn();
            }
            i = this._watchers.length;
            while (i--) {
                this._watchers[i].teardown();
            }
            // remove reference to self on $el
            if (this.$el) {
                this.$el.__vue__ = null;
            }

            destroyReady = true;
            cleanupIfPossible();
        };

        /**
         * Clean up to ensure garbage collection.
         * This is called after the leave transition if there
         * is any.
         */

        Vue.prototype._cleanup = function () {
            if (this._isDestroyed) {
                return;
            }
            // remove self from owner fragment
            // do it in cleanup so that we can call $destroy with
            // defer right when a fragment is about to be removed.
            if (this._frag) {
                this._frag.children.$remove(this);
            }
            // remove reference from data ob
            // frozen object may not have observer.
            if (this._data && this._data.__ob__) {
                this._data.__ob__.removeVm(this);
            }
            // Clean up references to private properties and other
            // instances. preserve reference to _data so that proxy
            // accessors still work. The only potential side effect
            // here is that mutating the instance after it's destroyed
            // may affect the state of other components that are still
            // observing the same object, but that seems to be a
            // reasonable responsibility for the user rather than
            // always throwing an error on them.
            this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
            // call the last hook...
            this._isDestroyed = true;
            this._callHook('destroyed');
            // turn off all instance listeners.
            this.$off();
        };
    }

    function miscMixin (Vue) {
        /**
         * Apply a list of filter (descriptors) to a value.
         * Using plain for loops here because this will be called in
         * the getter of any watcher with filters so it is very
         * performance sensitive.
         *
         * @param {*} value
         * @param {*} [oldValue]
         * @param {Array} filters
         * @param {Boolean} write
         * @return {*}
         */

        Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
            var filter, fn, args, arg, offset, i, l, j, k;
            for (i = 0, l = filters.length; i < l; i++) {
                filter = filters[write ? l - i - 1 : i];
                fn = resolveAsset(this.$options, 'filters', filter.name, true);
                if (!fn) continue;
                fn = write ? fn.write : fn.read || fn;
                if (typeof fn !== 'function') continue;
                args = write ? [value, oldValue] : [value];
                offset = write ? 2 : 1;
                if (filter.args) {
                    for (j = 0, k = filter.args.length; j < k; j++) {
                        arg = filter.args[j];
                        args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
                    }
                }
                value = fn.apply(this, args);
            }
            return value;
        };

        /**
         * Resolve a component, depending on whether the component
         * is defined normally or using an async factory function.
         * Resolves synchronously if already resolved, otherwise
         * resolves asynchronously and caches the resolved
         * constructor on the factory.
         *
         * @param {String|Function} value
         * @param {Function} cb
         */

        Vue.prototype._resolveComponent = function (value, cb) {
            var factory;
            if (typeof value === 'function') {
                factory = value;
            } else {
                factory = resolveAsset(this.$options, 'components', value, true);
            }
            /* istanbul ignore if */
            if (!factory) {
                return;
            }
            // async component factory
            if (!factory.options) {
                if (factory.resolved) {
                    // cached
                    cb(factory.resolved);
                } else if (factory.requested) {
                    // pool callbacks
                    factory.pendingCallbacks.push(cb);
                } else {
                    factory.requested = true;
                    var cbs = factory.pendingCallbacks = [cb];
                    factory.call(this, function resolve(res) {
                        if (isPlainObject(res)) {
                            res = Vue.extend(res);
                        }
                        // cache resolved
                        factory.resolved = res;
                        // invoke callbacks
                        for (var i = 0, l = cbs.length; i < l; i++) {
                            cbs[i](res);
                        }
                    }, function reject(reason) {
                        'development' !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
                    });
                }
            } else {
                // normal component
                cb(factory);
            }
        };
    }

    var filterRE$1 = /[^|]\|[^|]/;

    function dataAPI (Vue) {
        /**
         * Get the value from an expression on this vm.
         *
         * @param {String} exp
         * @param {Boolean} [asStatement]
         * @return {*}
         */

        Vue.prototype.$get = function (exp, asStatement) {
            var res = parseExpression(exp);
            if (res) {
                if (asStatement) {
                    var self = this;
                    return function statementHandler() {
                        self.$arguments = toArray(arguments);
                        var result = res.get.call(self, self);
                        self.$arguments = null;
                        return result;
                    };
                } else {
                    try {
                        return res.get.call(this, this);
                    } catch (e) {}
                }
            }
        };

        /**
         * Set the value from an expression on this vm.
         * The expression must be a valid left-hand
         * expression in an assignment.
         *
         * @param {String} exp
         * @param {*} val
         */

        Vue.prototype.$set = function (exp, val) {
            var res = parseExpression(exp, true);
            if (res && res.set) {
                res.set.call(this, this, val);
            }
        };

        /**
         * Delete a property on the VM
         *
         * @param {String} key
         */

        Vue.prototype.$delete = function (key) {
            del(this._data, key);
        };

        /**
         * Watch an expression, trigger callback when its
         * value changes.
         *
         * @param {String|Function} expOrFn
         * @param {Function} cb
         * @param {Object} [options]
         *                 - {Boolean} deep
         *                 - {Boolean} immediate
         * @return {Function} - unwatchFn
         */

        Vue.prototype.$watch = function (expOrFn, cb, options) {
            var vm = this;
            var parsed;
            if (typeof expOrFn === 'string') {
                parsed = parseDirective(expOrFn);
                expOrFn = parsed.expression;
            }
            var watcher = new Watcher(vm, expOrFn, cb, {
                deep: options && options.deep,
                sync: options && options.sync,
                filters: parsed && parsed.filters,
                user: !options || options.user !== false
            });
            if (options && options.immediate) {
                cb.call(vm, watcher.value);
            }
            return function unwatchFn() {
                watcher.teardown();
            };
        };

        /**
         * Evaluate a text directive, including filters.
         *
         * @param {String} text
         * @param {Boolean} [asStatement]
         * @return {String}
         */

        Vue.prototype.$eval = function (text, asStatement) {
            // check for filters.
            if (filterRE$1.test(text)) {
                var dir = parseDirective(text);
                // the filter regex check might give false positive
                // for pipes inside strings, so it's possible that
                // we don't get any filters here
                var val = this.$get(dir.expression, asStatement);
                return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
            } else {
                // no filter
                return this.$get(text, asStatement);
            }
        };

        /**
         * Interpolate a piece of template text.
         *
         * @param {String} text
         * @return {String}
         */

        Vue.prototype.$interpolate = function (text) {
            var tokens = parseText(text);
            var vm = this;
            if (tokens) {
                if (tokens.length === 1) {
                    return vm.$eval(tokens[0].value) + '';
                } else {
                    return tokens.map(function (token) {
                        return token.tag ? vm.$eval(token.value) : token.value;
                    }).join('');
                }
            } else {
                return text;
            }
        };

        /**
         * Log instance data as a plain JS object
         * so that it is easier to inspect in console.
         * This method assumes console is available.
         *
         * @param {String} [path]
         */

        Vue.prototype.$log = function (path) {
            var data = path ? getPath(this._data, path) : this._data;
            if (data) {
                data = clean(data);
            }
            // include computed fields
            if (!path) {
                var key;
                for (key in this.$options.computed) {
                    data[key] = clean(this[key]);
                }
                if (this._props) {
                    for (key in this._props) {
                        data[key] = clean(this[key]);
                    }
                }
            }
            console.log(data);
        };

        /**
         * "clean" a getter/setter converted object into a plain
         * object copy.
         *
         * @param {Object} - obj
         * @return {Object}
         */

        function clean(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    }

    function domAPI (Vue) {
        /**
         * Convenience on-instance nextTick. The callback is
         * auto-bound to the instance, and this avoids component
         * modules having to rely on the global Vue.
         *
         * @param {Function} fn
         */

        Vue.prototype.$nextTick = function (fn) {
            nextTick(fn, this);
        };

        /**
         * Append instance to target
         *
         * @param {Node} target
         * @param {Function} [cb]
         * @param {Boolean} [withTransition] - defaults to true
         */

        Vue.prototype.$appendTo = function (target, cb, withTransition) {
            return insert(this, target, cb, withTransition, append, appendWithTransition);
        };

        /**
         * Prepend instance to target
         *
         * @param {Node} target
         * @param {Function} [cb]
         * @param {Boolean} [withTransition] - defaults to true
         */

        Vue.prototype.$prependTo = function (target, cb, withTransition) {
            target = query(target);
            if (target.hasChildNodes()) {
                this.$before(target.firstChild, cb, withTransition);
            } else {
                this.$appendTo(target, cb, withTransition);
            }
            return this;
        };

        /**
         * Insert instance before target
         *
         * @param {Node} target
         * @param {Function} [cb]
         * @param {Boolean} [withTransition] - defaults to true
         */

        Vue.prototype.$before = function (target, cb, withTransition) {
            return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
        };

        /**
         * Insert instance after target
         *
         * @param {Node} target
         * @param {Function} [cb]
         * @param {Boolean} [withTransition] - defaults to true
         */

        Vue.prototype.$after = function (target, cb, withTransition) {
            target = query(target);
            if (target.nextSibling) {
                this.$before(target.nextSibling, cb, withTransition);
            } else {
                this.$appendTo(target.parentNode, cb, withTransition);
            }
            return this;
        };

        /**
         * Remove instance from DOM
         *
         * @param {Function} [cb]
         * @param {Boolean} [withTransition] - defaults to true
         */

        Vue.prototype.$remove = function (cb, withTransition) {
            if (!this.$el.parentNode) {
                return cb && cb();
            }
            var inDocument = this._isAttached && inDoc(this.$el);
            // if we are not in document, no need to check
            // for transitions
            if (!inDocument) withTransition = false;
            var self = this;
            var realCb = function realCb() {
                if (inDocument) self._callHook('detached');
                if (cb) cb();
            };
            if (this._isFragment) {
                removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
            } else {
                var op = withTransition === false ? removeWithCb : removeWithTransition;
                op(this.$el, this, realCb);
            }
            return this;
        };

        /**
         * Shared DOM insertion function.
         *
         * @param {Vue} vm
         * @param {Element} target
         * @param {Function} [cb]
         * @param {Boolean} [withTransition]
         * @param {Function} op1 - op for non-transition insert
         * @param {Function} op2 - op for transition insert
         * @return vm
         */

        function insert(vm, target, cb, withTransition, op1, op2) {
            target = query(target);
            var targetIsDetached = !inDoc(target);
            var op = withTransition === false || targetIsDetached ? op1 : op2;
            var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
            if (vm._isFragment) {
                mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
                    op(node, target, vm);
                });
                cb && cb();
            } else {
                op(vm.$el, target, vm, cb);
            }
            if (shouldCallHook) {
                vm._callHook('attached');
            }
            return vm;
        }

        /**
         * Check for selectors
         *
         * @param {String|Element} el
         */

        function query(el) {
            return typeof el === 'string' ? document.querySelector(el) : el;
        }

        /**
         * Append operation that takes a callback.
         *
         * @param {Node} el
         * @param {Node} target
         * @param {Vue} vm - unused
         * @param {Function} [cb]
         */

        function append(el, target, vm, cb) {
            target.appendChild(el);
            if (cb) cb();
        }

        /**
         * InsertBefore operation that takes a callback.
         *
         * @param {Node} el
         * @param {Node} target
         * @param {Vue} vm - unused
         * @param {Function} [cb]
         */

        function beforeWithCb(el, target, vm, cb) {
            before(el, target);
            if (cb) cb();
        }

        /**
         * Remove operation that takes a callback.
         *
         * @param {Node} el
         * @param {Vue} vm - unused
         * @param {Function} [cb]
         */

        function removeWithCb(el, vm, cb) {
            remove(el);
            if (cb) cb();
        }
    }

    function eventsAPI (Vue) {
        /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         */

        Vue.prototype.$on = function (event, fn) {
            (this._events[event] || (this._events[event] = [])).push(fn);
            modifyListenerCount(this, event, 1);
            return this;
        };

        /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         */

        Vue.prototype.$once = function (event, fn) {
            var self = this;
            function on() {
                self.$off(event, on);
                fn.apply(this, arguments);
            }
            on.fn = fn;
            this.$on(event, on);
            return this;
        };

        /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         */

        Vue.prototype.$off = function (event, fn) {
            var cbs;
            // all
            if (!arguments.length) {
                if (this.$parent) {
                    for (event in this._events) {
                        cbs = this._events[event];
                        if (cbs) {
                            modifyListenerCount(this, event, -cbs.length);
                        }
                    }
                }
                this._events = {};
                return this;
            }
            // specific event
            cbs = this._events[event];
            if (!cbs) {
                return this;
            }
            if (arguments.length === 1) {
                modifyListenerCount(this, event, -cbs.length);
                this._events[event] = null;
                return this;
            }
            // specific handler
            var cb;
            var i = cbs.length;
            while (i--) {
                cb = cbs[i];
                if (cb === fn || cb.fn === fn) {
                    modifyListenerCount(this, event, -1);
                    cbs.splice(i, 1);
                    break;
                }
            }
            return this;
        };

        /**
         * Trigger an event on self.
         *
         * @param {String|Object} event
         * @return {Boolean} shouldPropagate
         */

        Vue.prototype.$emit = function (event) {
            var isSource = typeof event === 'string';
            event = isSource ? event : event.name;
            var cbs = this._events[event];
            var shouldPropagate = isSource || !cbs;
            if (cbs) {
                cbs = cbs.length > 1 ? toArray(cbs) : cbs;
                // this is a somewhat hacky solution to the question raised
                // in #2102: for an inline component listener like <comp @test="doThis">,
                // the propagation handling is somewhat broken. Therefore we
                // need to treat these inline callbacks differently.
                var hasParentCbs = isSource && cbs.some(function (cb) {
                    return cb._fromParent;
                });
                if (hasParentCbs) {
                    shouldPropagate = false;
                }
                var args = toArray(arguments, 1);
                for (var i = 0, l = cbs.length; i < l; i++) {
                    var cb = cbs[i];
                    var res = cb.apply(this, args);
                    if (res === true && (!hasParentCbs || cb._fromParent)) {
                        shouldPropagate = true;
                    }
                }
            }
            return shouldPropagate;
        };

        /**
         * Recursively broadcast an event to all children instances.
         *
         * @param {String|Object} event
         * @param {...*} additional arguments
         */

        Vue.prototype.$broadcast = function (event) {
            var isSource = typeof event === 'string';
            event = isSource ? event : event.name;
            // if no child has registered for this event,
            // then there's no need to broadcast.
            if (!this._eventsCount[event]) return;
            var children = this.$children;
            var args = toArray(arguments);
            if (isSource) {
                // use object event to indicate non-source emit
                // on children
                args[0] = { name: event, source: this };
            }
            for (var i = 0, l = children.length; i < l; i++) {
                var child = children[i];
                var shouldPropagate = child.$emit.apply(child, args);
                if (shouldPropagate) {
                    child.$broadcast.apply(child, args);
                }
            }
            return this;
        };

        /**
         * Recursively propagate an event up the parent chain.
         *
         * @param {String} event
         * @param {...*} additional arguments
         */

        Vue.prototype.$dispatch = function (event) {
            var shouldPropagate = this.$emit.apply(this, arguments);
            if (!shouldPropagate) return;
            var parent = this.$parent;
            var args = toArray(arguments);
            // use object event to indicate non-source emit
            // on parents
            args[0] = { name: event, source: this };
            while (parent) {
                shouldPropagate = parent.$emit.apply(parent, args);
                parent = shouldPropagate ? parent.$parent : null;
            }
            return this;
        };

        /**
         * Modify the listener counts on all parents.
         * This bookkeeping allows $broadcast to return early when
         * no child has listened to a certain event.
         *
         * @param {Vue} vm
         * @param {String} event
         * @param {Number} count
         */

        var hookRE = /^hook:/;
        function modifyListenerCount(vm, event, count) {
            var parent = vm.$parent;
            // hooks do not get broadcasted so no need
            // to do bookkeeping for them
            if (!parent || !count || hookRE.test(event)) return;
            while (parent) {
                parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
                parent = parent.$parent;
            }
        }
    }

    function lifecycleAPI (Vue) {
        /**
         * Set instance target element and kick off the compilation
         * process. The passed in `el` can be a selector string, an
         * existing Element, or a DocumentFragment (for block
         * instances).
         *
         * @param {Element|DocumentFragment|string} el
         * @public
         */

        Vue.prototype.$mount = function (el) {
            if (this._isCompiled) {
                'development' !== 'production' && warn('$mount() should be called only once.', this);
                return;
            }
            el = query(el);
            if (!el) {
                el = document.createElement('div');
            }
            this._compile(el);
            this._initDOMHooks();
            if (inDoc(this.$el)) {
                this._callHook('attached');
                ready.call(this);
            } else {
                this.$once('hook:attached', ready);
            }
            return this;
        };

        /**
         * Mark an instance as ready.
         */

        function ready() {
            this._isAttached = true;
            this._isReady = true;
            this._callHook('ready');
        }

        /**
         * Teardown the instance, simply delegate to the internal
         * _destroy.
         *
         * @param {Boolean} remove
         * @param {Boolean} deferCleanup
         */

        Vue.prototype.$destroy = function (remove, deferCleanup) {
            this._destroy(remove, deferCleanup);
        };

        /**
         * Partially compile a piece of DOM and return a
         * decompile function.
         *
         * @param {Element|DocumentFragment} el
         * @param {Vue} [host]
         * @param {Object} [scope]
         * @param {Fragment} [frag]
         * @return {Function}
         */

        Vue.prototype.$compile = function (el, host, scope, frag) {
            return compile(el, this.$options, true)(this, el, host, scope, frag);
        };
    }

    /**
     * The exposed Vue constructor.
     *
     * API conventions:
     * - public API methods/properties are prefixed with `$`
     * - internal methods/properties are prefixed with `_`
     * - non-prefixed properties are assumed to be proxied user
     *   data.
     *
     * @constructor
     * @param {Object} [options]
     * @public
     */

    function Vue(options) {
        this._init(options);
    }

    // install internals
    initMixin(Vue);
    stateMixin(Vue);
    eventsMixin(Vue);
    lifecycleMixin(Vue);
    miscMixin(Vue);

    // install instance APIs
    dataAPI(Vue);
    domAPI(Vue);
    eventsAPI(Vue);
    lifecycleAPI(Vue);

    var slot = {

        priority: SLOT,
        params: ['name'],

        bind: function bind() {
            // this was resolved during component transclusion
            var name = this.params.name || 'default';
            var content = this.vm._slotContents && this.vm._slotContents[name];
            if (!content || !content.hasChildNodes()) {
                this.fallback();
            } else {
                this.compile(content.cloneNode(true), this.vm._context, this.vm);
            }
        },

        compile: function compile(content, context, host) {
            if (content && context) {
                if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
                    // if the inserted slot has v-if
                    // inject fallback content as the v-else
                    var elseBlock = document.createElement('template');
                    elseBlock.setAttribute('v-else', '');
                    elseBlock.innerHTML = this.el.innerHTML;
                    // the else block should be compiled in child scope
                    elseBlock._context = this.vm;
                    content.appendChild(elseBlock);
                }
                var scope = host ? host._scope : this._scope;
                this.unlink = context.$compile(content, host, scope, this._frag);
            }
            if (content) {
                replace(this.el, content);
            } else {
                remove(this.el);
            }
        },

        fallback: function fallback() {
            this.compile(extractContent(this.el, true), this.vm);
        },

        unbind: function unbind() {
            if (this.unlink) {
                this.unlink();
            }
        }
    };

    var partial = {

        priority: PARTIAL,

        params: ['name'],

        // watch changes to name for dynamic partials
        paramWatchers: {
            name: function name(value) {
                vIf.remove.call(this);
                if (value) {
                    this.insert(value);
                }
            }
        },

        bind: function bind() {
            this.anchor = createAnchor('v-partial');
            replace(this.el, this.anchor);
            this.insert(this.params.name);
        },

        insert: function insert(id) {
            var partial = resolveAsset(this.vm.$options, 'partials', id, true);
            if (partial) {
                this.factory = new FragmentFactory(this.vm, partial);
                vIf.insert.call(this);
            }
        },

        unbind: function unbind() {
            if (this.frag) {
                this.frag.destroy();
            }
        }
    };

    var elementDirectives = {
        slot: slot,
        partial: partial
    };

    var convertArray = vFor._postProcess;

    /**
     * Limit filter for arrays
     *
     * @param {Number} n
     * @param {Number} offset (Decimal expected)
     */

    function limitBy(arr, n, offset) {
        offset = offset ? parseInt(offset, 10) : 0;
        n = toNumber(n);
        return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
    }

    /**
     * Filter filter for arrays
     *
     * @param {String} search
     * @param {String} [delimiter]
     * @param {String} ...dataKeys
     */

    function filterBy(arr, search, delimiter) {
        arr = convertArray(arr);
        if (search == null) {
            return arr;
        }
        if (typeof search === 'function') {
            return arr.filter(search);
        }
        // cast to lowercase string
        search = ('' + search).toLowerCase();
        // allow optional `in` delimiter
        // because why not
        var n = delimiter === 'in' ? 3 : 2;
        // extract and flatten keys
        var keys = Array.prototype.concat.apply([], toArray(arguments, n));
        var res = [];
        var item, key, val, j;
        for (var i = 0, l = arr.length; i < l; i++) {
            item = arr[i];
            val = item && item.$value || item;
            j = keys.length;
            if (j) {
                while (j--) {
                    key = keys[j];
                    if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
                        res.push(item);
                        break;
                    }
                }
            } else if (contains(item, search)) {
                res.push(item);
            }
        }
        return res;
    }

    /**
     * Filter filter for arrays
     *
     * @param {String|Array<String>|Function} ...sortKeys
     * @param {Number} [order]
     */

    function orderBy(arr) {
        var comparator = null;
        var sortKeys = undefined;
        arr = convertArray(arr);

        // determine order (last argument)
        var args = toArray(arguments, 1);
        var order = args[args.length - 1];
        if (typeof order === 'number') {
            order = order < 0 ? -1 : 1;
            args = args.length > 1 ? args.slice(0, -1) : args;
        } else {
            order = 1;
        }

        // determine sortKeys & comparator
        var firstArg = args[0];
        if (!firstArg) {
            return arr;
        } else if (typeof firstArg === 'function') {
            // custom comparator
            comparator = function (a, b) {
                return firstArg(a, b) * order;
            };
        } else {
            // string keys. flatten first
            sortKeys = Array.prototype.concat.apply([], args);
            comparator = function (a, b, i) {
                i = i || 0;
                return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
            };
        }

        function baseCompare(a, b, sortKeyIndex) {
            var sortKey = sortKeys[sortKeyIndex];
            if (sortKey) {
                if (sortKey !== '$key') {
                    if (isObject(a) && '$value' in a) a = a.$value;
                    if (isObject(b) && '$value' in b) b = b.$value;
                }
                a = isObject(a) ? getPath(a, sortKey) : a;
                b = isObject(b) ? getPath(b, sortKey) : b;
            }
            return a === b ? 0 : a > b ? order : -order;
        }

        // sort on a copy to avoid mutating original array
        return arr.slice().sort(comparator);
    }

    /**
     * String contain helper
     *
     * @param {*} val
     * @param {String} search
     */

    function contains(val, search) {
        var i;
        if (isPlainObject(val)) {
            var keys = Object.keys(val);
            i = keys.length;
            while (i--) {
                if (contains(val[keys[i]], search)) {
                    return true;
                }
            }
        } else if (isArray(val)) {
            i = val.length;
            while (i--) {
                if (contains(val[i], search)) {
                    return true;
                }
            }
        } else if (val != null) {
            return val.toString().toLowerCase().indexOf(search) > -1;
        }
    }

    var digitsRE = /(\d{3})(?=\d)/g;

    // asset collections must be a plain object.
    var filters = {

        orderBy: orderBy,
        filterBy: filterBy,
        limitBy: limitBy,

        /**
         * Stringify value.
         *
         * @param {Number} indent
         */

        json: {
            read: function read(value, indent) {
                return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
            },
            write: function write(value) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
        },

        /**
         * 'abc' => 'Abc'
         */

        capitalize: function capitalize(value) {
            if (!value && value !== 0) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },

        /**
         * 'abc' => 'ABC'
         */

        uppercase: function uppercase(value) {
            return value || value === 0 ? value.toString().toUpperCase() : '';
        },

        /**
         * 'AbC' => 'abc'
         */

        lowercase: function lowercase(value) {
            return value || value === 0 ? value.toString().toLowerCase() : '';
        },

        /**
         * 12345 => $12,345.00
         *
         * @param {String} sign
         * @param {Number} decimals Decimal places
         */

        currency: function currency(value, _currency, decimals) {
            value = parseFloat(value);
            if (!isFinite(value) || !value && value !== 0) return '';
            _currency = _currency != null ? _currency : '$';
            decimals = decimals != null ? decimals : 2;
            var stringified = Math.abs(value).toFixed(decimals);
            var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
            var i = _int.length % 3;
            var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
            var _float = decimals ? stringified.slice(-1 - decimals) : '';
            var sign = value < 0 ? '-' : '';
            return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
        },

        /**
         * 'item' => 'items'
         *
         * @params
         *  an array of strings corresponding to
         *  the single, double, triple ... forms of the word to
         *  be pluralized. When the number to be pluralized
         *  exceeds the length of the args, it will use the last
         *  entry in the array.
         *
         *  e.g. ['single', 'double', 'triple', 'multiple']
         */

        pluralize: function pluralize(value) {
            var args = toArray(arguments, 1);
            var length = args.length;
            if (length > 1) {
                var index = value % 10 - 1;
                return index in args ? args[index] : args[length - 1];
            } else {
                return args[0] + (value === 1 ? '' : 's');
            }
        },

        /**
         * Debounce a handler function.
         *
         * @param {Function} handler
         * @param {Number} delay = 300
         * @return {Function}
         */

        debounce: function debounce(handler, delay) {
            if (!handler) return;
            if (!delay) {
                delay = 300;
            }
            return _debounce(handler, delay);
        }
    };

    function installGlobalAPI (Vue) {
        /**
         * Vue and every constructor that extends Vue has an
         * associated options object, which can be accessed during
         * compilation steps as `this.constructor.options`.
         *
         * These can be seen as the default options of every
         * Vue instance.
         */

        Vue.options = {
            directives: directives,
            elementDirectives: elementDirectives,
            filters: filters,
            transitions: {},
            components: {},
            partials: {},
            replace: true
        };

        /**
         * Expose useful internals
         */

        Vue.util = util;
        Vue.config = config;
        Vue.set = set;
        Vue['delete'] = del;
        Vue.nextTick = nextTick;

        /**
         * The following are exposed for advanced usage / plugins
         */

        Vue.compiler = compiler;
        Vue.FragmentFactory = FragmentFactory;
        Vue.internalDirectives = internalDirectives;
        Vue.parsers = {
            path: path,
            text: text,
            template: template,
            directive: directive,
            expression: expression
        };

        /**
         * Each instance constructor, including Vue, has a unique
         * cid. This enables us to create wrapped "child
         * constructors" for prototypal inheritance and cache them.
         */

        Vue.cid = 0;
        var cid = 1;

        /**
         * Class inheritance
         *
         * @param {Object} extendOptions
         */

        Vue.extend = function (extendOptions) {
            extendOptions = extendOptions || {};
            var Super = this;
            var isFirstExtend = Super.cid === 0;
            if (isFirstExtend && extendOptions._Ctor) {
                return extendOptions._Ctor;
            }
            var name = extendOptions.name || Super.options.name;
            if ('development' !== 'production') {
                if (!/^[a-zA-Z][\w-]*$/.test(name)) {
                    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
                    name = null;
                }
            }
            var Sub = createClass(name || 'VueComponent');
            Sub.prototype = Object.create(Super.prototype);
            Sub.prototype.constructor = Sub;
            Sub.cid = cid++;
            Sub.options = mergeOptions(Super.options, extendOptions);
            Sub['super'] = Super;
            // allow further extension
            Sub.extend = Super.extend;
            // create asset registers, so extended classes
            // can have their private assets too.
            config._assetTypes.forEach(function (type) {
                Sub[type] = Super[type];
            });
            // enable recursive self-lookup
            if (name) {
                Sub.options.components[name] = Sub;
            }
            // cache constructor
            if (isFirstExtend) {
                extendOptions._Ctor = Sub;
            }
            return Sub;
        };

        /**
         * A function that returns a sub-class constructor with the
         * given name. This gives us much nicer output when
         * logging instances in the console.
         *
         * @param {String} name
         * @return {Function}
         */

        function createClass(name) {
            /* eslint-disable no-new-func */
            return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
            /* eslint-enable no-new-func */
        }

        /**
         * Plugin system
         *
         * @param {Object} plugin
         */

        Vue.use = function (plugin) {
            /* istanbul ignore if */
            if (plugin.installed) {
                return;
            }
            // additional parameters
            var args = toArray(arguments, 1);
            args.unshift(this);
            if (typeof plugin.install === 'function') {
                plugin.install.apply(plugin, args);
            } else {
                plugin.apply(null, args);
            }
            plugin.installed = true;
            return this;
        };

        /**
         * Apply a global mixin by merging it into the default
         * options.
         */

        Vue.mixin = function (mixin) {
            Vue.options = mergeOptions(Vue.options, mixin);
        };

        /**
         * Create asset registration methods with the following
         * signature:
         *
         * @param {String} id
         * @param {*} definition
         */

        config._assetTypes.forEach(function (type) {
            Vue[type] = function (id, definition) {
                if (!definition) {
                    return this.options[type + 's'][id];
                } else {
                    /* istanbul ignore if */
                    if ('development' !== 'production') {
                        if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
                            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
                        }
                    }
                    if (type === 'component' && isPlainObject(definition)) {
                        if (!definition.name) {
                            definition.name = id;
                        }
                        definition = Vue.extend(definition);
                    }
                    this.options[type + 's'][id] = definition;
                    return definition;
                }
            };
        });

        // expose internal transition API
        extend(Vue.transition, transition);
    }

    installGlobalAPI(Vue);

    Vue.version = '1.0.26';

    // devtools global hook
    /* istanbul ignore next */
    setTimeout(function () {
        if (config.devtools) { 
            if (devtools) {
                devtools.emit('init', Vue);
            } else if ('development' !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
                // console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
            }
        }
    }, 0);
    window.Vue = Vue;
    return Vue;
}));
//requirejs
/*
 RequireJS 2.2.0 Copyright jQuery Foundation and other contributors.
 Released under MIT license, http://github.com/requirejs/requirejs/LICENSE
*/
var requirejs,require,define;
(function(ga){function ka(b,c,d,g){return g||""}function K(b){return"[object Function]"===Q.call(b)}function L(b){return"[object Array]"===Q.call(b)}function y(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function X(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));--d);}}function x(b,c){return la.call(b,c)}function e(b,c){return x(b,c)&&b[c]}function D(b,c){for(var d in b)if(x(b,d)&&c(b[d],d))break}function Y(b,c,d,g){c&&D(c,function(c,e){if(d||!x(b,e))!g||"object"!==
typeof c||!c||L(c)||K(c)||c instanceof RegExp?b[e]=c:(b[e]||(b[e]={}),Y(b[e],c,d,g))});return b}function z(b,c){return function(){return c.apply(b,arguments)}}function ha(b){throw b;}function ia(b){if(!b)return b;var c=ga;y(b.split("."),function(b){c=c[b]});return c}function F(b,c,d,g){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=g;d&&(c.originalError=d);return c}function ma(b){function c(a,n,b){var h,k,f,c,d,l,g,r;n=n&&n.split("/");var q=p.map,m=q&&q["*"];
if(a){a=a.split("/");k=a.length-1;p.nodeIdCompat&&U.test(a[k])&&(a[k]=a[k].replace(U,""));"."===a[0].charAt(0)&&n&&(k=n.slice(0,n.length-1),a=k.concat(a));k=a;for(f=0;f<k.length;f++)c=k[f],"."===c?(k.splice(f,1),--f):".."===c&&0!==f&&(1!==f||".."!==k[2])&&".."!==k[f-1]&&0<f&&(k.splice(f-1,2),f-=2);a=a.join("/")}if(b&&q&&(n||m)){k=a.split("/");f=k.length;a:for(;0<f;--f){d=k.slice(0,f).join("/");if(n)for(c=n.length;0<c;--c)if(b=e(q,n.slice(0,c).join("/")))if(b=e(b,d)){h=b;l=f;break a}!g&&m&&e(m,d)&&
(g=e(m,d),r=f)}!h&&g&&(h=g,l=r);h&&(k.splice(0,l,h),a=k.join("/"))}return(h=e(p.pkgs,a))?h:a}function d(a){E&&y(document.getElementsByTagName("script"),function(n){if(n.getAttribute("data-requiremodule")===a&&n.getAttribute("data-requirecontext")===l.contextName)return n.parentNode.removeChild(n),!0})}function m(a){var n=e(p.paths,a);if(n&&L(n)&&1<n.length)return n.shift(),l.require.undef(a),l.makeRequire(null,{skipMap:!0})([a]),!0}function r(a){var n,b=a?a.indexOf("!"):-1;-1<b&&(n=a.substring(0,
b),a=a.substring(b+1,a.length));return[n,a]}function q(a,n,b,h){var k,f,d=null,g=n?n.name:null,p=a,q=!0,m="";a||(q=!1,a="_@r"+(Q+=1));a=r(a);d=a[0];a=a[1];d&&(d=c(d,g,h),f=e(v,d));a&&(d?m=f&&f.normalize?f.normalize(a,function(a){return c(a,g,h)}):-1===a.indexOf("!")?c(a,g,h):a:(m=c(a,g,h),a=r(m),d=a[0],m=a[1],b=!0,k=l.nameToUrl(m)));b=!d||f||b?"":"_unnormalized"+(T+=1);return{prefix:d,name:m,parentMap:n,unnormalized:!!b,url:k,originalName:p,isDefine:q,id:(d?d+"!"+m:m)+b}}function u(a){var b=a.id,
c=e(t,b);c||(c=t[b]=new l.Module(a));return c}function w(a,b,c){var h=a.id,k=e(t,h);if(!x(v,h)||k&&!k.defineEmitComplete)if(k=u(a),k.error&&"error"===b)c(k.error);else k.on(b,c);else"defined"===b&&c(v[h])}function A(a,b){var c=a.requireModules,h=!1;if(b)b(a);else if(y(c,function(b){if(b=e(t,b))b.error=a,b.events.error&&(h=!0,b.emit("error",a))}),!h)g.onError(a)}function B(){V.length&&(y(V,function(a){var b=a[0];"string"===typeof b&&(l.defQueueMap[b]=!0);G.push(a)}),V=[])}function C(a){delete t[a];
delete Z[a]}function J(a,b,c){var h=a.map.id;a.error?a.emit("error",a.error):(b[h]=!0,y(a.depMaps,function(h,f){var d=h.id,g=e(t,d);!g||a.depMatched[f]||c[d]||(e(b,d)?(a.defineDep(f,v[d]),a.check()):J(g,b,c))}),c[h]=!0)}function H(){var a,b,c=(a=1E3*p.waitSeconds)&&l.startTime+a<(new Date).getTime(),h=[],k=[],f=!1,g=!0;if(!aa){aa=!0;D(Z,function(a){var l=a.map,e=l.id;if(a.enabled&&(l.isDefine||k.push(a),!a.error))if(!a.inited&&c)m(e)?f=b=!0:(h.push(e),d(e));else if(!a.inited&&a.fetched&&l.isDefine&&
(f=!0,!l.prefix))return g=!1});if(c&&h.length)return a=F("timeout","Load timeout for modules: "+h,null,h),a.contextName=l.contextName,A(a);g&&y(k,function(a){J(a,{},{})});c&&!b||!f||!E&&!ja||ba||(ba=setTimeout(function(){ba=0;H()},50));aa=!1}}function I(a){x(v,a[0])||u(q(a[0],null,!0)).init(a[1],a[2])}function O(a){a=a.currentTarget||a.srcElement;var b=l.onScriptLoad;a.detachEvent&&!ca?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=l.onScriptError;a.detachEvent&&!ca||a.removeEventListener("error",
b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function P(){var a;for(B();G.length;){a=G.shift();if(null===a[0])return A(F("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));I(a)}l.defQueueMap={}}var aa,da,l,R,ba,p={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},t={},Z={},ea={},G=[],v={},W={},fa={},Q=1,T=1;R={require:function(a){return a.require?a.require:a.require=l.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?
v[a.map.id]=a.exports:a.exports=v[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return e(p.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};da=function(a){this.events=e(ea,a.id)||{};this.map=a;this.shim=e(p.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};da.prototype={init:function(a,b,c,h){h=h||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&
(c=z(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=h.ignore;h.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,--this.depCount,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;l.startTime=(new Date).getTime();var a=this.map;if(this.shim)l.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],z(this,function(){return a.prefix?this.callPlugin():
this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;W[a]||(W[a]=!0,l.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var h=this.exports,k=this.factory;if(!this.inited)x(l.defQueueMap,c)||this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(K(k)){if(this.events.error&&this.map.isDefine||g.onError!==
ha)try{h=l.execCb(c,k,b,h)}catch(d){a=d}else h=l.execCb(c,k,b,h);this.map.isDefine&&void 0===h&&((b=this.module)?h=b.exports:this.usingExports&&(h=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",A(this.error=a)}else h=k;this.exports=h;if(this.map.isDefine&&!this.ignore&&(v[c]=h,g.onResourceLoad)){var f=[];y(this.depMaps,function(a){f.push(a.normalizedMap||a)});g.onResourceLoad(l,this.map,f)}C(c);
this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}},callPlugin:function(){var a=this.map,b=a.id,d=q(a.prefix);this.depMaps.push(d);w(d,"defined",z(this,function(h){var k,f,d=e(fa,this.map.id),M=this.map.name,r=this.map.parentMap?this.map.parentMap.name:null,m=l.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(h.normalize&&(M=h.normalize(M,function(a){return c(a,r,!0)})||
""),f=q(a.prefix+"!"+M,this.map.parentMap),w(f,"defined",z(this,function(a){this.map.normalizedMap=f;this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),h=e(t,f.id)){this.depMaps.push(f);if(this.events.error)h.on("error",z(this,function(a){this.emit("error",a)}));h.enable()}}else d?(this.map.url=l.nameToUrl(d),this.load()):(k=z(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),k.error=z(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];D(t,function(a){0===
a.map.id.indexOf(b+"_unnormalized")&&C(a.map.id)});A(a)}),k.fromText=z(this,function(h,c){var d=a.name,f=q(d),M=S;c&&(h=c);M&&(S=!1);u(f);x(p.config,b)&&(p.config[d]=p.config[b]);try{g.exec(h)}catch(e){return A(F("fromtexteval","fromText eval for "+b+" failed: "+e,e,[b]))}M&&(S=!0);this.depMaps.push(f);l.completeLoad(d);m([d],k)}),h.load(a.name,m,k,p))}));l.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){Z[this.map.id]=this;this.enabling=this.enabled=!0;y(this.depMaps,z(this,function(a,
b){var c,h;if("string"===typeof a){a=q(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=e(R,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;w(a,"defined",z(this,function(a){this.undefed||(this.defineDep(b,a),this.check())}));this.errback?w(a,"error",z(this,this.errback)):this.events.error&&w(a,"error",z(this,function(a){this.emit("error",a)}))}c=a.id;h=t[c];x(R,c)||!h||h.enabled||l.enable(a,this)}));D(this.pluginMaps,z(this,function(a){var b=e(t,a.id);
b&&!b.enabled&&l.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){y(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};l={config:p,contextName:b,registry:t,defined:v,urlFetched:W,defQueue:G,defQueueMap:{},Module:da,makeModuleMap:q,nextTick:g.nextTick,onError:A,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");if("string"===typeof a.urlArgs){var b=
a.urlArgs;a.urlArgs=function(a,c){return(-1===c.indexOf("?")?"?":"&")+b}}var c=p.shim,h={paths:!0,bundles:!0,config:!0,map:!0};D(a,function(a,b){h[b]?(p[b]||(p[b]={}),Y(p[b],a,!0,!0)):p[b]=a});a.bundles&&D(a.bundles,function(a,b){y(a,function(a){a!==b&&(fa[a]=b)})});a.shim&&(D(a.shim,function(a,b){L(a)&&(a={deps:a});!a.exports&&!a.init||a.exportsFn||(a.exportsFn=l.makeShimExports(a));c[b]=a}),p.shim=c);a.packages&&y(a.packages,function(a){var b;a="string"===typeof a?{name:a}:a;b=a.name;a.location&&
(p.paths[b]=a.location);p.pkgs[b]=a.name+"/"+(a.main||"main").replace(na,"").replace(U,"")});D(t,function(a,b){a.inited||a.map.unnormalized||(a.map=q(b,null,!0))});(a.deps||a.callback)&&l.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ga,arguments));return b||a.exports&&ia(a.exports)}},makeRequire:function(a,n){function m(c,d,f){var e,r;n.enableBuildCallback&&d&&K(d)&&(d.__requireJsBuild=!0);if("string"===typeof c){if(K(d))return A(F("requireargs",
"Invalid require call"),f);if(a&&x(R,c))return R[c](t[a.id]);if(g.get)return g.get(l,c,a,m);e=q(c,a,!1,!0);e=e.id;return x(v,e)?v[e]:A(F("notloaded",'Module name "'+e+'" has not been loaded yet for context: '+b+(a?"":". Use require([])")))}P();l.nextTick(function(){P();r=u(q(null,a));r.skipMap=n.skipMap;r.init(c,d,f,{enabled:!0});H()});return m}n=n||{};Y(m,{isBrowser:E,toUrl:function(b){var d,f=b.lastIndexOf("."),g=b.split("/")[0];-1!==f&&("."!==g&&".."!==g||1<f)&&(d=b.substring(f,b.length),b=b.substring(0,
f));return l.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return x(v,q(b,a,!1,!0).id)},specified:function(b){b=q(b,a,!1,!0).id;return x(v,b)||x(t,b)}});a||(m.undef=function(b){B();var c=q(b,a,!0),f=e(t,b);f.undefed=!0;d(b);delete v[b];delete W[c.url];delete ea[b];X(G,function(a,c){a[0]===b&&G.splice(c,1)});delete l.defQueueMap[b];f&&(f.events.defined&&(ea[b]=f.events),C(b))});return m},enable:function(a){e(t,a.id)&&u(a).enable()},completeLoad:function(a){var b,c,d=e(p.shim,a)||{},g=d.exports;
for(B();G.length;){c=G.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);I(c)}l.defQueueMap={};c=e(t,a);if(!b&&!x(v,a)&&c&&!c.inited)if(!p.enforceDefine||g&&ia(g))I([a,d.deps||[],d.exportsFn]);else return m(a)?void 0:A(F("nodefine","No define call for "+a,null,[a]));H()},nameToUrl:function(a,b,c){var d,k,f,m;(d=e(p.pkgs,a))&&(a=d);if(d=e(fa,a))return l.nameToUrl(d,b,c);if(g.jsExtRegExp.test(a))d=a+(b||"");else{d=p.paths;k=a.split("/");for(f=k.length;0<f;--f)if(m=k.slice(0,f).join("/"),
m=e(d,m)){L(m)&&(m=m[0]);k.splice(0,f,m);break}d=k.join("/");d+=b||(/^data\:|^blob\:|\?/.test(d)||c?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":p.baseUrl)+d}return p.urlArgs&&!/^blob\:/.test(d)?d+p.urlArgs(a,d):d},load:function(a,b){g.load(l,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||oa.test((a.currentTarget||a.srcElement).readyState))N=null,a=O(a),l.completeLoad(a.id)},onScriptError:function(a){var b=O(a);if(!m(b.id)){var c=[];
D(t,function(a,d){0!==d.indexOf("_@r")&&y(a.depMaps,function(a){if(a.id===b.id)return c.push(d),!0})});return A(F("scripterror",'Script error for "'+b.id+(c.length?'", needed by: '+c.join(", "):'"'),a,[b.id]))}}};l.require=l.makeRequire();return l}function pa(){if(N&&"interactive"===N.readyState)return N;X(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return N=b});return N}var g,B,C,H,O,I,N,P,u,T,qa=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ra=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
U=/\.js$/,na=/^\.\//;B=Object.prototype;var Q=B.toString,la=B.hasOwnProperty,E=!("undefined"===typeof window||"undefined"===typeof navigator||!window.document),ja=!E&&"undefined"!==typeof importScripts,oa=E&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,ca="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),J={},w={},V=[],S=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(K(requirejs))return;w=requirejs;requirejs=void 0}"undefined"===typeof require||
K(require)||(w=require,require=void 0);g=requirejs=function(b,c,d,m){var r,q="_";L(b)||"string"===typeof b||(r=b,L(c)?(b=c,c=d,d=m):b=[]);r&&r.context&&(q=r.context);(m=e(J,q))||(m=J[q]=g.s.newContext(q));r&&m.configure(r);return m.require(b,c,d)};g.config=function(b){return g(b)};g.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=g);g.version="2.2.0";g.jsExtRegExp=/^\/|:|\?|\.js$/;g.isBrowser=E;B=g.s={contexts:J,newContext:ma};g({});y(["toUrl",
"undef","defined","specified"],function(b){g[b]=function(){var c=J._;return c.require[b].apply(c,arguments)}});E&&(C=B.head=document.getElementsByTagName("head")[0],H=document.getElementsByTagName("base")[0])&&(C=B.head=H.parentNode);g.onError=ha;g.createNode=function(b,c,d){c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};g.load=function(b,c,d){var m=b&&b.config||
{},e;if(E){e=g.createNode(m,c,d);e.setAttribute("data-requirecontext",b.contextName);e.setAttribute("data-requiremodule",c);!e.attachEvent||e.attachEvent.toString&&0>e.attachEvent.toString().indexOf("[native code")||ca?(e.addEventListener("load",b.onScriptLoad,!1),e.addEventListener("error",b.onScriptError,!1)):(S=!0,e.attachEvent("onreadystatechange",b.onScriptLoad));e.src=d;if(m.onNodeCreated)m.onNodeCreated(e,m,c,d);P=e;H?C.insertBefore(e,H):C.appendChild(e);P=null;return e}if(ja)try{setTimeout(function(){},
0),importScripts(d),b.completeLoad(c)}catch(q){b.onError(F("importscripts","importScripts failed for "+c+" at "+d,q,[c]))}};E&&!w.skipDataMain&&X(document.getElementsByTagName("script"),function(b){C||(C=b.parentNode);if(O=b.getAttribute("data-main"))return u=O,w.baseUrl||-1!==u.indexOf("!")||(I=u.split("/"),u=I.pop(),T=I.length?I.join("/")+"/":"./",w.baseUrl=T),u=u.replace(U,""),g.jsExtRegExp.test(u)&&(u=O),w.deps=w.deps?w.deps.concat(u):[u],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&
(d=c,c=b,b=null);L(c)||(d=c,c=null);!c&&K(d)&&(c=[],d.length&&(d.toString().replace(qa,ka).replace(ra,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));S&&(e=P||pa())&&(b||(b=e.getAttribute("data-requiremodule")),g=J[e.getAttribute("data-requirecontext")]);g?(g.defQueue.push([b,c,d]),g.defQueueMap[b]=!0):V.push([b,c,d])};define.amd={jQuery:!0};g.exec=function(b){return eval(b)};g(w)}})(this);
//引入echarts图表插件 
require(['/plugIn/echarts.min.js'],function(echarts){ 
    window.echarts = echarts; 
});
  


require(['common_main'], function(){}); 
/*
version 3.2.3
 */
!function(t,e){"function"==typeof define&&define.amd?define('/plugIn/echarts.min.js',[],e):"object"==typeof module&&module.exports?module.exports=e():t.echarts=e()}(this,function(){var t,e;!function(){function i(t,e){if(!e)return t;if(0===t.indexOf(".")){var i=e.split("/"),n=t.split("/"),r=i.length-1,a=n.length,o=0,s=0;t:for(var l=0;a>l;l++)switch(n[l]){case"..":if(!(r>o))break t;o++,s++;break;case".":s++;break;default:break t}return i.length=r-o,n=n.slice(s),i.concat(n).join("/")}return t}function n(t){function e(e,o){if("string"==typeof e){var s=n[e];return s||(s=a(i(e,t)),n[e]=s),s}e instanceof Array&&(o=o||function(){},o.apply(this,r(e,o,t)))}var n={};return e}function r(e,n,r){for(var s=[],l=o[r],c=0,u=Math.min(e.length,n.length);u>c;c++){var h,f=i(e[c],r);switch(f){case"require":h=l&&l.require||t;break;case"exports":h=l.exports;break;case"module":h=l;break;default:h=a(f)}s.push(h)}return s}function a(t){var e=o[t];if(!e)throw new Error("No "+t);if(!e.defined){var i=e.factory,n=i.apply(this,r(e.deps||[],i,t));"undefined"!=typeof n&&(e.exports=n),e.defined=1}return e.exports}var o={};e=function(t,e,i){o[t]={id:t,deps:e,factory:i,defined:0,exports:{},require:n(t)}},t=n("")}();var i="__dirty",n="buildPath",r="moveTo",a="transform",o="../../model/Component",s="ecModel",l="parent",c="getLocalTransform",u="getShallow",h="stroke",f="lineWidth",d="applyTransform",p="zrender/core/BoundingRect",m="mainType",v="radius",g="../../util/model",y="getLineStyle",x="rotation",_="undefined",b="../../util/number",w="dataToCoord",M="parsePercent",S="setHoverStyle",T="emphasis",C="getItemVisual",A="eachItemGraphicEl",L="getItemGraphicEl",P="updateProps",k="getItemLayout",z="normal",D="../../echarts",I="../../util/graphic",R="dimensions",O="retrieve",E="ordinal",B="getDataExtent",N="componentIndex",G="getAxis",V="category",F="getName",H="getRawValue",q="getItemModel",W="mergeOption",Z="initData",U="option",X="addCommas",Y="../../util/format",j="../../data/List",$="dataToPoint",Q="concat",J="createElement",K="getExtent",te="getTicks",ee="contain",ie="opacity",ne="position",re="center",ae="middle",oe="getBoundingRect",se="getTextColor",le="getFont",ce="textAlign",ue="textStyle",he="coordinateSystem",fe="removeAll",de="inherits",pe="indexOf",me="filter",ve="number",ge="function",ye="isArray",xe="replace",_e="zlevel",be="setStyle",we="traverse",Me="getDataParams",Se="seriesIndex",Te="dataIndex",Ce="target",Ae="mousemove",Le="mouseout",Pe="mouseover",ke="silent",ze="splice",De="series",Ie="trigger",Re="length",Oe="defaults",Ee="dispatchAction",Be="extend",Ne="remove",Ge="isObject",Ve="updateLayout",Fe="eachSeries",He="update",qe="create",We="height",Ze="bottom",Ue="ignore",Xe="eachComponent",Ye="storage",je="canvasSupported",$e="getHeight",Qe="getWidth",Je="getModel",Ke="animation",ti="resize",ei="string",ii="prototype",ni="toLowerCase",ri="zrender/core/vector",ai="zrender/core/matrix",oi="zrender/core/env",si="getData",li="zrender/core/util",ci="require";e("echarts/chart/bar",[ci,li,"../coord/cartesian/Grid","./bar/BarSeries","./bar/BarView","../layout/barGrid","../echarts","../component/grid"],function(t){var e=t(li);t("../coord/cartesian/Grid"),t("./bar/BarSeries"),t("./bar/BarView");var i=t("../layout/barGrid"),n=t("../echarts");n.registerLayout(e.curry(i,"bar")),n.registerVisual(function(t){t.eachSeriesByType("bar",function(t){var e=t[si]();e.setVisual("legendSymbol","roundRect")})}),t("../component/grid")}),e("echarts/chart/map",[ci,"../echarts","./map/MapSeries","./map/MapView","../action/geoRoam","../coord/geo/geoCreator","./map/mapSymbolLayout","./map/mapVisual","./map/mapDataStatistic","./map/backwardCompat","../action/createDataSelectAction"],function(t){var e=t("../echarts"),i=e.PRIORITY;t("./map/MapSeries"),t("./map/MapView"),t("../action/geoRoam"),t("../coord/geo/geoCreator"),e.registerLayout(t("./map/mapSymbolLayout")),e.registerVisual(t("./map/mapVisual")),e.registerProcessor(i.PROCESSOR.STATISTIC,t("./map/mapDataStatistic")),e.registerPreprocessor(t("./map/backwardCompat")),t("../action/createDataSelectAction")("map",[{type:"mapToggleSelect",event:"mapselectchanged",method:"toggleSelected"},{type:"mapSelect",event:"mapselected",method:"select"},{type:"mapUnSelect",event:"mapunselected",method:"unSelect"}])}),e("echarts/chart/pie",[ci,li,"../echarts","./pie/PieSeries","./pie/PieView","../action/createDataSelectAction","../visual/dataColor","./pie/pieLayout","../processor/dataFilter"],function(t){var e=t(li),i=t("../echarts");t("./pie/PieSeries"),t("./pie/PieView"),t("../action/createDataSelectAction")("pie",[{type:"pieToggleSelect",event:"pieselectchanged",method:"toggleSelected"},{type:"pieSelect",event:"pieselected",method:"select"},{type:"pieUnSelect",event:"pieunselected",method:"unSelect"}]),i.registerVisual(e.curry(t("../visual/dataColor"),"pie")),i.registerLayout(e.curry(t("./pie/pieLayout"),"pie")),i.registerProcessor(e.curry(t("../processor/dataFilter"),"pie"))}),e("echarts/echarts",[ci,oi,"./model/Global","./ExtensionAPI","./CoordinateSystem","./model/OptionManager","./model/Component","./model/Series","./view/Component","./view/Chart","./util/graphic","zrender",li,"zrender/tool/color","zrender/mixin/Eventful","zrender/core/timsort","./visual/seriesColor","./preprocessor/backwardCompat","./loading/default","./data/List","./model/Model","./util/number","./util/format",ai,ri],function(t){function e(t){return function(e,i,n){e=e&&e[ni](),P[ii][t].call(this,e,i,n)}}function i(){P.call(this)}function n(t,e,n){function r(t,e){return t.prio-e.prio}n=n||{},typeof e===ei&&(e=$[e]),this.id,this.group,this._dom=t,this._zr=C.init(t,{renderer:n.renderer||"canvas",devicePixelRatio:n.devicePixelRatio}),this._theme=A.clone(e),this._chartsViews=[],this._chartsMap={},this._componentsViews=[],this._componentsMap={},this._api=new y(this),this._coordSysMgr=new x,P.call(this),this._messageCenter=new i,this._initEvents(),this[ti]=A.bind(this[ti],this),this._pendingActions=[],k(j,r),k(X,r),this._zr[Ke].on("frame",this._onframe,this)}function r(t,e){var i=this._model;i&&i[Xe]({mainType:"series",query:e},function(n){var r=this._chartsMap[n.__viewId];r&&r.__alive&&r[t](n,i,this._api,e)},this)}function a(t,e,i){var n=this._api;z(this._componentsViews,function(r){var a=r.__model;r[t](a,e,n,i),p(a,r)},this),e[Fe](function(r){var a=this._chartsMap[r.__viewId];a[t](r,e,n,i),p(r,a),d(r,a)},this),f(this._zr,e)}function o(t,e){for(var i="component"===t,n=i?this._componentsViews:this._chartsViews,r=i?this._componentsMap:this._chartsMap,a=this._zr,o=0;o<n[Re];o++)n[o].__alive=!1;e[i?Xe:Fe](function(t,o){if(i){if(t===De)return}else o=t;var s=o.id+"_"+o.type,l=r[s];if(!l){var c=b.parseClassType(o.type),u=i?M.getClass(c.main,c.sub):S.getClass(c.sub);if(!u)return;l=new u,l.init(e,this._api),r[s]=l,n.push(l),a.add(l.group)}o.__viewId=s,l.__alive=!0,l.__id=s,l.__model=o},this);for(var o=0;o<n[Re];){var s=n[o];s.__alive?o++:(a[Ne](s.group),s.dispose(e,this._api),n[ze](o,1),delete r[s.__id])}}function s(t,e){z(X,function(i){i.func(t,e)})}function l(t){var e={};t[Fe](function(t){var i=t.get("stack"),n=t[si]();if(i&&"list"===n.type){var r=e[i];r&&(n.stackedOn=r),e[i]=n}})}function c(t,e){var i=this._api;z(j,function(n){n.isLayout&&n.func(t,i,e)})}function u(t,e){var i=this._api;t.clearColorPalette(),t[Fe](function(t){t.clearColorPalette()}),z(j,function(n){n.func(t,i,e)})}function h(t,e){var i=this._api;z(this._componentsViews,function(n){var r=n.__model;n.render(r,t,i,e),p(r,n)},this),z(this._chartsViews,function(t){t.__alive=!1},this),t[Fe](function(n){var r=this._chartsMap[n.__viewId];r.__alive=!0,r.render(n,t,i,e),r.group[ke]=!!n.get(ke),p(n,r),d(n,r)},this),f(this._zr,t),z(this._chartsViews,function(e){e.__alive||e[Ne](t,i)},this)}function f(t,e){var i=t[Ye],n=0;i[we](function(t){t.isGroup||n++}),n>e.get("hoverLayerThreshold")&&!v.node&&i[we](function(t){t.isGroup||(t.useHoverLayer=!0)})}function d(t,e){var i=0;e.group[we](function(t){"group"===t.type||t[Ue]||i++});var n=+t.get("progressive"),r=i>t.get("progressiveThreshold")&&n&&!v.node;r&&e.group[we](function(t){t.isGroup||(t.progressive=r?Math.floor(i++/n):-1,r&&t.stopAnimation(!0))});var a=t.get("blendMode")||null;e.group[we](function(t){t.isGroup||t[be]("blend",a)})}function p(t,e){var i=t.get("z"),n=t.get(_e);e.group[we](function(t){"group"!==t.type&&(null!=i&&(t.z=i),null!=n&&(t[_e]=n))})}function m(t){function e(t,e){for(var i=0;i<t[Re];i++){var n=t[i];n[a]=e}}var i=0,n=1,r=2,a="__connectUpdateStatus";A.each(U,function(o,s){t._messageCenter.on(s,function(o){if(K[t.group]&&t[a]!==i){var s=t.makeActionFromEvent(o),l=[];for(var c in J){var u=J[c];u!==t&&u.group===t.group&&l.push(u)}e(l,i),z(l,function(t){t[a]!==n&&t[Ee](s)}),e(l,r)}})})}var v=t(oi),g=t("./model/Global"),y=t("./ExtensionAPI"),x=t("./CoordinateSystem"),_=t("./model/OptionManager"),b=t("./model/Component"),w=t("./model/Series"),M=t("./view/Component"),S=t("./view/Chart"),T=t("./util/graphic"),C=t("zrender"),A=t(li),L=t("zrender/tool/color"),P=t("zrender/mixin/Eventful"),k=t("zrender/core/timsort"),z=A.each,D=1e3,I=5e3,R=1e3,O=2e3,E=3e3,B=4e3,N=5e3,G="__flag_in_main_process",V="_hasGradientOrPatternBg",F="_optionUpdated";i[ii].on=e("on"),i[ii].off=e("off"),i[ii].one=e("one"),A.mixin(i,P);var H=n[ii];H._onframe=function(){this[F]&&(this[G]=!0,q.prepareAndUpdate.call(this),this[G]=!1,this[F]=!1)},H.getDom=function(){return this._dom},H.getZr=function(){return this._zr},H.setOption=function(t,e,i){if(this[G]=!0,!this._model||e){var n=new _(this._api),r=this._theme,a=this._model=new g(null,null,r,n);a.init(null,null,r,n)}this._model.setOption(t,Y),i?this[F]=!0:(q.prepareAndUpdate.call(this),this._zr.refreshImmediately(),this[F]=!1),this[G]=!1,this._flushPendingActions()},H.setTheme=function(){console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0")},H[Je]=function(){return this._model},H.getOption=function(){return this._model&&this._model.getOption()},H[Qe]=function(){return this._zr[Qe]()},H[$e]=function(){return this._zr[$e]()},H.getRenderedCanvas=function(t){if(v[je]){t=t||{},t.pixelRatio=t.pixelRatio||1,t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor");var e=this._zr,i=e[Ye].getDisplayList();return A.each(i,function(t){t.stopAnimation(!0)}),e.painter.getRenderedCanvas(t)}},H.getDataURL=function(t){t=t||{};var e=t.excludeComponents,i=this._model,n=[],r=this;z(e,function(t){i[Xe]({mainType:t},function(t){var e=r._componentsMap[t.__viewId];e.group[Ue]||(n.push(e),e.group[Ue]=!0)})});var a=this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return z(n,function(t){t.group[Ue]=!1}),a},H.getConnectedDataURL=function(t){if(v[je]){var e=this.group,i=Math.min,n=Math.max,r=1/0;if(K[e]){var a=r,o=r,s=-r,l=-r,c=[],u=t&&t.pixelRatio||1;for(var h in J){var f=J[h];if(f.group===e){var d=f.getRenderedCanvas(A.clone(t)),p=f.getDom().getBoundingClientRect();a=i(p.left,a),o=i(p.top,o),s=n(p.right,s),l=n(p[Ze],l),c.push({dom:d,left:p.left,top:p.top})}}a*=u,o*=u,s*=u,l*=u;var m=s-a,g=l-o,y=A.createCanvas();y.width=m,y[We]=g;var x=C.init(y);return z(c,function(t){var e=new T.Image({style:{x:t.left*u-a,y:t.top*u-o,image:t.dom}});x.add(e)}),x.refreshImmediately(),y.toDataURL("image/"+(t&&t.type||"png"))}return this.getDataURL(t)}};var q={update:function(t){var e=this._model,i=this._api,n=this._coordSysMgr,r=this._zr;if(e){e.restoreData(),n[qe](this._model,this._api),s.call(this,e,i),l.call(this,e),n[He](e,i),u.call(this,e,t),h.call(this,e,t);var a=e.get("backgroundColor")||"transparent",o=r.painter;if(o.isSingleCanvas&&o.isSingleCanvas())r.configLayer(0,{clearColor:a});else{if(!v[je]){var c=L.parse(a);a=L.stringify(c,"rgb"),0===c[3]&&(a="transparent")}a.colorStops||a.image?(r.configLayer(0,{clearColor:a}),this[V]=!0,this._dom.style.background="transparent"):(this[V]&&r.configLayer(0,{clearColor:null}),this[V]=!1,this._dom.style.background=a)}}},updateView:function(t){var e=this._model;e&&(e[Fe](function(t){t[si]().clearAllVisual()}),u.call(this,e,t),a.call(this,"updateView",e,t))},updateVisual:function(t){var e=this._model;e&&(e[Fe](function(t){t[si]().clearAllVisual()}),u.call(this,e,t),a.call(this,"updateVisual",e,t))},updateLayout:function(t){var e=this._model;e&&(c.call(this,e,t),a.call(this,Ve,e,t))},highlight:function(t){r.call(this,"highlight",t)},downplay:function(t){r.call(this,"downplay",t)},prepareAndUpdate:function(t){var e=this._model;o.call(this,"component",e),o.call(this,"chart",e),q[He].call(this,t)}};H[ti]=function(){this[G]=!0,this._zr[ti]();var t=this._model&&this._model.resetOption("media");q[t?"prepareAndUpdate":He].call(this),this._loadingFX&&this._loadingFX[ti](),this[G]=!1,this._flushPendingActions()},H.showLoading=function(t,e){if(A[Ge](t)&&(e=t,t=""),t=t||"default",this.hideLoading(),Q[t]){var i=Q[t](this._api,e),n=this._zr;this._loadingFX=i,n.add(i)}},H.hideLoading=function(){this._loadingFX&&this._zr[Ne](this._loadingFX),this._loadingFX=null},H.makeActionFromEvent=function(t){var e=A[Be]({},t);return e.type=U[t.type],e},H[Ee]=function(t,e){var i=Z[t.type];if(i){var n=i.actionInfo,r=n[He]||He;if(this[G])return void this._pendingActions.push(t);this[G]=!0;var a=[t],o=!1;t.batch&&(o=!0,a=A.map(t.batch,function(e){return e=A[Oe](A[Be]({},e),t),e.batch=null,e}));for(var s,l=[],c="highlight"===t.type||"downplay"===t.type,u=0;u<a[Re];u++){var h=a[u];s=i.action(h,this._model),s=s||A[Be]({},h),s.type=n.event||s.type,l.push(s),c&&q[r].call(this,h)}"none"===r||c||(this[F]?(q.prepareAndUpdate.call(this,t),this[F]=!1):q[r].call(this,t)),s=o?{type:n.event||t.type,batch:l}:l[0],this[G]=!1,!e&&this._messageCenter[Ie](s.type,s),this._flushPendingActions()}},H._flushPendingActions=function(){for(var t=this._pendingActions;t[Re];){var e=t.shift();this[Ee](e)}},H.on=e("on"),H.off=e("off"),H.one=e("one");var W=["click","dblclick",Pe,Le,Ae,"mousedown","mouseup","globalout"];H._initEvents=function(){z(W,function(t){this._zr.on(t,function(e){var i=this[Je](),n=e[Ce];if(n&&null!=n[Te]){var r=n.dataModel||i.getSeriesByIndex(n[Se]),a=r&&r[Me](n[Te],n.dataType)||{};a.event=e,a.type=t,this[Ie](t,a)}else n&&n.eventData&&this[Ie](t,n.eventData)},this)},this),z(U,function(t,e){this._messageCenter.on(e,function(t){this[Ie](e,t)},this)},this)},H.isDisposed=function(){return this._disposed},H.clear=function(){this.setOption({series:[]},!0)},H.dispose=function(){if(!this._disposed){this._disposed=!0;var t=this._api,e=this._model;z(this._componentsViews,function(i){i.dispose(e,t)}),z(this._chartsViews,function(i){i.dispose(e,t)}),this._zr.dispose(),delete J[this.id]}},A.mixin(n,P);var Z=[],U={},X=[],Y=[],j=[],$={},Q={},J={},K={},te=new Date-0,ee=new Date-0,ie="_echarts_instance_",ne={version:"3.2.3",dependencies:{zrender:"3.1.3"}};ne.init=function(t,e,i){var r=new n(t,e,i);return r.id="ec_"+te++,J[r.id]=r,t.setAttribute&&t.setAttribute(ie,r.id),m(r),r},ne.connect=function(t){if(A[ye](t)){var e=t;t=null,A.each(e,function(e){null!=e.group&&(t=e.group)}),t=t||"g_"+ee++,A.each(e,function(e){e.group=t})}return K[t]=!0,t},ne.disConnect=function(t){K[t]=!1},ne.dispose=function(t){A.isDom(t)?t=ne.getInstanceByDom(t):typeof t===ei&&(t=J[t]),t instanceof n&&!t.isDisposed()&&t.dispose()},ne.getInstanceByDom=function(t){var e=t.getAttribute(ie);return J[e]},ne.getInstanceById=function(t){return J[t]},ne.registerTheme=function(t,e){$[t]=e},ne.registerPreprocessor=function(t){Y.push(t)},ne.registerProcessor=function(t,e){typeof t===ge&&(e=t,t=D),X.push({prio:t,func:e})},ne.registerAction=function(t,e,i){typeof e===ge&&(i=e,e="");var n=A[Ge](t)?t.type:[t,t={event:e}][0];t.event=(t.event||n)[ni](),e=t.event,Z[n]||(Z[n]={action:i,actionInfo:t}),U[e]=n},ne.registerCoordinateSystem=function(t,e){x.register(t,e)},ne.registerLayout=function(t,e){typeof t===ge&&(e=t,t=R),j.push({prio:t,func:e,isLayout:!0})},ne.registerVisual=function(t,e){typeof t===ge&&(e=t,t=E),j.push({prio:t,func:e})},ne.registerLoading=function(t,e){Q[t]=e};var re=b.parseClassType;return ne.extendComponentModel=function(t,e){var i=b;if(e){var n=re(e);i=b.getClass(n.main,n.sub,!0)}return i[Be](t)},ne.extendComponentView=function(t,e){var i=M;if(e){var n=re(e);i=M.getClass(n.main,n.sub,!0)}return i[Be](t)},ne.extendSeriesModel=function(t,e){var i=w;if(e){e="series."+e[xe]("series.","");var n=re(e);i=w.getClass(n.main,n.sub,!0)}return i[Be](t)},ne.extendChartView=function(t,e){var i=S;if(e){e[xe]("series.","");var n=re(e);i=S.getClass(n.main,!0)}return i[Be](t)},ne.setCanvasCreator=function(t){A.createCanvas=t},ne.registerVisual(O,t("./visual/seriesColor")),ne.registerPreprocessor(t("./preprocessor/backwardCompat")),ne.registerLoading("default",t("./loading/default")),ne.registerAction({type:"highlight",event:"highlight",update:"highlight"},A.noop),ne.registerAction({type:"downplay",event:"downplay",update:"downplay"},A.noop),ne.List=t("./data/List"),ne.Model=t("./model/Model"),ne.graphic=t("./util/graphic"),ne[ve]=t("./util/number"),ne.format=t("./util/format"),ne.matrix=t(ai),ne.vector=t(ri),ne.color=t("zrender/tool/color"),ne.util={},z(["map","each",me,pe,de,"reduce",me,"bind","curry",ye,"isString",Ge,"isFunction",Be,Oe],function(t){ne.util[t]=A[t]}),ne.PRIORITY={PROCESSOR:{FILTER:D,STATISTIC:I},VISUAL:{LAYOUT:R,GLOBAL:O,CHART:E,COMPONENT:B,BRUSH:N}},ne}),e("echarts/component/grid",[ci,"../util/graphic",li,"../echarts","../coord/cartesian/Grid","./axis"],function(t){var e=t("../util/graphic"),i=t(li),n=t("../echarts");t("../coord/cartesian/Grid"),t("./axis"),n.extendComponentView({type:"grid",render:function(t){this.group[fe](),t.get("show")&&this.group.add(new e.Rect({shape:t[he].getRect(),style:i[Oe]({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0}))}}),n.registerPreprocessor(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={})})}),e("echarts/component/polar",[ci,"../coord/polar/polarCreator","./angleAxis","./radiusAxis","../echarts"],function(t){t("../coord/polar/polarCreator"),t("./angleAxis"),t("./radiusAxis"),t("../echarts").extendComponentView({type:"polar"})}),e("echarts/component/tooltip",[ci,"./tooltip/TooltipModel","./tooltip/TooltipView","../echarts"],function(t){t("./tooltip/TooltipModel"),t("./tooltip/TooltipView"),t("../echarts").registerAction({type:"showTip",event:"showTip",update:"none"},function(){}),t("../echarts").registerAction({type:"hideTip",event:"hideTip",update:"none"},function(){})}),e("echarts/component/legend",[ci,"./legend/LegendModel","./legend/legendAction","./legend/LegendView","../echarts","./legend/legendFilter"],function(t){t("./legend/LegendModel"),t("./legend/legendAction"),t("./legend/LegendView");var e=t("../echarts");e.registerProcessor(t("./legend/legendFilter"))}),e("echarts/component/geo",[ci,"../coord/geo/GeoModel","../coord/geo/geoCreator","./geo/GeoView","../action/geoRoam","../echarts",li],function(t){function e(t,e){e[He]="updateView",i.registerAction(e,function(e,i){var r={};return i[Xe]({mainType:"geo",query:e},function(i){i[t](e.name);var a=i[he];n.each(a.regions,function(t){r[t.name]=i.isSelected(t.name)||!1})}),{selected:r,name:e.name}})}t("../coord/geo/GeoModel"),t("../coord/geo/geoCreator"),t("./geo/GeoView"),t("../action/geoRoam");var i=t("../echarts"),n=t(li);e("toggleSelected",{type:"geoToggleSelect",event:"geoselectchanged"}),e("select",{type:"geoSelect",event:"geoselected"}),e("unSelect",{type:"geoUnSelect",event:"geounselected"})}),e("echarts/component/title",[ci,"../echarts","../util/graphic","../util/layout"],function(t){var e=t("../echarts"),i=t("../util/graphic"),n=t("../util/layout");e.extendComponentModel({type:"title",layoutMode:{type:"box",ignoreSize:!0},defaultOption:{zlevel:0,z:6,show:!0,text:"",target:"blank",subtext:"",subtarget:"blank",left:0,top:0,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,textStyle:{fontSize:18,fontWeight:"bolder",color:"#333"},subtextStyle:{color:"#aaa"}}}),e.extendComponentView({type:"title",render:function(t,e,r){if(this.group[fe](),t.get("show")){var a=this.group,o=t[Je](ue),s=t[Je]("subtextStyle"),l=t.get(ce),c=t.get("textBaseline"),u=new i.Text({style:{text:t.get("text"),textFont:o[le](),fill:o[se]()},z2:10}),h=u[oe](),f=t.get("subtext"),d=new i.Text({style:{text:f,textFont:s[le](),fill:s[se](),y:h[We]+t.get("itemGap"),textBaseline:"top"},z2:10}),p=t.get("link"),m=t.get("sublink");u[ke]=!p,d[ke]=!m,p&&u.on("click",function(){window.open(p,"_"+t.get(Ce))}),m&&d.on("click",function(){window.open(m,"_"+t.get("subtarget"))}),a.add(u),f&&a.add(d);var v=a[oe](),g=t.getBoxLayoutParams();g.width=v.width,g[We]=v[We];var y=n.getLayoutRect(g,{width:r[Qe](),height:r[$e]()},t.get("padding"));l||(l=t.get("left")||t.get("right"),l===ae&&(l=re),"right"===l?y.x+=y.width:l===re&&(y.x+=y.width/2)),c||(c=t.get("top")||t.get(Ze),c===re&&(c=ae),c===Ze?y.y+=y[We]:c===ae&&(y.y+=y[We]/2),c=c||"top"),a.attr(ne,[y.x,y.y]);var x={textAlign:l,textVerticalAlign:c};u[be](x),d[be](x),v=a[oe]();var _=y.margin,b=t.getItemStyle(["color",ie]);b.fill=t.get("backgroundColor");var w=new i.Rect({shape:{x:v.x-_[3],y:v.y-_[0],width:v.width+_[1]+_[3],height:v[We]+_[0]+_[2]},style:b,silent:!0});i.subPixelOptimizeRect(w),a.add(w)}}})}),e("echarts/component/markPoint",[ci,"./marker/MarkPointModel","./marker/MarkPointView","../echarts"],function(t){t("./marker/MarkPointModel"),t("./marker/MarkPointView"),t("../echarts").registerPreprocessor(function(t){t.markPoint=t.markPoint||{}})}),e("echarts/component/markLine",[ci,"./marker/MarkLineModel","./marker/MarkLineView","../echarts"],function(t){t("./marker/MarkLineModel"),t("./marker/MarkLineView"),t("../echarts").registerPreprocessor(function(t){t.markLine=t.markLine||{}})}),e("zrender/vml/vml",[ci,"./graphic","../zrender","./Painter"],function(t){t("./graphic"),t("../zrender").registerPainter("vml",t("./Painter"))}),e("echarts/scale/Time",[ci,li,"../util/number","../util/format","./Interval"],function(t){var e=t(li),i=t("../util/number"),n=t("../util/format"),r=t("./Interval"),a=r[ii],o=Math.ceil,s=Math.floor,l=1e3,c=60*l,u=60*c,h=24*u,f=function(t,e,i,n){for(;n>i;){var r=i+n>>>1;t[r][2]<e?i=r+1:n=r}return i},d=r[Be]({type:"time",getLabel:function(t){var e=this._stepLvl,i=new Date(t);return n.formatTime(e[0],i)},niceExtent:function(t,e,n){var r=this._extent;if(r[0]===r[1]&&(r[0]-=h,r[1]+=h),r[1]===-1/0&&1/0===r[0]){var a=new Date;r[1]=new Date(a.getFullYear(),a.getMonth(),a.getDate()),r[0]=r[1]-h}this.niceTicks(t);var l=this._interval;e||(r[0]=i.round(s(r[0]/l)*l)),n||(r[1]=i.round(o(r[1]/l)*l))},niceTicks:function(t){t=t||10;var e=this._extent,n=e[1]-e[0],r=n/t,a=p[Re],l=f(p,r,0,a),c=p[Math.min(l,a-1)],u=c[2];if("year"===c[0]){var h=n/u,d=i.nice(h/t,!0);u*=d}var m=[o(e[0]/u)*u,s(e[1]/u)*u];this._stepLvl=c,this._interval=u,this._niceExtent=m},parse:function(t){return+i.parseDate(t)}});e.each([ee,"normalize"],function(t){d[ii][t]=function(e){return a[t].call(this,this.parse(e))}});var p=[["hh:mm:ss",1,l],["hh:mm:ss",5,5*l],["hh:mm:ss",10,10*l],["hh:mm:ss",15,15*l],["hh:mm:ss",30,30*l],["hh:mm\nMM-dd",1,c],["hh:mm\nMM-dd",5,5*c],["hh:mm\nMM-dd",10,10*c],["hh:mm\nMM-dd",15,15*c],["hh:mm\nMM-dd",30,30*c],["hh:mm\nMM-dd",1,u],["hh:mm\nMM-dd",2,2*u],["hh:mm\nMM-dd",6,6*u],["hh:mm\nMM-dd",12,12*u],["MM-dd\nyyyy",1,h],["week",7,7*h],["month",1,31*h],["quarter",3,380*h/4],["half-year",6,380*h/2],["year",1,380*h]];return d[qe]=function(){return new d},d}),e("echarts/component/markArea",[ci,"./marker/MarkAreaModel","./marker/MarkAreaView","../echarts"],function(t){t("./marker/MarkAreaModel"),t("./marker/MarkAreaView"),t("../echarts").registerPreprocessor(function(t){t.markArea=t.markArea||{}})}),e("echarts/component/timeline",[ci,"../echarts","./timeline/preprocessor","./timeline/typeDefaulter","./timeline/timelineAction","./timeline/SliderTimelineModel","./timeline/SliderTimelineView"],function(t){var e=t("../echarts");e.registerPreprocessor(t("./timeline/preprocessor")),t("./timeline/typeDefaulter"),t("./timeline/timelineAction"),t("./timeline/SliderTimelineModel"),t("./timeline/SliderTimelineView")}),e("echarts/scale/Log",[ci,li,"./Scale","../util/number","./Interval"],function(t){var e=t(li),i=t("./Scale"),n=t("../util/number"),r=t("./Interval"),a=i[ii],o=r[ii],s=Math.floor,l=Math.ceil,c=Math.pow,u=Math.log,h=i[Be]({type:"log",base:10,getTicks:function(){return e.map(o[te].call(this),function(t){return n.round(c(this.base,t))},this)},getLabel:o.getLabel,scale:function(t){return t=a.scale.call(this,t),c(this.base,t)},setExtent:function(t,e){var i=this.base;t=u(t)/u(i),e=u(e)/u(i),o.setExtent.call(this,t,e)},getExtent:function(){var t=this.base,e=a[K].call(this);return e[0]=c(t,e[0]),e[1]=c(t,e[1]),e},unionExtent:function(t){var e=this.base;t[0]=u(t[0])/u(e),t[1]=u(t[1])/u(e),a.unionExtent.call(this,t)},niceTicks:function(t){t=t||10;var e=this._extent,i=e[1]-e[0];if(!(1/0===i||0>=i)){var r=n.quantity(i),a=t/i*r;for(.5>=a&&(r*=10);!isNaN(r)&&Math.abs(r)<1&&Math.abs(r)>0;)r*=10;var o=[n.round(l(e[0]/r)*r),n.round(s(e[1]/r)*r)];this._interval=r,this._niceExtent=o}},niceExtent:o.niceExtent});return e.each([ee,"normalize"],function(t){h[ii][t]=function(e){return e=u(e)/u(this.base),a[t].call(this,e)}}),h[qe]=function(){return new h},h}),e(li,[ci],function(){function t(e){if("object"==typeof e&&null!==e){var i=e;if(e instanceof Array){i=[];for(var n=0,r=e[Re];r>n;n++)i[n]=t(e[n])}else if(!w(e)&&!M(e)){i={};for(var a in e)e.hasOwnProperty(a)&&(i[a]=t(e[a]))}return i}return e}function e(i,n,r){if(!b(n)||!b(i))return r?t(n):i;for(var a in n)if(n.hasOwnProperty(a)){var o=i[a],s=n[a];!b(s)||!b(o)||y(s)||y(o)||M(s)||M(o)||w(s)||w(o)?!r&&a in i||(i[a]=t(n[a],!0)):e(o,s,r)}return i}function i(t,i){for(var n=t[0],r=1,a=t[Re];a>r;r++)n=e(n,t[r],i);return n}function n(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}function r(t,e,i){for(var n in e)e.hasOwnProperty(n)&&(i?null!=e[n]:null==t[n])&&(t[n]=e[n]);return t}function a(){return document[J]("canvas")}function o(){return A||(A=E.createCanvas().getContext("2d")),A}function s(t,e){if(t){if(t[pe])return t[pe](e);for(var i=0,n=t[Re];n>i;i++)if(t[i]===e)return i}return-1}function l(t,e){function i(){}var n=t[ii];i[ii]=e[ii],t[ii]=new i;for(var r in n)t[ii][r]=n[r];t[ii].constructor=t,t.superClass=e}function c(t,e,i){t=ii in t?t[ii]:t,e=ii in e?e[ii]:e,r(t,e,i)}function u(t){return t?typeof t==ei?!1:typeof t[Re]==ve:void 0}function h(t,e,i){if(t&&e)if(t.forEach&&t.forEach===z)t.forEach(e,i);else if(t[Re]===+t[Re])for(var n=0,r=t[Re];r>n;n++)e.call(i,t[n],n,t);else for(var a in t)t.hasOwnProperty(a)&&e.call(i,t[a],a,t)}function f(t,e,i){if(t&&e){if(t.map&&t.map===R)return t.map(e,i);for(var n=[],r=0,a=t[Re];a>r;r++)n.push(e.call(i,t[r],r,t));return n}}function d(t,e,i,n){if(t&&e){if(t.reduce&&t.reduce===O)return t.reduce(e,i,n);for(var r=0,a=t[Re];a>r;r++)i=e.call(n,i,t[r],r,t);return i}}function p(t,e,i){if(t&&e){if(t[me]&&t[me]===D)return t[me](e,i);for(var n=[],r=0,a=t[Re];a>r;r++)e.call(i,t[r],r,t)&&n.push(t[r]);return n}}function m(t,e,i){if(t&&e)for(var n=0,r=t[Re];r>n;n++)if(e.call(i,t[n],n,t))return t[n]}function v(t,e){var i=I.call(arguments,2);return function(){return t.apply(e,i[Q](I.call(arguments)))}}function g(t){var e=I.call(arguments,1);return function(){return t.apply(this,e[Q](I.call(arguments)))}}function y(t){return"[object Array]"===P.call(t)}function x(t){return typeof t===ge}function _(t){return"[object String]"===P.call(t)}function b(t){var e=typeof t;return e===ge||!!t&&"object"==e}function w(t){return!!L[P.call(t)]}function M(t){return t&&1===t.nodeType&&typeof t.nodeName==ei}function S(){for(var t=0,e=arguments[Re];e>t;t++)if(null!=arguments[t])return arguments[t]}function T(){return Function.call.apply(I,arguments)}function C(t,e){if(!t)throw new Error(e)}var A,L={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1,"[object CanvasPattern]":1,"[object Image]":1},P=Object[ii].toString,k=Array[ii],z=k.forEach,D=k[me],I=k.slice,R=k.map,O=k.reduce,E={inherits:l,mixin:c,clone:t,merge:e,mergeAll:i,extend:n,defaults:r,getContext:o,createCanvas:a,indexOf:s,slice:T,find:m,isArrayLike:u,each:h,map:f,reduce:d,filter:p,bind:v,curry:g,isArray:y,isString:_,isObject:b,isFunction:x,isBuildInObject:w,isDom:M,retrieve:S,assert:C,noop:function(){}};return E}),e("echarts/chart/bar/BarSeries",[ci,"../../model/Series","../helper/createListFromArray"],function(t){var e=t("../../model/Series"),i=t("../helper/createListFromArray");return e[Be]({type:"series.bar",dependencies:["grid","polar"],getInitialData:function(t,e){return i(t.data,this,e)},getMarkerPosition:function(t){var e=this[he];if(e){var i=e[$](t,!0),n=this[si](),r=n.getLayout("offset"),a=n.getLayout("size"),o=e.getBaseAxis().isHorizontal()?0:1;return i[o]+=r+a/2,i}return[0/0,0/0]},brushSelector:"rect",defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,barMinHeight:0,itemStyle:{normal:{},emphasis:{}}}})}),e("echarts/chart/map/MapSeries",[ci,j,"../../model/Series",li,"../../data/helper/completeDimensions",Y,"../../component/helper/selectableMixin","../../coord/geo/geoCreator"],function(t){var e=t(j),i=t("../../model/Series"),n=t(li),r=t("../../data/helper/completeDimensions"),a=t(Y),o=a.encodeHTML,s=a[X],l=t("../../component/helper/selectableMixin"),c=t("../../coord/geo/geoCreator"),u=i[Be]({type:"series.map",layoutMode:"box",needsDrawMap:!1,seriesGroup:[],init:function(t){t=this._fillOption(t,t.map),this[U]=t,u.superApply(this,"init",arguments),this.updateSelectedMap(t.data)},getInitialData:function(t){var i=r(["value"],t.data||[]),n=new e(i,this);return n[Z](t.data),n},mergeOption:function(t){t.data&&(t=this._fillOption(t,this[U].map)),u.superCall(this,W,t),this.updateSelectedMap(this[U].data)},_fillOption:function(t,e){return t=n[Be]({},t),t.data=c.getFilledRegions(t.data,e),t},getRawValue:function(t){return this._data.get("value",t)},getRegionModel:function(t){var e=this[si]();return e[q](e.indexOfName(t))},formatTooltip:function(t){for(var e=this[si](),i=s(this[H](t)),n=e[F](t),r=this.seriesGroup,a=[],l=0;l<r[Re];l++){var c=r[l].originalData.indexOfName(n);isNaN(r[l].originalData.get("value",c))||a.push(o(r[l].name))}return a.join(", ")+"<br />"+n+" : "+i},defaultOption:{zlevel:0,z:2,coordinateSystem:"geo",map:"china",left:"center",top:"center",aspectScale:.75,showLegendSymbol:!0,dataRangeHoverLink:!0,center:null,zoom:1,scaleLimit:null,label:{normal:{show:!1,textStyle:{color:"#000"}},emphasis:{show:!0,textStyle:{color:"rgb(100,0,0)"}}},itemStyle:{normal:{borderWidth:.5,borderColor:"#444",areaColor:"#eee"},emphasis:{areaColor:"rgba(255,215,0,0.8)"}}},setZoom:function(t){this[U].zoom=t},setCenter:function(t){this[U][re]=t}});return n.mixin(u,l),u}),e("echarts/coord/cartesian/Grid",[ci,"exports","../../util/layout","../../coord/axisHelper",li,"./Cartesian2D","./Axis2D","./GridModel","../../CoordinateSystem"],function(t){function e(t,e){return t.findGridModel()===e}function i(t){var e,i=t.model,n=i.getFormattedLabels(),r=1,a=n[Re];a>40&&(r=Math.ceil(a/40));for(var o=0;a>o;o+=r)if(!t.isLabelIgnored(o)){var s=i.getTextRect(n[o]);e?e.union(s):e=s}return e}function n(t,e,i){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(t,e,i),this._model=t}function r(t,e){var i=t[K](),n=i[0]+i[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e}:function(t){return n-t+e},t.toLocalCoord="x"===t.dim?function(t){return t-e}:function(t){return n-t+e}}function a(t,e){return c.map(v,function(i){var n=e.queryComponents({mainType:i,index:t.get(i+"Index"),id:t.get(i+"Id")})[0];return n})}function o(t){return"cartesian2d"===t.get(he)}var s=t("../../util/layout"),l=t("../../coord/axisHelper"),c=t(li),u=t("./Cartesian2D"),h=t("./Axis2D"),f=c.each,d=l.ifAxisCrossZero,p=l.niceScaleExtent;t("./GridModel");var m=n[ii];m.type="grid",m.getRect=function(){return this._rect},m[He]=function(t,e){function i(t){var e=n[t];for(var i in e){var r=e[i];if(r&&(r.type===V||!d(r)))return!0}return!1}var n=this._axesMap;this._updateScale(t,this._model),f(n.x,function(t){p(t,t.model)}),f(n.y,function(t){p(t,t.model)}),f(n.x,function(t){i("y")&&(t.onZero=!1)
}),f(n.y,function(t){i("x")&&(t.onZero=!1)}),this[ti](this._model,e)},m[ti]=function(t,e){function n(){f(o,function(t){var e=t.isHorizontal(),i=e?[0,a.width]:[0,a[We]],n=t.inverse?1:0;t.setExtent(i[n],i[1-n]),r(t,e?a.x:a.y)})}var a=s.getLayoutRect(t.getBoxLayoutParams(),{width:e[Qe](),height:e[$e]()});this._rect=a;var o=this._axesList;n(),t.get("containLabel")&&(f(o,function(t){if(!t.model.get("axisLabel.inside")){var e=i(t);if(e){var n=t.isHorizontal()?We:"width",r=t.model.get("axisLabel.margin");a[n]-=e[n]+r,"top"===t[ne]?a.y+=e[We]+r:"left"===t[ne]&&(a.x+=e.width+r)}}}),n())},m[G]=function(t,e){var i=this._axesMap[t];if(null!=i){if(null==e)for(var n in i)return i[n];return i[e]}},m.getCartesian=function(t,e){if(null!=t&&null!=e){var i="x"+t+"y"+e;return this._coordsMap[i]}for(var n=0,r=this._coordsList;n<r[Re];n++)if(r[n][G]("x").index===t||r[n][G]("y").index===e)return r[n]},m._initCartesian=function(t,i){function n(n){return function(s,c){if(e(s,t,i)){var u=s.get(ne);"x"===n?"top"!==u&&u!==Ze&&(u=Ze,r[u]&&(u="top"===u?Ze:"top")):"left"!==u&&"right"!==u&&(u="left",r[u]&&(u="left"===u?"right":"left")),r[u]=!0;var f=new h(n,l.createScaleByModel(s),[0,0],s.get("type"),u),d=f.type===V;f.onBand=d&&s.get("boundaryGap"),f.inverse=s.get("inverse"),f.onZero=s.get("axisLine.onZero"),s.axis=f,f.model=s,f.grid=this,f.index=c,this._axesList.push(f),a[n][c]=f,o[n]++}}}var r={left:!1,right:!1,top:!1,bottom:!1},a={x:{},y:{}},o={x:0,y:0};return i[Xe]("xAxis",n("x"),this),i[Xe]("yAxis",n("y"),this),o.x&&o.y?(this._axesMap=a,void f(a.x,function(t,e){f(a.y,function(i,n){var r="x"+e+"y"+n,a=new u(r);a.grid=this,this._coordsMap[r]=a,this._coordsList.push(a),a.addAxis(t),a.addAxis(i)},this)},this)):(this._axesMap={},void(this._axesList=[]))},m._updateScale=function(t,i){function n(t,e,i){f(i.coordDimToDataDim(e.dim),function(i){e.scale.unionExtent(t[B](i,e.scale.type!==E))})}c.each(this._axesList,function(t){t.scale.setExtent(1/0,-1/0)}),t[Fe](function(r){if(o(r)){var s=a(r,t),l=s[0],c=s[1];if(!e(l,i,t)||!e(c,i,t))return;var u=this.getCartesian(l[N],c[N]),h=r[si](),f=u[G]("x"),d=u[G]("y");"list"===h.type&&(n(h,f,r),n(h,d,r))}},this)};var v=["xAxis","yAxis"];return n[qe]=function(t,e){var i=[];return t[Xe]("grid",function(r,a){var o=new n(r,t,e);o.name="grid_"+a,o[ti](r,e),r[he]=o,i.push(o)}),t[Fe](function(e){if(o(e)){var i=a(e,t),n=i[0],r=i[1],s=n.findGridModel(),l=s[he];e[he]=l.getCartesian(n[N],r[N])}}),i},n[R]=u[ii][R],t("../../CoordinateSystem").register("cartesian2d",n),n}),e("echarts/chart/bar/BarView",[ci,li,I,"../../model/Model","./barItemStyle",D],function(t){function e(t,e){var i=t.width>0?1:-1,n=t[We]>0?1:-1;e=Math.min(e,Math.abs(t.width),Math.abs(t[We])),t.x+=i*e/2,t.y+=n*e/2,t.width-=i*e,t[We]-=n*e}var i=t(li),n=t(I);return i[Be](t("../../model/Model")[ii],t("./barItemStyle")),t(D).extendChartView({type:"bar",render:function(t,e,i){var n=t.get(he);return"cartesian2d"===n&&this._renderOnCartesian(t,e,i),this.group},_renderOnCartesian:function(t){function r(r,a){var s=o[k](r),l=o[q](r).get(f)||0;e(s,l);var c=new n.Rect({shape:i[Be]({},s)});if(h){var d=c.shape,p=u?We:"width",m={};d[p]=0,m[p]=s[p],n[a?P:"initProps"](c,{shape:m},t,r)}return c}var a=this.group,o=t[si](),s=this._data,l=t[he],c=l.getBaseAxis(),u=c.isHorizontal(),h=t.get(Ke),f=["itemStyle",z,"barBorderWidth"];o.diff(s).add(function(t){if(o.hasValue(t)){var e=r(t);o.setItemGraphicEl(t,e),a.add(e)}})[He](function(i,l){var c=s[L](l);if(!o.hasValue(i))return void a[Ne](c);c||(c=r(i,!0));var u=o[k](i),h=o[q](i).get(f)||0;e(u,h),n[P](c,{shape:u},t,i),o.setItemGraphicEl(i,c),a.add(c)})[Ne](function(e){var i=s[L](e);i&&(i.style.text="",n[P](i,{shape:{width:0}},t,e,function(){a[Ne](i)}))}).execute(),this._updateStyle(t,o,u),this._data=o},_updateStyle:function(t,e,r){function a(t,e,i,r,a){n.setText(t,e,i),t.text=r,"outside"===t.textPosition&&(t.textPosition=a)}e[A](function(o,s){var l=e[q](s),c=e[C](s,"color"),u=e[C](s,ie),h=e[k](s),f=l[Je]("itemStyle.normal"),d=l[Je]("itemStyle.emphasis").getBarItemStyle();o.setShape("r",f.get("barBorderRadius")||0),o.useStyle(i[Oe]({fill:c,opacity:u},f.getBarItemStyle()));var p=r?h[We]>0?Ze:"top":h.width>0?"left":"right",m=l[Je]("label.normal"),v=l[Je]("label.emphasis"),g=o.style;m.get("show")?a(g,m,c,i[O](t.getFormattedLabel(s,z),t[H](s)),p):g.text="",v.get("show")?a(d,v,c,i[O](t.getFormattedLabel(s,T),t[H](s)),p):d.text="",n[S](o,d)})},remove:function(t){var e=this.group;t.get(Ke)?this._data&&this._data[A](function(i){i.style.text="",n[P](i,{shape:{width:0}},t,i[Te],function(){e[Ne](i)})}):e[fe]()}})}),e("echarts/layout/barGrid",[ci,li,"../util/number"],function(t){function e(t){return t.get("stack")||"__ec_stack_"+t[Se]}function i(t){return t.dim+t.index}function n(t){var n={};a.each(t,function(t){var r=t[si](),a=t[he],o=a.getBaseAxis(),l=o[K](),c=o.type===V?o.getBandWidth():Math.abs(l[1]-l[0])/r.count(),u=n[i(o)]||{bandWidth:c,remainedWidth:c,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},h=u.stacks;n[i(o)]=u;var f=e(t);h[f]||u.autoWidthCount++,h[f]=h[f]||{width:0,maxWidth:0};var d=s(t.get("barWidth"),c),p=s(t.get("barMaxWidth"),c),m=t.get("barGap"),v=t.get("barCategoryGap");d&&!h[f].width&&(d=Math.min(u.remainedWidth,d),h[f].width=d,u.remainedWidth-=d),p&&(h[f].maxWidth=p),null!=m&&(u.gap=m),null!=v&&(u.categoryGap=v)});var r={};return a.each(n,function(t,e){r[e]={};var i=t.stacks,n=t.bandWidth,o=s(t.categoryGap,n),l=s(t.gap,1),c=t.remainedWidth,u=t.autoWidthCount,h=(c-o)/(u+(u-1)*l);h=Math.max(h,0),a.each(i,function(t){var e=t.maxWidth;!t.width&&e&&h>e&&(e=Math.min(e,c),c-=e,t.width=e,u--)}),h=(c-o)/(u+(u-1)*l),h=Math.max(h,0);var f,d=0;a.each(i,function(t){t.width||(t.width=h),f=t,d+=t.width*(1+l)}),f&&(d-=f.width*l);var p=-d/2;a.each(i,function(t,i){r[e][i]=r[e][i]||{offset:p,width:t.width},p+=t.width*(1+l)})}),r}function r(t,r){var o=n(a[me](r.getSeriesByType(t),function(t){return!r.isSeriesFiltered(t)&&t[he]&&"cartesian2d"===t[he].type})),s={};r.eachSeriesByType(t,function(t){var n=t[si](),r=t[he],a=r.getBaseAxis(),l=e(t),c=o[i(a)][l],u=c.offset,h=c.width,f=r.getOtherAxis(a),d=t.get("barMinHeight")||0,p=a.onZero?f.toGlobalCoord(f[w](0)):f.getGlobalExtent()[0],m=r.dataToPoints(n,!0);s[l]=s[l]||[],n.setLayout({offset:u,size:h}),n.each(f.dim,function(t,e){if(!isNaN(t)){s[l][e]||(s[l][e]={p:p,n:p});var i,r,a,o,c=t>=0?"p":"n",v=m[e],g=s[l][e][c];f.isHorizontal()?(i=g,r=v[1]+u,a=v[0]-g,o=h,Math.abs(a)<d&&(a=(0>a?-1:1)*d),s[l][e][c]+=a):(i=v[0]+u,r=g,a=h,o=v[1]-g,Math.abs(o)<d&&(o=(0>=o?-1:1)*d),s[l][e][c]+=o),n.setItemLayout(e,{x:i,y:r,width:a,height:o})}},!0)},this)}var a=t(li),o=t("../util/number"),s=o[M];return r}),e("echarts/chart/map/MapView",[ci,I,"../../component/helper/MapDraw",D],function(t){var e=t(I),i=t("../../component/helper/MapDraw");t(D).extendChartView({type:"map",render:function(t,e,n,r){if(!r||"mapToggleSelect"!==r.type||r.from!==this.uid){var a=this.group;if(a[fe](),r&&"geoRoam"===r.type&&r.componentType===De&&r.seriesId===t.id){var o=this._mapDraw;o&&a.add(o.group)}else if(t.needsDrawMap){var o=this._mapDraw||new i(n,!0);a.add(o.group),o.draw(t,e,n,this,r),this._mapDraw=o}else this._mapDraw&&this._mapDraw[Ne](),this._mapDraw=null;t.get("showLegendSymbol")&&e.getComponent("legend")&&this._renderSymbols(t,e,n)}},remove:function(){this._mapDraw&&this._mapDraw[Ne](),this._mapDraw=null,this.group[fe]()},_renderSymbols:function(t){var i=t.originalData,n=this.group;i.each("value",function(r,a){if(!isNaN(r)){var o=i[k](a);if(o&&o.point){var s=o.point,l=o.offset,c=new e.Circle({style:{fill:t[si]().getVisual("color")},shape:{cx:s[0]+9*l,cy:s[1],r:3},silent:!0,z2:10});if(!l){var u=t.mainSeries[si](),h=i[F](a),f=h,d=u.indexOfName(h),p=i[q](a),m=p[Je]("label.normal"),v=p[Je]("label.emphasis"),g=m[Je](ue),y=v[Je](ue),x=u[L](d);c[be]({textPosition:"bottom"});var _=function(){c[be]({text:v.get("show")?f:"",textFill:y[se](),textFont:y[le]()})},b=function(){c[be]({text:m.get("show")?f:"",textFill:g[se](),textFont:g[le]()})};x.on(Pe,_).on(Le,b).on(T,_).on(z,b),b()}n.add(c)}}})}})}),e("echarts/action/geoRoam",[ci,li,"./roamHelper","../echarts"],function(t){var e=t(li),i=t("./roamHelper"),n=t("../echarts");n.registerAction({type:"geoRoam",event:"geoRoam",update:"updateLayout"},function(t,n){var r=t.componentType||De;n[Xe]({mainType:r,query:t},function(n){var a=n[he];if("geo"===a.type){var o=i.updateCenterAndZoom(a,t,n.get("scaleLimit"));n.setCenter&&n.setCenter(o[re]),n.setZoom&&n.setZoom(o.zoom),r===De&&e.each(n.seriesGroup,function(t){t.setCenter(o[re]),t.setZoom(o.zoom)})}})})}),e("echarts/coord/geo/geoCreator",[ci,"./Geo","../../util/layout",li,b,D],function(t){function e(t,e){var i,n=this[oe](),a=t.get("layoutCenter"),s=t.get("layoutSize"),l=e[Qe](),c=e[$e](),u=t.get("aspectScale")||.75,h=n.width/n[We]*u,f=!1;a&&s&&(a=[o[M](a[0],l),o[M](a[1],c)],s=o[M](s,Math.min(l,c)),isNaN(a[0])||isNaN(a[1])||isNaN(s)||(f=!0));var d;if(f){var d={};h>1?(d.width=s,d[We]=s/h):(d[We]=s,d.width=s*h),d.y=a[1]-d[We]/2,d.x=a[0]-d.width/2}else i=t.getBoxLayoutParams(),i.aspect=h,d=r.getLayoutRect(i,{width:l,height:c});this.setViewRect(d.x,d.y,d.width,d[We]),this.setCenter(t.get(re)),this.setZoom(t.get("zoom"))}function i(t,e){a.each(e.get("geoCoord"),function(e,i){t.addGeoCoord(i,e)})}var n=t("./Geo"),r=t("../../util/layout"),a=t(li),o=t(b),s={},l={dimensions:n[ii][R],create:function(t,r){var o=[];t[Xe]("geo",function(t,a){var l=t.get("map"),c=s[l],u=new n(l+a,l,c&&c.geoJson,c&&c.specialAreas,t.get("nameMap"));u.zoomLimit=t.get("scaleLimit"),o.push(u),i(u,t),t[he]=u,u.model=t,u[ti]=e,u[ti](t,r)}),t[Fe](function(t){var e=t.get(he);if("geo"===e){var i=t.get("geoIndex")||0;t[he]=o[i]}});var l={};return t.eachSeriesByType("map",function(t){var e=t.get("map");l[e]=l[e]||[],l[e].push(t)}),a.each(l,function(t,l){var c=s[l],u=a.map(t,function(t){return t.get("nameMap")}),h=new n(l,l,c&&c.geoJson,c&&c.specialAreas,a.mergeAll(u));h.zoomLimit=a[O].apply(null,a.map(t,function(t){return t.get("scaleLimit")})),o.push(h),h[ti]=e,h[ti](t[0],r),a.each(t,function(t){t[he]=h,i(h,t)})}),o},registerMap:function(t,e,i){e.geoJson&&!e.features&&(i=e.specialAreas,e=e.geoJson),typeof e===ei&&(e=typeof JSON!==_&&JSON.parse?JSON.parse(e):new Function("return ("+e+");")()),s[t]={geoJson:e,specialAreas:i}},getMap:function(t){return s[t]},getFilledRegions:function(t,e){var i=(t||[]).slice(),n=l.getMap(e),r=n&&n.geoJson;if(!r)return t;for(var a={},o=r.features,s=0;s<i[Re];s++)a[i[s].name]=i[s];for(var s=0;s<o[Re];s++){var c=o[s].properties.name;a[c]||i.push({name:c})}return i}},c=t(D);return c.registerMap=l.registerMap,c.getMap=l.getMap,c.loadMap=function(){},c.registerCoordinateSystem("geo",l),l}),e("echarts/chart/map/mapSymbolLayout",[ci,li],function(t){var e=t(li);return function(t){var i={};t.eachSeriesByType("map",function(n){var r=n.get("map");if(!i[r]){var a={};e.each(n.seriesGroup,function(e){var i=e[he],n=e.originalData;e.get("showLegendSymbol")&&t.getComponent("legend")&&n.each("value",function(t,e){var r=n[F](e),o=i.getRegion(r);if(o&&!isNaN(t)){var s=a[r]||0,l=i[$](o[re]);a[r]=s+1,n.setItemLayout(e,{point:l,offset:s})}})});var o=n[si]();o.each(function(t){var e=o[F](t),i=o[k](t)||{};i.showLabel=!a[e],o.setItemLayout(t,i)}),i[r]=!0}})}}),e("echarts/chart/map/mapDataStatistic",[ci,li],function(t){function e(t,e){for(var i={},n=["value"],r=0;r<t[Re];r++)t[r].each(n,function(e,n){var a=t[r][F](n);i[a]=i[a]||[],isNaN(e)||i[a].push(e)});return t[0].map(n,function(n,r){for(var a=t[0][F](r),o=0,s=1/0,l=-1/0,c=i[a][Re],u=0;c>u;u++)s=Math.min(s,i[a][u]),l=Math.max(l,i[a][u]),o+=i[a][u];var h;return h="min"===e?s:"max"===e?l:"average"===e?o/c:o,0===c?0/0:h})}var i=t(li);return function(t){var n={};t.eachSeriesByType("map",function(t){var e=t.get("map");n[e]=n[e]||[],n[e].push(t)}),i.each(n,function(t){for(var n=e(i.map(t,function(t){return t[si]()}),t[0].get("mapValueCalculation")),r=0;r<t[Re];r++)t[r].originalData=t[r][si]();for(var r=0;r<t[Re];r++)t[r].seriesGroup=t,t[r].needsDrawMap=0===r,t[r].setData(n.cloneShallow()),t[r].mainSeries=t[0]})}}),e("echarts/chart/map/backwardCompat",[ci,li],function(t){var e=t(li);return function(t){var i=[];e.each(t[De],function(t){"map"===t.type&&i.push(t)}),e.each(i,function(t){t.map=t.map||t.mapType,e[Oe](t,t.mapLocation)})}}),e("echarts/chart/map/mapVisual",[ci],function(){return function(t){t.eachSeriesByType("map",function(t){var e=t.get("color"),i=t[Je]("itemStyle.normal"),n=i.get("areaColor"),r=i.get("color")||e[t[Se]%e[Re]];t[si]().setVisual({areaColor:n,color:r})})}}),e("echarts/chart/pie/PieView",[ci,I,li,"../../view/Chart"],function(t){function e(t,e,n,r){var a=e[si](),o=this[Te],s=a[F](o),l=e.get("selectedOffset");r[Ee]({type:"pieToggleSelect",from:t,name:s,seriesId:e.id}),a.each(function(t){i(a[L](t),a[k](t),e.isSelected(a[F](t)),l,n)})}function i(t,e,i,n,r){var a=(e.startAngle+e.endAngle)/2,o=Math.cos(a),s=Math.sin(a),l=i?n:0,c=[o*l,s*l];r?t.animate().when(200,{position:c}).start("bounceOut"):t.attr(ne,c)}function n(t,e){function i(){o[Ue]=o.hoverIgnore,s[Ue]=s.hoverIgnore}function n(){o[Ue]=o.normalIgnore,s[Ue]=s.normalIgnore}a.Group.call(this);var r=new a.Sector({z2:2}),o=new a.Polyline,s=new a.Text;this.add(r),this.add(o),this.add(s),this.updateData(t,e,!0),this.on(T,i).on(z,n).on(Pe,i).on(Le,n)}function r(t,e,i,n,r){var a=n[Je](ue),s="inside"===r||"inner"===r;return{fill:a[se]()||(s?"#fff":t[C](e,"color")),opacity:t[C](e,ie),textFont:a[le](),text:o[O](t.hostModel.getFormattedLabel(e,i),t[F](e))}}var a=t(I),o=t(li),s=n[ii];s.updateData=function(t,e,n){function r(){l.stopAnimation(!0),l.animateTo({shape:{r:h.r+10}},300,"elasticOut")}function s(){l.stopAnimation(!0),l.animateTo({shape:{r:h.r}},300,"elasticOut")}var l=this.childAt(0),c=t.hostModel,u=t[q](e),h=t[k](e),f=o[Be]({},h);f.label=null,n?(l.setShape(f),l.shape.endAngle=h.startAngle,a[P](l,{shape:{endAngle:h.endAngle}},c,e)):a[P](l,{shape:f},c,e);var d=u[Je]("itemStyle"),p=t[C](e,"color");l.useStyle(o[Oe]({lineJoin:"bevel",fill:p},d[Je](z).getItemStyle())),l.hoverStyle=d[Je](T).getItemStyle(),i(this,t[k](e),u.get("selected"),c.get("selectedOffset"),c.get(Ke)),l.off(Pe).off(Le).off(T).off(z),u.get("hoverAnimation")&&c.ifEnableAnimation()&&l.on(Pe,r).on(Le,s).on(T,r).on(z,s),this._updateLabel(t,e),a[S](this)},s._updateLabel=function(t,e){var i=this.childAt(1),n=this.childAt(2),o=t.hostModel,s=t[q](e),l=t[k](e),c=l.label,u=t[C](e,"color");a[P](i,{shape:{points:c.linePoints||[[c.x,c.y],[c.x,c.y],[c.x,c.y]]}},o,e),a[P](n,{style:{x:c.x,y:c.y}},o,e),n.attr({style:{textVerticalAlign:c.verticalAlign,textAlign:c[ce],textFont:c.font},rotation:c[x],origin:[c.x,c.y],z2:10});var h=s[Je]("label.normal"),f=s[Je]("label.emphasis"),d=s[Je]("labelLine.normal"),p=s[Je]("labelLine.emphasis"),m=h.get(ne)||f.get(ne);n[be](r(t,e,z,h,m)),n[Ue]=n.normalIgnore=!h.get("show"),n.hoverIgnore=!f.get("show"),i[Ue]=i.normalIgnore=!d.get("show"),i.hoverIgnore=!p.get("show"),i[be]({stroke:u,opacity:t[C](e,ie)}),i[be](d[Je]("lineStyle")[y]()),n.hoverStyle=r(t,e,T,f,m),i.hoverStyle=p[Je]("lineStyle")[y]();var v=d.get("smooth");v&&v===!0&&(v=.4),i.setShape({smooth:v})},o[de](n,a.Group);var l=t("../../view/Chart")[Be]({type:"pie",init:function(){var t=new a.Group;this._sectorGroup=t},render:function(t,i,r,a){if(!a||a.from!==this.uid){var s=t[si](),l=this._data,c=this.group,u=i.get(Ke),h=!l,f=o.curry(e,this.uid,t,u,r),d=t.get("selectedMode");if(s.diff(l).add(function(t){var e=new n(s,t);h&&e.eachChild(function(t){t.stopAnimation(!0)}),d&&e.on("click",f),s.setItemGraphicEl(t,e),c.add(e)})[He](function(t,e){var i=l[L](e);i.updateData(s,t),i.off("click"),d&&i.on("click",f),c.add(i),s.setItemGraphicEl(t,i)})[Ne](function(t){var e=l[L](t);c[Ne](e)}).execute(),u&&h&&s.count()>0){var p=s[k](0),m=Math.max(r[Qe](),r[$e]())/2,v=o.bind(c.removeClipPath,c);c.setClipPath(this._createClipPath(p.cx,p.cy,m,p.startAngle,p.clockwise,v,t))}this._data=s}},_createClipPath:function(t,e,i,n,r,o,s){var l=new a.Sector({shape:{cx:t,cy:e,r0:0,r:i,startAngle:n,endAngle:n,clockwise:r}});return a.initProps(l,{shape:{endAngle:n+(r?1:-1)*Math.PI*2}},s,o),l}});return l}),e("echarts/visual/dataColor",[ci],function(){return function(t,e){var i={};e.eachRawSeriesByType(t,function(t){var n=t.getRawData(),r={};if(!e.isSeriesFiltered(t)){var a=t[si]();a.each(function(t){var e=a.getRawIndex(t);r[e]=t}),n.each(function(e){var o=n[q](e),s=r[e],l=null!=s&&a[C](s,"color",!0);if(l)n.setItemVisual(e,"color",l);else{var c=o.get("itemStyle.normal.color")||t.getColorFromPalette(n[F](e),i);n.setItemVisual(e,"color",c),null!=s&&a.setItemVisual(s,"color",c)}})}})}}),e("echarts/chart/pie/PieSeries",[ci,j,li,g,"../../data/helper/completeDimensions","../../component/helper/selectableMixin",D],function(t){var e=t(j),i=t(li),n=t(g),r=t("../../data/helper/completeDimensions"),a=t("../../component/helper/selectableMixin"),o=t(D).extendSeriesModel({type:"series.pie",init:function(t){o.superApply(this,"init",arguments),this.legendDataProvider=function(){return this._dataBeforeProcessed},this.updateSelectedMap(t.data),this._defaultLabelLine(t)},mergeOption:function(t){o.superCall(this,W,t),this.updateSelectedMap(this[U].data)},getInitialData:function(t){var i=r(["value"],t.data),n=new e(i,this);return n[Z](t.data),n},getDataParams:function(t){var e=this._data,i=o.superCall(this,Me,t),n=e.getSum("value");return i.percent=n?+(e.get("value",t)/n*100).toFixed(2):0,i.$vars.push("percent"),i},_defaultLabelLine:function(t){n.defaultEmphasis(t.labelLine,["show"]);var e=t.labelLine[z],i=t.labelLine[T];e.show=e.show&&t.label[z].show,i.show=i.show&&t.label[T].show},defaultOption:{zlevel:0,z:2,legendHoverLink:!0,hoverAnimation:!0,center:["50%","50%"],radius:[0,"75%"],clockwise:!0,startAngle:90,minAngle:0,selectedOffset:10,avoidLabelOverlap:!0,label:{normal:{rotate:!1,show:!0,position:"outer"},emphasis:{}},labelLine:{normal:{show:!0,length:15,length2:15,smooth:!1,lineStyle:{width:1,type:"solid"}}},itemStyle:{normal:{borderWidth:1},emphasis:{}},animationEasing:"cubicOut",data:[]}});return i.mixin(o,a),o}),e("echarts/action/createDataSelectAction",[ci,"../echarts",li],function(t){var e=t("../echarts"),i=t(li);return function(t,n){i.each(n,function(i){i[He]="updateView",e.registerAction(i,function(e,n){var r={};return n[Xe]({mainType:"series",subType:t,query:e},function(t){t[i.method]&&t[i.method](e.name);var n=t[si]();n.each(function(e){var i=n[F](e);r[i]=t.isSelected(i)||!1})}),{name:e.name,selected:r}})})}}),e("echarts/chart/pie/pieLayout",[ci,b,"./labelLayout",li],function(t){var e=t(b),i=e[M],n=t("./labelLayout"),r=t(li),a=2*Math.PI,o=Math.PI/180;return function(t,s,l){s.eachSeriesByType(t,function(t){var s=t.get(re),c=t.get(v);r[ye](c)||(c=[0,c]),r[ye](s)||(s=[s,s]);var u=l[Qe](),h=l[$e](),f=Math.min(u,h),d=i(s[0],u),p=i(s[1],h),m=i(c[0],f/2),g=i(c[1],f/2),y=t[si](),x=-t.get("startAngle")*o,_=t.get("minAngle")*o,b=y.getSum("value"),w=Math.PI/(b||y.count())*2,M=t.get("clockwise"),S=t.get("roseType"),T=y[B]("value");T[0]=0;var C=a,A=0,L=x,P=M?1:-1;if(y.each("value",function(t,i){var n;n="area"!==S?0===b?w:t*w:a/(y.count()||1),_>n?(n=_,C-=_):A+=t;var r=L+P*n;y.setItemLayout(i,{angle:n,startAngle:L,endAngle:r,clockwise:M,cx:d,cy:p,r0:m,r:S?e.linearMap(t,T,[m,g]):g}),L=r},!0),a>C)if(.001>=C){var z=a/y.count();y.each(function(t){var e=y[k](t);e.startAngle=x+P*t*z,e.endAngle=x+P*(t+1)*z})}else w=C/A,L=x,y.each("value",function(t,e){var i=y[k](e),n=i.angle===_?_:t*w;i.startAngle=L,i.endAngle=L+P*n,L+=n});n(t,g,u,h)})}}),e("echarts/processor/dataFilter",[],function(){return function(t,e){var i=e.findComponents({mainType:"legend"});i&&i[Re]&&e.eachSeriesByType(t,function(t){var e=t[si]();e.filterSelf(function(t){for(var n=e[F](t),r=0;r<i[Re];r++)if(!i[r].isSelected(n))return!1;return!0},this)},this)}}),e(oi,[],function(){function t(t){var e={},i={},n=t.match(/Firefox\/([\d.]+)/),r=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),a=t.match(/Edge\/([\d.]+)/);return n&&(i.firefox=!0,i.version=n[1]),r&&(i.ie=!0,i.version=r[1]),r&&(i.ie=!0,i.version=r[1]),a&&(i.edge=!0,i.version=a[1]),{browser:i,os:e,node:!1,canvasSupported:document[J]("canvas").getContext?!0:!1,touchEventsSupported:"ontouchstart"in window&&!i.ie&&!i.edge,pointerEventsSupported:"onpointerdown"in window&&(i.edge||i.ie&&i.version>=10)}}var e={};return e=typeof navigator===_?{browser:{},os:{},node:!0,canvasSupported:!0}:t(navigator.userAgent)}),e("echarts/model/Global",[ci,li,"../util/model","./Model","./Component","./globalDefault","./mixin/colorPalette"],function(t){function e(t,e){for(var i in e)x.hasClass(i)||("object"==typeof e[i]?t[i]=t[i]?c.merge(t[i],e[i],!1):c.clone(e[i]):null==t[i]&&(t[i]=e[i]))}function i(t){t=t,this[U]={},this[U][b]=1,this._componentsMap={},this._seriesIndices=null,e(t,this._theme[U]),c.merge(t,_,!1),this[W](t)}function n(t,e){c[ye](e)||(e=e?[e]:[]);var i={};return f(e,function(e){i[e]=(t[e]||[]).slice()}),i}function r(t,e){var i={};f(e,function(t){var e=t.exist;e&&(i[e.id]=t)}),f(e,function(e){var n=e[U];if(c.assert(!n||null==n.id||!i[n.id]||i[n.id]===e,"id duplicates: "+(n&&n.id)),n&&null!=n.id&&(i[n.id]=e),y(n)){var r=a(t,n,e.exist);e.keyInfo={mainType:t,subType:r}}}),f(e,function(t){var e=t.exist,n=t[U],r=t.keyInfo;if(y(n)){if(r.name=null!=n.name?n.name+"":e?e.name:"\x00-",e)r.id=e.id;else if(null!=n.id)r.id=n.id+"";else{var a=0;do r.id="\x00"+r.name+"\x00"+a++;while(i[r.id])}i[r.id]=t}})}function a(t,e,i){var n=e.type?e.type:i?i.subType:x.determineSubType(t,e);return n}function o(t){return p(t,function(t){return t[N]})||[]}function s(t,e){return e.hasOwnProperty("subType")?d(t,function(t){return t.subType===e.subType}):t}function l(t){}var c=t(li),u=t("../util/model"),h=t("./Model"),f=c.each,d=c[me],p=c.map,v=c[ye],g=c[pe],y=c[Ge],x=t("./Component"),_=t("./globalDefault"),b="\x00_ec_inner",w=h[Be]({constructor:w,init:function(t,e,i,n){i=i||{},this[U]=null,this._theme=new h(i),this._optionManager=n},setOption:function(t,e){c.assert(!(b in t),"please use chart.getOption()"),this._optionManager.setOption(t,e),this.resetOption()},resetOption:function(t){var e=!1,n=this._optionManager;if(!t||"recreate"===t){var r=n.mountOption("recreate"===t);this[U]&&"recreate"!==t?(this.restoreData(),this[W](r)):i.call(this,r),e=!0}if(("timeline"===t||"media"===t)&&this.restoreData(),!t||"recreate"===t||"timeline"===t){var a=n.getTimelineOption(this);a&&(this[W](a),e=!0)}if(!t||"recreate"===t||"media"===t){var o=n.getMediaOption(this,this._api);o[Re]&&f(o,function(t){this[W](t,e=!0)},this)}return e},mergeOption:function(t){function e(e,s){var l=u.normalizeToArray(t[e]),h=u.mappingToExists(a[e],l);r(e,h);var d=n(a,s);i[e]=[],a[e]=[],f(h,function(t,n){var r=t.exist,o=t[U];if(c.assert(y(o)||r,"Empty component definition"),o){var s=x.getClass(e,t.keyInfo.subType,!0);if(r&&r instanceof s)r[W](o,this),r.optionUpdated(o,!1);else{var l=c[Be]({dependentModels:d,componentIndex:n},t.keyInfo);r=new s(o,this,this,l),r.init(o,this,this,l),r.optionUpdated(null,!0)}}else r[W]({},this),r.optionUpdated({},!1);a[e][n]=r,i[e][n]=r[U]},this),e===De&&(this._seriesIndices=o(a[De]))}var i=this[U],a=this._componentsMap,s=[];f(t,function(t,e){null!=t&&(x.hasClass(e)?s.push(e):i[e]=null==i[e]?c.clone(t):c.merge(i[e],t,!0))}),x.topologicalTravel(s,x.getAllClassMainTypes(),e,this),this._seriesIndices=this._seriesIndices||[]},getOption:function(){var t=c.clone(this[U]);return f(t,function(e,i){if(x.hasClass(i)){for(var e=u.normalizeToArray(e),n=e[Re]-1;n>=0;n--)u.isIdInner(e[n])&&e[ze](n,1);t[i]=e}}),delete t[b],t},getTheme:function(){return this._theme},getComponent:function(t,e){var i=this._componentsMap[t];return i?i[e||0]:void 0},queryComponents:function(t){var e=t[m];if(!e)return[];var i=t.index,n=t.id,r=t.name,a=this._componentsMap[e];if(!a||!a[Re])return[];var o;if(null!=i)v(i)||(i=[i]),o=d(p(i,function(t){return a[t]}),function(t){return!!t});else if(null!=n){var l=v(n);o=d(a,function(t){return l&&g(n,t.id)>=0||!l&&t.id===n})}else if(null!=r){var c=v(r);o=d(a,function(t){return c&&g(r,t.name)>=0||!c&&t.name===r})}else o=a;return s(o,t)},findComponents:function(t){function e(t){var e=r+"Index",i=r+"Id",n=r+"Name";return t&&(t.hasOwnProperty(e)||t.hasOwnProperty(i)||t.hasOwnProperty(n))?{mainType:r,index:t[e],id:t[i],name:t[n]}:null}function i(e){return t[me]?d(e,t[me]):e}var n=t.query,r=t[m],a=e(n),o=a?this.queryComponents(a):this._componentsMap[r];return i(s(o,t))},eachComponent:function(t,e,i){var n=this._componentsMap;if(typeof t===ge)i=e,e=t,f(n,function(t,n){f(t,function(t,r){e.call(i,n,t,r)})});else if(c.isString(t))f(n[t],e,i);else if(y(t)){var r=this.findComponents(t);f(r,e,i)}},getSeriesByName:function(t){var e=this._componentsMap[De];return d(e,function(e){return e.name===t})},getSeriesByIndex:function(t){return this._componentsMap[De][t]},getSeriesByType:function(t){var e=this._componentsMap[De];return d(e,function(e){return e.subType===t})},getSeries:function(){return this._componentsMap[De].slice()},eachSeries:function(t,e){l(this),f(this._seriesIndices,function(i){var n=this._componentsMap[De][i];t.call(e,n,i)},this)},eachRawSeries:function(t,e){f(this._componentsMap[De],t,e)},eachSeriesByType:function(t,e,i){l(this),f(this._seriesIndices,function(n){var r=this._componentsMap[De][n];r.subType===t&&e.call(i,r,n)},this)},eachRawSeriesByType:function(t,e,i){return f(this.getSeriesByType(t),e,i)},isSeriesFiltered:function(t){return l(this),c[pe](this._seriesIndices,t[N])<0},filterSeries:function(t,e){l(this);var i=d(this._componentsMap[De],t,e);this._seriesIndices=o(i)},restoreData:function(){var t=this._componentsMap;this._seriesIndices=o(t[De]);var e=[];f(t,function(t,i){e.push(i)}),x.topologicalTravel(e,x.getAllClassMainTypes(),function(e){f(t[e],function(t){t.restoreData()})})}});return c.mixin(w,t("./mixin/colorPalette")),w}),e("echarts/ExtensionAPI",[ci,li],function(t){function e(t){i.each(n,function(e){this[e]=i.bind(t[e],t)},this)}var i=t(li),n=["getDom","getZr",Qe,$e,Ee,"isDisposed","on","off","getDataURL","getConnectedDataURL",Je,"getOption"];return e}),e("echarts/CoordinateSystem",[ci],function(){function t(){this._coordinateSystems=[]}var e={};return t[ii]={constructor:t,create:function(t,i){var n=[];for(var r in e){var a=e[r][qe](t,i);a&&(n=n[Q](a))}this._coordinateSystems=n},update:function(t,e){for(var i=this._coordinateSystems,n=0;n<i[Re];n++)i[n][He]&&i[n][He](t,e)}},t.register=function(t,i){e[t]=i},t.get=function(t){return e[t]},t}),e("echarts/model/OptionManager",[ci,li,"../util/model","./Component"],function(t){function e(t){this._api=t,this._timelineOptions=[],this._mediaList=[],this._mediaDefault,this._currentMediaIndices=[],this._optionBackup,this._newBaseOption}function i(t,e,i){var n,r,a=[],o=[],l=t.timeline;if(t.baseOption&&(r=t.baseOption),(l||t.options)&&(r=r||{},a=(t.options||[]).slice()),t.media){r=r||{};var c=t.media;u(c,function(t){t&&t[U]&&(t.query?o.push(t):n||(n=t))})}return r||(r=t),r.timeline||(r.timeline=l),u([r][Q](a)[Q](s.map(o,function(t){return t[U]})),function(t){u(e,function(e){e(t,i)})}),{baseOption:r,timelineOptions:a,mediaDefault:n,mediaList:o}}function n(t,e,i){var n={width:e,height:i,aspectratio:e/i},a=!0;return s.each(t,function(t,e){var i=e.match(p);if(i&&i[1]&&i[2]){var o=i[1],s=i[2][ni]();r(n[s],t,o)||(a=!1)}}),a}function r(t,e,i){return"min"===i?t>=e:"max"===i?e>=t:t===e}function a(t,e){return t.join(",")===e.join(",")}function o(t,e){e=e||{},u(e,function(e,i){if(null!=e){var n=t[i];if(c.hasClass(i)){e=l.normalizeToArray(e),n=l.normalizeToArray(n);var r=l.mappingToExists(n,e);t[i]=f(r,function(t){return t[U]&&t.exist?d(t.exist,t[U],!0):t.exist||t[U]})}else t[i]=d(n,e,!0)}})}var s=t(li),l=t("../util/model"),c=t("./Component"),u=s.each,h=s.clone,f=s.map,d=s.merge,p=/^(min|max)?(.+)$/;return e[ii]={constructor:e,setOption:function(t,e){t=h(t,!0);var n=this._optionBackup,r=i.call(this,t,e,!n);this._newBaseOption=r.baseOption,n?(o(n.baseOption,r.baseOption),r.timelineOptions[Re]&&(n.timelineOptions=r.timelineOptions),r.mediaList[Re]&&(n.mediaList=r.mediaList),r.mediaDefault&&(n.mediaDefault=r.mediaDefault)):this._optionBackup=r},mountOption:function(t){var e=this._optionBackup;return this._timelineOptions=f(e.timelineOptions,h),this._mediaList=f(e.mediaList,h),this._mediaDefault=h(e.mediaDefault),this._currentMediaIndices=[],h(t?e.baseOption:this._newBaseOption)},getTimelineOption:function(t){var e,i=this._timelineOptions;if(i[Re]){var n=t.getComponent("timeline");n&&(e=h(i[n.getCurrentIndex()],!0))}return e},getMediaOption:function(){var t=this._api[Qe](),e=this._api[$e](),i=this._mediaList,r=this._mediaDefault,o=[],s=[];if(!i[Re]&&!r)return s;for(var l=0,c=i[Re];c>l;l++)n(i[l].query,t,e)&&o.push(l);return!o[Re]&&r&&(o=[-1]),o[Re]&&!a(o,this._currentMediaIndices)&&(s=f(o,function(t){return h(-1===t?r[U]:i[t][U])})),this._currentMediaIndices=o,s}},e}),e("echarts/model/Component",[ci,"./Model",li,"../util/component","../util/clazz","../util/layout","./mixin/boxLayout"],function(t){function e(t){var e=[];return n.each(l.getClassesByMainType(t),function(t){r.apply(e,t[ii].dependencies||[])}),n.map(e,function(t){return o.parseClassType(t).main})}var i=t("./Model"),n=t(li),r=Array[ii].push,a=t("../util/component"),o=t("../util/clazz"),s=t("../util/layout"),l=i[Be]({type:"component",id:"",name:"",mainType:"",subType:"",componentIndex:0,defaultOption:null,ecModel:null,dependentModels:[],uid:null,layoutMode:null,$constructor:function(t,e,r,o){i.call(this,t,e,r,o),n[Be](this,o),this.uid=a.getUID("componentModel")},init:function(t,e,i){this.mergeDefaultAndTheme(t,i)},mergeDefaultAndTheme:function(t,e){var i=this.layoutMode,r=i?s.getLayoutParams(t):{},a=e.getTheme();n.merge(t,a.get(this[m])),n.merge(t,this.getDefaultOption()),i&&s.mergeLayoutParam(t,r,i)},mergeOption:function(t){n.merge(this[U],t,!0);var e=this.layoutMode;e&&s.mergeLayoutParam(this[U],t,e)},optionUpdated:function(){},getDefaultOption:function(){if(!this.hasOwnProperty("__defaultOption")){for(var t=[],e=this.constructor;e;){var i=e[ii].defaultOption;i&&t.push(i),e=e.superClass}for(var r={},a=t[Re]-1;a>=0;a--)r=n.merge(r,t[a],!0);this.__defaultOption=r}return this.__defaultOption}});return o.enableClassManagement(l,{registerWhenExtend:!0}),a.enableSubTypeDefaulter(l),a.enableTopologicalTravel(l,e),n.mixin(l,t("./mixin/boxLayout")),l}),e("echarts/view/Component",[ci,"zrender/container/Group","../util/component","../util/clazz"],function(t){var e=t("zrender/container/Group"),i=t("../util/component"),n=t("../util/clazz"),r=function(){this.group=new e,this.uid=i.getUID("viewComponent")};r[ii]={constructor:r,init:function(){},render:function(){},dispose:function(){}};var a=r[ii];return a.updateView=a[Ve]=a.updateVisual=function(){},n.enableClassExtend(r),n.enableClassManagement(r,{registerWhenExtend:!0}),r}),e("echarts/view/Chart",[ci,"zrender/container/Group","../util/component","../util/clazz"],function(t){function e(){this.group=new r,this.uid=a.getUID("viewChart")}function i(t,e){if(t&&(t[Ie](e),"group"===t.type))for(var n=0;n<t.childCount();n++)i(t.childAt(n),e)}function n(t,e,n){var r=e&&e[Te],a=e&&e.name;if(null!=r)for(var o=r instanceof Array?r:[r],s=0,l=o[Re];l>s;s++)i(t[L](o[s]),n);else if(a)for(var c=a instanceof Array?a:[a],s=0,l=c[Re];l>s;s++){var r=t.indexOfName(c[s]);i(t[L](r),n)}else t[A](function(t){i(t,n)})}var r=t("zrender/container/Group"),a=t("../util/component"),o=t("../util/clazz");e[ii]={type:"chart",init:function(){},render:function(){},highlight:function(t,e,i,r){n(t[si](),r,T)},downplay:function(t,e,i,r){n(t[si](),r,z)},remove:function(){this.group[fe]()},dispose:function(){}};var s=e[ii];return s.updateView=s[Ve]=s.updateVisual=function(t,e,i,n){this.render(t,e,i,n)},o.enableClassExtend(e),o.enableClassManagement(e,{registerWhenExtend:!0}),e}),e("echarts/util/graphic",[ci,li,"zrender/tool/path","zrender/graphic/Path","zrender/tool/color",ai,ri,"zrender/graphic/Gradient","zrender/container/Group","zrender/graphic/Image","zrender/graphic/Text","zrender/graphic/shape/Circle","zrender/graphic/shape/Sector","zrender/graphic/shape/Ring","zrender/graphic/shape/Polygon","zrender/graphic/shape/Polyline","zrender/graphic/shape/Rect","zrender/graphic/shape/Line","zrender/graphic/shape/BezierCurve","zrender/graphic/shape/Arc","zrender/graphic/CompoundPath","zrender/graphic/LinearGradient","zrender/graphic/RadialGradient",p],function(t){function e(t){return null!=t&&"none"!=t
}function i(t){return typeof t===ei?L.lift(t,-.1):t}function n(t){if(t.__hoverStlDirty){var n=t.style[h],r=t.style.fill,a=t.__hoverStl;a.fill=a.fill||(e(r)?i(r):null),a[h]=a[h]||(e(n)?i(n):null);var o={};for(var s in a)a.hasOwnProperty(s)&&(o[s]=t.style[s]);t.__normalStl=o,t.__hoverStlDirty=!1}}function r(t){t.__isHover||(n(t),t.useHoverLayer?t.__zr&&t.__zr.addHover(t,t.__hoverStl):(t[be](t.__hoverStl),t.z2+=1),t.__isHover=!0)}function a(t){if(t.__isHover){var e=t.__normalStl;t.useHoverLayer?t.__zr&&t.__zr.removeHover(t):(e&&t[be](e),t.z2-=1),t.__isHover=!1}}function o(t){"group"===t.type?t[we](function(t){"group"!==t.type&&r(t)}):r(t)}function s(t){"group"===t.type?t[we](function(t){"group"!==t.type&&a(t)}):a(t)}function m(t,e){t.__hoverStl=t.hoverStyle||e||{},t.__hoverStlDirty=!0,t.__isHover&&n(t)}function v(){!this.__isEmphasis&&o(this)}function g(){!this.__isEmphasis&&s(this)}function y(){this.__isEmphasis=!0,o(this)}function _(){this.__isEmphasis=!1,s(this)}function b(t,e,i,n,r,a){typeof r===ge&&(a=r,r=null);var o=n&&(n.ifEnableAnimation?n.ifEnableAnimation():n[u](Ke));if(o){var s=t?"Update":"",l=n&&n[u]("animationDuration"+s),c=n&&n[u]("animationEasing"+s),h=n&&n[u]("animationDelay"+s);typeof h===ge&&(h=h(r)),l>0?e.animateTo(i,l,h||0,c,a):(e.attr(i),a&&a())}else e.attr(i),a&&a()}var w=t(li),M=t("zrender/tool/path"),C=Math.round,A=t("zrender/graphic/Path"),L=t("zrender/tool/color"),k=t(ai),D=t(ri),I=(t("zrender/graphic/Gradient"),{});return I.Group=t("zrender/container/Group"),I.Image=t("zrender/graphic/Image"),I.Text=t("zrender/graphic/Text"),I.Circle=t("zrender/graphic/shape/Circle"),I.Sector=t("zrender/graphic/shape/Sector"),I.Ring=t("zrender/graphic/shape/Ring"),I.Polygon=t("zrender/graphic/shape/Polygon"),I.Polyline=t("zrender/graphic/shape/Polyline"),I.Rect=t("zrender/graphic/shape/Rect"),I.Line=t("zrender/graphic/shape/Line"),I.BezierCurve=t("zrender/graphic/shape/BezierCurve"),I.Arc=t("zrender/graphic/shape/Arc"),I.CompoundPath=t("zrender/graphic/CompoundPath"),I.LinearGradient=t("zrender/graphic/LinearGradient"),I.RadialGradient=t("zrender/graphic/RadialGradient"),I.BoundingRect=t(p),I.extendShape=function(t){return A[Be](t)},I.extendPath=function(t,e){return M.extendFromString(t,e)},I.makePath=function(t,e,i,n){var r=M.createFromString(t,e),a=r[oe]();if(i){var o=a.width/a[We];if(n===re){var s,l=i[We]*o;l<=i.width?s=i[We]:(l=i.width,s=l/o);var c=i.x+i.width/2,u=i.y+i[We]/2;i.x=c-l/2,i.y=u-s/2,i.width=l,i[We]=s}this.resizePath(r,i)}return r},I.mergePath=M.mergePath,I.resizePath=function(t,e){if(t[d]){var i=t[oe](),n=i.calculateTransform(e);t[d](n)}},I.subPixelOptimizeLine=function(t){var e=I.subPixelOptimize,i=t.shape,n=t.style[f];return C(2*i.x1)===C(2*i.x2)&&(i.x1=i.x2=e(i.x1,n,!0)),C(2*i.y1)===C(2*i.y2)&&(i.y1=i.y2=e(i.y1,n,!0)),t},I.subPixelOptimizeRect=function(t){var e=I.subPixelOptimize,i=t.shape,n=t.style[f],r=i.x,a=i.y,o=i.width,s=i[We];return i.x=e(i.x,n,!0),i.y=e(i.y,n,!0),i.width=Math.max(e(r+o,n,!1)-i.x,0===o?0:1),i[We]=Math.max(e(a+s,n,!1)-i.y,0===s?0:1),t},I.subPixelOptimize=function(t,e,i){var n=C(2*t);return(n+C(e))%2===0?n/2:(n+(i?1:-1))/2},I[S]=function(t,e){"group"===t.type?t[we](function(t){"group"!==t.type&&m(t,e)}):m(t,e),t.on(Pe,v).on(Le,g),t.on(T,y).on(z,_)},I.setText=function(t,e,i){var n=e[u](ne)||"inside",r=n[pe]("inside")>=0?"white":i,a=e[Je](ue);w[Be](t,{textDistance:e[u]("distance")||5,textFont:a[le](),textPosition:n,textFill:a[se]()||r})},I[P]=function(t,e,i,n,r){b(!0,t,e,i,n,r)},I.initProps=function(t,e,i,n,r){b(!1,t,e,i,n,r)},I.getTransform=function(t,e){for(var i=k.identity([]);t&&t!==e;)k.mul(i,t[c](),i),t=t[l];return i},I[d]=function(t,e,i){return i&&(e=k.invert([],e)),D[d]([],t,e)},I.transformDirection=function(t,e,i){var n=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),r=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),a=["left"===t?-n:"right"===t?n:0,"top"===t?-r:t===Ze?r:0];return a=I[d](a,e,i),Math.abs(a[0])>Math.abs(a[1])?a[0]>0?"right":"left":a[1]>0?Ze:"top"},I.groupTransition=function(t,e,i){function n(t){var e={};return t[we](function(t){!t.isGroup&&t.anid&&(e[t.anid]=t)}),e}function r(t){var e={position:D.clone(t[ne]),rotation:t[x]};return t.shape&&(e.shape=w[Be]({},t.shape)),e}if(t&&e){var a=n(t);e[we](function(t){if(!t.isGroup&&t.anid){var e=a[t.anid];if(e){var n=r(t);t.attr(r(e)),I[P](t,n,i,t[Te])}}})}},I}),e("zrender/zrender",[ci,"./core/guid","./core/env","./Handler","./Storage","./animation/Animation","./dom/HandlerProxy","./Painter"],function(t){function e(t){delete u[t]}var i=t("./core/guid"),n=t("./core/env"),r=t("./Handler"),a=t("./Storage"),o=t("./animation/Animation"),s=t("./dom/HandlerProxy"),l=!n[je],c={canvas:t("./Painter")},u={},h={};h.version="3.1.3",h.init=function(t,e){var n=new f(i(),t,e);return u[n.id]=n,n},h.dispose=function(t){if(t)t.dispose();else{for(var e in u)u[e].dispose();u={}}return h},h.getInstance=function(t){return u[t]},h.registerPainter=function(t,e){c[t]=e};var f=function(t,e,i){i=i||{},this.dom=e,this.id=t;var u=this,h=new a,f=i.renderer;if(l){if(!c.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");f="vml"}else f&&c[f]||(f="canvas");var d=new c[f](e,h,i);this[Ye]=h,this.painter=d;var p=n.node?null:new s(d.getViewportRoot());this.handler=new r(h,d,p),this[Ke]=new o({stage:{update:function(){u._needsRefresh&&u.refreshImmediately(),u._needsRefreshHover&&u.refreshHoverImmediately()}}}),this[Ke].start(),this._needsRefresh;var m=h.delFromMap,v=h.addToMap;h.delFromMap=function(t){var e=h.get(t);m.call(h,t),e&&e.removeSelfFromZr(u)},h.addToMap=function(t){v.call(h,t),t.addSelfToZr(u)}};return f[ii]={constructor:f,getId:function(){return this.id},add:function(t){this[Ye].addRoot(t),this._needsRefresh=!0},remove:function(t){this[Ye].delRoot(t),this._needsRefresh=!0},configLayer:function(t,e){this.painter.configLayer(t,e),this._needsRefresh=!0},refreshImmediately:function(){this._needsRefresh=!1,this.painter.refresh(),this._needsRefresh=!1},refresh:function(){this._needsRefresh=!0},addHover:function(t,e){this.painter.addHover&&(this.painter.addHover(t,e),this.refreshHover())},removeHover:function(t){this.painter.removeHover&&(this.painter.removeHover(t),this.refreshHover())},clearHover:function(){this.painter.clearHover&&(this.painter.clearHover(),this.refreshHover())},refreshHover:function(){this._needsRefreshHover=!0},refreshHoverImmediately:function(){this._needsRefreshHover=!1,this.painter.refreshHover&&this.painter.refreshHover()},resize:function(){this.painter[ti](),this.handler[ti]()},clearAnimation:function(){this[Ke].clear()},getWidth:function(){return this.painter[Qe]()},getHeight:function(){return this.painter[$e]()},pathToImage:function(t,e,n){var r=i();return this.painter.pathToImage(r,t,e,n)},setCursorStyle:function(t){this.handler.setCursorStyle(t)},on:function(t,e,i){this.handler.on(t,e,i)},off:function(t,e){this.handler.off(t,e)},trigger:function(t,e){this.handler[Ie](t,e)},clear:function(){this[Ye].delRoot(),this.painter.clear()},dispose:function(){this[Ke].stop(),this.clear(),this[Ye].dispose(),this.painter.dispose(),this.handler.dispose(),this[Ke]=this[Ye]=this.painter=this.handler=null,e(this.id)}},h}),e("zrender/tool/color",[ci],function(){function t(t){return t=Math.round(t),0>t?0:t>255?255:t}function e(t){return t=Math.round(t),0>t?0:t>360?360:t}function i(t){return 0>t?0:t>1?1:t}function n(e){return t(e[Re]&&"%"===e.charAt(e[Re]-1)?parseFloat(e)/100*255:parseInt(e,10))}function r(t){return i(t[Re]&&"%"===t.charAt(t[Re]-1)?parseFloat(t)/100:parseFloat(t))}function a(t,e,i){return 0>i?i+=1:i>1&&(i-=1),1>6*i?t+(e-t)*i*6:1>2*i?e:2>3*i?t+(e-t)*(2/3-i)*6:t}function o(t,e,i){return t+(e-t)*i}function s(t){if(t){t+="";var e=t[xe](/ /g,"")[ni]();if(e in g)return g[e].slice();if("#"!==e.charAt(0)){var i=e[pe]("("),a=e[pe](")");if(-1!==i&&a+1===e[Re]){var o=e.substr(0,i),s=e.substr(i+1,a-(i+1)).split(","),c=1;switch(o){case"rgba":if(4!==s[Re])return;c=r(s.pop());case"rgb":if(3!==s[Re])return;return[n(s[0]),n(s[1]),n(s[2]),c];case"hsla":if(4!==s[Re])return;return s[3]=r(s[3]),l(s);case"hsl":if(3!==s[Re])return;return l(s);default:return}}}else{if(4===e[Re]){var u=parseInt(e.substr(1),16);if(!(u>=0&&4095>=u))return;return[(3840&u)>>4|(3840&u)>>8,240&u|(240&u)>>4,15&u|(15&u)<<4,1]}if(7===e[Re]){var u=parseInt(e.substr(1),16);if(!(u>=0&&16777215>=u))return;return[(16711680&u)>>16,(65280&u)>>8,255&u,1]}}}}function l(e){var i=(parseFloat(e[0])%360+360)%360/360,n=r(e[1]),o=r(e[2]),s=.5>=o?o*(n+1):o+n-o*n,l=2*o-s,c=[t(255*a(l,s,i+1/3)),t(255*a(l,s,i)),t(255*a(l,s,i-1/3))];return 4===e[Re]&&(c[3]=e[3]),c}function c(t){if(t){var e,i,n=t[0]/255,r=t[1]/255,a=t[2]/255,o=Math.min(n,r,a),s=Math.max(n,r,a),l=s-o,c=(s+o)/2;if(0===l)e=0,i=0;else{i=.5>c?l/(s+o):l/(2-s-o);var u=((s-n)/6+l/2)/l,h=((s-r)/6+l/2)/l,f=((s-a)/6+l/2)/l;n===s?e=f-h:r===s?e=1/3+u-f:a===s&&(e=2/3+h-u),0>e&&(e+=1),e>1&&(e-=1)}var d=[360*e,i,c];return null!=t[3]&&d.push(t[3]),d}}function u(t,e){var i=s(t);if(i){for(var n=0;3>n;n++)i[n]=0>e?i[n]*(1-e)|0:(255-i[n])*e+i[n]|0;return v(i,4===i[Re]?"rgba":"rgb")}}function h(t){var e=s(t);return e?((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1):void 0}function f(e,i,n){if(i&&i[Re]&&e>=0&&1>=e){n=n||[0,0,0,0];var r=e*(i[Re]-1),a=Math.floor(r),s=Math.ceil(r),l=i[a],c=i[s],u=r-a;return n[0]=t(o(l[0],c[0],u)),n[1]=t(o(l[1],c[1],u)),n[2]=t(o(l[2],c[2],u)),n[3]=t(o(l[3],c[3],u)),n}}function d(e,n,r){if(n&&n[Re]&&e>=0&&1>=e){var a=e*(n[Re]-1),l=Math.floor(a),c=Math.ceil(a),u=s(n[l]),h=s(n[c]),f=a-l,d=v([t(o(u[0],h[0],f)),t(o(u[1],h[1],f)),t(o(u[2],h[2],f)),i(o(u[3],h[3],f))],"rgba");return r?{color:d,leftIndex:l,rightIndex:c,value:a}:d}}function p(t,i,n,a){return t=s(t),t?(t=c(t),null!=i&&(t[0]=e(i)),null!=n&&(t[1]=r(n)),null!=a&&(t[2]=r(a)),v(l(t),"rgba")):void 0}function m(t,e){return t=s(t),t&&null!=e?(t[3]=i(e),v(t,"rgba")):void 0}function v(t,e){var i=t[0]+","+t[1]+","+t[2];return("rgba"===e||"hsva"===e||"hsla"===e)&&(i+=","+t[3]),e+"("+i+")"}var g={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};return{parse:s,lift:u,toHex:h,fastMapToColor:f,mapToColor:d,modifyHSL:p,modifyAlpha:m,stringify:v}}),e("echarts/model/Series",[ci,li,"../util/format","../util/model","./Component","./mixin/colorPalette",oi],function(t){var e=t(li),i=t("../util/format"),n=t("../util/model"),r=t("./Component"),a=t("./mixin/colorPalette"),o=t(oi),l=i.encodeHTML,c=i[X],h=r[Be]({type:"series.__base__",seriesIndex:0,coordinateSystem:null,defaultOption:null,legendDataProvider:null,visualColorAccessPath:"itemStyle.normal.color",init:function(t,e,i){this[Se]=this[N],this.mergeDefaultAndTheme(t,i),this._dataBeforeProcessed=this.getInitialData(t,i),this._data=this._dataBeforeProcessed.cloneShallow()},mergeDefaultAndTheme:function(t,i){e.merge(t,i.getTheme().get(this.subType)),e.merge(t,this.getDefaultOption()),n.defaultEmphasis(t.label,n.LABEL_OPTIONS),this.fillDataTextStyle(t.data)},mergeOption:function(t,i){t=e.merge(this[U],t,!0),this.fillDataTextStyle(t.data);var n=this.getInitialData(t,i);n&&(this._data=n,this._dataBeforeProcessed=n.cloneShallow())},fillDataTextStyle:function(t){if(t)for(var e=0;e<t[Re];e++)t[e]&&t[e].label&&n.defaultEmphasis(t[e].label,n.LABEL_OPTIONS)},getInitialData:function(){},getData:function(t){return null==t?this._data:this._data.getLinkedData(t)},setData:function(t){this._data=t},getRawData:function(){return this._dataBeforeProcessed},coordDimToDataDim:function(t){return[t]},dataDimToCoordDim:function(t){return t},getBaseAxis:function(){var t=this[he];return t&&t.getBaseAxis&&t.getBaseAxis()},formatTooltip:function(t,n){function r(t){return e.map(t,function(t,e){var r=a.getDimensionInfo(e),o=r&&r.type;return o===E?t:"time"===o?n?"":i.formatTime("yyyy/mm/dd hh:mm:ss",t):c(t)})[me](function(t){return!!t}).join(", ")}var a=this._data,o=this[H](t),s=e[ye](o)?r(o):c(o),u=a[F](t),h=a[C](t,"color"),f='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+h+'"></span>',d=this.name;return"\x00-"===d&&(d=""),n?f+l(this.name)+" : "+s:(d&&l(d)+"<br />")+f+(u?l(u)+" : "+s:s)},ifEnableAnimation:function(){if(o.node)return!1;var t=this[u](Ke);return t&&this[si]().count()>this[u]("animationThreshold")&&(t=!1),t},restoreData:function(){this._data=this._dataBeforeProcessed.cloneShallow()},getColorFromPalette:function(t,e){var i=this[s],n=a.getColorFromPalette.call(this,t,e);return n||(n=i.getColorFromPalette(t,e)),n},getAxisTooltipDataIndex:null});return e.mixin(h,n.dataFormatMixin),e.mixin(h,a),h}),e("echarts/preprocessor/backwardCompat",[ci,li,"./helper/compatStyle"],function(t){function e(t,e){e=e.split(",");for(var i=t,n=0;n<e[Re]&&(i=i&&i[e[n]],null!=i);n++);return i}function i(t,e,i,n){e=e.split(",");for(var r,a=t,o=0;o<e[Re]-1;o++)r=e[o],null==a[r]&&(a[r]={}),a=a[r];(n||null==a[e[o]])&&(a[e[o]]=i)}function n(t){c(o,function(e){e[0]in t&&!(e[1]in t)&&(t[e[1]]=t[e[0]])})}var r=t(li),a=t("./helper/compatStyle"),o=[["x","left"],["y","top"],["x2","right"],["y2",Ze]],s=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],l=["bar","boxplot","candlestick","chord","effectScatter","funnel","gauge","lines","graph","heatmap","line","map","parallel","pie","radar","sankey","scatter","treemap"],c=r.each;return function(t){c(t[De],function(t){if(r[Ge](t)){var o=t.type;if(a(t),("pie"===o||"gauge"===o)&&null!=t.clockWise&&(t.clockwise=t.clockWise),"gauge"===o){var s=e(t,"pointer.color");null!=s&&i(t,"itemStyle.normal.color",s)}for(var c=0;c<l[Re];c++)if(l[c]===t.type){n(t);break}}}),t.dataRange&&(t.visualMap=t.dataRange),c(s,function(e){var i=t[e];i&&(r[ye](i)||(i=[i]),c(i,function(t){n(t)}))})}}),e("echarts/visual/seriesColor",[ci,"zrender/graphic/Gradient"],function(t){var e=t("zrender/graphic/Gradient");return function(t){function i(i){var n=(i.visualColorAccessPath||"itemStyle.normal.color").split("."),r=i[si](),a=i.get(n)||i.getColorFromPalette(i.get("name"));r.setVisual("color",a),t.isSeriesFiltered(i)||(typeof a!==ge||a instanceof e||r.each(function(t){r.setItemVisual(t,"color",a(i[Me](t)))}),r.each(function(t){var e=r[q](t),i=e.get(n,!0);null!=i&&r.setItemVisual(t,"color",i)}))}t.eachRawSeries(i)}}),e("zrender/core/timsort",[],function(){function t(t){for(var e=0;t>=l;)e|=1&t,t>>=1;return t+e}function e(t,e,n,r){var a=e+1;if(a===n)return 1;if(r(t[a++],t[e])<0){for(;n>a&&r(t[a],t[a-1])<0;)a++;i(t,e,a)}else for(;n>a&&r(t[a],t[a-1])>=0;)a++;return a-e}function i(t,e,i){for(i--;i>e;){var n=t[e];t[e++]=t[i],t[i--]=n}}function n(t,e,i,n,r){for(n===e&&n++;i>n;n++){for(var a,o=t[n],s=e,l=n;l>s;)a=s+l>>>1,r(o,t[a])<0?l=a:s=a+1;var c=n-s;switch(c){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;c>0;)t[s+c]=t[s+c-1],c--}t[s]=o}}function r(t,e,i,n,r,a){var o=0,s=0,l=1;if(a(t,e[i+r])>0){for(s=n-r;s>l&&a(t,e[i+r+l])>0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s),o+=r,l+=r}else{for(s=r+1;s>l&&a(t,e[i+r-l])<=0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s);var c=o;o=r-l,l=r-c}for(o++;l>o;){var u=o+(l-o>>>1);a(t,e[i+u])>0?o=u+1:l=u}return l}function a(t,e,i,n,r,a){var o=0,s=0,l=1;if(a(t,e[i+r])<0){for(s=r+1;s>l&&a(t,e[i+r-l])<0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s);var c=o;o=r-l,l=r-c}else{for(s=n-r;s>l&&a(t,e[i+r+l])>=0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s),o+=r,l+=r}for(o++;l>o;){var u=o+(l-o>>>1);a(t,e[i+u])<0?l=u:o=u+1}return l}function o(t,e){function i(t,e){f[y]=t,d[y]=e,y+=1}function n(){for(;y>1;){var t=y-2;if(t>=1&&d[t-1]<=d[t]+d[t+1]||t>=2&&d[t-2]<=d[t]+d[t-1])d[t-1]<d[t+1]&&t--;else if(d[t]>d[t+1])break;s(t)}}function o(){for(;y>1;){var t=y-2;t>0&&d[t-1]<d[t+1]&&t--,s(t)}}function s(i){var n=f[i],o=d[i],s=f[i+1],c=d[i+1];d[i]=o+c,i===y-3&&(f[i+1]=f[i+2],d[i+1]=d[i+2]),y--;var u=a(t[s],t,n,o,0,e);n+=u,o-=u,0!==o&&(c=r(t[n+o-1],t,s,c,c-1,e),0!==c&&(c>=o?l(n,o,s,c):h(n,o,s,c)))}function l(i,n,o,s){var l=0;for(l=0;n>l;l++)x[l]=t[i+l];var u=0,h=o,f=i;if(t[f++]=t[h++],0!==--s){if(1===n){for(l=0;s>l;l++)t[f+l]=t[h+l];return void(t[f+s]=x[u])}for(var d,m,v,g=p;;){d=0,m=0,v=!1;do if(e(t[h],x[u])<0){if(t[f++]=t[h++],m++,d=0,0===--s){v=!0;break}}else if(t[f++]=x[u++],d++,m=0,1===--n){v=!0;break}while(g>(d|m));if(v)break;do{if(d=a(t[h],x,u,n,0,e),0!==d){for(l=0;d>l;l++)t[f+l]=x[u+l];if(f+=d,u+=d,n-=d,1>=n){v=!0;break}}if(t[f++]=t[h++],0===--s){v=!0;break}if(m=r(x[u],t,h,s,0,e),0!==m){for(l=0;m>l;l++)t[f+l]=t[h+l];if(f+=m,h+=m,s-=m,0===s){v=!0;break}}if(t[f++]=x[u++],1===--n){v=!0;break}g--}while(d>=c||m>=c);if(v)break;0>g&&(g=0),g+=2}if(p=g,1>p&&(p=1),1===n){for(l=0;s>l;l++)t[f+l]=t[h+l];t[f+s]=x[u]}else{if(0===n)throw new Error;for(l=0;n>l;l++)t[f+l]=x[u+l]}}else for(l=0;n>l;l++)t[f+l]=x[u+l]}function h(i,n,o,s){var l=0;for(l=0;s>l;l++)x[l]=t[o+l];var u=i+n-1,h=s-1,f=o+s-1,d=0,m=0;if(t[f--]=t[u--],0!==--n){if(1===s){for(f-=n,u-=n,m=f+1,d=u+1,l=n-1;l>=0;l--)t[m+l]=t[d+l];return void(t[f]=x[h])}for(var v=p;;){var g=0,y=0,_=!1;do if(e(x[h],t[u])<0){if(t[f--]=t[u--],g++,y=0,0===--n){_=!0;break}}else if(t[f--]=x[h--],y++,g=0,1===--s){_=!0;break}while(v>(g|y));if(_)break;do{if(g=n-a(x[h],t,i,n,n-1,e),0!==g){for(f-=g,u-=g,n-=g,m=f+1,d=u+1,l=g-1;l>=0;l--)t[m+l]=t[d+l];if(0===n){_=!0;break}}if(t[f--]=x[h--],1===--s){_=!0;break}if(y=s-r(t[u],x,0,s,s-1,e),0!==y){for(f-=y,h-=y,s-=y,m=f+1,d=h+1,l=0;y>l;l++)t[m+l]=x[d+l];if(1>=s){_=!0;break}}if(t[f--]=t[u--],0===--n){_=!0;break}v--}while(g>=c||y>=c);if(_)break;0>v&&(v=0),v+=2}if(p=v,1>p&&(p=1),1===s){for(f-=n,u-=n,m=f+1,d=u+1,l=n-1;l>=0;l--)t[m+l]=t[d+l];t[f]=x[h]}else{if(0===s)throw new Error;for(d=f-(s-1),l=0;s>l;l++)t[d+l]=x[l]}}else for(d=f-(s-1),l=0;s>l;l++)t[d+l]=x[l]}var f,d,p=c,m=0,v=u,g=0,y=0;m=t[Re],2*u>m&&(v=m>>>1);var x=[];g=120>m?5:1542>m?10:119151>m?19:40,f=[],d=[],this.mergeRuns=n,this.forceMergeRuns=o,this.pushRun=i}function s(i,r,a,s){a||(a=0),s||(s=i[Re]);var c=s-a;if(!(2>c)){var u=0;if(l>c)return u=e(i,a,s,r),void n(i,a,s,a+u,r);var h=new o(i,r),f=t(c);do{if(u=e(i,a,s,r),f>u){var d=c;d>f&&(d=f),n(i,a,a+d,a+u,r),u=d}h.pushRun(a,u),h.mergeRuns(),c-=u,a+=u}while(0!==c);h.forceMergeRuns()}}var l=32,c=7,u=256;return s}),e("echarts/loading/default",[ci,"../util/graphic",li],function(t){var e=t("../util/graphic"),i=t(li),n=Math.PI;return function(t,r){r=r||{},i[Oe](r,{text:"loading",color:"#c23531",textColor:"#000",maskColor:"rgba(255, 255, 255, 0.8)",zlevel:0});var a=new e.Rect({style:{fill:r.maskColor},zlevel:r[_e],z:1e4}),o=new e.Arc({shape:{startAngle:-n/2,endAngle:-n/2+.1,r:10},style:{stroke:r.color,lineCap:"round",lineWidth:5},zlevel:r[_e],z:10001}),s=new e.Rect({style:{fill:"none",text:r.text,textPosition:"right",textDistance:10,textFill:r.textColor},zlevel:r[_e],z:10001});o.animateShape(!0).when(1e3,{endAngle:3*n/2}).start("circularInOut"),o.animateShape(!0).when(1e3,{startAngle:3*n/2}).delay(300).start("circularInOut");var l=new e.Group;return l.add(o),l.add(s),l.add(a),l[ti]=function(){var e=t[Qe]()/2,i=t[$e]()/2;o.setShape({cx:e,cy:i});var n=o.shape.r;s.setShape({x:e-n,y:i-n,width:2*n,height:2*n}),a.setShape({x:0,y:0,width:t[Qe](),height:t[$e]()})},l[ti](),l}}),e("zrender/mixin/Eventful",[ci],function(){var t=Array[ii].slice,e=function(){this._$handlers={}};return e[ii]={constructor:e,one:function(t,e,i){var n=this._$handlers;if(!e||!t)return this;n[t]||(n[t]=[]);for(var r=0;r<n[t][Re];r++)if(n[t][r].h===e)return this;return n[t].push({h:e,one:!0,ctx:i||this}),this},on:function(t,e,i){var n=this._$handlers;if(!e||!t)return this;n[t]||(n[t]=[]);for(var r=0;r<n[t][Re];r++)if(n[t][r].h===e)return this;return n[t].push({h:e,one:!1,ctx:i||this}),this},isSilent:function(t){var e=this._$handlers;return e[t]&&e[t][Re]},off:function(t,e){var i=this._$handlers;if(!t)return this._$handlers={},this;if(e){if(i[t]){for(var n=[],r=0,a=i[t][Re];a>r;r++)i[t][r].h!=e&&n.push(i[t][r]);i[t]=n}i[t]&&0===i[t][Re]&&delete i[t]}else delete i[t];return this},trigger:function(e){if(this._$handlers[e]){var i=arguments,n=i[Re];n>3&&(i=t.call(i,1));for(var r=this._$handlers[e],a=r[Re],o=0;a>o;){switch(n){case 1:r[o].h.call(r[o].ctx);break;case 2:r[o].h.call(r[o].ctx,i[1]);break;case 3:r[o].h.call(r[o].ctx,i[1],i[2]);break;default:r[o].h.apply(r[o].ctx,i)}r[o].one?(r[ze](o,1),a--):o++}}return this},triggerWithContext:function(e){if(this._$handlers[e]){var i=arguments,n=i[Re];n>4&&(i=t.call(i,1,i[Re]-1));for(var r=i[i[Re]-1],a=this._$handlers[e],o=a[Re],s=0;o>s;){switch(n){case 1:a[s].h.call(r);break;case 2:a[s].h.call(r,i[1]);break;case 3:a[s].h.call(r,i[1],i[2]);break;default:a[s].h.apply(r,i)}a[s].one?(a[ze](s,1),o--):s++}}return this}},e}),e("echarts/data/List",[ci,"../model/Model","./DataDiffer",li,"../util/model"],function(t){function e(t){return h[ye](t)||(t=[t]),t}function i(t,e){var i=t[R],n=new v(h.map(i,t.getDimensionInfo,t),t.hostModel);m(n,t);for(var r=n._storage={},a=t._storage,o=0;o<i[Re];o++){var s=i[o],l=a[s];r[s]=h[pe](e,s)>=0?new l.constructor(a[s][Re]):a[s]}return n}var n=_,r=typeof window===_?global:window,a=typeof r.Float64Array===n?Array:r.Float64Array,o=typeof r.Int32Array===n?Array:r.Int32Array,l={"float":a,"int":o,ordinal:Array,number:Array,time:Array},c=t("../model/Model"),u=t("./DataDiffer"),h=t(li),f=t("../util/model"),d=h[Ge],p=["stackedOn","hasItemOption","_nameList","_idList","_rawData"],m=function(t,e){h.each(p[Q](e.__wrappedMethods||[]),function(i){e.hasOwnProperty(i)&&(t[i]=e[i])}),t.__wrappedMethods=e.__wrappedMethods},v=function(t,e){t=t||["x","y"];for(var i={},n=[],r=0;r<t[Re];r++){var a,o={};typeof t[r]===ei?(a=t[r],o={name:a,stackable:!1,type:"number"}):(o=t[r],a=o.name,o.type=o.type||ve),n.push(a),i[a]=o}this[R]=n,this._dimensionInfos=i,this.hostModel=e,this.dataType,this.indices=[],this._storage={},this._nameList=[],this._idList=[],this._optionModels=[],this.stackedOn=null,this._visual={},this._layout={},this._itemVisuals=[],this._itemLayouts=[],this._graphicEls=[],this._rawData,this._extent},g=v[ii];g.type="list",g.hasItemOption=!0,g.getDimension=function(t){return isNaN(t)||(t=this[R][t]||t),t},g.getDimensionInfo=function(t){return h.clone(this._dimensionInfos[this.getDimension(t)])},g[Z]=function(t,e,i){t=t||[],this._rawData=t;var n=this._storage={},r=this.indices=[],a=this[R],o=t[Re],s=this._dimensionInfos,c=[],u={};e=e||[];for(var h=0;h<a[Re];h++){var d=s[a[h]],p=l[d.type];n[a[h]]=new p(o)}var m=this;i||(m.hasItemOption=!1),i=i||function(t,e,i,n){var r=f.getDataItemValue(t);return f.isDataItemOption(t)&&(m.hasItemOption=!0),f.converDataValue(r instanceof Array?r[n]:r,s[e])};for(var v=0;v<t[Re];v++){for(var g=t[v],y=0;y<a[Re];y++){var x=a[y],_=n[x];_[v]=i(g,x,v,y)}r.push(v)}for(var h=0;h<t[Re];h++){e[h]||t[h]&&null!=t[h].name&&(e[h]=t[h].name);var b=e[h]||"",w=t[h]&&t[h].id;!w&&b&&(u[b]=u[b]||0,w=b,u[b]>0&&(w+="__ec__"+u[b]),u[b]++),w&&(c[h]=w)}this._nameList=e,this._idList=c},g.count=function(){return this.indices[Re]},g.get=function(t,e,i){var n=this._storage,r=this.indices[e];if(null==r)return 0/0;var a=n[t]&&n[t][r];if(i){var o=this._dimensionInfos[t];if(o&&o.stackable)for(var s=this.stackedOn;s;){var l=s.get(t,e);(a>=0&&l>0||0>=a&&0>l)&&(a+=l),s=s.stackedOn}}return a},g.getValues=function(t,e,i){var n=[];h[ye](t)||(i=e,e=t,t=this[R]);for(var r=0,a=t[Re];a>r;r++)n.push(this.get(t[r],e,i));return n},g.hasValue=function(t){for(var e=this[R],i=this._dimensionInfos,n=0,r=e[Re];r>n;n++)if(i[e[n]].type!==E&&isNaN(this.get(e[n],t)))return!1;return!0},g[B]=function(t,e){t=this.getDimension(t);var i=this._storage[t],n=this.getDimensionInfo(t);e=n&&n.stackable&&e;var r,a=(this._extent||(this._extent={}))[t+!!e];if(a)return a;if(i){for(var o=1/0,s=-1/0,l=0,c=this.count();c>l;l++)r=this.get(t,l,e),o>r&&(o=r),r>s&&(s=r);return this._extent[t+!!e]=[o,s]}return[1/0,-1/0]},g.getSum=function(t,e){var i=this._storage[t],n=0;if(i)for(var r=0,a=this.count();a>r;r++){var o=this.get(t,r,e);isNaN(o)||(n+=o)}return n},g[pe]=function(t,e){var i=this._storage,n=i[t],r=this.indices;if(n)for(var a=0,o=r[Re];o>a;a++){var s=r[a];if(n[s]===e)return a}return-1},g.indexOfName=function(t){for(var e=this.indices,i=this._nameList,n=0,r=e[Re];r>n;n++){var a=e[n];if(i[a]===t)return n}return-1},g.indexOfRawIndex=function(t){for(var e=this.indices,i=0,n=e[Re]-1;n>=i;){var r=(i+n)/2|0;if(e[r]<t)i=r+1;else{if(!(e[r]>t))return r;n=r-1}}return-1},g.indexOfNearest=function(t,e,i,n){var r=this._storage,a=r[t];null==n&&(n=1/0);var o=-1;if(a)for(var s=Number.MAX_VALUE,l=0,c=this.count();c>l;l++){var u=e-this.get(t,l,i),h=Math.abs(u);n>=u&&(s>h||h===s&&u>0)&&(s=h,o=l)}return o},g.getRawIndex=function(t){var e=this.indices[t];return null==e?-1:e},g.getRawDataItem=function(t){return this._rawData[this.getRawIndex(t)]},g[F]=function(t){return this._nameList[this.indices[t]]||""},g.getId=function(t){return this._idList[this.indices[t]]||this.getRawIndex(t)+""},g.each=function(t,i,n,r){typeof t===ge&&(r=n,n=i,i=t,t=[]),t=h.map(e(t),this.getDimension,this);var a=[],o=t[Re],s=this.indices;r=r||this;for(var l=0;l<s[Re];l++)switch(o){case 0:i.call(r,l);break;case 1:i.call(r,this.get(t[0],l,n),l);break;case 2:i.call(r,this.get(t[0],l,n),this.get(t[1],l,n),l);break;default:for(var c=0;o>c;c++)a[c]=this.get(t[c],l,n);a[c]=l,i.apply(r,a)}},g.filterSelf=function(t,i,n,r){typeof t===ge&&(r=n,n=i,i=t,t=[]),t=h.map(e(t),this.getDimension,this);var a=[],o=[],s=t[Re],l=this.indices;r=r||this;for(var c=0;c<l[Re];c++){var u;if(1===s)u=i.call(r,this.get(t[0],c,n),c);else{for(var f=0;s>f;f++)o[f]=this.get(t[f],c,n);o[f]=c,u=i.apply(r,o)}u&&a.push(l[c])}return this.indices=a,this._extent={},this},g.mapArray=function(t,e,i,n){typeof t===ge&&(n=i,i=e,e=t,t=[]);var r=[];return this.each(t,function(){r.push(e&&e.apply(this,arguments))},i,n),r},g.map=function(t,n,r,a){t=h.map(e(t),this.getDimension,this);var o=i(this,t),s=o.indices=this.indices,l=o._storage,c=[];return this.each(t,function(){var e=arguments[arguments[Re]-1],i=n&&n.apply(this,arguments);if(null!=i){typeof i===ve&&(c[0]=i,i=c);for(var r=0;r<i[Re];r++){var a=t[r],o=l[a],u=s[e];o&&(o[u]=i[r])}}},r,a),o},g.downSample=function(t,e,n,r){for(var a=i(this,[t]),o=this._storage,s=a._storage,l=this.indices,c=a.indices=[],u=[],h=[],f=Math.floor(1/e),d=s[t],p=this.count(),m=0;m<o[t][Re];m++)s[t][m]=o[t][m];for(var m=0;p>m;m+=f){f>p-m&&(f=p-m,u[Re]=f);for(var v=0;f>v;v++){var g=l[m+v];u[v]=d[g],h[v]=g}var y=n(u),g=h[r(u,y)||0];d[g]=y,c.push(g)}return a},g[q]=function(t){var e=this.hostModel;return t=this.indices[t],new c(this._rawData[t],e,e&&e[s])},g.diff=function(t){var e=this._idList,i=t&&t._idList;return new u(t?t.indices:[],this.indices,function(t){return i[t]||t+""},function(t){return e[t]||t+""})},g.getVisual=function(t){var e=this._visual;return e&&e[t]},g.setVisual=function(t,e){if(d(t))for(var i in t)t.hasOwnProperty(i)&&this.setVisual(i,t[i]);else this._visual=this._visual||{},this._visual[t]=e},g.setLayout=function(t,e){if(d(t))for(var i in t)t.hasOwnProperty(i)&&this.setLayout(i,t[i]);else this._layout[t]=e},g.getLayout=function(t){return this._layout[t]},g[k]=function(t){return this._itemLayouts[t]},g.setItemLayout=function(t,e,i){this._itemLayouts[t]=i?h[Be](this._itemLayouts[t]||{},e):e},g.clearItemLayouts=function(){this._itemLayouts[Re]=0},g[C]=function(t,e,i){var n=this._itemVisuals[t],r=n&&n[e];return null!=r||i?r:this.getVisual(e)},g.setItemVisual=function(t,e,i){var n=this._itemVisuals[t]||{};if(this._itemVisuals[t]=n,d(e))for(var r in e)e.hasOwnProperty(r)&&(n[r]=e[r]);else n[e]=i},g.clearAllVisual=function(){this._visual={},this._itemVisuals=[]};var y=function(t){t[Se]=this[Se],t[Te]=this[Te],t.dataType=this.dataType};return g.setItemGraphicEl=function(t,e){var i=this.hostModel;e&&(e[Te]=t,e.dataType=this.dataType,e[Se]=i&&i[Se],"group"===e.type&&e[we](y,e)),this._graphicEls[t]=e},g[L]=function(t){return this._graphicEls[t]},g[A]=function(t,e){h.each(this._graphicEls,function(i,n){i&&t&&t.call(e,i,n)})},g.cloneShallow=function(){var t=h.map(this[R],this.getDimensionInfo,this),e=new v(t,this.hostModel);return e._storage=this._storage,m(e,this),e.indices=this.indices.slice(),this._extent&&(e._extent=h[Be]({},this._extent)),e},g.wrapMethod=function(t,e){var i=this[t];typeof i===ge&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=i.apply(this,arguments);return e.apply(this,[t][Q](h.slice(arguments)))})},g.TRANSFERABLE_METHODS=["cloneShallow","downSample","map"],g.CHANGABLE_METHODS=["filterSelf"],v}),e("echarts/model/Model",[ci,li,"../util/clazz","./mixin/lineStyle","./mixin/areaStyle","./mixin/textStyle","./mixin/itemStyle"],function(t){function e(t,e,i){this.parentModel=e,this[s]=i,this[U]=t
}var i=t(li),n=t("../util/clazz");e[ii]={constructor:e,init:null,mergeOption:function(t){i.merge(this[U],t,!0)},get:function(t,e){if(!t)return this[U];typeof t===ei&&(t=t.split("."));for(var i=this[U],n=this.parentModel,r=0;r<t[Re]&&(!t[r]||(i=i&&"object"==typeof i?i[t[r]]:null,null!=i));r++);return null==i&&n&&!e&&(i=n.get(t)),i},getShallow:function(t,e){var i=this[U],n=null==i?i:i[t],r=this.parentModel;return null==n&&r&&!e&&(n=r[u](t)),n},getModel:function(t,i){var n=this.get(t,!0),r=this.parentModel,a=new e(n,i||r&&r[Je](t),this[s]);return a},isEmpty:function(){return null==this[U]},restoreData:function(){},clone:function(){var t=this.constructor;return new t(i.clone(this[U]))},setReadOnly:function(t){n.setReadOnly(this,t)}},n.enableClassExtend(e);var r=i.mixin;return r(e,t("./mixin/lineStyle")),r(e,t("./mixin/areaStyle")),r(e,t("./mixin/textStyle")),r(e,t("./mixin/itemStyle")),e}),e("echarts/util/number",[ci],function(){function t(t){return t[xe](/^\s+/,"")[xe](/\s+$/,"")}var e={},i=1e-4;return e.linearMap=function(t,e,i,n){var r=e[1]-e[0],a=i[1]-i[0];if(0===r)return 0===a?i[0]:(i[0]+i[1])/2;if(n)if(r>0){if(t<=e[0])return i[0];if(t>=e[1])return i[1]}else{if(t>=e[0])return i[0];if(t<=e[1])return i[1]}else{if(t===e[0])return i[0];if(t===e[1])return i[1]}return(t-e[0])/r*a+i[0]},e[M]=function(e,i){switch(e){case re:case ae:e="50%";break;case"left":case"top":e="0%";break;case"right":case Ze:e="100%"}return typeof e===ei?t(e).match(/%$/)?parseFloat(e)/100*i:parseFloat(e):null==e?0/0:+e},e.round=function(t,e){return null==e&&(e=10),+(+t).toFixed(e)},e.asc=function(t){return t.sort(function(t,e){return t-e}),t},e.getPrecision=function(t){if(t=+t,isNaN(t))return 0;for(var e=1,i=0;Math.round(t*e)/e!==t;)e*=10,i++;return i},e.getPrecisionSafe=function(t){var e=t.toString(),i=e[pe](".");return 0>i?0:e[Re]-1-i},e.getPixelPrecision=function(t,e){var i=Math.log,n=Math.LN10,r=Math.floor(i(t[1]-t[0])/n),a=Math.round(i(Math.abs(e[1]-e[0]))/n);return Math.max(-r+a,0)},e.MAX_SAFE_INTEGER=9007199254740991,e.remRadian=function(t){var e=2*Math.PI;return(t%e+e)%e},e.isRadianAroundZero=function(t){return t>-i&&i>t},e.parseDate=function(t){if(t instanceof Date)return t;if(typeof t===ei){var e=new Date(t);return isNaN(+e)&&(e=new Date(new Date(t[xe](/-/g,"/"))-new Date("1970/01/01"))),e}return new Date(Math.round(t))},e.quantity=function(t){return Math.pow(10,Math.floor(Math.log(t)/Math.LN10))},e.nice=function(t,i){var n,r=e.quantity(t),a=t/r;return n=i?1.5>a?1:2.5>a?2:4>a?3:7>a?5:10:1>a?1:2>a?2:3>a?3:5>a?5:10,n*r},e}),e("echarts/util/format",[ci,li,"./number","zrender/contain/text"],function(t){var e=t(li),i=t("./number"),n=t("zrender/contain/text"),r={};r[X]=function(t){return isNaN(t)?"-":(t=(t+"").split("."),t[0][xe](/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(t[Re]>1?"."+t[1]:""))},r.toCamelCase=function(t){return t[ni]()[xe](/-(.)/g,function(t,e){return e.toUpperCase()})},r.normalizeCssArray=function(t){var e=t[Re];return typeof t===ve?[t,t,t,t]:2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t},r.encodeHTML=function(t){return String(t)[xe](/&/g,"&amp;")[xe](/</g,"&lt;")[xe](/>/g,"&gt;")[xe](/"/g,"&quot;")[xe](/'/g,"&#39;")};var a=["a","b","c","d","e","f","g"],o=function(t,e){return"{"+t+(null==e?"":e)+"}"};r.formatTpl=function(t,i){e[ye](i)||(i=[i]);var n=i[Re];if(!n)return"";for(var r=i[0].$vars||[],s=0;s<r[Re];s++){var l=a[s];t=t[xe](o(l),o(l,0))}for(var c=0;n>c;c++)for(var u=0;u<r[Re];u++)t=t[xe](o(a[u],c),i[c][r[u]]);return t};var s=function(t){return 10>t?"0"+t:t};return r.formatTime=function(t,e){("week"===t||"month"===t||"quarter"===t||"half-year"===t||"year"===t)&&(t="MM-dd\nyyyy");var n=i.parseDate(e),r=n.getFullYear(),a=n.getMonth()+1,o=n.getDate(),l=n.getHours(),c=n.getMinutes(),u=n.getSeconds();return t=t[xe]("MM",s(a))[ni]()[xe]("yyyy",r)[xe]("yy",r%100)[xe]("dd",s(o))[xe]("d",o)[xe]("hh",s(l))[xe]("h",l)[xe]("mm",s(c))[xe]("m",c)[xe]("ss",s(u))[xe]("s",u)},r.capitalFirst=function(t){return t?t.charAt(0).toUpperCase()+t.substr(1):t},r.truncateText=n.truncateText,r}),e(ai,[],function(){var t=typeof Float32Array===_?Array:Float32Array,e={create:function(){var i=new t(6);return e.identity(i),i},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},copy:function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t},mul:function(t,e,i){var n=e[0]*i[0]+e[2]*i[1],r=e[1]*i[0]+e[3]*i[1],a=e[0]*i[2]+e[2]*i[3],o=e[1]*i[2]+e[3]*i[3],s=e[0]*i[4]+e[2]*i[5]+e[4],l=e[1]*i[4]+e[3]*i[5]+e[5];return t[0]=n,t[1]=r,t[2]=a,t[3]=o,t[4]=s,t[5]=l,t},translate:function(t,e,i){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+i[0],t[5]=e[5]+i[1],t},rotate:function(t,e,i){var n=e[0],r=e[2],a=e[4],o=e[1],s=e[3],l=e[5],c=Math.sin(i),u=Math.cos(i);return t[0]=n*u+o*c,t[1]=-n*c+o*u,t[2]=r*u+s*c,t[3]=-r*c+u*s,t[4]=u*a+c*l,t[5]=u*l-c*a,t},scale:function(t,e,i){var n=i[0],r=i[1];return t[0]=e[0]*n,t[1]=e[1]*r,t[2]=e[2]*n,t[3]=e[3]*r,t[4]=e[4]*n,t[5]=e[5]*r,t},invert:function(t,e){var i=e[0],n=e[2],r=e[4],a=e[1],o=e[3],s=e[5],l=i*o-a*n;return l?(l=1/l,t[0]=o*l,t[1]=-a*l,t[2]=-n*l,t[3]=i*l,t[4]=(n*s-o*r)*l,t[5]=(a*r-i*s)*l,t):null}};return e}),e(ri,[],function(){var t=typeof Float32Array===_?Array:Float32Array,e={create:function(e,i){var n=new t(2);return null==e&&(e=0),null==i&&(i=0),n[0]=e,n[1]=i,n},copy:function(t,e){return t[0]=e[0],t[1]=e[1],t},clone:function(e){var i=new t(2);return i[0]=e[0],i[1]=e[1],i},set:function(t,e,i){return t[0]=e,t[1]=i,t},add:function(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t},scaleAndAdd:function(t,e,i,n){return t[0]=e[0]+i[0]*n,t[1]=e[1]+i[1]*n,t},sub:function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t},len:function(t){return Math.sqrt(this.lenSquare(t))},lenSquare:function(t){return t[0]*t[0]+t[1]*t[1]},mul:function(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t},div:function(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t},dot:function(t,e){return t[0]*e[0]+t[1]*e[1]},scale:function(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t},normalize:function(t,i){var n=e.len(i);return 0===n?(t[0]=0,t[1]=0):(t[0]=i[0]/n,t[1]=i[1]/n),t},distance:function(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]))},distanceSquare:function(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1])},negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t},lerp:function(t,e,i,n){return t[0]=e[0]+n*(i[0]-e[0]),t[1]=e[1]+n*(i[1]-e[1]),t},applyTransform:function(t,e,i){var n=e[0],r=e[1];return t[0]=i[0]*n+i[2]*r+i[4],t[1]=i[1]*n+i[3]*r+i[5],t},min:function(t,e,i){return t[0]=Math.min(e[0],i[0]),t[1]=Math.min(e[1],i[1]),t},max:function(t,e,i){return t[0]=Math.max(e[0],i[0]),t[1]=Math.max(e[1],i[1]),t}};return e[Re]=e.len,e.lengthSquare=e.lenSquare,e.dist=e.distance,e.distSquare=e.distanceSquare,e}),e("echarts/component/axis",[ci,"../coord/cartesian/AxisModel","./axis/AxisView"],function(t){t("../coord/cartesian/AxisModel"),t("./axis/AxisView")}),e("echarts/component/angleAxis",[ci,"../coord/polar/polarCreator","./axis/AngleAxisView"],function(t){t("../coord/polar/polarCreator"),t("./axis/AngleAxisView")}),e("echarts/coord/polar/polarCreator",[ci,"./Polar",b,li,"../../coord/axisHelper","./PolarModel","../../CoordinateSystem"],function(t){function e(t,e){var i=t.get(re),n=t.get(v),r=e[Qe](),o=e[$e](),s=a[M];this.cx=s(i[0],r),this.cy=s(i[1],o);var l=this.getRadiusAxis(),c=Math.min(r,o)/2;l.setExtent(0,s(n,c))}function i(t){var e=this,i=e.getAngleAxis(),n=e.getRadiusAxis();if(i.scale.setExtent(1/0,-1/0),n.scale.setExtent(1/0,-1/0),t[Fe](function(t){if(t[he]===e){var r=t[si]();n.scale.unionExtent(r[B](v,n.type!==V)),i.scale.unionExtent(r[B]("angle",i.type!==V))}}),s(i,i.model),s(n,n.model),i.type===V&&!i.onBand){var r=i[K](),a=360/i.scale.count();i.inverse?r[1]+=a:r[1]-=a,i.setExtent(r[0],r[1])}}function n(t,e){if(t.type=e.get("type"),t.scale=o.createScaleByModel(e),t.onBand=e.get("boundaryGap")&&t.type===V,"angleAxis"===e[m]){var i=e.get("startAngle");t.inverse=e.get("inverse")^e.get("clockwise"),t.setExtent(i,i+(t.inverse?-360:360))}e.axis=t,t.model=e}var r=t("./Polar"),a=t(b),o=(t(li),t("../../coord/axisHelper")),s=o.niceScaleExtent;t("./PolarModel");var l={dimensions:r[ii][R],create:function(t,a){var o=[];return t[Xe]("polar",function(t,s){var l=new r(s);l[ti]=e,l[He]=i;var c=l.getRadiusAxis(),u=l.getAngleAxis(),h=t.findAxisModel("radiusAxis"),f=t.findAxisModel("angleAxis");n(c,h),n(u,f),l[ti](t,a),o.push(l),t[he]=l}),t[Fe](function(e){if("polar"===e.get(he)){var i=t.queryComponents({mainType:"polar",index:e.get("polarIndex"),id:e.get("polarId")})[0];e[he]=i[he]}}),o}};t("../../CoordinateSystem").register("polar",l)}),e("echarts/component/radiusAxis",[ci,"../coord/polar/polarCreator","./axis/RadiusAxisView"],function(t){t("../coord/polar/polarCreator"),t("./axis/RadiusAxisView")}),e("echarts/component/tooltip/TooltipModel",[ci,D],function(t){t(D).extendComponentModel({type:"tooltip",defaultOption:{zlevel:0,z:8,show:!0,showContent:!0,trigger:"item",triggerOn:"mousemove",alwaysShowContent:!1,showDelay:0,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"rgba(50,50,50,0.7)",borderColor:"#333",borderRadius:4,borderWidth:0,padding:5,extraCssText:"",axisPointer:{type:"line",axis:"auto",animation:!0,animationDurationUpdate:200,animationEasingUpdate:"exponentialOut",lineStyle:{color:"#555",width:1,type:"solid"},crossStyle:{color:"#555",width:1,type:"dashed",textStyle:{}},shadowStyle:{color:"rgba(150,150,150,0.3)"}},textStyle:{color:"#fff",fontSize:14}}})}),e("echarts/component/legend/legendAction",[ci,D,li],function(t){function e(t,e,i){var r,a={},o="toggleSelected"===t;return i[Xe]("legend",function(i){o&&null!=r?i[r?"select":"unSelect"](e.name):(i[t](e.name),r=i.isSelected(e.name));var s=i[si]();n.each(s,function(t){var e=t.get("name");if("\n"!==e&&""!==e){var n=i.isSelected(e);a[e]=e in a?a[e]&&n:n}})}),{name:e.name,selected:a}}var i=t(D),n=t(li);i.registerAction("legendToggleSelect","legendselectchanged",n.curry(e,"toggleSelected")),i.registerAction("legendSelect","legendselected",n.curry(e,"select")),i.registerAction("legendUnSelect","legendunselected",n.curry(e,"unSelect"))}),e("echarts/component/legend/LegendModel",[ci,li,"../../model/Model",D],function(t){var e=t(li),i=t("../../model/Model"),n=t(D).extendComponentModel({type:"legend",dependencies:[De],layoutMode:{type:"box",ignoreSize:!0},init:function(t,e,i){this.mergeDefaultAndTheme(t,i),t.selected=t.selected||{}},mergeOption:function(t){n.superCall(this,W,t)},optionUpdated:function(){this._updateData(this[s]);var t=this._data;if(t[0]&&"single"===this.get("selectedMode")){for(var e=!1,i=0;i<t[Re];i++){var n=t[i].get("name");if(this.isSelected(n)){this.select(n),e=!0;break}}!e&&this.select(t[0].get("name"))}},_updateData:function(t){var n=e.map(this.get("data")||[],function(t){return(typeof t===ei||typeof t===ve)&&(t={name:t}),new i(t,this,this[s])},this);this._data=n;var r=e.map(t.getSeries(),function(t){return t.name});t[Fe](function(t){if(t.legendDataProvider){var e=t.legendDataProvider();r=r[Q](e.mapArray(e[F]))}}),this._availableNames=r},getData:function(){return this._data},select:function(t){var i=this[U].selected,n=this.get("selectedMode");if("single"===n){var r=this._data;e.each(r,function(t){i[t.get("name")]=!1})}i[t]=!0},unSelect:function(t){"single"!==this.get("selectedMode")&&(this[U].selected[t]=!1)},toggleSelected:function(t){var e=this[U].selected;t in e||(e[t]=!0),this[e[t]?"unSelect":"select"](t)},isSelected:function(t){var i=this[U].selected;return!(t in i&&!i[t])&&e[pe](this._availableNames,t)>=0},defaultOption:{zlevel:0,z:4,show:!0,orient:"horizontal",left:"center",top:"top",align:"auto",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemWidth:25,itemHeight:14,inactiveColor:"#ccc",textStyle:{color:"#333"},selectedMode:!0,tooltip:{show:!1}}});return n}),e("echarts/component/legend/legendFilter",[],function(){return function(t){var e=t.findComponents({mainType:"legend"});e&&e[Re]&&t.filterSeries(function(t){for(var i=0;i<e[Re];i++)if(!e[i].isSelected(t.name))return!1;return!0})}}),e("echarts/component/legend/LegendView",[ci,li,"../../util/symbol",I,"../helper/listComponent",D],function(t){function e(t,e){e[Ee]({type:"legendToggleSelect",name:t})}function i(t,e,i){var n=i.getZr()[Ye].getDisplayList()[0];n&&n.useHoverLayer||t.get("legendHoverLink")&&i[Ee]({type:"highlight",seriesName:t.name,name:e})}function n(t,e,i){var n=i.getZr()[Ye].getDisplayList()[0];n&&n.useHoverLayer||t.get("legendHoverLink")&&i[Ee]({type:"downplay",seriesName:t.name,name:e})}var r=t(li),a=t("../../util/symbol"),o=t(I),s=t("../helper/listComponent"),l=r.curry;return t(D).extendComponentView({type:"legend",init:function(){this._symbolTypeStore={}},render:function(t,a,c){var u=this.group;if(u[fe](),t.get("show")){var h=t.get("selectedMode"),f=t.get("align");"auto"===f&&(f="right"===t.get("left")&&"vertical"===t.get("orient")?"right":"left");var d={};r.each(t[si](),function(r){var s=r.get("name");if(""===s||"\n"===s)return void u.add(new o.Group({newline:!0}));var p=a.getSeriesByName(s)[0];if(!d[s])if(p){var m=p[si](),v=m.getVisual("color");typeof v===ge&&(v=v(p[Me](0)));var g=m.getVisual("legendSymbol")||"roundRect",y=m.getVisual("symbol"),x=this._createItem(s,r,t,g,y,f,v,h);x.on("click",l(e,s,c)).on(Pe,l(i,p,"",c)).on(Le,l(n,p,"",c)),d[s]=!0}else a.eachRawSeries(function(a){if(!d[s]&&a.legendDataProvider){var o=a.legendDataProvider(),u=o.indexOfName(s);if(0>u)return;var p=o[C](u,"color"),m="roundRect",v=this._createItem(s,r,t,m,null,f,p,h);v.on("click",l(e,s,c)).on(Pe,l(i,a,s,c)).on(Le,l(n,a,s,c)),d[s]=!0}},this)},this),s.layout(u,t,c),s.addBackground(u,t)}},_createItem:function(t,e,i,n,s,l,c,u){var h=i.get("itemWidth"),f=i.get("itemHeight"),d=i.get("inactiveColor"),p=i.isSelected(t),m=new o.Group,v=e[Je](ue),g=e.get("icon"),y=e[Je]("tooltip");if(n=g||n,m.add(a.createSymbol(n,0,0,h,f,p?c:d)),!g&&s&&(s!==n||"none"==s)){var x=.8*f;"none"===s&&(s="circle"),m.add(a.createSymbol(s,(h-x)/2,(f-x)/2,x,x,p?c:d))}var _="left"===l?h+5:-5,b=l,w=i.get("formatter"),M=t;typeof w===ei&&w?M=w[xe]("{name}",t):typeof w===ge&&(M=w(t));var T=new o.Text({style:{text:M,x:_,y:f/2,fill:p?v[se]():d,textFont:v[le](),textAlign:b,textVerticalAlign:"middle"}});m.add(T);var C=new o.Rect({shape:m[oe](),invisible:!0,tooltip:y.get("show")?r[Be]({content:t,formatter:function(){return t},formatterParams:{componentType:"legend",legendIndex:i[N],name:t,$vars:["name"]}},y[U]):null});return m.add(C),m.eachChild(function(t){t[ke]=!0}),C[ke]=!u,this.group.add(m),o[S](m),m}})}),e("echarts/coord/geo/GeoModel",[ci,g,o,"../../model/Model",li,"../../component/helper/selectableMixin","./geoCreator"],function(t){var e=t(g),i=t(o),n=t("../../model/Model"),r=t(li),a=t("../../component/helper/selectableMixin"),s=t("./geoCreator"),l=i[Be]({type:"geo",coordinateSystem:null,layoutMode:"box",init:function(t){i[ii].init.apply(this,arguments),e.defaultEmphasis(t.label,[ne,"show",ue,"distance","formatter"])},optionUpdated:function(){var t=this[U],e=this;t.regions=s.getFilledRegions(t.regions,t.map),this._optionModelMap=r.reduce(t.regions||[],function(t,i){return i.name&&(t[i.name]=new n(i,e)),t},{}),this.updateSelectedMap(t.regions)},defaultOption:{zlevel:0,z:0,show:!0,left:"center",top:"center",aspectScale:.75,silent:!1,map:"",center:null,zoom:1,scaleLimit:null,label:{normal:{show:!1,textStyle:{color:"#000"}},emphasis:{show:!0,textStyle:{color:"rgb(100,0,0)"}}},itemStyle:{normal:{borderWidth:.5,borderColor:"#444",color:"#eee"},emphasis:{color:"rgba(255,215,0,0.8)"}},regions:[]},getRegionModel:function(t){return this._optionModelMap[t]},getFormattedLabel:function(t,e){var i=this.get("label."+e+".formatter"),n={name:t};return typeof i===ge?(n.status=e,i(n)):typeof i===ei?i[xe]("{a}",n.seriesName):void 0},setZoom:function(t){this[U].zoom=t},setCenter:function(t){this[U][re]=t}});return r.mixin(l,a),l}),e("echarts/util/layout",[ci,li,p,"./number","./format"],function(t){function e(t,e,i,n,r){var a=0,o=0;null==n&&(n=1/0),null==r&&(r=1/0);var s=0;e.eachChild(function(l,c){var u,h,f=l[ne],d=l[oe](),p=e.childAt(c+1),m=p&&p[oe]();if("horizontal"===t){var v=d.width+(m?-m.x+d.x:0);u=a+v,u>n||l.newline?(a=0,u=v,o+=s+i,s=d[We]):s=Math.max(s,d[We])}else{var g=d[We]+(m?-m.y+d.y:0);h=o+g,h>r||l.newline?(a+=s+i,o=0,h=g,s=d.width):s=Math.max(s,d.width)}l.newline||(f[0]=a,f[1]=o,"horizontal"===t?a=u+i:o=h+i)})}var i=t(li),n=t(p),r=t("./number"),a=t("./format"),o=r[M],s=i.each,l={},c=["left","right","top",Ze,"width",We];return l.box=e,l.vbox=i.curry(e,"vertical"),l.hbox=i.curry(e,"horizontal"),l.getAvailableSize=function(t,e,i){var n=e.width,r=e[We],s=o(t.x,n),l=o(t.y,r),c=o(t.x2,n),u=o(t.y2,r);return(isNaN(s)||isNaN(parseFloat(t.x)))&&(s=0),(isNaN(c)||isNaN(parseFloat(t.x2)))&&(c=n),(isNaN(l)||isNaN(parseFloat(t.y)))&&(l=0),(isNaN(u)||isNaN(parseFloat(t.y2)))&&(u=r),i=a.normalizeCssArray(i||0),{width:Math.max(c-s-i[1]-i[3],0),height:Math.max(u-l-i[0]-i[2],0)}},l.getLayoutRect=function(t,e,i){i=a.normalizeCssArray(i||0);var r=e.width,s=e[We],l=o(t.left,r),c=o(t.top,s),u=o(t.right,r),h=o(t[Ze],s),f=o(t.width,r),d=o(t[We],s),p=i[2]+i[0],m=i[1]+i[3],v=t.aspect;switch(isNaN(f)&&(f=r-u-m-l),isNaN(d)&&(d=s-h-p-c),isNaN(f)&&isNaN(d)&&(v>r/s?f=.8*r:d=.8*s),null!=v&&(isNaN(f)&&(f=v*d),isNaN(d)&&(d=f/v)),isNaN(l)&&(l=r-u-f-m),isNaN(c)&&(c=s-h-d-p),t.left||t.right){case re:l=r/2-f/2-i[3];break;case"right":l=r-f-m}switch(t.top||t[Ze]){case ae:case re:c=s/2-d/2-i[0];break;case Ze:c=s-d-p}l=l||0,c=c||0,isNaN(f)&&(f=r-l-(u||0)),isNaN(d)&&(d=s-c-(h||0));var g=new n(l+i[3],c+i[0],f,d);return g.margin=i,g},l.positionGroup=function(t,e,n,r){var a=t[oe]();e=i[Be](i.clone(e),{width:a.width,height:a[We]}),e=l.getLayoutRect(e,n,r),t.attr(ne,[e.x-a.x,e.y-a.y])},l.mergeLayoutParam=function(t,e,n){function r(i){var r={},l=0,c={},u=0,h=n.ignoreSize?1:2;if(s(i,function(e){c[e]=t[e]}),s(i,function(t){a(e,t)&&(r[t]=c[t]=e[t]),o(r,t)&&l++,o(c,t)&&u++}),u!==h&&l){if(l>=h)return r;for(var f=0;f<i[Re];f++){var d=i[f];if(!a(r,d)&&a(t,d)){r[d]=t[d];break}}return r}return c}function a(t,e){return t.hasOwnProperty(e)}function o(t,e){return null!=t[e]&&"auto"!==t[e]}function l(t,e,i){s(t,function(t){e[t]=i[t]})}!i[Ge](n)&&(n={});var c=["width","left","right"],u=[We,"top",Ze],h=r(c),f=r(u);l(c,t,h),l(u,t,f)},l.getLayoutParams=function(t){return l.copyLayoutParams({},t)},l.copyLayoutParams=function(t,e){return e&&t&&s(c,function(i){e.hasOwnProperty(i)&&(t[i]=e[i])}),t},l}),e("echarts/component/geo/GeoView",[ci,"../helper/MapDraw",D],function(t){var e=t("../helper/MapDraw");return t(D).extendComponentView({type:"geo",init:function(t,i){var n=new e(i,!0);this._mapDraw=n,this.group.add(n.group)},render:function(t,e,i,n){if(!n||"geoToggleSelect"!==n.type||n.from!==this.uid){var r=this._mapDraw;t.get("show")?r.draw(t,e,i,this,n):this._mapDraw.group[fe](),this.group[ke]=t.get(ke)}}})}),e("echarts/component/tooltip/TooltipView",[ci,"./TooltipContent",I,li,Y,b,oi,"../../model/Model",D],function(t){function e(t,e){if(!t||!e)return!1;var i=_.round;return i(t[0])===i(e[0])&&i(t[1])===i(e[1])}function i(t,e,i,n){return{x1:t,y1:e,x2:i,y2:n}}function n(t,e,i,n){return{x:t,y:e,width:i,height:n}}function o(t,e,i,n,r,a){return{cx:t,cy:e,r0:i,r:n,startAngle:r,endAngle:a,clockwise:!0}}function l(t,e,i,n,r){var a=i.clientWidth,o=i.clientHeight,s=20;return t+a+s>n?t-=a+s:t+=s,e+o+s>r?e-=o+s:e+=s,[t,e]}function c(t,e,i){var n=i.clientWidth,r=i.clientHeight,a=5,o=0,s=0,l=e.width,c=e[We];switch(t){case"inside":o=e.x+l/2-n/2,s=e.y+c/2-r/2;break;case"top":o=e.x+l/2-n/2,s=e.y-r-a;break;case Ze:o=e.x+l/2-n/2,s=e.y+c+a;break;case"left":o=e.x-n-a,s=e.y+c/2-r/2;break;case"right":o=e.x+l+a,s=e.y+c/2-r/2}return[o,s]}function u(t,e,i,n,o,s,u){var h=u[Qe](),f=u[$e](),p=s&&s[oe]().clone();if(s&&p[d](s[a]),typeof t===ge&&(t=t([e,i],o,n.el,p)),g[ye](t))e=w(t[0],h),i=w(t[1],f);else if(typeof t===ei&&s){var m=c(t,p,n.el);e=m[0],i=m[1]}else{var m=l(e,i,n.el,h,f);e=m[0],i=m[1]}n[r](e,i)}function f(t){var e=t[he],i=t.get("tooltip.trigger",!0);return!(!e||"cartesian2d"!==e.type&&"polar"!==e.type&&"singleAxis"!==e.type||"item"===i)}var p=t("./TooltipContent"),m=t(I),g=t(li),x=t(Y),_=t(b),w=_[M],S=t(oi),T=t("../../model/Model");t(D).extendComponentView({type:"tooltip",_axisPointers:{},init:function(t,e){if(!S.node){var i=new p(e.getDom(),e);this._tooltipContent=i,e.on("showTip",this._manuallyShowTip,this),e.on("hideTip",this._manuallyHideTip,this)}},render:function(t,e,i){if(!S.node){this.group[fe](),this._axisPointers={},this._tooltipModel=t,this._ecModel=e,this._api=i,this._lastHover={};var n=this._tooltipContent;n[He](),n.enterable=t.get("enterable"),this._alwaysShowContent=t.get("alwaysShowContent"),this._seriesGroupByAxis=this._prepareAxisTriggerData(t,e);var r=this._crossText;if(r&&this.group.add(r),null!=this._lastX&&null!=this._lastY){var a=this;clearTimeout(this._refreshUpdateTimeout),this._refreshUpdateTimeout=setTimeout(function(){a._manuallyShowTip({x:a._lastX,y:a._lastY})})}var o=this._api.getZr();o.off("click",this._tryShow),o.off(Ae,this._mousemove),o.off(Le,this._hide),o.off("globalout",this._hide),"click"===t.get("triggerOn")?o.on("click",this._tryShow,this):(o.on(Ae,this._mousemove,this),o.on(Le,this._hide,this),o.on("globalout",this._hide,this))}},_mousemove:function(t){var e=this._tooltipModel.get("showDelay"),i=this;clearTimeout(this._showTimeout),e>0?this._showTimeout=setTimeout(function(){i._tryShow(t)},e):this._tryShow(t)},_manuallyShowTip:function(t){if(t.from!==this.uid){var e=this._ecModel,i=t[Se],n=t[Te],r=e.getSeriesByIndex(i),o=this._api;if(null==t.x||null==t.y){if(r||e[Fe](function(t){f(t)&&!r&&(r=t)}),r){var s=r[si]();null==n&&(n=s.indexOfName(t.name));var l,c,u=s[L](n),h=r[he];if(h&&h[$]){var p=h[$](s.getValues(g.map(h[R],function(t){return r.coordDimToDataDim(t)[0]}),n,!0));l=p&&p[0],c=p&&p[1]}else if(u){var m=u[oe]().clone();m[d](u[a]),l=m.x+m.width/2,c=m.y+m[We]/2}null!=l&&null!=c&&this._tryShow({offsetX:l,offsetY:c,target:u,event:{}})}}else{var u=o.getZr().handler.findHover(t.x,t.y);this._tryShow({offsetX:t.x,offsetY:t.y,target:u,event:{}})}}},_manuallyHideTip:function(t){t.from!==this.uid&&this._hide()},_prepareAxisTriggerData:function(t,e){var i={};return e[Fe](function(t){if(f(t)){var e,n,r=t[he];"cartesian2d"===r.type?(e=r.getBaseAxis(),n=e.dim+e.index):"singleAxis"===r.type?(e=r[G](),n=e.dim+e.type):(e=r.getBaseAxis(),n=e.dim+r.name),i[n]=i[n]||{coordSys:[],series:[]},i[n].coordSys.push(r),i[n][De].push(t)}},this),i},_tryShow:function(t){var e=t[Ce],i=this._tooltipModel,n=i.get(Ie),r=this._ecModel,a=this._api;if(i)if(this._lastX=t.offsetX,this._lastY=t.offsetY,e&&null!=e[Te]){var o=e.dataModel||r.getSeriesByIndex(e[Se]),s=e[Te],l=o[si]()[q](s);"axis"===(l.get("tooltip.trigger")||n)?this._showAxisTooltip(i,r,t):(this._ticket="",this._hideAxisPointer(),this._resetLastHover(),this._showItemTooltipContent(o,s,e.dataType,t)),a[Ee]({type:"showTip",from:this.uid,dataIndex:e[Te],seriesIndex:e[Se]})}else if(e&&e.tooltip){var c=e.tooltip;if(typeof c===ei){var u=c;c={content:u,formatter:u}}var h=new T(c,i),f=h.get("content"),d=Math.random();this._showTooltipContent(h,f,h.get("formatterParams")||{},d,t.offsetX,t.offsetY,e,a)}else"item"===n?this._hide():this._showAxisTooltip(i,r,t),"cross"===i.get("axisPointer.type")&&a[Ee]({type:"showTip",from:this.uid,x:t.offsetX,y:t.offsetY})},_showAxisTooltip:function(t,i,n){var r=t[Je]("axisPointer"),a=r.get("type");if("cross"===a){var o=n[Ce];if(o&&null!=o[Te]){var s=i.getSeriesByIndex(o[Se]),l=o[Te];this._showItemTooltipContent(s,l,o.dataType,n)}}this._showAxisPointer();var c=!0;g.each(this._seriesGroupByAxis,function(t){var i=t.coordSys,o=i[0],s=[n.offsetX,n.offsetY];if(!o.containPoint(s))return void this._hideAxisPointer(o.name);c=!1;var l=o[R],u=o.pointToData(s,!0);s=o[$](u);var h=o.getBaseAxis(),f=r.get("axis");"auto"===f&&(f=h.dim);var d=!1,p=this._lastHover;if("cross"===a)e(p.data,u)&&(d=!0),p.data=u;else{var m=g[pe](l,f);p.data===u[m]&&(d=!0),p.data=u[m]}"cartesian2d"!==o.type||d?"polar"!==o.type||d?"singleAxis"!==o.type||d||this._showSinglePointer(r,o,f,s):this._showPolarPointer(r,o,f,s):this._showCartesianPointer(r,o,f,s),"cross"!==a&&this._dispatchAndShowSeriesTooltipContent(o,t[De],s,u,d)},this),this._tooltipModel.get("show")||this._hideAxisPointer(),c&&this._hide()},_showCartesianPointer:function(t,e,r,a){function o(n,r,a){var o="x"===n?i(r[0],a[0],r[0],a[1]):i(a[0],r[1],a[1],r[1]),s=l._getPointerElement(e,t,n,o);m.subPixelOptimizeLine({shape:o,style:s.style}),h?m[P](s,{shape:o},t):s.attr({shape:o})}function s(i,r,a){var o=e[G](i),s=o.getBandWidth(),c=a[1]-a[0],u="x"===i?n(r[0]-s/2,a[0],s,c):n(a[0],r[1]-s/2,c,s),f=l._getPointerElement(e,t,i,u);h?m[P](f,{shape:u},t):f.attr({shape:u})}var l=this,c=t.get("type"),u=e.getBaseAxis(),h="cross"!==c&&u.type===V&&u.getBandWidth()>20;if("cross"===c)o("x",a,e[G]("y").getGlobalExtent()),o("y",a,e[G]("x").getGlobalExtent()),this._updateCrossText(e,a,t);else{var f=e[G]("x"===r?"y":"x"),d=f.getGlobalExtent();"cartesian2d"===e.type&&("line"===c?o:s)(r,a,d)}},_showSinglePointer:function(t,e,n,r){function a(n,r,a){var s=e[G](),c=s.orient,u="horizontal"===c?i(r[0],a[0],r[0],a[1]):i(a[0],r[1],a[1],r[1]),h=o._getPointerElement(e,t,n,u);l?m[P](h,{shape:u},t):h.attr({shape:u})}var o=this,s=t.get("type"),l="cross"!==s&&e.getBaseAxis().type===V,c=e.getRect(),u=[c.y,c.y+c[We]];a(n,r,u)},_showPolarPointer:function(t,e,n,r){function a(n,r,a){var o,s=e.pointToCoord(r);if("angle"===n){var c=e.coordToPoint([a[0],s[1]]),u=e.coordToPoint([a[1],s[1]]);o=i(c[0],c[1],u[0],u[1])}else o={cx:e.cx,cy:e.cy,r:s[0]};var h=l._getPointerElement(e,t,n,o);f?m[P](h,{shape:o},t):h.attr({shape:o})}function s(i,n,r){var a,s=e[G](i),c=s.getBandWidth(),u=e.pointToCoord(n),h=Math.PI/180;a="angle"===i?o(e.cx,e.cy,r[0],r[1],(-u[1]-c/2)*h,(-u[1]+c/2)*h):o(e.cx,e.cy,u[0]-c/2,u[0]+c/2,0,2*Math.PI);var d=l._getPointerElement(e,t,i,a);f?m[P](d,{shape:a},t):d.attr({shape:a})}var l=this,c=t.get("type"),u=e.getAngleAxis(),h=e.getRadiusAxis(),f="cross"!==c&&e.getBaseAxis().type===V;if("cross"===c)a("angle",r,h[K]()),a(v,r,u[K]()),this._updateCrossText(e,r,t);else{var d=e[G](n===v?"angle":v),p=d[K]();("line"===c?a:s)(n,r,p)}},_updateCrossText:function(t,e,i){var n=i[Je]("crossStyle"),r=n[Je](ue),a=this._tooltipModel,o=this._crossText;o||(o=this._crossText=new m.Text({style:{textAlign:"left",textVerticalAlign:"bottom"}}),this.group.add(o));var s=t.pointToData(e),l=t[R];s=g.map(s,function(e,i){var n=t[G](l[i]);return e=n.type===V||"time"===n.type?n.scale.getLabel(e):x[X](e.toFixed(n.getPixelPrecision()))}),o[be]({fill:r[se]()||n.get("color"),textFont:r[le](),text:s.join(", "),x:e[0]+5,y:e[1]-5}),o.z=a.get("z"),o[_e]=a.get(_e)},_getPointerElement:function(t,e,i,n){var r=this._tooltipModel,a=r.get("z"),o=r.get(_e),s=this._axisPointers,l=t.name;if(s[l]=s[l]||{},s[l][i])return s[l][i];var c=e.get("type"),u=e[Je](c+"Style"),f="shadow"===c,d=u[f?"getAreaStyle":y](),p="polar"===t.type?f?"Sector":i===v?"Circle":"Line":f?"Rect":"Line";f?d[h]=null:d.fill=null;var g=s[l][i]=new m[p]({style:d,z:a,zlevel:o,silent:!0,shape:n});return this.group.add(g),g},_dispatchAndShowSeriesTooltipContent:function(t,e,i,n,r){var a=this._tooltipModel,o=t.getBaseAxis(),s="x"===o.dim||o.dim===v?0:1,l=g.map(e,function(t){return{seriesIndex:t[Se],dataIndex:t.getAxisTooltipDataIndex?t.getAxisTooltipDataIndex(t.coordDimToDataDim(o.dim),n,o):t[si]().indexOfNearest(t.coordDimToDataDim(o.dim)[0],n[s],!1,o.type===V?.5:null)}}),c=this._lastHover,h=this._api;if(c.payloadBatch&&!r&&h[Ee]({type:"downplay",batch:c.payloadBatch}),r||(h[Ee]({type:"highlight",batch:l}),c.payloadBatch=l),h[Ee]({type:"showTip",dataIndex:l[0][Te],seriesIndex:l[0][Se],from:this.uid}),o&&a.get("showContent")&&a.get("show")){var f=g.map(e,function(t,e){return t[Me](l[e][Te])});if(r)u(a.get(ne),i[0],i[1],this._tooltipContent,f,null,h);else{var d=l[0][Te],p="time"===o.type?o.scale.getLabel(n[s]):e[0][si]()[F](d),m=(p?p+"<br />":"")+g.map(e,function(t,e){return t.formatTooltip(l[e][Te],!0)}).join("<br />"),y="axis_"+t.name+"_"+d;this._showTooltipContent(a,m,f,y,i[0],i[1],null,h)}}},_showItemTooltipContent:function(t,e,i,n){var r=this._api,a=t[si](i),o=a[q](e),l=o.get("tooltip",!0);if(typeof l===ei){var c=l;l={formatter:c}}var u=this._tooltipModel,h=t[Je]("tooltip",u),f=new T(l,h,h[s]),d=t[Me](e,i),p=t.formatTooltip(e,!1,i),m="item_"+t.name+"_"+e;this._showTooltipContent(f,p,d,m,n.offsetX,n.offsetY,n[Ce],r)},_showTooltipContent:function(t,e,i,n,r,a,o,s){if(this._ticket="",t.get("showContent")&&t.get("show")){var l=this._tooltipContent,c=t.get("formatter"),h=t.get(ne),f=e;if(c)if(typeof c===ei)f=x.formatTpl(c,i);else if(typeof c===ge){var d=this,p=n,m=function(t,e){t===d._ticket&&(l.setContent(e),u(h,r,a,l,i,o,s))};d._ticket=p,f=c(i,p,m)}l.show(t),l.setContent(f),u(h,r,a,l,i,o,s)}},_showAxisPointer:function(t){if(t){var e=this._axisPointers[t];e&&g.each(e,function(t){t.show()})}else this.group.eachChild(function(t){t.show()}),this.group.show()},_resetLastHover:function(){var t=this._lastHover;t.payloadBatch&&this._api[Ee]({type:"downplay",batch:t.payloadBatch}),this._lastHover={}},_hideAxisPointer:function(t){if(t){var e=this._axisPointers[t];e&&g.each(e,function(t){t.hide()})}else this.group.children()[Re]&&this.group.hide()},_hide:function(){clearTimeout(this._showTimeout),this._hideAxisPointer(),this._resetLastHover(),this._alwaysShowContent||this._tooltipContent.hideLater(this._tooltipModel.get("hideDelay")),this._api[Ee]({type:"hideTip",from:this.uid}),this._lastX=this._lastY=null},dispose:function(t,e){if(!S.node){var i=e.getZr();this._tooltipContent.hide(),i.off("click",this._tryShow),i.off(Ae,this._mousemove),i.off(Le,this._hide),i.off("globalout",this._hide),e.off("showTip",this._manuallyShowTip),e.off("hideTip",this._manuallyHideTip)}}})}),e("echarts/component/marker/MarkPointModel",[ci,"./MarkerModel"],function(t){return t("./MarkerModel")[Be]({type:"markPoint",defaultOption:{zlevel:0,z:5,symbol:"pin",symbolSize:50,tooltip:{trigger:"item"},label:{normal:{show:!0,position:"inside"},emphasis:{show:!0}},itemStyle:{normal:{borderWidth:2}}}})}),e("echarts/component/marker/MarkPointView",[ci,"../../chart/helper/SymbolDraw",li,b,j,"./markerHelper","./MarkerView"],function(t){function e(t,e,i){var n=e[he];t.each(function(r){var o,s=t[q](r),l=a[M](s.get("x"),i[Qe]()),c=a[M](s.get("y"),i[$e]());if(isNaN(l)||isNaN(c)){if(e.getMarkerPosition)o=e.getMarkerPosition(t.getValues(t[R],r));else if(n){var u=t.get(n[R][0],r),h=t.get(n[R][1],r);o=n[$]([u,h])}}else o=[l,c];isNaN(l)||(o[0]=l),isNaN(c)||(o[1]=c),t.setItemLayout(r,o)})}function i(t,e,i){var n;n=t?r.map(t&&t[R],function(t){var i=e[si]().getDimensionInfo(e.coordDimToDataDim(t)[0])||{};return i.name=t,i}):[{name:"value",type:"float"}];var a=new o(n,i),l=r.map(i.get("data"),r.curry(s.dataTransform,e));return t&&(l=r[me](l,r.curry(s.dataFilter,t))),a[Z](l,null,t?s.dimValueGetter:function(t){return t.value}),a}var n=t("../../chart/helper/SymbolDraw"),r=t(li),a=t(b),o=t(j),s=t("./markerHelper");t("./MarkerView")[Be]({type:"markPoint",updateLayout:function(t,i,n){i[Fe](function(t){var i=t.markPointModel;i&&(e(i[si](),t,n),this.markerGroupMap[t.name][Ve](i))},this)},renderSeries:function(t,r,a,o){var s=t[he],l=t.name,c=t[si](),h=this.markerGroupMap,f=h[l];f||(f=h[l]=new n);var d=i(s,t,r);r.setData(d),e(r[si](),t,o),d.each(function(t){var e=d[q](t),i=e[u]("symbolSize");typeof i===ge&&(i=i(r[H](t),r[Me](t))),d.setItemVisual(t,{symbolSize:i,color:e.get("itemStyle.normal.color")||c.getVisual("color"),symbol:e[u]("symbol")})}),f.updateData(d),this.group.add(f.group),d[A](function(t){t[we](function(t){t.dataModel=r})}),f.__keep=!0,f.group[ke]=r.get(ke)||t.get(ke)}})}),e("echarts/component/marker/MarkLineModel",[ci,"./MarkerModel"],function(t){return t("./MarkerModel")[Be]({type:"markLine",defaultOption:{zlevel:0,z:5,symbol:["circle","arrow"],symbolSize:[8,16],precision:2,tooltip:{trigger:"item"},label:{normal:{show:!0,position:"end"},emphasis:{show:!0}},lineStyle:{normal:{type:"dashed"},emphasis:{width:3}},animationEasing:"linear"}})
}),e("zrender/vml/graphic",[ci,"../core/env","../core/vector","../core/BoundingRect","../core/PathProxy","../tool/color","../contain/text","../graphic/mixin/RectText","../graphic/Displayable","../graphic/Image","../graphic/Text","../graphic/Path","../graphic/Gradient","./core"],function(t){if(!t("../core/env")[je]){var e=t("../core/vector"),i=t("../core/BoundingRect"),r=t("../core/PathProxy").CMD,o=t("../tool/color"),s=t("../contain/text"),l=t("../graphic/mixin/RectText"),c=t("../graphic/Displayable"),u=t("../graphic/Image"),p=t("../graphic/Text"),m=t("../graphic/Path"),v=t("../graphic/Gradient"),g=t("./core"),y=Math.round,x=Math.sqrt,_=Math.abs,b=Math.cos,w=Math.sin,M=Math.max,S=e[d],T=",",C="progid:DXImageTransform.Microsoft",A=21600,L=A/2,P=1e5,k=1e3,D=function(t){t.style.cssText="position:absolute;left:0;top:0;width:1px;height:1px;",t.coordsize=A+","+A,t.coordorigin="0,0"},I=function(t){return String(t)[xe](/&/g,"&amp;")[xe](/"/g,"&quot;")},R=function(t,e,i){return"rgb("+[t,e,i].join(",")+")"},O=function(t,e){e&&t&&e.parentNode!==t&&t.appendChild(e)},E=function(t,e){e&&t&&e.parentNode===t&&t.removeChild(e)},B=function(t,e,i){return(parseFloat(t)||0)*P+(parseFloat(e)||0)*k+i},N=function(t,e){return typeof t===ei?t.lastIndexOf("%")>=0?parseFloat(t)/100*e:parseFloat(t):t},G=function(t,e,i){var n=o.parse(e);i=+i,isNaN(i)&&(i=1),n&&(t.color=R(n[0],n[1],n[2]),t[ie]=i*n[3])},V=function(t){var e=o.parse(t);return[R(e[0],e[1],e[2]),e[3]]},F=function(t,e,i){var n=e.fill;if(null!=n)if(n instanceof v){var r,o=0,s=[0,0],l=0,c=1,u=i[oe](),h=u.width,f=u[We];if("linear"===n.type){r="gradient";var d=i[a],p=[n.x*h,n.y*f],m=[n.x2*h,n.y2*f];d&&(S(p,p,d),S(m,m,d));var g=m[0]-p[0],y=m[1]-p[1];o=180*Math.atan2(g,y)/Math.PI,0>o&&(o+=360),1e-6>o&&(o=0)}else{r="gradientradial";var p=[n.x*h,n.y*f],d=i[a],x=i.scale,_=h,b=f;s=[(p[0]-u.x)/_,(p[1]-u.y)/b],d&&S(p,p,d),_/=x[0]*A,b/=x[1]*A;var w=M(_,b);l=0/w,c=2*n.r/w-l}var T=n.colorStops.slice();T.sort(function(t,e){return t.offset-e.offset});for(var C=T[Re],L=[],P=[],k=0;C>k;k++){var z=T[k],D=V(z.color);P.push(z.offset*c+l+" "+D[0]),(0===k||k===C-1)&&L.push(D)}if(C>=2){var I=L[0][0],R=L[1][0],O=L[0][1]*e[ie],E=L[1][1]*e[ie];t.type=r,t.method="none",t.focus="100%",t.angle=o,t.color=I,t.color2=R,t.colors=P.join(","),t[ie]=E,t.opacity2=O}"radial"===r&&(t.focusposition=s.join(","))}else G(t,n,e[ie])},H=function(t,e){null!=e.lineDash&&(t.dashstyle=e.lineDash.join(" ")),null==e[h]||e[h]instanceof v||G(t,e[h],e[ie])},q=function(t,e,i,n){var r="fill"==e,a=t.getElementsByTagName(e)[0];null!=i[e]&&"none"!==i[e]&&(r||!r&&i[f])?(t[r?"filled":"stroked"]="true",i[e]instanceof v&&E(t,a),a||(a=g.createNode(e)),r?F(a,i,n):H(a,i),O(t,a)):(t[r?"filled":"stroked"]="false",E(t,a))},W=[[],[],[]],Z=function(t,e){var i,n,a,o,s,l,c=r.M,u=r.C,h=r.L,f=r.A,d=r.Q,p=[];for(o=0;o<t[Re];){switch(a=t[o++],n="",i=0,a){case c:n=" m ",i=1,s=t[o++],l=t[o++],W[0][0]=s,W[0][1]=l;break;case h:n=" l ",i=1,s=t[o++],l=t[o++],W[0][0]=s,W[0][1]=l;break;case d:case u:n=" c ",i=3;var m,v,g=t[o++],_=t[o++],M=t[o++],C=t[o++];a===d?(m=M,v=C,M=(M+2*g)/3,C=(C+2*_)/3,g=(s+2*g)/3,_=(l+2*_)/3):(m=t[o++],v=t[o++]),W[0][0]=g,W[0][1]=_,W[1][0]=M,W[1][1]=C,W[2][0]=m,W[2][1]=v,s=m,l=v;break;case f:var P=0,k=0,z=1,D=1,I=0;e&&(P=e[4],k=e[5],z=x(e[0]*e[0]+e[1]*e[1]),D=x(e[2]*e[2]+e[3]*e[3]),I=Math.atan2(-e[1]/D,e[0]/z));var R=t[o++],O=t[o++],E=t[o++],B=t[o++],N=t[o++]+I,G=t[o++]+N+I;o++;var V=t[o++],F=R+b(N)*E,H=O+w(N)*B,g=R+b(G)*E,_=O+w(G)*B,q=V?" wa ":" at ";Math.abs(F-g)<1e-10&&(Math.abs(G-N)>.01?V&&(F+=270/A):Math.abs(H-O)<1e-10?V&&R>F||!V&&F>R?_-=270/A:_+=270/A:V&&O>H||!V&&H>O?g+=270/A:g-=270/A),p.push(q,y(((R-E)*z+P)*A-L),T,y(((O-B)*D+k)*A-L),T,y(((R+E)*z+P)*A-L),T,y(((O+B)*D+k)*A-L),T,y((F*z+P)*A-L),T,y((H*D+k)*A-L),T,y((g*z+P)*A-L),T,y((_*D+k)*A-L)),s=g,l=_;break;case r.R:var Z=W[0],U=W[1];Z[0]=t[o++],Z[1]=t[o++],U[0]=Z[0]+t[o++],U[1]=Z[1]+t[o++],e&&(S(Z,Z,e),S(U,U,e)),Z[0]=y(Z[0]*A-L),U[0]=y(U[0]*A-L),Z[1]=y(Z[1]*A-L),U[1]=y(U[1]*A-L),p.push(" m ",Z[0],T,Z[1]," l ",U[0],T,Z[1]," l ",U[0],T,U[1]," l ",Z[0],T,U[1]);break;case r.Z:p.push(" x ")}if(i>0){p.push(n);for(var X=0;i>X;X++){var Y=W[X];e&&S(Y,Y,e),p.push(y(Y[0]*A-L),T,y(Y[1]*A-L),i-1>X?T:"")}}}return p.join("")};m[ii].brushVML=function(t){var e=this.style,i=this._vmlEl;i||(i=g.createNode("shape"),D(i),this._vmlEl=i),q(i,"fill",e,this),q(i,h,e,this);var r=this[a],o=null!=r,s=i.getElementsByTagName(h)[0];if(s){var l=e[f];if(o&&!e.strokeNoScale){var c=r[0]*r[3]-r[1]*r[2];l*=x(_(c))}s.weight=l+"px"}var u=this.path;this.__dirtyPath&&(u.beginPath(),this[n](u,this.shape),u.toStatic(),this.__dirtyPath=!1),i.path=Z(u.data,this[a]),i.style.zIndex=B(this[_e],this.z,this.z2),O(t,i),e.text?this.drawRectText(t,this[oe]()):this.removeRectText(t)},m[ii].onRemove=function(t){E(t,this._vmlEl),this.removeRectText(t)},m[ii].onAdd=function(t){O(t,this._vmlEl),this.appendRectText(t)};var U=function(t){return"object"==typeof t&&t.tagName&&"IMG"===t.tagName.toUpperCase()};u[ii].brushVML=function(t){var e,i,n=this.style,r=n.image;if(U(r)){var o=r.src;if(o===this._imageSrc)e=this._imageWidth,i=this._imageHeight;else{var s=r.runtimeStyle,l=s.width,c=s[We];s.width="auto",s[We]="auto",e=r.width,i=r[We],s.width=l,s[We]=c,this._imageSrc=o,this._imageWidth=e,this._imageHeight=i}r=o}else r===this._imageSrc&&(e=this._imageWidth,i=this._imageHeight);if(r){var u=n.x||0,h=n.y||0,f=n.width,d=n[We],p=n.sWidth,m=n.sHeight,v=n.sx||0,_=n.sy||0,b=p&&m,w=this._vmlEl;w||(w=g.doc[J]("div"),D(w),this._vmlEl=w);var A,L=w.style,P=!1,k=1,z=1;if(this[a]&&(A=this[a],k=x(A[0]*A[0]+A[1]*A[1]),z=x(A[2]*A[2]+A[3]*A[3]),P=A[1]||A[2]),P){var I=[u,h],R=[u+f,h],E=[u,h+d],N=[u+f,h+d];S(I,I,A),S(R,R,A),S(E,E,A),S(N,N,A);var G=M(I[0],R[0],E[0],N[0]),V=M(I[1],R[1],E[1],N[1]),F=[];F.push("M11=",A[0]/k,T,"M12=",A[2]/z,T,"M21=",A[1]/k,T,"M22=",A[3]/z,T,"Dx=",y(u*k+A[4]),T,"Dy=",y(h*z+A[5])),L.padding="0 "+y(G)+"px "+y(V)+"px 0",L[me]=C+".Matrix("+F.join("")+", SizingMethod=clip)"}else A&&(u=u*k+A[4],h=h*z+A[5]),L[me]="",L.left=y(u)+"px",L.top=y(h)+"px";var H=this._imageEl,q=this._cropEl;H||(H=g.doc[J]("div"),this._imageEl=H);var W=H.style;if(b){if(e&&i)W.width=y(k*e*f/p)+"px",W[We]=y(z*i*d/m)+"px";else{var Z=new Image,X=this;Z.onload=function(){Z.onload=null,e=Z.width,i=Z[We],W.width=y(k*e*f/p)+"px",W[We]=y(z*i*d/m)+"px",X._imageWidth=e,X._imageHeight=i,X._imageSrc=r},Z.src=r}q||(q=g.doc[J]("div"),q.style.overflow="hidden",this._cropEl=q);var Y=q.style;Y.width=y((f+v*f/p)*k),Y[We]=y((d+_*d/m)*z),Y[me]=C+".Matrix(Dx="+-v*f/p*k+",Dy="+-_*d/m*z+")",q.parentNode||w.appendChild(q),H.parentNode!=q&&q.appendChild(H)}else W.width=y(k*f)+"px",W[We]=y(z*d)+"px",w.appendChild(H),q&&q.parentNode&&(w.removeChild(q),this._cropEl=null);var j="",$=n[ie];1>$&&(j+=".Alpha(opacity="+y(100*$)+") "),j+=C+".AlphaImageLoader(src="+r+", SizingMethod=scale)",W[me]=j,w.style.zIndex=B(this[_e],this.z,this.z2),O(t,w),n.text&&this.drawRectText(t,this[oe]())}},u[ii].onRemove=function(t){E(t,this._vmlEl),this._vmlEl=null,this._cropEl=null,this._imageEl=null,this.removeRectText(t)},u[ii].onAdd=function(t){O(t,this._vmlEl),this.appendRectText(t)};var X,Y=z,j={},$=0,Q=100,K=document[J]("div"),te=function(t){var e=j[t];if(!e){$>Q&&($=0,j={});var i,n=K.style;try{n.font=t,i=n.fontFamily.split(",")[0]}catch(r){}e={style:n.fontStyle||Y,variant:n.fontVariant||Y,weight:n.fontWeight||Y,size:0|parseFloat(n.fontSize||12),family:i||"Microsoft YaHei"},j[t]=e,$++}return e};s.measureText=function(t,e){var i=g.doc;X||(X=i[J]("div"),X.style.cssText="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;",g.doc.body.appendChild(X));try{X.style.font=e}catch(n){}return X.innerHTML="",X.appendChild(i.createTextNode(t)),{width:X.offsetWidth}};for(var ee=new i,ne=function(t,e,i,n){var r=this.style,o=r.text;if(o){var l,c,u=r[ce],f=te(r.textFont),p=f.style+" "+f.variant+" "+f.weight+" "+f.size+'px "'+f.family+'"',m=r.textBaseline,v=r.textVerticalAlign;i=i||s[oe](o,p,u,m);var x=this[a];if(x&&!n&&(ee.copy(e),ee[d](x),e=ee),n)l=e.x,c=e.y;else{var _=r.textPosition,b=r.textDistance;if(_ instanceof Array)l=e.x+N(_[0],e.width),c=e.y+N(_[1],e[We]),u=u||"left",m=m||"top";else{var w=s.adjustTextPositionOnRect(_,e,i,b);l=w.x,c=w.y,u=u||w[ce],m=m||w.textBaseline}}if(v){switch(v){case ae:c-=i[We]/2;break;case Ze:c-=i[We]}m="top"}var M=f.size;switch(m){case"hanging":case"top":c+=M/1.75;break;case ae:break;default:c-=M/2.25}switch(u){case"left":break;case re:l-=i.width/2;break;case"right":l-=i.width}var C,A,L,P=g.createNode,k=this._textVmlEl;k?(L=k.firstChild,C=L.nextSibling,A=C.nextSibling):(k=P("line"),C=P("path"),A=P("textpath"),L=P("skew"),A.style["v-text-align"]="left",D(k),C.textpathok=!0,A.on=!0,k.from="0 0",k.to="1000 0.05",O(k,L),O(k,C),O(k,A),this._textVmlEl=k);var z=[l,c],R=k.style;x&&n?(S(z,z,x),L.on=!0,L.matrix=x[0].toFixed(3)+T+x[2].toFixed(3)+T+x[1].toFixed(3)+T+x[3].toFixed(3)+",0,0",L.offset=(y(z[0])||0)+","+(y(z[1])||0),L.origin="0 0",R.left="0px",R.top="0px"):(L.on=!1,R.left=y(l)+"px",R.top=y(c)+"px"),A[ei]=I(o);try{A.style.font=p}catch(E){}q(k,"fill",{fill:n?r.fill:r.textFill,opacity:r[ie]},this),q(k,h,{stroke:n?r[h]:r.textStroke,opacity:r[ie],lineDash:r.lineDash},this),k.style.zIndex=B(this[_e],this.z,this.z2),O(t,k)}},se=function(t){E(t,this._textVmlEl),this._textVmlEl=null},le=function(t){O(t,this._textVmlEl)},ue=[l,c,u,m,p],he=0;he<ue[Re];he++){var fe=ue[he][ii];fe.drawRectText=ne,fe.removeRectText=se,fe.appendRectText=le}p[ii].brushVML=function(t){var e=this.style;e.text?this.drawRectText(t,{x:e.x||0,y:e.y||0,width:0,height:0},this[oe](),!0):this.removeRectText(t)},p[ii].onRemove=function(t){this.removeRectText(t)},p[ii].onAdd=function(t){this.appendRectText(t)}}}),e("echarts/scale/Interval",[ci,"../util/number","../util/format","./Scale"],function(t){var e=t("../util/number"),i=t("../util/format"),n=t("./Scale"),r=Math.floor,a=Math.ceil,o=e.getPrecisionSafe,s=e.round,l=n[Be]({type:"interval",_interval:0,setExtent:function(t,e){var i=this._extent;isNaN(t)||(i[0]=parseFloat(t)),isNaN(e)||(i[1]=parseFloat(e))},unionExtent:function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),l[ii].setExtent.call(this,e[0],e[1])},getInterval:function(){return this._interval||this.niceTicks(),this._interval},setInterval:function(t){this._interval=t,this._niceExtent=this._extent.slice()},getTicks:function(){this._interval||this.niceTicks();var t=this._interval,e=this._extent,i=[],n=1e4;if(t){var r=this._niceExtent,a=o(t)+2;e[0]<r[0]&&i.push(e[0]);for(var l=r[0];l<=r[1];)if(i.push(l),l=s(l+t,a),i[Re]>n)return[];e[1]>r[1]&&i.push(e[1])}return i},getTicksLabels:function(){for(var t=[],e=this[te](),i=0;i<e[Re];i++)t.push(this.getLabel(e[i]));return t},getLabel:function(t){return i[X](t)},niceTicks:function(t){t=t||5;var i=this._extent,n=i[1]-i[0];if(isFinite(n)){0>n&&(n=-n,i.reverse());var l=s(e.nice(n/t,!0),Math.max(o(i[0]),o(i[1]))+2),c=o(l)+2,u=[s(a(i[0]/l)*l,c),s(r(i[1]/l)*l,c)];this._interval=l,this._niceExtent=u}},niceExtent:function(t,e,i){var n=this._extent;if(n[0]===n[1])if(0!==n[0]){var o=n[0];i?n[0]-=o/2:(n[1]+=o/2,n[0]-=o/2)}else n[1]=1;var l=n[1]-n[0];isFinite(l)||(n[0]=0,n[1]=1),this.niceTicks(t);var c=this._interval;e||(n[0]=s(r(n[0]/c)*c)),i||(n[1]=s(a(n[1]/c)*c))}});return l[qe]=function(){return new l},l}),e("zrender/vml/Painter",[ci,"../core/log","./core"],function(t){function e(t){return parseInt(t,10)}function n(t,e){o.initVML(),this.root=t,this[Ye]=e;var i=document[J]("div"),n=document[J]("div");i.style.cssText="display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;",n.style.cssText="position:absolute;left:0;top:0;",t.appendChild(i),this._vmlRoot=n,this._vmlViewport=i,this[ti]();var r=e.delFromMap,a=e.addToMap;e.delFromMap=function(t){var i=e.get(t);r.call(e,t),i&&i.onRemove&&i.onRemove(n)},e.addToMap=function(t){t.onAdd&&t.onAdd(n),a.call(e,t)},this._firstPaint=!0}function r(t){return function(){a('In IE8.0 VML mode painter not support method "'+t+'"')}}var a=t("../core/log"),o=t("./core");n[ii]={constructor:n,getViewportRoot:function(){return this._vmlViewport},refresh:function(){var t=this[Ye].getDisplayList(!0,!0);this._paintList(t)},_paintList:function(t){for(var e=this._vmlRoot,n=0;n<t[Re];n++){var r=t[n];r.invisible||r[Ue]?(r.__alreadyNotVisible||r.onRemove(e),r.__alreadyNotVisible=!0):(r.__alreadyNotVisible&&r.onAdd(e),r.__alreadyNotVisible=!1,r[i]&&(r.beforeBrush&&r.beforeBrush(),(r.brushVML||r.brush).call(r,e),r.afterBrush&&r.afterBrush())),r[i]=!1}this._firstPaint&&(this._vmlViewport.appendChild(e),this._firstPaint=!1)},resize:function(){var t=this._getWidth(),e=this._getHeight();if(this._width!=t&&this._height!=e){this._width=t,this._height=e;var i=this._vmlViewport.style;i.width=t+"px",i[We]=e+"px"}},dispose:function(){this.root.innerHTML="",this._vmlRoot=this._vmlViewport=this[Ye]=null},getWidth:function(){return this._width},getHeight:function(){return this._height},clear:function(){this.root.removeChild(this.vmlViewport)},_getWidth:function(){var t=this.root,i=t.currentStyle;return(t.clientWidth||e(i.width))-e(i.paddingLeft)-e(i.paddingRight)|0},_getHeight:function(){var t=this.root,i=t.currentStyle;return(t.clientHeight||e(i[We]))-e(i.paddingTop)-e(i.paddingBottom)|0}};for(var s=["getLayer","insertLayer","eachLayer","eachBuildinLayer","eachOtherLayer","getLayers","modLayer","delLayer","clearLayer","toDataURL","pathToImage"],l=0;l<s[Re];l++){var c=s[l];n[ii][c]=r(c)}return n}),e("echarts/component/marker/MarkAreaModel",[ci,"./MarkerModel"],function(t){return t("./MarkerModel")[Be]({type:"markArea",defaultOption:{zlevel:0,z:1,tooltip:{trigger:"item"},animation:!1,label:{normal:{show:!0,position:"top"},emphasis:{show:!0,position:"top"}},itemStyle:{normal:{borderWidth:0}}}})}),e("echarts/component/timeline/preprocessor",[ci,li],function(t){function e(t){var e=t.type,a={number:"value",time:"time"};if(a[e]&&(t.axisType=a[e],delete t.type),i(t),n(t,"controlPosition")){var o=t.controlStyle||(t.controlStyle={});n(o,ne)||(o[ne]=t.controlPosition),"none"!==o[ne]||n(o,"show")||(o.show=!1,delete o[ne]),delete t.controlPosition}r.each(t.data||[],function(t){r[Ge](t)&&!r[ye](t)&&(!n(t,"value")&&n(t,"name")&&(t.value=t.name),i(t))})}function i(t){var e=t.itemStyle||(t.itemStyle={}),i=e[T]||(e[T]={}),a=t.label||t.label||{},o=a[z]||(a[z]={}),s={normal:1,emphasis:1};r.each(a,function(t,e){s[e]||n(o,e)||(o[e]=t)}),i.label&&!n(a,T)&&(a[T]=i.label,delete i.label)}function n(t,e){return t.hasOwnProperty(e)}var r=t(li);return function(t){var i=t&&t.timeline;r[ye](i)||(i=i?[i]:[]),r.each(i,function(t){t&&e(t)})}}),e("echarts/component/marker/MarkLineView",[ci,li,j,b,"./markerHelper","../../chart/helper/LineDraw","./MarkerView"],function(t){function e(t){return!isNaN(t)&&!isFinite(t)}function i(t,i,n,r){var a=1-t,o=r[R][t];return e(i[a])&&e(n[a])&&i[t]===n[t]&&r[G](o).containData(i[t])}function n(t,e){if("cartesian2d"===t.type){var n=e[0].coord,r=e[1].coord;if(n&&r&&(i(1,n,r,t)||i(0,n,r,t)))return!0}return c.dataFilter(t,e[0])&&c.dataFilter(t,e[1])}function r(t,i,n,r,a){var o,s=r[he],c=t[q](i),u=l[M](c.get("x"),a[Qe]()),h=l[M](c.get("y"),a[$e]());if(isNaN(u)||isNaN(h)){if(r.getMarkerPosition)o=r.getMarkerPosition(t.getValues(t[R],i));else{var f=s[R],d=t.get(f[0],i),p=t.get(f[1],i);o=s[$]([d,p])}if("cartesian2d"===s.type){var m=s[G]("x"),v=s[G]("y"),f=s[R];e(t.get(f[0],i))?o[0]=m.toGlobalCoord(m[K]()[n?0:1]):e(t.get(f[1],i))&&(o[1]=v.toGlobalCoord(v[K]()[n?0:1]))}isNaN(u)||(o[0]=u),isNaN(h)||(o[1]=h)}else o=[u,h];t.setItemLayout(i,o)}function a(t,e,i){var r;r=t?o.map(t&&t[R],function(t){var i=e[si]().getDimensionInfo(e.coordDimToDataDim(t)[0])||{};return i.name=t,i}):[{name:"value",type:"float"}];var a=new s(r,i),l=new s(r,i),u=new s([],i),f=o.map(i.get("data"),o.curry(h,e,t,i));t&&(f=o[me](f,o.curry(n,t)));var d=t?c.dimValueGetter:function(t){return t.value};return a[Z](o.map(f,function(t){return t[0]}),null,d),l[Z](o.map(f,function(t){return t[1]}),null,d),u[Z](o.map(f,function(t){return t[2]})),u.hasItemOption=!0,{from:a,to:l,line:u}}var o=t(li),s=t(j),l=t(b),c=t("./markerHelper"),u=t("../../chart/helper/LineDraw"),h=function(t,e,i,n){var r=t[si](),a=n.type;if(!o[ye](n)&&("min"===a||"max"===a||"average"===a||null!=n.xAxis||null!=n.yAxis)){var s,l,u;if(null!=n.yAxis||null!=n.xAxis)l=null!=n.yAxis?"y":"x",s=e[G](l),u=o[O](n.yAxis,n.xAxis);else{var h=c.getAxisInfo(n,r,e,t);l=h.valueDataDim,s=h.valueAxis,u=c.numCalculate(r,l,a)}var f="x"===l?0:1,d=1-f,p=o.clone(n),m={};p.type=null,p.coord=[],m.coord=[],p.coord[d]=-1/0,m.coord[d]=1/0;var v=i.get("precision");v>=0&&(u=+u.toFixed(v)),p.coord[f]=m.coord[f]=u,n=[p,m,{type:a,valueIndex:n.valueIndex,value:u}]}return n=[c.dataTransform(t,n[0]),c.dataTransform(t,n[1]),o[Be]({},n[2])],n[2].type=n[2].type||"",o.merge(n[2],n[0]),o.merge(n[2],n[1]),n};t("./MarkerView")[Be]({type:"markLine",updateLayout:function(t,e,i){e[Fe](function(t){var e=t.markLineModel;if(e){var n=e[si](),a=e.__from,o=e.__to;a.each(function(e){r(a,e,!0,t,i),r(o,e,!1,t,i)}),n.each(function(t){n.setItemLayout(t,[a[k](t),o[k](t)])}),this.markerGroupMap[t.name][Ve]()}},this)},renderSeries:function(t,e,i,n){function s(e,i,a){var o=e[q](i);r(e,i,a,t,n),e.setItemVisual(i,{symbolSize:o.get("symbolSize")||x[a?0:1],symbol:o.get("symbol",!0)||y[a?0:1],color:o.get("itemStyle.normal.color")||h.getVisual("color")})}var l=t[he],c=t.name,h=t[si](),f=this.markerGroupMap,d=f[c];d||(d=f[c]=new u),this.group.add(d.group);var p=a(l,t,e),m=p.from,v=p.to,g=p.line;e.__from=m,e.__to=v,e.setData(g);var y=e.get("symbol"),x=e.get("symbolSize");o[ye](y)||(y=[y,y]),typeof x===ve&&(x=[x,x]),p.from.each(function(t){s(m,t,!0),s(v,t,!1)}),g.each(function(t){var e=g[q](t).get("lineStyle.normal.color");g.setItemVisual(t,{color:e||m[C](t,"color")}),g.setItemLayout(t,[m[k](t),v[k](t)]),g.setItemVisual(t,{fromSymbolSize:m[C](t,"symbolSize"),fromSymbol:m[C](t,"symbol"),toSymbolSize:v[C](t,"symbolSize"),toSymbol:v[C](t,"symbol")})}),d.updateData(g),p.line[A](function(t){t[we](function(t){t.dataModel=e})}),d.__keep=!0,d.group[ke]=e.get(ke)||t.get(ke)}})}),e("echarts/component/marker/MarkAreaView",[ci,li,j,b,I,"zrender/tool/color","./markerHelper","./MarkerView"],function(t){function e(t){return!isNaN(t)&&!isFinite(t)}function i(t,i,n){var r=1-t;return e(i[r])&&e(n[r])}function n(t,e){var n=e.coord[0],r=e.coord[1];return"cartesian2d"===t.type&&n&&r&&(i(1,n,r,t)||i(0,n,r,t))?!0:h.dataFilter(t,{coord:n,x:e.x0,y:e.y0})||h.dataFilter(t,{coord:r,x:e.x1,y:e.y1})}function r(t,i,n,r,a){var o,s=r[he],c=t[q](i),u=l[M](c.get(n[0]),a[Qe]()),h=l[M](c.get(n[1]),a[$e]());if(isNaN(u)||isNaN(h)){if(r.getMarkerPosition)o=r.getMarkerPosition(t.getValues(n,i));else{var f=t.get(n[0],i),d=t.get(n[1],i);o=s[$]([f,d],!0)}if("cartesian2d"===s.type){var p=s[G]("x"),m=s[G]("y"),f=t.get(n[0],i),d=t.get(n[1],i);e(f)?o[0]=p.toGlobalCoord(p[K]()["x0"===n[0]?0:1]):e(d)&&(o[1]=m.toGlobalCoord(m[K]()["y0"===n[1]?0:1]))}isNaN(u)||(o[0]=u),isNaN(h)||(o[1]=h)}else o=[u,h];return o}function a(t,e,i){var r,a,l=["x0","y0","x1","y1"];t?(r=o.map(t&&t[R],function(t){var i=e[si]().getDimensionInfo(e.coordDimToDataDim(t)[0])||{};return i.name=t,i}),a=new s(o.map(l,function(t,e){return{name:t,type:r[e%2].type}}),i)):(r=[{name:"value",type:"float"}],a=new s(r,i));var c=o.map(i.get("data"),o.curry(f,e,t,i));t&&(c=o[me](c,o.curry(n,t)));var u=t?function(t,e,i,n){return t.coord[Math.floor(n/2)][n%2]}:function(t){return t.value};return a[Z](c,null,u),a.hasItemOption=!0,a}var o=t(li),s=t(j),l=t(b),c=t(I),u=t("zrender/tool/color"),h=t("./markerHelper"),f=function(t,e,i,n){var r=h.dataTransform(t,n[0]),a=h.dataTransform(t,n[1]),s=o[O],l=r.coord,c=a.coord;l[0]=s(l[0],-1/0),l[1]=s(l[1],-1/0),c[0]=s(c[0],1/0),c[1]=s(c[1],1/0);var u=o.mergeAll([{},r,a]);return u.coord=[r.coord,a.coord],u.x0=r.x,u.y0=r.y,u.x1=a.x,u.y1=a.y,u},d=[["x0","y0"],["x1","y0"],["x1","y1"],["x0","y1"]];t("./MarkerView")[Be]({type:"markArea",updateLayout:function(t,e,i){e[Fe](function(t){var e=t.markAreaModel;if(e){var n=e[si]();n.each(function(e){var a=o.map(d,function(a){return r(n,e,a,t,i)});n.setItemLayout(e,a);var s=n[L](e);s.setShape("points",a)})}},this)},renderSeries:function(t,e,i,n){var s=t[he],l=t.name,h=t[si](),f=this.markerGroupMap,p=f[l];p||(p=f[l]={group:new c.Group}),this.group.add(p.group),p.__keep=!0;var m=a(s,t,e);e.setData(m),m.each(function(e){m.setItemLayout(e,o.map(d,function(i){return r(m,e,i,t,n)})),m.setItemVisual(e,{color:h.getVisual("color")})}),m.diff(p.__data).add(function(t){var e=new c.Polygon({shape:{points:m[k](t)}});m.setItemGraphicEl(t,e),p.group.add(e)})[He](function(t,i){var n=p.__data[L](i);c[P](n,{shape:{points:m[k](t)}},e,t),p.group.add(n),m.setItemGraphicEl(t,n)})[Ne](function(t){var e=p.__data[L](t);p.group[Ne](e)}).execute(),m[A](function(t,i){var n=m[q](i),r=n[Je]("label.normal"),a=n[Je]("label.emphasis"),s=m[C](i,"color");t.useStyle(o[Oe](n[Je]("itemStyle.normal").getItemStyle(),{fill:u.modifyAlpha(s,.4),stroke:s})),t.hoverStyle=n[Je]("itemStyle.normal").getItemStyle();var l=m[F](i)||"",h=s||t.style.fill;c.setText(t.style,r,h),t.style.text=o[O](e.getFormattedLabel(i,z),l),c.setText(t.hoverStyle,a,h),t.hoverStyle.text=o[O](e.getFormattedLabel(i,T),l),c[S](t,{}),t.dataModel=e}),p.__data=m,p.group[ke]=e.get(ke)||t.get(ke)}})}),e("echarts/component/timeline/typeDefaulter",[ci,o],function(t){t(o).registerSubTypeDefaulter("timeline",function(){return"slider"})}),e("echarts/component/timeline/timelineAction",[ci,D],function(t){var e=t(D);e.registerAction({type:"timelineChange",event:"timelineChanged",update:"prepareAndUpdate"},function(t,e){var i=e.getComponent("timeline");i&&null!=t.currentIndex&&(i.setCurrentIndex(t.currentIndex),!i.get("loop",!0)&&i.isIndexMax()&&i.setPlayState(!1)),e.resetOption("timeline")}),e.registerAction({type:"timelinePlayChange",event:"timelinePlayChanged",update:"update"},function(t,e){var i=e.getComponent("timeline");i&&null!=t.playState&&i.setPlayState(t.playState)})}),e("echarts/component/timeline/SliderTimelineModel",[ci,"./TimelineModel",li,g],function(t){var e=t("./TimelineModel"),i=t(li),n=t(g),r=e[Be]({type:"timeline.slider",defaultOption:{backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,orient:"horizontal",inverse:!1,tooltip:{trigger:"item"},symbol:"emptyCircle",symbolSize:10,lineStyle:{show:!0,width:2,color:"#304654"},label:{position:"auto",normal:{show:!0,interval:"auto",rotate:0,textStyle:{color:"#304654"}},emphasis:{show:!0,textStyle:{color:"#c23531"}}},itemStyle:{normal:{color:"#304654",borderWidth:1},emphasis:{color:"#c23531"}},checkpointStyle:{symbol:"circle",symbolSize:13,color:"#c23531",borderWidth:5,borderColor:"rgba(194,53,49, 0.5)",animation:!0,animationDuration:300,animationEasing:"quinticInOut"},controlStyle:{show:!0,showPlayBtn:!0,showPrevBtn:!0,showNextBtn:!0,itemSize:22,itemGap:12,position:"left",playIcon:"path://M31.6,53C17.5,53,6,41.5,6,27.4S17.5,1.8,31.6,1.8C45.7,1.8,57.2,13.3,57.2,27.4S45.7,53,31.6,53z M31.6,3.3 C18.4,3.3,7.5,14.1,7.5,27.4c0,13.3,10.8,24.1,24.1,24.1C44.9,51.5,55.7,40.7,55.7,27.4C55.7,14.1,44.9,3.3,31.6,3.3z M24.9,21.3 c0-2.2,1.6-3.1,3.5-2l10.5,6.1c1.899,1.1,1.899,2.9,0,4l-10.5,6.1c-1.9,1.1-3.5,0.2-3.5-2V21.3z",stopIcon:"path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",nextIcon:"path://M18.6,50.8l22.5-22.5c0.2-0.2,0.3-0.4,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7L18.7,4.4c-0.1-0.1-0.2-0.3-0.2-0.5 c0-0.4,0.3-0.8,0.8-0.8c0.2,0,0.5,0.1,0.6,0.3l23.5,23.5l0,0c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-0.1,0.1L19.7,52 c-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0-0.8-0.3-0.8-0.8C18.4,51.2,18.5,51,18.6,50.8z",prevIcon:"path://M43,52.8L20.4,30.3c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.3-0.7L42.9,6.4c0.1-0.1,0.2-0.3,0.2-0.5 c0-0.4-0.3-0.8-0.8-0.8c-0.2,0-0.5,0.1-0.6,0.3L18.3,28.8l0,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l0.1,0.1L41.9,54 c0.1,0.1,0.3,0.2,0.5,0.2c0.4,0,0.8-0.3,0.8-0.8C43.2,53.2,43.1,53,43,52.8z",normal:{color:"#304654",borderColor:"#304654",borderWidth:1},emphasis:{color:"#c23531",borderColor:"#c23531",borderWidth:2}},data:[]}});return i.mixin(r,n.dataFormatMixin),r}),e("echarts/component/timeline/SliderTimelineView",[ci,li,I,"../../util/layout","./TimelineView","./TimelineAxis","../../util/symbol","../../coord/axisHelper",p,ai,b,Y],function(t){function e(t,e){return l.getLayoutRect(t.getBoxLayoutParams(),{width:e[Qe](),height:e[$e]()},t.get("padding"))}function i(t,e,i,n){var r=o.makePath(t.get(e)[xe](/^path:\/\//,""),a.clone(n||{}),new v(i[0],i[1],i[2],i[3]),re);return r}function n(t,e,i,n,r,o){var s=t.get("symbol"),l=e.get("color"),c=t.get("symbolSize"),u=c/2,h=e.getItemStyle(["color","symbol","symbolSize"]);return r?(r[be](h),r.setColor(l),i.add(r),o&&o.onUpdate(r)):(r=f.createSymbol(s,-u,-u,c,c,l),i.add(r),o&&o.onCreate(r)),n=a.merge({rectHover:!0,style:h,z2:100},n,!0),r.attr(n),r}function r(t,e,i,n,r){if(!t.dragging){var a=n[Je]("checkpointStyle"),o=i[w](n[si]().get(["value"],e));r||!a.get(Ke,!0)?t.attr({position:[o,0]}):(t.stopAnimation(!0),t.animateTo({position:[o,0]},a.get("animationDuration",!0),a.get("animationEasing",!0)))}}var a=t(li),o=t(I),l=t("../../util/layout"),u=t("./TimelineView"),h=t("./TimelineAxis"),f=t("../../util/symbol"),m=t("../../coord/axisHelper"),v=t(p),g=t(ai),_=t(b),M=t(Y),T=M.encodeHTML,C=a.bind,A=a.each,L=Math.PI;return u[Be]({type:"timeline.slider",init:function(t,e){this.api=e,this._axis,this._viewRect,this._timer,this._currentPointer,this._mainGroup,this._labelGroup},render:function(t,e,i){if(this.model=t,this.api=i,this[s]=e,this.group[fe](),t.get("show",!0)){var n=this._layout(t,i),r=this._createGroup("mainGroup"),a=this._createGroup("labelGroup"),o=this._axis=this._createAxis(n,t);t.formatTooltip=function(t){return T(o.scale.getLabel(t))},A(["AxisLine","AxisTick","Control","CurrentPointer"],function(e){this["_render"+e](n,r,o,t)},this),this._renderAxisLabel(n,a,o,t),this._position(n,t)}this._doPlayStop()},remove:function(){this._clearTimer(),this.group[fe]()},dispose:function(){this._clearTimer()},_layout:function(t,i){var n=t.get("label.normal.position"),r=t.get("orient"),a=e(t,i);null==n||"auto"===n?n="horizontal"===r?a.y+a[We]/2<i[$e]()/2?"-":"+":a.x+a.width/2<i[Qe]()/2?"+":"-":isNaN(n)&&(n={horizontal:{top:"-",bottom:"+"},vertical:{left:"-",right:"+"}}[r][n]);var o={horizontal:"center",vertical:n>=0||"+"===n?"left":"right"},s={horizontal:n>=0||"+"===n?"top":Ze,vertical:"middle"},l={horizontal:0,vertical:L/2},c="vertical"===r?a[We]:a.width,u=t[Je]("controlStyle"),h=u.get("show"),f=h?u.get("itemSize"):0,d=h?u.get("itemGap"):0,p=f+d,m=t.get("label.normal.rotate")||0;m=m*L/180;var v,g,y,x,_=u.get(ne,!0),h=u.get("show",!0),b=h&&u.get("showPlayBtn",!0),w=h&&u.get("showPrevBtn",!0),M=h&&u.get("showNextBtn",!0),S=0,T=c;return"left"===_||_===Ze?(b&&(v=[0,0],S+=p),w&&(g=[S,0],S+=p),M&&(y=[T-f,0],T-=p)):(b&&(v=[T-f,0],T-=p),w&&(g=[0,0],S+=p),M&&(y=[T-f,0],T-=p)),x=[S,T],t.get("inverse")&&x.reverse(),{viewRect:a,mainLength:c,orient:r,rotation:l[r],labelRotation:m,labelPosOpt:n,labelAlign:o[r],labelBaseline:s[r],playPosition:v,prevBtnPosition:g,nextBtnPosition:y,axisExtent:x,controlSize:f,controlGap:d}},_position:function(t){function e(t){var e=t[ne];t.origin=[u[0][0]-e[0],u[1][0]-e[1]]}function i(t){return[[t.x,t.x+t.width],[t.y,t.y+t[We]]]}function n(t,e,i,n,r){t[n]+=i[n][r]-e[n][r]}var r=this._mainGroup,a=this._labelGroup,o=t.viewRect;if("vertical"===t.orient){var s=g[qe](),l=o.x,c=o.y+o[We];g.translate(s,s,[-l,-c]),g.rotate(s,s,-L/2),g.translate(s,s,[l,c]),o=o.clone(),o[d](s)}var u=i(o),h=i(r[oe]()),f=i(a[oe]()),p=r[ne],m=a[ne];m[0]=p[0]=u[0][0];var v=t.labelPosOpt;if(isNaN(v)){var y="+"===v?0:1;n(p,h,u,1,y),n(m,f,u,1,1-y)}else{var y=v>=0?0:1;n(p,h,u,1,y),m[1]=p[1]+v}r.attr(ne,p),a.attr(ne,m),r[x]=a[x]=t[x],e(r),e(a)},_createAxis:function(t,e){var i=e[si](),n=e.get("axisType"),r=m.createScaleByModel(e,n),a=i[B]("value");r.setExtent(a[0],a[1]),this._customizeScale(r,i),r.niceTicks();var o=new h("value",r,t.axisExtent,n);return o.model=e,o},_customizeScale:function(t,e){t[te]=function(){return e.mapArray(["value"],function(t){return t})},t.getTicksLabels=function(){return a.map(this[te](),t.getLabel,t)}},_createGroup:function(t){var e=this["_"+t]=new o.Group;return this.group.add(e),e},_renderAxisLine:function(t,e,i,n){var r=i[K]();n.get("lineStyle.show")&&e.add(new o.Line({shape:{x1:r[0],y1:0,x2:r[1],y2:0},style:a[Be]({lineCap:"round"},n[Je]("lineStyle")[y]()),silent:!0,z2:1}))},_renderAxisTick:function(t,e,i,r){var a=r[si](),s=i.scale[te]();A(s,function(t,s){var l=i[w](t),c=a[q](s),u=c[Je]("itemStyle.normal"),h=c[Je]("itemStyle.emphasis"),f={position:[l,0],onclick:C(this._changeTimeline,this,s)},d=n(c,u,e,f);o[S](d,h.getItemStyle()),c.get("tooltip")?(d[Te]=s,d.dataModel=r):d[Te]=d.dataModel=null},this)},_renderAxisLabel:function(t,e,i,n){var r=n[Je]("label.normal");if(r.get("show")){var a=n[si](),s=i.scale[te](),l=m.getFormattedLabels(i,r.get("formatter")),c=i.getLabelInterval();A(s,function(n,r){if(!i.isLabelIgnored(r,c)){var s=a[q](r),u=s[Je]("label.normal.textStyle"),h=s[Je]("label.emphasis.textStyle"),f=i[w](n),d=new o.Text({style:{text:l[r],textAlign:t.labelAlign,textVerticalAlign:t.labelBaseline,textFont:u[le](),fill:u[se]()},position:[f,0],rotation:t.labelRotation-t[x],onclick:C(this._changeTimeline,this,r),silent:!1});e.add(d),o[S](d,h.getItemStyle())}},this)}},_renderControl:function(t,e,n,r){function a(t,n,a,f){if(t){var d={position:t,origin:[s/2,0],rotation:f?-l:0,rectHover:!0,style:c,onclick:a},p=i(r,n,h,d);e.add(p),o[S](p,u)}}var s=t.controlSize,l=t[x],c=r[Je]("controlStyle.normal").getItemStyle(),u=r[Je]("controlStyle.emphasis").getItemStyle(),h=[0,-s/2,s,s],f=r.getPlayState(),d=r.get("inverse",!0);a(t.nextBtnPosition,"controlStyle.nextIcon",C(this._changeTimeline,this,d?"-":"+")),a(t.prevBtnPosition,"controlStyle.prevIcon",C(this._changeTimeline,this,d?"+":"-")),a(t.playPosition,"controlStyle."+(f?"stopIcon":"playIcon"),C(this._handlePlayClick,this,!f),!0)},_renderCurrentPointer:function(t,e,i,a){var o=a[si](),s=a.getCurrentIndex(),l=o[q](s)[Je]("checkpointStyle"),c=this,u={onCreate:function(t){t.draggable=!0,t.drift=C(c._handlePointerDrag,c),t.ondragend=C(c._handlePointerDragend,c),r(t,s,i,a,!0)},onUpdate:function(t){r(t,s,i,a)}};this._currentPointer=n(l,l,this._mainGroup,{},this._currentPointer,u)},_handlePlayClick:function(t){this._clearTimer(),this.api[Ee]({type:"timelinePlayChange",playState:t,from:this.uid})},_handlePointerDrag:function(t,e,i){this._clearTimer(),this._pointerChangeTimeline([i.offsetX,i.offsetY])},_handlePointerDragend:function(t){this._pointerChangeTimeline([t.offsetX,t.offsetY],!0)},_pointerChangeTimeline:function(t,e){var i=this._toAxisCoord(t)[0],n=this._axis,r=_.asc(n[K]().slice());i>r[1]&&(i=r[1]),i<r[0]&&(i=r[0]),this._currentPointer[ne][0]=i,this._currentPointer.dirty();var a=this._findNearestTick(i),o=this.model;(e||a!==o.getCurrentIndex()&&o.get("realtime"))&&this._changeTimeline(a)},_doPlayStop:function(){function t(){var t=this.model;this._changeTimeline(t.getCurrentIndex()+(t.get("rewind",!0)?-1:1))}this._clearTimer(),this.model.getPlayState()&&(this._timer=setTimeout(C(t,this),this.model.get("playInterval")))},_toAxisCoord:function(t){var e=this._mainGroup[c]();return o[d](t,e,!0)},_findNearestTick:function(t){var e,i=this.model[si](),n=1/0,r=this._axis;return i.each(["value"],function(i,a){var o=r[w](i),s=Math.abs(o-t);n>s&&(n=s,e=a)}),e},_clearTimer:function(){this._timer&&(clearTimeout(this._timer),this._timer=null)},_changeTimeline:function(t){var e=this.model.getCurrentIndex();"+"===t?t=e+1:"-"===t&&(t=e-1),this.api[Ee]({type:"timelineChange",currentIndex:t,from:this.uid})}})}),e("echarts/scale/Scale",[ci,"../util/clazz"],function(t){function e(){this._extent=[1/0,-1/0],this._interval=0,this.init&&this.init.apply(this,arguments)
}var i=t("../util/clazz"),n=e[ii];return n.parse=function(t){return t},n[ee]=function(t){var e=this._extent;return t>=e[0]&&t<=e[1]},n.normalize=function(t){var e=this._extent;return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0])},n.scale=function(t){var e=this._extent;return t*(e[1]-e[0])+e[0]},n.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1])},n[K]=function(){return this._extent.slice()},n.setExtent=function(t,e){var i=this._extent;isNaN(t)||(i[0]=t),isNaN(e)||(i[1]=e)},n.getTicksLabels=function(){for(var t=[],e=this[te](),i=0;i<e[Re];i++)t.push(this.getLabel(e[i]));return t},i.enableClassExtend(e),i.enableClassManagement(e,{registerWhenExtend:!0}),e}),e("echarts/coord/axisHelper",[ci,"../scale/Ordinal","../scale/Interval","../scale/Time","../scale/Log","../scale/Scale","../util/number",li,"zrender/contain/text"],function(t){var e=t("../scale/Ordinal"),i=t("../scale/Interval");t("../scale/Time"),t("../scale/Log");var n=t("../scale/Scale"),r=t("../util/number"),a=t(li),o=t("zrender/contain/text"),s={};return s.getScaleExtent=function(t,e){var i=t.scale,n=i[K](),o=n[1]-n[0];if(i.type===E)return isFinite(o)?n:[0,0];var s=e.getMin?e.getMin():e.get("min"),l=e.getMax?e.getMax():e.get("max"),c=e.getNeedCrossZero?e.getNeedCrossZero():!e.get("scale"),u=e.get("boundaryGap");a[ye](u)||(u=[u||0,u||0]),u[0]=r[M](u[0],1),u[1]=r[M](u[1],1);var h=!0,f=!0;return null==s&&(s=n[0]-u[0]*o,h=!1),null==l&&(l=n[1]+u[1]*o,f=!1),"dataMin"===s&&(s=n[0]),"dataMax"===l&&(l=n[1]),c&&(s>0&&l>0&&!h&&(s=0),0>s&&0>l&&!f&&(l=0)),[s,l]},s.niceScaleExtent=function(t,e){var i=t.scale,n=s.getScaleExtent(t,e),r=null!=(e.getMin?e.getMin():e.get("min")),a=null!=(e.getMax?e.getMax():e.get("max")),o=e.get("splitNumber");"log"===i.type&&(i.base=e.get("logBase")),i.setExtent(n[0],n[1]),i.niceExtent(o,r,a);var l=e.get("minInterval");if(isFinite(l)&&!r&&!a&&"interval"===i.type){var c=i.getInterval(),u=Math.max(Math.abs(c),l)/c;n=i[K](),i.setExtent(u*n[0],n[1]*u),i.niceExtent(o)}var c=e.get("interval");null!=c&&i.setInterval&&i.setInterval(c)},s.createScaleByModel=function(t,r){if(r=r||t.get("type"))switch(r){case V:return new e(t.getCategories(),[1/0,-1/0]);case"value":return new i;default:return(n.getClass(r)||i)[qe](t)}},s.ifAxisCrossZero=function(t){var e=t.scale[K](),i=e[0],n=e[1];return!(i>0&&n>0||0>i&&0>n)},s.getAxisLabelInterval=function(t,e,i,n){var r,a=0,s=0,l=1;e[Re]>40&&(l=Math.floor(e[Re]/40));for(var c=0;c<t[Re];c+=l){var u=t[c],h=o[oe](e[c],i,re,"top");h[n?"x":"y"]+=u,h[n?"width":We]*=1.3,r?r.intersect(h)?(s++,a=Math.max(a,s)):(r.union(h),s=0):r=h.clone()}return 0===a&&l>1?l:(a+1)*l-1},s.getFormattedLabels=function(t,e){var i=t.scale,n=i.getTicksLabels(),r=i[te]();return typeof e===ei?(e=function(t){return function(e){return t[xe]("{value}",e)}}(e),a.map(n,e)):typeof e===ge?a.map(r,function(n,r){return e(t.type===V?i.getLabel(n):n,r)},this):n},s}),e("echarts/coord/cartesian/Cartesian2D",[ci,li,"./Cartesian"],function(t){function e(t){n.call(this,t)}var i=t(li),n=t("./Cartesian");return e[ii]={constructor:e,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function(){return this.getAxesByScale(E)[0]||this.getAxesByScale("time")[0]||this[G]("x")},containPoint:function(t){var e=this[G]("x"),i=this[G]("y");return e[ee](e.toLocalCoord(t[0]))&&i[ee](i.toLocalCoord(t[1]))},containData:function(t){return this[G]("x").containData(t[0])&&this[G]("y").containData(t[1])},dataToPoints:function(t,e){return t.mapArray(["x","y"],function(t,e){return this[$]([t,e])},e,this)},dataToPoint:function(t,e){var i=this[G]("x"),n=this[G]("y");return[i.toGlobalCoord(i[w](t[0],e)),n.toGlobalCoord(n[w](t[1],e))]},pointToData:function(t,e){var i=this[G]("x"),n=this[G]("y");return[i.coordToData(i.toLocalCoord(t[0]),e),n.coordToData(n.toLocalCoord(t[1]),e)]},getOtherAxis:function(t){return this[G]("x"===t.dim?"y":"x")}},i[de](e,n),e}),e("echarts/coord/cartesian/Axis2D",[ci,li,"../Axis","./axisLabelInterval"],function(t){var e=t(li),i=t("../Axis"),n=t("./axisLabelInterval"),r=function(t,e,n,r,a){i.call(this,t,e,n),this.type=r||"value",this[ne]=a||Ze};return r[ii]={constructor:r,index:0,onZero:!1,model:null,isHorizontal:function(){var t=this[ne];return"top"===t||t===Ze},getGlobalExtent:function(){var t=this[K]();return t[0]=this.toGlobalCoord(t[0]),t[1]=this.toGlobalCoord(t[1]),t},getLabelInterval:function(){var t=this._labelInterval;return t||(t=this._labelInterval=n(this)),t},isLabelIgnored:function(t){if(this.type===V){var e=this.getLabelInterval();return typeof e===ge&&!e(t,this.scale.getLabel(t))||t%(e+1)}},toLocalCoord:null,toGlobalCoord:null},e[de](r,i),r}),e("echarts/coord/cartesian/GridModel",[ci,"./AxisModel",o],function(t){t("./AxisModel");var e=t(o);return e[Be]({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}})}),e("echarts/model/globalDefault",[],function(){var t="";return typeof navigator!==_&&(t=navigator.platform||""),{color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"],textStyle:{fontFamily:t.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,animation:!0,animationDuration:1e3,animationDurationUpdate:300,animationEasing:"exponentialOut",animationEasingUpdate:"cubicOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3}}),e("echarts/model/mixin/colorPalette",[],function(){return{clearColorPalette:function(){this._colorIdx=0,this._colorNameMap={}},getColorFromPalette:function(t,e){e=e||this;var i=e._colorIdx||0,n=e._colorNameMap||(e._colorNameMap={});if(n[t])return n[t];var r=this.get("color",!0)||[];if(r[Re]){var a=r[i];return t&&(n[t]=a),e._colorIdx=(i+1)%r[Re],a}}}}),e("zrender/tool/path",[ci,"../graphic/Path","../core/PathProxy","./transformPath","../core/matrix"],function(t){function e(t,e,i,n,r,a,o,s,l,c,u){var d=l*(m/180),v=p(d)*(t-i)/2+f(d)*(e-n)/2,x=-1*f(d)*(t-i)/2+p(d)*(e-n)/2,_=v*v/(o*o)+x*x/(s*s);_>1&&(o*=h(_),s*=h(_));var b=(r===a?-1:1)*h((o*o*s*s-o*o*x*x-s*s*v*v)/(o*o*x*x+s*s*v*v))||0,w=b*o*x/s,M=b*-s*v/o,S=(t+i)/2+p(d)*w-f(d)*M,T=(e+n)/2+f(d)*w+p(d)*M,C=y([1,0],[(v-w)/o,(x-M)/s]),A=[(v-w)/o,(x-M)/s],L=[(-1*v-w)/o,(-1*x-M)/s],P=y(A,L);g(A,L)<=-1&&(P=m),g(A,L)>=1&&(P=0),0===a&&P>0&&(P-=2*m),1===a&&0>P&&(P+=2*m),u.addData(c,S,T,o,s,C,P,d,a)}function r(t){if(!t)return[];var i,n=t[xe](/-/g," -")[xe](/  /g," ")[xe](/ /g,",")[xe](/,,/g,",");for(i=0;i<u[Re];i++)n=n[xe](new RegExp(u[i],"g"),"|"+u[i]);var r,a=n.split("|"),o=0,l=0,c=new s,h=s.CMD;for(i=1;i<a[Re];i++){var f,d=a[i],p=d.charAt(0),m=0,v=d.slice(1)[xe](/e,-/g,"e-").split(",");v[Re]>0&&""===v[0]&&v.shift();for(var g=0;g<v[Re];g++)v[g]=parseFloat(v[g]);for(;m<v[Re]&&!isNaN(v[m])&&!isNaN(v[0]);){var y,x,_,b,w,M,S,T=o,C=l;switch(p){case"l":o+=v[m++],l+=v[m++],f=h.L,c.addData(f,o,l);break;case"L":o=v[m++],l=v[m++],f=h.L,c.addData(f,o,l);break;case"m":o+=v[m++],l+=v[m++],f=h.M,c.addData(f,o,l),p="l";break;case"M":o=v[m++],l=v[m++],f=h.M,c.addData(f,o,l),p="L";break;case"h":o+=v[m++],f=h.L,c.addData(f,o,l);break;case"H":o=v[m++],f=h.L,c.addData(f,o,l);break;case"v":l+=v[m++],f=h.L,c.addData(f,o,l);break;case"V":l=v[m++],f=h.L,c.addData(f,o,l);break;case"C":f=h.C,c.addData(f,v[m++],v[m++],v[m++],v[m++],v[m++],v[m++]),o=v[m-2],l=v[m-1];break;case"c":f=h.C,c.addData(f,v[m++]+o,v[m++]+l,v[m++]+o,v[m++]+l,v[m++]+o,v[m++]+l),o+=v[m-2],l+=v[m-1];break;case"S":y=o,x=l;var A=c.len(),L=c.data;r===h.C&&(y+=o-L[A-4],x+=l-L[A-3]),f=h.C,T=v[m++],C=v[m++],o=v[m++],l=v[m++],c.addData(f,y,x,T,C,o,l);break;case"s":y=o,x=l;var A=c.len(),L=c.data;r===h.C&&(y+=o-L[A-4],x+=l-L[A-3]),f=h.C,T=o+v[m++],C=l+v[m++],o+=v[m++],l+=v[m++],c.addData(f,y,x,T,C,o,l);break;case"Q":T=v[m++],C=v[m++],o=v[m++],l=v[m++],f=h.Q,c.addData(f,T,C,o,l);break;case"q":T=v[m++]+o,C=v[m++]+l,o+=v[m++],l+=v[m++],f=h.Q,c.addData(f,T,C,o,l);break;case"T":y=o,x=l;var A=c.len(),L=c.data;r===h.Q&&(y+=o-L[A-4],x+=l-L[A-3]),o=v[m++],l=v[m++],f=h.Q,c.addData(f,y,x,o,l);break;case"t":y=o,x=l;var A=c.len(),L=c.data;r===h.Q&&(y+=o-L[A-4],x+=l-L[A-3]),o+=v[m++],l+=v[m++],f=h.Q,c.addData(f,y,x,o,l);break;case"A":_=v[m++],b=v[m++],w=v[m++],M=v[m++],S=v[m++],T=o,C=l,o=v[m++],l=v[m++],f=h.A,e(T,C,o,l,M,S,_,b,w,f,c);break;case"a":_=v[m++],b=v[m++],w=v[m++],M=v[m++],S=v[m++],T=o,C=l,o+=v[m++],l+=v[m++],f=h.A,e(T,C,o,l,M,S,_,b,w,f,c)}}("z"===p||"Z"===p)&&(f=h.Z,c.addData(f)),r=f}return c.toStatic(),c}function a(t,e){var i,a=r(t);return e=e||{},e[n]=function(t){t.setData(a.data),i&&l(t,i);var e=t.getContext();e&&t.rebuildPath(e)},e[d]=function(t){i||(i=c[qe]()),c.mul(i,t,i),this.dirty(!0)},e}var o=t("../graphic/Path"),s=t("../core/PathProxy"),l=t("./transformPath"),c=t("../core/matrix"),u=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"],h=Math.sqrt,f=Math.sin,p=Math.cos,m=Math.PI,v=function(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])},g=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(v(t)*v(e))},y=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(g(t,e))};return{createFromString:function(t,e){return new o(a(t,e))},extendFromString:function(t,e){return o[Be](a(t,e))},mergePath:function(t,e){for(var r=[],a=t[Re],s=0;a>s;s++){var l=t[s];l[i]&&l[n](l.path,l.shape,!0),r.push(l.path)}var c=new o(e);return c[n]=function(t){t.appendPath(r);var e=t.getContext();e&&t.rebuildPath(e)},c}}}),e("zrender/graphic/Path",[ci,"./Displayable","../core/util","../core/PathProxy","../contain/path","./Pattern"],function(t){function e(t){r.call(this,t),this.path=new s}var r=t("./Displayable"),o=t("../core/util"),s=t("../core/PathProxy"),l=t("../contain/path"),c=t("./Pattern"),u=c[ii].getCanvasPattern,d=Math.abs;return e[ii]={constructor:e,type:"path",__dirtyPath:!0,strokeContainThreshold:5,brush:function(t,e){var r=this.style,a=this.path,o=r.hasStroke(),s=r.hasFill(),l=r.fill,c=r[h],f=s&&!!l.colorStops,d=o&&!!c.colorStops,p=s&&!!l.image,m=o&&!!c.image;if(r.bind(t,this,e),this.setTransform(t),this[i]){var v=this[oe]();f&&(this._fillGradient=r.getGradient(t,l,v)),d&&(this._strokeGradient=r.getGradient(t,c,v))}f?t.fillStyle=this._fillGradient:p&&(t.fillStyle=u.call(l,t)),d?t.strokeStyle=this._strokeGradient:m&&(t.strokeStyle=u.call(c,t));var g=r.lineDash,y=r.lineDashOffset,x=!!t.setLineDash,_=this.getGlobalScale();a.setScale(_[0],_[1]),this.__dirtyPath||g&&!x&&o?(a=this.path.beginPath(t),g&&!x&&(a.setLineDash(g),a.setLineDashOffset(y)),this[n](a,this.shape,!1),this.__dirtyPath=!1):(t.beginPath(),this.path.rebuildPath(t)),s&&a.fill(t),g&&x&&(t.setLineDash(g),t.lineDashOffset=y),o&&a[h](t),g&&x&&t.setLineDash([]),this.restoreTransform(t),(r.text||0===r.text)&&this.drawRectText(t,this[oe]())},buildPath:function(){},getBoundingRect:function(){var t=this._rect,e=this.style,r=!t;if(r){var a=this.path;this.__dirtyPath&&(a.beginPath(),this[n](a,this.shape,!1)),t=a[oe]()}if(this._rect=t,e.hasStroke()){var o=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this[i]||r){o.copy(t);var s=e[f],l=e.strokeNoScale?this.getLineScale():1;e.hasFill()||(s=Math.max(s,this.strokeContainThreshold||4)),l>1e-10&&(o.width+=s/l,o[We]+=s/l,o.x-=s/l/2,o.y-=s/l/2)}return o}return t},contain:function(t,e){var i=this.transformCoordToLocal(t,e),n=this[oe](),r=this.style;if(t=i[0],e=i[1],n[ee](t,e)){var a=this.path.data;if(r.hasStroke()){var o=r[f],s=r.strokeNoScale?this.getLineScale():1;if(s>1e-10&&(r.hasFill()||(o=Math.max(o,this.strokeContainThreshold)),l.containStroke(a,o/s,t,e)))return!0}if(r.hasFill())return l[ee](a,t,e)}return!1},dirty:function(t){null==t&&(t=!0),t&&(this.__dirtyPath=t,this._rect=null),this[i]=!0,this.__zr&&this.__zr.refresh(),this.__clipTarget&&this.__clipTarget.dirty()},animateShape:function(t){return this.animate("shape",t)},attrKV:function(t,e){"shape"===t?(this.setShape(e),this.__dirtyPath=!0,this._rect=null):r[ii].attrKV.call(this,t,e)},setShape:function(t,e){var i=this.shape;if(i){if(o[Ge](t))for(var n in t)i[n]=t[n];else i[t]=e;this.dirty(!0)}return this},getLineScale:function(){var t=this[a];return t&&d(t[0]-1)>1e-10&&d(t[3]-1)>1e-10?Math.sqrt(d(t[0]*t[3]-t[2]*t[1])):1}},e[Be]=function(t){var i=function(i){e.call(this,i),t.style&&this.style.extendFrom(t.style,!1);var n=t.shape;if(n){this.shape=this.shape||{};var r=this.shape;for(var a in n)!r.hasOwnProperty(a)&&n.hasOwnProperty(a)&&(r[a]=n[a])}t.init&&t.init.call(this,i)};o[de](i,e);for(var n in t)"style"!==n&&"shape"!==n&&(i[ii][n]=t[n]);return i},o[de](e,r),e}),e("echarts/util/model",[ci,"./format","./number","../model/Model",li],function(t){var e=t("./format"),i=t("./number"),n=t("../model/Model"),r=t(li),a={};return a.normalizeToArray=function(t){return t instanceof Array?t:null==t?[]:[t]},a.defaultEmphasis=function(t,e){if(t){var i=t[T]=t[T]||{},n=t[z]=t[z]||{};r.each(e,function(t){var e=r[O](i[t],n[t]);null!=e&&(i[t]=e)})}},a.LABEL_OPTIONS=[ne,"show",ue,"distance","formatter"],a.getDataItemValue=function(t){return t&&(null==t.value?t:t.value)},a.isDataItemOption=function(t){return r[Ge](t)&&!(t instanceof Array)},a.converDataValue=function(t,e){var n=e&&e.type;return n===E?t:("time"!==n||isFinite(t)||null==t||"-"===t||(t=+i.parseDate(t)),null==t||""===t?0/0:+t)},a.createDataFormatModel=function(t,e){var i=new n;return r.mixin(i,a.dataFormatMixin),i[Se]=e[Se],i.name=e.name||"",i[m]=e[m],i.subType=e.subType,i[si]=function(){return t},i},a.dataFormatMixin={getDataParams:function(t,e){var i=this[si](e),n=this[Se],r=this.name,a=this[H](t,e),o=i.getRawIndex(t),s=i[F](t,!0),l=i.getRawDataItem(t);return{componentType:this[m],componentSubType:this.subType,seriesType:this[m]===De?this.subType:null,seriesIndex:n,seriesName:r,name:s,dataIndex:o,data:l,dataType:e,value:a,color:i[C](t,"color"),$vars:["seriesName","name","value"]}},getFormattedLabel:function(t,i,n,r){i=i||z;var a=this[si](n),o=a[q](t),s=this[Me](t,n);null!=r&&s.value instanceof Array&&(s.value=s.value[r]);var l=o.get(["label",i,"formatter"]);return typeof l===ge?(s.status=i,l(s)):typeof l===ei?e.formatTpl(l,s):void 0},getRawValue:function(t,e){var i=this[si](e),n=i.getRawDataItem(t);return null!=n?!r[Ge](n)||n instanceof Array?n:n.value:void 0},formatTooltip:r.noop},a.mappingToExists=function(t,e){e=(e||[]).slice();var i=r.map(t||[],function(t){return{exist:t}});return r.each(e,function(t,n){if(r[Ge](t)){for(var o=0;o<i[Re];o++)if(!i[o][U]&&null!=t.id&&i[o].exist.id===t.id+"")return i[o][U]=t,void(e[n]=null);for(var o=0;o<i[Re];o++){var s=i[o].exist;if(!(i[o][U]||null!=s.id&&null!=t.id||null==t.name||a.isIdInner(t)||a.isIdInner(s)||s.name!==t.name+""))return i[o][U]=t,void(e[n]=null)}}}),r.each(e,function(t){if(r[Ge](t)){for(var e=0;e<i[Re];e++){var n=i[e].exist;if(!i[e][U]&&!a.isIdInner(n)&&null==t.id){i[e][U]=t;break}}e>=i[Re]&&i.push({option:t})}}),i},a.isIdInner=function(t){return r[Ge](t)&&t.id&&0===(t.id+"")[pe]("\x00_ec_\x00")},a.compressBatches=function(t,e){function i(t,e,i){for(var n=0,r=t[Re];r>n;n++)for(var o=t[n].seriesId,s=a.normalizeToArray(t[n][Te]),l=i&&i[o],c=0,u=s[Re];u>c;c++){var h=s[c];l&&l[h]?l[h]=null:(e[o]||(e[o]={}))[h]=1}}function n(t,e){var i=[];for(var r in t)if(t.hasOwnProperty(r)&&null!=t[r])if(e)i.push(+r);else{var a=n(t[r],!0);a[Re]&&i.push({seriesId:r,dataIndex:a})}return i}var r={},o={};return i(t||[],r),i(e||[],o,r),[n(r),n(o)]},a}),e("zrender/graphic/Gradient",[ci],function(){var t=function(t){this.colorStops=t||[]};return t[ii]={constructor:t,addColorStop:function(t,e){this.colorStops.push({offset:t,color:e})}},t}),e("zrender/graphic/Image",[ci,"./Displayable","../core/BoundingRect","../core/util","../core/LRU"],function(t){function e(t){i.call(this,t)}var i=t("./Displayable"),n=t("../core/BoundingRect"),r=t("../core/util"),a=t("../core/LRU"),o=new a(50);return e[ii]={constructor:e,type:"image",brush:function(t,e){var i,n=this.style,r=n.image;if(n.bind(t,this,e),i=typeof r===ei?this._image:r,!i&&r){var a=o.get(r);if(!a)return i=new Image,i.onload=function(){i.onload=null;for(var t=0;t<a.pending[Re];t++)a.pending[t].dirty()},a={image:i,pending:[this]},i.src=r,o.put(r,a),void(this._image=i);if(i=a.image,this._image=i,!i.width||!i[We])return void a.pending.push(this)}if(i){var s=n.width||i.width,l=n[We]||i[We],c=n.x||0,u=n.y||0;if(!i.width||!i[We])return;if(this.setTransform(t),n.sWidth&&n.sHeight){var h=n.sx||0,f=n.sy||0;t.drawImage(i,h,f,n.sWidth,n.sHeight,c,u,s,l)}else if(n.sx&&n.sy){var h=n.sx,f=n.sy,d=s-h,p=l-f;t.drawImage(i,h,f,d,p,c,u,s,l)}else t.drawImage(i,c,u,s,l);null==n.width&&(n.width=s),null==n[We]&&(n[We]=l),this.restoreTransform(t),null!=n.text&&this.drawRectText(t,this[oe]())}},getBoundingRect:function(){var t=this.style;return this._rect||(this._rect=new n(t.x||0,t.y||0,t.width||0,t[We]||0)),this._rect}},r[de](e,i),e}),e("zrender/graphic/Text",[ci,"./Displayable","../core/util","../contain/text"],function(t){var e=t("./Displayable"),i=t("../core/util"),n=t("../contain/text"),r=function(t){e.call(this,t)};return r[ii]={constructor:r,type:"text",brush:function(t,e){var i=this.style,r=i.x||0,a=i.y||0,o=i.text;if(null!=o&&(o+=""),i.bind(t,this,e),o){this.setTransform(t);var s,l=i[ce],c=i.textFont||i.font;if(i.textVerticalAlign){var u=n[oe](o,c,i[ce],"top");switch(s=ae,i.textVerticalAlign){case ae:a-=u[We]/2-u.lineHeight/2;break;case Ze:a-=u[We]-u.lineHeight/2;break;default:a+=u.lineHeight/2}}else s=i.textBaseline;t.font=c||"12px sans-serif",t[ce]=l||"left",t[ce]!==l&&(t[ce]="left"),t.textBaseline=s||"alphabetic",t.textBaseline!==s&&(t.textBaseline="alphabetic");for(var h=n.measureText("国",t.font).width,f=o.split("\n"),d=0;d<f[Re];d++)i.hasFill()&&t.fillText(f[d],r,a),i.hasStroke()&&t.strokeText(f[d],r,a),a+=h;this.restoreTransform(t)}},getBoundingRect:function(){if(!this._rect){var t=this.style,e=t.textVerticalAlign,i=n[oe](t.text+"",t.textFont||t.font,t[ce],e?"top":t.textBaseline);switch(e){case ae:i.y-=i[We]/2;break;case Ze:i.y-=i[We]}i.x+=t.x||0,i.y+=t.y||0,this._rect=i}return this._rect}},i[de](r,e),r}),e("zrender/container/Group",[ci,"../core/util","../Element","../core/BoundingRect"],function(t){var e=t("../core/util"),n=t("../Element"),r=t("../core/BoundingRect"),a=function(t){t=t||{},n.call(this,t);for(var e in t)this[e]=t[e];this._children=[],this.__storage=null,this[i]=!0};return a[ii]={constructor:a,isGroup:!0,type:"group",silent:!1,children:function(){return this._children.slice()},childAt:function(t){return this._children[t]},childOfName:function(t){for(var e=this._children,i=0;i<e[Re];i++)if(e[i].name===t)return e[i]},childCount:function(){return this._children[Re]},add:function(t){return t&&t!==this&&t[l]!==this&&(this._children.push(t),this._doAdd(t)),this},addBefore:function(t,e){if(t&&t!==this&&t[l]!==this&&e&&e[l]===this){var i=this._children,n=i[pe](e);n>=0&&(i[ze](n,0,t),this._doAdd(t))}return this},_doAdd:function(t){t[l]&&t[l][Ne](t),t[l]=this;var e=this.__storage,i=this.__zr;e&&e!==t.__storage&&(e.addToMap(t),t instanceof a&&t.addChildrenToStorage(e)),i&&i.refresh()},remove:function(t){var i=this.__zr,n=this.__storage,r=this._children,o=e[pe](r,t);return 0>o?this:(r[ze](o,1),t[l]=null,n&&(n.delFromMap(t.id),t instanceof a&&t.delChildrenFromStorage(n)),i&&i.refresh(),this)},removeAll:function(){var t,e,i=this._children,n=this.__storage;for(e=0;e<i[Re];e++)t=i[e],n&&(n.delFromMap(t.id),t instanceof a&&t.delChildrenFromStorage(n)),t[l]=null;return i[Re]=0,this},eachChild:function(t,e){for(var i=this._children,n=0;n<i[Re];n++){var r=i[n];t.call(e,r,n)}return this},traverse:function(t,e){for(var i=0;i<this._children[Re];i++){var n=this._children[i];t.call(e,n),"group"===n.type&&n[we](t,e)}return this},addChildrenToStorage:function(t){for(var e=0;e<this._children[Re];e++){var i=this._children[e];t.addToMap(i),i instanceof a&&i.addChildrenToStorage(t)}},delChildrenFromStorage:function(t){for(var e=0;e<this._children[Re];e++){var i=this._children[e];t.delFromMap(i.id),i instanceof a&&i.delChildrenFromStorage(t)}},dirty:function(){return this[i]=!0,this.__zr&&this.__zr.refresh(),this},getBoundingRect:function(t){for(var e=null,i=new r(0,0,0,0),n=t||this._children,a=[],o=0;o<n[Re];o++){var s=n[o];if(!s[Ue]&&!s.invisible){var l=s[oe](),u=s[c](a);u?(i.copy(l),i[d](u),e=e||i.clone(),e.union(i)):(e=e||l.clone(),e.union(l))}}return e||i}},e[de](a,n),a}),e("zrender/graphic/shape/Circle",[ci,"../Path"],function(t){return t("../Path")[Be]({type:"circle",shape:{cx:0,cy:0,r:0},buildPath:function(t,e,i){i&&t[r](e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI,!0)}})}),e("zrender/graphic/shape/Sector",[ci,"../Path"],function(t){return t("../Path")[Be]({type:"sector",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},buildPath:function(t,e){var i=e.cx,n=e.cy,a=Math.max(e.r0||0,0),o=Math.max(e.r,0),s=e.startAngle,l=e.endAngle,c=e.clockwise,u=Math.cos(s),h=Math.sin(s);t[r](u*a+i,h*a+n),t.lineTo(u*o+i,h*o+n),t.arc(i,n,o,s,l,!c),t.lineTo(Math.cos(l)*a+i,Math.sin(l)*a+n),0!==a&&t.arc(i,n,a,l,s,c),t.closePath()}})}),e("zrender/graphic/shape/Polygon",[ci,"../helper/poly","../Path"],function(t){var e=t("../helper/poly");return t("../Path")[Be]({type:"polygon",shape:{points:null,smooth:!1,smoothConstraint:null},buildPath:function(t,i){e[n](t,i,!0)}})}),e("zrender/graphic/shape/Ring",[ci,"../Path"],function(t){return t("../Path")[Be]({type:"ring",shape:{cx:0,cy:0,r:0,r0:0},buildPath:function(t,e){var i=e.cx,n=e.cy,a=2*Math.PI;t[r](i+e.r,n),t.arc(i,n,e.r,0,a,!1),t[r](i+e.r0,n),t.arc(i,n,e.r0,0,a,!0)}})}),e("zrender/graphic/shape/Polyline",[ci,"../helper/poly","../Path"],function(t){var e=t("../helper/poly");return t("../Path")[Be]({type:"polyline",shape:{points:null,smooth:!1,smoothConstraint:null},style:{stroke:"#000",fill:null},buildPath:function(t,i){e[n](t,i,!1)}})}),e("zrender/graphic/shape/Line",[ci,"../Path"],function(t){return t("../Path")[Be]({type:"line",shape:{x1:0,y1:0,x2:0,y2:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var i=e.x1,n=e.y1,a=e.x2,o=e.y2,s=e.percent;0!==s&&(t[r](i,n),1>s&&(a=i*(1-s)+a*s,o=n*(1-s)+o*s),t.lineTo(a,o))},pointAt:function(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t]}})}),e("zrender/graphic/shape/Rect",[ci,"../helper/roundRect","../Path"],function(t){var e=t("../helper/roundRect");return t("../Path")[Be]({type:"rect",shape:{r:0,x:0,y:0,width:0,height:0},buildPath:function(t,i){var r=i.x,a=i.y,o=i.width,s=i[We];i.r?e[n](t,i):t.rect(r,a,o,s),t.closePath()}})}),e("zrender/graphic/CompoundPath",[ci,"./Path"],function(t){var e=t("./Path");return e[Be]({type:"compound",shape:{paths:null},_updatePathDirty:function(){for(var t=this.__dirtyPath,e=this.shape.paths,n=0;n<e[Re];n++)t=t||e[n].__dirtyPath;this.__dirtyPath=t,this[i]=this[i]||t},beforeBrush:function(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),i=0;i<t[Re];i++)t[i].path.setScale(e[0],e[1])},buildPath:function(t,e){for(var i=e.paths||[],r=0;r<i[Re];r++)i[r][n](t,i[r].shape,!0)},afterBrush:function(){for(var t=this.shape.paths,e=0;e<t[Re];e++)t[e].__dirtyPath=!1},getBoundingRect:function(){return this._updatePathDirty(),e[ii][oe].call(this)}})}),e("zrender/graphic/shape/BezierCurve",[ci,"../../core/curve","../../core/vector","../Path"],function(t){function e(t,e,i){var n=t.cpx2,r=t.cpy2;return null===n||null===r?[(i?u:l)(t.x1,t.cpx1,t.cpx2,t.x2,e),(i?u:l)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(i?c:s)(t.x1,t.cpx1,t.x2,e),(i?c:s)(t.y1,t.cpy1,t.y2,e)]}var i=t("../../core/curve"),n=t("../../core/vector"),a=i.quadraticSubdivide,o=i.cubicSubdivide,s=i.quadraticAt,l=i.cubicAt,c=i.quadraticDerivativeAt,u=i.cubicDerivativeAt,h=[];return t("../Path")[Be]({type:"bezier-curve",shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var i=e.x1,n=e.y1,s=e.x2,l=e.y2,c=e.cpx1,u=e.cpy1,f=e.cpx2,d=e.cpy2,p=e.percent;0!==p&&(t[r](i,n),null==f||null==d?(1>p&&(a(i,c,s,p,h),c=h[1],s=h[2],a(n,u,l,p,h),u=h[1],l=h[2]),t.quadraticCurveTo(c,u,s,l)):(1>p&&(o(i,c,f,s,p,h),c=h[1],f=h[2],s=h[3],o(n,u,d,l,p,h),u=h[1],d=h[2],l=h[3]),t.bezierCurveTo(c,u,f,d,s,l)))},pointAt:function(t){return e(this.shape,t,!1)},tangentAt:function(t){var i=e(this.shape,t,!0);return n.normalize(i,i)}})}),e("zrender/graphic/shape/Arc",[ci,"../Path"],function(t){return t("../Path")[Be]({type:"arc",shape:{cx:0,cy:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},style:{stroke:"#000",fill:null},buildPath:function(t,e){var i=e.cx,n=e.cy,a=Math.max(e.r,0),o=e.startAngle,s=e.endAngle,l=e.clockwise,c=Math.cos(o),u=Math.sin(o);t[r](c*a+i,u*a+n),t.arc(i,n,a,o,s,!l)}})}),e("zrender/graphic/RadialGradient",[ci,"../core/util","./Gradient"],function(t){var e=t("../core/util"),i=t("./Gradient"),n=function(t,e,n,r,a){this.x=null==t?.5:t,this.y=null==e?.5:e,this.r=null==n?.5:n,this.type="radial",this.global=a||!1,i.call(this,r)};return n[ii]={constructor:n},e[de](n,i),n}),e("zrender/contain/text",[ci,"../core/util","../core/BoundingRect"],function(t){function e(t,e){var i=t+":"+e;if(o[i])return o[i];for(var n=(t+"").split("\n"),r=0,a=0,c=n[Re];c>a;a++)r=Math.max(f.measureText(n[a],e).width,r);return s>l&&(s=0,o={}),s++,o[i]=r,r}function i(t,i,n,r){var a=((t||"")+"").split("\n")[Re],o=e(t,i),s=e("国",i),l=a*s,c=new u(0,0,o,l);switch(c.lineHeight=s,r){case Ze:case"alphabetic":c.y-=s;break;case ae:c.y-=s/2}switch(n){case"end":case"right":c.x-=c.width;break;case re:c.x-=c.width/2}return c}function n(t,e,i,n){var r=e.x,a=e.y,o=e[We],s=e.width,l=i[We],c=o/2-l/2,u="left";switch(t){case"left":r-=n,a+=c,u="right";break;case"right":r+=n+s,a+=c,u="left";break;case"top":r+=s/2,a-=n+l,u=re;break;case Ze:r+=s/2,a+=o+n,u=re;break;case"inside":r+=s/2,a+=c,u=re;break;case"insideLeft":r+=n,a+=c,u="left";break;case"insideRight":r+=s-n,a+=c,u="right";break;case"insideTop":r+=s/2,a+=n,u=re;break;case"insideBottom":r+=s/2,a+=o-l-n,u=re;break;case"insideTopLeft":r+=n,a+=n,u="left";break;case"insideTopRight":r+=s-n,a+=n,u="right";break;case"insideBottomLeft":r+=n,a+=o-l-n;break;case"insideBottomRight":r+=s-n,a+=o-l-n,u="right"}return{x:r,y:a,textAlign:u,textBaseline:"top"}}function r(t,i,n,r,o){if(!i)return"";o=o||{},r=h(r,"...");for(var s=h(o.maxIterations,2),l=h(o.minChar,0),c=e("国",n),u=e("a",n),f=h(o.placeholder,""),d=i=Math.max(0,i-1),p=0;l>p&&d>=u;p++)d-=u;var m=e(r);m>d&&(r="",m=0),d=i-m;for(var v=(t+"").split("\n"),p=0,g=v[Re];g>p;p++){var y=v[p],x=e(y,n);if(!(i>=x)){for(var _=0;;_++){if(d>=x||_>=s){y+=r;break}var b=0===_?a(y,d,u,c):x>0?Math.floor(y[Re]*d/x):0;y=y.substr(0,b),x=e(y,n)}""===y&&(y=f),v[p]=y}}return v.join("\n")}function a(t,e,i,n){for(var r=0,a=0,o=t[Re];o>a&&e>r;a++){var s=t.charCodeAt(a);r+=s>=0&&127>=s?i:n}return a}var o={},s=0,l=5e3,c=t("../core/util"),u=t("../core/BoundingRect"),h=c[O],f={getWidth:e,getBoundingRect:i,adjustTextPositionOnRect:n,truncateText:r,measureText:function(t,e){var i=c.getContext();return i.font=e||"12px sans-serif",i.measureText(t)}};return f}),e("echarts/coord/polar/PolarModel",[ci,"./AxisModel",D],function(t){t("./AxisModel"),t(D).extendComponentModel({type:"polar",dependencies:["polarAxis","angleAxis"],coordinateSystem:null,findAxisModel:function(t){var e,i=this[s];return i[Xe](t,function(t){var n=i.queryComponents({mainType:"polar",index:t[u]("polarIndex"),id:t[u]("polarId")})[0];n===this&&(e=t)},this),e},defaultOption:{zlevel:0,z:0,center:["50%","50%"],radius:"80%"}})}),e(p,[ci,"./vector","./matrix"],function(t){function e(t,e,i,n){this.x=t,this.y=e,this.width=i,this[We]=n}var i=t("./vector"),n=t("./matrix"),r=i[d],a=Math.min,o=Math.abs,s=Math.max;return e[ii]={constructor:e,union:function(t){var e=a(t.x,this.x),i=a(t.y,this.y);this.width=s(t.x+t.width,this.x+this.width)-e,this[We]=s(t.y+t[We],this.y+this[We])-i,this.x=e,this.y=i},applyTransform:function(){var t=[],e=[];return function(i){i&&(t[0]=this.x,t[1]=this.y,e[0]=this.x+this.width,e[1]=this.y+this[We],r(t,t,i),r(e,e,i),this.x=a(t[0],e[0]),this.y=a(t[1],e[1]),this.width=o(e[0]-t[0]),this[We]=o(e[1]-t[1]))}}(),calculateTransform:function(t){var e=this,i=t.width/e.width,r=t[We]/e[We],a=n[qe]();return n.translate(a,a,[-e.x,-e.y]),n.scale(a,a,[i,r]),n.translate(a,a,[t.x,t.y]),a},intersect:function(t){var e=this,i=e.x,n=e.x+e.width,r=e.y,a=e.y+e[We],o=t.x,s=t.x+t.width,l=t.y,c=t.y+t[We];return!(o>n||i>s||l>a||r>c)},contain:function(t,e){var i=this;return t>=i.x&&t<=i.x+i.width&&e>=i.y&&e<=i.y+i[We]},clone:function(){return new e(this.x,this.y,this.width,this[We])},copy:function(t){this.x=t.x,this.y=t.y,this.width=t.width,this[We]=t[We]}},e}),e("echarts/coord/polar/Polar",[ci,"./RadiusAxis","./AngleAxis"],function(t){var e=t("./RadiusAxis"),i=t("./AngleAxis"),n=function(t){this.name=t||"",this.cx=0,this.cy=0,this._radiusAxis=new e,this._angleAxis=new i};return n[ii]={constructor:n,type:"polar",dimensions:[v,"angle"],containPoint:function(t){var e=this.pointToCoord(t);return this._radiusAxis[ee](e[0])&&this._angleAxis[ee](e[1])},containData:function(t){return this._radiusAxis.containData(t[0])&&this._angleAxis.containData(t[1])},getAxis:function(t){return this["_"+t+"Axis"]},getAxesByScale:function(t){var e=[],i=this._angleAxis,n=this._radiusAxis;return i.scale.type===t&&e.push(i),n.scale.type===t&&e.push(n),e},getAngleAxis:function(){return this._angleAxis},getRadiusAxis:function(){return this._radiusAxis},getOtherAxis:function(t){var e=this._angleAxis;return t===e?this._radiusAxis:e},getBaseAxis:function(){return this.getAxesByScale(E)[0]||this.getAxesByScale("time")[0]||this.getAngleAxis()},dataToPoints:function(t){return t.mapArray(this[R],function(t,e){return this[$]([t,e])},this)},dataToPoint:function(t,e){return this.coordToPoint([this._radiusAxis.dataToRadius(t[0],e),this._angleAxis.dataToAngle(t[1],e)])},pointToData:function(t,e){var i=this.pointToCoord(t);return[this._radiusAxis.radiusToData(i[0],e),this._angleAxis.angleToData(i[1],e)]},pointToCoord:function(t){var e=t[0]-this.cx,i=t[1]-this.cy,n=this.getAngleAxis(),r=n[K](),a=Math.min(r[0],r[1]),o=Math.max(r[0],r[1]);n.inverse?a=o-360:o=a+360;var s=Math.sqrt(e*e+i*i);e/=s,i/=s;for(var l=Math.atan2(-i,e)/Math.PI*180,c=a>l?1:-1;a>l||l>o;)l+=360*c;return[s,l]},coordToPoint:function(t){var e=t[0],i=t[1]/180*Math.PI,n=Math.cos(i)*e+this.cx,r=-Math.sin(i)*e+this.cy;return[n,r]}},n}),e("echarts/util/clazz",[ci,li],function(t){function e(t,e){var i=n.slice(arguments,2);return this.superClass[ii][e].apply(t,i)}function i(t,e,i){return this.superClass[ii][e].apply(t,i)}var n=t(li),r={},a=".",o="___EC__COMPONENT__CONTAINER___",s=r.parseClassType=function(t){var e={main:"",sub:""};return t&&(t=t.split(a),e.main=t[0]||"",e.sub=t[1]||""),e};return r.enableClassExtend=function(t){t.$constructor=t,t[Be]=function(t){var r=this,a=function(){t.$constructor?t.$constructor.apply(this,arguments):r.apply(this,arguments)};return n[Be](a[ii],t),a[Be]=this[Be],a.superCall=e,a.superApply=i,n[de](a,this),a.superClass=r,a}},r.enableClassManagement=function(t,e){function i(t){var e=r[t.main];return e&&e[o]||(e=r[t.main]={},e[o]=!0),e}e=e||{};var r={};if(t.registerClass=function(t,e){if(e)if(e=s(e),e.sub){if(e.sub!==o){var n=i(e);n[e.sub]=t}}else r[e.main]=t;return t},t.getClass=function(t,e,i){var n=r[t];if(n&&n[o]&&(n=e?n[e]:null),i&&!n)throw new Error("Component "+t+"."+(e||"")+" not exists. Load it first.");return n},t.getClassesByMainType=function(t){t=s(t);var e=[],i=r[t.main];return i&&i[o]?n.each(i,function(t,i){i!==o&&e.push(t)}):e.push(i),e},t.hasClass=function(t){return t=s(t),!!r[t.main]},t.getAllClassMainTypes=function(){var t=[];return n.each(r,function(e,i){t.push(i)}),t},t.hasSubTypes=function(t){t=s(t);var e=r[t.main];return e&&e[o]},t.parseClassType=s,e.registerWhenExtend){var a=t[Be];a&&(t[Be]=function(e){var i=a.call(this,e);return t.registerClass(i,e.type)})}return t},r.setReadOnly=function(){},r}),e("echarts/model/mixin/lineStyle",[ci,"./makeStyleMapper"],function(t){var e=t("./makeStyleMapper")([[f,"width"],[h,"color"],[ie],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]);return{getLineStyle:function(t){var i=e.call(this,t),n=this.getLineDash();
return n&&(i.lineDash=n),i},getLineDash:function(){var t=this.get("type");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[2,2]}}}),e("echarts/model/mixin/areaStyle",[ci,"./makeStyleMapper"],function(t){return{getAreaStyle:t("./makeStyleMapper")([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],[ie],["shadowColor"]])}}),e("echarts/model/mixin/itemStyle",[ci,"./makeStyleMapper"],function(t){var e=t("./makeStyleMapper")([["fill","color"],[h,"borderColor"],[f,"borderWidth"],[ie],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]);return{getItemStyle:function(t){var i=e.call(this,t),n=this.getBorderLineDash();return n&&(i.lineDash=n),i},getBorderLineDash:function(){var t=this.get("borderType");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[1,1]}}}),e("echarts/component/helper/selectableMixin",[ci,li],function(t){var e=t(li);return{updateSelectedMap:function(t){this._selectTargetMap=e.reduce(t||[],function(t,e){return t[e.name]=e,t},{})},select:function(t){var i=this._selectTargetMap,n=i[t],r=this.get("selectedMode");"single"===r&&e.each(i,function(t){t.selected=!1}),n&&(n.selected=!0)},unSelect:function(t){var e=this._selectTargetMap[t];e&&(e.selected=!1)},toggleSelected:function(t){var e=this._selectTargetMap[t];return null!=e?(this[e.selected?"unSelect":"select"](t),e.selected):void 0},isSelected:function(t){var e=this._selectTargetMap[t];return e&&e.selected}}}),e("echarts/component/marker/MarkerModel",[ci,g,li,oi,Y,D],function(t){function e(t){i.defaultEmphasis(t.label,i.LABEL_OPTIONS)}var i=t(g),n=t(li),r=t(oi),a=t(Y),o=a[X],s=a.encodeHTML,l=t(D).extendComponentModel({type:"marker",dependencies:[De,"grid","polar","geo"],init:function(t,e,i,n){this.mergeDefaultAndTheme(t,i),this[W](t,i,n.createdBySelf,!0)},ifEnableAnimation:function(){if(r.node)return!1;var t=this.__hostSeries;return this[u](Ke)&&t&&t.ifEnableAnimation()},mergeOption:function(t,i,r,a){var o=this.constructor,s=this[m]+"Model";r||i[Fe](function(t){var r=t.get(this[m]),l=t[s];if(!r||!r.data)return void(t[s]=null);if(l)l[W](r,i,!0);else{a&&e(r),n.each(r.data,function(t){t instanceof Array?(e(t[0]),e(t[1])):e(t)});var c={mainType:this[m],seriesIndex:t[Se],name:t.name,createdBySelf:!0};l=new o(r,this,i,c),l.__hostSeries=t}t[s]=l},this)},formatTooltip:function(t){var e=this[si](),i=this[H](t),r=n[ye](i)?n.map(i,o).join(", "):o(i),a=e[F](t),l=this.name;return(null!=i||a)&&(l+="<br />"),a&&(l+=s(a),null!=i&&(l+=" : ")),null!=i&&(l+=r),l},getData:function(){return this._data},setData:function(t){this._data=t}});return n.mixin(l,i.dataFormatMixin),l}),e("zrender/graphic/LinearGradient",[ci,"../core/util","./Gradient"],function(t){var e=t("../core/util"),i=t("./Gradient"),n=function(t,e,n,r,a,o){this.x=null==t?0:t,this.y=null==e?0:e,this.x2=null==n?1:n,this.y2=null==r?0:r,this.type="linear",this.global=o||!1,i.call(this,a)};return n[ii]={constructor:n},e[de](n,i),n}),e("zrender/core/PathProxy",[ci,"./curve","./vector","./bbox","./BoundingRect","../config"],function(t){var e=t("./curve"),i=t("./vector"),n=t("./bbox"),a=t("./BoundingRect"),o=t("../config").devicePixelRatio,s={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},l=[],c=[],u=[],f=[],d=Math.min,p=Math.max,m=Math.cos,v=Math.sin,g=Math.sqrt,y=Math.abs,x=typeof Float32Array!=_,b=function(){this.data=[],this._len=0,this._ctx=null,this._xi=0,this._yi=0,this._x0=0,this._y0=0,this._ux=0,this._uy=0};return b[ii]={constructor:b,_lineDash:null,_dashOffset:0,_dashIdx:0,_dashSum:0,setScale:function(t,e){this._ux=y(1/o/t)||0,this._uy=y(1/o/e)||0},getContext:function(){return this._ctx},beginPath:function(t){return this._ctx=t,t&&t.beginPath(),t&&(this.dpr=t.dpr),this._len=0,this._lineDash&&(this._lineDash=null,this._dashOffset=0),this},moveTo:function(t,e){return this.addData(s.M,t,e),this._ctx&&this._ctx[r](t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this},lineTo:function(t,e){var i=y(t-this._xi)>this._ux||y(e-this._yi)>this._uy||this._len<5;return this.addData(s.L,t,e),this._ctx&&i&&(this._needsDash()?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),i&&(this._xi=t,this._yi=e),this},bezierCurveTo:function(t,e,i,n,r,a){return this.addData(s.C,t,e,i,n,r,a),this._ctx&&(this._needsDash()?this._dashedBezierTo(t,e,i,n,r,a):this._ctx.bezierCurveTo(t,e,i,n,r,a)),this._xi=r,this._yi=a,this},quadraticCurveTo:function(t,e,i,n){return this.addData(s.Q,t,e,i,n),this._ctx&&(this._needsDash()?this._dashedQuadraticTo(t,e,i,n):this._ctx.quadraticCurveTo(t,e,i,n)),this._xi=i,this._yi=n,this},arc:function(t,e,i,n,r,a){return this.addData(s.A,t,e,i,i,n,r-n,0,a?0:1),this._ctx&&this._ctx.arc(t,e,i,n,r,a),this._xi=m(r)*i+t,this._xi=v(r)*i+t,this},arcTo:function(t,e,i,n,r){return this._ctx&&this._ctx.arcTo(t,e,i,n,r),this},rect:function(t,e,i,n){return this._ctx&&this._ctx.rect(t,e,i,n),this.addData(s.R,t,e,i,n),this},closePath:function(){this.addData(s.Z);var t=this._ctx,e=this._x0,i=this._y0;return t&&(this._needsDash()&&this._dashedLineTo(e,i),t.closePath()),this._xi=e,this._yi=i,this},fill:function(t){t&&t.fill(),this.toStatic()},stroke:function(t){t&&t[h](),this.toStatic()},setLineDash:function(t){if(t instanceof Array){this._lineDash=t,this._dashIdx=0;for(var e=0,i=0;i<t[Re];i++)e+=t[i];this._dashSum=e}return this},setLineDashOffset:function(t){return this._dashOffset=t,this},len:function(){return this._len},setData:function(t){var e=t[Re];this.data&&this.data[Re]==e||!x||(this.data=new Float32Array(e));for(var i=0;e>i;i++)this.data[i]=t[i];this._len=e},appendPath:function(t){t instanceof Array||(t=[t]);for(var e=t[Re],i=0,n=this._len,r=0;e>r;r++)i+=t[r].len();x&&this.data instanceof Float32Array&&(this.data=new Float32Array(n+i));for(var r=0;e>r;r++)for(var a=t[r].data,o=0;o<a[Re];o++)this.data[n++]=a[o];this._len=n},addData:function(t){var e=this.data;this._len+arguments[Re]>e[Re]&&(this._expandData(),e=this.data);for(var i=0;i<arguments[Re];i++)e[this._len++]=arguments[i];this._prevCmd=t},_expandData:function(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++)t[e]=this.data[e];this.data=t}},_needsDash:function(){return this._lineDash},_dashedLineTo:function(t,e){var i,n,a=this._dashSum,o=this._dashOffset,s=this._lineDash,l=this._ctx,c=this._xi,u=this._yi,h=t-c,f=e-u,m=g(h*h+f*f),v=c,y=u,x=s[Re];for(h/=m,f/=m,0>o&&(o=a+o),o%=a,v-=o*h,y-=o*f;h>0&&t>=v||0>h&&v>=t||0==h&&(f>0&&e>=y||0>f&&y>=e);)n=this._dashIdx,i=s[n],v+=h*i,y+=f*i,this._dashIdx=(n+1)%x,h>0&&c>v||0>h&&v>c||f>0&&u>y||0>f&&y>u||l[n%2?r:"lineTo"](h>=0?d(v,t):p(v,t),f>=0?d(y,e):p(y,e));h=v-t,f=y-e,this._dashOffset=-g(h*h+f*f)},_dashedBezierTo:function(t,i,n,a,o,s){var l,c,u,h,f,d=this._dashSum,p=this._dashOffset,m=this._lineDash,v=this._ctx,y=this._xi,x=this._yi,_=e.cubicAt,b=0,w=this._dashIdx,M=m[Re],S=0;for(0>p&&(p=d+p),p%=d,l=0;1>l;l+=.1)c=_(y,t,n,o,l+.1)-_(y,t,n,o,l),u=_(x,i,a,s,l+.1)-_(x,i,a,s,l),b+=g(c*c+u*u);for(;M>w&&(S+=m[w],!(S>p));w++);for(l=(S-p)/b;1>=l;)h=_(y,t,n,o,l),f=_(x,i,a,s,l),w%2?v[r](h,f):v.lineTo(h,f),l+=m[w]/b,w=(w+1)%M;w%2!==0&&v.lineTo(o,s),c=o-h,u=s-f,this._dashOffset=-g(c*c+u*u)},_dashedQuadraticTo:function(t,e,i,n){var r=i,a=n;i=(i+2*t)/3,n=(n+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,i,n,r,a)},toStatic:function(){var t=this.data;t instanceof Array&&(t[Re]=this._len,x&&(this.data=new Float32Array(t)))},getBoundingRect:function(){l[0]=l[1]=u[0]=u[1]=Number.MAX_VALUE,c[0]=c[1]=f[0]=f[1]=-Number.MAX_VALUE;for(var t=this.data,e=0,r=0,o=0,h=0,d=0;d<t[Re];){var p=t[d++];switch(1==d&&(e=t[d],r=t[d+1],o=e,h=r),p){case s.M:o=t[d++],h=t[d++],e=o,r=h,u[0]=o,u[1]=h,f[0]=o,f[1]=h;break;case s.L:n.fromLine(e,r,t[d],t[d+1],u,f),e=t[d++],r=t[d++];break;case s.C:n.fromCubic(e,r,t[d++],t[d++],t[d++],t[d++],t[d],t[d+1],u,f),e=t[d++],r=t[d++];break;case s.Q:n.fromQuadratic(e,r,t[d++],t[d++],t[d],t[d+1],u,f),e=t[d++],r=t[d++];break;case s.A:var g=t[d++],y=t[d++],x=t[d++],_=t[d++],b=t[d++],w=t[d++]+b,M=(t[d++],1-t[d++]);1==d&&(o=m(b)*x+g,h=v(b)*_+y),n.fromArc(g,y,x,_,b,w,M,u,f),e=m(w)*x+g,r=v(w)*_+y;break;case s.R:o=e=t[d++],h=r=t[d++];var S=t[d++],T=t[d++];n.fromLine(o,h,o+S,h+T,u,f);break;case s.Z:e=o,r=h}i.min(l,l,u),i.max(c,c,f)}return 0===d&&(l[0]=l[1]=c[0]=c[1]=0),new a(l[0],l[1],c[0]-l[0],c[1]-l[1])},rebuildPath:function(t){for(var e,i,n,a,o,l,c=this.data,u=this._ux,h=this._uy,f=this._len,d=0;f>d;){var p=c[d++];switch(1==d&&(n=c[d],a=c[d+1],e=n,i=a),p){case s.M:e=n=c[d++],i=a=c[d++],t[r](n,a);break;case s.L:o=c[d++],l=c[d++],(y(o-n)>u||y(l-a)>h||d===f-1)&&(t.lineTo(o,l),n=o,a=l);break;case s.C:t.bezierCurveTo(c[d++],c[d++],c[d++],c[d++],c[d++],c[d++]),n=c[d-2],a=c[d-1];break;case s.Q:t.quadraticCurveTo(c[d++],c[d++],c[d++],c[d++]),n=c[d-2],a=c[d-1];break;case s.A:var g=c[d++],x=c[d++],_=c[d++],b=c[d++],w=c[d++],M=c[d++],S=c[d++],T=c[d++],C=_>b?_:b,A=_>b?1:_/b,L=_>b?b/_:1,P=Math.abs(_-b)>.001,k=w+M;P?(t.translate(g,x),t.rotate(S),t.scale(A,L),t.arc(0,0,C,w,k,1-T),t.scale(1/A,1/L),t.rotate(-S),t.translate(-g,-x)):t.arc(g,x,C,w,k,1-T),1==d&&(e=m(w)*_+g,i=v(w)*b+x),n=m(k)*_+g,a=v(k)*b+x;break;case s.R:e=n=c[d],i=a=c[d+1],t.rect(c[d++],c[d++],c[d++],c[d++]);break;case s.Z:t.closePath(),n=e,a=i}}}},b.CMD=s,b}),e("zrender/graphic/mixin/RectText",[ci,"../../contain/text","../../core/BoundingRect"],function(t){function e(t,e){return typeof t===ei?t.lastIndexOf("%")>=0?parseFloat(t)/100*e:parseFloat(t):t}var i=t("../../contain/text"),n=t("../../core/BoundingRect"),r=new n,o=function(){};return o[ii]={constructor:o,drawRectText:function(t,n,o){var s=this.style,l=s.text;if(null!=l&&(l+=""),l){t.save();var c,u,h=s.textPosition,f=s.textDistance,p=s[ce],m=s.textFont||s.font,v=s.textBaseline,g=s.textVerticalAlign;o=o||i[oe](l,m,p,v);var y=this[a];if(s.textTransform?this.setTransform(t):y&&(r.copy(n),r[d](y),n=r),h instanceof Array){if(c=n.x+e(h[0],n.width),u=n.y+e(h[1],n[We]),p=p||"left",v=v||"top",g){switch(g){case ae:u-=o[We]/2-o.lineHeight/2;break;case Ze:u-=o[We]-o.lineHeight/2;break;default:u+=o.lineHeight/2}v=ae}}else{var x=i.adjustTextPositionOnRect(h,n,o,f);c=x.x,u=x.y,p=p||x[ce],v=v||x.textBaseline}t[ce]=p||"left",t.textBaseline=v||"alphabetic";var _=s.textFill,b=s.textStroke;_&&(t.fillStyle=_),b&&(t.strokeStyle=b),t.font=m||"12px sans-serif",t.shadowBlur=s.textShadowBlur,t.shadowColor=s.textShadowColor||"transparent",t.shadowOffsetX=s.textShadowOffsetX,t.shadowOffsetY=s.textShadowOffsetY;var w=l.split("\n");s.textRotation&&(y&&t.translate(y[4],y[5]),t.rotate(s.textRotation),y&&t.translate(-y[4],-y[5]));for(var M=0;M<w[Re];M++)_&&t.fillText(w[M],c,u),b&&t.strokeText(w[M],c,u),u+=o.lineHeight;t.restore()}}},o}),e("echarts/model/mixin/textStyle",[ci,"zrender/contain/text"],function(t){function e(t,e){return t&&t[u](e)}var i=t("zrender/contain/text");return{getTextColor:function(){var t=this[s];return this[u]("color")||t&&t.get("textStyle.color")},getFont:function(){var t=this[s],i=t&&t[Je](ue);return[this[u]("fontStyle")||e(i,"fontStyle"),this[u]("fontWeight")||e(i,"fontWeight"),(this[u]("fontSize")||e(i,"fontSize")||12)+"px",this[u]("fontFamily")||e(i,"fontFamily")||"sans-serif"].join(" ")},getTextRect:function(t){var e=this.get(ue)||{};return i[oe](t,this[le](),e.align,e.baseline)},truncateText:function(t,e,n,r){return i.truncateText(t,e,this[le](),n,r)}}}),e("zrender/tool/transformPath",[ci,"../core/PathProxy","../core/vector"],function(t){function e(t,e){var n,l,c,u,h,f,d=t.data,p=i.M,m=i.C,v=i.L,g=i.R,y=i.A,x=i.Q;for(c=0,u=0;c<d[Re];){switch(n=d[c++],u=c,l=0,n){case p:l=1;break;case v:l=1;break;case m:l=3;break;case x:l=2;break;case y:var _=e[4],b=e[5],w=o(e[0]*e[0]+e[1]*e[1]),M=o(e[2]*e[2]+e[3]*e[3]),S=s(-e[1]/M,e[0]/w);d[c++]+=_,d[c++]+=b,d[c++]*=w,d[c++]*=M,d[c++]+=S,d[c++]+=S,c+=2,u=c;break;case g:f[0]=d[c++],f[1]=d[c++],r(f,f,e),d[u++]=f[0],d[u++]=f[1],f[0]+=d[c++],f[1]+=d[c++],r(f,f,e),d[u++]=f[0],d[u++]=f[1]}for(h=0;l>h;h++){var f=a[h];f[0]=d[c++],f[1]=d[c++],r(f,f,e),d[u++]=f[0],d[u++]=f[1]}}}var i=t("../core/PathProxy").CMD,n=t("../core/vector"),r=n[d],a=[[],[],[]],o=Math.sqrt,s=Math.atan2;return e}),e("zrender/graphic/Displayable",[ci,"../core/util","./Style","../Element","./mixin/RectText"],function(t){function e(t){t=t||{},a.call(this,t);for(var e in t)t.hasOwnProperty(e)&&"style"!==e&&(this[e]=t[e]);this.style=new r(t.style),this._rect=null,this.__clipPaths=[]}var n=t("../core/util"),r=t("./Style"),a=t("../Element"),o=t("./mixin/RectText");return e[ii]={constructor:e,type:"displayable",__dirty:!0,invisible:!1,z:0,z2:0,zlevel:0,draggable:!1,dragging:!1,silent:!1,culling:!1,cursor:"pointer",rectHover:!1,progressive:-1,beforeBrush:function(){},afterBrush:function(){},brush:function(){},getBoundingRect:function(){},contain:function(t,e){return this.rectContain(t,e)},traverse:function(t,e){t.call(e,this)},rectContain:function(t,e){var i=this.transformCoordToLocal(t,e),n=this[oe]();return n[ee](i[0],i[1])},dirty:function(){this[i]=!0,this._rect=null,this.__zr&&this.__zr.refresh()},animateStyle:function(t){return this.animate("style",t)},attrKV:function(t,e){"style"!==t?a[ii].attrKV.call(this,t,e):this.style.set(e)},setStyle:function(t,e){return this.style.set(t,e),this.dirty(!1),this},useStyle:function(t){return this.style=new r(t),this.dirty(!1),this}},n[de](e,a),n.mixin(e,o),e}),e("zrender/vml/core",[ci,"exports","module","../core/env"],function(t,e,i){if(!t("../core/env")[je]){var n,r="urn:schemas-microsoft-com:vml",a=window,o=a.document,s=!1;try{!o.namespaces.zrvml&&o.namespaces.add("zrvml",r),n=function(t){return o[J]("<zrvml:"+t+' class="zrvml">')}}catch(l){n=function(t){return o[J]("<"+t+' xmlns="'+r+'" class="zrvml">')}}var c=function(){if(!s){s=!0;var t=o.styleSheets;t[Re]<31?o.createStyleSheet().addRule(".zrvml","behavior:url(#default#VML)"):t[0].addRule(".zrvml","behavior:url(#default#VML)")}};i.exports={doc:o,initVML:c,createNode:n}}}),e("zrender/graphic/Pattern",[ci],function(){var t=function(t,e){this.image=t,this.repeat=e,this.type="pattern"};return t[ii].getCanvasPattern=function(t){return this._canvasPattern||(this._canvasPattern=t.createPattern(this.image,this.repeat))},t}),e("zrender/contain/path",[ci,"../core/PathProxy","./line","./cubic","./quadratic","./arc","./util","../core/curve","./windingLine"],function(t){function e(t,e){return Math.abs(t-e)<g}function i(){var t=x[0];x[0]=x[1],x[1]=t}function n(t,e,n,r,a,o,s,l,c,u){if(u>e&&u>r&&u>o&&u>l||e>u&&r>u&&o>u&&l>u)return 0;var h=d.cubicRootAt(e,r,o,l,u,y);if(0===h)return 0;for(var f,p,m=0,v=-1,g=0;h>g;g++){var _=y[g],b=0===_||1===_?.5:1,w=d.cubicAt(t,n,a,s,_);c>w||(0>v&&(v=d.cubicExtrema(e,r,o,l,x),x[1]<x[0]&&v>1&&i(),f=d.cubicAt(e,r,o,l,x[0]),v>1&&(p=d.cubicAt(e,r,o,l,x[1]))),m+=2==v?_<x[0]?e>f?b:-b:_<x[1]?f>p?b:-b:p>l?b:-b:_<x[0]?e>f?b:-b:f>l?b:-b)}return m}function r(t,e,i,n,r,a,o,s){if(s>e&&s>n&&s>a||e>s&&n>s&&a>s)return 0;var l=d.quadraticRootAt(e,n,a,s,y);if(0===l)return 0;var c=d.quadraticExtremum(e,n,a);if(c>=0&&1>=c){for(var u=0,h=d.quadraticAt(e,n,a,c),f=0;l>f;f++){var p=0===y[f]||1===y[f]?.5:1,m=d.quadraticAt(t,i,r,y[f]);o>m||(u+=y[f]<c?e>h?p:-p:h>a?p:-p)}return u}var p=0===y[0]||1===y[0]?.5:1,m=d.quadraticAt(t,i,r,y[0]);return o>m?0:e>a?p:-p}function a(t,e,i,n,r,a,o,s){if(s-=e,s>i||-i>s)return 0;var l=Math.sqrt(i*i-s*s);y[0]=-l,y[1]=l;var c=Math.abs(n-r);if(1e-4>c)return 0;if(1e-4>c%v){n=0,r=v;var u=a?1:-1;return o>=y[0]+t&&o<=y[1]+t?u:0}if(a){var l=n;n=f(r),r=f(l)}else n=f(n),r=f(r);n>r&&(r+=v);for(var h=0,d=0;2>d;d++){var p=y[d];if(p+t>o){var m=Math.atan2(s,p),u=a?1:-1;0>m&&(m=v+m),(m>=n&&r>=m||m+v>=n&&r>=m+v)&&(m>Math.PI/2&&m<1.5*Math.PI&&(u=-u),h+=u)}}return h}function o(t,i,o,l,f){for(var d=0,v=0,g=0,y=0,x=0,_=0;_<t[Re];){var b=t[_++];switch(b===s.M&&_>1&&(o||(d+=p(v,g,y,x,l,f))),1==_&&(v=t[_],g=t[_+1],y=v,x=g),b){case s.M:y=t[_++],x=t[_++],v=y,g=x;break;case s.L:if(o){if(m(v,g,t[_],t[_+1],i,l,f))return!0}else d+=p(v,g,t[_],t[_+1],l,f)||0;v=t[_++],g=t[_++];break;case s.C:if(o){if(c.containStroke(v,g,t[_++],t[_++],t[_++],t[_++],t[_],t[_+1],i,l,f))return!0}else d+=n(v,g,t[_++],t[_++],t[_++],t[_++],t[_],t[_+1],l,f)||0;v=t[_++],g=t[_++];break;case s.Q:if(o){if(u.containStroke(v,g,t[_++],t[_++],t[_],t[_+1],i,l,f))return!0}else d+=r(v,g,t[_++],t[_++],t[_],t[_+1],l,f)||0;v=t[_++],g=t[_++];break;case s.A:var w=t[_++],M=t[_++],S=t[_++],T=t[_++],C=t[_++],A=t[_++],L=(t[_++],1-t[_++]),P=Math.cos(C)*S+w,k=Math.sin(C)*T+M;_>1?d+=p(v,g,P,k,l,f):(y=P,x=k);var z=(l-w)*T/S+w;if(o){if(h.containStroke(w,M,T,C,C+A,L,i,z,f))return!0}else d+=a(w,M,T,C,C+A,L,z,f);v=Math.cos(C+A)*S+w,g=Math.sin(C+A)*T+M;break;case s.R:y=v=t[_++],x=g=t[_++];var D=t[_++],I=t[_++],P=y+D,k=x+I;if(o){if(m(y,x,P,x,i,l,f)||m(P,x,P,k,i,l,f)||m(P,k,y,k,i,l,f)||m(y,k,y,x,i,l,f))return!0}else d+=p(P,x,P,k,l,f),d+=p(y,k,y,x,l,f);break;case s.Z:if(o){if(m(v,g,y,x,i,l,f))return!0}else d+=p(v,g,y,x,l,f);v=y,g=x}}return o||e(g,x)||(d+=p(v,g,y,x,l,f)||0),0!==d}var s=t("../core/PathProxy").CMD,l=t("./line"),c=t("./cubic"),u=t("./quadratic"),h=t("./arc"),f=t("./util").normalizeRadian,d=t("../core/curve"),p=t("./windingLine"),m=l.containStroke,v=2*Math.PI,g=1e-4,y=[-1,-1,-1],x=[-1,-1];return{contain:function(t,e,i){return o(t,0,!1,e,i)},containStroke:function(t,e,i,n){return o(t,e,!0,i,n)}}}),e("echarts/coord/polar/RadiusAxis",[ci,li,"../Axis"],function(t){function e(t,e){n.call(this,v,t,e),this.type=V}var i=t(li),n=t("../Axis");return e[ii]={constructor:e,dataToRadius:n[ii][w],radiusToData:n[ii].coordToData},i[de](e,n),e}),e("echarts/model/mixin/makeStyleMapper",[ci,li],function(t){var e=t(li);return function(t){for(var i=0;i<t[Re];i++)t[i][1]||(t[i][1]=t[i][0]);return function(i){for(var n={},r=0;r<t[Re];r++){var a=t[r][1];if(!(i&&e[pe](i,a)>=0)){var o=this[u](a);null!=o&&(n[t[r][0]]=o)}}return n}}}),e("echarts/scale/Ordinal",[ci,li,"./Scale"],function(t){var e=t(li),i=t("./Scale"),n=i[ii],r=i[Be]({type:"ordinal",init:function(t,e){this._data=t,this._extent=e||[0,t[Re]-1]},parse:function(t){return typeof t===ei?e[pe](this._data,t):Math.round(t)},contain:function(t){return t=this.parse(t),n[ee].call(this,t)&&null!=this._data[t]},normalize:function(t){return n.normalize.call(this,this.parse(t))},scale:function(t){return Math.round(n.scale.call(this,t))},getTicks:function(){for(var t=[],e=this._extent,i=e[0];i<=e[1];)t.push(i),i++;return t},getLabel:function(t){return this._data[t]},count:function(){return this._extent[1]-this._extent[0]+1},niceTicks:e.noop,niceExtent:e.noop});return r[qe]=function(){return new r},r}),e("echarts/coord/polar/AngleAxis",[ci,li,"../Axis"],function(t){function e(t,e){e=e||[0,360],n.call(this,"angle",t,e),this.type=V}var i=t(li),n=t("../Axis");return e[ii]={constructor:e,dataToAngle:n[ii][w],angleToData:n[ii].coordToData},i[de](e,n),e}),e("zrender/core/curve",[ci,"./vector"],function(t){function e(t){return t>-_&&_>t}function i(t){return t>_||-_>t}function n(t,e,i,n,r){var a=1-r;return a*a*(a*t+3*r*e)+r*r*(r*n+3*a*i)}function r(t,e,i,n,r){var a=1-r;return 3*(((e-t)*a+2*(i-e)*r)*a+(n-i)*r*r)}function a(t,i,n,r,a,o){var s=r+3*(i-n)-t,l=3*(n-2*i+t),c=3*(i-t),u=t-a,h=l*l-3*s*c,f=l*c-9*s*u,d=c*c-3*l*u,p=0;if(e(h)&&e(f))if(e(l))o[0]=0;else{var m=-c/l;m>=0&&1>=m&&(o[p++]=m)}else{var v=f*f-4*h*d;if(e(v)){var g=f/h,m=-l/s+g,_=-g/2;m>=0&&1>=m&&(o[p++]=m),_>=0&&1>=_&&(o[p++]=_)}else if(v>0){var b=x(v),S=h*l+1.5*s*(-f+b),T=h*l+1.5*s*(-f-b);S=0>S?-y(-S,M):y(S,M),T=0>T?-y(-T,M):y(T,M);var m=(-l-(S+T))/(3*s);m>=0&&1>=m&&(o[p++]=m)}else{var C=(2*h*l-3*s*f)/(2*x(h*h*h)),A=Math.acos(C)/3,L=x(h),P=Math.cos(A),m=(-l-2*L*P)/(3*s),_=(-l+L*(P+w*Math.sin(A)))/(3*s),k=(-l+L*(P-w*Math.sin(A)))/(3*s);m>=0&&1>=m&&(o[p++]=m),_>=0&&1>=_&&(o[p++]=_),k>=0&&1>=k&&(o[p++]=k)}}return p}function o(t,n,r,a,o){var s=6*r-12*n+6*t,l=9*n+3*a-3*t-9*r,c=3*n-3*t,u=0;if(e(l)){if(i(s)){var h=-c/s;h>=0&&1>=h&&(o[u++]=h)}}else{var f=s*s-4*l*c;if(e(f))o[0]=-s/(2*l);else if(f>0){var d=x(f),h=(-s+d)/(2*l),p=(-s-d)/(2*l);h>=0&&1>=h&&(o[u++]=h),p>=0&&1>=p&&(o[u++]=p)}}return u}function s(t,e,i,n,r,a){var o=(e-t)*r+t,s=(i-e)*r+e,l=(n-i)*r+i,c=(s-o)*r+o,u=(l-s)*r+s,h=(u-c)*r+c;a[0]=t,a[1]=o,a[2]=c,a[3]=h,a[4]=h,a[5]=u,a[6]=l,a[7]=n}function l(t,e,i,r,a,o,s,l,c,u,h){var f,d,p,m,v,y=.005,_=1/0;S[0]=c,S[1]=u;for(var w=0;1>w;w+=.05)T[0]=n(t,i,a,s,w),T[1]=n(e,r,o,l,w),m=g(S,T),_>m&&(f=w,_=m);_=1/0;for(var M=0;32>M&&!(b>y);M++)d=f-y,p=f+y,T[0]=n(t,i,a,s,d),T[1]=n(e,r,o,l,d),m=g(T,S),d>=0&&_>m?(f=d,_=m):(C[0]=n(t,i,a,s,p),C[1]=n(e,r,o,l,p),v=g(C,S),1>=p&&_>v?(f=p,_=v):y*=.5);return h&&(h[0]=n(t,i,a,s,f),h[1]=n(e,r,o,l,f)),x(_)}function c(t,e,i,n){var r=1-n;return r*(r*t+2*n*e)+n*n*i}function u(t,e,i,n){return 2*((1-n)*(e-t)+n*(i-e))}function h(t,n,r,a,o){var s=t-2*n+r,l=2*(n-t),c=t-a,u=0;if(e(s)){if(i(l)){var h=-c/l;h>=0&&1>=h&&(o[u++]=h)}}else{var f=l*l-4*s*c;if(e(f)){var h=-l/(2*s);h>=0&&1>=h&&(o[u++]=h)}else if(f>0){var d=x(f),h=(-l+d)/(2*s),p=(-l-d)/(2*s);h>=0&&1>=h&&(o[u++]=h),p>=0&&1>=p&&(o[u++]=p)}}return u}function f(t,e,i){var n=t+i-2*e;return 0===n?.5:(t-e)/n}function d(t,e,i,n,r){var a=(e-t)*n+t,o=(i-e)*n+e,s=(o-a)*n+a;r[0]=t,r[1]=a,r[2]=s,r[3]=s,r[4]=o,r[5]=i}function p(t,e,i,n,r,a,o,s,l){var u,h=.005,f=1/0;S[0]=o,S[1]=s;for(var d=0;1>d;d+=.05){T[0]=c(t,i,r,d),T[1]=c(e,n,a,d);var p=g(S,T);f>p&&(u=d,f=p)}f=1/0;for(var m=0;32>m&&!(b>h);m++){var v=u-h,y=u+h;T[0]=c(t,i,r,v),T[1]=c(e,n,a,v);var p=g(T,S);if(v>=0&&f>p)u=v,f=p;else{C[0]=c(t,i,r,y),C[1]=c(e,n,a,y);var _=g(C,S);1>=y&&f>_?(u=y,f=_):h*=.5}}return l&&(l[0]=c(t,i,r,u),l[1]=c(e,n,a,u)),x(f)}var m=t("./vector"),v=m[qe],g=m.distSquare,y=Math.pow,x=Math.sqrt,_=1e-8,b=1e-4,w=x(3),M=1/3,S=v(),T=v(),C=v();return{cubicAt:n,cubicDerivativeAt:r,cubicRootAt:a,cubicExtrema:o,cubicSubdivide:s,cubicProjectPoint:l,quadraticAt:c,quadraticDerivativeAt:u,quadraticRootAt:h,quadraticExtremum:f,quadraticSubdivide:d,quadraticProjectPoint:p}}),e("zrender/config",[],function(){var t=1;typeof window!==_&&(t=Math.max(window.devicePixelRatio||1,1));var e={debugMode:0,devicePixelRatio:t};return e}),e("zrender/graphic/Style",[ci],function(){function t(t,e,i){var n=e.x,r=e.x2,a=e.y,o=e.y2;e.global||(n=n*i.width+i.x,r=r*i.width+i.x,a=a*i[We]+i.y,o=o*i[We]+i.y);var s=t.createLinearGradient(n,a,r,o);return s}function e(t,e,i){var n=i.width,r=i[We],a=Math.min(n,r),o=e.x,s=e.y,l=e.r;e.global||(o=o*n+i.x,s=s*r+i.y,l*=a);var c=t.createRadialGradient(o,s,0,o,s,l);return c}var i=[["shadowBlur",0],["shadowOffsetX",0],["shadowOffsetY",0],["shadowColor","#000"],["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],n=function(t){this.extendFrom(t)};n[ii]={constructor:n,fill:"#000000",stroke:null,opacity:1,lineDash:null,lineDashOffset:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,lineWidth:1,strokeNoScale:!1,text:null,textFill:"#000",textStroke:null,textPosition:"inside",textBaseline:null,textAlign:null,textVerticalAlign:null,textDistance:5,textShadowBlur:0,textShadowOffsetX:0,textShadowOffsetY:0,textTransform:!1,textRotation:0,blend:null,bind:function(t,e,n){for(var r=this,a=n&&n.style,o=!a,s=0;s<i[Re];s++){var l=i[s],c=l[0];(o||r[c]!==a[c])&&(t[c]=r[c]||l[1])}if((o||r.fill!==a.fill)&&(t.fillStyle=r.fill),(o||r[h]!==a[h])&&(t.strokeStyle=r[h]),(o||r[ie]!==a[ie])&&(t.globalAlpha=null==r[ie]?1:r[ie]),(o||r.blend!==a.blend)&&(t.globalCompositeOperation=r.blend||"source-over"),this.hasStroke()){var u=r[f];t[f]=u/(this.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1)}},hasFill:function(){var t=this.fill;return null!=t&&"none"!==t},hasStroke:function(){var t=this[h];return null!=t&&"none"!==t&&this[f]>0},extendFrom:function(t,e){if(t){var i=this;for(var n in t)!t.hasOwnProperty(n)||!e&&i.hasOwnProperty(n)||(i[n]=t[n])}},set:function(t,e){typeof t===ei?this[t]=e:this.extendFrom(t,!0)},clone:function(){var t=new this.constructor;return t.extendFrom(this,!0),t},getGradient:function(i,n,r){for(var a="radial"===n.type?e:t,o=a(i,n,r),s=n.colorStops,l=0;l<s[Re];l++)o.addColorStop(s[l].offset,s[l].color);return o}};for(var r=n[ii],a=0;a<i[Re];a++){var o=i[a];o[0]in r||(r[o[0]]=o[1])}return n.getGradient=r.getGradient,n}),e("echarts/coord/Axis",[ci,"../util/number",li],function(t){function e(t,e){var i=t[1]-t[0],n=e,r=i/n/2;t[0]+=r,t[1]-=r}var i=t("../util/number"),n=i.linearMap,r=t(li),a=[0,1],o=function(t,e,i){this.dim=t,this.scale=e,this._extent=i||[0,0],this.inverse=!1,this.onBand=!1};return o[ii]={constructor:o,contain:function(t){var e=this._extent,i=Math.min(e[0],e[1]),n=Math.max(e[0],e[1]);return t>=i&&n>=t},containData:function(t){return this[ee](this[w](t))},getExtent:function(){var t=this._extent.slice();return t},getPixelPrecision:function(t){return i.getPixelPrecision(t||this.scale[K](),this._extent)},setExtent:function(t,e){var i=this._extent;i[0]=t,i[1]=e},dataToCoord:function(t,i){var r=this._extent,o=this.scale;return t=o.normalize(t),this.onBand&&o.type===E&&(r=r.slice(),e(r,o.count())),n(t,a,r,i)},coordToData:function(t,i){var r=this._extent,o=this.scale;this.onBand&&o.type===E&&(r=r.slice(),e(r,o.count()));var s=n(t,r,a,i);return this.scale.scale(s)},getTicksCoords:function(t){if(this.onBand&&!t){for(var e=this.getBands(),i=[],n=0;n<e[Re];n++)i.push(e[n][0]);return e[n-1]&&i.push(e[n-1][1]),i}return r.map(this.scale[te](),this[w],this)},getLabelsCoords:function(){return r.map(this.scale[te](),this[w],this)},getBands:function(){for(var t=this[K](),e=[],i=this.scale.count(),n=t[0],r=t[1],a=r-n,o=0;i>o;o++)e.push([a*o/i+n,a*(o+1)/i+n]);return e},getBandWidth:function(){var t=this._extent,e=this.scale[K](),i=e[1]-e[0]+(this.onBand?1:0);0===i&&(i=1);var n=Math.abs(t[1]-t[0]);return Math.abs(n)/i}},o}),e("zrender/core/bbox",[ci,"./vector","./curve"],function(t){var e=t("./vector"),i=t("./curve"),n={},r=Math.min,a=Math.max,o=Math.sin,s=Math.cos,l=e[qe](),c=e[qe](),u=e[qe](),h=2*Math.PI;n.fromPoints=function(t,e,i){if(0!==t[Re]){var n,o=t[0],s=o[0],l=o[0],c=o[1],u=o[1];for(n=1;n<t[Re];n++)o=t[n],s=r(s,o[0]),l=a(l,o[0]),c=r(c,o[1]),u=a(u,o[1]);e[0]=s,e[1]=c,i[0]=l,i[1]=u}},n.fromLine=function(t,e,i,n,o,s){o[0]=r(t,i),o[1]=r(e,n),s[0]=a(t,i),s[1]=a(e,n)};var f=[],d=[];return n.fromCubic=function(t,e,n,o,s,l,c,u,h,p){var m,v=i.cubicExtrema,g=i.cubicAt,y=v(t,n,s,c,f);for(h[0]=1/0,h[1]=1/0,p[0]=-1/0,p[1]=-1/0,m=0;y>m;m++){var x=g(t,n,s,c,f[m]);h[0]=r(x,h[0]),p[0]=a(x,p[0])}for(y=v(e,o,l,u,d),m=0;y>m;m++){var _=g(e,o,l,u,d[m]);h[1]=r(_,h[1]),p[1]=a(_,p[1])}h[0]=r(t,h[0]),p[0]=a(t,p[0]),h[0]=r(c,h[0]),p[0]=a(c,p[0]),h[1]=r(e,h[1]),p[1]=a(e,p[1]),h[1]=r(u,h[1]),p[1]=a(u,p[1])},n.fromQuadratic=function(t,e,n,o,s,l,c,u){var h=i.quadraticExtremum,f=i.quadraticAt,d=a(r(h(t,n,s),1),0),p=a(r(h(e,o,l),1),0),m=f(t,n,s,d),v=f(e,o,l,p);c[0]=r(t,s,m),c[1]=r(e,l,v),u[0]=a(t,s,m),u[1]=a(e,l,v)},n.fromArc=function(t,i,n,r,a,f,d,p,m){var v=e.min,g=e.max,y=Math.abs(a-f);if(1e-4>y%h&&y>1e-4)return p[0]=t-n,p[1]=i-r,m[0]=t+n,void(m[1]=i+r);if(l[0]=s(a)*n+t,l[1]=o(a)*r+i,c[0]=s(f)*n+t,c[1]=o(f)*r+i,v(p,l,c),g(m,l,c),a%=h,0>a&&(a+=h),f%=h,0>f&&(f+=h),a>f&&!d?f+=h:f>a&&d&&(a+=h),d){var x=f;f=a,a=x}for(var _=0;f>_;_+=Math.PI/2)_>a&&(u[0]=s(_)*n+t,u[1]=o(_)*r+i,v(p,u,p),g(m,u,m))},n}),e("zrender/Element",[ci,"./core/guid","./mixin/Eventful","./mixin/Transformable","./mixin/Animatable","./core/util"],function(t){var e=t("./core/guid"),i=t("./mixin/Eventful"),n=t("./mixin/Transformable"),r=t("./mixin/Animatable"),o=t("./core/util"),s=function(t){n.call(this,t),i.call(this,t),r.call(this,t),this.id=t.id||e()};return s[ii]={type:"element",name:"",__zr:null,ignore:!1,clipPath:null,drift:function(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0}var i=this[a];i||(i=this[a]=[1,0,0,1,0,0]),i[4]+=t,i[5]+=e,this.decomposeTransform(),this.dirty(!1)},beforeUpdate:function(){},afterUpdate:function(){},update:function(){this.updateTransform()},traverse:function(){},attrKV:function(t,e){if(t===ne||"scale"===t||"origin"===t){if(e){var i=this[t];i||(i=this[t]=[]),i[0]=e[0],i[1]=e[1]}}else this[t]=e},hide:function(){this[Ue]=!0,this.__zr&&this.__zr.refresh()},show:function(){this[Ue]=!1,this.__zr&&this.__zr.refresh()},attr:function(t,e){if(typeof t===ei)this.attrKV(t,e);else if(o[Ge](t))for(var i in t)t.hasOwnProperty(i)&&this.attrKV(i,t[i]);return this.dirty(!1),this},setClipPath:function(t){var e=this.__zr;e&&t.addSelfToZr(e),this.clipPath&&this.clipPath!==t&&this.removeClipPath(),this.clipPath=t,t.__zr=e,t.__clipTarget=this,this.dirty(!1)},removeClipPath:function(){var t=this.clipPath;t&&(t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__clipTarget=null,this.clipPath=null,this.dirty(!1))},addSelfToZr:function(t){this.__zr=t;var e=this.animators;if(e)for(var i=0;i<e[Re];i++)t[Ke].addAnimator(e[i]);this.clipPath&&this.clipPath.addSelfToZr(t)},removeSelfFromZr:function(t){this.__zr=null;var e=this.animators;if(e)for(var i=0;i<e[Re];i++)t[Ke].removeAnimator(e[i]);this.clipPath&&this.clipPath.removeSelfFromZr(t)}},o.mixin(s,r),o.mixin(s,n),o.mixin(s,i),s}),e("echarts/model/mixin/boxLayout",[ci],function(){return{getBoxLayoutParams:function(){return{left:this.get("left"),top:this.get("top"),right:this.get("right"),bottom:this.get(Ze),width:this.get("width"),height:this.get(We)}}}}),e("echarts/util/component",[ci,li,"./clazz"],function(t){var e=t(li),i=t("./clazz"),n=i.parseClassType,r=0,a={},o="_";return a.getUID=function(t){return[t||"",r++,Math.random()].join(o)},a.enableSubTypeDefaulter=function(t){var e={};return t.registerSubTypeDefaulter=function(t,i){t=n(t),e[t.main]=i},t.determineSubType=function(i,r){var a=r.type;if(!a){var o=n(i).main;t.hasSubTypes(i)&&e[o]&&(a=e[o](r))}return a},t},a.enableTopologicalTravel=function(t,i){function n(t){var n={},o=[];return e.each(t,function(s){var l=r(n,s),c=l.originalDeps=i(s),u=a(c,t);l.entryCount=u[Re],0===l.entryCount&&o.push(s),e.each(u,function(t){e[pe](l.predecessor,t)<0&&l.predecessor.push(t);var i=r(n,t);e[pe](i.successor,t)<0&&i.successor.push(s)})}),{graph:n,noEntryList:o}}function r(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e]}function a(t,i){var n=[];return e.each(t,function(t){e[pe](i,t)>=0&&n.push(t)}),n}t.topologicalTravel=function(t,i,r,a){function o(t){c[t].entryCount--,0===c[t].entryCount&&u.push(t)}function s(t){h[t]=!0,o(t)}if(t[Re]){var l=n(i),c=l.graph,u=l.noEntryList,h={};for(e.each(t,function(t){h[t]=!0});u[Re];){var f=u.pop(),d=c[f],p=!!h[f];p&&(r.call(a,f,d.originalDeps.slice()),delete h[f]),e.each(d.successor,p?s:o)}e.each(h,function(){throw new Error("Circle dependency may exists")})}}},a}),e("echarts/coord/polar/AxisModel",[ci,li,o,"../axisModelCreator","../axisModelCommonMixin"],function(t){function e(t,e){return e.type||(e.data?V:"value")}var i=t(li),n=t(o),r=t("../axisModelCreator"),a=n[Be]({type:"polarAxis",axis:null});i.merge(a[ii],t("../axisModelCommonMixin"));var s={angle:{startAngle:90,clockwise:!0,splitNumber:12,axisLabel:{rotate:!1}},radius:{splitNumber:5}};r("angle",a,e,s.angle),r(v,a,e,s[v])}),e("echarts/coord/cartesian/Cartesian",[ci,li],function(t){function e(t){return this._axes[t]}var i=t(li),n=function(t){this._axes={},this._dimList=[],this.name=t||""};return n[ii]={constructor:n,type:"cartesian",getAxis:function(t){return this._axes[t]},getAxes:function(){return i.map(this._dimList,e,this)},getAxesByScale:function(t){return t=t[ni](),i[me](this.getAxes(),function(e){return e.scale.type===t})},addAxis:function(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e)},dataToCoord:function(t){return this._dataCoordConvert(t,w)},coordToData:function(t){return this._dataCoordConvert(t,"coordToData")},_dataCoordConvert:function(t,e){for(var i=this._dimList,n=t instanceof Array?[]:{},r=0;r<i[Re];r++){var a=i[r],o=this._axes[a];n[a]=o[e](t[a])}return n}},n}),e("zrender/mixin/Transformable",[ci,"../core/matrix","../core/vector"],function(t){function e(t){return t>o||-o>t}var i=t("../core/matrix"),n=t("../core/vector"),r=i.identity,o=5e-5,s=function(t){t=t||{},t[ne]||(this[ne]=[0,0]),null==t[x]&&(this[x]=0),t.scale||(this.scale=[1,1]),this.origin=this.origin||null},u=s[ii];u[a]=null,u.needLocalTransform=function(){return e(this[x])||e(this[ne][0])||e(this[ne][1])||e(this.scale[0]-1)||e(this.scale[1]-1)},u.updateTransform=function(){var t=this[l],e=t&&t[a],n=this.needLocalTransform(),o=this[a];return n||e?(o=o||i[qe](),n?this[c](o):r(o),e&&(n?i.mul(o,t[a],o):i.copy(o,t[a])),this[a]=o,this.invTransform=this.invTransform||i[qe](),void i.invert(this.invTransform,o)):void(o&&r(o))
},u[c]=function(t){t=t||[],r(t);var e=this.origin,n=this.scale,a=this[x],o=this[ne];return e&&(t[4]-=e[0],t[5]-=e[1]),i.scale(t,t,n),a&&i.rotate(t,t,a),e&&(t[4]+=e[0],t[5]+=e[1]),t[4]+=o[0],t[5]+=o[1],t},u.setTransform=function(t){var e=this[a],i=t.dpr||1;e?t.setTransform(i*e[0],i*e[1],i*e[2],i*e[3],i*e[4],i*e[5]):t.setTransform(i,0,0,i,0,0)},u.restoreTransform=function(t){var e=(this[a],t.dpr||1);t.setTransform(e,0,0,e,0,0)};var h=[];return u.decomposeTransform=function(){if(this[a]){var t=this[l],n=this[a];t&&t[a]&&(i.mul(h,t.invTransform,n),n=h);var r=n[0]*n[0]+n[1]*n[1],o=n[2]*n[2]+n[3]*n[3],s=this[ne],c=this.scale;e(r-1)&&(r=Math.sqrt(r)),e(o-1)&&(o=Math.sqrt(o)),n[0]<0&&(r=-r),n[3]<0&&(o=-o),s[0]=n[4],s[1]=n[5],c[0]=r,c[1]=o,this[x]=Math.atan2(-n[1]/o,n[0]/r)}},u.getGlobalScale=function(){var t=this[a];if(!t)return[1,1];var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]),i=Math.sqrt(t[2]*t[2]+t[3]*t[3]);return t[0]<0&&(e=-e),t[3]<0&&(i=-i),[e,i]},u.transformCoordToLocal=function(t,e){var i=[t,e],r=this.invTransform;return r&&n[d](i,i,r),i},u.transformCoordToGlobal=function(t,e){var i=[t,e],r=this[a];return r&&n[d](i,i,r),i},s}),e("zrender/core/guid",[],function(){var t=2311;return function(){return t++}}),e("zrender/mixin/Animatable",[ci,"../animation/Animator","../core/util","../core/log"],function(t){var e=t("../animation/Animator"),i=t("../core/util"),n=i.isString,r=i.isFunction,a=i[Ge],o=t("../core/log"),s=function(){this.animators=[]};return s[ii]={constructor:s,animate:function(t,n){var r,a=!1,s=this,l=this.__zr;if(t){var c=t.split("."),u=s;a="shape"===c[0];for(var h=0,f=c[Re];f>h;h++)u&&(u=u[c[h]]);u&&(r=u)}else r=s;if(!r)return void o('Property "'+t+'" is not existed in element '+s.id);var d=s.animators,p=new e(r,n);return p.during(function(){s.dirty(a)}).done(function(){d[ze](i[pe](d,p),1)}),d.push(p),l&&l[Ke].addAnimator(p),p},stopAnimation:function(t){for(var e=this.animators,i=e[Re],n=0;i>n;n++)e[n].stop(t);return e[Re]=0,this},animateTo:function(t,e,i,a,o){function s(){c--,c||o&&o()}n(i)?(o=a,a=i,i=0):r(a)?(o=a,a="linear",i=0):r(i)?(o=i,i=0):r(e)?(o=e,e=500):e||(e=500),this.stopAnimation(),this._animateToShallow("",this,t,e,i,a,o);var l=this.animators.slice(),c=l[Re];c||o&&o();for(var u=0;u<l[Re];u++)l[u].done(s).start(a)},_animateToShallow:function(t,e,n,r,o){var s={},l=0;for(var c in n)if(null!=e[c])a(n[c])&&!i.isArrayLike(n[c])?this._animateToShallow(t?t+"."+c:c,e[c],n[c],r,o):(s[c]=n[c],l++);else if(null!=n[c])if(t){var u={};u[t]={},u[t][c]=n[c],this.attr(u)}else this.attr(c,n[c]);return l>0&&this.animate(t,!1).when(null==r?500:r,s).delay(o||0),this}},s}),e("echarts/coord/axisModelCreator",[ci,"./axisDefault",li,"../model/Component","../util/layout"],function(t){var e=t("./axisDefault"),i=t(li),n=t("../model/Component"),r=t("../util/layout"),a=["value",V,"time","log"];return function(t,o,s,l){i.each(a,function(n){o[Be]({type:t+"Axis."+n,mergeDefaultAndTheme:function(e,a){var o=this.layoutMode,l=o?r.getLayoutParams(e):{},c=a.getTheme();i.merge(e,c.get(n+"Axis")),i.merge(e,this.getDefaultOption()),e.type=s(t,e),o&&r.mergeLayoutParam(e,l,o)},defaultOption:i.mergeAll([{},e[n+"Axis"],l],!0)})}),n.registerSubTypeDefaulter(t+"Axis",i.curry(s,t))}}),e("echarts/coord/axisModelCommonMixin",[ci,li,"./axisHelper"],function(t){function e(t){return r[Ge](t)&&null!=t.value?t.value:t}function i(){return this.get("type")===V&&r.map(this.get("data"),e)}function n(){return a.getFormattedLabels(this.axis,this.get("axisLabel.formatter"))}var r=t(li),a=t("./axisHelper");return{getFormattedLabels:n,getCategories:i}}),e("echarts/coord/cartesian/axisLabelInterval",[ci,li,"../axisHelper"],function(t){var e=t(li),i=t("../axisHelper");return function(t){var n=t.model,r=n[Je]("axisLabel"),a=r.get("interval");return t.type!==V||"auto"!==a?"auto"===a?0:a:i.getAxisLabelInterval(e.map(t.scale[te](),t[w],t),n.getFormattedLabels(),r[Je](ue)[le](),t.isHorizontal())}}),e("echarts/coord/geo/Geo",[ci,"./parseGeoJson",li,p,"../View","./fix/nanhai","./fix/textCoord","./fix/geoCoord"],function(t){function e(t,e,i,n,r){o.call(this,t),this.map=e,this._nameCoordMap={},this.loadGeoJson(i,n,r)}var i=t("./parseGeoJson"),n=t(li),r=t(p),o=t("../View"),s=[t("./fix/nanhai"),t("./fix/textCoord"),t("./fix/geoCoord")];return e[ii]={constructor:e,type:"geo",dimensions:["lng","lat"],containCoord:function(t){for(var e=this.regions,i=0;i<e[Re];i++)if(e[i][ee](t))return!0;return!1},loadGeoJson:function(t,e,r){try{this.regions=t?i(t):[]}catch(a){throw"Invalid geoJson format\n"+a}e=e||{},r=r||{};for(var o=this.regions,l={},c=0;c<o[Re];c++){var u=o[c].name;u=r[u]||u,o[c].name=u,l[u]=o[c],this.addGeoCoord(u,o[c][re]);var h=e[u];h&&o[c].transformTo(h.left,h.top,h.width,h[We])}this._regionsMap=l,this._rect=null,n.each(s,function(t){t(this)},this)},transformTo:function(t,e,i,n){var o=this[oe]();o=o.clone(),o.y=-o.y-o[We];var s=this._viewTransform;s[a]=o.calculateTransform(new r(t,e,i,n)),s.decomposeTransform();var l=s.scale;l[1]=-l[1],s.updateTransform(),this._updateTransform()},getRegion:function(t){return this._regionsMap[t]},getRegionByCoord:function(t){for(var e=this.regions,i=0;i<e[Re];i++)if(e[i][ee](t))return e[i]},addGeoCoord:function(t,e){this._nameCoordMap[t]=e},getGeoCoord:function(t){return this._nameCoordMap[t]},getBoundingRect:function(){if(this._rect)return this._rect;for(var t,e=this.regions,i=0;i<e[Re];i++){var n=e[i][oe]();t=t||n.clone(),t.union(n)}return this._rect=t||new r(0,0,0,0)},dataToPoints:function(t){var e=[];return t.mapArray(["lng","lat"],function(t,i){return e[0]=t,e[1]=i,this[$](e)},this)},dataToPoint:function(t){return typeof t===ei&&(t=this.getGeoCoord(t)),t?o[ii][$].call(this,t):void 0}},n.mixin(e,o),e}),e("echarts/coord/axisDefault",[ci,li],function(t){var e=t(li),i={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisLine:{show:!0,onZero:!0,lineStyle:{color:"#333",width:1,type:"solid"}},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,margin:8,textStyle:{fontSize:12}},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},n=e.merge({boundaryGap:!0,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},i),r=e.merge({boundaryGap:[0,0],splitNumber:5},i),a=e[Oe]({scale:!0,min:"dataMin",max:"dataMax"},r),o=e[Oe]({logBase:10},r);return o.scale=!0,{categoryAxis:n,valueAxis:r,timeAxis:a,logAxis:o}}),e("zrender/animation/Animator",[ci,"./Clip","../tool/color","../core/util"],function(t){function e(t,e){return t[e]}function i(t,e,i){t[e]=i}function n(t,e,i){return(e-t)*i+t}function r(t,e,i){return i>.5?e:t}function a(t,e,i,r,a){var o=t[Re];if(1==a)for(var s=0;o>s;s++)r[s]=n(t[s],e[s],i);else for(var l=t[0][Re],s=0;o>s;s++)for(var c=0;l>c;c++)r[s][c]=n(t[s][c],e[s][c],i)}function o(t,e,i){var n=t[Re],r=e[Re];if(n!==r){var a=n>r;if(a)t[Re]=r;else for(var o=n;r>o;o++)t.push(1===i?e[o]:g.call(e[o]))}for(var s=t[0]&&t[0][Re],o=0;o<t[Re];o++)if(1===i)isNaN(t[o])&&(t[o]=e[o]);else for(var l=0;s>l;l++)isNaN(t[o][l])&&(t[o][l]=e[o][l])}function s(t,e,i){if(t===e)return!0;var n=t[Re];if(n!==e[Re])return!1;if(1===i){for(var r=0;n>r;r++)if(t[r]!==e[r])return!1}else for(var a=t[0][Re],r=0;n>r;r++)for(var o=0;a>o;o++)if(t[r][o]!==e[r][o])return!1;return!0}function l(t,e,i,n,r,a,o,s,l){var u=t[Re];if(1==l)for(var h=0;u>h;h++)s[h]=c(t[h],e[h],i[h],n[h],r,a,o);else for(var f=t[0][Re],h=0;u>h;h++)for(var d=0;f>d;d++)s[h][d]=c(t[h][d],e[h][d],i[h][d],n[h][d],r,a,o)}function c(t,e,i,n,r,a,o){var s=.5*(i-t),l=.5*(n-e);return(2*(e-i)+s+l)*o+(-3*(e-i)-2*s-l)*a+s*r+e}function u(t){if(v(t)){var e=t[Re];if(v(t[0])){for(var i=[],n=0;e>n;n++)i.push(g.call(t[n]));return i}return g.call(t)}return t}function h(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")"}function f(t,e,i,u,f){var m=t._getter,g=t._setter,y="spline"===e,x=u[Re];if(x){var _,b=u[0].value,w=v(b),M=!1,S=!1,T=w&&v(b[0])?2:1;u.sort(function(t,e){return t.time-e.time}),_=u[x-1].time;for(var C=[],A=[],L=u[0].value,P=!0,k=0;x>k;k++){C.push(u[k].time/_);var z=u[k].value;if(w&&s(z,L,T)||!w&&z===L||(P=!1),L=z,typeof z==ei){var D=p.parse(z);D?(z=D,M=!0):S=!0}A.push(z)}if(!P){for(var I=A[x-1],k=0;x-1>k;k++)w?o(A[k],I,T):!isNaN(A[k])||isNaN(I)||S||M||(A[k]=I);w&&o(m(t._target,f),I,T);var R,O,E,B,N,G,V=0,F=0;if(M)var H=[0,0,0,0];var q=function(t,e){var i;if(0>e)i=0;else if(F>e){for(R=Math.min(V+1,x-1),i=R;i>=0&&!(C[i]<=e);i--);i=Math.min(i,x-2)}else{for(i=V;x>i&&!(C[i]>e);i++);i=Math.min(i-1,x-2)}V=i,F=e;var o=C[i+1]-C[i];if(0!==o)if(O=(e-C[i])/o,y)if(B=A[i],E=A[0===i?i:i-1],N=A[i>x-2?x-1:i+1],G=A[i>x-3?x-1:i+2],w)l(E,B,N,G,O,O*O,O*O*O,m(t,f),T);else{var s;if(M)s=l(E,B,N,G,O,O*O,O*O*O,H,1),s=h(H);else{if(S)return r(B,N,O);s=c(E,B,N,G,O,O*O,O*O*O)}g(t,f,s)}else if(w)a(A[i],A[i+1],O,m(t,f),T);else{var s;if(M)a(A[i],A[i+1],O,H,1),s=h(H);else{if(S)return r(A[i],A[i+1],O);s=n(A[i],A[i+1],O)}g(t,f,s)}},W=new d({target:t._target,life:_,loop:t._loop,delay:t._delay,onframe:q,ondestroy:i});return e&&"spline"!==e&&(W.easing=e),W}}}var d=t("./Clip"),p=t("../tool/color"),m=t("../core/util"),v=m.isArrayLike,g=Array[ii].slice,y=function(t,n,r,a){this._tracks={},this._target=t,this._loop=n||!1,this._getter=r||e,this._setter=a||i,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[]};return y[ii]={when:function(t,e){var i=this._tracks;for(var n in e){if(!i[n]){i[n]=[];var r=this._getter(this._target,n);if(null==r)continue;0!==t&&i[n].push({time:0,value:u(r)})}i[n].push({time:t,value:e[n]})}return this},during:function(t){return this._onframeList.push(t),this},_doneCallback:function(){this._tracks={},this._clipList[Re]=0;for(var t=this._doneList,e=t[Re],i=0;e>i;i++)t[i].call(this)},start:function(t){var e,i=this,n=0,r=function(){n--,n||i._doneCallback()};for(var a in this._tracks){var o=f(this,t,r,this._tracks[a],a);o&&(this._clipList.push(o),n++,this[Ke]&&this[Ke].addClip(o),e=o)}if(e){var s=e.onframe;e.onframe=function(t,e){s(t,e);for(var n=0;n<i._onframeList[Re];n++)i._onframeList[n](t,e)}}return n||this._doneCallback(),this},stop:function(t){for(var e=this._clipList,i=this[Ke],n=0;n<e[Re];n++){var r=e[n];t&&r.onframe(this._target,1),i&&i.removeClip(r)}e[Re]=0},delay:function(t){return this._delay=t,this},done:function(t){return t&&this._doneList.push(t),this},getClips:function(){return this._clipList}},y}),e("zrender/core/log",[ci,"../config"],function(t){var e=t("../config");return function(){if(0!==e.debugMode)if(1==e.debugMode)for(var t in arguments)throw new Error(arguments[t]);else if(e.debugMode>1)for(var t in arguments)console.log(arguments[t])}}),e("echarts/coord/View",[ci,ri,ai,"zrender/mixin/Transformable",li,p],function(t){function e(){o.call(this)}function i(t){this.name=t,this.zoomLimit,o.call(this),this._roamTransform=new e,this._viewTransform=new e,this._center,this._zoom}var n=t(ri),r=t(ai),o=t("zrender/mixin/Transformable"),s=t(li),u=t(p),h=n[d];return s.mixin(e,o),i[ii]={constructor:i,type:"view",dimensions:["x","y"],setBoundingRect:function(t,e,i,n){return this._rect=new u(t,e,i,n),this._rect},getBoundingRect:function(){return this._rect},setViewRect:function(t,e,i,n){i=i,n=n,this.transformTo(t,e,i,n),this._viewRect=new u(t,e,i,n)},transformTo:function(t,e,i,n){var r=this[oe](),o=this._viewTransform;o[a]=r.calculateTransform(new u(t,e,i,n)),o.decomposeTransform(),this._updateTransform()},setCenter:function(t){t&&(this._center=t,this._updateCenterAndZoom())},setZoom:function(t){t=t||1;var e=this.zoomLimit;e&&(null!=e.max&&(t=Math.min(e.max,t)),null!=e.min&&(t=Math.max(e.min,t))),this._zoom=t,this._updateCenterAndZoom()},getDefaultCenter:function(){var t=this[oe](),e=t.x+t.width/2,i=t.y+t[We]/2;return[e,i]},getCenter:function(){return this._center||this.getDefaultCenter()},getZoom:function(){return this._zoom||1},getRoamTransform:function(){return this._roamTransform},_updateCenterAndZoom:function(){var t=this._viewTransform[c](),e=this._roamTransform,i=this.getDefaultCenter(),r=this.getCenter(),a=this.getZoom();r=n[d]([],r,t),i=n[d]([],i,t),e.origin=r,e[ne]=[i[0]-r[0],i[1]-r[1]],e.scale=[a,a],this._updateTransform()},_updateTransform:function(){var t=this._roamTransform,e=this._viewTransform;e[l]=t,t.updateTransform(),e.updateTransform(),e[a]&&r.copy(this[a]||(this[a]=[]),e[a]),this[a]?(this.invTransform=this.invTransform||[],r.invert(this.invTransform,this[a])):this.invTransform=null,this.decomposeTransform()},getViewRect:function(){return this._viewRect},getViewRectAfterRoam:function(){var t=this[oe]().clone();return t[d](this[a]),t},dataToPoint:function(t){var e=this[a];return e?h([],t,e):[t[0],t[1]]},pointToData:function(t){var e=this.invTransform;return e?h([],t,e):[t[0],t[1]]}},s.mixin(i,o),i}),e("echarts/coord/geo/parseGeoJson",[ci,li,"./Region"],function(t){function e(t){if(!t.UTF8Encoding)return t;for(var e=t.features,n=0;n<e[Re];n++)for(var r=e[n],a=r.geometry,o=a.coordinates,s=a.encodeOffsets,l=0;l<o[Re];l++){var c=o[l];if("Polygon"===a.type)o[l]=i(c,s[l]);else if("MultiPolygon"===a.type)for(var u=0;u<c[Re];u++){var h=c[u];c[u]=i(h,s[l][u])}}return t.UTF8Encoding=!1,t}function i(t,e){for(var i=[],n=e[0],r=e[1],a=0;a<t[Re];a+=2){var o=t.charCodeAt(a)-64,s=t.charCodeAt(a+1)-64;o=o>>1^-(1&o),s=s>>1^-(1&s),o+=n,s+=r,n=o,r=s,i.push([o/1024,s/1024])}return i}function n(t){for(var e=[],i=0;i<t[Re];i++)for(var n=0;n<t[i][Re];n++)e.push(t[i][n]);return e}var r=t(li),a=t("./Region");return function(t){return e(t),r.map(r[me](t.features,function(t){return t.geometry&&t.properties}),function(t){var e=t.properties,i=t.geometry,r=i.coordinates;return"MultiPolygon"===i.type&&(r=n(r)),new a(e.name,r,e.cp)})}}),e("echarts/coord/geo/fix/textCoord",[ci,li],function(t){var e=t(li),i={"南海诸岛":[32,80],"广东":[0,-10],"香港":[10,5],"澳门":[-10,10],"天津":[5,5]};return function(t){e.each(t.regions,function(t){var e=i[t.name];if(e){var n=t[re];n[0]+=e[0]/10.5,n[1]+=-e[1]/14}})}}),e("echarts/coord/geo/fix/geoCoord",[ci,li],function(t){var e=t(li),i={Russia:[100,60],"United States of America":[-99,38]};return function(t){e.each(t.regions,function(t){var e=i[t.name];if(e){var n=t[re];n[0]=e[0],n[1]=e[1]}})}}),e("echarts/coord/geo/fix/nanhai",[ci,"../Region"],function(t){for(var e=t("../Region"),i=[126,25],n=[[[0,3.5],[7,11.2],[15,11.9],[30,7],[42,.7],[52,.7],[56,7.7],[59,.7],[64,.7],[64,0],[5,0],[0,3.5]],[[13,16.1],[19,14.7],[16,21.7],[11,23.1],[13,16.1]],[[12,32.2],[14,38.5],[15,38.5],[13,32.2],[12,32.2]],[[16,47.6],[12,53.2],[13,53.2],[18,47.6],[16,47.6]],[[6,64.4],[8,70],[9,70],[8,64.4],[6,64.4]],[[23,82.6],[29,79.8],[30,79.8],[25,82.6],[23,82.6]],[[37,70.7],[43,62.3],[44,62.3],[39,70.7],[37,70.7]],[[48,51.1],[51,45.5],[53,45.5],[50,51.1],[48,51.1]],[[51,35],[51,28.7],[53,28.7],[53,35],[51,35]],[[52,22.4],[55,17.5],[56,17.5],[53,22.4],[52,22.4]],[[58,12.6],[62,7],[63,7],[60,12.6],[58,12.6]],[[0,3.5],[0,93.1],[64,93.1],[64,0],[63,0],[63,92.4],[1,92.4],[1,3.5],[0,3.5]]],r=0;r<n[Re];r++)for(var a=0;a<n[r][Re];a++)n[r][a][0]/=10.5,n[r][a][1]/=-14,n[r][a][0]+=i[0],n[r][a][1]+=i[1];return function(t){"china"===t.map&&t.regions.push(new e("南海诸岛",n,i))}}),e("zrender/animation/Clip",[ci,"./easing"],function(t){function e(t){this._target=t[Ce],this._life=t.life||1e3,this._delay=t.delay||0,this._initialized=!1,this.loop=null==t.loop?!1:t.loop,this.gap=t.gap||0,this.easing=t.easing||"Linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart}var i=t("./easing");return e[ii]={constructor:e,step:function(t){this._initialized||(this._startTime=t+this._delay,this._initialized=!0);var e=(t-this._startTime)/this._life;if(!(0>e)){e=Math.min(e,1);var n=this.easing,r=typeof n==ei?i[n]:n,a=typeof r===ge?r(e):e;return this.fire("frame",a),1==e?this.loop?(this.restart(t),"restart"):(this._needsRemove=!0,"destroy"):null}},restart:function(t){var e=(t-this._startTime)%this._life;this._startTime=t-e+this.gap,this._needsRemove=!1},fire:function(t,e){t="on"+t,this[t]&&this[t](this._target,e)}},e}),e("zrender/animation/easing",[],function(){var t={linear:function(t){return t},quadraticIn:function(t){return t*t},quadraticOut:function(t){return t*(2-t)},quadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},cubicIn:function(t){return t*t*t},cubicOut:function(t){return--t*t*t+1},cubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},quarticIn:function(t){return t*t*t*t},quarticOut:function(t){return 1- --t*t*t*t},quarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},quinticIn:function(t){return t*t*t*t*t},quinticOut:function(t){return--t*t*t*t*t+1},quinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},sinusoidalIn:function(t){return 1-Math.cos(t*Math.PI/2)},sinusoidalOut:function(t){return Math.sin(t*Math.PI/2)},sinusoidalInOut:function(t){return.5*(1-Math.cos(Math.PI*t))},exponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},exponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},exponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)},circularIn:function(t){return 1-Math.sqrt(1-t*t)},circularOut:function(t){return Math.sqrt(1- --t*t)},circularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},elasticIn:function(t){var e,i=.1,n=.4;return 0===t?0:1===t?1:(!i||1>i?(i=1,e=n/4):e=n*Math.asin(1/i)/(2*Math.PI),-(i*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/n)))},elasticOut:function(t){var e,i=.1,n=.4;return 0===t?0:1===t?1:(!i||1>i?(i=1,e=n/4):e=n*Math.asin(1/i)/(2*Math.PI),i*Math.pow(2,-10*t)*Math.sin(2*(t-e)*Math.PI/n)+1)},elasticInOut:function(t){var e,i=.1,n=.4;return 0===t?0:1===t?1:(!i||1>i?(i=1,e=n/4):e=n*Math.asin(1/i)/(2*Math.PI),(t*=2)<1?-.5*i*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/n):i*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-e)*Math.PI/n)*.5+1)},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},backInOut:function(t){var e=2.5949095;return(t*=2)<1?.5*t*t*((e+1)*t-e):.5*((t-=2)*t*((e+1)*t+e)+2)},bounceIn:function(e){return 1-t.bounceOut(1-e)},bounceOut:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bounceInOut:function(e){return.5>e?.5*t.bounceIn(2*e):.5*t.bounceOut(2*e-1)+.5}};return t}),e("echarts/coord/geo/Region",[ci,"zrender/contain/polygon",p,"zrender/core/bbox",ri],function(t){function e(t,e,i){if(this.name=t,this.contours=e,i)i=[i[0],i[1]];else{var n=this[oe]();i=[n.x+n.width/2,n.y+n[We]/2]}this[re]=i}var i=t("zrender/contain/polygon"),n=t(p),r=t("zrender/core/bbox"),a=t(ri);return e[ii]={constructor:e,getBoundingRect:function(){var t=this._rect;if(t)return t;for(var e=Number.MAX_VALUE,i=[e,e],o=[-e,-e],s=[],l=[],c=this.contours,u=0;u<c[Re];u++)r.fromPoints(c[u],s,l),a.min(i,i,s),a.max(o,o,l);return 0===u&&(i[0]=i[1]=o[0]=o[1]=0),this._rect=new n(i[0],i[1],o[0]-i[0],o[1]-i[1])},contain:function(t){var e=this[oe](),n=this.contours;if(e[ee](t[0],t[1]))for(var r=0,a=n[Re];a>r;r++)if(i[ee](n[r],t[0],t[1]))return!0;return!1},transformTo:function(t,e,i,r){var o=this[oe](),s=o.width/o[We];i?r||(r=i/s):i=s*r;for(var l=new n(t,e,i,r),c=o.calculateTransform(l),u=this.contours,h=0;h<u[Re];h++)for(var f=0;f<u[h][Re];f++)a[d](u[h][f],u[h][f],c);o=this._rect,o.copy(l),this[re]=[o.x+o.width/2,o.y+o[We]/2]}},e}),e("echarts/coord/cartesian/AxisModel",[ci,o,li,"../axisModelCreator","../axisModelCommonMixin"],function(t){function e(t,e){return e.type||(e.data?V:"value")}var i=t(o),n=t(li),r=t("../axisModelCreator"),a=i[Be]({type:"cartesian2dAxis",axis:null,init:function(){a.superApply(this,"init",arguments),this._resetRange()},mergeOption:function(){a.superApply(this,W,arguments),this._resetRange()},restoreData:function(){a.superApply(this,"restoreData",arguments),this._resetRange()},setRange:function(t,e){this[U].rangeStart=t,this[U].rangeEnd=e},getMin:function(){var t=this[U];return null!=t.rangeStart?t.rangeStart:t.min},getMax:function(){var t=this[U];return null!=t.rangeEnd?t.rangeEnd:t.max},getNeedCrossZero:function(){var t=this[U];return null!=t.rangeStart||null!=t.rangeEnd?!1:!t.scale},findGridModel:function(){return this[s].queryComponents({mainType:"grid",index:this.get("gridIndex"),id:this.get("gridId")})[0]},_resetRange:function(){this[U].rangeStart=this[U].rangeEnd=null}});n.merge(a[ii],t("../axisModelCommonMixin"));var l={offset:0};return r("x",a,e,l),r("y",a,e,l),a}),e("zrender/contain/line",[],function(){return{containStroke:function(t,e,i,n,r,a,o){if(0===r)return!1;var s=r,l=0,c=t;if(o>e+s&&o>n+s||e-s>o&&n-s>o||a>t+s&&a>i+s||t-s>a&&i-s>a)return!1;if(t===i)return Math.abs(a-t)<=s/2;l=(e-n)/(t-i),c=(t*n-i*e)/(t-i);var u=l*a-o+c,h=u*u/(l*l+1);return s/2*s/2>=h}}}),e("zrender/contain/cubic",[ci,"../core/curve"],function(t){var e=t("../core/curve");return{containStroke:function(t,i,n,r,a,o,s,l,c,u,h){if(0===c)return!1;var f=c;if(h>i+f&&h>r+f&&h>o+f&&h>l+f||i-f>h&&r-f>h&&o-f>h&&l-f>h||u>t+f&&u>n+f&&u>a+f&&u>s+f||t-f>u&&n-f>u&&a-f>u&&s-f>u)return!1;var d=e.cubicProjectPoint(t,i,n,r,a,o,s,l,u,h,null);return f/2>=d}}}),e("zrender/contain/windingLine",[],function(){return function(t,e,i,n,r,a){if(a>e&&a>n||e>a&&n>a)return 0;if(n===e)return 0;var o=e>n?1:-1,s=(a-e)/(n-e);(1===s||0===s)&&(o=e>n?.5:-.5);var l=s*(i-t)+t;return l>r?o:0}}),e("zrender/contain/util",[ci],function(){var t=2*Math.PI;return{normalizeRadian:function(e){return e%=t,0>e&&(e+=t),e}}}),e("zrender/contain/arc",[ci,"./util"],function(t){var e=t("./util").normalizeRadian,i=2*Math.PI;return{containStroke:function(t,n,r,a,o,s,l,c,u){if(0===l)return!1;var h=l;c-=t,u-=n;var f=Math.sqrt(c*c+u*u);if(f-h>r||r>f+h)return!1;if(Math.abs(a-o)%i<1e-4)return!0;if(s){var d=a;a=e(o),o=e(d)}else a=e(a),o=e(o);a>o&&(o+=i);var p=Math.atan2(u,c);return 0>p&&(p+=i),p>=a&&o>=p||p+i>=a&&o>=p+i}}}),e("zrender/core/LRU",[ci],function(){var t=function(){this.head=null,this.tail=null,this._len=0},e=t[ii];e.insert=function(t){var e=new i(t);return this.insertEntry(e),e},e.insertEntry=function(t){this.head?(this.tail.next=t,t.prev=this.tail,this.tail=t):this.head=this.tail=t,this._len++},e[Ne]=function(t){var e=t.prev,i=t.next;e?e.next=i:this.head=i,i?i.prev=e:this.tail=e,t.next=t.prev=null,this._len--},e.len=function(){return this._len};var i=function(t){this.value=t,this.next,this.prev},n=function(e){this._list=new t,this._map={},this._maxSize=e||10},r=n[ii];return r.put=function(t,e){var i=this._list,n=this._map;if(null==n[t]){var r=i.len();if(r>=this._maxSize&&r>0){var a=i.head;i[Ne](a),delete n[a.key]}var o=i.insert(e);o.key=t,n[t]=o}},r.get=function(t){var e=this._map[t],i=this._list;return null!=e?(e!==i.tail&&(i[Ne](e),i.insertEntry(e)),e.value):void 0},r.clear=function(){this._list.clear(),this._map={}},n}),e("zrender/contain/polygon",[ci,"./windingLine"],function(t){function e(t,e){return Math.abs(t-e)<r}function i(t,i,r){var a=0,o=t[0];if(!o)return!1;for(var s=1;s<t[Re];s++){var l=t[s];a+=n(o[0],o[1],l[0],l[1],i,r),o=l}var c=t[0];return e(o[0],c[0])&&e(o[1],c[1])||(a+=n(o[0],o[1],c[0],c[1],i,r)),0!==a}var n=t("./windingLine"),r=1e-8;return{contain:i}}),e("echarts/chart/helper/createListFromArray",[ci,j,"../../data/helper/completeDimensions",li,g,"../../CoordinateSystem"],function(t){function e(t){for(var e=0;e<t[Re]&&null==t[e];)e++;return t[e]}function i(t){var i=e(t);return null!=i&&!c[ye](f(i))}function n(t,e,n){t=t||[];var r=e.get(he),a=p[r],m=h.get(r),v=a&&a(t,e,n),g=v&&v[R];g||(g=m&&m[R]||["x","y"],g=l(g,t,g[Q](["value"])));var y=v?v.categoryIndex:-1,x=new s(g,e),_=o(v,t),b={},w=y>=0&&i(t)?function(t,e,i,n){return u.isDataItemOption(t)&&(x.hasItemOption=!0),n===y?i:d(f(t),g[n])}:function(t,e,i,n){var r=f(t),a=d(r&&r[n],g[n]);u.isDataItemOption(t)&&(x.hasItemOption=!0);var o=v&&v.categoryAxesModels;return o&&o[e]&&typeof a===ei&&(b[e]=b[e]||o[e].getCategories(),a=c[pe](b[e],a),0>a&&!isNaN(a)&&(a=+a)),a};return x.hasItemOption=!1,x[Z](t,_,w),x}function r(t){return t!==V&&"time"!==t}function a(t){return t===V?E:"time"===t?"time":"float"}function o(t,e){var i,n=[],r=t&&t[R][t.categoryIndex];if(r&&(i=t.categoryAxesModels[r.name]),i){var a=i.getCategories();if(a){var o=e[Re];if(c[ye](e[0])&&e[0][Re]>1){n=[];for(var s=0;o>s;s++)n[s]=a[e[s][t.categoryIndex||0]]}else n=a.slice(0)}}return n}var s=t(j),l=t("../../data/helper/completeDimensions"),c=t(li),u=t(g),h=t("../../CoordinateSystem"),f=u.getDataItemValue,d=u.converDataValue,p={cartesian2d:function(t,e,i){var n=c.map(["xAxis","yAxis"],function(t){return i.queryComponents({mainType:t,index:e.get(t+"Index"),id:e.get(t+"Id")})[0]}),o=n[0],s=n[1],u=o.get("type"),h=s.get("type"),f=[{name:"x",type:a(u),stackable:r(u)},{name:"y",type:a(h),stackable:r(h)}],d=u===V,p=h===V;l(f,t,["x","y","z"]);var m={};return d&&(m.x=o),p&&(m.y=s),{dimensions:f,categoryIndex:d?0:p?1:-1,categoryAxesModels:m}},polar:function(t,e,i){var n=i.queryComponents({mainType:"polar",index:e.get("polarIndex"),id:e.get("polarId")})[0],o=n.findAxisModel("angleAxis"),s=n.findAxisModel("radiusAxis"),c=s.get("type"),u=o.get("type"),h=[{name:"radius",type:a(c),stackable:r(c)},{name:"angle",type:a(u),stackable:r(u)}],f=u===V,d=c===V;l(h,t,[v,"angle","value"]);var p={};return d&&(p[v]=s),f&&(p.angle=o),{dimensions:h,categoryIndex:f?1:d?0:-1,categoryAxesModels:p}},geo:function(t){return{dimensions:l([{name:"lng"},{name:"lat"}],t,["lng","lat","value"])}}};return n}),e("zrender/contain/quadratic",[ci,"../core/curve"],function(t){var e=t("../core/curve");return{containStroke:function(t,i,n,r,a,o,s,l,c){if(0===s)return!1;var u=s;if(c>i+u&&c>r+u&&c>o+u||i-u>c&&r-u>c&&o-u>c||l>t+u&&l>n+u&&l>a+u||t-u>l&&n-u>l&&a-u>l)return!1;var h=e.quadraticProjectPoint(t,i,n,r,a,o,l,c,null);return u/2>=h}}}),e("echarts/data/helper/completeDimensions",[ci,li],function(t){function e(t,e,a,o){if(!e)return t;var s=i(e[0]),l=n[ye](s)&&s[Re]||1;a=a||[],o=o||"extra";for(var c=0;l>c;c++)if(!t[c]){var u=a[c]||o+(c-a[Re]);t[c]=r(e,c)?{type:"ordinal",name:u}:u}return t}function i(t){return n[ye](t)?t:n[Ge](t)?t.value:t}var n=t(li),r=e.guessOrdinal=function(t,e){for(var r=0,a=t[Re];a>r;r++){var o=i(t[r]);if(!n[ye](o))return!1;var o=o[e];if(null!=o&&isFinite(o))return!1;if(n.isString(o)&&"-"!==o)return!0}return!1};return e}),e("echarts/data/DataDiffer",[ci],function(){function t(t){return t}function e(e,i,n,r){this._old=e,this._new=i,this._oldKeyGetter=n||t,this._newKeyGetter=r||t}function i(t,e,i,n){for(var r=0;r<t[Re];r++){var a=n(t[r],r),o=e[a];null==o?(i.push(a),e[a]=r):(o[Re]||(e[a]=o=[o]),o.push(r))}}return e[ii]={constructor:e,add:function(t){return this._add=t,this},update:function(t){return this._update=t,this},remove:function(t){return this._remove=t,this},execute:function(){var t,e=this._old,n=this._new,r=this._oldKeyGetter,a=this._newKeyGetter,o={},s={},l=[],c=[];for(i(e,o,l,r),i(n,s,c,a),t=0;t<e[Re];t++){var u=l[t],h=s[u];if(null!=h){var f=h[Re];f?(1===f&&(s[u]=null),h=h.unshift()):s[u]=null,this._update&&this._update(h,t)}else this._remove&&this._remove(t)}for(var t=0;t<c[Re];t++){var u=c[t];if(s.hasOwnProperty(u)){var h=s[u];if(null==h)continue;if(h[Re])for(var d=0,f=h[Re];f>d;d++)this._add&&this._add(h[d]);else this._add&&this._add(h)}}}},e}),e("zrender/Handler",[ci,"./core/util","./mixin/Draggable","./mixin/Eventful"],function(t){function e(t,e,i){return{type:t,event:i,target:e,cancelBubble:!1,offsetX:i.zrX,offsetY:i.zrY,gestureEvent:i.gestureEvent,pinchX:i.pinchX,pinchY:i.pinchY,pinchScale:i.pinchScale,wheelDelta:i.zrDelta}}function i(){}function n(t,e,i){if(t[t.rectHover?"rectContain":ee](e,i)){for(var n=t;n;){if(n[ke]||n.clipPath&&!n.clipPath[ee](e,i))return!1;n=n[l]}return!0}return!1}var r=t("./core/util"),a=t("./mixin/Draggable"),o=t("./mixin/Eventful");i[ii].dispose=function(){};var s=["click","dblclick","mousewheel",Le,"mouseup","mousedown",Ae],c=function(t,e,n){o.call(this),this[Ye]=t,this.painter=e,n=n||new i,this.proxy=n,n.handler=this,this._hovered,this._lastTouchMoment,this._lastX,this._lastY,a.call(this),r.each(s,function(t){n.on&&n.on(t,this[t],this)},this)};return c[ii]={constructor:c,mousemove:function(t){var e=t.zrX,i=t.zrY,n=this.findHover(e,i,null),r=this._hovered,a=this.proxy;this._hovered=n,a.setCursor&&a.setCursor(n?n.cursor:"default"),r&&n!==r&&r.__zr&&this.dispatchToElement(r,Le,t),this.dispatchToElement(n,Ae,t),n&&n!==r&&this.dispatchToElement(n,Pe,t)},mouseout:function(t){this.dispatchToElement(this._hovered,Le,t),this[Ie]("globalout",{event:t})},resize:function(){this._hovered=null},dispatch:function(t,e){var i=this[t];i&&i.call(this,e)},dispose:function(){this.proxy.dispose(),this[Ye]=this.proxy=this.painter=null},setCursorStyle:function(t){var e=this.proxy;e.setCursor&&e.setCursor(t)},dispatchToElement:function(t,i,n){for(var r="on"+i,a=e(i,t,n),o=t;o&&(o[r]&&(a.cancelBubble=o[r].call(o,a)),o[Ie](i,a),o=o[l],!a.cancelBubble););a.cancelBubble||(this[Ie](i,a),this.painter&&this.painter.eachOtherLayer(function(t){typeof t[r]==ge&&t[r].call(t,a),t[Ie]&&t[Ie](i,a)}))},findHover:function(t,e,i){for(var r=this[Ye].getDisplayList(),a=r[Re]-1;a>=0;a--)if(!r[a][ke]&&r[a]!==i&&!r[a][Ue]&&n(r[a],t,e))return r[a]}},r.each(["click","mousedown","mouseup","mousewheel","dblclick"],function(t){c[ii][t]=function(e){var i=this.findHover(e.zrX,e.zrY,null);if("mousedown"===t)this._downel=i,this._upel=i;else if("mosueup"===t)this._upel=i;else if("click"===t&&this._downel!==this._upel)return;this.dispatchToElement(i,t,e)}}),r.mixin(c,o),r.mixin(c,a),c}),e("zrender/Storage",[ci,"./core/util","./core/env","./container/Group","./core/timsort"],function(t){function e(t,e){return t[_e]===e[_e]?t.z===e.z?t.z2-e.z2:t.z-e.z:t[_e]-e[_e]}var n=t("./core/util"),r=t("./core/env"),a=t("./container/Group"),o=t("./core/timsort"),s=function(){this._elements={},this._roots=[],this._displayList=[],this._displayListLen=0};return s[ii]={constructor:s,traverse:function(t,e){for(var i=0;i<this._roots[Re];i++)this._roots[i][we](t,e)},getDisplayList:function(t,e){return e=e||!1,t&&this.updateDisplayList(e),this._displayList},updateDisplayList:function(t){this._displayListLen=0;for(var i=this._roots,n=this._displayList,a=0,s=i[Re];s>a;a++)this._updateAndAddDisplayable(i[a],null,t);n[Re]=this._displayListLen,r[je]&&o(n,e)},_updateAndAddDisplayable:function(t,e,n){if(!t[Ue]||n){t.beforeUpdate(),t[i]&&t[He](),t.afterUpdate();var r=t.clipPath;if(r&&(r[l]=t,r.updateTransform(),e?(e=e.slice(),e.push(r)):e=[r]),t.isGroup){for(var a=t._children,o=0;o<a[Re];o++){var s=a[o];t[i]&&(s[i]=!0),this._updateAndAddDisplayable(s,e,n)}t[i]=!1}else t.__clipPaths=e,this._displayList[this._displayListLen++]=t}},addRoot:function(t){this._elements[t.id]||(t instanceof a&&t.addChildrenToStorage(this),this.addToMap(t),this._roots.push(t))},delRoot:function(t){if(null==t){for(var e=0;e<this._roots[Re];e++){var i=this._roots[e];i instanceof a&&i.delChildrenFromStorage(this)}return this._elements={},this._roots=[],this._displayList=[],void(this._displayListLen=0)}if(t instanceof Array)for(var e=0,r=t[Re];r>e;e++)this.delRoot(t[e]);else{var o;o=typeof t==ei?this._elements[t]:t;var s=n[pe](this._roots,o);s>=0&&(this.delFromMap(o.id),this._roots[ze](s,1),o instanceof a&&o.delChildrenFromStorage(this))}},addToMap:function(t){return t instanceof a&&(t.__storage=this),t.dirty(!1),this._elements[t.id]=t,this},get:function(t){return this._elements[t]},delFromMap:function(t){var e=this._elements,i=e[t];return i&&(delete e[t],i instanceof a&&(i.__storage=null)),this},dispose:function(){this._elements=this._renderList=this._roots=null},displayableSortFunc:e},s}),e("zrender/graphic/helper/poly",[ci,"./smoothSpline","./smoothBezier"],function(t){var e=t("./smoothSpline"),i=t("./smoothBezier");return{buildPath:function(t,n,a){var o=n.points,s=n.smooth;if(o&&o[Re]>=2){if(s&&"spline"!==s){var l=i(o,s,a,n.smoothConstraint);
t[r](o[0][0],o[0][1]);for(var c=o[Re],u=0;(a?c:c-1)>u;u++){var h=l[2*u],f=l[2*u+1],d=o[(u+1)%c];t.bezierCurveTo(h[0],h[1],f[0],f[1],d[0],d[1])}}else{"spline"===s&&(o=e(o,a)),t[r](o[0][0],o[0][1]);for(var u=1,p=o[Re];p>u;u++)t.lineTo(o[u][0],o[u][1])}a&&t.closePath()}}}}),e("zrender/animation/Animation",[ci,"../core/util","../core/event","./requestAnimationFrame","./Animator"],function(t){var e=t("../core/util"),i=t("../core/event").Dispatcher,n=t("./requestAnimationFrame"),r=t("./Animator"),a=function(t){t=t||{},this.stage=t.stage||{},this.onframe=t.onframe||function(){},this._clips=[],this._running=!1,this._time,this._pausedTime,this._pauseStart,this._paused=!1,i.call(this)};return a[ii]={constructor:a,addClip:function(t){this._clips.push(t)},addAnimator:function(t){t[Ke]=this;for(var e=t.getClips(),i=0;i<e[Re];i++)this.addClip(e[i])},removeClip:function(t){var i=e[pe](this._clips,t);i>=0&&this._clips[ze](i,1)},removeAnimator:function(t){for(var e=t.getClips(),i=0;i<e[Re];i++)this.removeClip(e[i]);t[Ke]=null},_update:function(){for(var t=(new Date).getTime()-this._pausedTime,e=t-this._time,i=this._clips,n=i[Re],r=[],a=[],o=0;n>o;o++){var s=i[o],l=s.step(t);l&&(r.push(l),a.push(s))}for(var o=0;n>o;)i[o]._needsRemove?(i[o]=i[n-1],i.pop(),n--):o++;n=r[Re];for(var o=0;n>o;o++)a[o].fire(r[o]);this._time=t,this.onframe(e),this[Ie]("frame",e),this.stage[He]&&this.stage[He]()},_startLoop:function(){function t(){e._running&&(n(t),!e._paused&&e._update())}var e=this;this._running=!0,n(t)},start:function(){this._time=(new Date).getTime(),this._pausedTime=0,this._startLoop()},stop:function(){this._running=!1},pause:function(){this._paused||(this._pauseStart=(new Date).getTime(),this._paused=!0)},resume:function(){this._paused&&(this._pausedTime+=(new Date).getTime()-this._pauseStart,this._paused=!1)},clear:function(){this._clips=[]},animate:function(t,e){e=e||{};var i=new r(t,e.loop,e.getter,e.setter);return i}},e.mixin(a,i),a}),e("zrender/dom/HandlerProxy",[ci,"../core/event","../core/util","../mixin/Eventful","../core/env","../core/GestureMgr"],function(t){function e(t){return"mousewheel"===t&&u.browser.firefox?"DOMMouseScroll":t}function i(t,e,i){var n=t._gestureMgr;"start"===i&&n.clear();var r=n.recognize(e,t.handler.findHover(e.zrX,e.zrY,null),t.dom);if("end"===i&&n.clear(),r){var a=r.type;e.gestureEvent=a,t.handler.dispatchToElement(r[Ce],a,r.event)}}function n(t){t._touching=!0,clearTimeout(t._touchTimer),t._touchTimer=setTimeout(function(){t._touching=!1},700)}function r(){return u.touchEventsSupported}function a(t){function e(t,e){return function(){return e._touching?void 0:t.apply(e,arguments)}}for(var i=0;i<g[Re];i++){var n=g[i];t._handlers[n]=l.bind(y[n],t)}for(var i=0;i<v[Re];i++){var n=v[i];t._handlers[n]=e(y[n],t)}}function o(t){function i(i,n){l.each(i,function(i){f(t,e(i),n._handlers[i])},n)}c.call(this),this.dom=t,this._touching=!1,this._touchTimer,this._gestureMgr=new h,this._handlers={},a(this),r()&&i(g,this),i(v,this)}var s=t("../core/event"),l=t("../core/util"),c=t("../mixin/Eventful"),u=t("../core/env"),h=t("../core/GestureMgr"),f=s.addEventListener,d=s.removeEventListener,p=s.normalizeEvent,m=300,v=["click","dblclick","mousewheel",Le,"mouseup","mousedown",Ae],g=["touchstart","touchend","touchmove"],y={mousemove:function(t){t=p(this.dom,t),this[Ie](Ae,t)},mouseout:function(t){t=p(this.dom,t);var e=t.toElement||t.relatedTarget;if(e!=this.dom)for(;e&&9!=e.nodeType;){if(e===this.dom)return;e=e.parentNode}this[Ie](Le,t)},touchstart:function(t){t=p(this.dom,t),this._lastTouchMoment=new Date,i(this,t,"start"),y[Ae].call(this,t),y.mousedown.call(this,t),n(this)},touchmove:function(t){t=p(this.dom,t),i(this,t,"change"),y[Ae].call(this,t),n(this)},touchend:function(t){t=p(this.dom,t),i(this,t,"end"),y.mouseup.call(this,t),+new Date-this._lastTouchMoment<m&&y.click.call(this,t),n(this)}};l.each(["click","mousedown","mouseup","mousewheel","dblclick"],function(t){y[t]=function(e){e=p(this.dom,e),this[Ie](t,e)}});var x=o[ii];return x.dispose=function(){for(var t=v[Q](g),i=0;i<t[Re];i++){var n=t[i];d(this.dom,e(n),this._handlers[n])}},x.setCursor=function(t){this.dom.style.cursor=t||"default"},l.mixin(o,c),o}),e("zrender/Painter",[ci,"./config","./core/util","./core/log","./core/BoundingRect","./core/timsort","./Layer","./animation/requestAnimationFrame","./graphic/Image"],function(t){function e(t){return parseInt(t,10)}function r(t){return t?t.isBuildin?!0:typeof t[ti]!==ge||typeof t.refresh!==ge?!1:!0:!1}function o(t){t.__unusedCount++}function s(t){1==t.__unusedCount&&t.clear()}function l(t,e,i){return w.copy(t[oe]()),t[a]&&w[d](t[a]),M.width=e,M[We]=i,!w.intersect(M)}function c(t,e){if(t==e)return!1;if(!t||!e||t[Re]!==e[Re])return!0;for(var i=0;i<t[Re];i++)if(t[i]!==e[i])return!0}function u(t,e){for(var i=0;i<t[Re];i++){var r=t[i],a=r.path;r.setTransform(e),a.beginPath(e),r[n](a,r.shape),e.clip(),r.restoreTransform(e)}}function h(t,e){var i=document[J]("div"),n=i.style;return n[ne]="relative",n.overflow="hidden",n.width=t+"px",n[We]=e+"px",i}var f=t("./config"),p=t("./core/util"),m=t("./core/log"),v=t("./core/BoundingRect"),g=t("./core/timsort"),y=t("./Layer"),_=t("./animation/requestAnimationFrame"),b=5,w=new v(0,0,0,0),M=new v(0,0,0,0),S=function(t,e,i){var n=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();i=i||{},this.dpr=i.devicePixelRatio||f.devicePixelRatio,this._singleCanvas=n,this.root=t;var r=t.style;r&&(r["-webkit-tap-highlight-color"]="transparent",r["-webkit-user-select"]=r["user-select"]=r["-webkit-touch-callout"]="none",t.innerHTML=""),this[Ye]=e;var a=this._zlevelList=[],o=this._layers={};if(this._layerConfig={},n){var s=t.width,l=t[We];this._width=s,this._height=l;var c=new y(t,this,1);c.initContext(),o[0]=c,a.push(0)}else{this._width=this._getWidth(),this._height=this._getHeight();var u=this._domRoot=h(this._width,this._height);t.appendChild(u)}this.pathToImage=this._createPathToImage(),this._progressiveLayers=[],this._hoverlayer,this._hoverElements=[]};return S[ii]={constructor:S,isSingleCanvas:function(){return this._singleCanvas},getViewportRoot:function(){return this._singleCanvas?this._layers[0].dom:this._domRoot},refresh:function(t){var e=this[Ye].getDisplayList(!0),i=this._zlevelList;this._paintList(e,t);for(var n=0;n<i[Re];n++){var r=i[n],a=this._layers[r];!a.isBuildin&&a.refresh&&a.refresh()}return this.refreshHover(),this._progressiveLayers[Re]&&this._startProgessive(),this},addHover:function(t,e){if(!t.__hoverMir){var i=new t.constructor({style:t.style,shape:t.shape});i.__from=t,t.__hoverMir=i,i[be](e),this._hoverElements.push(i)}},removeHover:function(t){var e=t.__hoverMir,i=this._hoverElements,n=p[pe](i,e);n>=0&&i[ze](n,1),t.__hoverMir=null},clearHover:function(){for(var t=this._hoverElements,e=0;e<t[Re];e++){var i=t[e].__from;i&&(i.__hoverMir=null)}t[Re]=0},refreshHover:function(){var t=this._hoverElements,e=t[Re],i=this._hoverlayer;if(i&&i.clear(),e){g(t,this[Ye].displayableSortFunc),i||(i=this._hoverlayer=this.getLayer(1e5));var n={};i.ctx.save();for(var r=0;e>r;){var o=t[r],s=o.__from;s&&s.__zr?(r++,s.invisible||(o[a]=s[a],o.invTransform=s.invTransform,o.__clipPaths=s.__clipPaths,this._doPaintEl(o,i,!0,n))):(t[ze](r,1),s.__hoverMir=null,e--)}i.ctx.restore()}},_startProgessive:function(){function t(){i===e._progressiveToken&&e[Ye]&&(e._doPaintList(e[Ye].getDisplayList()),e._furtherProgressive?(e._progress++,_(t)):e._progressiveToken=-1)}var e=this;if(e._furtherProgressive){var i=e._progressiveToken=+new Date;e._progress++,_(t)}},_clearProgressive:function(){this._progressiveToken=-1,this._progress=0,p.each(this._progressiveLayers,function(t){t[i]&&t.clear()})},_paintList:function(t,e){null==e&&(e=!1),this._updateLayerStatus(t),this._clearProgressive(),this.eachBuildinLayer(o),this._doPaintList(t,e),this.eachBuildinLayer(s)},_doPaintList:function(t,e){function n(t){var e=o.dpr||1;o.save(),o.globalAlpha=1,o.shadowBlur=0,r[i]=!0,o.setTransform(1,0,0,1,0,0),o.drawImage(t.dom,0,0,h*e,f*e),o.restore()}for(var r,a,o,s,l,c,u=0,h=this._width,f=this._height,d=this._progress,v=0,g=t[Re];g>v;v++){var y=t[v],x=this._singleCanvas?0:y[_e],_=y.__frame;if(0>_&&l&&(n(l),l=null),a!==x&&(o&&o.restore(),s={},a=x,r=this.getLayer(a),r.isBuildin||m("ZLevel "+a+" has been used by unkown layer "+r.id),o=r.ctx,o.save(),r.__unusedCount=0,(r[i]||e)&&r.clear()),r[i]||e){if(_>=0){if(!l){if(l=this._progressiveLayers[Math.min(u++,b-1)],l.ctx.save(),l.renderScope={},l&&l.__progress>l.__maxProgress){v=l.__nextIdxNotProg-1;continue}c=l.__progress,l[i]||(d=c),l.__progress=d+1}_===d&&this._doPaintEl(y,l,!0,l.renderScope)}else this._doPaintEl(y,r,e,s);y[i]=!1}}l&&n(l),o&&o.restore(),this._furtherProgressive=!1,p.each(this._progressiveLayers,function(t){t.__maxProgress>=t.__progress&&(this._furtherProgressive=!0)},this)},_doPaintEl:function(t,e,n,r){var o=e.ctx,s=t[a];if(!(!e[i]&&!n||t.invisible||0===t.style[ie]||s&&!s[0]&&!s[3]||t.culling&&l(t,this._width,this._height))){var h=t.__clipPaths;(r.prevClipLayer!==e||c(h,r.prevElClipPaths))&&(r.prevElClipPaths&&(r.prevClipLayer.ctx.restore(),r.prevClipLayer=r.prevElClipPaths=null,r.prevEl=null),h&&(o.save(),u(h,o),r.prevClipLayer=e,r.prevElClipPaths=h)),t.beforeBrush&&t.beforeBrush(o),t.brush(o,r.prevEl||null),r.prevEl=t,t.afterBrush&&t.afterBrush(o)}},getLayer:function(t){if(this._singleCanvas)return this._layers[0];var e=this._layers[t];return e||(e=new y("zr_"+t,this,this.dpr),e.isBuildin=!0,this._layerConfig[t]&&p.merge(e,this._layerConfig[t],!0),this.insertLayer(t,e),e.initContext()),e},insertLayer:function(t,e){var i=this._layers,n=this._zlevelList,a=n[Re],o=null,s=-1,l=this._domRoot;if(i[t])return void m("ZLevel "+t+" has been used already");if(!r(e))return void m("Layer of zlevel "+t+" is not valid");if(a>0&&t>n[0]){for(s=0;a-1>s&&!(n[s]<t&&n[s+1]>t);s++);o=i[n[s]]}if(n[ze](s+1,0,t),o){var c=o.dom;c.nextSibling?l.insertBefore(e.dom,c.nextSibling):l.appendChild(e.dom)}else l.firstChild?l.insertBefore(e.dom,l.firstChild):l.appendChild(e.dom);i[t]=e},eachLayer:function(t,e){var i,n,r=this._zlevelList;for(n=0;n<r[Re];n++)i=r[n],t.call(e,this._layers[i],i)},eachBuildinLayer:function(t,e){var i,n,r,a=this._zlevelList;for(r=0;r<a[Re];r++)n=a[r],i=this._layers[n],i.isBuildin&&t.call(e,i,n)},eachOtherLayer:function(t,e){var i,n,r,a=this._zlevelList;for(r=0;r<a[Re];r++)n=a[r],i=this._layers[n],i.isBuildin||t.call(e,i,n)},getLayers:function(){return this._layers},_updateLayerStatus:function(t){var e=this._layers,n=this._progressiveLayers,r={},a={};this.eachBuildinLayer(function(t,e){r[e]=t.elCount,t.elCount=0,t[i]=!1}),p.each(n,function(t,e){a[e]=t.elCount,t.elCount=0,t[i]=!1});for(var o,s,l=0,c=0,u=0,h=t[Re];h>u;u++){var f=t[u],d=this._singleCanvas?0:f[_e],m=e[d],v=f.progressive;if(m&&(m.elCount++,m[i]=m[i]||f[i]),v>=0){s!==v&&(s=v,c++);var g=f.__frame=c-1;if(!o){var x=Math.min(l,b-1);o=n[x],o||(o=n[x]=new y("progressive",this,this.dpr),o.initContext()),o.__maxProgress=0}o[i]=o[i]||f[i],o.elCount++,o.__maxProgress=Math.max(o.__maxProgress,g),o.__maxProgress>=o.__progress&&(m[i]=!0)}else f.__frame=-1,o&&(o.__nextIdxNotProg=u,l++,o=null)}o&&(l++,o.__nextIdxNotProg=u),this.eachBuildinLayer(function(t,e){r[e]!==t.elCount&&(t[i]=!0)}),n[Re]=Math.min(l,b),p.each(n,function(t,e){a[e]!==t.elCount&&(f[i]=!0),t[i]&&(t.__progress=0)})},clear:function(){return this.eachBuildinLayer(this._clearLayer),this},_clearLayer:function(t){t.clear()},configLayer:function(t,e){if(e){var i=this._layerConfig;i[t]?p.merge(i[t],e,!0):i[t]=e;var n=this._layers[t];n&&p.merge(n,i[t],!0)}},delLayer:function(t){var e=this._layers,i=this._zlevelList,n=e[t];n&&(n.dom.parentNode.removeChild(n.dom),delete e[t],i[ze](p[pe](i,t),1))},resize:function(t,e){var i=this._domRoot;if(i.style.display="none",t=t||this._getWidth(),e=e||this._getHeight(),i.style.display="",this._width!=t||e!=this._height){i.style.width=t+"px",i.style[We]=e+"px";for(var n in this._layers)this._layers[n][ti](t,e);this.refresh(!0)}return this._width=t,this._height=e,this},clearLayer:function(t){var e=this._layers[t];e&&e.clear()},dispose:function(){this.root.innerHTML="",this.root=this[Ye]=this._domRoot=this._layers=null},getRenderedCanvas:function(t){if(t=t||{},this._singleCanvas)return this._layers[0].dom;var e=new y("image",this,t.pixelRatio||this.dpr);e.initContext(),e.clearColor=t.backgroundColor,e.clear();for(var i=this[Ye].getDisplayList(!0),n={},r=0;r<i[Re];r++){var a=i[r];this._doPaintEl(a,e,!0,n)}return e.dom},getWidth:function(){return this._width},getHeight:function(){return this._height},_getWidth:function(){var t=this.root,i=document.defaultView.getComputedStyle(t);return(t.clientWidth||e(i.width)||e(t.style.width))-(e(i.paddingLeft)||0)-(e(i.paddingRight)||0)|0},_getHeight:function(){var t=this.root,i=document.defaultView.getComputedStyle(t);return(t.clientHeight||e(i[We])||e(t.style[We]))-(e(i.paddingTop)||0)-(e(i.paddingBottom)||0)|0},_pathToImage:function(e,i,n,r,a){var o=document[J]("canvas"),s=o.getContext("2d");o.width=n*a,o[We]=r*a,s.clearRect(0,0,n*a,r*a);var l={position:i[ne],rotation:i[x],scale:i.scale};i[ne]=[0,0,0],i[x]=0,i.scale=[1,1],i&&i.brush(s);var c=t("./graphic/Image"),u=new c({id:e,style:{x:0,y:0,image:o}});return null!=l[ne]&&(u[ne]=i[ne]=l[ne]),null!=l[x]&&(u[x]=i[x]=l[x]),null!=l.scale&&(u.scale=i.scale=l.scale),u},_createPathToImage:function(){var t=this;return function(e,i,n,r){return t._pathToImage(e,i,n,r,t.dpr)}}},S}),e("echarts/chart/bar/barItemStyle",[ci,"../../model/mixin/makeStyleMapper"],function(t){var e=t("../../model/mixin/makeStyleMapper")([["fill","color"],[h,"borderColor"],[f,"borderWidth"],[h,"barBorderColor"],[f,"barBorderWidth"],[ie],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]);return{getBarItemStyle:function(t){var i=e.call(this,t);if(this.getBorderLineDash){var n=this.getBorderLineDash();n&&(i.lineDash=n)}return i}}}),e("zrender/mixin/Draggable",[ci],function(){function t(){this.on("mousedown",this._dragStart,this),this.on(Ae,this._drag,this),this.on("mouseup",this._dragEnd,this),this.on("globalout",this._dragEnd,this)}return t[ii]={constructor:t,_dragStart:function(t){var e=t[Ce];e&&e.draggable&&(this._draggingTarget=e,e.dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.dispatchToElement(e,"dragstart",t.event))},_drag:function(t){var e=this._draggingTarget;if(e){var i=t.offsetX,n=t.offsetY,r=i-this._x,a=n-this._y;this._x=i,this._y=n,e.drift(r,a,t),this.dispatchToElement(e,"drag",t.event);var o=this.findHover(i,n,e),s=this._dropTarget;this._dropTarget=o,e!==o&&(s&&o!==s&&this.dispatchToElement(s,"dragleave",t.event),o&&o!==s&&this.dispatchToElement(o,"dragenter",t.event))}},_dragEnd:function(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.dispatchToElement(e,"dragend",t.event),this._dropTarget&&this.dispatchToElement(this._dropTarget,"drop",t.event),this._draggingTarget=null,this._dropTarget=null}},t}),e("zrender/graphic/helper/smoothSpline",[ci,"../../core/vector"],function(t){function e(t,e,i,n,r,a,o){var s=.5*(i-t),l=.5*(n-e);return(2*(e-i)+s+l)*o+(-3*(e-i)-2*s-l)*a+s*r+e}var i=t("../../core/vector");return function(t,n){for(var r=t[Re],a=[],o=0,s=1;r>s;s++)o+=i.distance(t[s-1],t[s]);var l=o/2;l=r>l?r:l;for(var s=0;l>s;s++){var c,u,h,f=s/(l-1)*(n?r:r-1),d=Math.floor(f),p=f-d,m=t[d%r];n?(c=t[(d-1+r)%r],u=t[(d+1)%r],h=t[(d+2)%r]):(c=t[0===d?d:d-1],u=t[d>r-2?r-1:d+1],h=t[d>r-3?r-1:d+2]);var v=p*p,g=p*v;a.push([e(c[0],m[0],u[0],h[0],p,v,g),e(c[1],m[1],u[1],h[1],p,v,g)])}return a}}),e("zrender/graphic/helper/smoothBezier",[ci,"../../core/vector"],function(t){var e=t("../../core/vector"),i=e.min,n=e.max,r=e.scale,a=e.distance,o=e.add;return function(t,s,l,c){var u,h,f,d,p=[],m=[],v=[],g=[];if(c){f=[1/0,1/0],d=[-1/0,-1/0];for(var y=0,x=t[Re];x>y;y++)i(f,f,t[y]),n(d,d,t[y]);i(f,f,c[0]),n(d,d,c[1])}for(var y=0,x=t[Re];x>y;y++){var _=t[y];if(l)u=t[y?y-1:x-1],h=t[(y+1)%x];else{if(0===y||y===x-1){p.push(e.clone(t[y]));continue}u=t[y-1],h=t[y+1]}e.sub(m,h,u),r(m,m,s);var b=a(_,u),w=a(_,h),M=b+w;0!==M&&(b/=M,w/=M),r(v,m,-b),r(g,m,w);var S=o([],_,v),T=o([],_,g);c&&(n(S,S,f),i(S,S,d),n(T,T,f),i(T,T,d)),p.push(S),p.push(T)}return l&&p.push(p.shift()),p}}),e("zrender/graphic/helper/roundRect",[ci],function(){return{buildPath:function(t,e){var i,n,a,o,s=e.x,l=e.y,c=e.width,u=e[We],h=e.r;0>c&&(s+=c,c=-c),0>u&&(l+=u,u=-u),typeof h===ve?i=n=a=o=h:h instanceof Array?1===h[Re]?i=n=a=o=h[0]:2===h[Re]?(i=a=h[0],n=o=h[1]):3===h[Re]?(i=h[0],n=o=h[1],a=h[2]):(i=h[0],n=h[1],a=h[2],o=h[3]):i=n=a=o=0;var f;i+n>c&&(f=i+n,i*=c/f,n*=c/f),a+o>c&&(f=a+o,a*=c/f,o*=c/f),n+a>u&&(f=n+a,n*=u/f,a*=u/f),i+o>u&&(f=i+o,i*=u/f,o*=u/f),t[r](s+i,l),t.lineTo(s+c-n,l),0!==n&&t.quadraticCurveTo(s+c,l,s+c,l+n),t.lineTo(s+c,l+u-a),0!==a&&t.quadraticCurveTo(s+c,l+u,s+c-a,l+u),t.lineTo(s+o,l+u),0!==o&&t.quadraticCurveTo(s,l+u,s,l+u-o),t.lineTo(s,l+i),0!==i&&t.quadraticCurveTo(s,l,s+i,l)}}}),e("zrender/core/event",[ci,"../mixin/Eventful"],function(t){function e(t){return t.getBoundingClientRect?t.getBoundingClientRect():{left:0,top:0}}function i(t,i,n){var r=e(t);return n=n||{},n.zrX=i.clientX-r.left,n.zrY=i.clientY-r.top,n}function n(t,e){if(e=e||window.event,null!=e.zrX)return e;var n=e.type,r=n&&n[pe]("touch")>=0;if(r){var a="touchend"!=n?e.targetTouches[0]:e.changedTouches[0];a&&i(t,a,e)}else i(t,e,e),e.zrDelta=e.wheelDelta?e.wheelDelta/120:-(e.detail||0)/3;return e}function r(t,e,i){s?t.addEventListener(e,i):t.attachEvent("on"+e,i)}function a(t,e,i){s?t.removeEventListener(e,i):t.detachEvent("on"+e,i)}var o=t("../mixin/Eventful"),s=typeof window!==_&&!!window.addEventListener,l=s?function(t){t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0}:function(t){t.returnValue=!1,t.cancelBubble=!0};return{clientToLocal:i,normalizeEvent:n,addEventListener:r,removeEventListener:a,stop:l,Dispatcher:o}}),e("zrender/animation/requestAnimationFrame",[ci],function(){return typeof window!==_&&(window.requestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){setTimeout(t,16)}}),e("zrender/core/GestureMgr",[ci,"./event"],function(t){function e(t){var e=t[1][0]-t[0][0],i=t[1][1]-t[0][1];return Math.sqrt(e*e+i*i)}function i(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2]}var n=t("./event"),r=function(){this._track=[]};r[ii]={constructor:r,recognize:function(t,e,i){return this._doTrack(t,e,i),this._recognize(t)},clear:function(){return this._track[Re]=0,this},_doTrack:function(t,e,i){var r=t.touches;if(r){for(var a={points:[],touches:[],target:e,event:t},o=0,s=r[Re];s>o;o++){var l=r[o],c=n.clientToLocal(i,l);a.points.push([c.zrX,c.zrY]),a.touches.push(l)}this._track.push(a)}},_recognize:function(t){for(var e in a)if(a.hasOwnProperty(e)){var i=a[e](this._track,t);if(i)return i}}};var a={pinch:function(t,n){var r=t[Re];if(r){var a=(t[r-1]||{}).points,o=(t[r-2]||{}).points||a;if(o&&o[Re]>1&&a&&a[Re]>1){var s=e(a)/e(o);!isFinite(s)&&(s=1),n.pinchScale=s;var l=i(a);return n.pinchX=l[0],n.pinchY=l[1],{type:"pinch",target:t[0][Ce],event:n}}}}};return r}),e("zrender/Layer",[ci,"./core/util","./config","./graphic/Style","./graphic/Pattern"],function(t){function e(){return!1}function i(t,e,i,n){var r=document[J](e),a=i[Qe](),o=i[$e](),s=r.style;return s[ne]="absolute",s.left=0,s.top=0,s.width=a+"px",s[We]=o+"px",r.width=a*n,r[We]=o*n,r.setAttribute("data-zr-dom-id",t),r}var n=t("./core/util"),r=t("./config"),a=t("./graphic/Style"),o=t("./graphic/Pattern"),s=function(t,a,o){var s;o=o||r.devicePixelRatio,typeof t===ei?s=i(t,"canvas",a,o):n[Ge](t)&&(s=t,t=s.id),this.id=t,this.dom=s;var l=s.style;l&&(s.onselectstart=e,l["-webkit-user-select"]="none",l["user-select"]="none",l["-webkit-touch-callout"]="none",l["-webkit-tap-highlight-color"]="rgba(0,0,0,0)"),this.domBack=null,this.ctxBack=null,this.painter=a,this.config=null,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.dpr=o};return s[ii]={constructor:s,elCount:0,__dirty:!0,initContext:function(){this.ctx=this.dom.getContext("2d"),this.ctx.dpr=this.dpr},createBackBuffer:function(){var t=this.dpr;this.domBack=i("back-"+this.id,"canvas",this.painter,t),this.ctxBack=this.domBack.getContext("2d"),1!=t&&this.ctxBack.scale(t,t)},resize:function(t,e){var i=this.dpr,n=this.dom,r=n.style,a=this.domBack;r.width=t+"px",r[We]=e+"px",n.width=t*i,n[We]=e*i,a&&(a.width=t*i,a[We]=e*i,1!=i&&this.ctxBack.scale(i,i))},clear:function(t){var e=this.dom,i=this.ctx,n=e.width,r=e[We],s=this.clearColor,l=this.motionBlur&&!t,c=this.lastFrameAlpha,u=this.dpr;if(l&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(e,0,0,n/u,r/u)),i.clearRect(0,0,n,r),s){var h;s.colorStops?(h=s.__canvasGradient||a.getGradient(i,s,{x:0,y:0,width:n,height:r}),s.__canvasGradient=h):s.image&&(h=o[ii].getCanvasPattern.call(s,i)),i.save(),i.fillStyle=h||s,i.fillRect(0,0,n,r),i.restore()}if(l){var f=this.domBack;i.save(),i.globalAlpha=c,i.drawImage(f,0,0,n,r),i.restore()}}},s}),e("echarts/preprocessor/helper/compatStyle",[ci,li],function(t){function e(t){var e=t&&t.itemStyle;e&&i.each(n,function(n){var r=e[z],a=e[T];r&&r[n]&&(t[n]=t[n]||{},t[n][z]?i.merge(t[n][z],r[n]):t[n][z]=r[n],r[n]=null),a&&a[n]&&(t[n]=t[n]||{},t[n][T]?i.merge(t[n][T],a[n]):t[n][T]=a[n],a[n]=null)})}var i=t(li),n=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"];return function(t){if(t){e(t),e(t.markPoint),e(t.markLine);var n=t.data;if(n){for(var r=0;r<n[Re];r++)e(n[r]);var a=t.markPoint;if(a&&a.data)for(var o=a.data,r=0;r<o[Re];r++)e(o[r]);var s=t.markLine;if(s&&s.data)for(var l=s.data,r=0;r<l[Re];r++)i[ye](l[r])?(e(l[r][0]),e(l[r][1])):e(l[r])}}}}),e("echarts/component/axis/AxisView",[ci,li,I,"./AxisBuilder",D],function(t){function e(t,e){function i(t){var e=n[G](t);return e.toGlobalCoord(e[w](0))}var n=t[he],r=e.axis,a={},o=r[ne],s=r.onZero?"onZero":o,l=r.dim,c=n.getRect(),u=[c.x,c.x+c.width,c.y,c.y+c[We]],h=e.get("offset")||0,f={x:{top:u[2]-h,bottom:u[3]+h},y:{left:u[0]-h,right:u[1]+h}};f.x.onZero=Math.max(Math.min(i("y"),f.x[Ze]),f.x.top),f.y.onZero=Math.max(Math.min(i("x"),f.y.right),f.y.left),a[ne]=["y"===l?f.y[s]:u[0],"x"===l?f.x[s]:u[3]],a[x]=Math.PI/2*("x"===l?0:1);var d={top:-1,bottom:1,left:-1,right:1};a.labelDirection=a.tickDirection=a.nameDirection=d[o],r.onZero&&(a.labelOffset=f[l][o]-f[l].onZero),e[Je]("axisTick").get("inside")&&(a.tickDirection=-a.tickDirection),e[Je]("axisLabel").get("inside")&&(a.labelDirection=-a.labelDirection);var p=e[Je]("axisLabel").get("rotate");return a.labelRotation="top"===s?-p:p,a.labelInterval=r.getLabelInterval(),a.z2=1,a}var i=t(li),n=t(I),r=t("./AxisBuilder"),a=r.ifIgnoreOnTick,o=r.getInterval,s=["axisLine","axisLabel","axisTick","axisName"],l=["splitArea","splitLine"],c=t(D).extendComponentView({type:"axis",render:function(t){this.group[fe]();var a=this._axisGroup;if(this._axisGroup=new n.Group,this.group.add(this._axisGroup),t.get("show")){var o=t.findGridModel(),c=e(o,t),u=new r(t,c);i.each(s,u.add,u),this._axisGroup.add(u.getGroup()),i.each(l,function(e){t.get(e+".show")&&this["_"+e](t,o,c.labelInterval)},this),n.groupTransition(a,this._axisGroup,t)}},_splitLine:function(t,e,r){var s=t.axis,l=t[Je]("splitLine"),c=l[Je]("lineStyle"),u=c.get("color"),h=o(l,r);u=i[ye](u)?u:[u];for(var f=e[he].getRect(),d=s.isHorizontal(),p=0,m=s.getTicksCoords(),v=s.scale[te](),g=[],x=[],_=c[y](),b=0;b<m[Re];b++)if(!a(s,b,h)){var w=s.toGlobalCoord(m[b]);d?(g[0]=w,g[1]=f.y,x[0]=w,x[1]=f.y+f[We]):(g[0]=f.x,g[1]=w,x[0]=f.x+f.width,x[1]=w);var M=p++%u[Re];this._axisGroup.add(new n.Line(n.subPixelOptimizeLine({anid:"line_"+v[b],shape:{x1:g[0],y1:g[1],x2:x[0],y2:x[1]},style:i[Oe]({stroke:u[M]},_),silent:!0})))}},_splitArea:function(t,e,r){var s=t.axis,l=t[Je]("splitArea"),c=l[Je]("areaStyle"),u=c.get("color"),h=e[he].getRect(),f=s.getTicksCoords(),d=s.scale[te](),p=s.toGlobalCoord(f[0]),m=s.toGlobalCoord(f[0]),v=0,g=o(l,r),y=c.getAreaStyle();u=i[ye](u)?u:[u];for(var x=1;x<f[Re];x++)if(!a(s,x,g)){var _,b,w,M,S=s.toGlobalCoord(f[x]);s.isHorizontal()?(_=p,b=h.y,w=S-_,M=h[We]):(_=h.x,b=m,w=h.width,M=S-b);var T=v++%u[Re];this._axisGroup.add(new n.Rect({anid:"area_"+d[x],shape:{x:_,y:b,width:w,height:M},style:i[Oe]({fill:u[T]},y),silent:!0})),p=_+w,m=b+M}}});c[Be]({type:"xAxis"}),c[Be]({type:"yAxis"})}),e("echarts/chart/pie/labelLayout",[ci,"zrender/contain/text"],function(t){function e(t,e,i,n,r,a,o){function s(e,i,n){for(var r=e;i>r;r++)if(t[r].y+=n,r>e&&i>r+1&&t[r+1].y>t[r].y+t[r][We])return void l(r,n/2);l(i-1,n/2)}function l(e,i){for(var n=e;n>=0&&(t[n].y-=i,!(n>0&&t[n].y>t[n-1].y+t[n-1][We]));n--);}function c(t,e,i,n,r,a){for(var o=a>0?e?Number.MAX_VALUE:0:e?Number.MAX_VALUE:0,s=0,l=t[Re];l>s;s++)if(t[s][ne]!==re){var c=Math.abs(t[s].y-n),u=t[s].len,h=t[s].len2,f=r+u>c?Math.sqrt((r+u+h)*(r+u+h)-c*c):Math.abs(t[s].x-i);e&&f>=o&&(f=o-10),!e&&o>=f&&(f=o+10),t[s].x=i+f*a,o=f}}t.sort(function(t,e){return t.y-e.y});for(var u,h=0,f=t[Re],d=[],p=[],m=0;f>m;m++)u=t[m].y-h,0>u&&s(m,f,-u,r),h=t[m].y+t[m][We];0>o-h&&l(f-1,h-o);for(var m=0;f>m;m++)t[m].y>=i?p.push(t[m]):d.push(t[m]);c(d,!1,e,i,n,r),c(p,!0,e,i,n,r)}function i(t,i,n,r,a,o){for(var s=[],l=[],c=0;c<t[Re];c++)t[c].x<i?s.push(t[c]):l.push(t[c]);e(l,i,n,r,1,a,o),e(s,i,n,r,-1,a,o);for(var c=0;c<t[Re];c++){var u=t[c].linePoints;if(u){var h=u[1][0]-u[2][0];u[2][0]=t[c].x<i?t[c].x+3:t[c].x-3,u[1][1]=u[2][1]=t[c].y,u[1][0]=u[2][0]+h}}}var n=t("zrender/contain/text");return function(t,e,r,a){var o,s,l=t[si](),c=[],u=!1;l.each(function(i){var r,a,h,f,d=l[k](i),p=l[q](i),m=p[Je]("label.normal"),v=m.get(ne)||p.get("label.emphasis.position"),g=p[Je]("labelLine.normal"),y=g.get(Re),x=g.get("length2"),_=(d.startAngle+d.endAngle)/2,b=Math.cos(_),w=Math.sin(_);o=d.cx,s=d.cy;var M="inside"===v||"inner"===v;if(v===re)r=d.cx,a=d.cy,f=re;else{var S=(M?(d.r+d.r0)/2*b:d.r*b)+o,T=(M?(d.r+d.r0)/2*w:d.r*w)+s;if(r=S+3*b,a=T+3*w,!M){var C=S+b*(y+e-d.r),A=T+w*(y+e-d.r),L=C+(0>b?-1:1)*x,P=A;r=L+(0>b?-5:5),a=P,h=[[S,T],[C,A],[L,P]]}f=M?re:b>0?"left":"right"}var D=m[Je](ue)[le](),I=m.get("rotate")?0>b?-_+Math.PI:-_:0,R=t.getFormattedLabel(i,z)||l[F](i),O=n[oe](R,D,f,"top");u=!!I,d.label={x:r,y:a,position:v,height:O[We],len:y,len2:x,linePoints:h,textAlign:f,verticalAlign:"middle",font:D,rotation:I},M||c.push(d.label)}),!u&&t.get("avoidLabelOverlap")&&i(c,o,s,e,r,a)}}),e("echarts/component/axis/AngleAxisView",[ci,li,I,"../../model/Model",D],function(t){function e(t,e,i,n){var r=t.coordToPoint([e,n]),a=t.coordToPoint([i,n]);return{x1:r[0],y1:r[1],x2:a[0],y2:a[1]}}var i=t(li),n=t(I),r=t("../../model/Model"),a=["axisLine","axisLabel","axisTick","splitLine","splitArea"];t(D).extendComponentView({type:"angleAxis",render:function(t,e){if(this.group[fe](),t.get("show")){var n=e.getComponent("polar",t.get("polarIndex")),r=t.axis,o=n[he],s=o.getRadiusAxis()[K](),l=r.getTicksCoords();r.type!==V&&l.pop(),i.each(a,function(e){t.get(e+".show")&&this["_"+e](t,o,l,s)},this)}},_axisLine:function(t,e,i,r){var a=t[Je]("axisLine.lineStyle"),o=new n.Circle({shape:{cx:e.cx,cy:e.cy,r:r[1]},style:a[y](),z2:1,silent:!0});o.style.fill=null,this.group.add(o)},_axisTick:function(t,r,a,o){var s=t[Je]("axisTick"),l=(s.get("inside")?-1:1)*s.get(Re),c=i.map(a,function(t){return new n.Line({shape:e(r,o[1],o[1]+l,t)})});this.group.add(n.mergePath(c,{style:i[Oe](s[Je]("lineStyle")[y](),{stroke:t.get("axisLine.lineStyle.color")})}))},_axisLabel:function(t,e,i,a){for(var o=t.axis,s=t.get("data"),l=t[Je]("axisLabel"),c=l[Je](ue),u=t.getFormattedLabels(),h=l.get("margin"),f=o.getLabelsCoords(),d=0;d<i[Re];d++){var p=a[1],m=e.coordToPoint([p+h,f[d]]),v=e.cx,g=e.cy,y=Math.abs(m[0]-v)/p<.3?re:m[0]>v?"left":"right",x=Math.abs(m[1]-g)/p<.3?ae:m[1]>g?"top":Ze,_=c;s&&s[d]&&s[d][ue]&&(_=new r(s[d][ue],c)),this.group.add(new n.Text({style:{x:m[0],y:m[1],fill:_[se]()||t.get("axisLine.lineStyle.color"),text:u[d],textAlign:y,textVerticalAlign:x,textFont:_[le]()},silent:!0}))}},_splitLine:function(t,r,a,o){var s=t[Je]("splitLine"),l=s[Je]("lineStyle"),c=l.get("color"),u=0;c=c instanceof Array?c:[c];for(var h=[],f=0;f<a[Re];f++){var d=u++%c[Re];h[d]=h[d]||[],h[d].push(new n.Line({shape:e(r,o[0],o[1],a[f])}))}for(var f=0;f<h[Re];f++)this.group.add(n.mergePath(h[f],{style:i[Oe]({stroke:c[f%c[Re]]},l[y]()),silent:!0,z:t.get("z")}))},_splitArea:function(t,e,r,a){var o=t[Je]("splitArea"),s=o[Je]("areaStyle"),l=s.get("color"),c=0;l=l instanceof Array?l:[l];for(var u=[],h=Math.PI/180,f=-r[0]*h,d=Math.min(a[0],a[1]),p=Math.max(a[0],a[1]),m=t.get("clockwise"),v=1;v<r[Re];v++){var g=c++%l[Re];u[g]=u[g]||[],u[g].push(new n.Sector({shape:{cx:e.cx,cy:e.cy,r0:d,r:p,startAngle:f,endAngle:-r[v]*h,clockwise:m},silent:!0})),f=-r[v]*h}for(var v=0;v<u[Re];v++)this.group.add(n.mergePath(u[v],{style:i[Oe]({fill:l[v%l[Re]]},s.getAreaStyle()),silent:!0}))}})}),e("echarts/component/helper/MapDraw",[ci,"./RoamController",I,li],function(t){function e(t){var e=t.getItemStyle(),i=t.get("areaColor");return i&&(e.fill=i),e}function i(t,e,i,r){e.off("click"),t.get("selectedMode")&&e.on("click",function(a){for(var o=a[Ce];!o.__region;)o=o[l];if(o){var s=o.__region,c={type:("geo"===t[m]?"geo":"map")+"ToggleSelect",name:s.name,from:r.uid};c[t[m]+"Id"]=t.id,i[Ee](c),n(t,e)}})}function n(t,e){e.eachChild(function(e){e.__region&&e[Ie](t.isSelected(e.__region.name)?T:z)})}function r(t,e){var i=new o.Group;this._controller=new a(t.getZr(),e?i:null,null),this.group=i,this._updateGroup=e}var a=t("./RoamController"),o=t(I),s=t(li);return r[ii]={constructor:r,draw:function(t,r,a,l,c){var u=t[si]&&t[si](),h=t[he],f=this.group,d=h.scale,p={position:h[ne],scale:d};!f.childAt(0)||c?f.attr(p):o[P](f,p,t),f[fe]();var m=["itemStyle",z],v=["itemStyle",T],g=["label",z],y=["label",T];s.each(h.regions,function(i){var n=new o.Group,r=new o.CompoundPath({shape:{paths:[]}});n.add(r);var a,l=t.getRegionModel(i.name)||t,c=l[Je](m),h=l[Je](v),p=e(c,d),x=e(h,d),_=l[Je](g),b=l[Je](y);if(u){a=u.indexOfName(i.name);var w=u[C](a,"color",!0);w&&(p.fill=w)}var M=_[Je](ue),A=b[Je](ue);s.each(i.contours,function(t){var e=new o.Polygon({shape:{points:t}});r.shape.paths.push(e)}),r[be](p),r.style.strokeNoScale=!0,r.culling=!0;var L=_.get("show"),P=b.get("show"),D=u&&isNaN(u.get("value",a)),I=u&&u[k](a);if(!u||D&&(L||P)||I&&I.showLabel){var R=u?a:i.name,O=t.getFormattedLabel(R,z),E=t.getFormattedLabel(R,T),B=new o.Text({style:{text:L?O||i.name:"",fill:M[se](),textFont:M[le](),textAlign:"center",textVerticalAlign:"middle"},hoverStyle:{text:P?E||i.name:"",fill:A[se](),textFont:A[le]()},position:i[re].slice(),scale:[1/d[0],1/d[1]],z2:10,silent:!0});n.add(B)}if(u)u.setItemGraphicEl(a,n);else{var l=t.getRegionModel(i.name);r.eventData={componentType:"geo",geoIndex:t[N],name:i.name,region:l&&l[U]||{}}}n.__region=i,o[S](n,x),f.add(n)}),this._updateController(t,r,a),i(t,f,a,l),n(t,f)},remove:function(){this.group[fe](),this._controller.dispose()},_updateController:function(t,e,i){function n(){var e={type:"geoRoam",componentType:o};return e[o+"Id"]=t.id,e}var r=t[he],a=this._controller;a.zoomLimit=t.get("scaleLimit"),a.zoom=r.getZoom(),a.enable(t.get("roam")||!1);var o=t[m];a.off("pan").on("pan",function(t,e){i[Ee](s[Be](n(),{dx:t,dy:e}))}),a.off("zoom").on("zoom",function(t,e,r){if(i[Ee](s[Be](n(),{zoom:t,originX:e,originY:r})),this._updateGroup){var a=this.group,o=a.scale;a[we](function(t){"text"===t.type&&t.attr("scale",[1/o[0],1/o[1]])})}},this),a.rectProvider=function(){return r.getViewRectAfterRoam()}}},r}),e("echarts/component/helper/listComponent",[ci,"../../util/layout",Y,I],function(t){function e(t,e,n){i.positionGroup(t,e.getBoxLayoutParams(),{width:n[Qe](),height:n[$e]()},e.get("padding"))}var i=t("../../util/layout"),n=t(Y),r=t(I);return{layout:function(t,n,r){var a=i.getLayoutRect(n.getBoxLayoutParams(),{width:r[Qe](),height:r[$e]()},n.get("padding"));i.box(n.get("orient"),t,n.get("itemGap"),a.width,a[We]),e(t,n,r)},addBackground:function(t,e){var i=n.normalizeCssArray(e.get("padding")),a=t[oe](),o=e.getItemStyle(["color",ie]);o.fill=e.get("backgroundColor");var s=new r.Rect({shape:{x:a.x-i[3],y:a.y-i[0],width:a.width+i[1]+i[3],height:a[We]+i[0]+i[2]},style:o,silent:!0,z2:-1});
r.subPixelOptimizeRect(s),t.add(s)}}}),e("echarts/util/symbol",[ci,"./graphic",p],function(t){var e=t("./graphic"),i=t(p),a=e.extendShape({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var i=e.cx,n=e.cy,a=e.width/2,o=e[We]/2;t[r](i,n-o),t.lineTo(i+a,n+o),t.lineTo(i-a,n+o),t.closePath()}}),o=e.extendShape({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var i=e.cx,n=e.cy,a=e.width/2,o=e[We]/2;t[r](i,n-o),t.lineTo(i+a,n),t.lineTo(i,n+o),t.lineTo(i-a,n),t.closePath()}}),s=e.extendShape({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var i=e.x,n=e.y,r=e.width/5*3,a=Math.max(r,e[We]),o=r/2,s=o*o/(a-o),l=n-a+o+s,c=Math.asin(s/o),u=Math.cos(c)*o,h=Math.sin(c),f=Math.cos(c);t.arc(i,l,o,Math.PI-c,2*Math.PI+c);var d=.6*o,p=.7*o;t.bezierCurveTo(i+u-h*d,l+s+f*d,i,n-p,i,n),t.bezierCurveTo(i,n-p,i-u+h*d,l+s+f*d,i-u,l+s),t.closePath()}}),l=e.extendShape({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var i=e[We],n=e.width,a=e.x,o=e.y,s=n/3*2;t[r](a,o),t.lineTo(a+s,o+i),t.lineTo(a,o+i/4*3),t.lineTo(a-s,o+i),t.lineTo(a,o),t.closePath()}}),c={line:e.Line,rect:e.Rect,roundRect:e.Rect,square:e.Rect,circle:e.Circle,diamond:o,pin:s,arrow:l,triangle:a},u={line:function(t,e,i,n,r){r.x1=t,r.y1=e+n/2,r.x2=t+i,r.y2=e+n/2},rect:function(t,e,i,n,r){r.x=t,r.y=e,r.width=i,r[We]=n},roundRect:function(t,e,i,n,r){r.x=t,r.y=e,r.width=i,r[We]=n,r.r=Math.min(i,n)/4},square:function(t,e,i,n,r){var a=Math.min(i,n);r.x=t,r.y=e,r.width=a,r[We]=a},circle:function(t,e,i,n,r){r.cx=t+i/2,r.cy=e+n/2,r.r=Math.min(i,n)/2},diamond:function(t,e,i,n,r){r.cx=t+i/2,r.cy=e+n/2,r.width=i,r[We]=n},pin:function(t,e,i,n,r){r.x=t+i/2,r.y=e+n/2,r.width=i,r[We]=n},arrow:function(t,e,i,n,r){r.x=t+i/2,r.y=e+n/2,r.width=i,r[We]=n},triangle:function(t,e,i,n,r){r.cx=t+i/2,r.cy=e+n/2,r.width=i,r[We]=n}},f={};for(var d in c)f[d]=new c[d];var m=e.extendShape({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},beforeBrush:function(){var t=this.style,e=this.shape;"pin"===e.symbolType&&"inside"===t.textPosition&&(t.textPosition=["50%","40%"],t[ce]=re,t.textVerticalAlign=ae)},buildPath:function(t,e,i){var r=e.symbolType,a=f[r];"none"!==e.symbolType&&(a||(r="rect",a=f[r]),u[r](e.x,e.y,e.width,e[We],a.shape),a[n](t,a.shape,i))}}),v=function(t){if("image"!==this.type){var e=this.style,i=this.shape;i&&"line"===i.symbolType?e[h]=t:this.__isEmptyBrush?(e[h]=t,e.fill="#fff"):(e.fill&&(e.fill=t),e[h]&&(e[h]=t)),this.dirty(!1)}},g={createSymbol:function(t,n,r,a,o,s){var l=0===t[pe]("empty");l&&(t=t.substr(5,1)[ni]()+t.substr(6));var c;return c=0===t[pe]("image://")?new e.Image({style:{image:t.slice(8),x:n,y:r,width:a,height:o}}):0===t[pe]("path://")?e.makePath(t.slice(7),{},new i(n,r,a,o)):new m({shape:{symbolType:t,x:n,y:r,width:a,height:o}}),c.__isEmptyBrush=l,c.setColor=v,c.setColor(s),c}};return g}),e("echarts/chart/helper/SymbolDraw",[ci,I,"./Symbol"],function(t){function e(t){this.group=new n.Group,this._symbolCtor=t||r}function i(t,e,i){var n=t[k](e);return!(!n||isNaN(n[0])||isNaN(n[1])||i&&i(e)||"none"===t[C](e,"symbol"))}var n=t(I),r=t("./Symbol"),a=e[ii];return a.updateData=function(t,e){var r=this.group,a=t.hostModel,o=this._data,s=this._symbolCtor,l={itemStyle:a[Je]("itemStyle.normal").getItemStyle(["color"]),hoverItemStyle:a[Je]("itemStyle.emphasis").getItemStyle(),symbolRotate:a.get("symbolRotate"),symbolOffset:a.get("symbolOffset"),hoverAnimation:a.get("hoverAnimation"),labelModel:a[Je]("label.normal"),hoverLabelModel:a[Je]("label.emphasis")};t.diff(o).add(function(n){var a=t[k](n);if(i(t,n,e)){var o=new s(t,n,l);o.attr(ne,a),t.setItemGraphicEl(n,o),r.add(o)}})[He](function(c,u){var h=o[L](u),f=t[k](c);return i(t,c,e)?(h?(h.updateData(t,c,l),n[P](h,{position:f},a)):(h=new s(t,c),h.attr(ne,f)),r.add(h),void t.setItemGraphicEl(c,h)):void r[Ne](h)})[Ne](function(t){var e=o[L](t);e&&e.fadeOut(function(){r[Ne](e)})}).execute(),this._data=t},a[Ve]=function(){var t=this._data;t&&t[A](function(e,i){var n=t[k](i);e.attr(ne,n)})},a[Ne]=function(t){var e=this.group,i=this._data;i&&(t?i[A](function(t){t.fadeOut(function(){e[Ne](t)})}):e[fe]())},e}),e("echarts/component/marker/markerHelper",[ci,li,b],function(t){function e(t){return!(isNaN(parseFloat(t.x))&&isNaN(parseFloat(t.y)))}function i(t){return!isNaN(parseFloat(t.x))&&!isNaN(parseFloat(t.y))}function n(t,e,i){var n=-1;do n=Math.max(o.getPrecision(t.get(e,i)),n),t=t.stackedOn;while(t);return n}function r(t,e,i,r,a,o){var s=[],l=p(e,r,t),c=e.indexOfNearest(r,l,!0);s[a]=e.get(i,c,!0),s[o]=e.get(r,c,!0);var u=n(e,r,c);return u>=0&&(s[o]=+s[o].toFixed(u)),s}var a=t(li),o=t(b),s=a[pe],l=a.curry,c={min:l(r,"min"),max:l(r,"max"),average:l(r,"average")},u=function(t,e){var n=t[si](),r=t[he];if(e&&!i(e)&&!a[ye](e.coord)&&r){var o=r[R],l=h(e,n,r,t);if(e=a.clone(e),e.type&&c[e.type]&&l.baseAxis&&l.valueAxis){var u=s(o,l.baseAxis.dim),f=s(o,l.valueAxis.dim);e.coord=c[e.type](n,l.baseDataDim,l.valueDataDim,u,f),e.value=e.coord[f]}else{for(var d=[null!=e.xAxis?e.xAxis:e.radiusAxis,null!=e.yAxis?e.yAxis:e.angleAxis],m=0;2>m;m++)if(c[d[m]]){var v=t.coordDimToDataDim(o[m])[0];d[m]=p(n,v,d[m])}e.coord=d}}return e},h=function(t,e,i,n){var r={};return null!=t.valueIndex||null!=t.valueDim?(r.valueDataDim=null!=t.valueIndex?e.getDimension(t.valueIndex):t.valueDim,r.valueAxis=i[G](n.dataDimToCoordDim(r.valueDataDim)),r.baseAxis=i.getOtherAxis(r.valueAxis),r.baseDataDim=n.coordDimToDataDim(r.baseAxis.dim)[0]):(r.baseAxis=n.getBaseAxis(),r.valueAxis=i.getOtherAxis(r.baseAxis),r.baseDataDim=n.coordDimToDataDim(r.baseAxis.dim)[0],r.valueDataDim=n.coordDimToDataDim(r.valueAxis.dim)[0]),r},f=function(t,i){return t&&t.containData&&i.coord&&!e(i)?t.containData(i.coord):!0},d=function(t,e,i,n){return 2>n?t.coord&&t.coord[n]:t.value},p=function(t,e,i){if("average"===i){var n=0,r=0;return t.each(e,function(t){isNaN(t)||(n+=t,r++)},!0),n/r}return t[B](e,!0)["max"===i?1:0]};return{dataTransform:u,dataFilter:f,dimValueGetter:d,getAxisInfo:h,numCalculate:p}}),e("echarts/component/marker/MarkerView",[ci,D],function(t){return t(D).extendComponentView({type:"marker",init:function(){this.markerGroupMap={}},render:function(t,e,i){var n=this.markerGroupMap;for(var r in n)n[r].__keep=!1;var a=this.type+"Model";e[Fe](function(t){var n=t[a];n&&this.renderSeries(t,n,e,i)},this);for(var r in n)n[r].__keep||this.group[Ne](n[r].group)},renderSeries:function(){}})}),e("echarts/chart/helper/LineDraw",[ci,I,"./Line"],function(t){function e(t){return isNaN(t[0])||isNaN(t[1])}function i(t){return!e(t[0])&&!e(t[1])}function n(t){this._ctor=t||a,this.group=new r.Group}var r=t(I),a=t("./Line"),o=n[ii];return o.updateData=function(t){var e=this._lineData,n=this.group,r=this._ctor,a=t.hostModel,o={lineStyle:a[Je]("lineStyle.normal")[y](),hoverLineStyle:a[Je]("lineStyle.emphasis")[y](),labelModel:a[Je]("label.normal"),hoverLabelModel:a[Je]("label.emphasis")};t.diff(e).add(function(e){if(i(t[k](e))){var a=new r(t,e,o);t.setItemGraphicEl(e,a),n.add(a)}})[He](function(a,s){var l=e[L](s);return i(t[k](a))?(l?l.updateData(t,a,o):l=new r(t,a,o),t.setItemGraphicEl(a,l),void n.add(l)):void n[Ne](l)})[Ne](function(t){n[Ne](e[L](t))}).execute(),this._lineData=t},o[Ve]=function(){var t=this._lineData;t[A](function(e,i){e[Ve](t,i)},this)},o[Ne]=function(){this.group[fe]()},n}),e("echarts/component/timeline/TimelineModel",[ci,o,j,li,g],function(t){var e=t(o),i=t(j),n=t(li),r=t(g),a=e[Be]({type:"timeline",layoutMode:"box",defaultOption:{zlevel:0,z:4,show:!0,axisType:"time",realtime:!0,left:"20%",top:null,right:"20%",bottom:0,width:null,height:40,padding:5,controlPosition:"left",autoPlay:!1,rewind:!1,loop:!0,playInterval:2e3,currentIndex:0,itemStyle:{normal:{},emphasis:{}},label:{normal:{textStyle:{color:"#000"}},emphasis:{}},data:[]},init:function(t,e,i){this._data,this._names,this.mergeDefaultAndTheme(t,i),this._initData()},mergeOption:function(){a.superApply(this,W,arguments),this._initData()},setCurrentIndex:function(t){null==t&&(t=this[U].currentIndex);var e=this._data.count();this[U].loop?t=(t%e+e)%e:(t>=e&&(t=e-1),0>t&&(t=0)),this[U].currentIndex=t},getCurrentIndex:function(){return this[U].currentIndex},isIndexMax:function(){return this.getCurrentIndex()>=this._data.count()-1},setPlayState:function(t){this[U].autoPlay=!!t},getPlayState:function(){return!!this[U].autoPlay},_initData:function(){var t=this[U],e=t.data||[],a=t.axisType,o=this._names=[];if(a===V){var s=[];n.each(e,function(t,e){var i,a=r.getDataItemValue(t);n[Ge](t)?(i=n.clone(t),i.value=e):i=e,s.push(i),n.isString(a)||null!=a&&!isNaN(a)||(a=""),o.push(a+"")}),e=s}var l={category:"ordinal",time:"time"}[a]||ve,c=this._data=new i([{name:"value",type:l}],this);c[Z](e,o)},getData:function(){return this._data},getCategories:function(){return this.get("axisType")===V?this._names.slice():void 0}});return a}),e("echarts/component/tooltip/TooltipContent",[ci,li,"zrender/tool/color","zrender/core/event",Y,oi],function(t){function e(t){var e="cubic-bezier(0.23, 1, 0.32, 1)",i="left "+t+"s "+e+",top "+t+"s "+e;return o.map(d,function(t){return t+"transition:"+i}).join(";")}function i(t){var e=[],i=t.get("fontSize"),n=t[se]();return n&&e.push("color:"+n),e.push("font:"+t[le]()),i&&e.push("line-height:"+Math.round(3*i/2)+"px"),u(["decoration","align"],function(i){var n=t.get(i);n&&e.push("text-"+i+":"+n)}),e.join(";")}function n(t){t=t;var n=[],r=t.get("transitionDuration"),a=t.get("backgroundColor"),o=t[Je](ue),l=t.get("padding");return r&&n.push(e(r)),a&&(f[je]?n.push("background-Color:"+a):(n.push("background-Color:#"+s.toHex(a)),n.push("filter:alpha(opacity=70)"))),u(["width","color",v],function(e){var i="border-"+e,r=h(i),a=t.get(r);null!=a&&n.push(i+":"+a+("color"===e?"":"px"))}),n.push(i(o)),null!=l&&n.push("padding:"+c.normalizeCssArray(l).join("px ")+"px"),n.join(";")+";"}function r(t,e){var i=document[J]("div"),n=e.getZr();this.el=i,this._x=e[Qe]()/2,this._y=e[$e]()/2,t.appendChild(i),this._container=t,this._show=!1,this._hideTimeout;var r=this;i.onmouseenter=function(){r.enterable&&(clearTimeout(r._hideTimeout),r._show=!0),r._inContent=!0},i.onmousemove=function(e){if(!r.enterable){var i=n.handler;l.normalizeEvent(t,e),i.dispatch(Ae,e)}},i.onmouseleave=function(){r.enterable&&r._show&&r.hideLater(r._hideDelay),r._inContent=!1},a(i,t)}function a(t,e){function i(t){n(t[Ce])&&t.preventDefault()}function n(i){for(;i&&i!==e;){if(i===t)return!0;i=i.parentNode}}l.addEventListener(e,"touchstart",i),l.addEventListener(e,"touchmove",i),l.addEventListener(e,"touchend",i)}var o=t(li),s=t("zrender/tool/color"),l=t("zrender/core/event"),c=t(Y),u=o.each,h=c.toCamelCase,f=t(oi),d=["","-webkit-","-moz-","-o-"],p="position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";return r[ii]={constructor:r,enterable:!0,update:function(){var t=this._container,e=t.currentStyle||document.defaultView.getComputedStyle(t),i=t.style;"absolute"!==i[ne]&&"absolute"!==e[ne]&&(i[ne]="relative")},show:function(t){clearTimeout(this._hideTimeout);var e=this.el;e.style.cssText=p+n(t)+";left:"+this._x+"px;top:"+this._y+"px;"+(t.get("extraCssText")||""),e.style.display=e.innerHTML?"block":"none",this._show=!0},setContent:function(t){var e=this.el;e.innerHTML=t,e.style.display=t?"block":"none"},moveTo:function(t,e){var i=this.el.style;i.left=t+"px",i.top=e+"px",this._x=t,this._y=e},hide:function(){this.el.style.display="none",this._show=!1},hideLater:function(t){!this._show||this._inContent&&this.enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(o.bind(this.hide,this),t)):this.hide())},isShow:function(){return this._show}},r}),e("echarts/component/axis/RadiusAxisView",[ci,li,I,"./AxisBuilder",D],function(t){function e(t,e,i){return{position:[t.cx,t.cy],rotation:i/180*Math.PI,labelDirection:-1,tickDirection:-1,nameDirection:1,labelRotation:e[Je]("axisLabel").get("rotate"),z2:1}}var i=t(li),n=t(I),r=t("./AxisBuilder"),a=["axisLine","axisLabel","axisTick","axisName"],o=["splitLine","splitArea"];t(D).extendComponentView({type:"radiusAxis",render:function(t,n){if(this.group[fe](),t.get("show")){var s=n.getComponent("polar",t.get("polarIndex")),l=s[he].getAngleAxis(),c=t.axis,u=s[he],h=c.getTicksCoords(),f=l[K]()[0],d=c[K](),p=e(u,t,f),m=new r(t,p);i.each(a,m.add,m),this.group.add(m.getGroup()),i.each(o,function(e){t.get(e+".show")&&this["_"+e](t,u,f,d,h)},this)}},_splitLine:function(t,e,r,a,o){var s=t[Je]("splitLine"),l=s[Je]("lineStyle"),c=l.get("color"),u=0;c=c instanceof Array?c:[c];for(var h=[],f=0;f<o[Re];f++){var d=u++%c[Re];h[d]=h[d]||[],h[d].push(new n.Circle({shape:{cx:e.cx,cy:e.cy,r:o[f]},silent:!0}))}for(var f=0;f<h[Re];f++)this.group.add(n.mergePath(h[f],{style:i[Oe]({stroke:c[f%c[Re]],fill:null},l[y]()),silent:!0}))},_splitArea:function(t,e,r,a,o){var s=t[Je]("splitArea"),l=s[Je]("areaStyle"),c=l.get("color"),u=0;c=c instanceof Array?c:[c];for(var h=[],f=o[0],d=1;d<o[Re];d++){var p=u++%c[Re];h[p]=h[p]||[],h[p].push(new n.Sector({shape:{cx:e.cx,cy:e.cy,r0:f,r:o[d],startAngle:0,endAngle:2*Math.PI},silent:!0})),f=o[d]}for(var d=0;d<h[Re];d++)this.group.add(n.mergePath(h[d],{style:i[Oe]({fill:c[d%c[Re]]},l.getAreaStyle()),silent:!0}))}})}),e("echarts/chart/helper/Symbol",[ci,li,"../../util/symbol",I,b],function(t){function e(t){return t instanceof Array||(t=[+t,+t]),t}function i(t,e,i){o.Group.call(this),this.updateData(t,e,i)}function n(t,e){this[l].drift(t,e)}var r=t(li),a=t("../../util/symbol"),o=t(I),s=t(b),c=i[ii];c._createSymbol=function(t,i,r){this[fe]();var s=i.hostModel,l=i[C](r,"color"),c=a.createSymbol(t,-.5,-.5,1,1,l);c.attr({z2:100,culling:!0,scale:[0,0]}),c.drift=n;var u=e(i[C](r,"symbolSize"));o.initProps(c,{scale:u},s,r),this._symbolType=t,this.add(c)},c.stopSymbolAnimation=function(t){this.childAt(0).stopAnimation(t)},c.getSymbolPath=function(){return this.childAt(0)},c.getScale=function(){return this.childAt(0).scale},c.highlight=function(){this.childAt(0)[Ie](T)},c.downplay=function(){this.childAt(0)[Ie](z)},c.setZ=function(t,e){var i=this.childAt(0);i[_e]=t,i.z=e},c.setDraggable=function(t){var e=this.childAt(0);e.draggable=t,e.cursor=t?"move":"pointer"},c.updateData=function(t,i,n){this[ke]=!1;var r=t[C](i,"symbol")||"circle",a=t.hostModel,s=e(t[C](i,"symbolSize"));if(r!==this._symbolType)this._createSymbol(r,t,i);else{var l=this.childAt(0);o[P](l,{scale:s},a,i)}this._updateCommon(t,i,s,n),this._seriesModel=a};var h=["itemStyle",z],f=["itemStyle",T],d=["label",z],p=["label",T];return c._updateCommon=function(t,i,n,a){var l=this.childAt(0),c=t.hostModel,m=t[C](i,"color");"image"!==l.type&&l.useStyle({strokeNoScale:!0}),a=a||null;var v=a&&a.itemStyle,g=a&&a.hoverItemStyle,y=a&&a.symbolRotate,_=a&&a.symbolOffset,b=a&&a.labelModel,w=a&&a.hoverLabelModel,A=a&&a.hoverAnimation;if(!a||t.hasItemOption){var L=t[q](i);v=L[Je](h).getItemStyle(["color"]),g=L[Je](f).getItemStyle(),y=L[u]("symbolRotate"),_=L[u]("symbolOffset"),b=L[Je](d),w=L[Je](p),A=L[u]("hoverAnimation")}else g=r[Be]({},g);var P=l.style;l[x]=(y||0)*Math.PI/180||0,_&&l.attr(ne,[s[M](_[0],n[0]),s[M](_[1],n[1])]),l.setColor(m),l[be](v);var k=t[C](i,ie);null!=k&&(P[ie]=k);for(var D,I,B=t[R].slice();B[Re]&&(D=B.pop(),I=t.getDimensionInfo(D).type,I===E||"time"===I););null!=D&&b[u]("show")?(o.setText(P,b,m),P.text=r[O](c.getFormattedLabel(i,z),t.get(D,i))):P.text="",null!=D&&w[u]("show")?(o.setText(g,w,m),g.text=r[O](c.getFormattedLabel(i,T),t.get(D,i))):g.text="";var N=e(t[C](i,"symbolSize"));if(l.off(Pe).off(Le).off(T).off(z),l.hoverStyle=g,o[S](l),A&&c.ifEnableAnimation()){var G=function(){var t=N[1]/N[0];this.animateTo({scale:[Math.max(1.1*N[0],N[0]+3),Math.max(1.1*N[1],N[1]+3*t)]},400,"elasticOut")},V=function(){this.animateTo({scale:N},400,"elasticOut")};l.on(Pe,G).on(Le,V).on(T,G).on(z,V)}},c.fadeOut=function(t){var e=this.childAt(0);this[ke]=!0,e.style.text="",o[P](e,{scale:[0,0]},this._seriesModel,this[Te],t)},r[de](i,o.Group),i}),e("echarts/component/axis/AxisBuilder",[ci,li,Y,I,"../../model/Model",b,ri],function(t){function e(t){var e={componentType:t[m]};return e[t[m]+"Index"]=t[N],e}function i(t,e,i){var n,r,a=p(e-t[x]);return v(a)?(r=i>0?"top":Ze,n=re):v(a-S)?(r=i>0?Ze:"top",n=re):(r=ae,n=a>0&&S>a?i>0?"right":"left":i>0?"left":"right"),{rotation:a,textAlign:n,verticalAlign:r}}function n(t,e,i,n){var r,a,o=p(i-t[x]),s=n[0]>n[1],l="start"===e&&!s||"start"!==e&&s;return v(o-S/2)?(a=l?Ze:"top",r=re):v(o-1.5*S)?(a=l?"top":Ze,r=re):(a=ae,r=1.5*S>o&&o>S/2?l?"left":"right":l?"right":"left"),{rotation:o,textAlign:r,verticalAlign:a}}function r(t){var e=t.get("tooltip");return t.get(ke)||!(t.get("triggerEvent")||e&&e.show)}var o=t(li),l=t(Y),u=t(I),h=t("../../model/Model"),f=t(b),p=f.remRadian,v=f.isRadianAroundZero,g=t(ri),_=g[d],M=o[O],S=Math.PI,T=function(t,e){this.opt=e,this.axisModel=t,o[Oe](e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0}),this.group=new u.Group;var i=new u.Group({position:e[ne].slice(),rotation:e[x]});i.updateTransform(),this._transform=i[a],this._dumbGroup=i};T[ii]={constructor:T,hasBuilder:function(t){return!!C[t]},add:function(t){C[t].call(this)},getGroup:function(){return this.group}};var C={axisLine:function(){var t=this.opt,e=this.axisModel;if(e.get("axisLine.show")){var i=this.axisModel.axis[K](),n=this._transform,r=[i[0],0],a=[i[1],0];n&&(_(r,r,n),_(a,a,n)),this.group.add(new u.Line(u.subPixelOptimizeLine({anid:"line",shape:{x1:r[0],y1:r[1],x2:a[0],y2:a[1]},style:o[Be]({lineCap:"round"},e[Je]("axisLine.lineStyle")[y]()),strokeContainThreshold:t.strokeContainThreshold||5,silent:!0,z2:1})))}},axisTick:function(){var t=this.axisModel;if(t.get("axisTick.show"))for(var e=t.axis,i=t[Je]("axisTick"),n=this.opt,r=i[Je]("lineStyle"),a=i.get(Re),s=L(i,n.labelInterval),l=e.getTicksCoords(i.get("alignWithLabel")),c=e.scale[te](),h=[],f=[],d=this._transform,p=0;p<l[Re];p++)if(!A(e,p,s)){var m=l[p];h[0]=m,h[1]=0,f[0]=m,f[1]=n.tickDirection*a,d&&(_(h,h,d),_(f,f,d)),this.group.add(new u.Line(u.subPixelOptimizeLine({anid:"tick_"+c[p],shape:{x1:h[0],y1:h[1],x2:f[0],y2:f[1]},style:o[Oe](r[y](),{stroke:t.get("axisLine.lineStyle.color")}),z2:2,silent:!0})))}},axisLabel:function(){function t(t,e){var i=t&&t[oe]().clone(),n=e&&e[oe]().clone();return i&&n?(i[d](t[c]()),n[d](e[c]()),i.intersect(n)):void 0}var n=this.opt,a=this.axisModel,o=M(n.axisLabelShow,a.get("axisLabel.show"));if(o){var l=a.axis,f=a[Je]("axisLabel"),p=f[Je](ue),m=f.get("margin"),v=l.scale[te](),g=a.getFormattedLabels(),y=M(n.labelRotation,f.get("rotate"))||0;y=y*S/180;for(var _=i(n,y,n.labelDirection),b=a.get("data"),T=[],C=r(a),L=a.get("triggerEvent"),P=0;P<v[Re];P++)if(!A(l,P,n.labelInterval)){var k=p;b&&b[P]&&b[P][ue]&&(k=new h(b[P][ue],p,a[s]));var z=k[se]()||a.get("axisLine.lineStyle.color"),D=l[w](v[P]),I=[D,n.labelOffset+n.labelDirection*m],R=l.scale.getLabel(v[P]),O=new u.Text({anid:"label_"+v[P],style:{text:g[P],textAlign:k.get("align",!0)||_[ce],textVerticalAlign:k.get("baseline",!0)||_.verticalAlign,textFont:k[le](),fill:typeof z===ge?z(R):z},position:I,rotation:_[x],silent:C,z2:10});L&&(O.eventData=e(a),O.eventData.targetType="axisLabel",O.eventData.value=R),this._dumbGroup.add(O),O.updateTransform(),T.push(O),this.group.add(O),O.decomposeTransform()}if(l.type!==V){if(a.getMin?a.getMin():a.get("min")){var E=T[0],B=T[1];t(E,B)&&(E[Ue]=!0)}if(a.getMax?a.getMax():a.get("max")){var N=T[T[Re]-1],G=T[T[Re]-2];t(G,N)&&(N[Ue]=!0)}}}},axisName:function(){var t=this.opt,a=this.axisModel,s=M(t.axisName,a.get("name"));if(s){var c,h=a.get("nameLocation"),f=t.nameDirection,d=a[Je]("nameTextStyle"),p=a.get("nameGap")||0,v=this.axisModel.axis[K](),g=v[0]>v[1]?-1:1,y=["start"===h?v[0]-g*p:"end"===h?v[1]+g*p:(v[0]+v[1])/2,h===ae?t.labelOffset+f*p:0],_=a.get("nameRotate");null!=_&&(_=_*S/180);var b;h===ae?c=i(t,null!=_?_:t[x],f):(c=n(t,h,_||0,v),b=t.axisNameAvailableWidth,null!=b&&(b=Math.abs(b/Math.sin(c[x])),!isFinite(b)&&(b=null)));var w=d[le](),T=a.get("nameTruncate",!0)||{},C=T.ellipsis,A=M(T.maxWidth,b),L=null!=C&&null!=A?l.truncateText(s,A,w,C,{minChar:2,placeholder:T.placeholder}):s,P=a.get("tooltip",!0),k=a[m],z={componentType:k,name:s,$vars:["name"]};z[k+"Index"]=a[N];var D=new u.Text({anid:"name",__fullText:s,__truncatedText:L,style:{text:L,textFont:w,fill:d[se]()||a.get("axisLine.lineStyle.color"),textAlign:c[ce],textVerticalAlign:c.verticalAlign},position:y,rotation:c[x],silent:r(a),z2:1,tooltip:P&&P.show?o[Be]({content:s,formatter:function(){return s},formatterParams:z},P):null});a.get("triggerEvent")&&(D.eventData=e(a),D.eventData.targetType="axisName",D.eventData.name=s),this._dumbGroup.add(D),D.updateTransform(),this.group.add(D),D.decomposeTransform()}}},A=T.ifIgnoreOnTick=function(t,e,i){var n,r=t.scale;return r.type===E&&(typeof i===ge?(n=r[te]()[e],!i(n,r.getLabel(n))):e%(i+1))},L=T.getInterval=function(t,e){var i=t.get("interval");return(null==i||"auto"==i)&&(i=e),i};return T}),e("echarts/chart/helper/Line",[ci,"../../util/symbol",ri,"./LinePath",I,li,b],function(t){function e(t){return"_"+t+"Type"}function n(t,e,i){var n=e[C](i,"color"),r=e[C](i,t),a=e[C](i,t+"Size");if(r&&"none"!==r){p[ye](a)||(a=[a,a]);var o=c.createSymbol(r,-a[0]/2,-a[1]/2,a[0],a[1],n);return o.name=t,o}}function r(t){var e=new f({name:"line"});return a(e.shape,t),e}function a(t,e){var i=e[0],n=e[1],r=e[2];t.x1=i[0],t.y1=i[1],t.x2=n[0],t.y2=n[1],t.percent=1,r?(t.cpx1=r[0],t.cpy1=r[1]):(t.cpx1=0/0,t.cpy1=0/0)}function o(){var t=this,e=t.childOfName("fromSymbol"),n=t.childOfName("toSymbol"),r=t.childOfName("label");if(e||n||!r[Ue]){for(var a=1,o=this[l];o;)o.scale&&(a/=o.scale[0]),o=o[l];var s=t.childOfName("line");if(this[i]||s[i]){var c=s.shape.percent,u=s.pointAt(0),f=s.pointAt(c),d=h.sub([],f,u);if(h.normalize(d,d),e){e.attr(ne,u);var p=s.tangentAt(0);e.attr(x,Math.PI/2-Math.atan2(p[1],p[0])),e.attr("scale",[a*c,a*c])}if(n){n.attr(ne,f);var p=s.tangentAt(1);n.attr(x,-Math.PI/2-Math.atan2(p[1],p[0])),n.attr("scale",[a*c,a*c])}if(!r[Ue]){r.attr(ne,f);var m,v,g,y=5*a;if("end"===r.__position)m=[d[0]*y+f[0],d[1]*y+f[1]],v=d[0]>.8?"left":d[0]<-.8?"right":re,g=d[1]>.8?"top":d[1]<-.8?Ze:ae;else if(r.__position===ae){var _=c/2,p=s.tangentAt(_),b=[p[1],-p[0]],w=s.pointAt(_);b[1]>0&&(b[0]=-b[0],b[1]=-b[1]),m=[w[0]+b[0]*y,w[1]+b[1]*y],v=re,g=Ze;var M=-Math.atan2(p[1],p[0]);f[0]<u[0]&&(M=Math.PI+M),r.attr(x,M)}else m=[-d[0]*y+u[0],-d[1]*y+u[1]],v=d[0]>.8?"right":d[0]<-.8?"left":re,g=d[1]>.8?Ze:d[1]<-.8?"top":ae;r.attr({style:{textVerticalAlign:r.__verticalAlign||g,textAlign:r.__textAlign||v},position:m,scale:[a,a]})}}}}function s(t,e,i){d.Group.call(this),this._createLine(t,e,i)}var c=t("../../util/symbol"),h=t(ri),f=t("./LinePath"),d=t(I),p=t(li),m=t(b),v=["fromSymbol","toSymbol"],g=s[ii];return g.beforeUpdate=o,g._createLine=function(t,i,a){var o=t.hostModel,s=t[k](i),l=r(s);l.shape.percent=0,d.initProps(l,{shape:{percent:1}},o,i),this.add(l);var c=new d.Text({name:"label"});this.add(c),p.each(v,function(r){var a=n(r,t,i);this.add(a),this[e(r)]=t[C](i,r)},this),this._updateCommonStl(t,i,a)},g.updateData=function(t,i,r){var o=t.hostModel,s=this.childOfName("line"),l=t[k](i),c={shape:{}};a(c.shape,l),d[P](s,c,o,i),p.each(v,function(r){var a=t[C](i,r),o=e(r);if(this[o]!==a){this[Ne](this.childOfName(r));var s=n(r,t,i);this.add(s)}this[o]=a},this),this._updateCommonStl(t,i,r)},g._updateCommonStl=function(t,e,i){var n=t.hostModel,r=this.childOfName("line"),a=i&&i.lineStyle,o=i&&i.hoverLineStyle,s=i&&i.labelModel,l=i&&i.hoverLabelModel;if(!i||t.hasItemOption){var c=t[q](e);a=c[Je]("lineStyle.normal")[y](),o=c[Je]("lineStyle.emphasis")[y](),s=c[Je]("label.normal"),l=c[Je]("label.emphasis")}var h=t[C](e,"color"),f=p[O](t[C](e,ie),a[ie],1);isNaN(g)&&(g=t[F](e)),r.useStyle(p[Oe]({strokeNoScale:!0,fill:"none",stroke:h,opacity:f},a)),r.hoverStyle=o,p.each(v,function(t){var e=this.childOfName(t);e&&(e.setColor(h),e[be]({opacity:f}))},this);var g,x,_=s[u]("show"),b=l[u]("show"),w=this.childOfName("label");if((_||b)&&(g=m.round(n[H](e)),x=h||"#000"),_){var M=s[Je](ue);w[be]({text:p[O](n.getFormattedLabel(e,z,t.dataType),g),textFont:M[le](),fill:M[se]()||x}),w.__textAlign=M.get("align"),w.__verticalAlign=M.get("baseline"),w.__position=s.get(ne)}else w[be]("text","");if(b){var A=l[Je](ue);w.hoverStyle={text:p[O](n.getFormattedLabel(e,T,t.dataType),g),textFont:A[le](),fill:A[se]()||x}}else w.hoverStyle={text:""};w[Ue]=!_&&!b,d[S](this)},g[Ve]=function(t,e){this.setLinePoints(t[k](e))},g.setLinePoints=function(t){var e=this.childOfName("line");a(e.shape,t),e.dirty()},p[de](s,d.Group),s}),e("echarts/component/helper/RoamController",[ci,"zrender/mixin/Eventful",li,"zrender/core/event","./interactionMutex"],function(t){function e(t){if(!t[Ce]||!t[Ce].draggable){var e=t.offsetX,i=t.offsetY,n=this.rectProvider&&this.rectProvider();n&&n[ee](e,i)&&(this._x=e,this._y=i,this._dragging=!0)}}function i(t){if(this._dragging&&(u.stop(t.event),"pinch"!==t.gestureEvent)){if(h.isTaken(this._zr,"globalPan"))return;var e=t.offsetX,i=t.offsetY,n=e-this._x,r=i-this._y;this._x=e,this._y=i;var a=this[Ce];if(a){var o=a[ne];o[0]+=n,o[1]+=r,a.dirty()}u.stop(t.event),this[Ie]("pan",n,r)}}function n(){this._dragging=!1}function r(t){var e=t.wheelDelta>0?1.1:1/1.1;o.call(this,t,e,t.offsetX,t.offsetY)}function a(t){if(!h.isTaken(this._zr,"globalPan")){var e=t.pinchScale>1?1.1:1/1.1;o.call(this,t,e,t.pinchX,t.pinchY)}}function o(t,e,i,n){var r=this.rectProvider&&this.rectProvider();if(r&&r[ee](i,n)){u.stop(t.event);var a=this[Ce],o=this.zoomLimit;if(a){var s=a[ne],l=a.scale,c=this.zoom=this.zoom||1;if(c*=e,o){var h=o.min||0,f=o.max||1/0;c=Math.max(Math.min(f,c),h)}var d=c/this.zoom;this.zoom=c,s[0]-=(i-s[0])*(d-1),s[1]-=(n-s[1])*(d-1),l[0]*=d,l[1]*=d,a.dirty()}this[Ie]("zoom",e,i,n)}}function s(t,o,s){this[Ce]=o,this.rectProvider=s,this.zoomLimit,this.zoom,this._zr=t;var u=c.bind,h=u(e,this),f=u(i,this),d=u(n,this),p=u(r,this),m=u(a,this);l.call(this),this.enable=function(e){this.disable(),null==e&&(e=!0),(e===!0||"move"===e||"pan"===e)&&(t.on("mousedown",h),t.on(Ae,f),t.on("mouseup",d)),(e===!0||"scale"===e||"zoom"===e)&&(t.on("mousewheel",p),t.on("pinch",m))},this.disable=function(){t.off("mousedown",h),t.off(Ae,f),t.off("mouseup",d),t.off("mousewheel",p),t.off("pinch",m)},this.dispose=this.disable,this.isDragging=function(){return this._dragging},this.isPinching=function(){return this._pinching}}var l=t("zrender/mixin/Eventful"),c=t(li),u=t("zrender/core/event"),h=t("./interactionMutex");return c.mixin(s,l),s}),e("echarts/component/timeline/TimelineView",[ci,"../../view/Component"],function(t){var e=t("../../view/Component");return e[Be]({type:"timeline"})}),e("echarts/component/timeline/TimelineAxis",[ci,li,"../../coord/Axis","../../coord/axisHelper"],function(t){var e=t(li),i=t("../../coord/Axis"),n=t("../../coord/axisHelper"),r=function(t,e,n,r){i.call(this,t,e,n),this.type=r||"value",this._autoLabelInterval,this.model=null};return r[ii]={constructor:r,getLabelInterval:function(){var t=this.model,i=t[Je]("label.normal"),r=i.get("interval");if(null!=r&&"auto"!=r)return r;var r=this._autoLabelInterval;return r||(r=this._autoLabelInterval=n.getAxisLabelInterval(e.map(this.scale[te](),this[w],this),n.getFormattedLabels(this,i.get("formatter")),i[Je](ue)[le](),"horizontal"===t.get("orient"))),r},isLabelIgnored:function(t){if(this.type===V){var e=this.getLabelInterval();return typeof e===ge&&!e(t,this.scale.getLabel(t))||t%(e+1)}}},e[de](r,i),r}),e("echarts/chart/helper/LinePath",[ci,I,ri],function(t){function e(t){return isNaN(+t.cpx1)||isNaN(+t.cpy1)}var i=t(I),r=t(ri),a=i.Line[ii],o=i.BezierCurve[ii];return i.extendShape({type:"ec-line",style:{stroke:"#000",fill:null},shape:{x1:0,y1:0,x2:0,y2:0,percent:1,cpx1:null,cpy1:null},buildPath:function(t,i){(e(i)?a:o)[n](t,i)},pointAt:function(t){return e(this.shape)?a.pointAt.call(this,t):o.pointAt.call(this,t)},tangentAt:function(t){var i=this.shape,n=e(i)?[i.x2-i.x1,i.y2-i.y1]:o.tangentAt.call(this,t);return r.normalize(n,n)}})}),e("echarts/component/helper/interactionMutex",[ci,D],function(t){function e(t){return t[i]||(t[i]={})}var i="\x00_ec_interaction_mutex",n={take:function(t,i,n){var r=e(t);r[i]=n},release:function(t,i,n){var r=e(t),a=r[i];a===n&&(r[i]=null)},isTaken:function(t,i){return!!e(t)[i]}};return t(D).registerAction({type:"takeGlobalCursor",event:"globalCursorTaken",update:"update"},function(){}),n}),e("echarts/action/roamHelper",[ci],function(){var t={};return t.updateCenterAndZoom=function(t,e,i){var n=t.getZoom(),r=t.getCenter(),a=e.zoom,o=t[$](r);if(null!=e.dx&&null!=e.dy){o[0]-=e.dx,o[1]-=e.dy;var r=t.pointToData(o);t.setCenter(r)}if(null!=a){if(i){var s=i.min||0,l=i.max||1/0;a=Math.max(Math.min(n*a,l),s)/n}t.scale[0]*=a,t.scale[1]*=a;var c=t[ne],u=(e.originX-c[0])*(a-1),h=(e.originY-c[1])*(a-1);c[0]-=u,c[1]-=h,t.updateTransform();var r=t.pointToData(o);t.setCenter(r),t.setZoom(a*n)}return{center:t.getCenter(),zoom:t.getZoom()}},t}),e("zrender",["zrender/zrender"],function(t){return t}),e("echarts",["echarts/echarts"],function(t){return t});var ui=t("echarts");return ui.graphic=t("echarts/util/graphic"),ui.number=t("echarts/util/number"),ui.format=t("echarts/util/format"),t("echarts/chart/bar"),t("echarts/chart/pie"),t("echarts/chart/map"),t("echarts/component/grid"),t("echarts/component/polar"),t("echarts/component/geo"),t("echarts/component/title"),t("echarts/component/legend"),t("echarts/component/tooltip"),t("echarts/component/markPoint"),t("echarts/component/markLine"),t("echarts/component/markArea"),t("echarts/component/timeline"),t("zrender/vml/vml"),ui});
/*
* 调用方法示例
 // 创建搜索
 //html
 <!--搜索-->
 <div class="search">
 <search></search>
 </div>

 component.search({
    btnText : "文案"
 });
 new Vue({
 el: '.search'
 });

* */
define('component',[],function(header,nav){
    window.component = {
        //顶部位置组件
        location : function(info){
            //数据集合
            info = info || {};
            var data = {
                list : [
                    { text : "位置" }
                ]
            } 
            $.extend(data,info);
            // 定义组件
            var location = Vue.extend({
                template:
                    '<ul>'+
                        '<li v-for="val in list"><a class="{{val.class}}" href="{{val.href}}">{{val.text}}</a></li>'+
                    '</ul>',
                data: function(){
                    return data
                }
            })
            // 全局注册组件
            Vue.component('location', location);
        },
        //搜索框组件
        search : function(info,callback){
            //数据集合
            info = info || {};
            var data = {
                placeholder : "请输入关键字查询",
                btnText : "查询",
                btnClass : "btn-success"
            }
            //扩展查询
            if(info.select){
                $.extend(data,{
                    selectClass : "searchClass",
                    searchValClass : "hasSelect",
                    option : [
                        { text : "销售区域", placeholder : "请输入销售区域查询"},
                        { text : "入驻时间", placeholder : "请输入入驻时间查询" },
                        { text : "联系人", placeholder : "请输入联系人查询" },
                        { text : "手机号码", placeholder : "请输入手机号码查询" },
                        { text : "联系地址", placeholder : "请输入联系地址查询" }
                    ]
                });
            } 
            // 定义组件
            $.extend(data,info);
            var search = Vue.extend({
                template: 
                    '<template v-if="select">' +
                        '<div class="sod_select define">'+
                            '<div class="sod_label">{{optionDefault||"关键字"}}</div>'+ 
                            '<div class="sod_list">'+
                            '<ul>'+
                                '<li class="{{val.class}}" v-on:click="optionVal(val)" v-for="val in option">{{val.text}}</li>'+
                            '</ul>'+
                        '</div>'+
                    '</template>'+
                    '<input type="text" class="input searchVal mr10 {{searchValClass}}" v-on:keyup="keyup" placeholder="{{placeholder}}" value="{{val}}"/>' +
                    '<input type="button" v-on:click="submitSearch" class="btn {{btnClass}}" value="{{btnText}}"/>'+
                    '<i class="icon icon-clean" v-on:click="clean">&#xe607;</i>',
                data: function(){
                    return data 
                },
                methods:{
                    //提交搜索
                    submitSearch : function(){
                        var $val = $.trim($(".searchVal").val());
                        //搜索返回
                        callback["submitSearch"]($val,this);
                    },
                    //清楚输入框文字
                    clean : function(){
                        $(".searchVal").val("").focus();
                    },
                    //快速提交搜索
                    keyup : function(e){
                        if(e.keyCode==13){
                            //提交登录
                            this.submitSearch();
                        } 
                    },
                    //选项值
                    optionVal : function(val){ 
                        this.optionDefault = val.text;
                        this.selectActive = val;
                        this.placeholder = val.placeholder;
                        // for(var i=0;i<this.option.length;i++){
                        //     if(val==this.option[i].text){
                        //         this.placeholder = this.option[i].placeholder;
                        //         this.optionDefault = this.option[i].text;
                        //         return;
                        //     }
                        // }
                    }
                }
            })
            // 全局注册组件
            Vue.component('search', search);
        },
        //页面码组件
        page : function(info,callback){
            //数据集合
            var data = {
                prev : "上一页",
                pages : Tool.pageData(info),
                next : "下一页"
//                currentPage : 8,
//                currentSize : 2,
//                totalNum : 48,
//                totalPage : 12
            }
            $.extend(data,info);
            //当前为首页
            if(data.currentPage==1){
                data.prevClass = "disabled";
            }
            //当前为末页
            if(data.totalPage==data.currentPage){
                data.nextClass = "disabled";
            }
            // 定义组件
            var page = Vue.extend({
                template:
                    '<aside>显示1到{{totalNum}}的{{currentSize}}个条目</aside>'+
                    '<ul>'+
                        '<li class="prev {{prevClass}}" v-on:click="!prevClass&&changePage(currentPage-1)"><i class="icon">&#xe62e;</i>{{prev}}</li>'+
                        '<li v-for="page in pages" class="{{page.active}} {{page.omit}}" v-on:click="(!page.active&&!page.omit)&&changePage(page.num)">{{page.num}}</li>'+
                        '<li v-on:click="!nextClass&&changePage(currentPage+1)" class="next {{nextClass}}"><i class="icon">&#xe611;</i>{{next}}</li>'+
                    '</ul>', 
                data: function(){
                    return data 
                },
                methods:{
                    //改变页码
                    changePage : function(num){
                        if(num>0){
                            callback["changePage"](num-1);
                        }
                    },
                    //清楚输入框文字
                    clean : function(){
                        $(".searchVal").val("").focus();
                    }
                }
            })
            // 全局注册组件
            Vue.component('page', page);

        },
        //没有结果
        nothing : function(info){
            //数据集合
            info = info || {};
            var data = {
                searchVal : "",
                hints : [
                    { text : "请检查您的输入是否正确" },
                    { text : "请更换关键词重新搜索。" }
                ]
            }
            $.extend(data,info);
            // 定义组件
            var nothing = Vue.extend({
                template:
                    '<div v-if="!hide" class="box">'+
                        '<h4 v-if="searchVal" class="caption">很抱歉，没有找到与“<span class="warningColor">{{searchVal}}</span>”相关的内容。</h4>'+
                        '<h4 v-if="!searchVal" class="caption"><span class="warningColor">{{question||"很抱歉，没有相关的内容。"}}</span></h4>'+
                        '<dl>' +
                            '<dt>温馨提示：</dt>'+
                            '<dd v-for="info in hints">{{info.text}}</dd>'+
                        '</dl>'+
                    '</div>',
                data: function(){
                    return data
                },
                created : function(){
                    //延时展示
                    this.delayedShow&&this.show();
                }, 
                methods : {
                    //延时展示 
                    show : function(){
                        var self = this;  
                        var time = setTimeout(function(){
                            //删除正在加载中
                            Tool.removeLoadding([],info.removeLoadding);
                            self.hide = "";
                        },self.delayedTime||10000);
                    }
                }
            })
            // 全局注册组件
            Vue.component('nothing', nothing);
        },
        //重置密码
        resetPasswordModal : function(info){
            //数据集合
            info = info || {};
            var data = {
                show : "",
                hint : "<b>密码重置成功</b>新密码默认为123456",
                num : 5
            }
            $.extend(data,info);
            // 定义组件
            var resetPasswordModal = Vue.extend({
                template:
                    '<div class="modal modal-resetPassword hide {{show}}">'+
                        '<i class="bg"></i>'+
                        '<div class="center-box">'+
                            '<!--重置密码-->'+
                            '<div class="box reset-password">'+
                                '<i class="icon modal-close icon-close" v-on:click="hide" >&#xe607;</i>'+
                                '<!--提示-->'+
                                '<div class="reset-success">'+
                                    '<i class="icon icon-success">&#xe60a;</i>'+
                                    '<div class="hint">{{{hint}}}</div>'+
                                '</div>'+
                                '<div class="footer-modal">({{num}}秒后自动关闭此窗口)</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
                data: function(){
                    return data
                },
                created : function(){
                    var self = this;
                    //倒计时
                    var time = setInterval(function(){
                        if(!self.num){
                            self.show = "";
                            clearInterval(time);
                        }else{
                            self.num--;
                        }
                    },1000);
                    self.show = "show";
                },
                //事件
                methods : {
                    //添加角色
                    hide : function(){
                        this.show = "";
                    }
                }
            });
            // 全局注册组件
            Vue.component('resetpasswordmodal', resetPasswordModal);

        },
        //分类
        category : function(info,callback){
            //数据集合
            info = info || {};
            var data = {
                list : info.list||[
                    { text : "全部分类" ,active:"active"},
                    { text : "空气复原机"  ,active:""},
                    { text : "滤网"  ,active:""},
                    { text : "检测仪"  ,active:""}
                ]
            }
            $.extend(data,info);
            // 定义组件
            var category = Vue.extend({
                template:
                    '<ul>'+
                        '<li v-for="val in list" class="{{val.active}}" v-on:click="select($index,val)">{{val.text}}</li>'+
                    '</ul>',
                data: function(){
                    return data;
                },
                methods : {
                    //选中列表
                    select : function(index,val){
                        //取消选中
                        this.cancelActive();
                        this.list[index].active = "active";
                        //选中返回
                        if(callback){
                            callback["select"](val,this);
                        }
                    },
                    //取消选中
                    cancelActive : function(){
                        for(var i=0;i<this.list.length;i++){ 
                            this.list[i].active = "";
                        }
                    }
                }
            })
            // 全局注册组件
            Vue.component('category', category);
        },
        //加载数据中
        loaddinginfo : function(info){
            //数据集合
            info = info || {};
            var data = {
                img : '<img src="/images/public/loaddinginfo.gif"/>',
                text : "正在加载，请稍等..."
            }
            $.extend(data,info); 
            // 定义组件
            var loaddinginfo = Vue.extend({
                template:
                    '{{{img}}}<h5>{{text}}</h5>',
                data: function(){
                    return data;
                },
                methods : {
                    
                }
            })
            // 全局注册组件
            Vue.component('loaddinginfo', loaddinginfo);
        },
        //提示框
        alertbox  : function(info){
            //数据集合
            info = info || {};
            var data = {
                hint : "",
                statusShow : false,
                //状态
                status : {
                    show : false,
                    //错误
                    error : {
                        class : "warningColor",
                        icon : "&#xe612;"
                    },
                    //警告
                    warning : {
                        class : "primaryColor",
                        icon : "&#xe619;"
                    },
                    //成功
                    success : {
                        class : "openColor",
                        icon : "&#xe61a;"
                    },
                    //等待
                    loadding : {
                        class : "secondTextColor",
                        icon : "&#xe617;"
                    }
                },
                groupStatus : false,
                group : { 
                    submitText : "确定",
                    cancelText : "取消"
                }
            } 
            $.extend(data,info); 
            console.log(data);
            // 定义组件 
            var alertbox = Vue.extend({ 
                template:
                    '<div class="center-box">'+ 
                        '<i class="bg" v-on:click="clickBG"></i>'+
                        '<div class="box">'+  
                            '<i v-if="statusShow" class="icon mr5 main-icon {{status[statusShow].class}}">{{{status[statusShow].icon}}}</i>'+
                            '<span class="vm">{{hint}}</span>'+
                            '<div v-if="groupStatus" class="btn-group tl mt15">'+
                                '<input type="button" class="btn btn-success" value="{{group.submitText}}">'+
                                '<input type="button" class="btn btn-cancel" v-on:click="close" value="{{group.cancelText}}">'+
                            '</div>'+
                        '</div>'+ 
                    '</div>', 
                data: function(){  
                    return data;  
                },
                methods : {  
                    //点击背景   
                    clickBG : function(){
                        console.log(this.clickBGclose);
                        if(this.clickBGclose){
                            this.close();
                        }
                    }, 
                    //关闭 
                    close : function(){ 
                        var self = this;
                        $(self.box).animate({opacity:0},200,function(){
                            $(this).remove();
                        });
                    }
                }
            })
            // 全局注册组件
            Vue.component('alertbox', alertbox);
        },
    };
    
    return component;
//    component.search();
});
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
/**
 * @license RequireJS text 2.0.9 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',[],function () {
    
    var text, fs, Cc, Ci, xpcIsWindows,
        module = {},
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    text = {
        version: '2.0.9',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.indexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1, name.length);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        
        useCrossHTML: function(url){
            if(url.indexOf('.html') > -1){
                return true;
            }
            return false;
        },

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else if(text.useCrossHTML(url)){
                htmlLoad(url, function(content){
                   text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content.content, onLoad); 
                })
                
            }else{
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };
    
    // <link> load method
   var htmlLoad = function(url, callback) {
       // require(['Infrastructure'], function(Infrastructure){
       //     Infrastructure.alinkSDK.getRemoteContent(url, callback);
       // })
        
    }

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file.indexOf('\uFEFF') === 0) {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                errback(e);
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes,
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});
/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

    return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
    return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});
if(typeof define === "function" && define.amd){
    define("jquery",[],function(){
        return jQuery;
    });
};
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
};
define("md5", function(){});

/*
API
*/
define('ajaxAPI',[],function(){
    // var head = "http://192.168.5.122:8080/manageSystem/";
    // var head = "http://120.26.87.159:18080/manageSystem/";
    var head = "/manageSystem/"; 
    // window.API.login = "localhost:8888/manageSystem/web/user/login";
    window.API = { 
        //用户管理
        login : head+"web/user/login",//登录
        logout : head+"web/user/logout",//登出
        userCurrent : head+"web/user/current",//获取当前登陆用户信息
        changePwd : head+"web/user/pwd/modify",//修改密码
        resetPwd : head+"web/user/pwd/reset",//重置密码
        userList : head+"web/user/list",//用户列表
        userDetail : head+"web/user/detail",//用户详情
        saveUser : head+"web/user/save",//新增/修改用户
        lockUser : head+"web/user/lock",//禁用/启用用户
        photoByName : head+"web/user/get/by/name",//根据电话号码查找用户
        photoByDealer : head+"web/dealer/find/by/phone",//根据经销商电话查找经销商
        deviceListUsers : head+"web/device/list/users",//获取设备用户列表
        deviceUserDevice : head+"web/device/user/device/num",//获取用户设备数量
        
        //地区管理
        areaChildren : head+"web/area/children",//获取地区

        //角色管理 
        roleList : head+"web/role/list",//角色列表
        roleSave : head+"web/role/save",//新增/修改角色
        roleDetail : head+"web/role/detail",//角色详情
        permissionList : head+"web/permission/list",//权限列表

        //经销商管理
        dealerSave : head+"web/dealer/save",//新增/修改零售/行业经销商
        retailDetail : head+"web/dealer/retail/detail",//零售经销商详情
        retailList : head+"web/dealer/retail/list",//零售经销商列表
        industryDetail : head+"web/dealer/industry/detail",//行业经销商详情
        industryList : head+"web/dealer/industry/list",//行业经销商列表
        deviceList : head+"web/dealer/list/device",//经销商设备列表
        industrySave : head+"web/industry/save",//新增行业
        industryNameList : head+"web/industry/list",//行业列表
        
        /****售前设备****/
        //设备分类
        categorySave : head+"web/device/category/save",//新增/修改设备分类
        categoryList : head+"web/device/category/list",//获取设备分类列表
        modelSave : head+"web/device/model/save",//新增/修改设备型号
        modelList : head+"web/device/model/list",//获取设备型号列表

        //生产厂商
        factorySave : head+"web/factory/save",//新增/修改生产厂商
        factoryList : head+"web/factory/list",//获取生产厂商列表
        factoryDetail : head+"web/factory/detail",//获取生产厂商详情
        factoryLock : head+"web/factory/lock",//锁定生产厂商
        factoryBindersList : head+"web/factory/list/binders",//查询工厂员工列表
        factoryBindUser : head+"web/factory/bind/user",//绑定工厂用户
        factoryUnbindUser : head+"web/factory/unbind/user",//解除绑定工厂用户

        //批次管理
        batchAdd : head+"web/device/batch/add",//创建生产批次
        batchList : head+"web/device/batch/list",//查询生产批次
        batchDetail : head+"web/device/batch/detail",//查看批次详情
        batchSnList : head+"web/device/batch/list/sn",//查询SN列表
        batchDiscardSn : head+"web/device/batch/discardSn",//作废SN编码
        batchExport : head+"web/device/batch/export",//导出生产批次
        deviceAllocate : head+"web/device/allocate",//设置出厂身份
 
        /****售后设备****/
        //订单管理
        newOrder : head+"web/order/add",//新增订单
        orderList : head+"web/order/list",//订单列表
        orderDetail : head+"web/order/detail",//订单详情
        orderListDevice : head+"web/order/list/device",//获取订单设备列表
        channelList : head+"web/channel/list",//订单类型列表
        orderTemplateDownload : head+"web/order/template/download",//下载订单上传模版
        
        //设备管理
        sellDeviceList : head+"web/device/list",//获取设备列表
        sellDeviceDetail : head+"web/device/detail",//获取设备详情
        sellDeviceStrainerList : head+"web/device/strainer/list",//获取滤网列表  
        sellDeviceStrainerDetail : head+"web/device/strainer/detail",//获取滤网详情
        findByCategory : head+"web/device/model/find/by/category",//根据设备分类获取设备型号
 
        //校园新风
        schoolSave : head+"web/school/save",//保存学校
        schoolClassSave : head+"web/school/class/save",//保存班级
        schoolServiceFeeSet : head+"web/school/service/fee/set",//服务费设置
        schoolDeviceList : head+"web/school/list/device",//获取学校设备列表
        schoolList : head+"web/school/list",//获取学校列表
        schoolClassListDevice : head+"web/school/class/list/device",//获取班级设备列表
        schoolClassServiceList : head+"web/school/class/service/list",//获取服务购买记录
        
        //数据统计
        statisticsDeviceGeneral : head+"web/statistics/device/general",//应用概况统计
        statisticsMonthlyNewUsers : head+"web/statistics/monthly/new/users",//月度新增用户统计
        statisticsMonthlyNewDevices : head+"web/statistics/monthly/new/devices",//月度新增设备统计
        statisticsTendencyAnalyze : head+"web/statistics/tendency/analyze",//趋势分析统计
        statisticsDeviceStatistics : head+"web/statistics/device/statistics",//趋势设备统计
        statisticsTerminalStatistics : head+"web/statistics/terminal/statistics",//终端统计
        statisticsDeviceDistribution : head+"web/statistics/devices/distribution",//按省份统计设备
        statisticsExpiringStrainers : head+"web/statistics/expiring/strainers",// 统计即将到期滤网
        statisticsSchoolDeviceNum : head+"web/statistics/school/device/num",//获取校园设备统计列表
        statisticsSchoolGeneral : head+"web/statistics/school/general",//校园设备概况
        statisticsUsersByModel : head+"web/statistics/users/by/model",//根据设备类型统计用户数量

        
        

    }
});
define('base',[],function(header){
    //全局公用参数
    window.publicParams = {
        
    };
    var init = {
        default : function(){
            init.base();
            init.event();
            //获取用户信息
            init.getUserInfo();
        },
        base : function(){
            //容器最小高度获取
            if($(".container").length){
                $(window).bind("resize",function(){
                    var $container = $(".container"),
                        $top = $container.offset().top,
                        $H = $(window).height(),
                        $main = parseInt($("#main").css("margin-bottom"));
                    $container.css({
                        minHeight : $H-$top-15
                    });
                }).trigger("resize");
            } 
        },
        event : function(){

        },
        //获取用户信息 
        getUserInfo : function(){
            $.ajax({ 
                url : API.userCurrent, 
                type : "post",  
                success : function(resp){
                    if(resp.code==0){
                        publicParams.userInfo = resp.data;
                        localStorage.name = resp.data.userName;
                        $(".name").find(">span").text(resp.data.userName);
                        //获取用户信息回调
                        if(publicParams.getUserInfoBack){
                            publicParams.getUserInfoBack(resp.data);
                        } 
                        
                        if($("#login").length){
                            location.href = "/html/map/device-map.html";   
                        }
                    }else{
                        //未登陆处理
                        init.notLogin();
                    }
                },
                error : function(resp){
                    console.log("resp","失败");
                }
            });
        },
        //未登陆处理
        notLogin : function(){
            if(!$("#login").length){
                location.href = "/html/login/login.html"; 
            }
        }
    };
    init.default();
});
define('form',[],function(header){
    var params = {};
    var init = {
        default : function(){
            init.event();
            //选项事件
            init.selectEvent();
        },
        event : function(){
            //按扭按下/松开  
            $("body").on("mousedown",".btn:not(.disabled)",function(){
                $(this).addClass("btn-active");
            }).on("mouseup",function(){
                $(".btn-active").removeClass("btn-active");
            });
            //点击input选框
            $("body").on("click",".checkout-box:not(.disabled):not(.notClick)",function(){
                if($(this).hasClass("on")){
                    $(this).removeClass("on").find("input").attr("checked",false);
                }else{
                    $(this).addClass("on").find("input").attr("checked",true);
                }
            });
            //input获取/推动焦点
            $("body").on("focus",".input",function(){
                var self = $(this);
                setTimeout(function(){
                    self.addClass("focus");
                });
            }).on("blur",".input",function(){
                $(this).removeClass("focus");
            }); 
        },
        //选项事件
        selectEvent : function(){
            $("body").on("click",function(){
                $(".sod_list").hide();  
            });
            //点击select
            $("body").on("click",".sod_select",function(){
                //清楚另外一些select选择效果
                $(this).addClass("now"); 
                $(".sod_select:not(.now)").find(".sod_list").hide();
                $(this).removeClass("now");
                //隐藏/显示选择 
                var $list = $(this).find(".sod_list");
                if($list.css("display")=="block"){ 
                    $list.hide();
                }else{
                    $list.show();
                }
                return false;
            });
            //点击select option 
            $("body").on("click",".sod_select .sod_list li:not(.notSetVal)",function(){
                var $val = $(this).text(); 
                $(this).closest(".sod_select").find(".sod_label").text($val);
                $(this).addClass("selected").siblings().removeClass("selected");
            });
            //点击select option
            $("body").on("click",".sod_select .sod_list li.notSetVal",function(){
                $(".sod_list").hide();
                $(this).addClass("selected").siblings().removeClass("selected");
                return false;
            });
        }
    };

    init.default();
});
/*
验证包
*/
define('Check',[],function(){ 
    window.Check = {};
    //验证是否有值
    Check.haveValue = function(val,hint){
       if(val.value){
            val.warning = false;
            val.hint = "";
            val.success = true;
        }else{
            val.warning = true;
            val.hint = hint;
            val.success = false;
        }  
    }; 
    //验证联系电话
    Check.ifPhone = function(val,hint){
        hint = hint || [];
        val.warning = true; 
        val.success = false;
       if(!val.value){ 
            val.hint = hint[0]||"联系电话不能为空";
        }else if(!RegEx.regExpPhone(val.value)){
            val.hint = hint[1]||"联系电话不正确";
        }else{
            val.warning = false;
            val.hint = "";
            val.success = true;
        }  
    }; 
    //验证密码
    Check.ifPassword = function(val,hint){
        hint = hint || [];
        val.warning = true; 
        val.success = false;
       if(!val.value){ 
            val.hint = hint[0]||"当前密码不能为空";
        }else if(!RegEx.RegExpPassword(val.value)){
            val.hint = hint[1]||"请输入6-16位不含特殊符号的密码";
        }else{
            val.warning = false;
            val.hint = "";
            val.success = true;
        }  
    }; 
    //确认验证新密码
    Check.reIfPassword = function(val,list){
        val.warning = true;
        val.success = false;
        if(!val.value){
            val.hint = "确认密码不能为空";
        }else if(!RegEx.RegExpPassword(val.value)){
            val.hint = "请输入6-16位不含特殊符号的密码";
        }else if(val.value!=list[1].value){
            val.hint = "两次密码输入不一致";
        }else if(RegEx.RegExpPassword(val.value)){
            val.warning = false;
            val.success = true;
            val.hint = "";
        }
    };
    //验证列表不正确
    Check.list = function(list,params){
        for(var i=0;i<list.length;i++){
            if(!list[i].success){
                list[i].blur(list[i],list,params);
                return true;
            }
        }
    };
    //验证联系电话是否正确 在获取信息
    Check.ifPhoneGetInfo = function(val,callback){
        //添加失败参数
        if(!val.value||!RegEx.regExpPhone(val.value)){
            val.user.value = "";
            val.warning = true;
            val.class = "warning";
            val.success = false;
        }
        //判断逻辑
        if(!val.value){
            val.hint = "联系电话不能为空";
        }else if(!RegEx.regExpPhone(val.value)){
            val.hint = "联系电话不正确";
        }else {
            var data = {};
            val.paramPhone = val.paramPhone||"loginName";
            data[val.paramPhone] = val.value;
            $.ajax({
                url : val.API||API.photoByName,
                type : "post",
                data : data,
                success : function(resp){
                    if(resp.code==0){ 
                        val.hint = "";
                        val.class = "";
                        val.warning = false;
                        val.success = true;
                        val.user.id = resp.data.id;
                        val.user.value = resp.data.userName;
                        if(callback){
                            callback("success",resp);
                        }
                    }else{
                        val.hint = resp.msg;
                        if(callback){
                            callback("error",resp);
                        }
                    }
                },
                error : function(resp){
                    val.hint = "失败";
                    val.class = "warning";
                    val.warning = true;
                    val.success = false;
                    val.user.value = "";
                    if(callback){
                        callback("error",resp);
                    }
                }
            });
        }
    };
    //验证正数金额
    Check.ifPositive = function(val,hint){
        hint = hint || [];
        val.warning = true;
        val.success = false;
        if(!val.value){
            val.hint = hint[0]||"金额不能为空";
        }else if(!RegEx.RegExpPositive(val.value)){
            val.hint = hint[1]||"请填写正确的金额数";
        }else{   
            val.warning = false;
            val.hint = "";
            val.success = true;
        }
    };
    //验证正整数
    Check.ifPositiveInteger = function(val,hint){
        hint = hint || [];
        val.warning = true;
        val.success = false;
        if(!val.value){
            val.hint = hint[0]||"数量不能为空";
        }else if(!RegEx.RegExpInteger(val.value)){
            val.hint = hint[1]||"请填写正确的正整数";
        }else{   
            val.warning = false;
            val.hint = "";
            val.success = true;
        }
    };
    //验证日期
    Check.ifDate = function(val,hint){
        hint = hint || [];
        val.warning = true;
        val.success = false;
        if(!val.value){
            val.hint = hint[0]||"日期不能为空";
        }else if(!RegEx.RegExpDate(val.value)){
            val.hint = hint[1]||"日期格式错误 例：1995-10-08";
        }else{
            val.warning = false;
            val.hint = "";
            val.success = true;
        }
    }
    return Check;
});
/*
工具包
*/
define('Tool',[],function(){
    window.Tool = {};
    //经过提示信息
    Tool.Tooltip = function(info){
        info.status = info.status||"append";  //append 添加事件  remove 删除事件
        this.init = function(){
            //删除事件
            if(info.status=="remove"){
                this.unbindEvent();
                return;
            }
            //添加事件
            info.box.mouseover(function(){
                $(".tooptip").remove();
                var $title = info.message;
                if(!$title){
                    return;
                }
                $("body").append("<i class='tooptip'>"+$title+"</i>");
                var $offset = info.input.offset()
                //箭头位置
                if(info.status=="right"){
                    $(".tooptip").css({
                        right:$(window).width()-$offset.left
                    });
                }else{
                    $(".tooptip").css({
                        left:$offset.left
                    });
                }
                $(".tooptip").css({
                    width:info.width,
                    top:$offset.top,
//                    left:$offset.left,//info.left||0,
                    whiteSpace:info.whiteSpace||"normal",
                    lineHeight:info.lineHeight
                }).animate({
                        opacity:1
                    },100);
            });
            info.box.mouseout(function(){
//                $(".tooptip").remove();
            });
            if(!!info.input){
                info.input.blur(function(){
//                    $(".tooptip").remove();
                });
            }
        };
        this.unbindEvent = function(){
            info.box.unbind("mouseover");
            info.box.unbind("mouseout");
        }
        this.init();
    };
//    Tool.Tooltip({box:$('.aa').closest("li"),message:"请填写正确的邮箱！",input:$('.aa'),status:"right"});
    //获取链接
    Tool.getUrlParam = function(val){
        var href = location.href.replace("?","&");
        href = href.split("&");
        href.shift();
        var data = {
            urlParamVal : 0
        };
        for(var i=0;i<href.length;i++){
            var val = href[i].split("=");
            if(val[1]){
                data[val[0]] = val[1];
                data.urlParamVal++;
            }
        }
        return data;
    };
    //改变链接值
    Tool.changeUrlVal = function(data,status){
        //清理location
        if(status=="clean"){
            Tool.setUrlParam({});
        }
        //获取location信息
        data = data||[];
        var urlParam = Tool.getUrlParam();
        for(var i=0;i<data.length;i++){
            if(data[i].val){
                urlParam[data[i].name] = data[i].val;
            }else{
                delete urlParam[data[i].name];
            }
        } 
        //设置location值
        Tool.setUrlParam(urlParam);
    };
    //设置href值
    Tool.setUrlParam = function(info){ 
        var data = "";
        for(var i in info){
            if(i!="urlParamVal"){
                data += i+"="+info[i]+"&";
            }
        }
        data = data.slice(0,data.length-1);
        history.pushState({},".html","?"+data);
    };
    //页码整理  
    Tool.pageData = function(data){
        data = data || {};
        var pages = [];
        //小于6页全部展示
        if(data.totalPage<=6){
            for(var i=0;i<data.totalPage;i++){
                pages.push({
                    num : i+1,
                    active : i==data.currentPage-1?"active":""
                });
            }
        }
        if(data.totalPage>6){
            //当前页面小于4前面全部展示
            if(data.currentPage<5){
                for(var i=0;i<4;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.currentPage-1?"active":""
                    });
                }
                if(data.currentPage==4){
                    pages.push({ num : 5});
                }
                pages.push({ num : "...", omit : "omit"});
                pages.push({ num : data.totalPage });
            }else
            //当前页面在最后3页后面全部展示
            if(data.currentPage>=data.totalPage-4){
                pages.push({ num : 1 });
                pages.push({ num : "...", omit : "omit"});
                for(var i=data.totalPage-4;i<data.totalPage;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.currentPage-1?"active":""
                    });
                }
            }else
            //页面在中间
            if(data.currentPage>=5&&data.currentPage<data.totalPage-4){
                pages.push({ num : 1 });
                pages.push({ num : "...", omit : "omit"});
                for(var i=data.currentPage-1;i<data.currentPage+3;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.currentPage-1?"active":""
                    });
                }
                pages.push({ num : "...", omit : "omit"});
                pages.push({ num : data.totalPage });
            }
        }
        return pages;
    };
    //省份获取
    Tool.area = function(data,callback){
        data = data || { areaId : 0};
        $.ajax({
            url : API.areaChildren,
            type : "post",
            data : data,
            success : function(resp){ 
                if(callback){
                    callback(resp.data);
                }else{
                    return resp.data;
                }
            },
            error : function(resp){
                console.log(resp,"失败");
            }
        });
    }; 
    //加载数据中
    Tool.loaddding = function(data){
        data.status = data.status||"add";
        this.init = function(){
            this[data.status]();
        }; 
        //删除
        this.remove = function(){
            for(var i=0;i<data.box.length;i++){
                $(data.box[i]).find(".loaddinginfo").remove(); 
            }
            if(data.selfBox){
                for(var i=0;i<data.selfBox.length;i++){
                    $(data.selfBox[i]).remove();
                }
            }
        };
        this.add = function(){
            //添加
            component.loaddinginfo();
            var newBox = [];
            for(var i=0;i<data.box.length;i++){
                var $box = "loaddinginfo"+$.now()+i;
                newBox.push("."+$box);
                if(data.cover){
                    $(data.box[i]).html('<div class="loaddinginfo '+$box+'"><loaddinginfo></loaddinginfo></div>');
                }else{
                    $(data.box[i]).append('<div class="loaddinginfo '+$box+'"><loaddinginfo></loaddinginfo></div>');
                }
                new Vue({ 
                    el: "."+$box
                });
                if(data.delayShow){ 
                    $("."+$box).css({display:"none"});
                    //延时展示
                    this.delayShow($box);
                }
            }
            if(data.callback){
                data.callback(newBox,data.box);
            }
        };
        //延时展示
        this.delayShow = function($box){ 
            setTimeout(function(){
                $("."+$box).css({display:"block"});
            },data.timeout||100);
        };
        this.init();
    }; 
    //加载数据中-生成loadding
    Tool.createLoadding = function(box,cover,callback){
        if(!box){
            $(".page").html("");
        }
        Tool.loaddding({
            box : box||[".info-table-box"],
            cover : cover==false?false:true,//覆盖
            delayShow : true,//N毫秒后展示 默认N毫秒"timeOut:N" 时间太快不显示正在加载中...
            callback : function(newBox,box){
                //超时
                Tool.nothing({
                    question : "获取数据超时，请再刷新试试",
                    hints : [{  
                        text : "请检查您的网络是否连接正常"
                    }],
                    removeLoadding : newBox,
                    hide : true,
                    delayedShow : true
                },box,callback);
            }
        });
    };
    //删除正在加载中
    Tool.removeLoadding = function(box,selfBox){
        box = box||[".loadding-box"];
        Tool.loaddding({
            box : box||[".loadding-box"],
            selfBox : selfBox||[],
            status : "remove"
        });
        //删除超时会展示的提示文字
        for(var i=0;i<box.length;i++){
            $(box[i]).find(".nothing").remove();
        }
    };
    //btn处理
    Tool.btnStauts = function(data){
        var self = this;
        self.init = function(){
            //设置状态
            self.common();
            //设置值
            if(data.val){
                self.setValue(data.val);
            }
            //设置状态
            self[data.status]();
        };
        //还原
        self.common = function(){ 
            //设置状态
            $(data.box).removeClass("submit-save submit-success submit-error disabled").find("i").remove();
            if(data.common){
                $(data.box).text(data.common);
            }
        }; 
        //保存中 
        self.save = function(){ 
            $(data.box).addClass("submit-save disabled");
        };
        //成功 
        self.success = function(){ 
            $(data.box).addClass("submit-success disabled").append("<i class='icon'>&#xe61c;</i>");
            self.callback();
        };
        //失败
        self.error = function(){
            $(data.box).addClass("submit-error disabled").append("<i class='icon'>&#xe607;</i>");
            self.callback();
        };
        //setValue  
        self.setValue = function(val){
            $(data.box).text(val);
        };   
        //回调  
        self.callback = function(){
            setTimeout(function(){
                self.common();
                if(data.callback){  
                    data.callback();
                }
            },data.outTime||1500); 
        };
        self.init();
    };
    //btn提交等待中
    Tool.btnStautsBusy = function(text){
        //按扭状态改变
        Tool.btnStauts({
            status : "save",  
            box : ".btn-submit", 
            val : text||"正在保存" 
        });   
    };
    //btn提交成功
    Tool.btnStautsSuccess = function(text,common,callback){
        //按扭状态改变
        Tool.btnStauts({ 
            status : "success",
            box : ".btn-submit",
            common : common||"保存",
            val : text||"保存成功",
            callback : function(){
                if(callback){
                    callback();
                }
            }
        });
    };
    //btn提交失败
    Tool.btnStautsError = function(text,common,callback){
        //按扭状态改变
        Tool.btnStauts({
            status : "error",
            box : ".btn-submit",
            common : common||"保存",
            val : text||"保存失败",
            callback : function(){
                if(callback){
                    callback();
                }
            }
        });
    };
    //提示框
    Tool.alertbox = function(data){
        var self = this;
        self.init = function(){
            //添加基础容器
            self.addBox();
            //使用组件
            self.useComponent();
            //显示提示框
            self.show();
            //自动隐藏
            self.autoHide();
        };
        //添加基础容器
        self.addBox = function(){
            self.box = "alertbox"+$.now();
            $("body").append('<div class="alertbox '+self.box+' '+data.box+'"><alertbox></alertbox></div> ')
        };
        //使用组件
        self.useComponent = function(){ 
            data.data.box = "."+self.box;
            component.alertbox(data.data);
            new Vue({  
                el: '.'+self.box
            }); 
        }; 
        //show 
        self.show = function(){ 
            //延时展示 调用接口快的时候用上 
            if(data.delayShow){
                setTimeout(function(){ 
                    $("."+self.box).animate({opacity:1},200);   
                },data.delayTime||200);
            }else{
                $("."+self.box).animate({opacity:1},200);
            }
        }; 
        //自动隐藏      
        self.autoHide = function(){   
            data.hideTime = data.hideTime || [2000,200];
            if(data.autoHide){    
                clearTimeout(self.time); 
                self.time = setTimeout(function(){
                    $("."+self.box).animate({opacity:0},data.hideTime[1],function(){
                        $(this).remove(); 
                    });
                },data.hideTime[0]);
            }
        }   
        self.init();
    };
    //提示框-成功
    Tool.alertboxSuccess = function(text){
        Tool.alertbox({
            autoHide : true,
            data : { 
                clickBGclose : false,
                statusShow : "success",
                hint : text||"保存成功"
            }, 
        });
    };
    //提示框-错误
    Tool.alertboxError = function(text){
        //展示报错信息
        Tool.alertbox({
            autoHide : true,
            data : { 
                clickBGclose : true,
                statusShow : "error",
                hint : text||"保存失败"
            },
        });
    };
    //提示框-警告
    Tool.alertboxWarning = function(text,autoHide,clickBGclose){
        autoHide = autoHide || true;
        clickBGclose = clickBGclose || true;
        //提示框 
        Tool.alertbox({
            autoHide : autoHide,
            data : {
                clickBGclose : clickBGclose,
                statusShow : "warning",
                hint : text||"警告"
            }, 
        });
    };
    //位置信息
    Tool.location = function(list){
        // 创建位置
        component.location({
            list : list
        });
        new Vue({  
            el: '.location'
        });
    };
    //搜索
    Tool.search = function(data,methods){
        component.search(data,methods);
        new Vue({
            el: '.search'
        });
    };
    //无结果
    Tool.nothing = function(data,box,callback){
        callback = callback || function(){};
        var $nothing;
        //添加nothing标签
        if(box&&box.length){
            for(var i=0;i<box.length;i++){
                $nothing = "nothing"+$.now()+i;
                $(box[i]).append('<div class="nothing '+$nothing+'"><nothing></nothing></div>');
                component.nothing(data);
                new Vue({
                    el: "."+$nothing
                });
            }
            callback();
            return;
        }else{
            $nothing = "nothing"+$.now();
            $(".info-table-box").append('<div class="nothing '+$nothing+'"><nothing></nothing></div>');
        }
        component.nothing(data);
        new Vue({
            el: "."+$nothing
        });
        callback();
    };
    //页码 
    Tool.page = function(info,changePage){
        $(".page").html("<page></page>")
        // 创建搜索
        component.page(info,{
            changePage : function(num){
                changePage(num);
            }
        });
        new Vue({
            el: '.page'
        });
    };
    //分类
    Tool.category = function(info,methods){
        component.category(info,methods);
        new Vue({  
            el: '.category'
        });
    };
    //获取整十
    Tool.tenNum = function(val){
        val+="";
        if(val.length===1){
            return 0+val; 
        }else{
            return val;
        }
    };
    //获取时间
    Tool.getTime = function(n){
        var now = new Date;
        now.setDate(now.getDate() - n);
        return now;
    };
    //获取时间日期  
    Tool.getTimeDate = function(date){
        var time = Tool.getTime(date);
        return Tool.tenNum(time.getFullYear())+"-"+Tool.tenNum((time.getMonth()+1))+"-"+Tool.tenNum(time.getDate()); 
    }; 
    return Tool;
});    
define('text!../tpl/public/header.html',[],function () { return '<!--公用头部-->\r\n<header id="header">\r\n    <h1 id="LOGO"><a href="javascript:void(0)"><img src="../../images/public/LOGO.png"></a></h1>\r\n    <!--用户信息-->\r\n    <div class="user-info">\r\n        <a href="javascript:void(0)">\r\n            <i class="icon icon-user">&#xe600;</i>\r\n            <strong class="name"><span class="pr5">{{name}}</span><i class="icon icon-arrow">&#xe602;</i></strong>\r\n        </a>\r\n        <!--工具-->\r\n        <ul class="tools">\r\n            <li>\r\n                <a href="{{tools.editPassword.href}}">\r\n                    <i class="icon">{{{tools.editPassword.icon}}}</i>\r\n                    <h5>{{tools.editPassword.text}}</h5>\r\n                </a>\r\n            </li>\r\n            <li v-on:click="userLogout">\r\n                <a href="{{tools.logout.href}}">\r\n                    <i class="icon">{{{tools.logout.icon}}}</i>\r\n                    <h5>{{tools.logout.text}}</h5>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</header>';});

define('text!../tpl/public/nav.html',[],function () { return '<!--公用头部-->\r\n<nav id="nav">\r\n    <ul> \r\n        <template v-for="val in navData">\r\n            <li v-if="val.show!=false" class="{{val.active}}">\r\n                <h3 v-on:click="clickList($event)" class="caption">\r\n                    <i class="icon">{{{val.icon}}}</i>{{val.title}}\r\n                    <i class="icon icon-arrow">&#xe604;</i>\r\n                </h3>\r\n                <!--二级菜单--> \r\n                <ul class="sub-nav {{val.active&&\'show\'}}">\r\n                    <template v-for="subVal in val.subVal">\r\n                        <li v-if="subVal.show!=false" class="{{subVal.active}} {{subVal.class}}">\r\n                            <h4><a href="{{subVal.href}}">{{subVal.title}}</a></h4>\r\n                        </li> \r\n                    </template>\r\n                </ul> \r\n            </li>\r\n        </template>\r\n    </ul>\r\n</nav>';});

define('publicHtml',['text!../tpl/public/header.html','text!../tpl/public/nav.html'],function(header,nav){
    if($("#login").length){
        return;
    }
    var init = {
        default : function(){
            init.base();
            init.nav();
            init.header();
            init.event();
        },
        base : function(){
            //导入html
            $("body").prepend(nav);
            $("body").prepend(header);
            //nav菜单高度
            $(window).bind("resize",function(){
                var H = $(window).height(),
                    $header = $("#header").height();
                $("#nav>ul").css({height:H-$header});
            }).trigger("resize");
        },
        nav : function(){
            //菜单信息
            new Vue({
                el: '#nav',
                //数据
                data: {
                    navData : [
                        {  
                            icon : '&#xe62b;',
                            title : "设备地图",
                            show : localStorage.permissions.indexOf(",device:map,")>-1?true:false,
                            active : $("#map").length&&"active",
                            subVal : [
                                {
                                    href : "/html/map/device-map.html",
                                    title:"设备地图",
                                    show : localStorage.permissions.indexOf(",device:map,")>-1?true:false,
                                    active : $(".map-index").length&&"active"
                                }
                            ]
                        },
                        {
                            icon : '&#xe616;',
                            title : "系统管理",
                            active : $("#system-manage").length&&"active",
                            show : localStorage.permissions.indexOf(",sys,")>-1?true:false,
                            subVal : [
                                {
                                    href : "/html/system-manage/role.html",
                                    title:"角色管理",
                                    show : localStorage.permissions.indexOf(",sys:role,")>-1?true:false,
                                    active:$(".system-manage-role").length&&"active"
                                },
                                {
                                    href : "/html/system-manage/user.html",
                                    title:"用户管理",
                                    show : localStorage.permissions.indexOf(",sys:user,")>-1?true:false,
                                    active:$(".system-manage-user").length&&"active"
                                }
                            ]
                        },
                        { 
                            icon : '&#xe608;',
                            title : "经销商管理",
                            show : localStorage.permissions.indexOf(",dealer,")>-1?true:false,
                            active : $("#system-dealer").length&&"active",
                            subVal : [
                                { 
                                    href : "/html/system-dealer/retail.html",  
                                    title:"零售经销商",
                                    show : localStorage.permissions.indexOf(",dealer:retail,")>-1?true:false,
                                    class: "system-dealer-retail",
                                    active:$(".system-dealer-retail").length&&"active"
                                },
                                {
                                    href : "/html/system-dealer/trade.html",
                                    title:"行业经销商",
                                    show : localStorage.permissions.indexOf(",dealer:industry,")>-1?true:false,
                                    class: "system-dealer-trade",
                                    active:$(".system-dealer-trade").length&&"active"
                                }
                            ]
                        },
                        {
                            icon : '&#xe615;',
                            title : "售前设备",
                            show : localStorage.permissions.indexOf(",device:pre,")>-1?true:false,
                            active : $("#pre-sales").length&&"active",
                            subVal : [
                                {
                                    href : "/html/pre-sales/device.html",
                                    title:"设备分类",
                                    show : localStorage.permissions.indexOf(",device:category,")>-1?true:false,
                                    active:$(".pre-sales-device").length&&"active"
                                },
                                {
                                    href : "/html/pre-sales/manufacturer.html",
                                    title:"生产厂商",
                                    show : localStorage.permissions.indexOf(",device:factory,")>-1?true:false,
                                    active:$(".pre-sales-manufacturer").length&&"active"
                                },
                                { 
                                    href : "/html/pre-sales/batch-list.html",
                                    title:"批次管理",
                                    show : localStorage.permissions.indexOf(",device:batch,")>-1?true:false,
                                    active:$(".pre-sales-batch-list").length&&"active"
                                }

                            ]
                        },
                        {
                            icon : '&#xe615;', 
                            title : "售后设备",
                            show : localStorage.permissions.indexOf(",device:after,")>-1?true:false,
                            active : $("#sell-after").length&&"active",
                            subVal : [
                                {
                                    href : "/html/sell-after/order.html",
                                    title:"订单管理",
                                    show : localStorage.permissions.indexOf(",device:order,")>-1?true:false,
                                    active:$(".sell-after-order").length&&"active"
                                },
                                {
                                    href : "/html/sell-after/device.html",
                                    title:"设备管理",
                                    show : localStorage.permissions.indexOf(",device:mgr,")>-1?true:false,
                                    active:$(".sell-after-device").length&&"active"
                                },
                                {
                                    href : "/html/sell-after/school-device.html",
                                    title:"校园新风",
                                    show : localStorage.permissions.indexOf(",device:school,")>-1?true:false,
                                    active:$(".sell-after-school-device").length&&"active"
                                }
                            ]
                        },
                        {
                            icon : '&#xe60b;',
                            title : "设备用户",
                            show : localStorage.permissions.indexOf(",device:user,")>-1?true:false,
                            active : $("#user").length&&"active",
                            subVal : [
                                {
                                    href : "/html/user/device-user.html",
                                    title:"设备用户",
                                    show : localStorage.permissions.indexOf(",device:user,")>-1?true:false,
                                    active:$(".user-device-user").length&&"active"
                                }
                            ] 
                        },
                        {
                            icon : '&#xe61d;',
                            title : "数据统计",
                            show : (localStorage.permissions.indexOf(",statistics:general,")>-1||localStorage.permissions.indexOf(",statistics:dealer:general,")>-1||localStorage.permissions.indexOf(",statistics:school,")>-1)?true:false,
                            active : $("#data-count").length&&"active",
                            subVal : [
                                {
                                    href : "/html/data-count/index.html",
                                    title:"数据统计",
                                    show : localStorage.permissions.indexOf(",statistics:general,")>-1?true:false,
                                    active:$(".data-count-index").length&&"active"
                                },
                                {
                                    href : "/html/data-count/data-system-dealer.html",  
                                    title:"数据统计",
                                    show : localStorage.permissions.indexOf(",statistics:dealer:general,")>-1?true:false,
                                    active:$(".data-count-system-dealer").length&&"active"
                                },
                                {
                                    href : "/html/data-count/school.html",
                                    title:"校园新风",
                                    show : localStorage.permissions.indexOf(",statistics:school,")>-1?true:false,
                                    active:$(".data-count-school").length&&"active"
                                }
                            ]
                        },
                        {
                            icon : '&#xe60c;',
                            title : "生产批次",
                            show : localStorage.permissions.indexOf(",batch,")>-1?true:false,
                            active : $("#yield-batch").length&&"active",
                            subVal : [
                                {
                                    href : "/html/yield-batch/list.html",
                                    title:"生产批次",
                                    show : localStorage.permissions.indexOf(",batch,")>-1?true:false,
                                    active:$(".yield-batch-list").length&&"active"
                                }
                            ]
                        }
                    ]
                },
                created : function(){

                },
                //方法
                methods : {
                    login : function(){
                        location.href = "/html/map/device-map.html";
                    },
                    clickList : function(event){
                        //var height = event.target.nextElementSibling.scrollHeight;
                        //var count = event.target.nextElementSibling.childElementCount;
                    }
                }
            });
        },
        header : function(){
            //头部信息
            new Vue({
                el: '#header',
                //数据
                data: {
                    name : localStorage.name||"",
                    tools : { 
                        editPassword : {
                            href : "/html/user/editPassword.html",
                            icon : "&#xe61f;",
                            text : "修改密码"
                        },
                        logout : {
                            href : "javascript:void(0)",
                            icon : "&#xe61e;",
                            text : "退出"
                        }
                    }
                },
                methods : {
                    //退出登录
                    userLogout : function(){
                        $.ajax({
                            url :API.logout,
                            type:"POST",
                            success : function(resp){
                                location.href = "/html/login/login.html";
                            },
                            error: function(resp){
                                console.log(resp,'失败')
                            }
                        });
                    }
                }
            });
        },
        event : function(){
            //展开菜单
            $("body").on("click","#nav>ul>li:not(.active)",function(){
                var $li = $(this).find("li"),
                    $len = $li.length,
                    $height = $li.height();
                $(this).addClass("active").find(".sub-nav").stop(true).slideDown();
                $(this).siblings("li").removeClass("active").find(".sub-nav").stop(true).slideUp();
            });
            //收缩菜单
            $("body").on("click","#nav>ul>li.active .caption",function(){
                var $li = $(this).closest("li");
                $li.removeClass("active").find(".sub-nav").stop(true).slideUp();
            });
        }
    };
    init.default();
});
define('RegEx',[],function(){
    window.RegEx = {
        //手机正则表达式
        regExpPhone : function(val) {
            return val.length==11?true:false;
            //return /^1[34578]\d{9}$/.test(val) ? true : false;
        },
        //邮箱正则表达式
        RegExpEmail : function(val) {
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val) ? true : false;
        },
        //验证密码
        RegExpPassword : function(val) {
            return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\_\-]{6,16}$/.test(val) ? true : false;
        },
        //正整数
        RegExpInteger : function(val){
            return /^[1-9]\d*$/.test(val) ? true : false;
        },
        //正数
        RegExpPositive : function(val){
            return /^[+]?[\d]+(([\.]{1}[\d]+)|([\d]*))$/.test(val) ? true : false;
        }, 
        //验证日期
        RegExpDate : function(val){
             return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(val); 
        }, 
        
    };
});
require([
    //优先级高
    'component',

    //插件
//    'require',
//    'Vue',
    'underscore',
    'text', 
    'jquery',
    'md5',
    // 'selectordie',

    //公用js
    'ajaxAPI',    
    'base',
    'form',
    'Check',
    'Tool',
    'publicHtml',
    'RegEx'
]); 
define("common_main", function(){});
