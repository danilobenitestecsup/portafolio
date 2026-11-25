// Animar barras de habilidades al cargar
document.addEventListener('DOMContentLoaded', () => {
    const meters = document.querySelectorAll('.meter-fill');
    meters.forEach(meter => {
        const target = meter.getAttribute('data-width');
        setTimeout(() => {
            meter.style.width = target;
        }, 300);
    });
});

// Menú responsive
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Filtro de proyectos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const group = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (group === 'all' || card.getAttribute('data-group') === group) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal de código fuente
const codeExamples = {
    web: {
        title: 'panel_gamer.js — HTML5 & JavaScript (2do Ciclo)',
        code: `// Filtro interactivo de estadisticas - Danilo Benites
const partidas = [
    { modo: "Ranked", puntos: 185, estado: "Victoria" },
    { modo: "Arena", puntos: 140, estado: "Top 3" }
];

function mostrarPartidas(lista) {
    lista.forEach(p => {
        console.log(\`Modo: \${p.modo} | Puntos: \${p.puntos} (\${p.estado})\`);
    });
}

mostrarPartidas(partidas);`
    },
    core: {
        title: 'clasificacion.cpp — C++ & Python (2do Ciclo)',
        code: `#include <iostream>
using namespace std;

int main() {
    int puntajes[4] = {320, 450, 290, 510};
    int mayor = puntajes[0];

    for (int i = 1; i < 4; i++) {
        if (puntajes[i] > mayor) {
            mayor = puntajes[i];
        }
    }

    cout << "Puntaje record registrado: " << mayor << " pts" << endl;
    return 0;
}`
    }
};

function openCodeModal(key) {
    const modal = document.getElementById('code-modal');
    const title = document.getElementById('modal-title');
    const codeEl = document.getElementById('modal-code');

    if (codeExamples[key]) {
        title.textContent = codeExamples[key].title;
        codeEl.textContent = codeExamples[key].code;
        modal.classList.add('open');
    }
}

function closeCodeModal() {
    document.getElementById('code-modal').classList.remove('open');
}