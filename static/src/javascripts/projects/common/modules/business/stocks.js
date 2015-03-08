import $ from 'common/utils/$';
import _ from 'common/utils/_';
import ajax from 'common/utils/ajax';
import config from 'common/utils/config';
import template from 'common/utils/template';
import stockValueTemplate from 'text!common/views/business/stock-value.html';
import stocksTemplate from 'text!common/views/business/stocks.html';

function isBusinessFront() {
    return _.contains(['uk/business', 'us/business', 'au/business'], config.page.pageId);
}

function getStocksData() {
    return ajax({
        url: '/business-data/stocks.json',
        type: 'json',
        method: 'get',
        crossOrigin: true
    });
}

function deltaString(n) {
    return n > 0 ? '+' + n : '' + n;
}

function renderData(data) {
    var stockValues = _.map(data.stocks, function(stockValue) {
        return template(stockValueTemplate, {
            name: stockValue.name,
            deltaClass: 'stocks__stock-value--' + stockValue.trend,
            price: stockValue.price,
            change: deltaString(stockValue.change),
            closed: stockValue.closed ? '<div class="stocks__closed">closed</div>' : '',
            closedInline: stockValue.closed ? '<div class="stocks__closed--inline">closed</div>' : ''
        });
    }).join('');

    return template(stocksTemplate, {
        stocks: stockValues
    });
}

export default function() {
    var $container = $('.js-container--first .js-container__header');

    if (isBusinessFront() && $container) {
        getStocksData().then(function(data) {
            if (data.stocks.length > 0) {
                $container.append(renderData(data));
            }
        });
    }
};
