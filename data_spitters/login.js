const bodyParser = require('body-parser');
const jwt = require('../jwt/jwtVerify');
const authenticate = require('../service/authenticate'); 

const urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = (app)=>{

    app.post('/login',urlEncodedParser,async (req,res)=>{


        let status = await authenticate(1,'123'); // call the service layer method to authenticate the user

        if(status.isAuthenticated){
            let token = await jwt.getToken(status); // get the token if authenticated

            /*Send the token as http only cookie */
            res.cookie('jwt',token,{httpOnly:true});

            res.json(status); // send response to client
        }else{
            res.json(status); // if wrong credentials entered
        }

        
    })
}