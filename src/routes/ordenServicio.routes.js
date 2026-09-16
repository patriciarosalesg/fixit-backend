const express = require('express');

const router = express.Router();

const {
  obtenerOrdenes,
  crearOrden,
  actualizarOrden,
  generarFactura,
} = require('../controllers/ordenServicio.controller');

router.get('/ordenes', obtenerOrdenes);

router.post('/ordenes', crearOrden);

// Actualiza una orden de servicio.
router.put('/ordenes/:id', actualizarOrden);

// Genera la factura PDF de una orden.
router.get('/ordenes/:id/factura', generarFactura);

module.exports = router;