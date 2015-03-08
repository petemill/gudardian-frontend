/**
 * A regionalised container for all the commercial tags.
 */
import config from 'common/utils/config';
import amaa from 'common/modules/commercial/third-party-tags/amaa';
import audienceScience from 'common/modules/commercial/third-party-tags/audience-science';
import audienceScienceGateway from 'common/modules/commercial/third-party-tags/audience-science-gateway';
import criteo from 'common/modules/commercial/third-party-tags/criteo';
import effectiveMeasure from 'common/modules/commercial/third-party-tags/effective-measure';
import imrWorldwide from 'common/modules/commercial/third-party-tags/imr-worldwide';
import remarketing from 'common/modules/commercial/third-party-tags/remarketing';
import krux from 'common/modules/commercial/third-party-tags/krux';
import outbrain from 'common/modules/commercial/third-party-tags/outbrain';

function init() {

    if (config.page.contentType === 'Identity' || config.page.section === 'identity') {
        return false;
    }

    switch (config.page.edition.toLowerCase()) {
        case 'au':
            effectiveMeasure.load();
            amaa.load();
            break;

        case 'uk':
            audienceScienceGateway.load();
            break;
    }

    audienceScience.load();
    criteo.load();
    imrWorldwide.load();
    remarketing.load();
    outbrain.load();
    krux.load();
}

export default {
    init: init
};
