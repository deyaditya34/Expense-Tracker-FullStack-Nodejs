const { EventEmitter } = require("events");
const { EVENT_NAMES } = require("../config");

// /**
//  * Create a event manager
//  */
const eventBridge = new EventEmitter();

module.exports = eventBridge;
