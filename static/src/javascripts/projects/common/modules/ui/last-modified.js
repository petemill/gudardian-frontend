import bean from 'bean';
import qwery from 'qwery';
import $ from 'common/utils/$';

function expand() {
    $('.js-lm').toggleClass('u-h');
}

function init() {
    if ($('.js-lm').length) {
        $('.js-wpd').addClass('content__dateline-wpd--modified tone-colour');
        bean.on(qwery('.js-wpd')[0], 'click', expand);
    }
}

export default {
    init: init
};
