/*
 Module: geo-most-popular-front.js
 Description: replaces general most popular trails with geo based most popular on fronts.
 */
import qwery from 'qwery';
import $ from 'common/utils/$';
import config from 'common/utils/config';
import mediator from 'common/utils/mediator';
import register from 'common/modules/analytics/register';
import Component from 'common/modules/component';

function GeoMostPopularFront() {
    register.begin('most-popular');
}

Component.define(GeoMostPopularFront);

GeoMostPopularFront.prototype.endpoint = '/most-read-geo.json';
GeoMostPopularFront.prototype.isNetworkFront = config.page.contentType === 'Network Front';
GeoMostPopularFront.prototype.manipulationType = 'html';

GeoMostPopularFront.prototype.prerender = function() {
    this.elem = qwery('.headline-list', this.elem)[0];
};

GeoMostPopularFront.prototype.go = function() {
    var tabSelector = (this.isNetworkFront) ? '.js-tab-1' : '.js-tab-2';
    this.parent = qwery('.js-popular-trails')[0];

    if (this.parent) {
        this.tab = qwery(tabSelector, this.parent)[0];
        this.fetch(this.tab, 'html');
    }
};

GeoMostPopularFront.prototype.ready = function() {
    if (this.isNetworkFront) {
        $('.js-tabs-content', this.parent).addClass('tabs__content--no-border');
        $('.js-tabs', this.parent).addClass('u-h');
    }
    register.end('most-popular');
    mediator.emit('modules:geomostpopular:ready');
};

export default GeoMostPopularFront;
