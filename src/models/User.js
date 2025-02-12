import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },  // Restaurant Name
        email: { type: String, required: true, unique: true }, // Owner's Email
        password: { type: String }, // Make password optional for OAuth users
        contact: { type: String, required: true }, // Contact Number
        address: { type: String, required: true }, // Full Address
        city: { type: String, required: true }, // City Name
    },
    { timestamps: true }
);

// Password Hashing - Hash only if password is provided
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare Password (Used for normal login)
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Prevent duplicate model registration
export default mongoose.models.User || mongoose.model("User", UserSchema);
