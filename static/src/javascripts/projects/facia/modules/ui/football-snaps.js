import bonzo from 'bonzo';
var FootballSnaps = {
    /**
     * All the football snaps sitting in a "big" slice (if any) will take the height of their trail trails
     */
    resizeIfPresent: function(el) {
        if (!!el) {
            var $el = bonzo(el);
            $el.css('height', $el.parent().css('height'));
        }
    }
};

export default FootballSnaps;
