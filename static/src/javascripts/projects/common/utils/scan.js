import _ from 'common/utils/_';
export default function(xs, f, z) {
    return _.reduce(xs, function(acc, x) {
        return acc.concat(f(_.last(acc), x));
    }, [z]);
};
