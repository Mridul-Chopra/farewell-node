const pool = require('./pool');


module.exports = (id,password)=>{
    return new Promise ((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                console.log(err) // print error in console
                reject()    // reject the promise
            }else{
                query = 'Select id,name from users where id= ? and password = ?';
                connection.query(query,[id,password],(err,result)=>{
                    if(err){
                        console.log(err);   // print the error in the console
                        reject();   // reject the error
                        connection.release();   // release the connection
                    }else{
                        queryResult = JSON.parse(JSON.stringify(result));   // convert the result in proper format
                        resolve(queryResult);   // resolve the error
                        connection.release();   // release the connection
                    }
                })
            }
        })
    })
   
}