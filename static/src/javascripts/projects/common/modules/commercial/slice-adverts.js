import bonzo from 'bonzo';
import qwery from 'qwery';
import contains from 'lodash/collections/contains';
import defaults from 'lodash/objects/defaults';
import $ from 'common/utils/$';
import _ from 'common/utils/_';
import config from 'common/utils/config';
import createAdSlot from 'common/modules/commercial/create-ad-slot';
import userPrefs from 'common/modules/user-prefs';

var adNames = ['inline1', 'inline2'],
    init = function(options) {

        if (!config.switches.standardAdverts) {
            return false;
        }

        var container, containerId, $adSlice, isFrontFirst,
            opts = defaults(
                options || {}, {
                    containerSelector: '.fc-container',
                    sliceSelector: '.js-fc-slice-mpu-candidate'
                }
            ),
            // get all the containers
            containers = qwery(opts.containerSelector),
            index = 0,
            adSlices = [],
            containerGap = 1,
            prefs = userPrefs.get('container-states');

        // pull out ad slices which are have at least x containers between them
        while (index < containers.length) {
            container = containers[index],
                containerId = bonzo(container).data('id'),
                $adSlice = $(opts.sliceSelector, container),
                // don't display ad in the first container on the fronts
                isFrontFirst = contains(['uk', 'us', 'au'], config.page.pageId) && index === 0;

            if ($adSlice.length && !isFrontFirst && (!prefs || prefs[containerId] !== 'closed')) {
                adSlices.push($adSlice.first());
                index += (containerGap + 1);
            } else {
                index++;
            }
        }

        _(adSlices)
            .slice(0, adNames.length)
            .forEach(function($adSlice, index) {
                var adName = adNames[index],
                    $mobileAdSlot = bonzo(createAdSlot(adName, 'container-inline'))
                    .addClass('ad-slot--mobile'),
                    $tabletAdSlot = bonzo(createAdSlot(adName, 'container-inline'))
                    .addClass('ad-slot--not-mobile');

                // add a tablet+ ad to the slice
                $adSlice
                    .removeClass('fc-slice__item--no-mpu')
                    .append($tabletAdSlot);
                // add a mobile advert after the container
                $mobileAdSlot
                    .insertAfter($.ancestor($adSlice[0], 'fc-container'));
            })
            .valueOf();

        return adSlices;
    };

export default {

    init: init

};
