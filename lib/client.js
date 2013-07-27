var request = require("request");

var Car2Go = function Car2Go(options) {
  this.key = options.key;
  this.secret = options.secret;
};

Car2Go.prototype.locations = function(options, callback) {
  request({
    qs: {
      format: "json",
      json: true,
      oauth_consumer_key: this.key
    },
    url: "https://www.car2go.com/api/v2.1/locations"
  }, function(err, res, body) {
    if (err) {
      return callback(err);
    }

    if (res.statusCode != 200) {
      return callback(body.trim());
    }

    var data = JSON.parse(body);

    if (data.returnValue.code != 0) {
      return callback(data.returnValue.description)
    }

    callback(null, data.location);
  });
};

module.exports = Car2Go;
