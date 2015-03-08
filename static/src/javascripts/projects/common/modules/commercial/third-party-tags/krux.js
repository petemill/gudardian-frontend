import config from 'common/utils/config';
import cookies from 'common/utils/cookies';
import storage from 'common/utils/storage';

function load() {
    if (config.switches.krux) {
        return require(['js!' + '//cdn.krxd.net/controltag?confid=JVZiE3vn']);
    }
}

function retrieve(n) {
    var k = 'kx' + n;

    return storage.local.getRaw(k) || cookies.get(k + '=([^;]*)') || '';
}

function getSegments() {
    return retrieve('segs') ? retrieve('segs').split(',') : [];
}

export default {
    load: load,
    getSegments: getSegments
};
