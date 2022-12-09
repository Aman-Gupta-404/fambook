import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;

const FamUserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

FamUserSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    // const hashPass = await bcrypt.hash(password, saltRounds);
    next()
})



const FamUser = mongoose.model("FamUser", FamUserSchema);

export default FamUser;