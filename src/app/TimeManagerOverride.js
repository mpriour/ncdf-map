/**
 * @requires OpenLayers/Control/TimeManager.js
 * @requires widgets/PlaybackToolbar.js
 * 
 * Overwrite the timeExtentsToInterval function to force an interval/resolution
 * presentation when there are more than 300 time dimension values. Needed due
 * to an extremely inefficient handling of lists of time values 
 */
OpenLayers.Control.TimeManager.prototype._timeExtentsToIntervals = OpenLayers.Control.TimeManager.prototype.timeExtentsToIntervals;
OpenLayers.Control.TimeManager.prototype.timeExtentsToIntervals = function(extents) {
    if(300 < extents.length) {
        var min = OpenLayers.String.trim(extents[0]);
        var max = OpenLayers.String.trim(extents[extents.length - 1]);
        var diff = (new Date(max) - new Date(min)) / extents.length;
        var guess = gxp.PlaybackToolbar.smartIntervalFormat(diff); 
        var res = "P";
        switch(guess.units) {
            case "Years":
                res += guess.value + "Y";
                break;
            case "Months":
                res += guess.value + "M";
                break;
            case "Days":
                res += guess.value + "D";
                break;
            case "Hours":
                res += "T" + guess.value + "H";
                break;
            case "Minutes":
                res += "T" + guess.value + "M";
                break;
            case "Seconds":
                res += "T" + guess.value + "S";
                break;
        }
        extents = [[min, max, res].join("/")];
    }
    return this._timeExtentsToIntervals(extents);
};
