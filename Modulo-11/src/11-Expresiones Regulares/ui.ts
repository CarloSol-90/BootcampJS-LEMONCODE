import { IbanValidationResult, ImageInfo } from "./modelo";

// ============ NAVEGACIÓN ============

export const inicializarNavegacion = (): void => {
  const ibanBtn = document.getElementById('iban-btn');
  const imagesBtn = document.getElementById('images-btn');
  const ibanSection = document.getElementById('iban-section');
  const imagesSection = document.getElementById('images-section');

  if (!ibanBtn || !imagesBtn || !ibanSection || !imagesSection) {
    console.error('Elementos de navegación no encontrados');
    return;
  }

  ibanBtn.addEventListener('click', () => {
    mostrarSeccion('iban');
  });

  imagesBtn.addEventListener('click', () => {
    mostrarSeccion('images');
  });
};

const mostrarSeccion = (seccion: 'iban' | 'images'): void => {
  // Actualizar botones
  const ibanBtn = document.getElementById('iban-btn');
  const imagesBtn = document.getElementById('images-btn');
  const ibanSection = document.getElementById('iban-section');
  const imagesSection = document.getElementById('images-section');

  if (!ibanBtn || !imagesBtn || !ibanSection || !imagesSection) return;

  // Remover clases activas
  ibanBtn.classList.remove('active');
  imagesBtn.classList.remove('active');
  ibanSection.classList.remove('active');
  imagesSection.classList.remove('active');

  // Activar sección correspondiente
  if (seccion === 'iban') {
    ibanBtn.classList.add('active');
    ibanSection.classList.add('active');
  } else {
    imagesBtn.classList.add('active');
    imagesSection.classList.add('active');
  }
};

// ============ APARTADO A: UI PARA IBAN ============

export const renderResultadoIban = (resultado: IbanValidationResult): void => {
  const contenedor = document.getElementById('iban-resultado');
  if (!contenedor) {
    console.error('Contenedor de resultado IBAN no encontrado');
    return;
  }

  contenedor.classList.remove('empty');

  if (!resultado.esFormato) {
    contenedor.innerHTML = `
      <div class="iban-error">
        <h3>❌ Error de Formato</h3>
        <p>${resultado.mensaje}</p>
        <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.5); border-radius: 5px;">
          <small><strong>Formato esperado:</strong> ES## #### #### ## ########## (con o sin espacios/guiones)</small>
        </div>
      </div>
    `;
    return;
  }

  if (!resultado.info) {
    contenedor.innerHTML = `
      <div class="iban-error">
        <h3>❌ Error</h3>
        <p>${resultado.mensaje}</p>
      </div>
    `;
    return;
  }

  const claseResultado = resultado.esValido ? 'iban-info' : 'iban-error';
  const iconoEstado = resultado.esValido ? '✅' : '⚠️';

  contenedor.innerHTML = `
    <div class="${claseResultado}">
      <h3>${iconoEstado} ${resultado.mensaje}</h3>
      <div class="iban-details">
        <div class="iban-detail">
          <h4>País</h4>
          <p>${resultado.info.paisCodigo} (España)</p>
        </div>
        <div class="iban-detail">
          <h4>Dígito de Control</h4>
          <p>${resultado.info.digitoControl}</p>
        </div>
        <div class="iban-detail">
          <h4>Código de Banco</h4>
          <p>${resultado.info.codigoBanco}</p>
        </div>
        <div class="iban-detail">
          <h4>Nombre del Banco</h4>
          <p>${resultado.info.nombreBanco}</p>
        </div>
        <div class="iban-detail">
          <h4>Código de Sucursal</h4>
          <p>${resultado.info.codigoSucursal}</p>
        </div>
        <div class="iban-detail">
          <h4>Dígito Control Cuenta</h4>
          <p>${resultado.info.digitoControlCuenta}</p>
        </div>
        <div class="iban-detail">
          <h4>Número de Cuenta</h4>
          <p>${resultado.info.numeroCuenta}</p>
        </div>
      </div>
    </div>
  `;
};

export const limpiarResultadoIban = (): void => {
  const contenedor = document.getElementById('iban-resultado');
  if (!contenedor) return;

  contenedor.classList.add('empty');
  contenedor.innerHTML = '<p>Introduce un IBAN español para validar y analizar</p>';
};

export const obtenerIbanInput = (): string => {
  const input = document.getElementById('iban-input') as HTMLInputElement;
  return input ? input.value.trim() : '';
};

// ============ APARTADO B: UI PARA IMÁGENES ============

export const renderResultadoImagenes = (imagenes: ImageInfo[]): void => {
  const contenedor = document.getElementById('imagenes-resultado');
  if (!contenedor) {
    console.error('Contenedor de resultado imágenes no encontrado');
    return;
  }

  contenedor.classList.remove('empty');

  if (imagenes.length === 0) {
    contenedor.innerHTML = `
      <div class="iban-error">
        <h3>❌ No se encontraron imágenes</h3>
        <p>No se detectaron tags &lt;img&gt; válidos en el contenido HTML proporcionado.</p>
        <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.5); border-radius: 5px;">
          <small><strong>Ejemplo de formato esperado:</strong> &lt;img src="ruta/imagen.jpg" alt="descripción" /&gt;</small>
        </div>
      </div>
    `;
    return;
  }

  const imagenesHtml = imagenes.map((imagen, index) => {
    const altText = imagen.alt ? `Alt: ${imagen.alt}` : 'Sin texto alternativo';
    const titleText = imagen.title ? `Title: ${imagen.title}` : '';
    
    return `
      <div class="image-item">
        <img 
          src="${imagen.src}" 
          alt="${imagen.alt || `Imagen ${index + 1}`}"
          class="image-preview"
          onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjhkN2RhIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZGMzNTQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FcnJvciBkZSBjYXJnYTwvdGV4dD4KPC9zdmc+'; this.alt='Error al cargar imagen';"
        />
        <div class="image-url">
          <strong>URL:</strong> ${imagen.src}
        </div>
        ${altText ? `<div style="font-size: 11px; color: #28a745; margin-top: 5px;"><strong>${altText}</strong></div>` : ''}
        ${titleText ? `<div style="font-size: 11px; color: #6f42c1; margin-top: 2px;"><strong>${titleText}</strong></div>` : ''}
      </div>
    `;
  }).join('');

  contenedor.innerHTML = `
    <div class="images-count">
      🖼️ Se encontraron ${imagenes.length} imagen${imagenes.length !== 1 ? 'es' : ''}
    </div>
    <div class="images-grid">
      ${imagenesHtml}
    </div>
  `;
};

export const limpiarResultadoImagenes = (): void => {
  const contenedor = document.getElementById('imagenes-resultado');
  if (!contenedor) return;

  contenedor.classList.add('empty');
  contenedor.innerHTML = '<p>Pega contenido HTML para extraer los enlaces de las imágenes</p>';
};

export const obtenerHtmlInput = (): string => {
  const textarea = document.getElementById('html-textarea') as HTMLTextAreaElement;
  return textarea ? textarea.value.trim() : '';
};

export const establecerHtmlEjemplo = (): void => {
  const textarea = document.getElementById('html-textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const htmlEjemplo = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ejemplo de Imágenes</title>
  </head>
  <body>
    <div class="contenido">
      <h1>Galería de Imágenes de Ejemplo</h1>
      <div class="galeria">
        <h2>Imágenes de prueba</h2>
        <img src="https://picsum.photos/200/150?random=1" alt="Imagen aleatoria 1" />
        <img src="https://picsum.photos/200/150?random=2" alt="Imagen aleatoria 2" title="Segunda imagen" />
        <img src="https://picsum.photos/200/150?random=3" alt="Imagen aleatoria 3" />
        <img src="https://picsum.photos/300/200?random=4" alt="Imagen más grande" title="Imagen de mayor tamaño" />
        <img src="https://picsum.photos/180/120?random=5" alt="Otra imagen de prueba" />
      </div>
    </div>
  </body>
</html>`;

  textarea.value = htmlEjemplo;
};