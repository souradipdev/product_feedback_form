import mongoose, { Schema, Document, Model } from 'mongoose';

interface IForm extends Document {
  name: string;
  email: string;
  phone: string;
  satisfactionRating: number;
  easeOfUse: number;
  featureCompleteness: number;
  recommend: "yes" | "no";
  customerRecomendation: string;
}

const FormSchema: Schema<IForm> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  satisfactionRating: { type: Number, required: true },
  easeOfUse: { type: Number, required: true },
  featureCompleteness: { type: Number, required: true },
  recommend: { type: String, enum: ["yes", "no"], required: true },
  customerRecomendation: { type: String }
}, { timestamps: true });

const FormModel = (mongoose.models.Form as mongoose.Model<IForm>) || mongoose.model<IForm>('Form', FormSchema);

export default FormModel;
