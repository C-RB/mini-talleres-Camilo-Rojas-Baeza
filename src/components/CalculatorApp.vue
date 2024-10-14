<template>
    <div>
        <h1>Lista de Estudiantes</h1>
        <button class="btn" @click="mostrarTodos">Mostrar Todos</button>
        <button class="btn" @click="mostrarAprobados">Mostrar Aprobados</button>

        <ul>
            <li v-for="todo in todos" :key="todo.id" class="student">
                <span><strong>Nombre:</strong> {{ todo.nombre }}</span><br>
                <span><strong>Nivel:</strong> {{ todo.nivel }}</span><br>
                <span><strong>Notas:</strong></span>
                <ul class="notas">
                    <li>Nota 1: {{ todo.nota_1 }}</li>
                    <li>Nota 2: {{ todo.nota_2 }}</li>
                    <li>Nota 3: {{ todo.nota_3 }}</li>
                    <li>Nota 4: {{ todo.nota_4 }}</li>
                    <li>Nota 5: {{ todo.nota_5 }}</li>
                    <li>Nota 6: {{ todo.nota_6 }}</li>
                </ul>
                <span><strong>Promedio:</strong> {{ promedios[todo.id] }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { fetchTodos, obtenerPromedio, obtenerAlumnosQueAprueban } from '@/services/todoService';

export default {
    data() {
        return {
            todos: [],
            todosOriginal: [],
            promedios: {}
        };
    },
    async mounted() {
        await this.obtenerEstudiantes();
    },
    methods: {
        async obtenerEstudiantes() {
            const estudiantes = await fetchTodos();
            this.todos = estudiantes;
            this.todosOriginal = estudiantes;

            for (const estudiante of this.todos) {
                this.promedios[estudiante.id] = await obtenerPromedio(estudiante.id);
            }
        },
        mostrarTodos() {
            this.todos = this.todosOriginal;
        },
        async mostrarAprobados() {
            const aprobados = await obtenerAlumnosQueAprueban();
            this.todos = aprobados;

            this.promedios = {};
            for (const estudiante of aprobados) {
                this.promedios[estudiante.id] = await obtenerPromedio(estudiante.id);
            }
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    color: #333;
}

.btn {
    margin: 10px 5px;
    padding: 10px 15px;
    background-color: #164475;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0057b3bd;
}

ul {
    padding: 0;
}

.notas {
    list-style: none;
    color: white;
}

.student {
    padding: 15px;
    margin: 10px 0;
    background-color: #132352;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.student span {
    display: block;
    margin: 5px 0;
    color: #ffffff;
}
</style>
