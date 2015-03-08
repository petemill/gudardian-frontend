import mediator from 'common/utils/mediator';
import popular from 'common/modules/onward/popular-fronts';
var modules = {

        showPopular: function() {
            popular.render();
        }

    },
    ready = function() {
        modules.showPopular();

        mediator.emit('page:tag:ready');
    };

export default {
    init: ready
};
