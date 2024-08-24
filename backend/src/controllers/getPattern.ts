import {
  async_error_handler,
  Custom_response,
  Custom_error,
} from '@himanshu_guptaorg/utils';
import { Request, Response, NextFunction } from 'express';
import { PatternModel } from '../models/pattern';
import { reqWithUser } from '../types';
function unicodeToChar(text: string) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}
const getPattern = async_error_handler(
  async (req: reqWithUser, res: Response, next: NextFunction) => {
    let { name, your, search } = req.query;
  
    let patterns: any = [];
    if (name) {
      name = unicodeToChar(name as string);
      patterns = await PatternModel.findOne({
        name,
      }).populate('contributedBy', '-password -contributions');

      if (!patterns) {
        throw new Custom_error({
          errors: [{ message: 'patternNotFound' }],
          statusCode: 404,
        });
      }
      patterns = [patterns];
    } else if ((your as string) == 'true' ) {
      if(!search)
        search=""
      search = unicodeToChar(search as string);
      const regex = new RegExp(`^${search}`, 'i');
      patterns = await PatternModel.find({
        name: { $regex: regex },
        contributedBy: req.user!._id,
      })
        .select('-grid')
        .populate('contributedBy', '-password -contributions');
        
    } else {
      let quer = {};
      if (search) {
        search = unicodeToChar(search as string);
        const regex = new RegExp(`^${search}`, 'i');
        quer = { name: { $regex: regex } };
      }
      patterns = await PatternModel.find(quer)
        .select('-grid')
        .populate('contributedBy', '-password -contributions');
      if(!search)
        patterns.reverse();
    }

    const response = new Custom_response(
      true,
      null,
      patterns,
      'success',
      200,
      null
    );
    res.json(response);
  }
);

export default getPattern;
