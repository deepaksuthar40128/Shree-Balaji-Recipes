import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    profile: {
        type: String
    },
    password: {
        type: String
    },
    provider: {
        type: String
    }
}, { timestamps: true });
 
 const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;