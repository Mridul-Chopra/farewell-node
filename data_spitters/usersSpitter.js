/* Require all the dependencies required by the module */
const jwt = require('../jwt/jwtVerify')
const bodyParser = require('body-parser')
const getUsers = require('../service/getUsers')

/* getting the body parser ready to use */
const urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = (app)=>{

    app.post('/users',urlEncodedParser,jwt.extractToken, async (req,res)=>{

        let status = true; //jwt.verifyToken(req.token); // verify the token validity
        if(!status){
            res.sendStatus(403);
        }else{
            let result = await getUsers();
            res.json(result);
        }
    })
}