

const authorized = async (req,res,next)=>{
    return (role = [])=>{
        if ( !req.user.role.includes(role) ){
            throw new Error("you are not authorized",{caused : 403});
        }
        next();
    }
}