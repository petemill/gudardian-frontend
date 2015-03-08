import bonzo from 'bonzo';
import qwery from 'qwery';
import _ from 'common/utils/_';
import $ from 'common/utils/$';
import config from 'common/utils/config';
import detect from 'common/utils/detect';
import mediator from 'common/utils/mediator';
import requestAnimationFrame from 'common/utils/request-animation-frame';
import storage from 'common/utils/storage';
import toArray from 'common/utils/to-array';
import stocks from 'common/modules/business/stocks';
import GeoMostPopularFront from 'facia/modules/onwards/geo-most-popular-front';
import ContainerToggle from 'facia/modules/ui/container-toggle';
import containerShowMore from 'facia/modules/ui/container-show-more';
import lazyLoadContainers from 'facia/modules/ui/lazy-load-containers';
import snaps from 'facia/modules/ui/snaps';
import weather from 'facia/modules/onwards/weather';

var modules = {

        showSnaps: function() {
            snaps.init();
            mediator.on('modules:container:rendered', snaps.init);
        },

        showContainerShowMore: function() {
            mediator.addListeners({
                'modules:container:rendered': containerShowMore.init,
                'page:front:ready': containerShowMore.init
            });
        },

        showContainerToggle: function() {
            var containerToggleAdd = function(context) {
                $('.js-container--toggle', $(context || document)[0]).each(function(container) {
                    new ContainerToggle(container).addToggle();
                });
            };
            mediator.addListeners({
                'page:front:ready': containerToggleAdd,
                'modules:geomostpopular:ready': _.partial(containerToggleAdd, '.js-popular-trails')
            });
        },

        upgradeMostPopularToGeo: function() {
            if (config.switches.geoMostPopular) {
                new GeoMostPopularFront().go();
            }
        },

        showWeather: function() {
            if (config.switches.weather) {
                mediator.on('page:front:ready', function() {
                    weather.init();
                });
            }
        }
    },

    ready = function() {
        if (!this.initialised) {
            this.initialised = true;
            modules.showSnaps();
            modules.showContainerShowMore();
            modules.showContainerToggle();
            modules.upgradeMostPopularToGeo();
            lazyLoadContainers();
            stocks();
            modules.showWeather();
        }
        mediator.emit('page:front:ready');
    };

export default {
    init: ready
};
