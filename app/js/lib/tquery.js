var $ = function(selector) {
    return new tQuery(selector);
};

var tQuery = function(selector, context) {
    var el;

    if (selector && selector.nodeType || selector === window) {
        el = selector;
    } else if (typeof selector === 'string') {
        if (selector.indexOf('<') === 0) {
            var tag = selector.replace('<', '').replace('>', '');
            el = document.createElement(tag);
        } else {
            el = (context || document).querySelector(selector);
        }
    } else if (selector instanceof tQuery) {
        return selector;
    } else {
        throw 'Error creating tQuery object: ' + selector;
    }

    this[0] = el;
};

tQuery.prototype = {
    find: function(selector) {
        return new tQuery(selector, this[0]);
    },

    remove: function() {
        this[0].parentNode.removeChild(this[0]);
    },

    on: function(event, handler) {
        this[0].addEventListener(event, handler);
    },

    off: function(event, handler) {
        this[0].removeEventListener(event, handler);
    },

    attr: function(obj) {
        for (var key in obj) {
            this[0].setAttribute(key, obj[key]);
        }
        return this;
    }
};

module.exports = $;
