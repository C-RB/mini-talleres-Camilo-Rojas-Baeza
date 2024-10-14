import axios from 'axios';

const API_URL = 'http://localhost:3000/Alumnos';

export const fetchTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(`Error fetching todos: ${error.message}`);
    }
};


export const obtenerNotasID = async (alumnoID) => {
    try {
        const response = await axios.get(`${API_URL}/${alumnoID}`);
        return response.data; 
    } catch (error) {
        console.error(`Error fetching notas: ${error.message}`);
    }
};

const calcularPromedioNotas = (notas) => {
    const promedio = (
        (notas.nota_1 * 0.20) +
        (notas.nota_2 * 0.20) +
        (notas.nota_3 * 0.20) +
        (notas.nota_4 * 0.20) +
        (notas.nota_5 * 0.10) +
        (notas.nota_6 * 0.10)
    );
    return promedio;
};


export const obtenerPromedio = async (alumnoID) => {
    try {
        const alumno = await obtenerNotasID(alumnoID);
        return calcularPromedioNotas(alumno);
    } catch (error) {
        console.error(`Error calculating average: ${error.message}`);
    }
};

// Obtener alumnos que aprueban
export const obtenerAlumnosQueAprueban = async () => {
    try {
        const response = await axios.get(API_URL);
        const alumnos = response.data;
        const alumnosQueAprueban = alumnos.filter(alumno => {
            return calcularPromedioNotas(alumno) >= 4.0; 
        });
        return alumnosQueAprueban;
    } catch (error) {
        console.error(`Error fetching approved students: ${error.message}`);
    }
};
