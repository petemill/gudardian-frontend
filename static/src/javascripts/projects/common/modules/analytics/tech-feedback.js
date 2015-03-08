import bean from 'bean';
import fastdom from 'fastdom';
import $ from 'common/utils/$';

export default {
    init: function() {
        var form = $('.js-tech-feedback');
        if (form.length) {
            bean.on(form[0], 'submit', function() {
                var oldHref = form.attr('action');
                form.attr('action', oldHref + '&width=' + window.innerWidth);
            });
        }

    }
};
