import _ from 'common/utils/_';
export default function(xs, f) {
    return Array.prototype.concat.apply([], _.map(xs, f));
};
