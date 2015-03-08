import $ from 'common/utils/$';
import config from 'common/utils/config';
import detect from 'common/utils/detect';
var outbrainUrl = '//widgets.outbrain.com/outbrain.js';

function load() {
    if (config.switches.outbrain) {
        var widgetIds = {
            mobile: 'MB_2',
            tablet: 'MB_1',
            desktop: 'AR_11',
            wide: 'AR_11'
        };
        $('.OUTBRAIN')
            .first()
            .attr('data-widget-id', widgetIds[detect.getBreakpoint()]);
        return require(['js!' + outbrainUrl + '!exports=outbrain']);
    }
}

export default {
    load: load
};
