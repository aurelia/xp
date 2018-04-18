import { FrameworkConfiguration } from 'aurelia-framework';

export { UxCardTheme } from '@aurelia-ux/card';
export { UxButtonTheme } from '@aurelia-ux/button';
export { UxCheckboxTheme, UxCheckbox, UxCheckboxElement } from '@aurelia-ux/checkbox';
export { UxChipInputTheme, UxChipTheme, UxTagTheme } from '@aurelia-ux/chip-input';
export { UxGridTheme, UxResponsiveUtilities } from '@aurelia-ux/grid';
export { UxDatepickerTheme } from '@aurelia-ux/datepicker';
export { UxFormTheme } from '@aurelia-ux/form';
export { UxInputTheme, UxInput, UxInputElement } from '@aurelia-ux/input';
export { UxInputInfoTheme } from '@aurelia-ux/input-info';
export { UxListTheme } from '@aurelia-ux/list';
export { UxRadioTheme, UxRadio, UxRadioElement } from '@aurelia-ux/radio';
export { UxTextAreaTheme, UxTextArea, UxTextAreaElement } from '@aurelia-ux/textarea';
export { UxSwitchTheme, UxSwitch, UxSwitchElement } from '@aurelia-ux/switch';
export {
  UxOption,
  UxOptionElement,
  UxOptGroup,
  UxOptGroupElement,
  UxSelect,
  UxSelectElement,
  UxSelectTheme
} from '@aurelia-ux/select';

import { configure as configureButtonComponent } from '@aurelia-ux/button';
import { configure as configureCardComponent } from '@aurelia-ux/card';
import { configure as configureCheckboxComponent } from '@aurelia-ux/checkbox';
import { configure as configureChipComponent } from '@aurelia-ux/chip-input';
import { configure as configureDatepickerComponent } from '@aurelia-ux/datepicker';
import { configure as configureGridComponent } from '@aurelia-ux/grid';
import { configure as configureFormComponent } from '@aurelia-ux/form';
import { configure as configureInputComponent } from '@aurelia-ux/input';
import { configure as configureInputInfoComponent } from '@aurelia-ux/input-info';
import { configure as configureListComponent } from '@aurelia-ux/list';
import { configure as configureRadioComponent } from '@aurelia-ux/radio';
import { configure as configureTextareaComponent } from '@aurelia-ux/textarea';
import { configure as configureSwitchComponent } from '@aurelia-ux/switch';
import { configure as configureSelectComponent } from '@aurelia-ux/select';

export function configure(config: FrameworkConfiguration) {
  configureButtonComponent(config);
  configureCardComponent(config);
  configureCheckboxComponent(config);
  configureChipComponent(config);
  configureDatepickerComponent(config);
  configureGridComponent(config);
  configureFormComponent(config);
  configureInputComponent(config);
  configureInputInfoComponent(config);
  configureListComponent(config);
  configureRadioComponent(config);
  configureTextareaComponent(config);
  configureSwitchComponent(config);
  configureSelectComponent(config);
}
