import { Response, request, RequestInit } from 'undici';
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

interface ResponseLike extends Pick<Response, 'arrayBuffer' | 'bodyUsed' | 'headers' | 'json' | 'ok' | 'status' | 'statusText' | 'text'> {
    body: Readable | ReadableStream | null;
}

type RequestOptions = Exclude<Parameters<typeof request>[1], undefined>;
declare function makeRequest(url: string, init: RequestInit): Promise<ResponseLike>;
declare function resolveBody(body: RequestInit['body']): Promise<Exclude<RequestOptions['body'], undefined>>;

export { RequestOptions, makeRequest, resolveBody };
