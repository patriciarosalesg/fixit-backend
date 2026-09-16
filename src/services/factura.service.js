const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

//Genera una factura PDF profesional para una orden de servicio.
//Imágenes opcionales:
//fixit-backend/assets/logo.png
//fixit-backend/assets/computadora.png

const generarFacturaPDF = (orden, res) => {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    info: {
      Title: `Factura ${orden.numeroOrden}`,
      Author: 'My Support Technos Design',
      Subject: 'Factura de servicio técnico',
      Creator: 'My Support Technos Design',
    },
  });

  // Colores corporativos.
  const azul = '#1565C0';
  const azulOscuro = '#0D47A1';
  const azulClaro = '#EAF3FF';
  const grisFondo = '#F5F7FA';
  const grisTexto = '#4B5563';
  const grisOscuro = '#1F2937';
  const grisLinea = '#D9E1EA';
  const blanco = '#FFFFFF';
  const verde = '#16803C';

  // Rutas de imagenes.
  const logoPath = path.join(__dirname, '../../assets/logo.png');

  const computadoraPath = path.join(
    __dirname,
    '../../assets/computadora.png'
  );

  const tieneLogo = fs.existsSync(logoPath);
  const tieneComputadora = fs.existsSync(computadoraPath);

  // Datos.
  const numeroOrden = orden.numeroOrden || 'SIN NÚMERO';
  const equipo = orden.equipo || 'No especificado';
  const servicio = orden.servicio || 'Servicio técnico';
  const tecnico = orden.tecnico || 'Área de Soporte Técnico';
  const estado = orden.estado || 'Pendiente';

  const fechaIngreso = orden.fechaIngreso || '-';
  const fechaEntrega = orden.fechaEntrega || '-';

  const costoTotal = Number(orden.costoTotal || 0);

  const totalFormateado = costoTotal.toLocaleString('es-GT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Encabezado
  // Fondo general
  doc.rect(0, 0, 595.28, 841.89).fill(grisFondo);

  // Franja superior
  doc.rect(0, 0, 595.28, 145).fill(azulOscuro);

  // Línea azul clara decorativa
  doc.rect(0, 137, 595.28, 8).fill(azul);

  // Logo
  if (tieneLogo) {
    try {
      doc.image(logoPath, 42, 28, {
        fit: [100, 75],
        align: 'left',
        valign: 'center',
      });
    } catch (error) {
      console.error('No se pudo cargar el logo:', error);
    }
  } else {
    // Marca alternativa mientras no exista el logo
    doc
      .roundedRect(42, 35, 65, 55, 8)
      .fill(azul);

    doc
      .fontSize(22)
      .font('Helvetica-Bold')
      .fillColor(blanco)
      .text('TD', 42, 51, {
        width: 65,
        align: 'center',
      });
  }

  // Nombre de la empresa.
  doc
    .font('Helvetica-Bold')
    .fontSize(22)
    .fillColor(blanco)
   .text('My Support Technos Design', 125, 35);

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor('#DDEBFF')
    .text('Soporte Técnico de Computadoras', 126, 63);

  doc
    .font('Helvetica-Oblique')
    .fontSize(9)
    .fillColor('#C9DEFF')
    .text('Innovamos, Desarrollamos, Conectamos.', 126, 82);

  // Factura.
  doc
    .font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(blanco)
    .text('FACTURA', 390, 38, {
      width: 165,
      align: 'right',
    });

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor('#DDEBFF')
    .text(`Orden #${numeroOrden}`, 390, 72, {
      width: 165,
      align: 'right',
    });

  doc
    .fontSize(9)
    .fillColor('#C9DEFF')
    .text(`Fecha: ${fechaEntrega}`, 390, 91, {
      width: 165,
      align: 'right',
    });
  // Contenedor
  doc
    .roundedRect(35, 170, 525, 610, 12)
    .fill(blanco);

  // Informacion de la orden
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('INFORMACIÓN DE LA ORDEN', 55, 195);

  doc
    .moveTo(55, 216)
    .lineTo(540, 216)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  // Cuadro Equipo
  doc
    .roundedRect(55, 235, 235, 72, 8)
    .fill(azulClaro);

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(azulOscuro)
    .text('EQUIPO', 70, 250);

  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(grisOscuro)
    .text(equipo, 70, 267, {
      width: 205,
    });

  // Cuadro Técnico
  doc
    .roundedRect(305, 235, 235, 72, 8)
    .fill(azulClaro);

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(azulOscuro)
    .text('TÉCNICO RESPONSABLE', 320, 250);

  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(grisOscuro)
    .text(tecnico, 320, 267, {
      width: 205,
    });

  // Detalles del servicio
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('DETALLE DEL SERVICIO', 55, 335);

  // Encabezado tabla
  doc
    .roundedRect(55, 358, 485, 34, 6)
    .fill(azulOscuro);

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(blanco)
    .text('DESCRIPCIÓN', 70, 370);

  doc
    .text('SERVICIO', 285, 370);

  doc
    .text('TOTAL', 455, 370, {
      width: 65,
      align: 'right',
    });

  // Fila de servicio
  doc
    .roundedRect(55, 392, 485, 78, 6)
    .fill('#FAFBFC');

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(equipo, 70, 410, {
      width: 195,
    });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(grisTexto)
    .text('Equipo registrado en orden de servicio', 70, 430, {
      width: 195,
    });

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(servicio, 285, 415, {
      width: 150,
    });

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(grisOscuro)
    .text(`$ ${totalFormateado}`, 440, 415, {
      width: 80,
      align: 'right',
    });

  // Fechas
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('CONTROL DEL SERVICIO', 55, 500);

  // Fecha ingreso
  doc
    .roundedRect(55, 525, 150, 65, 8)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('FECHA DE INGRESO', 70, 540);

  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(grisOscuro)
    .text(fechaIngreso, 70, 558);

  // Fecha entrega
  doc
    .roundedRect(220, 525, 150, 65, 8)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(grisTexto)
    .text('FECHA DE ENTREGA', 235, 540);

  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(grisOscuro)
    .text(fechaEntrega, 235, 558);

  // Estado
  doc
    .roundedRect(385, 525, 155, 65, 8)
    .fill('#F0FDF4');

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(verde)
    .text('ESTADO DEL SERVICIO', 400, 540);

  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(verde)
    .text(estado, 400, 558, {
      width: 125,
    });

  // =========================================================
  // IMAGEN DE COMPUTADORA / ILUSTRACIÓN
  // =========================================================

  if (tieneComputadora) {
    try {
      doc.image(computadoraPath, 55, 615, {
        fit: [150, 90],
        align: 'center',
        valign: 'center',
      });
    } catch (error) {
      console.error('No se pudo cargar la imagen de computadora:', error);
    }
  } else {
    // Ilustración vectorial alternativa
    const x = 70;
    const y = 625;

    // Monitor
    doc
      .roundedRect(x, y, 120, 70, 7)
      .lineWidth(3)
      .strokeColor(azul)
      .stroke();

    // Pantalla
    doc
      .rect(x + 8, y + 8, 104, 50)
      .fill(azulClaro);

    // Línea decorativa en pantalla
    doc
      .moveTo(x + 25, y + 33)
      .lineTo(x + 65, y + 33)
      .lineWidth(4)
      .strokeColor(azul)
      .stroke();

    doc
      .moveTo(x + 25, y + 43)
      .lineTo(x + 80, y + 43)
      .lineWidth(3)
      .strokeColor(azul)
      .stroke();

    // Base
    doc
      .moveTo(x + 50, y + 70)
      .lineTo(x + 50, y + 82)
      .lineWidth(4)
      .strokeColor(azulOscuro)
      .stroke();

    doc
      .moveTo(x + 30, y + 84)
      .lineTo(x + 90, y + 84)
      .lineWidth(5)
      .strokeColor(azulOscuro)
      .stroke();
  }

  // Texto institucional junto a la computadora
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(azulOscuro)
    .text('SERVICIO TÉCNICO', 240, 630);

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(grisTexto)
    .text(
      'Soluciones profesionales para el mantenimiento, diagnóstico y reparación de equipos informáticos.',
      240,
      652,
      {
        width: 260,
        lineGap: 4,
      }
    );
  // Total
  doc
    .roundedRect(350, 695, 190, 62, 8)
    .fill(azulOscuro);

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor('#C9DEFF')
    .text('TOTAL A PAGAR', 365, 709);

  doc
    .font('Helvetica-Bold')
    .fontSize(19)
    .fillColor(blanco)
    .text(`$ ${totalFormateado}`, 365, 727, {
      width: 160,
      align: 'right',
    });

  // Pie de pagina
  doc
    .moveTo(55, 795)
    .lineTo(540, 795)
    .lineWidth(1)
    .strokeColor(grisLinea)
    .stroke();

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(azulOscuro)
    .text('My Support Technos Design', 55, 808);

  doc
    .font('Helvetica-Oblique')
    .fontSize(8)
    .fillColor(grisTexto)
    .text(
      'Innovamos, Desarrollamos, Conectamos.',
      180,
      808,
      {
        width: 230,
        align: 'center',
      }
    );

  doc
    .font('Helvetica')
    .fontSize(7)
    .fillColor(grisTexto)
    .text(
      'Documento generado automáticamente por My Support Technos Design',
      55,
      823,
      {
        width: 485,
        align: 'center',
      }
    );
  // Respuesta HTTP
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
