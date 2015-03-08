import defaults from 'lodash/objects/defaults';
import config from 'common/utils/config';
import cookies from 'common/utils/cookies';
import urlUtils from 'common/utils/url';

var netId = '1476',
    cookieName = 'cto2_guardian',
    criteoUrl = '//rtax.criteo.com/delivery/rta/rta.js',
    varName = 'crtg_content';

function getSegments() {
    var cookieValue = decodeURIComponent(cookies.get(cookieName));
    return (config.switches.criteo && cookieValue) ? urlUtils.getUrlVars({
        query: cookieValue
    }) : {};
}

function load() {
    if (config.switches.criteo) {
        var query = urlUtils.constructQuery({
            netid: netId,
            cookieName: cookieName,
            rnd: Math.floor(Math.random() * 99999999999),
            varName: varName
        });
        return require(['js!' + criteoUrl + '?' + query + '!exports=' + varName]);
    }
}

export default {
    load: load,
    getSegments: getSegments
};
