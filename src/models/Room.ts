import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["Single", "Double", "Suite", "Deluxe"], required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of URLs
  amenities: [{ type: String }], // e.g., ["WiFi", "AC", "Mini Bar"]
  isAvailable: { type: Boolean, default: true },
  housekeepingStatus: { type: String, default: "Clean" }
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);