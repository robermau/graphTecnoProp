

export default function obtenerPeriodo(meses, i) {

  const numero = i + 1; 

  switch (meses) {
    case 1:
      return `Mes ${numero}`;
    case 2:
      return `Bimestre ${numero}`;
    case 3:
      return `Trimestre. ${numero}`;  
    case 4:
      return `Cuatrimestre ${numero}`;
    case 5:
      return `Periodo ${numero}`;
    case 6:
      return `Semestre ${numero}`;
    case 12:
      return `Año ${numero}`;
    default:
      return `Periodo ${numero}`;
  }
}