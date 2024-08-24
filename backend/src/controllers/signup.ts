import {
  async_error_handler,
  createJwt,
  Custom_error,
  Custom_response,
  hashPassword,
} from '@himanshu_guptaorg/utils';
import { UserModel } from '../models/user';

const signUp = async_error_handler(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new Custom_error({
      errors: [{ message: 'sendCompleteInfo' }],
      statusCode: 400,
    });
  }

  const existingUser = await UserModel.findOne({ name });
  if (existingUser) {
    throw new Custom_error({
      errors: [{ message: 'nameAlreadyExists' }],
      statusCode: 400,
    });
  }

  const hashedPass = await hashPassword(password);

  let user = await UserModel.build({ name, password: hashedPass }).save();

  const token = await createJwt(
    { payload: { _id: user._id }, options: {} },
    process.env.JWT_SECRET!
  );

  const response = new Custom_response(
    true,
    null,
    { token, name },
    'success',
    201,
    null
  );
  res.json(response);
});

export default signUp;
