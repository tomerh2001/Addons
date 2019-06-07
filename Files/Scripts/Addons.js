// ================================================================//
//                          - Addons -                             //
// ================================================================//
// ~
// The 'Addons' libary is an intellectual-property.
// you are not allowed to redistribute or sell the content of this libary
// as yours, all rights reserved to Tomer Horowitz (@Tomergt45).
//
// Partially inspired by Google Material-Design.
//
// Requirements:
// JQuery
//
// Libary contains:
// - Predefined element templates.
// - UI Special effects.
// - Extention/Utility functions.
// ~
// #endregion
// #region Extentions - Initialization
$(function () {
    // JQuery
    $.fn.meta = function (...args) {
        // Check for any received arguments
        if (args.length == 0) {
            // Return the meta info of the first element
            // in the set of matched elements
            return this.data('_meta');
        }
        else {
            // Parse arguments
            if (args.length == 1) {
                // Parse key from arguments
                var key = args[0];
                // Get the meta info of the first element
                // in the set of matched elements
                var _meta = this.data('_meta');
                // Check if meta contains specified effect or
                // template key
                if (_meta && key in _meta)
                    return _meta[key];
            }
            else if (args.length == 2) {
                // Parse key and values from arguments
                var key = args[0], values = args[1];
                // Iterate through each of the elements
                // in the set of matched elements and return
                // the original set of matched elmenets
                return this.each(function (i, e) {
                    // Get the meta info of the current element
                    // in the set of matched elements
                    var _meta = $(e).data('_meta');
                    // Check if meta exists and contains specified effect or
                    // template key
                    if (!_meta) {
                        // Set meta as an empty object
                        _meta = {};
                    }
                    else if (!(key in _meta)) {
                        // Create empty object if meta does not contain
                        // the specified effect or template key
                        _meta[key] = {};
                    }
                    // Extend the meta of the effect or template
                    _meta[key] = $.extend(_meta[key], values);
                    // Update the meta info of the current element
                    $(e).data('_meta', _meta);
                });
            }
            else if (args.length == 3) {
                // Parse key, name and value from arguments
                var key = args[0], name = args[1], value = args[2];
                // Invoke 'meta' function with the name and
                // value wrapped in an object form and return
                // the result
                return this.meta(key, { [name]: value });
            }
        }
    };
    // JQueryStatic
    $.observe = function (...args) {
        // Parse arguments
        if (args.length == 1) {
            // Parse function and selector
            var fn = args[0], selector = "*";
        }
        else {
            // Parse function and selector
            var selector = args[0], fn = args[1];
        }
        // Get current observer callbacks
        var callbacks = $('html').data('observer-callbacks');
        // Append observer callback
        if (selector in callbacks)
            callbacks[selector].add(fn);
        else
            callbacks[selector] = $.Callbacks().add(fn);
        // Set observer callbacks
        $('html').data('observer-callbacks', callbacks);
        // Raise callback for the current elements matching the selector
        $(selector).each((i, e) => fn(e));
    };
});
// #endregion
// #region Variables
/** Observer type used to observe mutations in an html element. */
const Observer = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver);
// #endregion
// #region Runtime default
$(function () {
    // Set default observer callbacks
    $('html').data('observer-callbacks', {});
    // Create observer
    var observer = new Observer(function (mutations) {
        // Get observer callbacks
        var callbacks = $('html').data('observer-callbacks');
        // Map each mutation to a target elements, which are later
        // compared agaisnt each selector from the 'observer callbacks'
        var targets = mutations.map(function (mutation) {
            // Local variables
            var currentTargets = [];
            // Append added nodes, if any
            if (mutation.type == 'childList' && mutation.addedNodes.length > 0)
                currentTargets.push(...mutation.addedNodes);
            // Append target element, if not in current targets already
            else if (mutation.type == 'attributes' && currentTargets.indexOf(mutation.target) == -1)
                currentTargets.push(mutation.target);
            // Return current targets
            return currentTargets;
        }).flat();
        // Iterate through each {selector: callback}, firing
        // callback by matching targets to selector
        for (var selector in callbacks) {
            // Local variables
            var callback = callbacks[selector];
            var matchedTargets = $(targets).filter(selector);
            // Fire callback function if any targets
            // matched by the selector
            matchedTargets.each((i, e) => callback.fire(e, i));
        }
    });
    // Start observing
    observer.observe($('html').get(0), {
        attributes: true,
        subtree: true,
        childList: true,
    });
});
// #endregion
//# sourceMappingURL=Addons.js.map