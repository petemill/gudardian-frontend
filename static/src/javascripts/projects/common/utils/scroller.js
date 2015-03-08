import easing from 'common/utils/easing';
import bonzo from 'bonzo';

// utility module for auto scrolling with easing
// Usage:
// scroller.scrollToElement(element, 500, 'easeOutQuad'); // 500ms scroll to element using easeOutQuad easing
// scroller.scrollTo(1250, 250, 'linear'); // 250ms scroll to 1250px using linear gradient

function scrollTo(offset, duration, easeFn) {
    var $body = bonzo(document.body),
        scrollEnd = offset,
        scrollFrom = $body.scrollTop(),
        scrollDist = scrollEnd - scrollFrom,
        ease = easing.create(easeFn || 'easeOutQuad', duration),
        scrollFn = function() {
            $body.scrollTop(scrollFrom + (ease() * scrollDist));
        },
        interval = window.setInterval(scrollFn, 15);
    window.setTimeout(function() {
        window.clearInterval(interval);
        $body.scrollTop(scrollEnd);
    }, duration);

}

function scrollToElement(element, duration, easeFn) {
    var top = bonzo(element).offset().top;
    scrollTo(top, duration, easeFn);
}

export default {
    scrollToElement: scrollToElement,
    scrollTo: scrollTo
};
