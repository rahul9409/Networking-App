const express=require('express')
const router=express.Router();
const User=require("../models/userSchema");
require("../db/conn");
const path=require("path")

router.post('/register',async(req,res)=>{
   let {name, email,password}=req.body;
   let parent1= req.body.remail
   let parent2=""
   let parent3=""
            const userExist=await User.findOne({email:email})
            if(userExist){
                return res.status(422).json({error:"Email already exist"});
            }
            if(email==parent1){
                res.send("your id and refrence id can not be same")
            }
            if(!parent1){
                parent2=parent1;
                parent3=parent1
            }
            const p2=await User.findOne({email:parent1})
            if(p2){
                parent2=p2.parent1;
            }
            const p3=await User.findOne({email:parent2})
            if(p3){
                parent3=p3.parent1;
            }
            const user=new User({name,email,parent1,parent2,parent3,password});
            await user.save()

            return res.sendFile(path.join(__dirname,"../reglog/login.html"));

            

});
router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../reglog/login.html"))
})

router.post('/login',async(req,res)=>{
    const {email, password}=req.body;
    req.session.email=email;
    try{
        const userLogin=await User.findOne({email:email})
            if(userLogin){
                if(userLogin.password==password){
                    return res.sendFile(path.join(__dirname,"../views/DashBoard.html"));
                }
                else{
                    return res.json({error:"invalid credentials"});
                }
            }
            else{
                return res.json({error:"invalid credentials"});
            }

    } catch(err){console.log(err)}
})
router.post("/DashBoard",async(req,res)=>{
    let addAmount=req.body.addAmount;
    const userLogin=await User.findOne({email:req.session.email})
    const id=userLogin._id
    if(!addAmount){
        addAmount=0;
    }
    const addAmount1=userLogin.addedAmount;
    await User.updateOne({"_id":id},{$set:{"addedAmount":(addAmount1+addAmount)}})
    let p1=userLogin.parent1;
    let p2=userLogin.parent2;
    let p3=userLogin.parent3;
    const userLogin1=await User.findOne({email:p1})
    const id1=userLogin1._id;
    recievedAmount1=userLogin1.recievedAmount
    await User.updateOne({"_id":id1},{$set:{"recievedAmount":(recievedAmount1+0.4*addAmount)}})

    const userLogin2=await User.findOne({email:p2})
    const id2=userLogin2._id;
    recievedAmount2=userLogin2.recievedAmount
    await User.updateOne({"_id":id2},{$set:{"recievedAmount":(recievedAmount2+0.2*addAmount)}})

    const userLogin3=await User.findOne({email:p3})
    const id3=userLogin1._id;
    recievedAmount3=userLogin3.recievedAmount
    await User.updateOne({"_id":id3},{$set:{"recievedAmount":(recievedAmount3+0.1*addAmount)}})
    const finaladd=userLogin.addedAmount;
    const finalrecieved=userLogin.recievedAmount;
    res.send(`Added amount by user is ${finaladd}`)
    res.send(`recieved amount by user is ${finalrecieved}`)
 })
module.exports=router;