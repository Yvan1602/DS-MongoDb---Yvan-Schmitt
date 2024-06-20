import { Schema, model } from 'mongoose';


interface IMarque {
    nom: string;
    logo: string;
    description: string;
    guide: string;
}

const marqueSchema = new Schema<IMarque>({
    nom: { type: String, required: true },
    logo: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    guide: { type: String, required: true }
});

const Marque = model<IMarque>('marques', marqueSchema);
export {Marque}
