import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config({ path: 'config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  // eslint-disable-next-line no-console
  console.log('Database was successfully connected!');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now running at port ${PORT}`);
});
