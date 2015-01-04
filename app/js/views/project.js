var BaseView = require('./base');
// var converter = require('../lib/converter');
var projectTemplate = require('./project.hbs');

var ProjectView = BaseView.extend({
    className: 'project',

    template: projectTemplate,

    initialize: function() {
        this.listenTo(this, 'animate-in', this.animateIn);
        this.listenTo(this, 'animate-out', this.animateOut);
    },

    getRenderCtx: function() {
        var ctx = this.model.toJSON();
        // ctx['bodyBlurb'] = converter.makeHtml(this.model.bodyBlurb());
        // ctx['body'] = converter.makeHtml(ctx['body']);
        return ctx;
    },

    animateIn: function(i) {
        var list = this.el.classList;
        setTimeout(list.add.bind(list, 'show'), i * 100);
    },

    animateOut: function(i) {
        var list = this.el.classList;
        setTimeout(list.add.bind(list, 'animate-out'), i * 60);
    }
});

module.exports = ProjectView;
