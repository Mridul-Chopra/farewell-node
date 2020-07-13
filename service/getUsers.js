const getUsers = require('../dao/getUsers');


module.exports =async ()=>{

    try{
        let users = await getUsers();
        if(users.length===0){
            return {'isEmpty':true , success:true} // if no data available
        }else{
            return {data:users , success:true ,isEmpty:false}   // return the data
        }
    }catch(e){
        return {status:'Some error occoured ..' ,success:false} // if some error occours
    }
}