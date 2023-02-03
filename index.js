const http = require('http-single-serve');

const {
    WebSocketGameLobbyServer,
    EphemeralDataStore 
} = require('websocket-game-lobby');
 
const datastore = new EphemeralDataStore();

datastore.addEventListener('createGame', async (game, datastore) => {
    game.custom.createdDate = Date.now();
    return game;
});

const gameLobby = new WebSocketGameLobbyServer({
    server: http({
        port: process.env.PORT || 8080,
        root: './src/'
    }),
    datastore
});

const createHandler = async ({ gameId, playerId }, datastore) => {
    console.log("Created Lobby: "+ gameId + " - " + playerId);
};

gameLobby.addEventListener('create', createHandler);
