import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import Modal from './components/Modal';
import HistorialPresupuestos from './components/HistorialPresupuestos'; 
import ListadoGastos from './components/ListadoGastos';
import { generateId } from './assets/helpers/index';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  // Estado inicial para gastos
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  // Estado inicial para presupuesto y validación
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) > 0 // Valida el presupuesto al inicio
  );

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [historialPresupuestos, setHistorialPresupuestos] = useState(
    JSON.parse(localStorage.getItem('historialPresupuestos')) || []
  );

  const [showHistorial, setShowHistorial] = useState(false); // Estado para mostrar/ocultar el historial

  //Historial Presupuesto

  useEffect(() => {
    // Guardar historial en localStorage
    localStorage.setItem('historialPresupuestos', JSON.stringify(historialPresupuestos));
  }, [historialPresupuestos]);

  const guardarPresupuestoEnHistorial = () => {
    const totalGastado = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);

    const nuevoRegistro = {
      id: Date.now(),
      presupuesto,
      totalGastado,
      fecha: new Date().toLocaleDateString(),
    };

    setHistorialPresupuestos([...historialPresupuestos, nuevoRegistro]);
  };

  const verHistorialPresupuestos = () => {
    setShowHistorial(true); // Mostrar el historial
  };

  const volverAVistaAnterior = () => {
    setShowHistorial(false); // Volver a la vista anterior
  };

  //Modal
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    } else {
      setGastosFiltrados([]);
    }
  }, [filtro, gastos]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    gasto.cantidad = Number(gasto.cantidad);

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generateId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      {showHistorial ? (
        <>
          <HistorialPresupuestos historialPresupuestos={historialPresupuestos} />
          <div className="volver-container">
            <button
              className="volver-btn"
              onClick={volverAVistaAnterior}
            >
              Volver
            </button>
          </div>
        </>
      ) : (
        <>
          <Header
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />

          {isValidPresupuesto && (
            <>
              <main>
                <div className="guardar-presupuesto-container">
                  <button
                    className="guardar-presupuesto-btn"
                    onClick={guardarPresupuestoEnHistorial}
                  >
                    Guardar Presupuesto
                  </button>
                  <button
                    className="ver-presupuesto-btn"
                    onClick={verHistorialPresupuestos}
                  >
                    Ver Presupuesto
                  </button>
                </div>
                <Filtros filtro={filtro} setFiltro={setFiltro} />
                <ListadoGastos
                  gastos={gastos}
                  gastosFiltrados={gastosFiltrados}
                  filtro={filtro}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              </main>
              <div className="nuevo-gasto">
                <img
                  src={IconoNuevoGasto}
                  alt="Icono Nuevo Gasto"
                  onClick={handleNuevoGasto}
                  aria-label="Añadir nuevo gasto"
                />
              </div>
            </>
          )}

          {modal && (
            <Modal
              setModal={setModal}
              animarModal={animarModal}
              setAnimarModal={setAnimarModal}
              guardarGasto={guardarGasto}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
