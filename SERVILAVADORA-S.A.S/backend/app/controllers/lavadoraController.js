import * as Lavadora from '../models/lavadoraModel.js';

export const obtenerLavadoras = async (req, res) => {
  try {
    const lavadoras = await Lavadora.getLavadoras();
    res.json(lavadoras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearLavadora = async (req, res) => {
  try {
    const nueva = await Lavadora.createLavadora(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
