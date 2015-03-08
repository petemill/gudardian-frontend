import bean from 'bean';
import $ from 'common/utils/$';
import _ from 'common/utils/_';
import detect from 'common/utils/detect';
import config from 'common/utils/config';

var browsers = {
        'Firefox': '25',
        'Chrome': '28',
        'IE': '9',
        'Opera': '14',
        'Safari': '6'
    },
    closeCls = 'vjs-error-display__close',
    ua = detect.getUserAgent,
    message = 'Your browser is no longer supported. <a href="http://whatbrowser.org" target="_blank">Update your browser?</a> <button class="' + closeCls + '">close</button>';

function bindClose(player) {
    bean.on($('.' + closeCls)[0], 'click', function() {
        player.error(null);
    });
}

export default function supportedBrowser(player) {
    var notSupported = _.some(browsers, function(version, browser) {
        return (ua.browser === browser && ua.version < version);
    });

    if (notSupported && config.switches.mediaPlayerSupportedBrowsers) {
        player.error(message);
        bindClose(player);
    }
};
