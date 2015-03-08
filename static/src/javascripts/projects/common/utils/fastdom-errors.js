// Record errors within fastdom:
// https://github.com/wilsonpage/fastdom#exceptions

import fastdom from 'fastdom';
import raven from 'raven';
fastdom.onError = function(error) {
    raven.captureException(error, {
        tags: {
            feature: 'fastdom'
        }
    });
};
