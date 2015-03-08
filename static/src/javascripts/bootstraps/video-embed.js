/* global videojs, guardian */
import bean from 'bean';
import bonzo from 'bonzo';
import qwery from 'qwery';
import videojs from 'videojs';
import videojsembed from 'videojsembed';
import _ from 'common/utils/_';
import $ from 'common/utils/$';
import config from 'common/utils/config';
import deferToAnalytics from 'common/utils/defer-to-analytics';
import template from 'common/utils/template';
import Omniture from 'common/modules/analytics/omniture';
import Component from 'common/modules/component';
import techOrder from 'common/modules/video/tech-order';
import events from 'common/modules/video/events';
import fullscreener from 'common/modules/video/fullscreener';
import svgs from 'common/views/svgs';
import loadingTmpl from 'text!common/views/ui/loading.html';
import titlebarTmpl from 'text!common/views/media/titlebar.html';

var omniture = new Omniture(window.s);

function initLoadingSpinner(player) {
    player.loadingSpinner.contentEl().innerHTML = loadingTmpl;
}

function createVideoPlayer(el, options) {
    var player;

    options.techOrder = techOrder(el);
    player = videojs(el, options);

    if (events.handleInitialMediaError(player)) {
        player.dispose();
        options.techOrder = techOrder(el).reverse();
        player = videojs(el, options);
    }

    return player;
}

function addTitleBar() {
    var data = {
        webTitle: config.page.webTitle,
        pageId: config.page.pageId,
        icon: svgs('marque36icon')
    };
    $('.vjs-control-bar').after(template(titlebarTmpl, data));
    bean.on($('.vjs-title-bar')[0], 'click', function(e) {
        omniture.logTag({
            tag: 'Embed | title bar',
            sameHost: false,
            samePage: false,
            target: e.target
        });
    });
}

function initEndSlate(player) {
    var endSlate = new Component(),
        endState = 'vjs-has-ended';

    endSlate.endpoint = config.page.externalEmbedHost + $('.js-gu-media--enhance').first().attr('data-end-slate');

    endSlate.fetch(player.el(), 'html').then(function() {
        $('.end-slate-container .fc-item__action').each(function(e) {
            e.href += '?CMP=embed_endslate';
        });
        bean.on($('.end-slate-container')[0], 'click', function(e) {
            omniture.logTag({
                tag: 'Embed | endslate',
                sameHost: false,
                samePage: false,
                target: e.target
            });
        });
    });

    player.on('ended', function() {
        bonzo(player.el()).addClass(endState);
    });

    player.on('playing', function() {
        bonzo(player.el()).removeClass(endState);
    });
}

function initPlayer() {

    videojs.plugin('fullscreener', fullscreener);

    bonzo(qwery('.js-gu-media--enhance')).each(function(el) {
        var player,
            mouseMoveIdle,
            $el = bonzo(el).addClass('vjs vjs-tech-' + videojs.options.techOrder[0]),
            mediaId = $el.attr('data-media-id');

        bonzo(el).addClass('vjs');

        player = createVideoPlayer(el, {
            controls: true,
            autoplay: !!window.location.hash && window.location.hash === '#autoplay',
            preload: 'metadata', // preload='none' & autoplay breaks ad loading on chrome35
            plugins: {
                embed: {
                    embeddable: guardian.config.switches.externalVideoEmbeds && guardian.config.page.embeddable,
                    location: 'https://embed.theguardian.com/embed/video/' + guardian.config.page.pageId
                }
            }
        });

        //Location of this is important
        events.handleInitialMediaError(player);

        player.ready(function() {
            var vol;

            initLoadingSpinner(player);
            addTitleBar();
            initEndSlate(player);

            events.bindGlobalEvents(player);

            // unglitching the volume on first load
            vol = player.volume();
            if (vol) {
                player.volume(0);
                player.volume(vol);
            }

            player.fullscreener();

            if (config.switches.thirdPartyEmbedTracking) {
                deferToAnalytics(function() {
                    events.initOphanTracking(player, mediaId);
                    events.initOmnitureTracking(player);
                    events.bindContentEvents(player);
                });

                omniture.go();
            }
        });

        mouseMoveIdle = _.debounce(function() {
            player.removeClass('vjs-mousemoved');
        }, 500);

        // built in vjs-user-active is buggy so using custom implementation
        player.on('mousemove', function() {
            player.addClass('vjs-mousemoved');
            mouseMoveIdle();
        });
    });
}

export default {
    init: initPlayer
};
/* jshint unused: false */
/* global guardian */
