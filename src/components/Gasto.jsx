import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    TrailingActions,
    SwipeAction,
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatFecha } from '../assets/helpers';
//Iconos
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
import IconoPersonal from '../img/icono_personal.svg'
import IconoFamiliar from '../img/icono_familiar.svg'

const diccionarioIconos = {
    Familiar: IconoCasa,
    Personal: IconoPersonal,
    Ahorros: IconoAhorro,
    Comida: IconoComida,
    Salud: IconoSalud,
    Ocio: IconoOcio,
    Suscripciones: IconoSuscripciones,
    Otros: IconoGastos,
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {categoria, nombre, cantidad, id, fecha} = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)}
                destructive = {true}
                >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
    <div className="gasto sombra">
        <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="Icono Gasto" />
            <div className="descripcion-gasto">
                <p className='categoria'>{categoria}</p>
                <p className='nombre-gasto'>{nombre}</p>
                <p className='fecha-gasto'>
                    Agregado el: {''}
                    <span>{formatFecha(fecha)}</span>
                </p>
            </div>
        </div>
        <p className='cantidad-gasto'>${cantidad}</p>
    </div>
        </SwipeableListItem>
    </SwipeableList>
    )
}

export default Gasto
