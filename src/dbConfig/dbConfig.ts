import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo DB connected Succesfully");
        })

        connection.on('error', (err) => {
            console.log('MongoDB Connection error. Please make sure MongoDb is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Some goes wrong!');
        console.log(error);
    }
}