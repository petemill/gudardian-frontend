import component from 'common/modules/component';

var ScoreBoard = function() {};
component.define(ScoreBoard);
ScoreBoard.prototype.componentClass = 'match-summary';
ScoreBoard.prototype.responseDataKey = 'matchSummary';

export default ScoreBoard; // define
