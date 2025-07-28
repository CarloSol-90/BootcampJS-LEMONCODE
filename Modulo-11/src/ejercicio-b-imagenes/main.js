// Ejercicio B - Extractor de Imágenes HTML

// EXPRESIÓN REGULAR PRINCIPAL para extraer tags img
const IMG_TAG_REGEX = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi;

// Función para extraer atributo específico de un tag
function extraerAtributo(tagCompleto, nombreAtributo) {
  const regex = new RegExp(`${nombreAtributo}\\s*=\\s*["']([^"']+)["']`, 'i');
  const resultado = tagCompleto.match(regex);
  return resultado ? resultado[1] : null;
}

// Función principal para extraer todas las imágenes
function extraerImagenes(html) {
  const imagenes = [];
  
  // Usar matchAll para obtener todos los resultados
  const matches = html.matchAll(IMG_TAG_REGEX);

  for (const match of matches) {
    const tagCompleto = match[0];  // El tag completo
    const src = match[1];          // El src capturado
    
    // Extraer otros atributos
    const alt = extraerAtributo(tagCompleto, 'alt');
    const title = extraerAtributo(tagCompleto, 'title');

    imagenes.push({
      src: src,
      alt: alt,
      title: title,
      tagCompleto: tagCompleto
    });
  }

  return imagenes;
}

// Función para mostrar las imágenes encontradas
function mostrarImagenes(imagenes) {
  const resultado = document.getElementById('imagenes-resultado');
  
  if (imagenes.length === 0) {
    resultado.className = 'resultado';
    resultado.innerHTML = `
      <div style="background: pink; border: 1px solid red; padding: 15px;">
        <h3>❌ No se encontraron imágenes</h3>
        <p>No se detectaron tags &lt;img&gt; válidos en el HTML.</p>
        <p><strong>Formato esperado:</strong> &lt;img src="ruta/imagen.jpg" alt="descripción" /&gt;</p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="images-count">
      🖼️ Se encontraron ${imagenes.length} imagen${imagenes.length !== 1 ? 'es' : ''}
    </div>
  `;

  imagenes.forEach((imagen, index) => {
    html += `
      <div class="image-item">
        <h4>Imagen ${index + 1}:</h4>
        <img 
          src="${imagen.src}" 
          alt="${imagen.alt || `Imagen ${index + 1}`}"
          class="image-preview"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
        />
        <div style="display:none; background:pink; padding:5px; border:1px solid red;">
          ❌ Error al cargar imagen
        </div>
        
        <div class="image-url">
          <strong>URL:</strong> ${imagen.src}
        </div>
        
        ${imagen.alt ? `<div class="image-alt"><strong>Alt:</strong> ${imagen.alt}</div>` : ''}
        ${imagen.title ? `<div class="image-title"><strong>Title:</strong> ${imagen.title}</div>` : ''}
      </div>
    `;
  });

  resultado.className = 'resultado';
  resultado.innerHTML = html;
}

// Función para procesar el HTML
function procesarHTML() {
  const textarea = document.getElementById('html-textarea');
  const html = textarea.value.trim();

  if (!html) {
    const resultado = document.getElementById('imagenes-resultado');
    resultado.className = 'resultado empty';
    resultado.innerHTML = 'Pega HTML para extraer imágenes...';
    return;
  }

  console.log('Procesando HTML:', html.length, 'caracteres');

  // Extraer imágenes
  const imagenes = extraerImagenes(html);
  
  console.log('Imágenes encontradas:', imagenes.length);
  console.log('Detalles:', imagenes);

  // Mostrar resultados
  mostrarImagenes(imagenes);
}

// Función para cargar ejemplo
function cargarEjemplo() {
  const textarea = document.getElementById('html-textarea');
  
  const htmlEjemplo = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Ejemplo HTML - Galería de Imágenes</title>
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
  console.log('Ejemplo cargado');
}

// Eventos
document.addEventListener('DOMContentLoaded', function() {
  const botonExtraer = document.getElementById('extraer-btn');
  const botonEjemplo = document.getElementById('ejemplo-btn');
  const textarea = document.getElementById('html-textarea');
  
  // Evento click extraer
  botonExtraer.addEventListener('click', procesarHTML);
  
  // Evento click ejemplo
  botonEjemplo.addEventListener('click', cargarEjemplo);
  
  // Limpiar resultado cuando se borra contenido
  textarea.addEventListener('input', function() {
    if (textarea.value.trim() === '') {
      const resultado = document.getElementById('imagenes-resultado');
      resultado.className = 'resultado empty';
      resultado.innerHTML = 'Pega HTML para extraer imágenes...';
    }
  });

  console.log('✅ Ejercicio B - Extractor de Imágenes inicializado');
});
