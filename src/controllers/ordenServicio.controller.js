const OrdenServicio = require('../models/ordenServicio.model');

const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await OrdenServicio.findAll({
      order: [['id', 'ASC']],
    });

    res.status(200).json({
      success: true,
      data: ordenes,
    });
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);

    res.status(500).json({
      success: false,
      message: 'Error al obtener las órdenes de servicio.',
    });
  }
};

const crearOrden = async (req, res) => {
  try {
    const {
      numeroOrden,
      equipo,
      servicio,
      fechaIngreso,
      fechaEntrega,
      estado,
      tecnico,
    } = req.body;

    if (
      !numeroOrden ||
      !equipo ||
      !servicio ||
      !fechaIngreso ||
      !fechaEntrega ||
      !estado ||
      !tecnico
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos de la orden son obligatorios.',
      });
    }

    const nuevaOrden = await OrdenServicio.create({
      numeroOrden,
      equipo,
      servicio,
      fechaIngreso,
      fechaEntrega,
      estado,
      tecnico,
    });

    return res.status(201).json({
      success: true,
      data: nuevaOrden,
    });
  } catch (error) {
    console.error('Error al crear la orden:', error);

    return res.status(500).json({
      success: false,
      message: 'Error al crear la orden de servicio.',
    });
  }
};

module.exports = {
  obtenerOrdenes,
  crearOrden,
};