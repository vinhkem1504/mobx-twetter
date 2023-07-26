import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {type: String, unique: true, trim: true, required: [true, 'Name must be required']},
    email: {type: String, unique: true, trim: true, required: [true, 'Email must be required']},
    password: {type: String, unique: false, trim: true, required: [true, 'Password must be required'], minlength: [6, 'Password must be at 6 characters']}
}, {timestamps: true})

//Hash the password before save in DB
userSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err)
        }
        else{
            user.password = hash;
            next();
        }
    })
})

export const User = mongoose.model('User', userSchema);
