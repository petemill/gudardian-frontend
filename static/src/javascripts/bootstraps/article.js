import fence from 'fence';
import qwery from 'qwery';
import $ from 'common/utils/$';
import config from 'common/utils/config';
import detect from 'common/utils/detect';
import mediator from 'common/utils/mediator';
import flyers from 'common/modules/article/flyers';
import openModule from 'common/modules/article/open-module';
import staticSocial from 'common/modules/article/static-social';
import truncate from 'common/modules/article/truncate';
import twitter from 'common/modules/article/twitter';
import geoMostPopular from 'common/modules/onward/geo-most-popular';
import OpenCta from 'common/modules/open/cta';
import rhc from 'common/modules/ui/rhc';
import selectionSharing from 'common/modules/ui/selection-sharing';

var modules = {

        initOpenCta: function() {
            if (config.switches.openCta && config.page.commentable) {
                var openCta = new OpenCta(mediator, {
                    discussionKey: config.page.shortUrl.replace('http://gu.com/', '')
                });

                $.create('<div class="open-cta"></div>').each(function(el) {
                    openCta.fetch(el);
                    if (!config.page.isLiveBlog) {
                        rhc.addComponent(el);
                    }
                });
            }
        },

        initFence: function() {
            $('.fenced').each(function(el) {
                fence.render(el);
            });
        },

        initTruncateAndTwitter: function() {
            // Ensure that truncation occurs before the tweet upgrading.
            truncate();
            twitter.init();
            twitter.enhanceTweets();
        },

        initStaticSocial: function() {
            staticSocial();
        },

        initRightHandComponent: function() {
            var mainColumn = qwery('.js-content-main-column');
            // only render when we have >1000px or more (enough space for ad + most popular)
            if (mainColumn[0] && mainColumn[0].offsetHeight > 1000 && !detect.isBreakpoint('mobile')) {
                geoMostPopular.render();
            }
        },

        initSelectionSharing: function() {
            selectionSharing.init();
        }
    },

    ready = function() {
        modules.initOpenCta();
        modules.initFence();
        modules.initTruncateAndTwitter();
        modules.initRightHandComponent();
        modules.initSelectionSharing();
        modules.initStaticSocial();
        flyers.upgradeFlyers();
        flyers.insertTagFlyer();
        openModule.init();

        mediator.emit('page:article:ready');
    };

export default {
    init: ready,
    modules: modules // exporting for LiveBlog bootstrap to use
};
