import fastdom from 'fastdom';
import $ from 'common/utils/$';
import config from 'common/utils/config';
import detect from 'common/utils/detect';
import mediator from 'common/utils/mediator';
import proximityLoader from 'common/utils/proximity-loader';
import template from 'common/utils/template';
import debounce from 'lodash/functions/debounce';
import staticSocialTmpl from 'text!common/views/content/static-social-buttons.html';

function show() {
    fastdom.read(function() {
        if (($(document.body).scrollTop() > $('.meta__extras').offset().top)) {
            fastdom.write(function() {
                $('.social-fixed').addClass('social-fixed--show');
            });
        }
    });
}

function shouldRun() {
    var match = window.location.href.match(/[?&]CMP=([^&#]+)/);
    return (
        config.switches.staticSocialIconMobile &&
        detect.isBreakpoint({
            max: 'phablet'
        }) &&
        /has-fixed/.test(document.documentElement.className) &&
        (match && ['share_btn_fb', 'share_btn_tw'].indexOf(match[1]) > -1)
    );
}

function init() {
    var blockShortUrl = config.page.shortUrl,
        data = {
            fbUrl: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(blockShortUrl) + '/sfb',
            twUrl: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(config.page.webTitle) + '&url=' + encodeURIComponent(blockShortUrl) + '/stw'
        };

    if (shouldRun()) {
        fastdom.write(function() {
            $('.meta__social').append(template(staticSocialTmpl, data));
        });
    }

    mediator.on('window:scroll', debounce(show, 200));
}

export default init;
