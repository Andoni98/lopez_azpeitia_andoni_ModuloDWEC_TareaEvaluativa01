import { GastoCombustible } from '../models/GastoCombustible.js';

const jsonHistorico = await fetch('/lopez_azpeitia_andoni_ModuloDWEC_TareaEvaluativa01/assets/data/historico.json');
const historico_db = await jsonHistorico.json();

export const GASTOS_DB = historico_db.map(gasto =>
  new GastoCombustible(
    gasto.id,
    gasto.vehicleType,
    gasto.date,
    gasto.kilometers,
    gasto.precioViaje
  )
);



