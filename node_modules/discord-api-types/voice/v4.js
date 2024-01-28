"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceCloseCodes = exports.VoiceOpcodes = exports.VoiceGatewayVersion = void 0;
exports.VoiceGatewayVersion = '4';
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes
 */
var VoiceOpcodes;
(function (VoiceOpcodes) {
    /**
     * Begin a voice websocket connection
     */
    VoiceOpcodes[VoiceOpcodes["Identify"] = 0] = "Identify";
    /**
     * Select the voice protocol
     */
    VoiceOpcodes[VoiceOpcodes["SelectProtocol"] = 1] = "SelectProtocol";
    /**
     * Complete the websocket handshake
     */
    VoiceOpcodes[VoiceOpcodes["Ready"] = 2] = "Ready";
    /**
     * Keep the websocket connection alive
     */
    VoiceOpcodes[VoiceOpcodes["Heartbeat"] = 3] = "Heartbeat";
    /**
     * Describe the session
     */
    VoiceOpcodes[VoiceOpcodes["SessionDescription"] = 4] = "SessionDescription";
    /**
     * Indicate which users are speaking
     */
    VoiceOpcodes[VoiceOpcodes["Speaking"] = 5] = "Speaking";
    /**
     * Sent to acknowledge a received client heartbeat
     */
    VoiceOpcodes[VoiceOpcodes["HeartbeatAck"] = 6] = "HeartbeatAck";
    /**
     * Resume a connection
     */
    VoiceOpcodes[VoiceOpcodes["Resume"] = 7] = "Resume";
    /**
     * Time to wait between sending heartbeats in milliseconds
     */
    VoiceOpcodes[VoiceOpcodes["Hello"] = 8] = "Hello";
    /**
     * Acknowledge a successful session resume
     */
    VoiceOpcodes[VoiceOpcodes["Resumed"] = 9] = "Resumed";
    /**
     * A client has connected to the voice channel
     */
    VoiceOpcodes[VoiceOpcodes["ClientConnect"] = 12] = "ClientConnect";
    /**
     * A client has disconnected from the voice channel
     */
    VoiceOpcodes[VoiceOpcodes["ClientDisconnect"] = 13] = "ClientDisconnect";
})(VoiceOpcodes = exports.VoiceOpcodes || (exports.VoiceOpcodes = {}));
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
 */
var VoiceCloseCodes;
(function (VoiceCloseCodes) {
    /**
     * You sent an invalid opcode
     */
    VoiceCloseCodes[VoiceCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
    /**
     * You sent a invalid payload in your identifying to the Gateway
     */
    VoiceCloseCodes[VoiceCloseCodes["FailedToDecode"] = 4002] = "FailedToDecode";
    /**
     * You sent a payload before identifying with the Gateway
     */
    VoiceCloseCodes[VoiceCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
    /**
     * The token you sent in your identify payload is incorrect
     */
    VoiceCloseCodes[VoiceCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
    /**
     * You sent more than one identify payload. Stahp
     */
    VoiceCloseCodes[VoiceCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
    /**
     * Your session is no longer valid
     */
    VoiceCloseCodes[VoiceCloseCodes["SessionNoLongerValid"] = 4006] = "SessionNoLongerValid";
    /**
     * Your session has timed out
     */
    VoiceCloseCodes[VoiceCloseCodes["SessionTimeout"] = 4009] = "SessionTimeout";
    /**
     * We can't find the server you're trying to connect to
     */
    VoiceCloseCodes[VoiceCloseCodes["ServerNotFound"] = 4011] = "ServerNotFound";
    /**
     * We didn't recognize the protocol you sent
     */
    VoiceCloseCodes[VoiceCloseCodes["UnknownProtocol"] = 4012] = "UnknownProtocol";
    /**
     * Either the channel was deleted, you were kicked, or the main gateway session was dropped. Should not reconnect
     */
    VoiceCloseCodes[VoiceCloseCodes["Disconnected"] = 4014] = "Disconnected";
    /**
     * The server crashed. Our bad! Try resuming
     */
    VoiceCloseCodes[VoiceCloseCodes["VoiceServerCrashed"] = 4015] = "VoiceServerCrashed";
    /**
     * We didn't recognize your encryption
     */
    VoiceCloseCodes[VoiceCloseCodes["UnknownEncryptionMode"] = 4016] = "UnknownEncryptionMode";
})(VoiceCloseCodes = exports.VoiceCloseCodes || (exports.VoiceCloseCodes = {}));
//# sourceMappingURL=v4.js.map