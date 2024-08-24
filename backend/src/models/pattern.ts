import mongoose, { Schema } from 'mongoose';
import { UserDoc } from './user'; 

interface PatternAttributes {
  name: string;
  contributedBy: mongoose.Schema.Types.ObjectId | UserDoc;
  description: string;
  grid: string[];
}

interface PatternDoc extends mongoose.Document, PatternAttributes {}

interface PatternModel extends mongoose.Model<PatternDoc> {
  build(attributes: PatternAttributes): PatternDoc;
}

const patternSchema = new mongoose.Schema<PatternDoc>({
  name: { type: String, required: true, unique: true },
  contributedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: { type: String, required: true },
  grid: {
    type: [String],
    required: true,
  },
});

patternSchema.statics.build = (attributes: PatternAttributes) => {
  return new PatternModel(attributes);
};

const PatternModel = mongoose.model<PatternDoc, PatternModel>('Pattern', patternSchema);

export { PatternModel, PatternDoc };
