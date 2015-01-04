var BaseView = require('./base');
var aboutTemplate = require('./about.hbs');

var AboutView = BaseView.extend({
    tagName: 'section',
    className: 'about',
    template: aboutTemplate,

    animateIn: function() {
        window.scroll(0, 0);
        this.el.classList.add('show');
    },

    animateOut: function() {
        this.el.classList.add('animate-out');
    },

    remove: function() {
        this.animateOut();
        setTimeout(BaseView.prototype.remove.bind(this), 200);
    }
});

module.exports = AboutView;
