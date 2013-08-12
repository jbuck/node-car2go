var validKey = process.env.CONSUMER_KEY || "valid";

var Client = require("../lib/client"),
    invalidClient = new Client({ key: "invalid" }),
    validClient = new Client({ key: validKey });

var nock = require("nock"),
    specify = require("specify");

specify("operationareas json success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/operationareas?format=json&loc=Denver&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/operationareas-200-0.json", {
      "content-type": "application/json; charset=utf-8"
    });

  validClient.operationareas({
    format: "json",
    loc: "Denver"
  }, function(err, areas) {
    assert.equal(err, null);
    assert.ok(Array.isArray(areas));
    assert.ok(areas.length > 0);
  });
});

specify("operationareas kml success", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/operationareas?format=kml&loc=Denver&oauth_consumer_key=" + validKey)
    .replyWithFile(200, __dirname + "/replies/operationareas-200-0.json", {
      "content-type": "application/vnd.google-earth.kml+xml; charset=utf-8"
    });

  validClient.operationareas({
    loc: "Denver"
  }, function(err, operationareas) {
    assert.equal(err, null);
    assert.equal(typeof operationareas, "string");
  });
});

specify("operationareas invalid location", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/operationareas?format=json&loc=&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid location\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.operationareas({
    format: "json"
  }, function(err, operationareas) {
    assert.equal(err, "Error 401: Invalid location");
    assert.equal(operationareas);
  });
});

specify("operationareas invalid consumer_key", function(assert) {
  var scope = nock("https://www.car2go.com")
    .get("/api/v2.1/operationareas?format=json&loc=Denver&oauth_consumer_key=invalid")
    .reply(401, "Error 401: Invalid consumerkey\n", {
      "content-type": "text/html;charset=ISO-8859-1"
    });

  invalidClient.operationareas({
    format: "json",
    loc: "Denver"
  }, function(err, operationareas) {
    assert.equal(err, "Error 401: Invalid consumerkey");
    assert.equal(operationareas);
  });
});

