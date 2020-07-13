const getComments = require('../dao/getComments');


module.exports =  async (id)=>{


    try{
        let result = await getComments(id);
    
        if(result.length === 0){
            return {'isEmpty':true , success:true}  // if there are no comments
        }else{
            return {data:result , success:true , isEmpty:false}     // return the data is available
        }
    }catch(e){
        return {status:'Some error occoured .. ' , success:false}
    }
}