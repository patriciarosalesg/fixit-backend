const express = require('express');

const router = express.Router();

const {
  obtenerOrdenes,
  crearOrden,
  actualizarEstado,
} = require('../controllers/ordenServicio.controller');

router.get('/ordenes', obtenerOrdenes);

router.post('/ordenes', crearOrden);

// Actualiza el estado de una orden de servicio.
router.put('/ordenes/:id', actualizarEstado);

module.exports = router;