var _ = require('underscore');
var BaseView = require('./base');
var projects = require('../collections/projects');
var ProjectView = require('./project');

var WorkView = BaseView.extend({
    tagName: 'section',
    className: 'work',

    initialize: function() {
        this.subviews = [];
    },

    postRender: function() {
        this.addAll(projects.published());
    },

    addAll: function(projects) {
        var els = projects.map(function(project) {
            var view = new ProjectView({'model' : project});
            this.subviews.push(view);
            return view.render().el;
        }.bind(this));
        this.$el.append(els);
    },

    animateIn: function() {
        window.scroll(0, 0);
        _.each(this.subviews, function(subview, i) {
            subview.trigger('animate-in', i);
        });
    },

    animateOut: function() {
        _.each(this.subviews, function(subview, i) {
            subview.trigger('animate-out', i);
        });
        this.$el.addClass('animate-out');
    },

    remove: function() {
        this.animateOut();
        setTimeout(BaseView.prototype.remove.bind(this), 450);
    }
});

module.exports = WorkView;
