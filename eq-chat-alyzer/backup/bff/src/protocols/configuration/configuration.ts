// TODO Code Separation


// import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

// interface Configuration {
//     characterName: string;
//     tankName: string;
// }

// function getConfiguration(call: ServerUnaryCall<null, Configuration>, callback: sendUnaryData<Configuration>): void {
//     callback(null, { characterName: 'gerlocian', tankName: 'mystbeard' });
// }

// function setConfiguration(call: ServerUnaryCall<Configuration, Configuration>, callback: sendUnaryData<Configuration>): void {
//     const newConfig = call.request;

//     callback(null, newConfig);
// }

/*
server.addService(configuration.service, {
    getConfiguration: getConfiguration,
    setConfiguration: setConfiguration,
});
*/


