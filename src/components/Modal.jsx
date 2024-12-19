import { useState } from 'react';
import CloseModal from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {
  const [mensaje, setMensaje] = useState('');

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');

  const ocultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500); // Ajustar tiempo según la duración de la animación
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Por favor, completa todos los campos.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    // Validación de cantidad positiva
    if (Number(cantidad) <= 0) {
      setMensaje('La cantidad debe ser mayor a cero.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    // Enviar datos al componente padre
    guardarGasto({
      nombre,
      cantidad: Number(cantidad), // Asegurarse de que sea un número
      categoria,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // ID único
      fecha: new Date().toISOString(), // Fecha actual
    });

    // Cerrar el modal tras guardar
    ocultarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CloseModal}
          alt="Cerrar Modal"
          onClick={ocultarModal}
          aria-label="Cerrar modal"
        />
      </div>

      <form
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>Nuevo Gasto</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre del Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="¿En qué has gastado tu dinero?"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            aria-required="true"
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="¿Qué cantidad de dinero has gastado?"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            aria-required="true"
            min="0"
            step="any"
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            aria-required="true"
          >
            <option value="">-- Seleccione una categoría --</option>
            <option value="gastos-familiares">Gastos Familiares</option>
            <option value="gastos-personales">Gastos Personales</option>
            <option value="gastos-educacionales">Gastos Educativos</option>
            <option value="gastos-de-viaje">Gastos de Viaje</option>
            <option value="ahorros">Ahorros</option>
            <option value="comida">Comida</option>
            <option value="salud">Salud</option>
            <option value="ocio-vicios">Ocio y Vicios</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  );
};

export default Modal;
