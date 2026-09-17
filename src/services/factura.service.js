const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// Genera una factura PDF profesional para una orden de servicio.
const generarFacturaPDF = (orden, res) => {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    info: {
      Title: `Factura ${orden.numeroOrden}`,
      Author: 'Tecknos Design Computadoras',
      Subject: 'Factura de servicio técnico',
      Creator: 'Tecknos Design Computadoras',
    },
  });

  // =========================================================
  // COLORES CORPORATIVOS
  // =========================================================

  const azul = '#1565C0';
  const azulOscuro = '#0D47A1';
  const azulClaro = '#EAF3FF';
  const grisFondo = '#F5F7FA';
  const grisTexto = '#4B5563';
  const grisOscuro = '#1F2937';
  const grisLinea = '#D9E1EA';
  const blanco = '#FFFFFF';
  const verde = '#16803C';

  // =========================================================
  // RUTAS DE IMAGEN
  // =========================================================

  const logoPath = path.join(__dirname, '../../assets/logo.png');

  const tieneLogo = fs.existsSync(logoPath);

  // =========================================================
  // DATOS DE LA FACTURA
  // =========================================================

  const numeroOrden = orden.numeroOrden || 'SIN NÚMERO';
  const equipo = orden.equipo || 'No especificado';
  const servicio = orden.servicio || 'Servicio técnico';
  const tecnico = orden.tecnico || 'Área de Soporte Técnico';
  const estado = orden.estado || 'Pendiente';

  const fechaIngreso = orden.fechaIngreso || '-';
  const fechaEntrega = orden.fechaEntrega || '-';

  const cliente = orden.User || {};

  const nombreCliente = cliente.fullName || 'Cliente no registrado';
  const correoCliente = cliente.email || 'No registrado';

  const telefonoCliente = 'No registrado';
  const identidadCliente = 'No registrada';

  const costoTotal = Number(orden.costoTotal || 0);

  const totalFormateado = costoTotal.toLocaleString('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // =========================================================
  // FONDO
  // =========================================================

  doc
    .rect(0, 0, 595.28, 841.89)
    .fill(grisFondo);

  // =========================================================
  // ENCABEZADO
  // =========================================================

  doc
    .rect(0, 0, 595.28, 125)
    .fill(azulOscuro);

  doc
    .rect(0, 117, 595.28, 8)
    .fill(azul);

  // Logo
  if (tieneLogo) {
    try {
      doc.image(logoPath, 42, 22, {
        fit: [115, 80],
        align: 'left',
        valign: 'center',
      });
    } catch (error) {
      console.error('No se pudo cargar el logo:', error);
    }
  }

  // Información de la empresa
  doc
    .font('Helvetica-Bold')
    .fontSize(18)
    .fillColor(blanco)
    .text('Tecknos Design Computadoras', 175, 27, {
      width: 220,
    });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor('#DDEBFF')
    .text('Avenida 14 de Julio, sector Iglesia Suyapa', 175, 52);

  doc
    .text('La Ceiba, Atlántida, Honduras', 175, 67);

  doc
    .text('Tel. 3235-5440', 175, 82);

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('#C9DEFF')
    .text('RTN: 0801-0000-000000', 175, 98);

  // =========================================================
  // TÍTULO DE FACTURA
  // =========================================================

  doc
    .font('Helvetica-Bold')
    .fontSize(25)
    .fillColor(blanco)
    .text('FACTURA', 420, 29, {
      width: 135,
      align: 'right',
    });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor('#DDEBFF')
    .text(`No. ${numeroOrden}`, 420, 62, {
      width: 135,
      align: 'right',
    });

  doc
    .text(`Fecha: ${fechaEntrega}`, 420, 78, {
      width: 135,
      align: 'right',
    });

  // =========================================================
  // CONTENEDOR PRINCIPAL
  // =========================================================

  doc
    .roundedRect(35, 150, 525, 640, 10)
    .fill(blanco);

  // =========================================================
  // DATOS DEL CLIENTE
  // =========================================================

  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('DATOS DEL CLIENTE', 55, 175);

  doc
    .moveTo(55, 196)
    .lineTo(540, 196)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  // Nombre
  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('NOMBRE', 55, 213);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(nombreCliente, 55, 227, {
      width: 225,
    });

  // Identidad
  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('IDENTIDAD', 300, 213);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(identidadCliente, 300, 227);

  // Teléfono
  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('TELÉFONO', 55, 252);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(telefonoCliente, 55, 266);

  // Correo
  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('CORREO ELECTRÓNICO', 300, 252);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(correoCliente, 300, 266, {
      width: 220,
    });

  // =========================================================
  // DATOS DE LA ORDEN
  // =========================================================

  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('DATOS DE LA ORDEN', 55, 305);

  doc
    .moveTo(55, 326)
    .lineTo(540, 326)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  // Equipo
  doc
    .roundedRect(55, 342, 230, 63, 7)
    .fill(azulClaro);

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(azulOscuro)
    .text('EQUIPO', 70, 356);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(equipo, 70, 374, {
      width: 200,
    });

  // Técnico
  doc
    .roundedRect(305, 342, 235, 63, 7)
    .fill(azulClaro);

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(azulOscuro)
    .text('TÉCNICO RESPONSABLE', 320, 356);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(tecnico, 320, 374, {
      width: 205,
    });

  // Fechas
  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('FECHA DE INGRESO', 55, 420);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(fechaIngreso, 55, 434);

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('FECHA DE ENTREGA', 215, 420);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(fechaEntrega, 215, 434);

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('ESTADO', 390, 420);

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(verde)
    .text(estado, 390, 434);

  // =========================================================
  // DETALLE DE LA FACTURA
  // =========================================================

  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('DETALLE DEL SERVICIO', 55, 470);

  // Encabezado tabla
  doc
    .rect(55, 492, 485, 32)
    .fill(azulOscuro);

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(blanco)
    .text('DESCRIPCIÓN', 70, 503);

  doc
    .text('CANT.', 340, 503, {
      width: 45,
      align: 'center',
    });

  doc
    .text('PRECIO', 395, 503, {
      width: 65,
      align: 'right',
    });

  doc
    .text('TOTAL', 475, 503, {
      width: 55,
      align: 'right',
    });

  // Fila
  doc
    .rect(55, 524, 485, 58)
    .fill('#FAFBFC');

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(grisOscuro)
    .text(servicio, 70, 541, {
      width: 240,
    });

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(grisTexto)
    .text(`Servicio realizado a equipo: ${equipo}`, 70, 557, {
      width: 240,
    });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(grisOscuro)
    .text('1', 340, 545, {
      width: 45,
      align: 'center',
    });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(grisOscuro)
    .text(`L. ${totalFormateado}`, 395, 545, {
      width: 65,
      align: 'right',
    });

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(grisOscuro)
    .text(`L. ${totalFormateado}`, 475, 545, {
      width: 55,
      align: 'right',
    });

  // =========================================================
  // RESUMEN DE PAGO
  // =========================================================

  doc
    .moveTo(330, 610)
    .lineTo(540, 610)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(grisTexto)
    .text('Subtotal', 350, 625);

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(grisOscuro)
    .text(`L. ${totalFormateado}`, 450, 625, {
      width: 80,
      align: 'right',
    });

  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('TOTAL', 350, 651);

  doc
    .font('Helvetica-Bold')
    .fontSize(17)
    .fillColor(azulOscuro)
    .text(`L. ${totalFormateado}`, 430, 647, {
      width: 100,
      align: 'right',
    });

  // =========================================================
  // NOTA
  // =========================================================

  doc
    .roundedRect(55, 610, 245, 85, 7)
    .fill('#F8FAFC');

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(azulOscuro)
    .text('NOTA', 70, 627);

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(grisTexto)
    .text(
      'Gracias por confiar en Tecknos Design Computadoras. Conserva esta factura como comprobante del servicio realizado.',
      70,
      647,
      {
        width: 210,
        lineGap: 3,
      }
    );

  // =========================================================
  // PIE DE FACTURA
  // =========================================================

  doc
    .moveTo(55, 735)
    .lineTo(540, 735)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(azulOscuro)
    .text('Tecknos Design Computadoras', 55, 751);

  doc
    .font('Helvetica')
    .fontSize(7)
    .fillColor(grisTexto)
    .text(
      'Avenida 14 de Julio, sector Iglesia Suyapa, La Ceiba, Atlántida, Honduras',
      55,
      767,
      {
        width: 350,
      }
    );

  doc
    .text('Tel. 3235-5440', 55, 780);

  // =========================================================
  // RESPUESTA HTTP
  // =========================================================

  res.setHeader('Content-Type', 'application/pdf');

  res.setHeader(
    'Content-Disposition',
    `inline; filename="Factura-${numeroOrden}.pdf"`
  );

  doc.pipe(res);

  doc.end();
};

module.exports = {
  generarFacturaPDF,
};