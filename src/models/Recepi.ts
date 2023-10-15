import mongoose, { Schema } from "mongoose";

const recepiSchema: Schema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    itemName: {
        type: String
    },
    heroImage: {
        type: String
    },
    photos: {
        type: [String]
    },
    title: {
        type: String
    },
    serving: {
        type: Number,
    },
    cookingTime: {
        type: String,
    },
    calories: {
        type: Number,
    },
    recepi: {
        type: String,
    }
}, { timestamps: true });

const Recepi =  mongoose.models.recepi || mongoose.model("recepi", recepiSchema);

export default Recepi;
