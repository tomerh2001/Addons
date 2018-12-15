//================================================================//
//                          - Addons -                            //
//================================================================//
/*
    This is a part of a personal libary created by Tomer Horowitz,
    @ All rights reserved to and for Tomer Horowitz the creator of the libary
*/
var UID;
var clearConsoleOnReady = false;
var clearConsoleOnReadyDelay = 500;
var customRequestSettings;
var customRequestError;
var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
//- Declare original functions
var originalValFunction = $.fn.val;
var originalAttrFunction = $.fn.attr;
//- Initializations For The Extentions
$(function () {
    var _this = this;
    //- String
    String.prototype.toNumber = function () {
        var val = this;
        if (val.toLowerCase() == 'true')
            val = 1;
        else if (val.toLowerCase() == 'false')
            val = 0;
        return new Number(val);
    };
    String.prototype.foreach = function (f, amount) {
        if (amount == null || amount <= 0) {
            if (typeof (f) == typeof (function (char, index) { return String; })) {
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
            if (typeof (f) == typeof (function (char, index) { return String; })) {
                var Result = "";
                var CurrentResult = "";
                this.foreach(function (c, i) {
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
                this.foreach(function (c, i) {
                    if (i % amount == 0) {
                        f(CurrentResult, i);
                        CurrentResult = "";
                    }
                    else
                        CurrentResult += c;
                });
            }
        }
    };
    String.prototype.remove = function (selector) {
        var Result = "";
        if (typeof (selector) == typeof (String))
            return selector.length > 0 ? this.foreach(function (c, i) { return c != selector ? c : null; }, selector.length) : selector;
        //else if (typeof (selector) == typeof ((i) => String))
        //return selector.length > 0 ? this.foreach((c, i) => selector(c), selector.length) : selector;
        //else if (typeof (selector) == typeof ((i) => Boolean))
        //return selector.length > 0 ? this.foreach((c, i) => (selector typeof ((i) => Boolean)) ? c : null, selector.length) : selector;
        else
            return this;
    };
    String.prototype.empty = function () {
        var Result = this.remove(" ");
        if (Result == undefined || Result == null || Result.length == 0)
            return true;
        return false;
    };
    String.prototype.getNumbers = function () {
        return this.replace(new RegExp("\d"), '').toNumber();
    };
    String.prototype.contains = function (text, ignoreCase) {
        var base = ignoreCase ? this.toLowerCase() : this;
        var selector = ignoreCase ? text.toLowerCase() : text;
        var index = base.indexOf(selector);
        return index >= 0;
    };
    String.prototype.numbersOnly = function () {
        return /^(\d|\d | \d)+$/.test(this);
    };
    String.prototype.matches = function (reg) {
        var re = new RegExp(reg);
        var s = this;
        var m;
        var rsl = [];
        do {
            m = re.exec(s);
            if (m) {
                rsl.push(m);
            }
        } while (m);
        return rsl;
    };
    String.prototype.addToStart = function (value, condition) {
        if (!isEmpty(condition) && condition(this, value))
            return value + this;
        else if (!this.startsWith(value))
            return value + this;
        else
            return this;
    };
    String.prototype.title = function (upperSpace) {
        //- Create local variables
        var value = this;
        //- Replace all split characters
        value = value.replaceAll(/[-_]/g, ' ');
        //- Start by removing any extra white-spaces
        value = value.replaceAll(/ {2,}/g, ' ');
        //- Remove any white spaces from start and end
        value = value.replaceAll(/^ *(\S.*\S) *$/g, '$1');
        //- Split inner sentences
        if (upperSpace) {
            if (value.all(function (i) { return /[A-Z]/.test(i); }))
                value = value.toLowerCase();
            value = value.replaceAll(/([A-Z][^A-Z]*)/g, ' $1');
        }
        //- Set first letter uppercase
        if (!isEmpty(value) && value.length >= 1)
            value = value[0].toUpperCase() + value.substring(1);
        //- Return value
        return value;
    };
    String.prototype.all = function (pred) {
        //- Parse predicate
        if ($.type(pred) != 'function')
            pred = function (i) { return i == pred; };
        for (var i = 0; i < this.length; i++)
            if (!pred(this[i]))
                return false;
        return true;
    };
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        if (typeof search == 'string')
            return target.split(search).join(replacement);
        else
            return target.replace(search, replacement);
    };
    //- Number
    Number.prototype.empty = function () {
        if (this == null || this == undefined || this == Number.NaN || this.toString() == "NaN")
            return true;
        else
            return false;
    };
    Number.prototype.precentFrom = function (from) {
        return this / from * 100;
    };
    Number.prototype.precent = function (precent) {
        return precent * this / 100;
    };
    Number.prototype.clamp = function (min, max) {
        if (this < min)
            return min;
        else if (this > max)
            return max;
        else
            return this;
    };
    Number.prototype.round = function () {
        return Math.round(this);
    };
    //- Array
    Array.prototype.contains = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tar = this;
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
    };
    Array.prototype.first = function (selector) {
        if (isEmpty(selector)) {
            return this.length > 0 ? this[0] : undefined;
        }
        else {
            for (var i = 0; i < this.length; i++) {
                var currentItem = this[i];
                if (selector(currentItem, i))
                    return currentItem;
            }
        }
    };
    Array.prototype.select = function (selector) {
        var result = [];
        this.forEach(function (v, i) { return result.push(selector(v, i)); });
        return result;
    };
    Array.prototype.to = function (action) { return action(_this); };
    Array.prototype.parse = function (separator, fn) {
        var s = '';
        this.forEach(function (v, i, a) {
            s += fn(v);
            if (i + 1 != a.length)
                s += separator;
        });
        return s;
    };
    Array.prototype.last = function () {
        if (!isEmpty(this) && this.length - 1 >= 0)
            return this[this.length - 1];
    };
    Array.prototype.at = function (index, def) {
        var val;
        if (index <= this.length - 1)
            val = this[index];
        if (val == null)
            val = def;
        return val;
    };
    Array.prototype.toLowerCase = function () {
        return this.select(function (i) { return i != null ? i.toString().toLowerCase() : null; });
    };
    Array.prototype.any = function (fn) {
        for (var i = 0; i < this.length; i++)
            if (fn(this[i]))
                return true;
        return false;
    };
    //- JQuery
    jQuery.prototype.finishCss = function (callback, transitions, all) {
        if (transitions === void 0) { transitions = true; }
        if (all === void 0) { all = false; }
        var events = 'animationend';
        if (transitions)
            events += ' transitionend';
        if (all)
            events += ' webkitAnimationEnd oanimationend MSAnimationEnd' + (transitions ? ' webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd' : '');
        //- Create local variables
        var handler = function (ev) { return callback.apply(ev.currentTarget, [ev]); };
        //- Bind events
        return $(this).one(events, handler).data('finish-css-handler', handler);
    };
    jQuery.prototype.offFinishCss = function (transitions, all) {
        if (transitions === void 0) { transitions = true; }
        if (all === void 0) { all = false; }
        var events = 'animationend';
        if (transitions)
            events += ' transitionend';
        if (all)
            events += ' webkitAnimationEnd oanimationend MSAnimationEnd' + (transitions ? ' webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd' : '');
        //- Create local variables
        var handler = $(this).data('finish-css-handler');
        //- Unbind events
        events = events.split(' ');
        return $(this).each(function (i, e) {
            events.forEach(function (n) { return $(e).off(n, handler); });
        });
    };
    jQuery.prototype.replaceClass = function (oldClass, newClass) {
        return $(this).removeClass(oldClass).addClass(newClass);
    };
    jQuery.prototype.saveCss = function (name) {
        var tar = $(this);
        if ($.isArray(name)) {
            var names = name;
            names.forEach(function (name) {
                var val = tar.css(name);
                tar = tar.data('data-css-' + name, val);
            });
            return tar;
        }
        else {
            var val = tar.css(name);
            return tar.data('data-css-' + name, val);
        }
    };
    jQuery.prototype.loadCss = function (name) {
        return $(this).data('data-css-' + name);
    };
    jQuery.prototype.hasAttr = function (name) {
        if (!isEmpty($(this).attr(name)))
            return true;
        else
            return false;
    };
    jQuery.prototype.tag = function (value) {
        //- Return element tag
        if (isEmpty(value)) {
            return $(this).prop('tagName').toLowerCase();
        }
        //- Change element tag
        else { }
    };
    jQuery.prototype.scale = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tar = $(this), sc, val, from, to, fn, duration, axis = '', obj = {};
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
    };
    jQuery.prototype.reverse = function () {
        return $($(this).get().reverse());
    };
    jQuery.prototype.iter = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var fn = args[0], delay = args[1], delta;
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
    };
    jQuery.prototype.enterView = function (offset, fn) {
        //- Define local variables
        var ticking, elements = $(this), raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
            return setTimeout(callback, 1000 / 60);
        };
        //- Bind events
        window.addEventListener('resize', function () { return updateScroll(); }, true);
        window.addEventListener('scroll', onScroll, true);
        updateScroll();
        function getOffset() {
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            if (offset) {
                var num_1 = +(offset.toString().replace('%', '')) / 100;
                var fraction = Math.max(0, Math.min(100, num_1));
                return h - fraction * h;
            }
            return h;
        }
        function updateScroll() {
            ticking = false;
            var distanceFromTop = getOffset();
            elements = elements.filter(function (i, e) {
                var rect = e.getBoundingClientRect();
                var top = rect.top;
                if (top < distanceFromTop) {
                    fn(e);
                    return false;
                }
                return true;
            });
            if (!elements.length) {
                window.removeEventListener('scroll', onScroll, true);
            }
        }
        function onScroll() {
            if (!ticking) {
                ticking = true;
                raf(updateScroll);
            }
        }
        updateScroll();
        return $(this);
    };
    jQuery.prototype.opacity = function (value, duration, easing) {
        if (isEmpty(value)) {
            return $(this).css('opacity');
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
    };
    jQuery.prototype.tooltip = function (message, direction, timeout) {
        //- Create local variables
        timeout = $.defval(timeout, 300), direction = $.defval(direction, 'left');
        //- Bind events
        $(this).on({
            'mouseenter': function (ev) {
                //- Match active tooltip
                var tooltip = $('tooltip');
                //- Check if any tooltip matched
                if (!tooltip.length) {
                    tooltip = $.elem('tooltip', '', message).attr('index', 1).appendTo('body');
                }
                else {
                    //- Set tooltip text & index
                    tooltip.text(message).attr('index', tooltip.attr('index').toNumber() + 1);
                }
                //- Position tooltip
                tooltip.cords(ev.currentTarget).css({
                    'left': '+=' + (($(ev.currentTarget).outerWidth(true) / 2) - (tooltip.outerWidth(true) / 2)),
                    'top': '+=' + (($(ev.currentTarget).outerHeight(true) / 2) - (tooltip.outerHeight(true) / 2)),
                });
                switch (direction) {
                    case 'left':
                        tooltip.css({
                            'left': '-=' + (($(ev.currentTarget).outerWidth(true) / 2) - (tooltip.outerWidth(true) / 2) + (tooltip.outerWidth(true))),
                            'margin-left': '-1em'
                        });
                        break;
                    case 'right':
                        tooltip.css({
                            'right': '-=' + (($(ev.currentTarget).outerWidth(true) / 2) - (tooltip.outerWidth(true) / 2) + tooltip.outerWidth(true)),
                            'margin-right': '-1em'
                        });
                        break;
                    case 'top~':
                        tooltip.css({
                            'top': '-=' + (($(ev.currentTarget).outerHeight(true) / 2) - (tooltip.outerHeight(true) / 2) + tooltip.outerHeight(true)),
                            'margin-top': '-1em'
                        });
                        break;
                    case 'bottom~':
                        tooltip.css({
                            'bottom': '-=' + (($(ev.currentTarget).outerHeight(true) / 2) - (tooltip.outerHeight(true) / 2) + tooltip.outerHeight(true)),
                            'margin-bottom': '-1em'
                        });
                        break;
                }
                tooltip.bounds('screen');
            },
            'mouseleave': function (ev) {
                //- Match active tooltip
                var tooltip = $('tooltip');
                //- Check if any tooltip matched
                if (!tooltip.length) {
                    tooltip = $.elem('tooltip', '', message).attr('index', 1).appendTo('body');
                }
                //- Create local variables
                var index = tooltip.attr('index');
                //- Timeout tooltip
                setTimeout(function () {
                    if (index == tooltip.attr('index'))
                        tooltip.addClass('hide').finishCss(function (ev) { return $(ev.currentTarget).remove(); });
                }, timeout);
            },
        });
        //- Return target
        return $(this);
    };
    jQuery.prototype.shadow = function (value, raw) {
        if (isEmpty(value)) {
            return $(this).css('box-shadow');
        }
        else {
            //- Define shadow if 'dp' was specified
            if (/^\d+dp$/.test(value.toString())) {
                if (raw || value.toString().match(/(\d+)dp/) <= 0)
                    return $(this).css('box-shadow', shadows[value.toString()]);
                else
                    return $(this).attr('shadow', value.toString().match(/(\d+)dp/).at(1));
            }
        }
        return $(this);
    };
    jQuery.prototype.hoverCss = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof (args[0]) == 'object') {
            //- Get specified properties
            var props = args[0];
            //- Check if special shadow specified
            if (/^\d+dp$/.test(props['box-shadow'])) {
                props['box-shadow'] = shadows[props['box-shadow'].toString()];
            }
            return $(this).each(function (i, e) {
                //- Define utility functions
                var onenter = function () {
                    //- Save previous css
                    var prev = {};
                    $.props(props).forEach(function (i) { return prev[i.Name] = $(e).css(i.Name); });
                    $(e).data({
                        'hover-css-prev': prev,
                        'hover-css-props': props,
                    });
                    //- Set css
                    $(e).addClass('hovering').css($(e).data('hover-css-props'));
                };
                var onleave = function () {
                    //- Set css
                    $(e).removeClass('hovering').css($(e).data('hover-css-prev'));
                };
                //- Unbind any previous hover-css event handlers
                if ($(e).has('.has-hover-css'))
                    $(e).off('mouseenter', $(e).data('hover-css-enter'))
                        .off('mouseleave', $(e).data('hover-css-leave'));
                //- Bind current hover-css event handlers
                $(e).addClass('has-hover-css').data({
                    'hover-css-enter': onenter,
                    'hover-css-leave': onleave
                }).on({
                    'mouseenter': onenter,
                    'mouseleave': onleave
                });
            });
        }
        else if (args.length == 2) {
            props = {};
            props[args[0]] = args[1];
            return $(this).hoverCss(props);
        }
        return $(this).data('hover-css-props');
    };
    jQuery.prototype.hoverClass = function (classes) {
        //- Classes specified
        if (classes != undefined) {
            //- Join classes to one string
            if (typeof classes != 'string')
                classes = classes.join(' ');
            //- Return iterate through each element
            return $(this).each(function (i, e) {
                //- Define utility functions
                var onenter = function (ev) {
                    $(ev.currentTarget).addClass(classes);
                };
                var onleave = function (ev) {
                    $(ev.currentTarget).removeClass(classes);
                };
                //- Unbind any previous hover-css event handlers
                if ($(e).has('.has-hover-class'))
                    $(e).off('mouseenter', $(e).data('hover-class-enter'))
                        .off('mouseleave', $(e).data('hover-class-leave'));
                //- Bind events and data
                $(e).addClass('has-hover-class').data({
                    'hover-class-enter': onenter,
                    'hover-class-leave': onleave
                }).on({
                    'mouseenter': onenter,
                    'mouseleave': onleave
                });
            });
        }
        //- No argument specified
        else {
            //- Return previous specified classes if has
            return $(this).data('hover-class-classes');
        }
    };
    jQuery.prototype.play = function () {
        return $(this).each(function (i, e) { return $(e).get(0).play(); });
    };
    jQuery.prototype.playing = function () {
        return !$(this).get(0).paused;
    };
    jQuery.prototype.pause = function () {
        return $(this).each(function (i, e) { return $(e).get(0).pause(); });
    };
    jQuery.prototype.paused = function () {
        return $(this).get(0).paused;
    };
    jQuery.prototype.togglePlay = function () {
        return $(this).each(function (i, e) {
            if (!$(e).playing())
                $(e).play();
            else
                $(e).pause();
        });
    };
    jQuery.prototype.duration = function () {
        return $(this).get(0).duration;
    };
    jQuery.prototype.volume = function (value) {
        if (!isEmpty(value))
            return $(this).each(function (i, e) { return $(e).get(0).volume = num(value).clamp(0, 1); });
        else
            return $(this).get(0).volume;
    };
    jQuery.prototype.playtime = function (value) {
        if (!isEmpty(value))
            return $(this).each(function (i, e) { return $(e).get(0).currentTime = num(value).clamp(0, $(e).duration()); });
        else
            return $(this).get(0).currentTime;
    };
    jQuery.prototype.rotate = function (value) {
        if (typeof (value) == 'string')
            value = value.replace('deg', '');
        return $(this).each(function (i, e) { return $(e).css('transform', 'rotate(' + value + 'deg)'); });
    };
    jQuery.prototype.changeIcon = function (icon, prefix) {
        var target = $(this).children('svg').addBack('svg');
        if (!isEmpty(icon))
            target.attr('data-icon', icon);
        if (!isEmpty(prefix))
            target.attr('data-prefix', prefix);
        return $(this);
    };
    jQuery.prototype.overlay = function (opacity, duration, color) {
        if (duration === void 0) { duration = 0; }
        if (color === void 0) { color = '#212121'; }
        //- Return overlay of each element if specified
        if (isEmpty(opacity))
            return $(this).children('.overlay-element');
        //- Create local variables
        var overlays = [];
        //- Iterate through elements
        $(this).each(function (i, e) {
            //- Remove previous overlay if has
            if ($(e).is('.has-overlay'))
                $(e).children('.overlay-element').remove();
            //- Check if special color specified
            switch (color.toLowerCase()) {
                case 'background':
                    color = $(e).css('background');
                    break;
                case 'color':
                case 'auto':
                    color = $(e).css('color');
                    break;
            }
            //- Create overlay
            var overlay = $.div('overlay-element')
                .css('background', color)
                .opacity(opacity, duration)
                .appendTo($(e).addClass('has-overlay'));
            //- Append overlay
            overlays.push(overlay);
        });
        //- Return overlays array
        return $(overlays);
    };
    jQuery.prototype.val = function (value) {
        //- Check if any arguments was specified
        if (value != undefined) {
            //- Call original function (Setter)
            var result = originalValFunction.call(this, value);
            //- Fire all 'valchange' events safely
            if (isEmpty($(this).data('valchange-status')))
                $(this).data('valchange-status', 'fired').valchange().removeData('valchange-status');
            //- Return result
            return result;
        }
        //- No arguments were specified
        //- Call original function (Getter)
        else
            return originalValFunction.call(this);
    };
    jQuery.prototype.valchange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- No arguments were specified
        if (args.length == 0)
            return $(this).each(function (i, e) {
                //- Trigger all 'valchange' events.
                $(e).trigger($.Event('valchange', { value: $(e).val() }));
            });
        //- Function was specified
        else if (typeof args[0] == 'function')
            return $(this).on('valchange', args[0]);
        //- EventData and function was specified
        else
            return $(this).bind('valchange', args[0], args[1]);
    };
    jQuery.prototype.attr = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Check if any argument than attribute name was specified
        if (typeof args[0] != 'string' || args.length > 1) {
            if (args.length > 1 && typeof args[1] == 'function') {
                return $(this).each(function (i, e) {
                    $(e).attr(args[0], args[1](i, args[0]));
                });
            }
            else if (args.length == 1) {
                var props = $.props(args[0]);
                for (var i = 0; i < props.length; i++)
                    $(this).attr(props[i].Name, props[i].Value);
                return $(this);
            }
            else {
                //- Call original function (Setter)
                var result = originalAttrFunction.apply(this, args);
                //- Fire all 'attrchange' events safely
                if (isEmpty($(this).data('attrchange-status')))
                    $(this).data({
                        'attrchange-status': 'fired',
                        'attrchange-value': args
                    }).attrchange().removeData(['attrchange-status', 'attrchange-value']);
                //- Return result
                return result;
            }
        }
        //- No arguments were specified
        //- Call original function (Getter)
        else
            return originalAttrFunction.apply(this, args);
    };
    jQuery.prototype.attrchange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- No arguments were specified
        if (args.length == 0)
            return $(this).each(function (i, e) {
                //- Trigger all 'attrchange' events.
                $(e).trigger($.Event('attrchange', { value: $(e).data('attrchange-value') }));
            });
        //- Function was specified
        else if (typeof args[0] == 'function')
            return $(this).on('attrchange', args[0]);
        //- EventData and function was specified
        else
            return $(this).bind('attrchange', args[0], args[1]);
    };
    jQuery.prototype.cords = function (cords, offset) {
        //- Coordinates not specified (Getter)
        if ($.isEmpty(cords) || $.type(cords) == 'boolean') {
            if ($(this).css('position') == 'absolute' && $(this).parent().css('position') == 'relative')
                return $(this).position();
            else {
                cords = $(this).offset();
                //- Scroll offset
                cords.top -= scrollY;
                cords.left -= scrollX;
                return cords;
            }
        }
        //- Coordinates specified (Setter)
        else {
            //- Create local variables
            var offsetLeft = '+=0', offsetTop = '+=0';
            //- Coordinates target specified
            if ($.type(cords) == 'array') {
                if (cords.length < 2)
                    cords = undefined;
                else
                    cords = { left: cords[0], top: cords[1] };
            }
            else {
                if (!($.props(cords).first(function (i) { return i.Name.toLowerCase() == 'left'; }) && $.props(cords).first(function (i) { return i.Name.toLowerCase() == 'top'; })))
                    if ($(this).parent().get(0) == $(cords).parent().get(0) && $(this).parent().css('position') == 'relative') {
                        if ($(this).css('position') == 'fixed')
                            $(this).css('position', 'absolute');
                        cords = $(cords).position();
                    }
                    else {
                        cords = $(cords).offset();
                        if (!isEmpty(cords)) {
                            cords.left -= scrollX;
                            cords.top -= scrollY;
                        }
                    }
            }
            //- Check if target coordinates found
            if (isEmpty(cords))
                return $(this);
            //- Offset was specified
            if (!isEmpty(offset)) {
                if ($.type(offset) == 'number' || $.type(offset) == 'string') {
                    var tempOffset = String(offset).addToStart('+=', function (s, v) { return !s.startsWith('+=') && !s.startsWith('-='); });
                    offsetLeft = tempOffset;
                    offsetTop = tempOffset;
                }
                else if ($.type(offset) == 'array') {
                    offsetLeft = String(offset[0]).addToStart('+=', function (s, v) { return !s.startsWith('+=') && !s.startsWith('-='); });
                    offsetTop = String(offset[1]).addToStart('+=', function (s, v) { return !s.startsWith('+=') && !s.startsWith('-='); });
                }
                else if ($.type(offset) == 'object') {
                    offsetLeft = String(offset['left']).addToStart('+=', function (s, v) { return !s.startsWith('+=') && !s.startsWith('-='); });
                    offsetTop = String(offset['top']).addToStart('+=', function (s, v) { return !s.startsWith('+=') && !s.startsWith('-='); });
                }
            }
            //- Apply CSS 
            $(this).css({
                'top': cords.top,
                'left': cords.left,
            });
            //- Apply offset
            $(this).css({
                'top': offsetTop,
                'left': offsetLeft,
            });
            //- Return element
            return $(this);
        }
    };
    jQuery.prototype.bounds = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var current = $(this).cords();
        var target = getbounds(args[0]);
        var start = { top: 0, left: 0 };
        var full = true;
        //- Define utility functions
        function getbounds(target) {
            if ($.type(target) == 'array') {
                return { left: target[0], top: target[1] };
            }
            else if ($.type(target) != 'object') {
                if ($.isval(target, 'screen', 'body', 'viewport', 'window', 'document'))
                    return { left: $(window).outerWidth(), top: $(window).outerHeight() };
                else
                    return $(target).cords();
            }
            return target;
        }
        //- Parse specified arguments
        if (args.length > 1) {
            if ($.type(args[1]) == 'boolean') {
                full = args[1];
            }
            else if (args.length == 3) {
                start = getbounds(args[1]);
                full = args[2];
            }
            else {
                start = getbounds(args[1]);
            }
        }
        if (full) {
            target.left -= $(this).outerWidth();
            target.top -= $(this).outerHeight();
        }
        //- Left property
        if (current.left < start.left)
            current.left = start.left;
        else if (current.left > target.left)
            current.left = target.left;
        //- Top property
        if (current.top < start.top)
            current.top = start.top;
        else if (current.top > target.top)
            current.top = target.top;
        //- Return element
        return $(this).css({
            left: current.left,
            top: current.top,
        });
    };
    jQuery.prototype.scrollProgress = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var target = $(this).get(0);
        //- Replace html with window
        if (target == $('html').get(0))
            target = $(window).get(0);
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
            $(target).scroll(function (ev) {
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
            });
        }
    };
    jQuery.prototype.scrollIntoView = function () {
        //- Create local variables
        var offsetTop = $(this).get(0).offsetTop;
        //- Scroll current element into view
        $('html').get(0).scrollTop = isIOS() ? -offsetTop : offsetTop;
        //- Return target
        return $(this);
    };
    jQuery.prototype.out = function (handler, events) {
        //- Create local variables
        var This = this;
        var events = $.defval(events, 'mousedown keypress focusin');
        //- Define utility functions
        var onevents = function (ev) {
            if (!$(ev.target).is($(This).find('*')) && !$(ev.target).is(This)) {
                ev.currentTarget = This;
                handler(ev);
            }
        };
        //- Raise events
        $('*').one(events, onevents);
        //- Return element
        return $(this);
    };
    jQuery.prototype.ripple = function (color, duration, overlay, position, multi) {
        if (overlay === void 0) { overlay = true; }
        //- Create local variables
        var color = $.defval(color, 'auto');
        var position = isEmpty(position) ? false : position;
        var duration = $.defval(duration, position ? 1000 : 500);
        var overlay = $.defval(overlay, true);
        var multi = $.defval(multi, true);
        var on = $.defval(on, 'mousedown');
        var end = $.defval(end, 'mouseleave mouseup');
        //- Define utility functions
        var rippleStart = function (ev) {
            //- Create local variables
            var size = Math.max($(ev.currentTarget).outerWidth(), $(ev.currentTarget).outerHeight());
            //- Remove previous ripples if specified
            if (!multi)
                $(ev.currentTarget).children('.ripple-effect').remove();
            //- Create ripple
            var ripple = $.div('ripple-effect');
            //- Get correct color
            if ($(ev.currentTarget).attr('ripple-color').toLowerCase() == 'auto')
                color = $(ev.currentTarget).css('color');
            //- Apply ripple CSS
            ripple.css({
                'background': color,
                'animation-duration': duration + 'ms',
                width: size,
                height: size,
            });
            //- Define utility functions
            var rippleEnd = function (ev) {
                //- Get all current ripples at element
                var ripples = $(ev.currentTarget).find('.ripple-effect');
                //- Iterate through the ripples of the element
                ripples.each(function (i, e) {
                    //- Ripple is finished animating
                    if ($(e).is('.finished')) {
                        $(e).fadeOut(200, function () { return $(e).remove(); });
                    }
                    //- Ripple is still active
                    else {
                        $(e).finishCss(function (ev) { return $(ev.currentTarget).fadeOut(200, function () { return $(e).remove(); }); });
                    }
                });
                //- Trigger 'RippleEnd' event
                $(ev.currentTarget).triggerHandler('rippleEnd');
            };
            //- Bind ripple end event
            $(ev.currentTarget).on((_a = {},
                _a[end] = function (ev2) { return rippleEnd(ev2); },
                _a));
            //- Bind ripple animation end event
            ripple.finishCss(function (ev2) {
                $(ev2.currentTarget).addClass('finished');
            });
            //- Append ripple
            ripple.appendTo(ev.currentTarget);
            //- Apply ripple CSS (2)
            if (!position)
                ripple.css({
                    left: ev.pageX - $(ev.currentTarget).offset().left - ripple.width() / 2,
                    top: ev.pageY - $(ev.currentTarget).offset().top - ripple.height() / 2,
                    right: '',
                    bottom: '',
                });
            else if (position == true)
                ripple.css({
                    margin: 'auto',
                    left: '',
                    top: '',
                });
            else
                ripple.css((_b = {
                        margin: 'auto',
                        left: '',
                        top: '',
                        right: '',
                        bottom: ''
                    },
                    _b[position] = '-50%',
                    _b));
            //- Fire rippleStart events
            $(ev.currentTarget).triggerHandler('rippleStart');
            var _a, _b;
        };
        //- Iterate through the elements
        $(this).each(function (i, e) {
            //- Bind events
            $(e).on((_a = {},
                _a[on] = rippleStart,
                _a['mouseenter '] = function (ev) {
                    //- Get correct color
                    if ($(ev.currentTarget).attr('ripple-color').toLowerCase() == 'auto')
                        color = $(ev.currentTarget).css('color');
                    //- Append overlay
                    if (!isEmpty(overlay)) {
                        //- Create overlay element
                        var overlayElement = $.div('ripple-effect-overlay');
                        //- Parse overlay color
                        switch ($.type(overlay)) {
                            case 'boolean':
                                if (!overlay)
                                    return;
                                else
                                    overlayElement.css('background', color);
                                break;
                            case 'number':
                                overlayElement.css({ 'background': color, 'opacity': overlay });
                                break;
                            case 'string':
                                overlayElement.css('background', overlay);
                                break;
                        }
                        //- Remove previous overlay
                        $(e).find('.ripple-effect-overlay').remove();
                        //- Append overlay element
                        overlayElement.appendTo(e);
                    }
                },
                _a['mouseleave focusout'] = function (ev) {
                    //- Fadeout and remove overlay
                    if (!isEmpty(overlay))
                        $(e).find('.ripple-effect-overlay').addClass('hide')
                            .finishCss(function () { return $(e).find('.ripple-effect-overlay.hide').remove(); });
                },
                _a['keyup'] = function (ev) {
                    if ($.isval(ev.key, 'Enter', ' ')) {
                        $(ev.currentTarget).click().focusout();
                    }
                    else if ($.isval(ev.key, 'Escape')) {
                        $(ev.currentTarget).focusout();
                    }
                },
                _a));
            var _a;
        });
        //- Apply element class & attributes
        $(this).attr({
            'ripple-color': color,
            'tabindex': 0,
        });
        //- Return element
        return $(this);
    };
    //- JQueryStatic
    jQuery.props = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var obj = args[0];
        if (isEmpty(obj))
            obj = {};
        if (typeof obj == 'string' || $.type(obj) == 'array' || obj instanceof Array)
            return [];
        else
            var members = Object.getOwnPropertyNames(obj).select(function (i) { return new MemberInfo(i, Object.getOwnPropertyDescriptor(obj, i)); });
        if (args.length == 1) {
            return members;
        }
        else if (args.length == 2) {
            if ($.isFunction(args[1])) {
                members.forEach(function (e, i) { return args[1](e.Value, e.Name, i); });
            }
            else {
                var obj2 = args[1];
                if (isEmpty(obj2))
                    return obj;
                var members2 = Object.getOwnPropertyNames(obj2).select(function (i) { return new MemberInfo(i, Object.getOwnPropertyDescriptor(obj2, i)); });
                var result = Object.create(Object.getPrototypeOf(obj));
                var covered = new Array();
                function cover(m, m2) {
                    var name = null;
                    var value = null;
                    name = notEmpty(m, m2, function (m) { return m.Name; });
                    if (!isEmpty(m) && !isEmpty(m.Value) && $.isPlainObject(m.Value) && !isEmpty(m2) && !isEmpty(m2.Value) && $.isPlainObject(m2.Value))
                        value = $.props(m.Value, m2.Value);
                    else
                        value = notEmpty(m, m2, function (m) { return m.Value; });
                    result[name] = value;
                }
                members.forEach(function (m) {
                    if (!covered.contains(m.Name)) {
                        var m2 = members2.first(function (i) { return i.Name == m.Name; });
                        return cover(m, m2);
                    }
                });
                members2.forEach(function (m2) {
                    if (!covered.contains(m2.Name)) {
                        var m = members.first(function (i) { return i.Name == m2.Name; });
                        cover(m, m2);
                    }
                });
                return result;
            }
        }
    };
    jQuery.parseStyle = function (rules) {
        var cssText = '';
        var propWhitespace = '   ';
        $.props(rules, function (p, selector) {
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
                    $.props(p, function (propVal, propName) { return cssText += propWhitespace + propName + ': ' + propVal + ';' + '\r\n'; });
                cssText += '}' + '\r\n';
            }
        });
        return cssText;
    };
    jQuery.injectStyle = function (rules) {
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
    };
    jQuery.valFn = function (obj, args, thisArg) {
        if ($.isFunction(obj)) {
            if (!isEmpty(args) && args.length > 0)
                return obj.apply(thisArg, args);
            else
                return obj.apply(thisArg);
        }
        else
            return obj;
    };
    jQuery.defval = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- One value specified
        if (isEmpty(args[0]) || $.type(args[0]) != 'array') {
            //- Only value specified (Unlikely)
            if (args.length == 1) {
                //- Return specified value
                return args[0];
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
            var arr = args[0];
            //- Only values specified
            if (args.length == 1) {
                //- Return first value that is not empty
                return arr.first(function (i) { return !isEmpty(i); });
            }
            //- Values and only condition OR only default specified
            else if (args.length == 2) {
                //- Values and condition specified
                if (typeof (args[1]) == 'function') {
                    //- Return the first value that satisfies the specified condition
                    return arr.first(function (i) { return args[1](i); });
                }
                //- Values and default specified
                else {
                    var val = arr.first(function (i) { return !isEmpty(i); });
                    return !isEmpty(val) ? val : args[1];
                }
            }
            //- Values, default and condition specified
            else if (args.length == 3) {
                var val = arr.first(function (i) { return args[2](i, args[1]); });
                return !isEmpty(val) ? val : args[1];
            }
        }
    };
    jQuery.call = function (fn, thisArg) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        /**
        * The function to call a single function
        */
        function callF(f) {
            if (!isEmpty(thisArg))
                return f.call(thisArg, args);
            else
                return f.call(undefined, args);
        }
        if (!isEmpty(fn)) {
            if (typeof fn == 'function')
                return [callF(fn)];
            else
                return fn.select(function (curFn) { return callF(curFn); });
        }
    };
    jQuery.color = function (name, shade) {
        if (typeof name == 'string')
            return getColorCode(ColorPalette[name], shade);
        else
            return getColorCode(name, shade);
    };
    jQuery.hash = function (val, value) {
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
                    parseHash().forEach(function (i) { return val(i.name, i.value); });
                }
            }
            else {
                var h = parseHash();
                if (h.contains(function (i) { return i.name.toLowerCase() == val.toString().toLowerCase(); })) {
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
                        h.push({ name: val, value: value });
                    document.location.hash = h.parse('/', function (i) { return i.name + '=' + i.value; });
                }
            }
        }
        else
            return document.location.hash.substr(1);
    };
    jQuery.url = function (val, value) {
        if (val != undefined) {
            if (value == undefined) {
                if (typeof val == 'string') {
                    history.replaceState(null, document.title, encodeURI(encodeURI(value)));
                }
                else if (typeof val == 'object') {
                    var parts = window.location.toString().split('#');
                    var url = new URL(parts[0]);
                    $.props(val, function (v, n, i) {
                        url.searchParams.set(n, v);
                    });
                    if (parts.length == 2)
                        history.replaceState(null, document.title, encodeURI(encodeURI(url.toString() + '#' + parts[1])));
                    else
                        history.replaceState(null, document.title, encodeURI(encodeURI(url.toString())));
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
                url.searchParams.set(val, value);
                if (parts.length == 2)
                    history.replaceState(null, document.title, encodeURI(url.toString() + '#' + parts[1]));
                else
                    history.replaceState(null, document.title, encodeURI(url.toString()));
            }
        }
        else {
            return decodeURI(document.location.href);
        }
    };
    jQuery.isEmpty = function (val) {
        return isEmpty(val);
    };
    jQuery.isval = function (target) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        //- Return if values contains target
        return values.contains(target);
    };
    jQuery.console = function (values) {
        console.log(values);
        return values;
    };
    jQuery.clear = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var delay, condition;
        if (args.length > 0)
            if ($.isval($.type(args[0]), 'string', 'number')) {
                delay = args[0];
                if (args.length > 1)
                    condition = args[1];
            }
            else if ($.isval($.type(args[0]), 'boolean', 'function')) {
                condition = args[0];
            }
        if (!isEmpty(delay) && !isEmpty(condition))
            setTimeout(function () { return $.valFn(condition) ? clear() : ''; }, delay);
        else if (!isEmpty(delay))
            setTimeout(function () { return clear(); }, delay);
        else if (!isEmpty(condition))
            $.valFn(condition) ? clear() : '';
        else
            clear();
    };
    jQuery.scrollLock = function () {
        //- Create local variables
        var count = 0;
        //- Set the scroll lock
        $('html').css('overflow', 'hidden');
        count = !isEmpty($('html').attr('lock-scroll-count')) ? $('html').attr('lock-scroll-count').toString().toNumber() : 0;
        if (count < 0)
            count = 0;
        //- Set attr
        $('html').attr('lock-scroll-count', count + 1);
    };
    jQuery.scrollUnlock = function () {
        //- Create local variables
        var count = $('html').attr('lock-scroll-count').toNumber() - 1;
        if (count < 0)
            count = 0;
        //- Check if target found
        if (count == 0)
            $('html').css('overflow', '');
        $('html').attr('lock-scroll-count', count);
        return count;
    };
    jQuery.hyper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var events = '', selector = '*', fn;
        //- Parse arguments
        if (args.length == 2) {
            events = args[0];
            fn = args[1];
        }
        else if (args.length == 3) {
            events = args[0];
            fn = args[2];
            selector = args[1];
        }
        //- Bind HTML events
        $(document).on(events, selector, {}, function (ev) {
            if ($(ev.target).is(selector)) {
                ev.currentTarget = ev.target;
            }
            else if ($(ev.fromElement).is(selector))
                ev.currentTarget = ev.fromElement;
            fn(ev);
        });
    };
    jQuery.setRequest = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Parse arguments
        if ($.type(args[0]) == 'string') {
            customRequestSettings = {
                url: args[0]
            };
        }
        else if ($.type(args[0]) == 'object') {
            customRequestSettings = args[0];
        }
        //- Set default error callback if specified
        if (!isEmpty(args[1]))
            customRequestError = args[1];
        //- Validate settings
        if (isEmpty(customRequestSettings.dataType))
            customRequestSettings.dataType = 'Json';
        if (isEmpty(customRequestSettings.type))
            customRequestSettings.type = 'POST';
        if (isEmpty(customRequestSettings.contentType))
            customRequestSettings.contentType = 'application/json; charset=UTF-8';
        return customRequestSettings;
    };
    jQuery.request = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var settings = customRequestSettings;
        var complete, error;
        //- Make sure any settings specified
        if (isEmpty(settings) || isEmpty(settings.url))
            throw 'Cant send request without assigning url';
        //- Parse arguments
        if ($.type(args[1]) != 'function') {
            settings.data = { key: args[0], data: args[1] };
            complete = args[2];
            error = args[3];
        }
        else {
            settings.data = { key: args[0] };
            complete = args[1];
            error = args[2];
        }
        //- Serialize data to JSON
        settings.data = escape(JSON.stringify(settings.data));
        //- Set callbacks
        settings.success = function (response) {
            if (response.result) {
                if (!isEmpty(complete))
                    complete(response.data);
            }
            else {
                if (!isEmpty(error)) {
                    error(response.message, response.stacktrace);
                }
                if (!isEmpty(customRequestError)) {
                    customRequestError(response.message, response.stacktrace);
                }
            }
        };
        //- Send ajax
        return $.ajax(settings);
    };
    jQuery.message = function (label, content, buttons, color) {
        //- Create overlay
        var overlay = $.dialog('message-overlay', .2).appendTo('body');
        overlay.children().click(function (ev) {
            dialog.removeClass('active').finishCss(function (ev) {
                $(ev.currentTarget).remove();
                overlay.fadeOut(200, function () { return overlay.remove(); });
            });
        });
        //- Create dialog
        var dialog = $.div('message-dialog').appendTo(overlay);
        //- Create label
        var labelElm = $.elem('label', 'message-dialog-label', label).appendTo(dialog);
        //- Create content
        var contentElm = $.div('message-dialog-content', content).appendTo(dialog);
        //- Create buttons
        var buttonsElm = $.div('message-dialog-buttons').appendTo(dialog);
        if ($.isPlainObject(buttons)) {
            //- Iterate through the specified buttons
            $.props(buttons, function (v, n) {
                //- Create button
                var button = $.button(n, 'message-dialog-button', v).appendTo(buttonsElm);
            });
        }
        else if ($.type(buttons) == 'string') {
            //- Create button
            var button = $.button(buttons, 'message-dialog-button').appendTo(buttonsElm);
        }
        else {
            //- Append specified buttons
            buttonsElm.append(buttons);
        }
        throw 'Message is not implemented yet.';
        //- Return dialog
        //return dialog
    };
    //- JQueryStatic DOMs
    jQuery.elem = function (tag, className, content) {
        return $('<' + tag + '></' + tag + '>').addClass(className).append(content);
    };
    jQuery.div = function (className, text) {
        if (className === void 0) { className = ''; }
        if (text === void 0) { text = ''; }
        return $('<div></div>').addClass(className).text(text);
    };
    jQuery.video = function (options) {
        if (typeof (options) == 'string' || typeof (options) == 'number') {
            return $.video({ src: options });
        }
        else {
            var vid = $.elem('video').css({
                'width': options.width,
                'height': options.height,
            });
            if (options.autoplay)
                vid.attr('autoplay', '');
            if (options.muted)
                vid.attr('muted', '');
            if (options.controls)
                vid.attr('controls', '');
            if (options.loop)
                vid.attr('loop', '');
            if (!isEmpty(options.poster))
                vid.attr('poster', options.poster);
            if (!isEmpty(options.preload))
                vid.attr('preload', options.preload);
            if (!isEmpty(options.src))
                vid.attr('src', options.src);
            return vid;
        }
    };
    jQuery.icon = function (iconClasses, wrapperClasses) {
        //- Create local variables
        var icon = $.elem('i', iconClasses);
        var wrapper = $.elem('icon', wrapperClasses).append(icon);
        //- Return element
        return wrapperClasses == null ? icon : wrapper;
    };
    jQuery.dialog = function (className, opacity, duration, color) {
        var dialog = $.div('dialog-element ' + className);
        if (!isEmpty(opacity))
            dialog.overlay(opacity, duration, color).addClass('dialog-background');
        return dialog;
    };
    jQuery.textinput = function (labeltext, theme, effects, textarea) {
        //- Create Local Variables
        theme = $.defval(theme, '#008aff');
        effects = $.defval(effects, true);
        textarea = $.defval(textarea, false);
        //- Create element
        var elm = $.div('text-input-element').attr({
            textarea: textarea
        });
        //- Create label if specified
        if (!isEmpty(labeltext)) {
            //- Create labels
            var label = $.div('text-input-element-label').text(labeltext);
            //- Append label
            label.appendTo(elm);
        }
        //- Create input
        var input = $.elem(textarea ? 'textarea' : 'input', 'text-input-element-input').attr({
            'type': 'text',
            'textarea': textarea
        }).appendTo(elm);
        //- Create bottom
        var bottom = $.div('text-input-element-bottom')
            .appendTo(elm);
        //- Define utility functions
        var refreshEffects = function (elem) {
            //- Get effect type
            var effectType = $(elem).attr('effect-type').toNumber();
            //- Apply correct effects
            switch (+effectType) {
                case 0:
                    $(elem).addClass('no-effects');
                    break;
                case 1:
                    $(elem).addClass('label-raise bottom-ripple');
                    break;
                case 2:
                    $(elem).addClass('label-raise');
                    break;
                case 3:
                    $(elem).addClass('label-fade');
                    break;
                case 4:
                    $(elem).addClass('label-fade bottom-ripple');
                    break;
            }
        };
        //- Bind element events & attributes
        elm.hoverClass('hover').attr({
            'effect-type': effects,
        })
            .on({
            'focusin click': function (ev) {
                //- Check if input is disabled
                if ($(ev.currentTarget).children(textarea ? 'textarea' : 'input').is('[disabled]'))
                    return;
                //- Refresh effects
                refreshEffects(ev.currentTarget);
                //- Add class 'active'
                $(ev.currentTarget).addClass('active focused');
                //- Apply CSS
                $(ev.currentTarget).filter('.label-raise')
                    .find('.text-input-element-label')
                    .css('color', theme)
                    .end().end().css('color', theme);
                //- Apply CSS to bottom
                $(ev.currentTarget).find('.text-input-element-bottom')
                    .css('border-bottom-color', theme)
                    .css('transform-origin', ev.offsetX + 'px center 0px');
            },
            'focusout': function (ev) {
                //- Check if input is disabled
                if ($(ev.currentTarget).children(textarea ? 'textarea' : 'input').is('[disabled]'))
                    return;
                //- Check if has any input
                if (isEmpty($(ev.currentTarget).children(textarea ? 'textarea' : 'input').val()))
                    $(ev.currentTarget).removeClass('active');
                //- Remove class 'focused' & Apply CSS
                $(ev.currentTarget).removeClass('focused').filter('.label-raise')
                    .find('.text-input-element-label')
                    .css('color', $.defval($(ev.currentTarget).attr('label-color'), ''))
                    .end().end().css('color', '');
            },
            'valchange': function (ev) {
                if (typeof ev.value != 'string')
                    ev.value = ev.value.toString();
                $(ev.currentTarget).find(textarea ? 'textarea' : 'input').val(ev.value);
            },
            'attrchange': function (ev) {
                switch (ev.value[0]) {
                    case 'input-color':
                        $(ev.currentTarget).find(textarea ? 'textarea' : 'input').css('color', ev.value[1]);
                        break;
                    case 'bottom-color':
                        $(ev.currentTarget).find('.text-input-element-bottom').css('border-bottom-color', ev.value[1]);
                        break;
                    case 'label-color':
                        $(ev.currentTarget).find('.text-input-element-label').css('color', ev.value[1]);
                        break;
                    case 'textarea':
                        break;
                }
            },
        });
        //- Bind input events
        input.on({
            'valchange': function (ev) {
                //- Fire 'focusin' & 'focusout' events
                $(ev.currentTarget).parent('.text-input-element').focusin().focusout();
            },
            'change': function (ev) {
                $(ev.currentTarget).parent('.text-input-element').change();
            },
            'keypress keydown keyup mouseclick mousedown mouseup': function (ev) {
                //if (textarea)
                //    $(ev.currentTarget).height('auto').height($(ev.currentTarget).get(0).scrollHeight).resize()
                $(ev.currentTarget).parent('.text-input-element').trigger(ev);
            }
        });
        //- Refresh element effects
        refreshEffects(elm);
        //- Return element
        return elm;
    };
    jQuery.datepicker = function (label, theme, iconclass, texteffects) {
        //- Create local variables
        label = $.defval(label, 'Choose a date');
        theme = $.defval(theme, '#008aff');
        iconclass = $.defval(iconclass, 'far fa-calendar fa-fw');
        //- Create input
        var input = $.textinput(label, theme, texteffects).addClass('date-picker-element');
        //- Create icon
        var icon = $.icon(iconclass, 'text-input-icon date-picker-element-icon fa-layers fa-fw').ripple('rgba(0,0,0,.5)', null, false, true);
        //- Append to input
        input.append([icon]);
        //- Define utility functions
        var open = function () {
            //- Create local variables
            var now = new Date();
            var selected = new Date(input.find('input').val());
            var current = now;
            if (selected.toString() == 'Invalid Date')
                selected = null;
            //- Create dialog element
            var dialog = $.div('date-picker-dialog');
            //- Create table element
            var table = $.elem('table', 'date-picker-dialog-table');
            //- Define utility functions
            var showMonth = function (date) {
                //- Clear current days & Set current date
                $('.date-picker-dialog-week').remove();
                current = date;
                //- Iterate through the days of the specified date
                for (var i = 1; i <= date.daysInMonth(); i++) {
                    //- Create week element if needed
                    if (i == 1 || week.children().length == 7)
                        var week = $.elem('tr', 'date-picker-dialog-week').appendTo(table);
                    //- Gap date value
                    if (i == 1) {
                        var currentDay = new Date(date.getFullYear(), date.getMonth(), i);
                        for (var i2 = 0; i2 < currentDay.getDay(); i2++)
                            $.elem('td', 'date-picker-dialog-day date-picker-dialog-day-gap')
                                .text(currentDay.nextMonth(-1).daysInMonth() - i2)
                                .prependTo(week);
                    }
                    //- Create element
                    var elem = $.elem('td', 'date-picker-dialog-day').text(i).ripple(null, null, true, true)
                        .click(function (ev) {
                        current = new Date(date.getFullYear(), date.getMonth(), $(ev.currentTarget).text().toNumber());
                        input.val(current.dateToString('mm/dd/yyyy'));
                        close();
                    });
                    //- Check for current day
                    if (now.currentYear() == date.currentYear() && now.currentMonth() == date.currentMonth() && now.getDate() == i)
                        elem.addClass('date-picker-dialog-day-current');
                    //- Check for selected day
                    if (!isEmpty(selected) && selected.currentYear() == date.currentYear() && selected.currentMonth() == date.currentMonth() && selected.getDate() == i)
                        elem.addClass('date-picker-dialog-day-selected').css('background', theme).shadow('3dp');
                    else
                        elem.fadeIn(300);
                    //- Append element
                    elem.appendTo(week);
                }
                //- Set date header
                dateHeader.text(date.getFullYear() + ' ' + date.getMonthName());
            };
            //- Buttons wrapper
            var btns = $.div('date-picker-dialog-btns');
            //- Presets wrapper
            var presets = $.div('date-picker-dialog-presets');
            //- Date header button
            var dateHeader = $.div('date-picker-dialog-header-btn').appendTo(btns);
            //- Prev/next buttons
            var moveBtns = $.div('date-picker-dialog-move-btns fa-lg').appendTo(btns);
            var prevIcon = $.icon('fas fa-angle-left fa-fw', 'date-picker-dialog-move-btn').ripple(null, null, .1, true).click(function (ev) { return showMonth(current.nextMonth(-1)); }).appendTo(moveBtns);
            var nextIcon = $.icon('fas fa-angle-right fa-fw', 'date-picker-dialog-move-btn').ripple(null, null, .1, true).click(function (ev) { return showMonth(current.nextMonth()); }).appendTo(moveBtns);
            //- Day titles
            var titles = $.elem('tr', 'date-picker-dialog-titles'), gap = $.elem('th', 'date-picker-dialog-titles-gap');
            'S,M,T,W,T,F,S'.split(',').forEach(function (i) {
                //- Create element
                var elem = $.elem('th', 'date-picker-dialog-title').text(i);
                //- Append element
                elem.appendTo(titles);
            });
            //- presets
            var preset_now = $.div('date-picker-dialog-preset', 'NOW').appendTo(presets).css('color', theme).ripple().click(function (ev) {
                current = new Date();
                input.val(current.dateToString('mm/dd/yyyy'));
                close();
            });
            var preset_custom = $.div('date-picker-dialog-preset date-picker-dialog-preset-custom', 'CUSTOM') /*.appendTo(presets)*/.css('color', theme).ripple()
                .click(function (ev) {
                $.message('Custom date preset', '', { ACCEPT: function (ev) { } });
            });
            //- Append to table
            table.append([titles, gap]);
            //- Append to dialog
            dialog.append([btns, table, presets]);
            //- Show selected month
            showMonth($.defval(selected, now));
            //- Append & Align dialog element dialog
            dialog.shadow('6dp').appendTo('body')
                .cords(icon).bounds('screen')
                .fadeIn(50);
            presets.width(dialog.width());
            //- Bind dialog events
            dialog.out(close);
            //- Lock scroll
            $.scrollLock();
        };
        var close = function () {
            var ev = $('.date-picker-dialog').first()
                .fadeOut(200, function () {
                //- Remove element
                $(ev).remove();
                //- Unlock scroll
                $.scrollUnlock();
            });
        };
        //- Bind icon events
        icon.on({
            'click': function (ev) {
                //- Focus on text input
                $(ev.currentTarget).parent().find('input').focusin();
                //- Close any open dialogs
                close();
                //- Open dialog
                open();
            },
        });
        //- Bind input events
        input.on({
            'valchange change': function (ev) {
                icon.find('span').remove();
                var date = new Date($(ev.currentTarget).find('input').val());
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
                        .text(date.getDate());
            },
        });
        //- Bind element events
        input.on({
            'valchange': function (ev) { return $(ev.currentTarget).find('input').val(ev.value); },
        });
        //- Return element
        return input;
    };
    jQuery.selectmenu = function (options, color) {
        //- Create local variables
        var theme = $.defval(theme, color);
        //- Null check options
        if (isEmpty(options))
            options = {};
        //- Create menu
        var menu = $.div('select-menu');
        //- Parse options
        if ($.type(options) == 'array') {
            var tempoptions = {};
            options.forEach(function (i) { return tempoptions[i] = null; });
            options = tempoptions;
        }
        //- Iterate through the options
        $.props(options, function (f, n) {
            //- Create option
            var option = $.div('select-menu-option', n).ripple();
            //- Set option CSS
            option.css({
                'color': theme
            });
            //- Bind option events
            option.on({
                'click': function (ev) {
                    //- Execute callback if specified
                    if (!isEmpty(f))
                        f(ev);
                    //- Set target classes
                    $(ev.currentTarget).addClass('selected');
                    //- Execute event handlers
                    menu.change();
                },
                'select': function (ev) { return option.click(); }
            });
            //- Append option
            option.appendTo(menu);
        });
        //- Set menu CSS
        menu.shadow('5dp');
        //- Return menu
        return menu;
    };
    jQuery.dropdown = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var label = '', theme = '#008aff', options = [], texteffects = true, iconclass = 'fa fa-sort-down fa-fw';
        //- Parse specified arguments
        if (args.length == 1) {
            label = args[0];
        }
        else if (args.length == 2) {
            label = args[0];
            options = args[1];
        }
        else if (args.length == 3) {
            label = args[0];
            theme = args[1];
            options = args[2];
        }
        //- Parse specified options
        if ($.type(options) == 'array') {
            var obj = {};
            options.select(function (i) { return obj[i] = null; });
            options = obj;
        }
        else if ($.type(options) != 'object') {
            options = (_a = {}, _a[options] = null, _a);
        }
        //- Create input element
        var input = $.textinput(label, theme, texteffects).addClass('dropdown-element');
        //- Create icon element
        var icon = $.icon(iconclass, 'text-input-icon dropdown-element-icon').appendTo(input);
        //- Define utility functions
        var open = function (target) {
            if (!isEmpty(input.attr('disabled')) || !isEmpty(input.find('input').attr('disabled')))
                return;
            //- Lock scroll
            $.scrollLock();
            //- Close any previous dialogs
            $('.dropdown-element-dialog').each(function (i, e) { return close(e); });
            //- Create dropdown dialog
            var drp = $.div('dropdown-element-dialog').attr({ 'tab-index': -1 }).shadow('6dp').appendTo('body');
            //- Define utility functions
            var newOption = function (name, fn, noneOpt) {
                //- Create option element
                var opt = $.div('dropdown-element-dialog-option').text(name);
                if (noneOpt)
                    opt.addClass('none-option');
                //- Bind option effects
                opt.ripple();
                //- Bind option events
                opt.data('dropdown-option-function', fn).on({
                    'click': function (ev) {
                        if (!$(ev.currentTarget).parent().find('.selected').is(ev.currentTarget)) {
                            $(ev.currentTarget).select();
                            close(drp);
                        }
                    },
                    'select': function (ev) {
                        //- Define local variables
                        var tar = $(ev.currentTarget);
                        //- Set CSS & classes (1)
                        tar.parent().find('.selected').removeClass('selected').css('color', '');
                        //- Check if option is none option
                        if (!noneOpt) {
                            //- Set CSS & classes (2)
                            tar.addClass('selected').css('color', $.defval(tar.attr('selected-color'), theme));
                            //- Change input value
                            input.find('input').val(tar.text());
                        }
                        //- Check for specified function
                        if (!isEmpty(tar.data('dropdown-option-function')))
                            tar.data('dropdown-option-function')(ev.currentTarget);
                        //- Raise change event
                        drp.change();
                    },
                });
                //- Check if option is selected
                if ($(target).find('input').val() == name)
                    opt.select();
                //- Append option
                return opt.appendTo(drp);
            };
            //- Create default option
            if (!isEmpty(input.attr('no-none')))
                newOption('None', function (ev) { return input.val(''); }, true);
            //- Iterate through the options
            var opts = $.props($(target).data('dropdown-options'));
            if (input.hasAttr('sort'))
                opts.sort().forEach(function (i) { return newOption(i.Name, i.Value); });
            else
                opts.forEach(function (i) { return newOption(i.Name, i.Value); });
            //- Bind dropdown events
            drp.out(function (ev) { return close(ev.currentTarget); });
            drp.on({
                'keydown': function (ev) {
                    switch (ev.key) {
                        case 'Escape':
                            close(ev.currentTarget);
                            break;
                    }
                },
            });
            //- Align dropdown at target
            drp.cords(target)
                .css({
                'width': input.width(),
                'top': '+=' + input.height(),
            })
                .bounds('screen');
        };
        var close = function (target) {
            if (!$(target).hasClass('hide'))
                $(target).addClass('hide').fadeOut(200, function () {
                    //- Remove element
                    $(target).remove();
                    //- Unlock scroll
                    $.scrollUnlock();
                });
        };
        //- Bind icon events
        icon.on({
            'click': function (ev) { return open($(ev.currentTarget).parent().parent()); }
        });
        //- Bind input events
        input.on({
            'keyup': function (ev) {
                if (ev.keyCode == 32 || ev.keyCode == 13)
                    $(ev.currentTarget).parent().find('.dropdown-element-icon').click();
            },
            'click': function (ev) {
                open(ev.currentTarget);
            },
            'valchange': function (ev) {
                var match = $.props($(ev.currentTarget).data('dropdown-options')).contains(function (i) { return i.Name.toLowerCase() == ev.value.toLowerCase(); });
                if (!isEmpty(match))
                    $(ev.currentTarget).find('input').val(ev.value);
            }
        })
            .data({
            'dropdown-options': options,
        })
            .find('input').prop('readonly', true);
        //- Return element
        return input;
        var _a;
    };
    jQuery.snackbar = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var message = args.at(0), duration = 4500, action;
        //- Parse specified arguments
        if (args.length > 1) {
            //- Message and duration
            if ($.type(args[1]) == 'number') {
                duration = args.at(1, duration);
            }
            //- Message, action and duration
            else if ($.type(args[1]) == 'object') {
                action = args.at(1);
                duration = args.at(2, duration);
            }
            //- Message, actionText, actionFunction, duration
            else if ($.type(args[1]) == 'string') {
                action = $.button(args.at(1), '', args.at(2)).ripple();
                duration = args.at(3, duration);
            }
        }
        //- Create snackbar
        var snack = $.div('snackbar');
        //- Create snackbar message
        var text = $.elem('label', 'snackbar-message', message);
        //- Create utility functions
        var hide = function (target) {
            if (!$(target).is('.hide'))
                $(target).addClass('hide');
            return $(target).finishCss(function (ev) {
                $(ev.currentTarget).remove();
            });
        };
        //- Set action class
        if (!isEmpty(action))
            action.addClass('snackbar-action');
        //- Set snackbar CSS
        snack.shadow('4dp').hoverClass('hover');
        //- Remove previous snackbar
        hide('.snackbar');
        //- Append snackbar
        snack.append([text, action]).appendTo('body');
        //- Bind events
        snack.mouseleave(function (ev) {
            if ($(ev.currentTarget).hasClass('timeout'))
                hide(ev.currentTarget);
        });
        //- Hide snackback in duration of time
        if (duration > 0)
            setTimeout(function () {
                snack.addClass('timeout');
                if (!snack.hasClass('hover'))
                    hide(snack);
            }, duration);
        if (snack.outerWidth(true) >= $('html').width() / 2)
            snack.addClass('mobile');
        //- return snackbar
        return snack;
    };
    jQuery.tabs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //- Create local variables
        var items = [], theme = '#008aff';
        //- Parse specified arguments
        if ($.isval($.type(args[0]), 'string', 'number') || args[0] instanceof jQuery) {
            items.push([args[0], args[1]]);
            theme = $.defval(args[2], theme);
        }
        else if ($.type(args[0]) == 'object') {
            $.props(args[0], function (v, n) {
                items.push([n, v]);
            });
        }
        else if ($.type(args[0]) == 'array') {
            items = args[0].select(function (i) { return [i, null]; });
        }
        //- Create tabs wrapper
        var wrapper = $.div('tabs-wrapper'); /*.attr('slide-height', '')*/
        var tabs = $.div('tabs-menu');
        //- Create bottom wrapper
        var bottomWrapper = $.div('tabs-menu-divider-wrapper');
        var bottom = $.div('tabs-menu-divider-bottom');
        //- Create content view
        var view = $.div('tabs-menu-tab-content-viewer');
        //- Iterate through the items
        items.forEach(function (i) {
            //- Create tab
            var tab = $.div('tabs-menu-tab');
            //- Create tab label
            var label = $.div('tabs-menu-tab-label').append(i[0]);
            //- Create content
            var content = $.div('tabs-menu-tab-content-view').append($.valFn($.defval(i[1], '')));
            //- Bind tab events && data
            tab.on({
                'click select': function (ev) {
                    //- Check if tab is already selected
                    if ($(ev.currentTarget).is('.selected'))
                        return;
                    //- Remove previous selected tab
                    $(ev.currentTarget).siblings('.selected').removeClass('selected').css('color', '');
                    //- Set target classes and CSS
                    $(ev.currentTarget).addClass('selected').css('color', theme);
                    //- Create local variables
                    var left = $(ev.currentTarget).position().left, right = $(ev.currentTarget).parent().width() - ($(ev.currentTarget).position().left + $(ev.currentTarget).outerWidth());
                    //- Goes right
                    if (left - bottom.css('left').toNumber() < right - bottom.css('right').toNumber())
                        var transition = 'left .3s, right .5s cubic-bezier(0, 0, 0.34, .8)';
                    //- Goes left
                    else
                        var transition = 'left .5s cubic-bezier(0, 0, 0.34, .8), right .3s';
                    //- Set bottom CSS
                    bottom.css({
                        background: theme,
                        left: left,
                        right: right,
                        transition: transition
                    });
                    //- Hide previous content
                    view.replaceClass('active', 'hide').finishCss(function (ev) {
                        //- Show current content
                        $(ev.currentTarget).replaceClass('hide', 'active');
                        //- Slide height if specified
                        //if (wrapper.attr('slide-height') != null && !content.hasClass('height-adjusted')) {
                        //}
                        //- Show current view
                        $(ev.currentTarget).children('.tabs-menu-tab-content-view').css('display', 'none');
                        content.css('display', '');
                    });
                    wrapper.change();
                }
            }).data('tab-content', content);
            //- Append tab
            tab.append([label]).appendTo(tabs);
            //- Append view
            view.append([content]);
        });
        //- Append to divider wrapper
        bottomWrapper.append([bottom]);
        //- Append to tabs
        tabs.append([bottomWrapper]);
        //- Append to wrapper
        wrapper.append([tabs, '<hr>', view]);
        //- Return tabs
        return wrapper;
    };
    jQuery.checkbox = function (text, theme) {
        //- Create local variables
        theme = $.defval(theme, '#008aff');
        //- Create wrapper
        var wrapper = $.div('checkbox-wrapper').attr('tab-index', 1);
        //- Create label
        var label = $.div('checkbox-element-label', text);
        //- Create element wrapper
        var elementWrapper = $.div('checkbox-element-wrapper').ripple(theme, null, false, true, false);
        //- Create checkbox
        var checkbox = $.div('checkbox-element');
        //- Create input
        var input = $.elem('input', 'checkbox-element-input').attr('type', 'checkbox');
        //- Create checkbox frame
        var frame = $.div('checkbox-element-frame');
        //- Create background
        var background = $.div('checkbox-element-background').css('background', theme);
        var icon = $.icon('far fa-check', 'checkbox-element-background-icon').appendTo(background);
        //- Bind events
        input.on({
            'valchange change click': function (ev) {
                //- Create local variables
                var v = $(ev.currentTarget).val();
                if (!isEmpty(v))
                    v = parseBoolean(v);
                if (isEmpty(v) || v == false)
                    $(ev.currentTarget).removeAttr('checked').val('false').parentsUntil('.checkbox-wrapper').removeClass('checked');
                else if (!isEmpty(v) && v == true)
                    $(ev.currentTarget).attr('checked', '').val('true').parentsUntil('.checkbox-wrapper').addClass('checked');
            }
        });
        wrapper.on({
            'click': function (ev) {
                //- Set 'checked' attribute
                if ($(ev.currentTarget).find('input').hasAttr('checked'))
                    $(ev.currentTarget).val('false');
                else
                    $(ev.currentTarget).val('true');
                //- Raise 'change' event wrapper
                $(ev.currentTarget).change();
            },
            'valchange': function (ev) {
                //- Set value to input 
                $(ev.currentTarget).find('input').val(ev.value);
                //- Raise 'change' event wrapper
                $(ev.currentTarget).change();
            }
        });
        //- Append to checkbox
        checkbox.append([input, frame, background]);
        //- Append to element wrapper
        elementWrapper.append([checkbox]);
        //- Append to wrapper
        wrapper.append([elementWrapper, text != null ? label : null]);
        //- Set default value false
        wrapper.val('false');
        //- Return wrapper
        return wrapper;
    };
    jQuery.button = function (label, classes, fn) {
        //- Create button element
        var btn = $.elem('button', classes, label).attr('type', 'button');
        //- Set events
        btn.click(fn).ready(function (e) { return $(btn).mouseleave(); });
        //- Return button
        return btn;
    };
    jQuery.stepper = function (steps, theme) {
        //- Create local variables
        var id = random();
        //- Create stepper
        var stepper = $.elem('stepper').attr('direction', '1'), theme = $.defval(theme, '#008aff');
        //- Create steps & contents
        var stepsElm = $.elem('steps').data('stepper-id', id), contents = $.elem('contents').data('stepper-id', id);
        //- Define utility functions
        var createStep = function (name, v, index) {
            //- Create step
            var step = $.elem('step').ripple('rgba(0,0,0,.2)');
            //- Create title & icon
            var title = $.elem('step-title', '', name), icon = $.elem('step-icon', '', index + 1), content = $.elem('step-content', '', $.valFn(v)).attr('stage', index + 1);
            //- Set step events
            step.on({
                'click': function (ev) {
                    //- Raise target 'select' event
                    $(ev.currentTarget).select();
                },
                'select': function (ev) {
                    //- Remove any previous selections
                    $(ev.currentTarget).siblings('.selected').removeClass('selected').find('step-icon').css('background', '');
                    //- Set current target as selected
                    $(ev.currentTarget).addClass('selected').find('step-icon').css('background', theme);
                    // - Remove previous content selections
                    content.siblings('.selected').removeClass('selected'); //-.siblings('[stage=' + (i) + ']').removeClass('selected')
                    //- Show content
                    content.addClass('selected');
                    //- Align content if specified
                    if (stepper.hasClass('align-content'))
                        content.css('top', stepsElm.children('.selected').cords().top);
                    //- Raise stepper 'change' event
                    stepper.change();
                }
            });
            //- Append step
            step.append([title, icon]).appendTo(stepsElm);
            //- Append content
            content.appendTo(contents);
        };
        //- Parse steps
        if ($.isPlainObject(steps)) {
            //- Iterate thorugh the steps
            $.props(steps, function (v, n, i) { return createStep(n, v, i); });
        }
        else if ($.type(steps) == 'array') {
            //- Iterate thorugh the steps
            steps.forEach(function (n, i) { return createStep(n, null, i); });
        }
        else {
            //- Iterate thorugh the steps
            $(steps).each(function (i, e) { return createStep(e, null, i); });
        }
        //- Append line
        stepsElm.children('step:not(:last-of-type)').after($.elem('line'));
        //- Default select first step
        stepsElm.children('step:first-of-type').select();
        //- Append stepper        
        stepper.append([stepsElm, contents]);
        //- Return stepper
        return stepper;
    };
    //- Date
    Date.prototype.previousDaysBy = function (Days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() - Days);
    };
    Date.prototype.previousWeeksBy = function (Weeks) {
        return this.previousDaysBy((7 * Weeks));
    };
    Date.prototype.previousMonthsBy = function (Months) {
        return new Date(this.getFullYear(), this.getMonth() - Months, this.getDate());
    };
    Date.prototype.previousYearsBy = function (Years) {
        return this.previousMonthsBy((12 * Years));
    };
    Date.prototype.dateToString = function (Format) {
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
        Format = Format.replace('HH', Hours.length == 1 ? '0' + Hours : Hours);
        Format = Format.replace('MM', Minutes.length == 1 ? '0' + Minutes : Minutes);
        Format = Format.replace('SS', Seconds.length == 1 ? '0' + Seconds : Seconds);
        Format = Format.replace('MS', Milliseconds.length == 1 ? '0' + Milliseconds : Milliseconds);
        return Format;
    };
    Date.prototype.diffInDays = function (date) {
        var one_day = 1000 * 60 * 60 * 24;
        var date1_ms = this.getTime();
        var date2_ms = date.getTime();
        var difference_ms = date2_ms - date1_ms;
        return difference_ms / one_day;
    };
    Date.prototype.currentMonth = function () {
        return this.getUTCMonth() + 1; //months from 1-12
    };
    Date.prototype.currentYear = function () {
        return this.getUTCFullYear();
    };
    Date.prototype.daysInMonth = function () {
        return new Date(this.currentYear(), this.currentMonth(), 0).getDate();
    };
    Date.prototype.lastDayInMonth = function () {
        return new Date(this.currentYear(), this.currentMonth(), 0);
    };
    Date.prototype.nextDay = function (days) {
        if (days === void 0) { days = 1; }
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + days);
    };
    Date.prototype.nextMonth = function (months) {
        if (months === void 0) { months = 1; }
        return new Date(this.getFullYear(), this.getMonth() + months, this.getDate());
    };
    Date.prototype.nextYear = function (years) {
        if (years === void 0) { years = 1; }
        return new Date(this.getFullYear(), this.getMonth() + years, this.getDate());
    };
    Date.prototype.getMonthName = function () {
        var months = "January, February, March, April, May, June, July, August, September, October, November, December".split(', ');
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[this.getDay()];
    };
});
// #endregion
// #region Declarations
var endAnimationEvents = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
/**
* Represents information of a property from an object
*/
var MemberInfo = /** @class */ (function () {
    function MemberInfo(Name, Desc) {
        this.Name = Name;
        this.Desc = Desc;
    }
    Object.defineProperty(MemberInfo.prototype, "Value", {
        /**
         * Gets the value of the current member
         */
        get: function () {
            try {
                var val = this.Desc.value;
                if (val == undefined)
                    val = this.Desc.get();
                return val;
            }
            catch (e) { }
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Returns the current member info in the format [Name: Value]
    */
    MemberInfo.prototype.toString = function () {
        return '[' + this.Name + ': ' + this.Value + ']';
    };
    return MemberInfo;
}());
var ColorPalette;
(function (ColorPalette) {
    ColorPalette[ColorPalette["Black"] = 0] = "Black";
    ColorPalette[ColorPalette["White"] = 1] = "White";
    ColorPalette[ColorPalette["Red"] = 2] = "Red";
    ColorPalette[ColorPalette["Pink"] = 3] = "Pink";
    ColorPalette[ColorPalette["Purple"] = 4] = "Purple";
    ColorPalette[ColorPalette["DeepPurple"] = 5] = "DeepPurple";
    ColorPalette[ColorPalette["Indigo"] = 6] = "Indigo";
    ColorPalette[ColorPalette["Blue"] = 7] = "Blue";
    ColorPalette[ColorPalette["LightBlue"] = 8] = "LightBlue";
    ColorPalette[ColorPalette["Cyan"] = 9] = "Cyan";
    ColorPalette[ColorPalette["Teal"] = 10] = "Teal";
    ColorPalette[ColorPalette["Green"] = 11] = "Green";
    ColorPalette[ColorPalette["LightGreen"] = 12] = "LightGreen";
    ColorPalette[ColorPalette["Lime"] = 13] = "Lime";
    ColorPalette[ColorPalette["Yellow"] = 14] = "Yellow";
    ColorPalette[ColorPalette["Amber"] = 15] = "Amber";
    ColorPalette[ColorPalette["Orange"] = 16] = "Orange";
    ColorPalette[ColorPalette["DeepOrange"] = 17] = "DeepOrange";
    ColorPalette[ColorPalette["Brown"] = 18] = "Brown";
    ColorPalette[ColorPalette["Grey"] = 19] = "Grey";
    ColorPalette[ColorPalette["BlueGrey"] = 20] = "BlueGrey";
})(ColorPalette || (ColorPalette = {}));
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
};
/**
* Returns a random number
*/
function random() {
    return Math.random();
}
/**
* Returns if the specified value is empty (null or undefined)
*/
function isEmpty(val) {
    if (val == null || val == undefined)
        return true;
    else if (typeof val == 'string' && val.empty())
        return true;
    else if (typeof val == 'number' && (isNaN(val) || val == undefined || val == null))
        return true;
    return false;
}
/**
* Not empty
*/
function notEmpty() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var obj1 = args[0];
    var obj2 = args[1];
    if (args.length == 3) {
        var selector = args[2];
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
function getUrlValue(name) {
    try {
        return new URL(window.location.toString()).searchParams.get(name);
    }
    catch (e) { }
}
/**
* Sets the url value by the specified name and returns the full url
*/
function setUrlValue() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var parts = window.location.toString().split('#');
    var url = new URL(parts[0]);
    params.forEach(function (i) {
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
    return ('#' + document.location.hash).matches(/[#//](\w+)=([^/]+)\\*/g).select(function (i) { return { name: i[1], value: i[2] }; });
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
function getColorCode(palette, tone) {
    if (tone === void 0) { tone = '500'; }
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
function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
function pointWithin(point, bounderies, bounderiesStart) {
    if (bounderiesStart === void 0) { bounderiesStart = [0, 0]; }
    var pointX = point[0], pointY = point[1];
    var boundX = bounderies[0], boundY = bounderies[1];
    var boundXstart = bounderiesStart[0], boundYstart = bounderiesStart[1];
    return (pointX >= boundXstart && pointX <= boundX) && (pointY >= boundYstart && pointY <= boundY);
}
function clampPoint(point, bounderies, bounderiesStart, factor) {
    if (bounderiesStart === void 0) { bounderiesStart = [0, 0]; }
    if (factor === void 0) { factor = [0, 0]; }
    var pointX = point[0], pointY = point[1];
    var boundX = bounderies[0], boundY = bounderies[1];
    var boundXstart = bounderiesStart[0], boundYstart = bounderiesStart[1];
    var factorX = factor[0], factorY = factor[1];
    if (pointX < boundXstart)
        pointX = boundXstart + factorX;
    else if (pointX > boundX)
        pointX = boundX - factorX;
    if (pointY < boundYstart)
        pointY = boundYstart + factorY;
    else if (pointY > boundY)
        pointY = boundY - factorY;
    return [pointX, pointY];
}
function pointWithinScreen(point, bounderiesStart) {
    if (bounderiesStart === void 0) { bounderiesStart = [0, 0]; }
    return pointWithin(point, [screen.width, screen.height], bounderiesStart);
}
function clampPointInScreen(point, bounderiesStart, factor) {
    if (bounderiesStart === void 0) { bounderiesStart = [0, 0]; }
    if (factor === void 0) { factor = [0, 0]; }
    return clampPoint(point, [screen.width, screen.height], bounderiesStart, factor);
}
function num(v) {
    if (typeof (v) == 'string')
        return v.toNumber();
    else
        return v;
}
function clear() {
    console.clear();
}
function dateSwitchDaysAndMonths(date, delimiter) {
    if (isEmpty(date))
        return;
    var ddmmyy = date.split(delimiter);
    var dd = ddmmyy[0], mm = ddmmyy[1];
    ddmmyy[0] = mm;
    ddmmyy[1] = dd;
    return ddmmyy.join(delimiter);
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
            val = true;
        else if (val.toLowerCase() == 'false')
            val = false;
    }
    return new Boolean(val);
}
function isIOS() {
    var x1 = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var x2 = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    return x1 || x2;
}
var Clipboard = (function (window, document, navigator) {
    var textArea, copy;
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
        });
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
function scrollPrecentage(target, scrollTop) {
    if (scrollTop === void 0) { scrollTop = null; }
    //- Create local variables
    var target = $(target).get(0), customTop = !!scrollTop;
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
    $.clear(clearConsoleOnReadyDelay, function () { return clearConsoleOnReady; });
    //- Set default custom request error callback if not specified
    if (isEmpty(customRequestError))
        customRequestError = function (message, stacktrace) {
            //- Show snackbar
            $.snackbar(message, $.icon('far fa-exclamation-triangle fa-fw', 'error-icon'), 10000).addClass('error-snackbar');
            //- Create local variables
            var exception = new Error(message);
            //- Set exception stacktrace to the specified stacktrace
            if (!isEmpty(stacktrace))
                exception.stack = '\r\n' + stacktrace;
            //- Throw exception
            throw exception;
        };
    //- Apply default hyper classes
    $.hyper('mouseenter mouseleave mousedown mouseup focusin focusout', '[overlay]', function (ev) {
        //- Make sure target has 'overlay' attr
        if (!$(ev.currentTarget).hasAttr('overlay'))
            $(ev.currentTarget).attr('overlay', '1-2-3');
        //- Get overlay value
        var overlays = $(ev.currentTarget).attr('overlay').trim().split('-');
        //- Check for overlays length
        if (overlays.length == 1)
            overlays = [null, overlays[0], null];
        else if (overlays.length == 2)
            overlays = [null, overlays[0], overlays[1]];
        //- Define utility functions
        var setOverlay = function (target, opacity) {
            //- Check if target has overlay
            if ($(target).children('overlay').length <= 0)
                $.elem('overlay').appendTo(target);
            //- Set overlay background
            $(target).children('overlay').css({
                opacity: opacity,
                background: $(target).css('color')
            });
        };
        //- Set overlay by event
        switch (ev.type) {
            case 'mouseenter':
            case 'mouseup':
                if (!isEmpty(overlays[1]))
                    setOverlay(ev.currentTarget, (overlays[1].toNumber() / 10));
                break;
            case 'mousedown':
            case 'focusin':
                if (!isEmpty(overlays[2]))
                    setOverlay(ev.currentTarget, (overlays[2].toNumber() / 10));
                break;
            case 'mouseleave':
            case 'focusout':
                if (!isEmpty(overlays[0]))
                    setOverlay(ev.currentTarget, (overlays[0].toNumber() / 10));
                else
                    $(ev.currentTarget).children('overlay').remove();
                break;
        }
    });
    $.hyper('mouseenter mouseleave mousedown mouseup', '[float]', function (ev) {
        //- Make sure floating target has 'float' attr
        if (!$(ev.currentTarget).hasAttr('float'))
            $(ev.currentTarget).attr('float', '2-3-6');
        //- Get float value
        var floats = $(ev.currentTarget).attr('float').trim().split('-');
        //- Check for floats length
        if (floats.length == 1)
            floats = [null, floats[0], null];
        else if (floats.length == 2)
            floats = [null, floats[0], floats[1]];
        //- Set float by event
        switch (ev.type) {
            case 'mouseenter':
            case 'mouseup':
                if (!isEmpty(floats[1]))
                    $(ev.currentTarget).shadow(floats[1] + 'dp');
                break;
            case 'mousedown':
                if (!isEmpty(floats[2]))
                    $(ev.currentTarget).shadow(floats[2] + 'dp');
                break;
            case 'mouseleave':
                if (!isEmpty(floats[0]))
                    $(ev.currentTarget).shadow(floats[0] + 'dp');
                else
                    $(ev.currentTarget).shadow('');
                break;
        }
    });
    $.hyper('mouseenter mouseleave mousedown mouseup', '.action', function (ev) {
        if (!isEmpty($(ev.currentTarget).text()))
            $(ev.currentTarget).css('border-radius', '4px');
        else
            $(ev.currentTarget).css('border-radius', '');
    });
    $.hyper('click', '.next-step-btn', function (ev) {
        //- Get id
        var id = $(ev.currentTarget).parents('contents').data('stepper-id');
        //- Get corresponding steps
        $('steps').filter(function (i, e) { return $(e).data('stepper-id') == id; }).find('step.selected').nextAll('step').first().select();
    });
    //- Initiate needed default hyper classes
    $('[overlay], [float], .action').mouseleave();
    //- Identify IOS
    if (isIOS())
        $('html').attr('ios', '');
    else if (navigator.userAgent.match(/(android)|(webOS)/i))
        $('html').attr('mobile', '');
    else
        $('html').attr('desktop', '');
});
// #endregion
//# sourceMappingURL=Addons.js.map