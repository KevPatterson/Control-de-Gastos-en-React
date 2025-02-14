import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        const totalDisponible = presupuesto - totalGastado;

    // Calcular porcentaje gastado
    const nuevoPorcentaje = ((totalGastado / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);
        setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
        }, 1500);
    }, [gastos, presupuesto]);

    const formatCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

    const handleResetApp= () => {
        const resultado = confirm('Deseas reiniciar tu presupuesto y tus gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            })}
            value={porcentaje}
            text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className="contenido-presupuesto">
            <button className='reset-app' type='button' onClick={handleResetApp}>Reiniciar Gastos</button>
            <p>
            <span>Presupuesto:</span> {formatCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? "negativo" : ""}`}>
            <span>Disponible:</span>{' '}
            <span className={disponible < 0 ? 'negativo' : ''}>
                {formatCantidad(disponible)}
            </span>
            </p>
            <p>
            <span>Gastado:</span> {formatCantidad(gastado)}
            </p>
        </div>
        </div>
    );
    };

export default ControlPresupuesto;
