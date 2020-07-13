/*require all the dependencies by the module*/
const mysql = require('mysql');
const pool = require('./pool');


module.exports = (ofUserId)=>{
    return new Promise((resolve,reject)=>{

        pool.getConnection((err,connection)=>{

            if(err){
                console.log(err); // logging the error in the console
                reject();   // reject the promise
                return;     // return from the function
            }

            // query to be executed
            let query = 'SELECT sender,receiver,A.message FROM '+
                            '(SELECT users.id AS sender_id, users.name AS sender , comments.receiver AS receiver_id , message  FROM users JOIN comments  WHERE users.id = comments.sender)AS A '+
                                    'JOIN '+
                            '(SELECT users.id AS receiver_id,users.name AS receiver , message, comments.sender AS sender_id   FROM users JOIN comments WHERE users.id = comments.receiver) AS B '+
                                    'ON A.sender_id = B.sender_id AND A.receiver_id = B.receiver_id AND A.receiver_id=?';   

            connection.query(query,[ofUserId],(err,result)=>{ // executing the query
                if(err){
                    console.log(err);  // print the error in the console
                    connection.release(); // release the connection
                    reject(); // reject the promise
                }else{
                    let queryResult = JSON.parse(JSON.stringify(result)); // convert the result in proper format
                    connection.release(); // release the connection
                    resolve(queryResult); // resolve the result 
                }

            })
        })
    })
    
        
}