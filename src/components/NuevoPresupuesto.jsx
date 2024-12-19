import { useState } from 'react';
import PropTypes from 'prop-types';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto <= 0) {
            setMensaje('El presupuesto debe ser un número positivo');
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="nuevo-presupuesto">Definir Presupuesto</label>
                    <input
                        id="nuevo-presupuesto"
                        type="number"
                        placeholder="Define tu Presupuesto"
                        className="nuevo-presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                        aria-label="Introduce tu presupuesto inicial"
                        aria-required="true"
                    />
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    );
};

// Validación de props
NuevoPresupuesto.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    setPresupuesto: PropTypes.func.isRequired,
    setIsValidPresupuesto: PropTypes.func.isRequired,
};

export default NuevoPresupuesto;
