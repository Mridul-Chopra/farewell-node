const authenticate = require('../dao/authenticate');

module.exports  = async (id , password)=>{
    
    try{

        let result = await authenticate(id,password); // call the dao method to authenticate
        if(result.length===0){  // if no data is found
            return {status:'Wrong Credentials' , isAuthenticated:false}  
        }else{
            return {...result[0],isAuthenticated:true}  // if user is authenticated
        }
    }catch(e){
        return {status:'Some error occoured' , isAuthenticated:false}   // if some error occours
    }
}
