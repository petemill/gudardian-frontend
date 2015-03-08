import union from 'lodash/arrays/union';
import config from 'common/utils/config';
import mediator from 'common/utils/mediator';
import register from 'common/modules/analytics/register';
import badges from 'common/modules/commercial/badges';
import Component from 'common/modules/component';

var getTag = function() {
    var seriesAndBlogTags = config.page.blogIds.split(',').concat([config.page.seriesId]);
    return union(config.page.nonKeywordTagIds.split(','), seriesAndBlogTags).shift();
};

function OnwardContent(context) {
    register.begin('series-content');
    this.context = context;
    this.endpoint = '/series/' + getTag() + '.json?shortUrl=' + encodeURIComponent(config.page.shortUrl);
    this.fetch(this.context, 'html');
}

Component.define(OnwardContent);

OnwardContent.prototype.ready = function(container) {
    badges.add(container);
    register.end('series-content');
    mediator.emit('modules:onward:loaded');
    mediator.emit('ui:images:upgradePicture', this.context);
};

OnwardContent.prototype.error = function() {
    register.error('series-content');
};

export default OnwardContent;
