import bean from 'bean';
import bonzo from 'bonzo';
import $ from 'common/utils/$';
import mediator from 'common/utils/mediator';
import storage from 'common/utils/storage';
import template from 'common/utils/template';
import fluid250GoogleAndroidTpl from 'text!common/views/commercial/creatives/fluid250GoogleAndroid.html';
var Fluid250GoogleAndroid = function($adSlot, params) {
    this.$adSlot = $adSlot;
    this.params = params;
};

Fluid250GoogleAndroid.prototype.create = function() {

    $.create(template(fluid250GoogleAndroidTpl, this.params)).appendTo(this.$adSlot);

    if (this.params.trackingPixel) {
        this.$adSlot.before('<img src="' + this.params.trackingPixel + this.params.cacheBuster + '" class="creative__tracking-pixel" height="1px" width="1px"/>');
    }
};

export default Fluid250GoogleAndroid;
