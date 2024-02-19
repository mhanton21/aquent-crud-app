import {FormControl, ValidationErrors} from "@angular/forms";

export function stateValidator(control: FormControl): { [key: string]: boolean } | null {
  const valid = control.value && /^[A-Z]{2}$/.test(control.value);
  return valid ? null : { 'invalidStateAbbreviation': true };
}

export function zipCodeValidator(control: FormControl): { [key: string]: boolean } | null {
  const valid = control.value && /^\d{5}$/.test(control.value);
  return valid ? null : { 'invalidZipCode': true };
}

export function phoneNumberValidator(control: FormControl): { [key: string]: boolean } | null {
  const phoneRegex = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;
  if (!control.value || !phoneRegex.test(control.value)) {
    return { 'invalidPhoneNumber': true };
  }
  return null;
}

export function getErrorMessage(errors: ValidationErrors) {
  if (errors['required']) {
    return 'This field is required';
  }
  else if (errors['minlength']) {
    return 'This field requires at least ' + errors['minlength'].requiredLength + ' characters';
  }
  else if (errors['maxlength']) {
    return 'This field cannot exceed ' + errors['maxlength'].requiredLength + ' characters';
  }
  else if (errors['email']) {
    return 'Valid email is required';
  }
  else if (errors['invalidStateAbbreviation']) {
    return 'Valid US state abbreviation is required';
  }
  else if (errors['invalidZipCode']) {
    return 'Valid 5-digit zip code is required';
  }
  else if (errors['invalidPhoneNumber']) {
    return 'Valid US phone number is required';
  }
  return 'Please correct this field';
}
