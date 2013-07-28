var request = require("request");

var codes = require("./codes");

var Car2Go = function Car2Go(options) {
  this.key = options.key;
  this.secret = options.secret;
};

Car2Go.prototype.codes = codes;

Car2Go.prototype.locations = function(callback) {
  request({
    json: true,
    qs: {
      format: "json",
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

    if (body.returnValue.code != codes.SUCCESS) {
      return callback(body.returnValue.description)
    }

    callback(null, body.location);
  });
};

Car2Go.prototype.vehicles = function(options, callback) {
  options.format = options.format || "kml";

  request({
    json: options.format == "json",
    qs: {
      format: options.format,
      loc: options.loc,
      oauth_consumer_key: this.key
    },
    url: "https://www.car2go.com/api/v2.1/vehicles"
  }, function(err, res, body) {
    if (err) {
      return callback(err);
    }

    if (res.statusCode != 200) {
      return callback(body.trim());
    }

    if (options.format == "json") {
      return callback(null, body.placemarks);
    }

    return callback(null, body);
  });
};

module.exports = Car2Go;
