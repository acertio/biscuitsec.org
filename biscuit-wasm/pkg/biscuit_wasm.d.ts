/* tslint:disable */
/* eslint-disable */
/**
* @param {BigInt} i 
* @returns {any} 
*/
export function integer(i: BigInt): any;
/**
* @param {string} s 
* @returns {any} 
*/
export function string(s: string): any;
/**
* @param {string} s 
* @returns {any} 
*/
export function symbol(s: string): any;
/**
* @param {BigInt} i 
* @returns {any} 
*/
export function date(i: BigInt): any;
/**
* @param {number} i 
* @returns {any} 
*/
export function variable(i: number): any;
/**
* @param {string} name 
* @param {any} ids 
* @returns {Fact} 
*/
export function fact(name: string, ids: any): Fact;
/**
* @param {string} head_name 
* @param {any} head_ids 
* @param {any} predicates 
* @returns {Rule} 
*/
export function rule(head_name: string, head_ids: any, predicates: any): Rule;
/**
* @param {string} head_name 
* @param {any} head_ids 
* @param {any} predicates 
* @param {any} constraints 
* @returns {Rule} 
*/
export function constrained_rule(head_name: string, head_ids: any, predicates: any, constraints: any): Rule;
export class Atom {
  free(): void;
}
export class Biscuit {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} slice 
* @returns {Biscuit} 
*/
  static from(slice: Uint8Array): Biscuit;
/**
* @param {Uint8Array} slice 
* @param {Uint8Array} secret 
* @returns {Biscuit} 
*/
  static fromSealed(slice: Uint8Array, secret: Uint8Array): Biscuit;
/**
* @returns {Uint8Array} 
*/
  toVec(): Uint8Array;
/**
* @returns {BlockBuilder} 
*/
  createBlock(): BlockBuilder;
/**
* @param {KeyPair} keypair 
* @param {BlockBuilder} block_builder 
* @returns {Biscuit} 
*/
  append(keypair: KeyPair, block_builder: BlockBuilder): Biscuit;
/**
* @returns {string} 
*/
  print(): string;
}
export class BiscuitBuilder {
  free(): void;
/**
* @param {any} base_symbols 
*/
  constructor(base_symbols: any);
/**
* @returns {BiscuitBuilder} 
*/
  static newWithDefaultSymbols(): BiscuitBuilder;
/**
* @param {Fact} fact 
*/
  addAuthorityFact(fact: Fact): void;
/**
* @param {Rule} rule_bind 
*/
  addAuthorityRule(rule_bind: Rule): void;
/**
* @param {Rule} rule_bind 
*/
  addAuthorityCaveat(rule_bind: Rule): void;
/**
* @param {string} resource 
* @param {string} right 
*/
  addRight(resource: string, right: string): void;
/**
* @param {KeyPair} root 
* @returns {Biscuit} 
*/
  build(root: KeyPair): Biscuit;
/**
* @param {KeyPair} root 
* @returns {string} 
*/
  print(root: KeyPair): string;
}
export class BlockBuilder {
  free(): void;
/**
*/
  constructor();
/**
* @param {Fact} fact 
*/
  addFact(fact: Fact): void;
/**
* @param {Rule} rule 
*/
  addRule(rule: Rule): void;
/**
* @param {Rule} caveat 
*/
  addCaveat(caveat: Rule): void;
}
export class Fact {
  free(): void;
}
export class KeyPair {
  free(): void;
/**
*/
  constructor();
/**
* @returns {PublicKey} 
*/
  publicKey(): PublicKey;
/**
* @param {Uint8Array} slice 
* @returns {KeyPair} 
*/
  static fromBytes(slice: Uint8Array): KeyPair;
/**
* @param {Uint8Array} slice 
*/
  toBytes(slice: Uint8Array): void;
}
export class PublicKey {
  free(): void;
/**
* @param {Uint8Array} slice 
*/
  toBytes(slice: Uint8Array): void;
}
export class Rule {
  free(): void;
}
export class SymbolTable {
  free(): void;
}
export class Verifier {
  free(): void;
/**
*/
  constructor();
/**
* @param {Fact} fact 
*/
  addFact(fact: Fact): void;
/**
* @param {Rule} rule_bind 
*/
  addRule(rule_bind: Rule): void;
/**
* @param {Rule} caveat 
*/
  addCaveat(caveat: Rule): void;
/**
* @param {string} resource 
*/
  addResource(resource: string): void;
/**
* @param {string} operation 
*/
  addOperation(operation: string): void;
/**
* @param {BigInt} i 
*/
  setTime(i: BigInt): void;
/**
* @param {BigInt64Array} ids 
*/
  revocationCheck(ids: BigInt64Array): void;
/**
* @param {PublicKey} root_key 
* @param {Biscuit} biscuit 
*/
  verify(root_key: PublicKey, biscuit: Biscuit): void;
}
