var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};
import { GASTOS_DB } from './gasto.data.js';
import { GastoCombustible } from '../models/GastoCombustible.js';


function almacenarGastos(){
  GASTOS_DB.forEach(gasto => {
  const clave = gasto.id.toString();
  const valor = JSON.stringify(gasto); 
  localStorage.setItem(clave, valor);
  });

  GASTOS_DB.forEach(gasto => {
    const año = new Date(gasto.date).getFullYear();
    gastoAnual[año] += gasto.precioViaje;
  });

  // Guardamos en sessionStorage: clave = año, valor = gasto total (string)
  for (const año in gastoAnual) {
    sessionStorage.setItem(año, gastoAnual[año].toFixed(2)); // con 2 decimales
  }

  console.log('Gasto anual calculado y guardado en sessionStorage:', gastoAnual);
};

function procesarGasto(jsonNuevoGasto){
  const gastoObj = JSON.parse(jsonNuevoGasto);
    const nuevoGasto = new GastoCombustible(
    gastoObj.id,
    gastoObj.vehicleType,
    gastoObj.date,
    gastoObj.kilometers,
    gastoObj.precioViaje
  );

  const año = new Date(nuevoGasto.date).getFullYear();

  const gastoActual = parseFloat(sessionStorage.getItem(año));

  const nuevoTotal = gastoActual + nuevoGasto.precioViaje;

  sessionStorage.setItem(año, nuevoTotal.toFixed(2));

  console.log(`Gasto actualizado para el año ${año}:`, nuevoTotal.toFixed(2));
  
}
almacenarGastos();
export const GastoService = {
  almacenarGastos,
  procesarGasto,
};