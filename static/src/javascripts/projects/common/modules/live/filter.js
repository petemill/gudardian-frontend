/*
    Module: live-filter.js
    Description: Filter displayed events depending on their type
*/
import bonzo from 'bonzo';
import bean from 'bean';
import qwery from 'qwery';
import $ from 'common/utils/$';
import mediator from 'common/utils/mediator';
import toArray from 'lodash/collections/toArray';

function Filter(context) {
    this.context = context;
    this.order = 'newest';
}

Filter.prototype.ready = function() {
    bean.on(qwery('.js-live-oldest')[0], 'click', this.toggle.bind(this, 'oldest'));
    bean.on(qwery('.js-live-newest')[0], 'click', this.toggle.bind(this, 'newest'));
};

Filter.prototype.toggle = function(order) {
    bean.fire(qwery('button[data-toggle="popup--live-blog"]')[0], 'click');
    if (this.order !== order) {
        var blocks = toArray($('.block', this.context).detach());
        blocks.reverse();
        bonzo(this.context).prepend(blocks);
        mediator.emit('module:filter:toggle', order === 'oldest');
        this.order = order;
    }
};

export default Filter;
