const {getUser}=require("../service/auth")

// function restrictToLoggedInUserOnly(req,res,next){
//     const userUid=req.cookies?.uid
//     if(!userUid) return res.redirect("/login")

//     const user=getUser(userUid)
//     if(!user) return res.redirect("/login")
//     req.user=user  //else condition
    
//     next()
// }

function checkAuth(req,res,next){  // Soft Check //
    const userUid=req.cookies?.uid

    const user=getUser(userUid)
    
    req.user=user  //else condition
    
   return next()
}

function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user) return res.redirect("/login")

        if(!roles.includes(req.user.role)) return res.send("Unauthorised")

        return next()
    }
}

module.exports={
    // restrictToLoggedInUserOnly,
    restrictTo,
    checkAuth
}

// const {getUser}=require("../service/auth")

// function restrictToLoggedInUserOnly(req,res,next){
//     const userUid=req.headers["authorization"]
//     if(!userUid) return res.redirect("/login")

//     const token=userUid.split("Bearer ")[1]

//     const user=getUser(token)
//     if(!user) return res.redirect("/login")
//     req.user=user  //else condition
    
//     next()
// }

// function checkAuth(req,res,next){
//     console.log(req.headers)
//     const userUid=req.headers["authorization"]
//     const token=userUid.split("Bearer ")[1]

//     const user=getUser(token)
    
//     req.user=user  //else condition
    
//     next()
// }



// module.exports={
//     restrictToLoggedInUserOnly,checkAuth
// }