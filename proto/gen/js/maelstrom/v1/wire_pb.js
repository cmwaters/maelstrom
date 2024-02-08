// source: maelstrom/v1/wire.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.exportSymbol('proto.maelstrom.v1.Account', null, global);
goog.exportSymbol('proto.maelstrom.v1.Account.PubKeyType', null, global);
goog.exportSymbol('proto.maelstrom.v1.BlobMeta', null, global);
goog.exportSymbol('proto.maelstrom.v1.BlobTx', null, global);
goog.exportSymbol('proto.maelstrom.v1.Withdrawal', null, global);
goog.exportSymbol('proto.maelstrom.v1.WithdrawalTx', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.maelstrom.v1.Account = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.maelstrom.v1.Account, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.maelstrom.v1.Account.displayName = 'proto.maelstrom.v1.Account';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.maelstrom.v1.BlobMeta = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.maelstrom.v1.BlobMeta, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.maelstrom.v1.BlobMeta.displayName = 'proto.maelstrom.v1.BlobMeta';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.maelstrom.v1.BlobTx = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.maelstrom.v1.BlobTx.repeatedFields_, null);
};
goog.inherits(proto.maelstrom.v1.BlobTx, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.maelstrom.v1.BlobTx.displayName = 'proto.maelstrom.v1.BlobTx';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.maelstrom.v1.WithdrawalTx = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.maelstrom.v1.WithdrawalTx.repeatedFields_, null);
};
goog.inherits(proto.maelstrom.v1.WithdrawalTx, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.maelstrom.v1.WithdrawalTx.displayName = 'proto.maelstrom.v1.WithdrawalTx';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.maelstrom.v1.Withdrawal = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.maelstrom.v1.Withdrawal, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.maelstrom.v1.Withdrawal.displayName = 'proto.maelstrom.v1.Withdrawal';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.maelstrom.v1.Account.prototype.toObject = function(opt_includeInstance) {
  return proto.maelstrom.v1.Account.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.maelstrom.v1.Account} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.Account.toObject = function(includeInstance, msg) {
  var f, obj = {
    balance: jspb.Message.getFieldWithDefault(msg, 1, 0),
    pubKey: msg.getPubKey_asB64(),
    pubKeyType: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.maelstrom.v1.Account}
 */
proto.maelstrom.v1.Account.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.maelstrom.v1.Account;
  return proto.maelstrom.v1.Account.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.maelstrom.v1.Account} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.maelstrom.v1.Account}
 */
proto.maelstrom.v1.Account.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setBalance(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubKey(value);
      break;
    case 3:
      var value = /** @type {!proto.maelstrom.v1.Account.PubKeyType} */ (reader.readEnum());
      msg.setPubKeyType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.Account.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.maelstrom.v1.Account.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.maelstrom.v1.Account} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.Account.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBalance();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPubKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getPubKeyType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.maelstrom.v1.Account.PubKeyType = {
  UNKNOWN: 0,
  SECP256R1: 1,
  SECP256K1: 2,
  ED25519: 3
};

/**
 * optional uint64 balance = 1;
 * @return {number}
 */
proto.maelstrom.v1.Account.prototype.getBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.maelstrom.v1.Account} returns this
 */
proto.maelstrom.v1.Account.prototype.setBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes pub_key = 2;
 * @return {string}
 */
proto.maelstrom.v1.Account.prototype.getPubKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes pub_key = 2;
 * This is a type-conversion wrapper around `getPubKey()`
 * @return {string}
 */
proto.maelstrom.v1.Account.prototype.getPubKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubKey()));
};


/**
 * optional bytes pub_key = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubKey()`
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.Account.prototype.getPubKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubKey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.maelstrom.v1.Account} returns this
 */
proto.maelstrom.v1.Account.prototype.setPubKey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional PubKeyType pub_key_type = 3;
 * @return {!proto.maelstrom.v1.Account.PubKeyType}
 */
proto.maelstrom.v1.Account.prototype.getPubKeyType = function() {
  return /** @type {!proto.maelstrom.v1.Account.PubKeyType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.maelstrom.v1.Account.PubKeyType} value
 * @return {!proto.maelstrom.v1.Account} returns this
 */
proto.maelstrom.v1.Account.prototype.setPubKeyType = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.maelstrom.v1.BlobMeta.prototype.toObject = function(opt_includeInstance) {
  return proto.maelstrom.v1.BlobMeta.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.maelstrom.v1.BlobMeta} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.BlobMeta.toObject = function(includeInstance, msg) {
  var f, obj = {
    signer: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fee: jspb.Message.getFieldWithDefault(msg, 2, 0),
    txHash: msg.getTxHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.maelstrom.v1.BlobMeta}
 */
proto.maelstrom.v1.BlobMeta.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.maelstrom.v1.BlobMeta;
  return proto.maelstrom.v1.BlobMeta.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.maelstrom.v1.BlobMeta} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.maelstrom.v1.BlobMeta}
 */
proto.maelstrom.v1.BlobMeta.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSigner(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setFee(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTxHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.BlobMeta.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.maelstrom.v1.BlobMeta.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.maelstrom.v1.BlobMeta} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.BlobMeta.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSigner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFee();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getTxHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional string signer = 1;
 * @return {string}
 */
proto.maelstrom.v1.BlobMeta.prototype.getSigner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.maelstrom.v1.BlobMeta} returns this
 */
proto.maelstrom.v1.BlobMeta.prototype.setSigner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 fee = 2;
 * @return {number}
 */
proto.maelstrom.v1.BlobMeta.prototype.getFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.maelstrom.v1.BlobMeta} returns this
 */
proto.maelstrom.v1.BlobMeta.prototype.setFee = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes tx_hash = 3;
 * @return {string}
 */
proto.maelstrom.v1.BlobMeta.prototype.getTxHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes tx_hash = 3;
 * This is a type-conversion wrapper around `getTxHash()`
 * @return {string}
 */
proto.maelstrom.v1.BlobMeta.prototype.getTxHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTxHash()));
};


/**
 * optional bytes tx_hash = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTxHash()`
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.BlobMeta.prototype.getTxHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTxHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.maelstrom.v1.BlobMeta} returns this
 */
proto.maelstrom.v1.BlobMeta.prototype.setTxHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.maelstrom.v1.BlobTx.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.maelstrom.v1.BlobTx.prototype.toObject = function(opt_includeInstance) {
  return proto.maelstrom.v1.BlobTx.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.maelstrom.v1.BlobTx} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.BlobTx.toObject = function(includeInstance, msg) {
  var f, obj = {
    txIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    timeoutHeight: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.maelstrom.v1.BlobTx}
 */
proto.maelstrom.v1.BlobTx.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.maelstrom.v1.BlobTx;
  return proto.maelstrom.v1.BlobTx.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.maelstrom.v1.BlobTx} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.maelstrom.v1.BlobTx}
 */
proto.maelstrom.v1.BlobTx.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint64() : [reader.readUint64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addTxIds(values[i]);
      }
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setTimeoutHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.BlobTx.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.maelstrom.v1.BlobTx.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.maelstrom.v1.BlobTx} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.BlobTx.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTxIdsList();
  if (f.length > 0) {
    writer.writePackedUint64(
      1,
      f
    );
  }
  f = message.getTimeoutHeight();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * repeated uint64 tx_ids = 1;
 * @return {!Array<number>}
 */
proto.maelstrom.v1.BlobTx.prototype.getTxIdsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.maelstrom.v1.BlobTx} returns this
 */
proto.maelstrom.v1.BlobTx.prototype.setTxIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.maelstrom.v1.BlobTx} returns this
 */
proto.maelstrom.v1.BlobTx.prototype.addTxIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.maelstrom.v1.BlobTx} returns this
 */
proto.maelstrom.v1.BlobTx.prototype.clearTxIdsList = function() {
  return this.setTxIdsList([]);
};


/**
 * optional uint64 timeout_height = 2;
 * @return {number}
 */
proto.maelstrom.v1.BlobTx.prototype.getTimeoutHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.maelstrom.v1.BlobTx} returns this
 */
proto.maelstrom.v1.BlobTx.prototype.setTimeoutHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.maelstrom.v1.WithdrawalTx.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.maelstrom.v1.WithdrawalTx.prototype.toObject = function(opt_includeInstance) {
  return proto.maelstrom.v1.WithdrawalTx.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.maelstrom.v1.WithdrawalTx} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.WithdrawalTx.toObject = function(includeInstance, msg) {
  var f, obj = {
    withdrawalsList: jspb.Message.toObjectList(msg.getWithdrawalsList(),
    proto.maelstrom.v1.Withdrawal.toObject, includeInstance),
    timeoutHeight: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.maelstrom.v1.WithdrawalTx}
 */
proto.maelstrom.v1.WithdrawalTx.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.maelstrom.v1.WithdrawalTx;
  return proto.maelstrom.v1.WithdrawalTx.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.maelstrom.v1.WithdrawalTx} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.maelstrom.v1.WithdrawalTx}
 */
proto.maelstrom.v1.WithdrawalTx.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.maelstrom.v1.Withdrawal;
      reader.readMessage(value,proto.maelstrom.v1.Withdrawal.deserializeBinaryFromReader);
      msg.addWithdrawals(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setTimeoutHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.WithdrawalTx.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.maelstrom.v1.WithdrawalTx.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.maelstrom.v1.WithdrawalTx} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.WithdrawalTx.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWithdrawalsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.maelstrom.v1.Withdrawal.serializeBinaryToWriter
    );
  }
  f = message.getTimeoutHeight();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * repeated Withdrawal withdrawals = 1;
 * @return {!Array<!proto.maelstrom.v1.Withdrawal>}
 */
proto.maelstrom.v1.WithdrawalTx.prototype.getWithdrawalsList = function() {
  return /** @type{!Array<!proto.maelstrom.v1.Withdrawal>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.maelstrom.v1.Withdrawal, 1));
};


/**
 * @param {!Array<!proto.maelstrom.v1.Withdrawal>} value
 * @return {!proto.maelstrom.v1.WithdrawalTx} returns this
*/
proto.maelstrom.v1.WithdrawalTx.prototype.setWithdrawalsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.maelstrom.v1.Withdrawal=} opt_value
 * @param {number=} opt_index
 * @return {!proto.maelstrom.v1.Withdrawal}
 */
proto.maelstrom.v1.WithdrawalTx.prototype.addWithdrawals = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.maelstrom.v1.Withdrawal, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.maelstrom.v1.WithdrawalTx} returns this
 */
proto.maelstrom.v1.WithdrawalTx.prototype.clearWithdrawalsList = function() {
  return this.setWithdrawalsList([]);
};


/**
 * optional uint64 timeout_height = 2;
 * @return {number}
 */
proto.maelstrom.v1.WithdrawalTx.prototype.getTimeoutHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.maelstrom.v1.WithdrawalTx} returns this
 */
proto.maelstrom.v1.WithdrawalTx.prototype.setTimeoutHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.maelstrom.v1.Withdrawal.prototype.toObject = function(opt_includeInstance) {
  return proto.maelstrom.v1.Withdrawal.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.maelstrom.v1.Withdrawal} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.Withdrawal.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    amount: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.maelstrom.v1.Withdrawal}
 */
proto.maelstrom.v1.Withdrawal.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.maelstrom.v1.Withdrawal;
  return proto.maelstrom.v1.Withdrawal.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.maelstrom.v1.Withdrawal} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.maelstrom.v1.Withdrawal}
 */
proto.maelstrom.v1.Withdrawal.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.maelstrom.v1.Withdrawal.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.maelstrom.v1.Withdrawal.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.maelstrom.v1.Withdrawal} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.maelstrom.v1.Withdrawal.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.maelstrom.v1.Withdrawal.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.maelstrom.v1.Withdrawal} returns this
 */
proto.maelstrom.v1.Withdrawal.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 amount = 2;
 * @return {number}
 */
proto.maelstrom.v1.Withdrawal.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.maelstrom.v1.Withdrawal} returns this
 */
proto.maelstrom.v1.Withdrawal.prototype.setAmount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


