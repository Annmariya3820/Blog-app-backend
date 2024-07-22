const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/Users")

let app = Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://Annmariyasabu:annmariya@cluster0.gs6ae.mongodb.net/blogappdb?retryWrites=true&w=majority&appName=Cluster0")


//signin

app.post("/signIn",async(req,res)=>{

    let input=req.body
    let result=userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {
                
              const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
              if (passwordValidator) {

                jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                (error,token)=>{
                    if (error) {
                        res.json({"status":"error","errorMessage":error})
                    } else {

                        res.json({"status":"success","token":token,"userId":items[0]._id})
                    }
                })

                
              } else {
                res.json({"status":"Incorrect Password"})
              }

            } else {
                res.json({"status":"invalid Email Id"})
            }
        }
    ).catch()

})

//signup
app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedpassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedpassword)
    req.body.password = hashedpassword


    userModel.find({ email: req.body.email }).then(
        (items) => {

            if (items.length > 0) {
                res.json({ "status": "email id already exist" })

            } else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }


        }
    ).catch()

})



app.listen(3030, () => {
    console.log("server started")
})