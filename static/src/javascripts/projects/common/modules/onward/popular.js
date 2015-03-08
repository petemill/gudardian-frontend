import qwery from 'qwery';
import $ from 'common/utils/$';
import config from 'common/utils/config';
import Component from 'common/modules/component';
import mediator from 'common/utils/mediator';
import createAdSlot from 'common/modules/commercial/create-ad-slot';
import dfp from 'common/modules/commercial/dfp';

function MostPopular() {
    mediator.emit('register:begin', 'popular-in-section');
    this.hasSection = config.page && config.page.section && config.page.section !== 'global';
    this.endpoint = '/most-read' + (this.hasSection ? '/' + config.page.section : '') + '.json';
}

Component.define(MostPopular);

MostPopular.prototype.init = function() {
    this.fetch(qwery('.js-popular-trails'), 'html');
};

MostPopular.prototype.prerender = function() {
    if (!config.page.shouldHideAdverts) {
        this.$mpu = $('.js-fc-slice-mpu-candidate', this.elem)
            .append(createAdSlot('inline3', 'container-inline'));
    } else {
        this.$mpu = undefined;
    }
};

MostPopular.prototype.ready = function() {
    if (this.$mpu) {
        dfp.addSlot($('.ad-slot', this.$mpu));
        this.$mpu.removeClass('fc-slice__item--no-mpu');
    }
    mediator.emit('modules:popular:loaded', this.elem);
    mediator.emit('register:end', 'popular-in-section');
};

export default MostPopular;
