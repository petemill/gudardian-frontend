import config from 'common/utils/config';

var ammaUrl = '//c.supert.ag/the-guardian/the-guardian/supertag-async.js';

function load() {
    if (config.switches.amaa) {
        return require(['js!' + ammaUrl + '!exports=superT']);
    }
}

export default {
    load: load
};
