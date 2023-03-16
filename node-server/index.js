const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/**MongoDB connection */
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/passlogs');
    console.group("DB connected");
}

/**schemas */
const userSchema = new mongoose.Schema({
    passvalue : String,
    strength  : String,
    minsteps  : String
});

/**model*/
const User = mongoose.model('resultlogs',userSchema);

/**setting server */
const server = express();

server.use(cors());
server.use(bodyParser.json());

/**post method data save */
server.post('/api',async(req,res)=>{
    /**getting data */
    let user= new User();
    user.passvalue=req.body.passval;
    user.strength=req.body.strength;
    user.minsteps=req.body.minsteps;
    /**saving data */
    const checksave=await user.save()

    console.log(checksave);
    res.json(checksave);
})

/**post method data save */
server.get('/api',async(req,res)=>{
    const docs=await User.find({});
    res.json(docs);
})

/**listening port at 8080 */
server.listen(8080,()=>{
    console.log("Server Started at 8080")
})

