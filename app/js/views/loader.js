var _ = require('underscore');
var BaseView = require('./base');
var Pubsub = require('../lib/pubsub');
var Loader = require('../lib/loader');
var projects = require('../collections/projects');


var LoaderView = BaseView.extend({
    tagName: 'section',
    className: 'loader hide',
    template: require('./loader.hbs'),

    initialize: function(opts) {
        opts = opts || {};
        this.loader = new Loader(opts.resources);
        this.listenTo(this.loader, 'progress', this.onProgress);
        this.listenTo(this.loader, 'complete', this.onComplete);
        this.loadProjectAssets();
    },

    postRender: function() {
        _.delay(function() {
            this.$el.removeClass('hide');
            _.delay(this.loader.start.bind(this.loader), 400);
        }.bind(this), 100);
    },

    onProgress: function(perc) {
        perc = (perc * 100) | 0;
        this.setProgress(perc);
    },

    setProgress: function(perc) {
        this.$('.progress span').css({
            'width': perc + '%'
        });
    },

    loadProjectAssets: function() {
        var imgs = projects.published().pluck('image');
        new Loader(imgs).start();
    },

    onComplete: function() {
        this.setProgress(100);
        this.$el.addClass('hide');
        _.delay(function() {
            this.remove();
            Pubsub.trigger('app:ready');
        }.bind(this), 1200);
    }
});

module.exports = LoaderView;
