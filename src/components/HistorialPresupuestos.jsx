// HistorialPresupuestos.jsx
import React from 'react';

const HistorialPresupuestos = ({ historialPresupuestos }) => {
    return (
        <div className="historial-presupuestos sombra">
        <h2 className="titulo-historial">Historial de Presupuestos</h2>
        {historialPresupuestos.length > 0 ? (
            <div className="lista-presupuestos">
            {historialPresupuestos.map((registro) => (
                <div key={registro.id} className="card-presupuesto">
                <p>
                    <strong>Presupuesto:</strong> <span>${registro.presupuesto}</span>
                </p>
                <p>
                    <strong>Total Gastado:</strong> <span>${registro.totalGastado}</span>
                </p>
                <p>
                    <strong>Fecha:</strong> <span>{registro.fecha}</span>
                </p>
                </div>
            ))}
            </div>
        ) : (
            <p className="sin-presupuestos">No hay presupuestos guardados aún.</p>
        )}
        </div>
    );
};

export default HistorialPresupuestos;
