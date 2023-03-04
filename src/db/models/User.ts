import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            min: 7,
            max: 8
        },
        email: {
            type: String,
            required: true,
            min: 4,
            max: 100
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 100
        }
    }
);

const User = mongoose.model("Data", DataSchema);
export default User;