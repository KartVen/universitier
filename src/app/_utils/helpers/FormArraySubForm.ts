import { FormArray, FormGroup } from '@angular/forms';

class FormArraySubForm<T> {
  readonly form: FormGroup;
  readonly field: string;
  isOpened: boolean;
  readonly array: FormArray;

  constructor(form: FormGroup, field: string, isOpened: boolean = false) {
    this.form = form;
    this.field = field;
    this.array = this.getArray();
    this.isOpened = isOpened;
  }

  getArray() {
    return this.form.get(this.field) as FormArray;
  }
}

export default FormArraySubForm;
