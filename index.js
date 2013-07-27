var client = require("./lib/client");

module.exports = {
  createClient: function(options) {
    return new client(options);
  }
};
