import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  // Restaurant Name
    email: { type: String, required: true, unique: true }, // Owner's Email
    password: { type: String, required: true }, // Encrypted Password
    contact: { type: String, required: true }, // Contact Number
    address: { type: String, required: true }, // Full Address
    city: { type: String, required: true }, // City Name
   
    
  },
  { timestamps: true } // Auto adds createdAt & updatedAt
);

export default mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
