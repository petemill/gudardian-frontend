import config from 'common/utils/config';

var effectiveMeasureUrl = (document.location.protocol === 'https:' ? 'https://au-ssl' : 'http://au-cdn') +
    '.effectivemeasure.net/em.js';

function load() {
    if (config.switches.effectiveMeasure) {
        return require(['js!' + effectiveMeasureUrl + '!exports=_EMeasure']);
    }
}

export default {
    load: load
};
