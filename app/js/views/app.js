var BaseView = require('./base');
var Pubsub = require('../lib/pubsub');
var AppState = require('../lib/app_state');
var LoaderView = require('./loader');
var MenuView = require('./menu');

var AppView = BaseView.extend({
    el: '#app',

    initialize: function() {
        document.addEventListener('keyup', Pubsub.trigger.bind(Pubsub, 'document:keyup'));
        window.addEventListener('resize', Pubsub.trigger.bind(Pubsub, 'window:resize'));
        this.listenTo(Pubsub, 'navigate', this.onNavigate);
        this.listenTo(Pubsub, 'app:ready', this.onAppReady);
    },

    render: function() {
        var loader = new LoaderView({
            'resources': [AppState.get('backstretch'),
                          'img/logo-knockout.png',
                          'img/headshot.jpg']
        });
        this.el.innerHTML = '';
        this.el.appendChild(loader.render().el);
        return this;
    },

    onAppReady: function() {
        var menu = new MenuView();
        this.el.innerHTML = '';
        this.el.appendChild(menu.render().el);
    },

    onNavigate: function(view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.el.appendChild(view.render().el);
        this.currentView = view;
        if (view.animateIn) {
            setTimeout(view.animateIn.bind(view), 500);
        }
    }
});

module.exports = AppView;
