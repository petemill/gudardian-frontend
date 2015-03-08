/*
 Module: participation-item.js
 Description: Displays opt-in link for a variant
 */
import extend from 'lodash/objects/assign';
import Component from 'common/modules/component';

function ParticipationItem(config) {
    this.config = extend(this.config, config);
}

Component.define(ParticipationItem);

ParticipationItem.prototype.config = {
    test: '',
    variant: ''
};

ParticipationItem.prototype.templateName = 'participation-item-template';
ParticipationItem.prototype.componentClass = 'participation-item';
ParticipationItem.prototype.classes = {};
ParticipationItem.prototype.useBem = true;

ParticipationItem.prototype.prerender = function() {
    var origin = /gutools.co.uk$/.test(document.location.origin) ? "http://www.theguardian.com" : document.location.origin;
    this.elem.textContent = this.config.variant;
    this.elem.href = origin + "/uk#ab-" + this.config.test + "=" + this.config.variant;
};

export default ParticipationItem;
