import { FormGroup } from "@angular/forms";

export function toSlug(text: string): string{
  return text.trim().replace(' ', '-')
}

export function separateThousands(inputNumber:any):string {
  let numberToString = inputNumber.toString();
  numberToString = numberToString.replace(',', '');
  let x = numberToString.split('.');
  let y = x[0];
  let z = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y))
    y = y.replace(rgx, '$1' + ',' + '$2');
  return `${(y + z)} تومان`;
}

export function checkFormGroupErrors(formGroup: FormGroup, controlName: string, errorName: string):boolean {
  return formGroup.controls[controlName].hasError(errorName);
}