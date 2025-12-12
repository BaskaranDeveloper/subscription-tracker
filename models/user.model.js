import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, "User email is required"],
        trim: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: 5,
        maxlength: 50,
    }

}, { timestamps: true });

// Correct way to export model: avoid overwriting existing compiled model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
