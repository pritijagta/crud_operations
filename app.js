const express=require("express")
const path=require("path")
const app=express();
const userModel=require("./models/user")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,'public')))
app.get("/",function (req,res) {
    res.render("index");
    
})
app.get("/read",async function(req,res)
{
        let allusers=await userModel.find();
        res.render("read",{users:allusers})
    
})
app.post('/create', async function (req, res) {
    try {
      console.log('Received request body:', req.body); // Log request body
      const userCreate = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
      });
      console.log('User created:', userCreate); // Log created user
      res.redirect("/read");
    } catch (err) {
      console.error('Error creating user:', err); // Log error
      res.status(500).send('Internal Server Error');
    }
  });
  

app.get("/delete/:id",async function(req,res)
{
        let users=await userModel.findOneAndDelete({_id:req.params.id});
        res.redirect("/read")
    
})
app.get("/edit/:id",async function(req,res)
{
        let user=await userModel.findOne({_id:req.params.id});
        res.render("edit",{user:user})
    
})

app.post("/update/:id",async function(req,res)
{
        let{name,email,image}=req.body
        let user=await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true});
        res.redirect("/read")
    
})
app.listen(3000);