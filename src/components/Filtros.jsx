const Filtros = ({ filtro, setFiltro }) => {
  const handleFiltroChange = (e) => {
    setFiltro(e.target.value); // Actualiza el filtro seleccionado
  };

  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="categoria">Filtrar Gastos</label>
          <select
            id="categoria"
            value={filtro}
            onChange={handleFiltroChange}
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
      </form>
    </div>
  );
};

export default Filtros;
