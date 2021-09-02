import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
const { v4: uuidv4 } = require('uuid');

const Formulario = ({crearCita}) => {

    // crear state de citas
    const[cita, actualizaCita]=useState({
        mascota: "",
        propietario: "",
        fecha: "",
        hora: "",
        sintomas: ""
    })
    
    const [error, actualizarError] = useState(false)

    //Funcion que se ejecuta cada vez que el usuario escribe en el input
    const actualizarState = e =>{
        actualizaCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //funcion precione enviar agregue la cita
    const submitCita = e => {
        e.preventDefault();
        //validar
        if(mascota.trim()  === '' || propietario.trim()  === '' || fecha.trim()  === '' || hora.trim()  === '' || sintomas.trim()  === '' ){
            actualizarError(true);
            return;
        }else{
            //error
            actualizarError(false);
        }
        //asignar un id
        cita.id = uuidv4();
        //crear la cita
        crearCita(cita);
        //reiniciar el formulario
        actualizaCita(
           { mascota: "",
            propietario: "",
            fecha: "",
            hora: "",
            sintomas: ""}
        )
    }


    return ( 
        <Fragment>
            <h1>Crear cita</h1>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null } 
            <form onSubmit={submitCita}>
                <label >Nombre mascota</label>
                <input 
                    type="text" 
                    name="mascota" 
                    placeholder="nombre de la mascota"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={mascota}
                 />
                <label >Nombre Dueño</label>
                <input 
                    type="text" 
                    name="propietario" 
                    placeholder="nombre del dueño"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={propietario}
                 />
                <label >Fecha</label>
                <input 
                    type="date" 
                    name="fecha" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                 />
                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                 />
                <label >Sintomas</label>
                <textarea
                    type="text" 
                    name="sintomas" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea> 

                <button type="submit" className="u-full-width button-primary">Agregar cita</button>
                 
            </form>
        </Fragment>
     );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;