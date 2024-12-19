import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({presupuestos, setPresupuestos}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        <NuevoPresupuesto 
            presupuestos={presupuestos}
            setPresupuestos={setPresupuestos}
        />
    </header>
  )
}

export default Header
