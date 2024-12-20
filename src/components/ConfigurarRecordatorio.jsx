const ConfigurarRecordatorio = ({ agregarRecordatorio, volver }) => {
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (descripcion && fecha) {
        agregarRecordatorio({ descripcion, fecha });
        setDescripcion('');
        setFecha('');
      }
    };
  
    return (
      <div className="configurar-recordatorio">
        <h2>Configurar Recordatorio</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <button type="submit">Agregar Recordatorio</button>
          <button type="button" onClick={volver}>
            Volver
          </button>
        </form>
      </div>
    );
  };
  
  export default ConfigurarRecordatorio;
  