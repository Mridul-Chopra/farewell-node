const pool = require('./pool')


module.exports = (receiver,sender,message)=>{

    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{ // get connection from the pool
            if(err){
                console.log(err) // log the error in the console
                reject()    // reject the promise
            }else{
                // query to be executed
                let query = 'Insert into comments (receiver,sender,message) values (? , ? , ?) ;'; 
                connection.query(query,[receiver,sender,message],(err,result)=>{
                    if(err){    // if error executing the query
                        
                        if(err.code==='ER_DUP_ENTRY'){  // if there is duplicate entry then update the message

                            let query ='Update comments set message = ? where receiver = ? and sender = ? ';    // update query to be executed
                            connection.query(query,[message,receiver,sender],(err,result)=>{    // execute the query
                                if(err){
                                    console.log(err); // log the error
                                    reject();   // reject the promise
                                    connection.release();   // release the connection
                                }else{
                                    queryResult = JSON.parse(JSON.stringify(result));   // convert the result in the proper format
                                    connection.release();   // release the connection
                                    resolve(result);    // resolve the promise
                                }
                            })

                        }else{
                            console.log(err); // log the error in the console
                            connection.release();   // release the connection
                            reject()    // reject the promise
                        }
                        
                    }else{
                        let queryResult = JSON.parse(JSON.stringify(result));   // convert the result in proper format
                        resolve(queryResult);   // resolve the query
                        connection.release();   // release the connection
                    }
                })
            }
        })
    })
}