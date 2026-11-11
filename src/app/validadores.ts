import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const bloquesDeCinco: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value;
  if (valor === null || valor === '') return null; 
  return Number(valor) % 5 === 0 ? null : { bloquesDeCinco: true };
};