export default function responce(res,status = 200 , data ){
    res.status(status).json({message : `operation succeed that's your data` , ...data })
}