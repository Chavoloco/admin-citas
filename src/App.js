import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from "./components/Cita"

function App() {

  //citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //arreglo citas
  const[citas, guardarCitas] =useState(citasIniciales);

  //UseEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])

  //Funcion que tome las citas actuales y agrege las nuevas
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ])
  }

  //Funcion para eliminar citas por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id != id);
    guardarCitas(nuevasCitas);
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administrar citas';
  return (
   <Fragment>
     <h1>Administrador de pacientes</h1>
     <div className="container">
       <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
                  <Cita 
                    key={cita.id} 
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))}            
          </div>
       </div>
     </div>
   </Fragment>
  );
}

export default App;
