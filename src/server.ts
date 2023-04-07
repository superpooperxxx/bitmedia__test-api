import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now running at port ${PORT}`);
});
