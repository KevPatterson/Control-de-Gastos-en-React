import React from 'react';
import PropTypes from 'prop-types'; // Importación para validar props
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({ 
    gastos,
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    setGastos,
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {isValidPresupuesto ? (
                <ControlPresupuesto 
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                />
            ) : (
                <NuevoPresupuesto 
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}
        </header>
    );
};

// Validación de props
Header.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    setPresupuesto: PropTypes.func.isRequired,
    isValidPresupuesto: PropTypes.bool.isRequired,
    setIsValidPresupuesto: PropTypes.func.isRequired
};

export default Header;
