var validKey = process.env.CONSUMER_KEY || "valid";

var Client = require("../lib/client"),
    invalidClient = new Client({ key: "invalid" }),
    validClient = new Client({ key: validKey });

var nock = require("nock"),
    specify = require("specify");

specify("gasstations json success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/gasstations?format=json&loc=ulm&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/gasstations-200-0.json", {
      "content-type": "application/json; charset=utf-8"
    });

  validClient.gasstations({
    format: "json",
    loc: "ulm"
  }, function(err, areas) {
    assert.equal(err, null);
    assert.ok(Array.isArray(areas));
    assert.ok(areas.length > 0);
  });
});

specify("gasstations kml success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/gasstations?format=kml&loc=ulm&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/gasstations-200-0.json", {
      "content-type": "application/vnd.google-earth.kml+xml; charset=utf-8"
    });

  validClient.gasstations({
    loc: "ulm"
  }, function(err, gasstations) {
    assert.equal(err, null);
    assert.equal(typeof gasstations, "string");
  });
});

specify("gasstations invalid location", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/gasstations?format=json&loc=&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid location\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.gasstations({
    format: "json"
  }, function(err, gasstations) {
    assert.equal(err, "Error 401: Invalid location");
    assert.equal(gasstations);
  });
});

specify("gasstations invalid consumer_key", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/gasstations?format=json&loc=ulm&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid consumerkey\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.gasstations({
    format: "json",
    loc: "ulm"
  }, function(err, gasstations) {
    assert.equal(err, "Error 401: Invalid consumerkey");
    assert.equal(gasstations);
  });
});

