const insertComment = require('../dao/insertComment');

module.exports = async (sender,receiver,message)=>{

    if(sender===receiver){
        return {status:'Sender and Receiver cannot be same' , success:false}
    }else{
        try{
            let result = await insertComment(sender,receiver,message); // call the dao method
            return {status:'Insertion successful' , success:true};      // return the result
        }catch(e){
            return {status:'Some error occoured..' , success:false} // if error occours
        }
    }
    
}