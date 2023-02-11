'use strict';
/**
 * Module dependencies.
 */

import app from '../app.js';
import * as http from 'http';

const port = 4747;

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
    const addr = server.address();
    if (addr != null) {
        const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log('Listening on ' + bind);
    }
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        console.error(bind + 'requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + 'is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port,on all network interfaces.
 */

server.listen(port, onListening);
server.on('error', onError);
