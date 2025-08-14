if (window.location.pathname.split("/").pop() == "index.html") {
    window.location.href='/'
}

const scrollear = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

const cargarLocates = (lugar) => {
    let pageLocacion = window.location.pathname.split("/").pop();
    if (pageLocacion == "" && lugar == "inicio") {
        scrollear("home");
    }
    if (pageLocacion != "" && lugar == "inicio") {
        window.location.href='/#home'
    }
    if (pageLocacion == "" && lugar == "sobre") {
        scrollear("about");
    }
    if (pageLocacion != "" && lugar == "sobre") {
        window.location.href='/#about'
    }
    if (pageLocacion == "" && lugar == "quests") {
        scrollear("faqs");
    }
    if (pageLocacion != "" && lugar == "quests") {
        window.location.href='/#faqs'
    }
    if (pageLocacion == "" && lugar == "contactos") {
        scrollear("contacto");
    }
    if (pageLocacion != "" && lugar == "contactos") {
        window.location.href='/#contacto'
    }
    if (pageLocacion == "" && lugar == "colaboradores") {
        window.location.href='/colaboradores.html'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Nodo raíz donde vas a observar los cambios; normalmente el <body> o un contenedor específico
    const rootNode = document.body;

    // Crea un nuevo MutationObserver con un callback que procesa las mutaciones
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            // Solo nos interesa el tipo childList porque detecta nodos añadidos o eliminados
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    // Solo elementos HTML (no nodos de texto o comentario)
                    if (!(node instanceof HTMLElement)) continue;

                    // Verificamos si el nodo agregado tiene el id que buscamos
                    if (node.id === 'inicio' || node.id === 'sobre' || node.id === 'quests' || node.id === 'contactos' || node.id === "colaboradores") {
                        console.log(`Elemento con id "${node.id}" detectado en el DOM.`);
                        // Aquí puedes agregar los listeners que necesites al elemento
                        node.addEventListener('click', () => cargarLocates(node.id));
                    }

                    // Además, es posible que el nodo agregado sea un contenedor con esos elementos adentro
                    // Entonces hacemos búsqueda dentro de ese subtree también
                    ['inicio', 'sobre', 'quests', 'contactos', "colaboradores"].forEach(id => {
                        const el = node.querySelector(`#${id}`);
                        if (el) {
                            console.log(`Elemento con id "${id}" detectado dentro de un nuevo nodo.`);
                            el.addEventListener('click', () => cargarLocates(id));
                        }
                    });
                }
            }
        }
    });

    // Configuración para observar: queremos saber cuando se añaden hijos en todo el subtree
    observer.observe(rootNode, { childList: true, subtree: true });

});
