const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const JwtDecode = require('jwt-decode');
const SECRET_KEY = process.env.SECRET_KEY;

/*Provides the jwt token */
function getToken(data){
    return new Promise((resolve,reject)=>{
        jwt.sign(data,SECRET_KEY,(err,token)=>{
            if(err){
                reject(err) // reject if there is error
            }else{
                resolve(token) // provide the token if no error
            }
        })
    })
}

/*This function is used to extract the token from the req object */
function extractToken(req,res,next){
    
    let cookies = req.cookies;
    if(cookies==undefined){
        //res.sendStatus(403);    
        return;
    }else{

        let bearerHeader = req.cookies.jwt; // get the jwt field from the cookies
        
        if(typeof bearerHeader != undefined){
            let bearer = bearerHeader.split(' '); // split the jwt field value
            let token  = bearer[1]; //  extract the token
            req.token = token; // set the token in the req object
            next(); // call the next mid dleware
        }else{
            res.sendStatus(403);
        }
    }
}


/* This function is used to verify the token */
function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,SECRET_KEY,(err,authData)=>{

            console.log('Auth data is : ', authData);

            if(err){
                resolve(err)
            }else{
                resolve(JwtDecode(token))
            }
                
        })
    })
}

module.exports = {
    getToken,
    verifyToken,
    extractToken
}