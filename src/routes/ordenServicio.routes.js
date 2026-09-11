const express = require('express');

const router = express.Router();

const {
  obtenerOrdenes,
  crearOrden,
} = require('../controllers/ordenServicio.controller');

router.get('/ordenes', obtenerOrdenes);

router.post('/ordenes', crearOrden);

module.exports = router;