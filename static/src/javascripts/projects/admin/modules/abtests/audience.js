/*
 Module: audience.js
 Description: Displays information about how the test users are divided.
 */
import _ from 'lodash/main';
import Component from 'common/modules/component';
import audienceItem from 'admin/modules/abtests/audience-item';

function Audience(config) {
    this.config = _.extend(_.clone(this.config), config);
}

Component.define(Audience);

Audience.prototype.config = {
    tests: []
};

Audience.prototype.templateName = 'audience-template';
Audience.prototype.componentClass = 'audience-breakdown';
Audience.prototype.useBem = true;

Audience.prototype.prerender = function() {

    var testsContainer = this.getElem('tests');

    this.config.tests.forEach(function(test) {
        new audienceItem({
            test: test
        }).render(testsContainer);
    });
};

Audience.prototype.ready = function() {

};

export default Audience;
