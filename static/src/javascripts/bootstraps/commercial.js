import config from 'common/utils/config';
import mediator from 'common/utils/mediator';
import robust from 'common/utils/robust';
import articleAsideAdverts from 'common/modules/commercial/article-aside-adverts';
import articleBodyAdverts from 'common/modules/commercial/article-body-adverts';
import badges from 'common/modules/commercial/badges';
import dfp from 'common/modules/commercial/dfp';
import frontCommercialComponents from 'common/modules/commercial/front-commercial-components';
import sliceAdverts from 'common/modules/commercial/slice-adverts';
import thirdPartyTags from 'common/modules/commercial/third-party-tags';
import userPrefs from 'common/modules/user-prefs';

export default {
    init: function() {
        if (!userPrefs.isOff('adverts') &&
            !config.page.shouldHideAdverts &&
            (!config.page.isSSL || config.page.section === 'admin') &&
            !window.location.hash.match(/[#&]noads(&.*)?$/)
        ) {
            // load tags
            robust('cm-thirdPartyTags', function() {
                thirdPartyTags.init();
            });
            robust('cm-articleAsideAdverts', function() {
                articleAsideAdverts.init();
            });
            robust('cm-articleBodyAdverts', function() {
                articleBodyAdverts.init();
            });
            robust('cm-sliceAdverts', function() {
                sliceAdverts.init();
            });
            robust('cm-frontCommercialComponents', function() {
                frontCommercialComponents.init();
            });
            robust('cm-badges', function() {
                badges.init();
            });
            robust('cm-dfp', function() {
                dfp.init();
            });
        }

        robust('cm-ready', function() {
            mediator.emit('page:commercial:ready');
        });
    }
};
