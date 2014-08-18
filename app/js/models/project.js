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

    parse: function(res) {
        res.published = !!res.published;
        var imgPath = ENV === 'dev' ? 'img/projects/' :
                                      'https://s3.amazonaws.com/tbaldw.in-project-imgs/';
        res.image = res.image ? imgPath + res.image : null;
        return res;
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
