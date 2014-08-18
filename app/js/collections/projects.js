var Backbone = require('backbone');
var Project = require('../models/project');

var Projects = Backbone.Collection.extend({
    url: 'projects.json',

    model: Project,

    published: function() {
        return new Projects(this.where({ published : true }));
    },

    comparator: function(project) {
        return project.get('order');
    }
});

// this is a singleton
module.exports = new Projects();
