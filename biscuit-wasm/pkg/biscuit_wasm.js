import * as wasm from './biscuit_wasm_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

const u32CvtShim = new Uint32Array(2);

const uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);

let cachegetUint64Memory0 = null;
function getUint64Memory0() {
    if (cachegetUint64Memory0 === null || cachegetUint64Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint64Memory0 = new BigUint64Array(wasm.memory.buffer);
    }
    return cachegetUint64Memory0;
}

function passArray64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8);
    getUint64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

const int64CvtShim = new BigInt64Array(u32CvtShim.buffer);
/**
* @param {BigInt} i
* @returns {any}
*/
export function integer(i) {
    int64CvtShim[0] = i;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    var ret = wasm.integer(low0, high0);
    return takeObject(ret);
}

/**
* @param {string} s
* @returns {any}
*/
export function string(s) {
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.string(ptr0, len0);
    return takeObject(ret);
}

/**
* @param {string} s
* @returns {any}
*/
export function symbol(s) {
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.symbol(ptr0, len0);
    return takeObject(ret);
}

/**
* @param {BigInt} i
* @returns {any}
*/
export function date(i) {
    uint64CvtShim[0] = i;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    var ret = wasm.date(low0, high0);
    return takeObject(ret);
}

/**
* @param {number} i
* @returns {any}
*/
export function variable(i) {
    var ret = wasm.variable(i);
    return takeObject(ret);
}

/**
* @param {string} name
* @param {any} ids
* @returns {Fact}
*/
export function fact(name, ids) {
    var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.fact(ptr0, len0, addHeapObject(ids));
    return Fact.__wrap(ret);
}

/**
* @param {string} head_name
* @param {any} head_ids
* @param {any} predicates
* @returns {Rule}
*/
export function rule(head_name, head_ids, predicates) {
    var ptr0 = passStringToWasm0(head_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.rule(ptr0, len0, addHeapObject(head_ids), addHeapObject(predicates));
    return Rule.__wrap(ret);
}

/**
* @param {string} head_name
* @param {any} head_ids
* @param {any} predicates
* @param {any} constraints
* @returns {Rule}
*/
export function constrained_rule(head_name, head_ids, predicates, constraints) {
    var ptr0 = passStringToWasm0(head_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.constrained_rule(ptr0, len0, addHeapObject(head_ids), addHeapObject(predicates), addHeapObject(constraints));
    return Rule.__wrap(ret);
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}
/**
*/
export class Atom {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_atom_free(ptr);
    }
}
/**
*/
export class Biscuit {

    static __wrap(ptr) {
        const obj = Object.create(Biscuit.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_biscuit_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.biscuit_new();
        return BiscuitBuilder.__wrap(ret);
    }
    /**
    * @param {Uint8Array} slice
    * @returns {Biscuit}
    */
    static from(slice) {
        var ptr0 = passArray8ToWasm0(slice, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.biscuit_from(ptr0, len0);
        return Biscuit.__wrap(ret);
    }
    /**
    * @param {Uint8Array} slice
    * @param {Uint8Array} secret
    * @returns {Biscuit}
    */
    static fromSealed(slice, secret) {
        var ptr0 = passArray8ToWasm0(slice, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(secret, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.biscuit_fromSealed(ptr0, len0, ptr1, len1);
        return Biscuit.__wrap(ret);
    }
    /**
    * @returns {Uint8Array}
    */
    toVec() {
        wasm.biscuit_toVec(8, this.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v0 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v0;
    }
    /**
    * @returns {BlockBuilder}
    */
    createBlock() {
        var ret = wasm.biscuit_createBlock(this.ptr);
        return BlockBuilder.__wrap(ret);
    }
    /**
    * @param {KeyPair} keypair
    * @param {BlockBuilder} block_builder
    * @returns {Biscuit}
    */
    append(keypair, block_builder) {
        _assertClass(keypair, KeyPair);
        var ptr0 = keypair.ptr;
        keypair.ptr = 0;
        _assertClass(block_builder, BlockBuilder);
        var ptr1 = block_builder.ptr;
        block_builder.ptr = 0;
        var ret = wasm.biscuit_append(this.ptr, ptr0, ptr1);
        return Biscuit.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    print() {
        try {
            wasm.biscuit_print(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
*/
export class BiscuitBuilder {

    static __wrap(ptr) {
        const obj = Object.create(BiscuitBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_biscuitbuilder_free(ptr);
    }
    /**
    * @param {any} base_symbols
    */
    constructor(base_symbols) {
        var ret = wasm.biscuitbuilder_new(addHeapObject(base_symbols));
        return BiscuitBuilder.__wrap(ret);
    }
    /**
    * @returns {BiscuitBuilder}
    */
    static newWithDefaultSymbols() {
        var ret = wasm.biscuitbuilder_newWithDefaultSymbols();
        return BiscuitBuilder.__wrap(ret);
    }
    /**
    * @param {Fact} fact
    */
    addAuthorityFact(fact) {
        _assertClass(fact, Fact);
        var ptr0 = fact.ptr;
        fact.ptr = 0;
        wasm.biscuitbuilder_addAuthorityFact(this.ptr, ptr0);
    }
    /**
    * @param {Rule} rule_bind
    */
    addAuthorityRule(rule_bind) {
        _assertClass(rule_bind, Rule);
        var ptr0 = rule_bind.ptr;
        rule_bind.ptr = 0;
        wasm.biscuitbuilder_addAuthorityRule(this.ptr, ptr0);
    }
    /**
    * @param {Rule} rule_bind
    */
    addAuthorityCaveat(rule_bind) {
        _assertClass(rule_bind, Rule);
        var ptr0 = rule_bind.ptr;
        rule_bind.ptr = 0;
        wasm.biscuitbuilder_addAuthorityCaveat(this.ptr, ptr0);
    }
    /**
    * @param {string} resource
    * @param {string} right
    */
    addRight(resource, right) {
        var ptr0 = passStringToWasm0(resource, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(right, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.biscuitbuilder_addRight(this.ptr, ptr0, len0, ptr1, len1);
    }
    /**
    * @param {KeyPair} root
    * @returns {Biscuit}
    */
    build(root) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(root, KeyPair);
        var ptr0 = root.ptr;
        root.ptr = 0;
        var ret = wasm.biscuitbuilder_build(ptr, ptr0);
        return Biscuit.__wrap(ret);
    }
    /**
    * @param {KeyPair} root
    * @returns {string}
    */
    print(root) {
        try {
            _assertClass(root, KeyPair);
            var ptr0 = root.ptr;
            root.ptr = 0;
            wasm.biscuitbuilder_print(8, this.ptr, ptr0);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
*/
export class BlockBuilder {

    static __wrap(ptr) {
        const obj = Object.create(BlockBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_blockbuilder_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.blockbuilder_new();
        return BlockBuilder.__wrap(ret);
    }
    /**
    * @param {Fact} fact
    */
    addFact(fact) {
        _assertClass(fact, Fact);
        var ptr0 = fact.ptr;
        fact.ptr = 0;
        wasm.blockbuilder_addFact(this.ptr, ptr0);
    }
    /**
    * @param {Rule} rule
    */
    addRule(rule) {
        _assertClass(rule, Rule);
        var ptr0 = rule.ptr;
        rule.ptr = 0;
        wasm.blockbuilder_addRule(this.ptr, ptr0);
    }
    /**
    * @param {Rule} caveat
    */
    addCaveat(caveat) {
        _assertClass(caveat, Rule);
        var ptr0 = caveat.ptr;
        caveat.ptr = 0;
        wasm.blockbuilder_addCaveat(this.ptr, ptr0);
    }
}
/**
*/
export class Fact {

    static __wrap(ptr) {
        const obj = Object.create(Fact.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_fact_free(ptr);
    }
}
/**
*/
export class KeyPair {

    static __wrap(ptr) {
        const obj = Object.create(KeyPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_keypair_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.keypair_new();
        return KeyPair.__wrap(ret);
    }
    /**
    * @returns {PublicKey}
    */
    publicKey() {
        var ret = wasm.keypair_publicKey(this.ptr);
        return PublicKey.__wrap(ret);
    }
    /**
    * @param {Uint8Array} slice
    * @returns {KeyPair}
    */
    static fromBytes(slice) {
        var ptr0 = passArray8ToWasm0(slice, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.keypair_fromBytes(ptr0, len0);
        return KeyPair.__wrap(ret);
    }
    /**
    * @param {Uint8Array} slice
    */
    toBytes(slice) {
        try {
            var ptr0 = passArray8ToWasm0(slice, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.keypair_toBytes(this.ptr, ptr0, len0);
        } finally {
            slice.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    }
}
/**
*/
export class PublicKey {

    static __wrap(ptr) {
        const obj = Object.create(PublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_publickey_free(ptr);
    }
    /**
    * @param {Uint8Array} slice
    */
    toBytes(slice) {
        try {
            var ptr0 = passArray8ToWasm0(slice, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.publickey_toBytes(this.ptr, ptr0, len0);
        } finally {
            slice.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    }
}
/**
*/
export class Rule {

    static __wrap(ptr) {
        const obj = Object.create(Rule.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_rule_free(ptr);
    }
}
/**
*/
export class SymbolTable {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_symboltable_free(ptr);
    }
}
/**
*/
export class Verifier {

    static __wrap(ptr) {
        const obj = Object.create(Verifier.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_verifier_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.verifier_new();
        return Verifier.__wrap(ret);
    }
    /**
    * @param {Fact} fact
    */
    addFact(fact) {
        _assertClass(fact, Fact);
        var ptr0 = fact.ptr;
        fact.ptr = 0;
        wasm.verifier_addFact(this.ptr, ptr0);
    }
    /**
    * @param {Rule} rule_bind
    */
    addRule(rule_bind) {
        _assertClass(rule_bind, Rule);
        var ptr0 = rule_bind.ptr;
        rule_bind.ptr = 0;
        wasm.verifier_addRule(this.ptr, ptr0);
    }
    /**
    * @param {Rule} caveat
    */
    addCaveat(caveat) {
        _assertClass(caveat, Rule);
        var ptr0 = caveat.ptr;
        caveat.ptr = 0;
        wasm.verifier_addCaveat(this.ptr, ptr0);
    }
    /**
    * @param {string} resource
    */
    addResource(resource) {
        var ptr0 = passStringToWasm0(resource, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.verifier_addResource(this.ptr, ptr0, len0);
    }
    /**
    * @param {string} operation
    */
    addOperation(operation) {
        var ptr0 = passStringToWasm0(operation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.verifier_addOperation(this.ptr, ptr0, len0);
    }
    /**
    * @param {BigInt} i
    */
    setTime(i) {
        uint64CvtShim[0] = i;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        wasm.verifier_setTime(this.ptr, low0, high0);
    }
    /**
    * @param {BigInt64Array} ids
    */
    revocationCheck(ids) {
        var ptr0 = passArray64ToWasm0(ids, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.verifier_revocationCheck(this.ptr, ptr0, len0);
    }
    /**
    * @param {PublicKey} root_key
    * @param {Biscuit} biscuit
    */
    verify(root_key, biscuit) {
        _assertClass(root_key, PublicKey);
        _assertClass(biscuit, Biscuit);
        var ptr0 = biscuit.ptr;
        biscuit.ptr = 0;
        wasm.verifier_verify(this.ptr, root_key.ptr, ptr0);
    }
}

export const __wbindgen_json_parse = function(arg0, arg1) {
    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbindgen_json_serialize = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = JSON.stringify(obj === undefined ? null : obj);
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbg_log_8b61bc5c1cc08278 = function(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
};

export const __wbg_randomFillSync_d5bd2d655fdf256a = function(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_getRandomValues_f5e14ab7ac8e995d = function(arg0, arg1, arg2) {
    getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_self_1b7a39e3a92c949c = function() {
    try {
        var ret = self.self;
        return addHeapObject(ret);
    } catch (e) {
        handleError(e)
    }
};

export const __wbg_require_604837428532a733 = function(arg0, arg1) {
    var ret = require(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_crypto_968f1772287e2df0 = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbg_getRandomValues_a3d34b4fee3c2869 = function(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

export const __wbindgen_debug_string = function(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
};

