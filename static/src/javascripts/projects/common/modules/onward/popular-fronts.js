import bonzo from 'bonzo';
import $ from 'common/utils/$';
import ajax from 'common/utils/ajax';
import config from 'common/utils/config';
import commentCount from 'common/modules/discussion/comment-count';
import images from 'common/modules/ui/images';
import relativeDates from 'common/modules/ui/relativedates';

export default {
    render: function(options) {
        var opts = options || {},
            hasSection = config.page && config.page.section && config.page.section !== 'global';
        return ajax({
            url: '/most-read' + (hasSection ? '/' + config.page.section : '') + '.json',
            type: 'json',
            crossOrigin: true
        }).then(
            function(resp) {
                if (resp.faciaHtml) {
                    var container = bonzo.create(resp.faciaHtml.replace(/^\s+|\s+$/g, ''))[0];

                    if (container) {
                        bonzo(container)
                            .insertAfter(opts.insertAfter || $('.container, .ad-slot--commercial-component-high').last());

                        commentCount.init(container);
                        // relativise timestamps
                        relativeDates.init(container);
                        // upgrade image
                        images.upgrade(container);
                    }
                }

                opts.then && opts.then();
            }
        );
    }

};
