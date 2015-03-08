/* jshint newcap: false */
import bonzo from 'bonzo';
import React from 'react';
import $ from 'common/utils/$';
import _ from 'common/utils/_';
import flatMap from 'common/modules/sudoku/flatMap';
import Grid from 'common/modules/sudoku/grid';
export default function() {
    $('.js-sudoku').each(function(element) {
        var $element = bonzo(element),
            sudokuData,
            cells;

        if ($element.attr('data-sudoku-data')) {
            sudokuData = JSON.parse($element.attr('data-sudoku-data'));
            cells = flatMap(_.range(9), function(y) {
                return _.map(_.range(9), function(x) {
                    return {
                        x: x,
                        y: y,
                        value: sudokuData[x][y],
                        jottings: [],
                        isEditable: sudokuData[x][y] === null,
                        isFocussed: false,
                        isHighlighted: false,
                        isSameValue: false,
                        isError: false
                    };
                });
            });

            React.renderComponent(Grid({
                cells: cells
            }), element);
        }
    });
};
