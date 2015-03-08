import qwery from 'qwery';
import defaults from 'lodash/objects/defaults';
import Sticky from 'common/modules/ui/sticky';

var mpuHeight = 275,
    StickyMpu = function($adSlot, options) {
        this.$adSlot = $adSlot;
        this.opts = defaults(options || {}, {
            top: 0
        });
    };

StickyMpu.prototype.create = function() {
    var articleBodyOffset;

    if (this.$adSlot.data('name') !== 'right') {
        return;
    }
    articleBodyOffset = qwery('.content__article-body')[0].offsetTop;
    this.$adSlot.parent().css('height', (articleBodyOffset + mpuHeight) + 'px');
    new Sticky(this.$adSlot[0], {
        top: this.opts.top
    }).init();
};

export default StickyMpu;
