import { FormArray, FormControl } from '@angular/forms';

class FormArraySubForm<T, R> {
  readonly array: FormArray;
  state: R | null = null;
  isOpened: boolean;

  constructor(formArray: FormArray, isOpened: boolean = false) {
    this.array = formArray;
    this.isOpened = isOpened;
  }

  values = () => this.array.controls.map(({ value }) => value);

  add = (control: FormControl<T | null>) => {
    if (control.value) this.array.push(control);
  };

  remove = (index: number) => this.array.removeAt(index);

  clearState = () => (this.state = null);
}

export default FormArraySubForm;
