const cron = require("node-cron");
const rps = require('../containers/events/services');
const connectedUser = require('../helpers/connectedUser');

// async function WinnerAlert(){
//     const winner = await
// }

module.exports = function (io) {
    io.on('connection', function (socket) {
        cron.schedule("19 * * * * *", function () {
            //io.emit('EVENT_INITIAL');
            //rps.initial();
            //find winner then emit to winner game notifacation
            rps.initial().then(result=>{
                let winner = result.winner;
                let history = result.history;
                console.log(result);
                if(winner){
                    let clientsId = connectedUser.getUserClientsId(winner.userName);
                    //filter a clients with account is Winner
                    let uniqueClientsId = [...new Set(clientsId)];
                   
                    let isWinner = uniqueClientsId.indexOf(socket.id);
                    if(isWinner != -1){
                        socket.emit('WIN_ALERT',winner.userName);
                    }
                }

                socket.emit("EVENT_HISTORY",history);
                io.emit('EVENT_INITIAL');
            });
          
        });
    });



    // cron.schedule("*/31 * * * * *", function () {
    //     console.log("thong bao cho winner");
    //     //rps.initial();
    // });
};
