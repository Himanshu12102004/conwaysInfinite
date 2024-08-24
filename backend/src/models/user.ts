import mongoose from 'mongoose';

interface UserAttributes {
  name: string;
  password: string;
}
interface UserDoc extends mongoose.Document, UserAttributes {
  contributions: string[];
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}
const userSchema = new mongoose.Schema<UserDoc>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contributions: {
    type: [String],
    default: [],
    ref: 'Pattern',
  },
});
userSchema.statics.build = (attributes: UserAttributes) => {
  return new UserModel(attributes);
};
const UserModel = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { UserModel, UserDoc };
