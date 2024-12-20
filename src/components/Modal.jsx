import { useState, useEffect } from 'react';
import CloseModal from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
  //States
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})
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
      cantidad,
      categoria,
      id,
      fecha,
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
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
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
            <option value="Familiar">Gastos Familiares</option>
            <option value="Personal">Gastos Personales</option>
            <option value="Ahorros">Ahorros</option>
            <option value="Comida">Comida</option>
            <option value="Salud">Salud</option>
            <option value="Ocio">Ocio</option>
            <option value="Suscripciones">Suscripciones</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
      </form>
    </div>
  );
};

export default Modal;
