import mongoose from "mongoose";

const connect = async (): Promise<void> => {
    try {
        if (process.env.MONGO_URL) {
            let URL: string = process.env.MONGO_URL;
            await mongoose.connect(URL);
            console.log("Connected To DB");
        }
    }
    catch (err) {
        console.log(err);
    }
}

export default connect;