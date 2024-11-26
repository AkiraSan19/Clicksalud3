// script.js

const monthYearElement = document.getElementById("month-year");
const daysContainer = document.getElementById("days-container");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Generar calendario
function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Actualizar encabezado
    monthYearElement.textContent = `${months[month]} ${year}`;

    // Obtener primer día del mes
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Limpiar días anteriores
    daysContainer.innerHTML = "";

    // Crear espacios vacíos para los días antes del primer día
    const offset = (firstDay === 0 ? 6 : firstDay - 1);
    for (let i = 0; i < offset; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day");
        daysContainer.appendChild(emptyDiv);
    }

    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;

        // Agregar evento al hacer clic
        dayElement.addEventListener("click", () => {
            const selected = document.querySelector(".day.selected");
            if (selected) selected.classList.remove("selected");
            dayElement.classList.add("selected");
            const fechaSeleccionada = `${day} ${months[month]} ${year}`;
            localStorage.setItem("fechaSeleccionada", fechaSeleccionada);
        });

        daysContainer.appendChild(dayElement);
    }
}

// Navegar entre meses
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

// Inicializar calendario
generateCalendar(currentDate);
