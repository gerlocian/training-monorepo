import { 
    ClientReadableStream, 
    credentials,
    loadPackageDefinition, 
    Server, 
    ServerCredentials,
    ServiceClientConstructor, 
    UntypedHandleCall, 
    UntypedServiceImplementation 
} from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'node:path';

export type GetRecentLinesFromLogMethod = UntypedHandleCall & ((call: ClientReadableStream<string>) => void);
export type StartServerMethod = (host: string, port: string, callback: () => void) => void;
export type StopServerMethod = (callback: () => void) => void;

export interface ServiceMethodImplementation extends UntypedServiceImplementation {
    'getRecentLinesFromLog': GetRecentLinesFromLogMethod;
}

export function createGrpcServer(methods: ServiceMethodImplementation): [StartServerMethod, StopServerMethod] {
    const ChatLog: ServiceClientConstructor = createPackageDefinition();
    const server = new Server();
    
    server.addService(ChatLog.service, methods);
    return [ startServer(server), stopServer(server) ];
}

export function createGrpcClient(host: string, port: string): ServiceClient {
    const ChatLog: ServiceClientConstructor = createPackageDefinition();
    const client: ServiceClient = new ChatLog(`${host}:${port}`, credentials.createInsecure());
    return client;
}

function createPackageDefinition(): ServiceClientConstructor {
    const packageDef = loadSync(join(__dirname, 'chatlog.proto'), {keepCase: true, defaults: true, oneofs: true});
    return loadPackageDefinition(packageDef).ChatLog as ServiceClientConstructor;
}

function startServer (server: Server): StartServerMethod {
    return (host: string, port: string, callback: () => void) =>
        server.bindAsync(`${host}:${port}`, ServerCredentials.createInsecure(), callback);
}

function stopServer (server: Server): StopServerMethod {
    return (callback: () => void) => server.tryShutdown(callback);
}

