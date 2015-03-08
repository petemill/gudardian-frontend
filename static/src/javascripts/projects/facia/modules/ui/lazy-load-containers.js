import bonzo from 'bonzo';
import fastdom from 'fastdom';
import qwery from 'qwery';
import _ from 'common/utils/_';
import detect from 'common/utils/detect';
import mediator from 'common/utils/mediator';
var distanceBeforeLoad = detect.getViewport().height;

export default function() {
    var $frontBottom = bonzo(qwery('.js-front-bottom')),
        containers = qwery('.js-container--lazy-load'),
        lazyLoad = function() {
            if (containers.length === 0) {
                mediator.off('window:scroll', lazyLoad);
            } else {
                fastdom.read(function() {
                    var scrollTop = bonzo(document.body).scrollTop(),
                        scrollBottom = scrollTop + bonzo.viewport().height,
                        bottomOffset = $frontBottom.offset().top,
                        $container;

                    if (scrollBottom > bottomOffset - distanceBeforeLoad) {
                        $container = bonzo(containers.shift());

                        fastdom.write(function() {
                            $container.removeClass('fc-container--lazy-load');
                        });
                    }
                });
            }
        };

    mediator.on('window:scroll', lazyLoad);
    lazyLoad();
};
