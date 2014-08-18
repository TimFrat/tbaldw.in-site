var _ = require('underscore');
var Backbone = require('backbone');

var Loader = function(resources) {
    this.resources = resources;
    this.toLoad = resources.length;
    this.loaded = 0;
    _.extend(this, Backbone.Events);
};

Loader.prototype.start = function() {
    _.each(this.resources, function(url) {
        var img = new Image();
        img.src = url;
        img.onload = this.onload.bind(this, img);
    }.bind(this));
};

Loader.prototype.onload = function(img) {
    this.loaded += 1;
    this.trigger('progress', this.loaded / this.toLoad, img);
    if (this.loaded === this.toLoad) {
        this.trigger('complete');
    }
};

module.exports = Loader;
