// ================================================================ //
//                          - Addons -                              //
// ================================================================ //
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
        // Check the received arguments
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
                // in the set of matched elements
                this.each(function (i, e) {
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
                    // Get the meta info of the specified effect or template
                    // key before the current changes take place
                    const _metaPrev = Object.assign({}, _meta[key]);
                    // Extend the meta of the effect or template
                    _meta[key] = $.extend(_meta[key], values);
                    // Update the meta info of the current element
                    $(e).data('_meta', _meta);
                    // Sync the reference attributes of the current element
                    $(e).metaAttr(key, values);
                    // Raise the 'metaChanged' event of the specified effect
                    // or template for the current element
                    $(e).metaChange(key, values, _metaPrev);
                });
                // Return the original set of matched elements
                return this;
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
    $.fn.metaChange = function (...args) {
        // Check the received arguments
        if (typeof args[1] == 'function') {
            // Parse the received arguments
            var key = args[0], fn = args[1];
            // Bind the specified function to the 'metaChange' event
            // of the specified effect or template key and return the
            // original set of matched elements
            return $(this).on('metaChange', function (ev) {
                // Check if the 'metaChange' event is of the specified
                // effect or template key
                if (ev.metaKey == key) {
                    // Fire the specified callback function
                    fn(ev);
                }
            });
        }
        else {
            // Parse the received arguments
            var key = args[0], changes = args[1], prev = args[2];
            // Trigger the 'metaChange' event with info about the changes 
            // that had occured and return the original set of matched
            // elements
            return $(this).trigger($.Event('metaChange', {
                metaKey: key,
                metaChanges: changes,
                metaPrev: prev
            }));
        }
    };
    $.fn.metaAttr = function (...args) {
        // Check the received arguments
        if (args.length == 1 || typeof args[1] == 'boolean') {
            // Create local variables
            var attributes = {};
            // Parse received arguments
            var key = args[0], create = (args.length > 1) ? args[1] : false;
            // Iterate through each element in the current set of matched elements
            this.each(function (i, e) {
                // Iterate through the attributes of the current element
                $.each(e.attributes, function () {
                    // Check if current attribute match the format requirements
                    if (this.name.indexOf('-') != -1) {
                        // Parse the current attribute format with an regex expression.
                        var [attrKey, attrName] = /([^-]*)-(.*)/g.exec(this.name).slice(1);
                        // Check if current attribute is a reference attribute for the 
                        // specified effect or template key
                        if (attrKey.trim().toLowerCase() == key.trim().toLowerCase()) {
                            // Split the attribute name by '-' and capitalize all words
                            // excluding the first and join array back to string
                            attrName = attrName.split('-').map(function (v, i) {
                                return (i > 0) ? v.title() : v;
                            }).join('');
                            // Append the attributes to the set of matched reference attributes
                            attributes[attrName] = this.value;
                        }
                    }
                });
            });
            // Return the set of matched reference attributes
            return attributes;
        }
        else if (typeof args[1] == 'object') {
            // Parse received arguments
            var key = args[0], values = args[1];
            // Iterate through each element in the current set and return
            // the original set of matched elements
            return this.each(function (i, e) {
                // Iterate through the attributes of the current element
                $.each(e.attributes, function () {
                    // Check if current attribute match the format requirements
                    if (this.name.indexOf('-') != -1) {
                        // Parse the current attribute with a regex expression
                        var [attrKey, attrName] = /([^-]*)-(.*)/g.exec(this.name).slice(1);
                        // Check if current attribute is a reference attribute for the 
                        // specified effect or template key
                        if (attrKey.trim().toLowerCase() == key.trim().toLowerCase()) {
                            // Split the attribute name by '-' and capitalize all words
                            // excluding the first and join array back to string
                            attrName = attrName.split('-').map(function (v, i) {
                                return (i > 0) ? v.title() : v;
                            }).join('');
                            // Check if the specified values contains the current attribute
                            if (values[attrName] && this.value != values[attrName]) {
                                // Set the current attribute value
                                this.value = values[attrName];
                            }
                        }
                    }
                });
            });
        }
        else if (typeof args[1] == 'string') {
            // Parse received arguments
            var key = args[0], name = args[1], value = args[2];
            // Invoke 'metaAttr' function with the name and
            // value wrapped in an object form and return
            // the result
            return this.metaAttr(key, { [name]: value });
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
    };
    // String
    String.prototype.title = function () {
        return this.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };
});
// #endregion
// #region Variables
/** Observer type used to observe mutations in an html element. */
const Observer = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver);
// #endregion
// #region Runtime default
/** Observer manager */
$(function () {
    // Set default observer callbacks
    $('html').data('observer-callbacks', {});
    // Create observer
    var observer = new Observer(function (mutations) {
        // Get observer callbacks
        var callbacks = $('html').data('observer-callbacks');
        // Map each mutation to mutation & target elements, which are later
        // compared agaisnt each selector from the 'observer callbacks'
        var mutationTargets = mutations.map(function (mutation) {
            // Local variables
            var currentTargets = [];
            // Append added nodes, if any
            if (mutation.type == 'childList' && mutation.addedNodes.length > 0)
                currentTargets.push(...mutation.addedNodes);
            // Append target element, if not in current targets already
            else if (mutation.type == 'attributes' && currentTargets.indexOf(mutation.target) == -1)
                currentTargets.push(mutation.target);
            // Return current targets
            return [currentTargets, mutation];
        });
        // Iterate through each {selector: callback}, firing
        // callback by matching targets to selector
        for (var selector in callbacks) {
            // Local variables
            var callback = callbacks[selector];
            // Iterate through each of the mutation targets
            mutationTargets.forEach(mutationTarget => {
                // Check if current mutation target pass the criteria
                if ($(mutationTarget[0]).is(selector)) {
                    // Fire the callback function matched by the selector
                    callback.fire(mutationTarget[1], mutationTarget[0]);
                }
            });
        }
    });
    // Start observing
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        childList: true,
    });
    // ==========================
    // Runtime default observation
    // ==========================
    // 'Meta' Reference attributes manager
    $.observe(function (mutation, targets) {
        // Check if the mutation in the current targets is
        // of type 'attributes'
        if (mutation.type == 'attributes') {
            // Iterate through each of the mutation targets
            $(targets).each(function (i, e) {
                // Check if current attribute match the format requirements
                if (mutation.attributeName.indexOf('-') != -1) {
                    // Split the mutated attribute name by '-'
                    var attribute = mutation.attributeName.split('-');
                    // Get the mutated attribute key & name
                    var [attrKey, attrName] = [attribute[0], attribute.slice(1).join('-')];
                    // Get the mutated attribute value
                    var attrValue = $(e).attr(mutation.attributeName);
                    // Split the attribute name by '-' and capitalize all words
                    // excluding the first and join array back to string
                    attrName = attrName.split('-').map(function (v, i) {
                        return (i > 0) ? v.title() : v;
                    }).join('');
                    // Update the meta value
                    $(e).meta(attrKey, attrName, attrValue);
                }
            });
        }
    });
});
// #endregion
//# sourceMappingURL=Addons.js.map