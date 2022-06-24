const Producer = require("../models/Producer");
const User = require("../models/User");

async function LoginUser (req,res) {
    const { username, password } = req.body; 
    try{ 
        if(username && password) {
            let user = await User.findOne({where:{username, password}});
            let producer= await Producer.findOne({where:{username, password}});
            if( user !==null  ) res.json(user);
            if( producer !==null ){
                res.json(producer);
            }else{
                res.send("Los datos ingresados no coinciden con un usuario registrado")
            }
        }else{
            res.send("Complete los datos requeridos")
        }
    }catch(error){
        console.log(error.message)
    }
} 

module.exports = { LoginUser }
