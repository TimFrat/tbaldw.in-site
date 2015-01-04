var Backbone = require('backbone');

var Project = Backbone.Model.extend({
    defaults: {
        title: '',
        body: '',
        image: '',
        published: false,
        order: null,
        url: ''
    },

    initialize: function() {
        var img = 'img/projects/' + this.get('image');
        var published = !!this.get('published');
        this.set({
            'image': img,
            'published': published
        });
    },

    bodyPreview: function() {
        return abridge(this.get('body'), 4);
    },

    bodyBlurb: function() {
        return abridge(this.get('body'), 40);
    }
});

function abridge(body, limit) {
    if (!body) {
        return '';
    }
    var words = body.split(' ');
    var end = words.length > limit ? limit : words.length;
    var preview = words.slice(0, end).join(' ');
    return preview + '...';
}

module.exports = Project;
