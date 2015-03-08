import $ from 'common/utils/$';
import ajax from 'common/utils/ajax';
import config from 'common/utils/config';
import 'bonzo';
import 'qwery';
export default function() {
    var $firstContainer = $('.js-insert-team-stats-after');

    if ($firstContainer.length) {
        ajax({
            url: '/' + config.page.pageId + '/fixtures-and-results-container',
            type: 'json',
            method: 'get',
            crossOrigin: 'true',
            success: function(container) {
                if (container.html) {
                    $firstContainer.after(container.html);
                }
            }
        });
    }
};
