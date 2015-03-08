// Include any images needed in templates here.
// This file is only required by core, and so has a long cache time.

import marque36icon from 'inlineSvg!svgs/marque-36!icon';
import marque54icon from 'inlineSvg!svgs/marque-54!icon';
import arrowdownicon from 'inlineSvg!svgs/arrow-down!icon';
import logoguardian from 'inlineSvg!svgs/logo-guardian!logo';
import logosoulmates from 'inlineSvg!svgs/logo-soulmates!commercial';
var svgs = {
    marque36icon: marque36icon,
    marque54icon: marque54icon,
    arrowdownicon: arrowdownicon,
    logoguardian: logoguardian,
    logosoulmates: logosoulmates
};

export default function(name, classes, title) {
    var svg = svgs[name];

    // Only mess with classes if we actually need to.
    if (classes) {
        svg = svg.replace(/class="/, '$&' + classes.join(' ') + ' ');
    }

    // Only mess with title if we actually need to.
    if (title) {
        svg = svg.replace(/<span /, '<span title="' + title + '" ');
    }

    return svg;
};
