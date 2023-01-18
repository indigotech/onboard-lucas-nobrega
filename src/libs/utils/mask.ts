export function maskPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{1})(\d{4})(\d{4})(\d)/, '$1 $2-$3');
}

export function unMaskedPhone(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export const maskString = {
  apply(value: string, patternPhone = '') {
    let i = 0;
    const v = String(value);
    return patternPhone.replace(/#/g, () => v[i++]).replace(/undefined/g, '');
  },
};
export const patternPhone = '(##) # ####-####';
