import bean from 'bean';
import bonzo from 'bonzo';
import $ from 'common/utils/$';
var fauxBlockLink = function() {
    var overlaySelector = '.u-faux-block-link__overlay',
        hoverStateClassName = 'u-faux-block-link--hover',
        hoverState = {
            add: function(e) {
                $(e.currentTarget).parent().addClass(hoverStateClassName);
            },
            remove: function(e) {
                $(e.currentTarget).parent().removeClass(hoverStateClassName);
            }
        };

    return {
        init: function() {
            bean.on(document.body, 'mouseenter', overlaySelector, hoverState.add);
            bean.on(document.body, 'mouseleave', overlaySelector, hoverState.remove);
        }
    };
};

export default fauxBlockLink;
