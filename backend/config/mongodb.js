import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI); // ← No options needed

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); // Exit process with failure

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);

    }
};

export default connectDB;
