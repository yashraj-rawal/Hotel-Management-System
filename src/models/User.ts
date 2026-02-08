import mongoose, {Schema, model, models} from "mongoose";

const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },

    role: {
        type: String,
        enum: ["admin", "staff", "user"],
        default: "user"
    },

    image: {
        type: String,
        default: ""
    },

    phoneNumber: {
        type: String
    }

}, {timestamps: true,})

const User = models.User || model("User", UserSchema)

export default User