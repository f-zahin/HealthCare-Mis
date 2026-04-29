import {PerscriptionModel} from '../model/PerscriptionModel.js';

export const addPerscription = async (req, res) => {
  try {
    const { abstinance, perscription } = req.body;

    const data = await PerscriptionModel.create({
      patientId: req.params.id,
      abstinance,
      perscription,
    });

    return res.status(200).json({
      success: true, // fix typo
      data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};