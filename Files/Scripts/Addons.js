//================================================================//
//                          - Addons -                            //
//================================================================//
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
    $.fn.observe = function (fn, options) {
        // Parse received options
        options = $.extend({ attributes: true, characterData: true, childList: true }, options);
        // Create local observer
        var observer = new Observer(fn, options);
        // Return current jquery element
        return this;
    };
});
// #endregion
// #region Variables
/** Observer type used to observe mutations in an html element. */
const Observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
// #endregion
//# sourceMappingURL=Addons.js.map