import mongoose from 'mongoose'

interface UserInterface {
    name: string,
    email: string,
    password: string,
    id? : string
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
})

const User = mongoose.model<UserInterface>("User", userSchema);

export default User;