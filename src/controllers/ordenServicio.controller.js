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

// Actualiza el estado de una orden de servicio.
const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Verificamos que se haya enviado el nuevo estado.
    if (!estado) {
      return res.status(400).json({
        success: false,
        message: 'El estado es obligatorio.',
      });
    }

    // Buscamos la orden por su ID.
    const orden = await OrdenServicio.findByPk(id);

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden de servicio no encontrada.',
      });
    }

    // Actualizamos el estado de la orden.
    orden.estado = estado;

    await orden.save();

    return res.status(200).json({
      success: true,
      message: 'Estado de la orden actualizado correctamente.',
      data: orden,
    });
  } catch (error) {
    console.error('Error al actualizar el estado:', error);

    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el estado de la orden.',
    });
  }
};

module.exports = {
  obtenerOrdenes,
  crearOrden,
  actualizarEstado,
};