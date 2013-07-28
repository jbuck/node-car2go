var validKey = process.env.CONSUMER_KEY || "valid";

var Client = require("../lib/client"),
    invalidClient = new Client({ key: "invalid" }),
    validClient = new Client({ key: validKey });

var nock = require("nock"),
    specify = require("specify");

specify("vehicles json success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/vehicles?format=json&loc=Toronto&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/vehicles-200-0.json", {
      "content-type": "application/json; charset=utf-8"
    });

  validClient.vehicles({
    format: "json",
    loc: "Toronto"
  }, function(err, vehicles) {
    assert.equal(err, null);
    assert.ok(Array.isArray(vehicles));
    assert.ok(vehicles.length > 0);
  });
});

specify("vehicles kml success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/vehicles?format=kml&loc=Toronto&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/vehicles-200-0.json", {
      "content-type": "application/vnd.google-earth.kml+xml; charset=utf-8"
    });

  validClient.vehicles({
    loc: "Toronto"
  }, function(err, vehicles) {
    assert.equal(err, null);
    assert.equal(typeof vehicles, "string");
  });
});

specify("vehicles invalid location", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/vehicles?format=json&loc=&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid location\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.vehicles({
    format: "json",
  }, function(err, vehicles) {
    assert.equal(err, "Error 401: Invalid location");
    assert.equal(vehicles);
  });
});

specify("vehicles invalid consumer_key", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/vehicles?format=json&loc=Toronto&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid consumerkey\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.vehicles({
    format: "json",
    loc: "Toronto"
  }, function(err, vehicles) {
    assert.equal(err, "Error 401: Invalid consumerkey");
    assert.equal(vehicles);
  });
});

specify.run();
