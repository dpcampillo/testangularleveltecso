import { FormGroup, FormControl } from '@angular/forms';

export const LOGIN = 'LOGIN_APP'
export const USER_APP = 'USER_APP'

export function validarFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validarTodosCampos(control);
        }
    });
}