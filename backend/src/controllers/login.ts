import { async_error_handler, Custom_error, createJwt, Custom_response } from "@himanshu_guptaorg/utils";
import { UserModel } from '../models/user';
import { checkPasswords } from '@himanshu_guptaorg/utils'; // Assuming comparePasswords is a utility function to compare hashed passwords

const login = async_error_handler(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new Custom_error({
      errors: [{ message: 'sendCompleteInfo' }],
      statusCode: 400,
    });
  }

  const user = await UserModel.findOne({ name });
  if (!user) {
    throw new Custom_error({
      errors: [{ message: 'invalidCredentials' }],
      statusCode: 401,
    });
  }

  const isPasswordCorrect = await checkPasswords(password, user.password);
  if (!isPasswordCorrect) {
    throw new Custom_error({
      errors: [{ message: 'invalidCredentials' }],
      statusCode: 401,
    });
  }

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

export default login;
