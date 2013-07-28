var validKey = process.env.CONSUMER_KEY || "valid";

var Client = require("../lib/client"),
    invalidClient = new Client({ key: "invalid" }),
    validClient = new Client({ key: validKey });

var nock = require("nock"),
    specify = require("specify");

specify("locations success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/locations?format=json&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/locations-200-0.json", {
      "content-type": "application/json; charset=utf-8"
    });

  validClient.locations(function(err, locations) {
    assert.equal(err, null);
    assert.ok(Array.isArray(locations));
    assert.ok(locations.length > 0);
    assert.ok(scope.isDone());
  });
});

specify("locations invalid consumer_key", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/locations?format=json&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid consumerkey\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.locations(function(err, locations) {
    assert.equal(err, "Error 401: Invalid consumerkey");
    assert.equal(locations);
  });
});

specify.run();
