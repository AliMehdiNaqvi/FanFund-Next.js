import mongoose from "mongoose";


const { Schema, model } = mongoose
const PaymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String },
    amount: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done: { type: Boolean }
})
 
export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);