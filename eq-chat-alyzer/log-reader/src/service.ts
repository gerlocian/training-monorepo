import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { createGrpcServer } from 'protocol-buffers';
// import follow from 'text-file-follower';

// call: ServerUnaryCall<null, Configuration>, callback: sendUnaryData<Configuration>

const [ startServer, stopServer ] = createGrpcServer({
    getRecentLinesFromLog: (call: ServerUnaryCall<void, string>, callback: sendUnaryData<string>) => {
        console.log('hello world!');
        callback(null, 'this is my information');
    }
});

startServer('localhost', '5000', () => console.log('started...'));

