import $ from 'common/utils/$';
import template from 'common/utils/template';
import svgs from 'common/views/svgs';
import 'text!common/views/commercial/creatives/ad-feature-mpu.html';
import 'text!common/views/commercial/creatives/ad-feature-mpu-large.html';
import 'text!common/views/commercial/creatives/logo-ad-feature.html';
import 'text!common/views/commercial/creatives/logo-sponsored.html';
import 'text!common/views/commercial/creatives/manual-inline.html';
import 'text!common/views/commercial/creatives/manual-multiple.html';
import 'text!common/views/commercial/creatives/manual-single.html';

/**
 * Create simple templated creatives
 *
 * * https://www.google.com/dfp/59666047#delivery/CreateCreativeTemplate/creativeTemplateId=10021527
 * * https://www.google.com/dfp/59666047#delivery/CreateCreativeTemplate/creativeTemplateId=10028127
 */
var Template = function($adSlot, params) {
    this.$adSlot = $adSlot;
    this.params = params;

    this.params.marque36icon = svgs('marque36icon');
    this.params.marque54icon = svgs('marque54icon');
    this.params.logoguardian = svgs('logoguardian');
    this.params.marque36iconCreativeMarque = svgs('marque36icon', ['creative__marque']);
};

Template.prototype.create = function() {
    require(['text!common/views/commercial/creatives/' + this.params.creative + '.html'], function(creativeTpl) {
        var creativeHtml = template(creativeTpl, this.params);

        $.create(creativeHtml)
            .appendTo(this.$adSlot);
    }.bind(this));
};

export default Template;
