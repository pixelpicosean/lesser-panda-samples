const device = require('engine/device');
const config = require('game/config');

/**
 * Google Analytics tracking.
 * Note: This class is protected, use the default instance instead.
 *
 * @example
 * // Add your GA code into `game/config`
 * analytics: {
 *   id: 'my-ga-code'
 * }
 *
 * // Import the {@link module:engine/analytics} module
 * import analytics from 'engine/analytics';
 *
 * // Send to the server
 * analytics.send('category', 'action', 'label', 'value');
 *
 * @class Analytics
 */
class Analytics {
  /**
   * @constructor
   * @param {Object} settings Settings object
   */
  constructor(settings) {
    /**
     * @private
     */
    this.trackId = settings.id;

    if (!navigator.onLine) {return;}

    if (device.cocoonJS) {
      this.clientId = Date.now();
      var request = new XMLHttpRequest();
      var params = 'v=1&tid=' + this.trackId + '&cid=' + this.clientId + '&t=pageview&dp=%2F';
      request.open('POST', 'http://www.google-analytics.com/collect', true);
      request.send(params);
    }
    else {
      (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments);
        };

        i[r].l = 1 * new Date();
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

      ga('create', this.trackId, 'auto');
      ga('send', 'pageview');
    }
  }

  /**
   * Send event to analytics.
   * @method send
   * @memberof Analytics#
   * @param {String} category Category of this event
   * @param {String} action   Action of this event
   * @param {String} [label]  Label of this event
   * @param {String} [value]  Value of this event
   */
  send(category, action, label, value) {
    if (!navigator.onLine) {return;}

    if (device.cocoonJS) {
      let request = new XMLHttpRequest();
      let params = 'v=1&tid=' + this.trackId + '&cid=' + this.clientId + '&t=event&ec=' + category + '&ea=' + action;
      if (typeof label !== 'undefined') {params += '&el=' + label;}
      if (typeof value !== 'undefined') {params += '&ev=' + value;}
      request.open('POST', 'http://www.google-analytics.com/collect', true);
      request.send(params);
    }
    else {
      ga('send', 'event', category, action, label, value);
    }
  }
}

/**
 * Analytics module makes it easier to work with Google Analytics.
 *
 * An instance of {@link Analytics} is already created as the module
 * exports.
 *
 * See {@link Analytics} for more information.
 *
 * @exports engine/analytics
 *
 * @requires module:engine/device
 */
module.exports = new Analytics(Object.assign({
  id: '',
}, config.analytics));
module.exports.Analytics = Analytics;
