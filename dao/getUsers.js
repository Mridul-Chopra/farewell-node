/* Requiring all the dependencies for the module */
const mysql = require('mysql');
const pool = require('./pool');

module.exports = ()=>{

    return new Promise((resolve,reject)=>{

        pool.getConnection((err,connection)=>{ // get connection from the pool

            if(err){ // if some error getting the connection 
                console.log(err); // log the errror
                reject(); // reject the promise
                return; // return from the function 
            }

            let query  = "Select id,name from users"; // query to be exected
            connection.query(query,(err,result)=>{ // execute the query
                if(err){
                    console.log(err);  // print error in the console
                    connection.release(); // release the connection 
                    reject(); // reject the promise
                }else{
                    let queryResult = JSON.parse(JSON.stringify(result));  // convert the result in json format
                    resolve(queryResult); // resove the fetched data
                    connection.release(); // release the connection
                }
            })
        })
    })
    
}