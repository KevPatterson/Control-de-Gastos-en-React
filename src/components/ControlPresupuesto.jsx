import React from 'react'

const ControlPresupuesto = ({presupuesto}) => {

    const formatCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <p>Gráfica Aquí</p>
            </div>

                <div className='contenido-presupuesto'>
                    <p>
                        <span>Presupuesto:</span>{formatCantidad(presupuesto)}
                    </p>
                    <p>
                        <span>Disponible:</span>{formatCantidad(0)}
                    </p>
                    <p>
                        <span>Gastado:</span>{formatCantidad(0)}
                    </p>
                </div>
        </div>
    )
}

export default ControlPresupuesto
