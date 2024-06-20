import { Schema, model,Types } from 'mongoose';

interface IFlipper {
    imgUri: string[];
    title: string;
    isNew: boolean;
    price: number;
    isInStock: boolean;
    releaseDate: Date;
    note: number;
    marque: Types.ObjectId;
}

const flipperSchema = new Schema<IFlipper>({
    imgUri: { type: [String], required: true, lowercase: true, trim: true},
    title: { type: String, required: true },
    isNew: Boolean,
    price: { type: Number, required: true },
    isInStock: Boolean,
    releaseDate:{type:Date, default: Date.now},
    note:{ type: Number, required: true },
    marque:[{ type:Types.ObjectId, ref: 'marques' }],
});

const Flipper = model<IFlipper>('flippers', flipperSchema);
export {Flipper,IFlipper}
