import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDatabase;
