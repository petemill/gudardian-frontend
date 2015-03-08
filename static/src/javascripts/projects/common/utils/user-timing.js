var perf = window.performance || window.msPerformance || window.webkitPerformance || window.mozPerformance;

function mark(label) {

    if (perf && 'mark' in perf) {
        perf.mark('gu.' + label);
    }
}

export default {
    mark: mark
};
