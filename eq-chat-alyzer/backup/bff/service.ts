// TODO: Code separation.


/*
import {loadPackageDefinition, sendUnaryData, Server, ServerCredentials, ServerUnaryCall, ServiceClientConstructor} from '@grpc/grpc-js';
import {loadSync} from '@grpc/proto-loader';
import {join} from 'node:path';



function createPackageDefinitionFromProtoFile(filename: string, serviceName: string): ServiceClientConstructor {
    const packageDef = loadSync(join(__dirname, filename), {});
    return loadPackageDefinition(packageDef)[serviceName] as ServiceClientConstructor;
}

const configuration: ServiceClientConstructor = createPackageDefinitionFromProtoFile('configuration.proto', 'Configuration');
const rules: ServiceClientConstructor = createPackageDefinitionFromProtoFile('rules.proto', 'Rules');



const server = new Server();

server.addService(rules.service, {});
server.bindAsync('localhost:5000', ServerCredentials.createInsecure(), () => console.log('Running on port localhost:5000'));
*/
