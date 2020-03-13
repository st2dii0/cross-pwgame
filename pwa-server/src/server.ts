  
import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players = [];
let magicNumber = 0;

app.get("/", (_, res) => {
	res.send("hello fellows");
});

io.on("connection", socket => {
	console.log("new connection");
	socket.emit("event::hello");

	socket.on("event::initialize", payload => {
		if (players.length >= 2) {
			socket.emit("event::gameFull");
			return;
		}

		players.push(payload);
		console.log("new name received: ", payload.nickname);

		if (players.length === 2) {
            io.emit("event::gameStart");
            magicNumber = Math.floor(Math.random()*10);
		}
    });
    
    socket.on("event::magicNumber", payload =>{
        let state = "";
        let players = payload.username;
        if(payload.number < magicNumber){
            state = "Lower";
        } else if(payload.number > magicNumber){
            state = "Higher";
        } else if(payload.number = magicNumber){
            state = "Correct";
        }
    })
    socket.emit("emit::magicNumberState", {state: String, nickname: String})
});

server.listen(PORT, () => {
	console.log(`Server ready at ... ${PORT}`);
});