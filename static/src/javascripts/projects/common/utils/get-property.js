import reduce from 'lodash/collections/reduce';
import has from 'lodash/objects/has';

export default function(object, property, defaultValue) {
    var value = reduce(property.split('.'), function(object, property) {
        return has(object, property) ? object[property] : undefined;
    }, object);

    return value !== undefined ? value : (defaultValue !== undefined) ? defaultValue : false;
};
