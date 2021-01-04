export function getValidationMessage(element) {
  const validity = element.target.validity;
  if (validity.patternMismatch) {
    return "please use only: " + element.target.dataset.permitions;
  }
  if (validity.valueMissing) {
    return "please fill out this field";
  }
  if (validity.tooShort) {
    return `this field require ${element.target.getAttribute(
      "minlength"
    )} characters or more`;
  }
  if (validity.typeMismatch) {
    return `his field require data to be ${element.target.getAttribute(
      "type"
    )}`;
  }
}