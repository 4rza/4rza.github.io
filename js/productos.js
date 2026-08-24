/**
 * Lopi - Funcionalidad del Modal de Productos
 * Permite visualizar el detalle completo de cada producto al hacer clic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM del Modal
    const modalOverlay = document.getElementById('producto-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseSecBtn = document.getElementById('modal-btn-close-sec');
    const modalImg = document.getElementById('modal-img');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalPrecio = document.getElementById('modal-precio');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalEstado = document.getElementById('modal-estado');
    const modalBtnWhatsapp = document.getElementById('modal-btn-whatsapp');

    // Todos los elementos de producto clickeables
    const productoCards = document.querySelectorAll('.producto-item');

    let ultimoElementoEnfocado = null;

    /**
     * Abre el modal con la información del producto seleccionado
     * @param {HTMLElement} card - Elemento de la tarjeta de producto
     */
    function abrirModal(card) {
        // Guardar elemento enfocado para accesibilidad
        ultimoElementoEnfocado = document.activeElement;

        // Extraer datos de la tarjeta (mediante dataset o elementos hijos)
        const nombre = card.dataset.nombre || card.querySelector('h3')?.textContent?.trim() || 'Producto Artesanal';
        const precio = card.dataset.precio || card.querySelector('.producto-precio')?.textContent?.trim() || '$0.00';
        const descripcion = card.dataset.descripcion || 'Pieza artesanal elaborada a mano con materiales nobles y dedicación en cada detalle.';
        const estado = card.dataset.disponible !== undefined ? card.dataset.disponible : 'true';
        const estadoTexto = card.dataset.estadoTexto || (estado === 'true' ? 'Disponible' : 'Agotado');
        const imgElement = card.querySelector('img');
        const imgSrc = card.dataset.img || imgElement?.src || '';
        const imgAlt = imgElement?.alt || nombre;

        // Asignar datos al modal
        modalTitulo.textContent = nombre;
        modalPrecio.textContent = precio;
        modalDescripcion.textContent = descripcion;
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;

        // Configurar estado de disponibilidad
        modalEstado.className = 'badge-status';
        if (estado === 'true' || estado === 'disponible') {
            modalEstado.classList.add('badge-disponible');
            modalEstado.innerHTML = '<span class="status-dot"></span> Disponible en stock';
        } else if (estado === 'pedido') {
            modalEstado.classList.add('badge-pedido');
            modalEstado.innerHTML = '<span class="status-dot"></span> Por encargo';
        } else {
            modalEstado.classList.add('badge-agotado');
            modalEstado.innerHTML = '<span class="status-dot"></span> No disponible temporalmente';
        }

        // Configurar enlace personalizado de WhatsApp
        const waNumber = '595983006047';
        const waMensaje = `Hola Lopi! Quisiera consultar sobre el producto: *${nombre}* (${precio}). ¿Sigue disponible?`;
        modalBtnWhatsapp.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMensaje)}`;

        // Mostrar modal con animación
        modalOverlay.classList.add('is-active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Enfocar el botón de cerrar para accesibilidad
        setTimeout(() => {
            modalCloseBtn.focus();
        }, 100);
    }

    /**
     * Cierra el modal de detalles
     */
    function cerrarModal() {
        modalOverlay.classList.remove('is-active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Restaurar foco al elemento que abrió el modal
        if (ultimoElementoEnfocado && typeof ultimoElementoEnfocado.focus === 'function') {
            ultimoElementoEnfocado.focus();
        }
    }

    // Asignar evento click a cada producto
    productoCards.forEach((card) => {
        // Soporte para click en toda la tarjeta o enlace interno
        card.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModal(card);
        });

        // Soporte para teclado (Enter o Espacio cuando la tarjeta está enfocada)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                abrirModal(card);
            }
        });
    });

    // Cerrar al hacer clic en el botón de cruz
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarModal();
        });
    }

    // Cerrar al hacer clic en el botón secundario 'Cerrar'
    if (modalCloseSecBtn) {
        modalCloseSecBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarModal();
        });
    }

    // Cerrar al hacer clic en el fondo oscuro (backdrop)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                cerrarModal();
            }
        });
    }

    // Cerrar al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
            cerrarModal();
        }
    });
});
