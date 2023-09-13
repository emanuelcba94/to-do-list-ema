const listaInput = document.querySelector('#lista-input input');
const btnAgregar = document.querySelector('.btn-agregar');
const listaContainer = document.querySelector('.listas-container');
const listaFiltros = document.querySelectorAll('.lista-filtros span');
const btnEliminarTodo = document.querySelector('.btn-eliminar-todo');

let editarTareaId;
let listaEditada = false;

let tareas = JSON.parse(localStorage.getItem("lista-tareas"));

listaFiltros.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove("active");
        btn.classList.add("active");
        mostrarLista(btn.id);
    })
})

function mostrarLista(filtros) {
    let li = "";
    if (tareas) {
        tareas.forEach((tarea, id) => {
            let seCompleto = tarea.status == "completed" ? "checked" : "";
            if (filtros == tarea.status || filtros == "all") {
                li += `
            <li class="tarea">
                <label for="${id}">
                    <input onclick="actualizarStatus(this)" type="checkbox" id="${id}" ${seCompleto}> 
                    <p class="${seCompleto}">${tarea.name}
                    </p>
                </label>
                <div class="acciones">
                    <div onclick="editarTarea(${id}, '${tarea.name}')" title="Editar">
                        <i class="editar fa-solid fa-pen-to-square"></i>
                    </div>
                    <div onclick="eliminarTarea(${id})" title="Eliminar">
                        <i class="eliminar fa-solid fa-trash"></i>
                    </div>
                </div>
            </li>
        `;
            }
        });
    }
    listaContainer.innerHTML = li || `<span>No tienes tareas.</span>`;
}
mostrarLista("all");

function eliminarTarea(eliminarId) {
    tareas.splice(eliminarId, 1);
    localStorage.setItem("lista-tareas", JSON.stringify(tareas));
    mostrarLista("all");
}

function editarTarea(editarId, tareaNombre) {
    editarTareaId = editarId;
    listaEditada = true;
    listaInput.value = tareaNombre;
}

btnEliminarTodo.addEventListener('click', () => {
    tareas.splice(0, tareas.length);
    localStorage.setItem("lista-tareas", JSON.stringify(tareas));
    mostrarLista("all");
})

function actualizarStatus(seleccionTarea) {
    let tareaNombre = seleccionTarea.parentElement.lastElementChild;
    if (seleccionTarea.checked) {
        tareaNombre.classList.add("checked");
        tareas[seleccionTarea.id].status = "completed";
    } else {
        tareaNombre.classList.remove("checked");
        tareas[seleccionTarea.id].status = "pending";
    }
    localStorage.setItem("lista-tareas", JSON.stringify(tareas));
}

btnAgregar.addEventListener('click', () => {
    let listaTareas = listaInput.value;
    
    listaTareas ? "" : alert('Agrega una tarea');

    if (listaTareas) {
        if (!listaEditada) {
            if (!tareas) {
                tareas = [];
            }
            let tareaInfo = { name: listaTareas, status: "pending" };
            tareas.push(tareaInfo);
        } else {
            listaEditada = false;
            tareas[editarTareaId].name = listaTareas;
        }
        listaInput.value = "";
        localStorage.setItem("lista-tareas", JSON.stringify(tareas));
        mostrarLista("all");
    }
})