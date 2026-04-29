import mongoose from "mongoose";

const PerscriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  abstinance: {
    type: String,
  },
  perscription: {
    type: String,
    required: true,
  },
});

const PerscriptionModel = mongoose.model("Perscription", PerscriptionSchema);
export { PerscriptionModel };
