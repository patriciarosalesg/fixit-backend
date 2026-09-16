const OrdenServicio = require('../models/ordenServicio.model');
const { generarFacturaPDF } = require('../services/factura.service');

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
      costoTotal,
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
      costoTotal: costoTotal || 0,
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

// Actualiza los datos de una orden de servicio.
const actualizarOrden = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      equipo,
      servicio,
      fechaEntrega,
      costoTotal,
      estado,
    } = req.body;

    const orden = await OrdenServicio.findByPk(id);

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden de servicio no encontrada.',
      });
    }

    if (equipo !== undefined) {
      orden.equipo = equipo;
    }

    if (servicio !== undefined) {
      orden.servicio = servicio;
    }

    if (fechaEntrega !== undefined) {
      orden.fechaEntrega = fechaEntrega;
    }

    if (costoTotal !== undefined) {
      orden.costoTotal = costoTotal;
    }

    if (estado !== undefined) {
      orden.estado = estado;
    }

    await orden.save();

    return res.status(200).json({
      success: true,
      message: 'Orden actualizada correctamente.',
      data: orden,
    });
  } catch (error) {
    console.error('Error al actualizar la orden:', error);

    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la orden de servicio.',
    });
  }
};

// Genera la factura PDF de una orden de servicio.
const generarFactura = async (req, res) => {
  try {
    const { id } = req.params;

    const orden = await OrdenServicio.findByPk(id);

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden de servicio no encontrada.',
      });
    }

    generarFacturaPDF(orden, res);
  } catch (error) {
    console.error('Error al generar la factura:', error);

    return res.status(500).json({
      success: false,
      message: 'Error al generar la factura.',
    });
  }
};

module.exports = {
  obtenerOrdenes,
  crearOrden,
  actualizarOrden,
  generarFactura,
};