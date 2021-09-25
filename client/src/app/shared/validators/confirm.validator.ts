import { FormGroup } from '@angular/forms';

export class ConfirmValidator {
    static equalValidator(firstControl: string, secondControl: string): any {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[firstControl];
            const matchingControl = formGroup.controls[secondControl];

            if (matchingControl.errors && !matchingControl.errors.notEqual) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ notEqual: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
