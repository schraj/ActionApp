var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../api/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
