const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isHotel:{
        type:Boolean,
        default:false,
    }

});

userSchema.pre('save',async function(){
    const user=this;

    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound=await bcrypt.genSalt(10);
        const hast_password=await bcrypt.hash(user.password,saltRound);
        user.password=hast_password;
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password);
};

userSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
            isHotel:this.isHotel,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
         );
    } catch (error) {
        console.error(error);
    }
};

const User=new mongoose.model('User',userSchema);

module.exports=User;