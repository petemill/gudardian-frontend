import reduce from 'lodash/collections/reduce';
import keys from 'lodash/objects/keys';

export default function template(tmpl, params) {
    return reduce(keys(params), function(tmpl, token) {
        return tmpl.replace(new RegExp('{{' + token + '}}', 'g'), params[token]);
    }, tmpl);
};
