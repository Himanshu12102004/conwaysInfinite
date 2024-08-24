import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
import { Custom_error } from '@himanshu_guptaorg/utils';

dotenv.config({ path: '.env' });
declare global {
  var emails: {};
}

const init = async () => {
  try {
    console.log(process);
    if (!process.env.MONGO_URI)
      throw new Custom_error({
        errors: [{ message: 'MONGO_URINotFound' }],
        statusCode: 500,
      });
    await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);
    app.listen(process.env.PORT, async () => {
      console.log('Server started!!!!!!');
    });
  } catch (err) {
    console.error(err);
  }
};
init();
