import bean from 'bean';
import qwery from 'qwery';
import fastdom from 'fastdom';
import mediator from 'common/utils/mediator';
import detect from 'common/utils/detect';
import $ from 'common/utils/$';
var Navigation = {
    init: function() {
        this.copyMegaNavMenu();
        this.enableMegaNavToggle();
        this.replaceAllSectionsLink();

        if (detect.isIOS() && detect.getUserAgent.version > 5) {
            // crashes mobile safari < 6, so we add it here after detection
            fastdom.write(function() {
                $('.navigation__scroll').css({
                    '-webkit-overflow-scrolling': 'touch'
                });
            });
        }
    },

    copyMegaNavMenu: function() {
        var megaNavCopy = $.create($('.js-mega-nav').html()),
            placeholder = $('.js-mega-nav-placeholder');

        $('.global-navigation', megaNavCopy).addClass('global-navigation--top');

        fastdom.write(function() {
            placeholder.append(megaNavCopy);
        });
    },

    replaceAllSectionsLink: function() {
        $('.js-navigation-header .js-navigation-toggle').attr('href', '#nav-allsections');
    },

    enableMegaNavToggle: function() {
        bean.on(document, 'click', '.js-navigation-toggle', function(e) {
            var target = $('.' + e.currentTarget.getAttribute('data-target-nav'));

            e.preventDefault();
            fastdom.write(function() {
                target.toggleClass('navigation--expanded navigation--collapsed');
                mediator.emit(target.hasClass('navigation--expanded') ? 'modules:nav:open' : 'modules:nav:close');
            });
        });
    }
};

export default Navigation;
