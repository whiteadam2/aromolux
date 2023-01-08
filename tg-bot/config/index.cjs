const confme = require("confme");

const config = confme(
  __dirname + "/config.json",
  __dirname + "/config-schema.json"
);

module.exports = {
  config
}