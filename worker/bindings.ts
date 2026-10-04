// Small structural contracts for the bindings supplied by Sites.
export interface D1Result {results:Record<string,unknown>[];meta:{changes:number};success:boolean}
export interface D1Statement {bind(...values:unknown[]):D1Statement;first<T=Record<string,unknown>>():Promise<T|null>;run():Promise<D1Result>}
export interface D1Database {prepare(sql:string):D1Statement;batch(statements:D1Statement[]):Promise<D1Result[]>}
interface R2Object {key:string;size:number;httpEtag:string;httpMetadata?:{contentType?:string};range?:{offset:number;length:number};body?:ReadableStream<Uint8Array>;writeHttpMetadata(headers:Headers):void}
export interface R2Bucket {put(key:string,value:ReadableStream<Uint8Array>,options?:unknown):Promise<unknown>;get(key:string,options?:unknown):Promise<R2Object|null>;head(key:string):Promise<R2Object|null>;list(options?:unknown):Promise<{objects:R2Object[];truncated:boolean;cursor?:string}>}
export interface AssetFetcher {fetch(request:Request):Promise<Response>}
