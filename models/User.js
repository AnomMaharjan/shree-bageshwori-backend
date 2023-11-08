import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}
);

const User = new mongoose.model('User', userSchema);

export default User

// function validateUser(user){
//     const schema = Joi.object({
//         username: Joi.string().min(5).required(),
    
    
//     })
// }


