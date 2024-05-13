import { Server, Socket } from 'socket.io';
import follow from 'text-file-follower';
const io = new Server();

function openLogFile(file: string): () => void {
    
}

io.on('connection', (client: Socket) => {


    client.on();
})

io.listen(3050);
