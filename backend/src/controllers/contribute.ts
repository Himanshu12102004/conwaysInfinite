import {
  async_error_handler,
  Custom_error,
  Custom_response,
} from '@himanshu_guptaorg/utils';
import { reqWithUser } from '../types';
import { PatternModel } from '../models/pattern';
import { Schema } from 'mongoose';
import { UserModel } from '../models/user';
import parseGrid from '../helpers/parseGrtid';

const contribute = async_error_handler(async (req: reqWithUser, res, next) => {
  const user = req.user!;
  let { name, description, grid } = req.body;
  if (description.length >= 150)
    throw new Custom_error({
      errors: [{ message: 'descriptionTooLong' }],
      statusCode: 400,
    });
  const alreadyPresent = await PatternModel.findOne({ name });
  if (alreadyPresent)
    throw new Custom_error({
      errors: [{ message: 'nameAlreadyExist' }],
      statusCode: 400,
    });
  grid = parseGrid(grid);
  const pattern = await PatternModel.build({
    name,
    description,
    grid,
    contributedBy: user._id as Schema.Types.ObjectId,
  }).save();
  await UserModel.findByIdAndUpdate(user._id, {
    $push: { contributions: pattern._id },
  });
  const response = new Custom_response(
    true,
    null,
    { pattern },
    'Pattern contributed successfully',
    201,
    null
  );
  res.status(201).json(response);
});

export default contribute;
