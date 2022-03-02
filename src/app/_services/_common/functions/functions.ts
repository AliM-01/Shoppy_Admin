import { FormGroup } from "@angular/forms";
import { BrowserStorageService } from "@app_services/auth/browser-storage.service";

export function toSlug(text: string): string {
  return text.trim().replace(' ', '-')
}

export function separateThousands(inputNumber: any): string {
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

export function isEmptyString(value: string): boolean {
  return !value || 0 === value.length;
}

export function checkFormGroupErrors(formGroup: FormGroup, controlName: string, errorName: string): boolean {
  if (!formGroup.controls[controlName].touched) {
    return false;
  }

  return formGroup.controls[controlName].hasError(errorName);
}

export function getCurrentTabId(browserStorageService: BrowserStorageService): number {
  const tabIdToken = "currentTabId";
  let tabId = browserStorageService.getLocal(tabIdToken);
  if (tabId) {
    return tabId;
  }
  tabId = Math.random();
  browserStorageService.setLocal(tabIdToken, tabId);
  return tabId;
}