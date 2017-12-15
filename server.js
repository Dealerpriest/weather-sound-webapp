var express = require('express');
var ws =  require('ws');

var port = 443

/**
 * Processes the command line arguments when app is launched
 */
var processArguments = function(){
    var argv = process.argv;
    for(var i = 0; i < argv.length; i++){
        switch(argv[i]){
            // case "-l":
            // case "--log":
            // 	setLogLevel("info");
            // 	break;
            // case "--loglevel":
            // 	setLogLevel( argv[(i += 1)] );
            // 	break;
            // case "-h":
            // case "--help":
            //     printHelp();
            //     help = true;
            //     break;
            case "-p":
            case "--port":
                setPort(argv[++i]);
                break;
            // case "-c":
            // case "--close":
            //     forceClose = true;
            //     break;
            // case "-t":
            // case "--timeout":
            //     forceClose = true;
            //     setCloseTimeout(argv[++i]);
            //     break;
            // case "--ping":
            //     doPing = true;
            //     break;
            // case "--noping":
            //     doPing = false;
            //     break;
            // case "--pinginterval":
            //     doPing = true;
            //     setPingIntervalTime(argv[++i]);
            //     break;
            // case "--persist":
            //     persist = true;
            //     break;
            // case "--nopersist":
            //     persist = false;
            //     break;
        }
    }
};

/**
 * Set the port to open for ws connections.
 */
var setPort = function(newPort){
    var tempPort = parseInt(newPort, 10);
    //check that tempPort != NaN
    //and that the port is in the valid port range
    if (tempPort == tempPort &&
        tempPort >= 1 && tempPort <= 65535){
        port = tempPort;
    }
};

var main = function(){
	processArguments();
}

const server = express()
.use((req, res) => res.sendFile('index.html') )
.listen(port, () => console.log(`Listening on ${ port }`));

main();