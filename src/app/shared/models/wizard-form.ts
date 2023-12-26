import { FormGroup } from '@angular/forms';

interface WizardForm {
  save(formRawData: any): void;
  cancel(): void;
}

export interface EditForm extends WizardForm {
  loadDataFromApi(form: FormGroup): void;
}

export interface AddForm extends WizardForm {}

export default WizardForm;
