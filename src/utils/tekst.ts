const replacements: Record<string, string> = {
  å: 'a',
  Å: 'A',
  æ: 'ae',
  Æ: 'AE',
  ø: 'o',
  Ø: 'Ø',
};
export const camelCaseErstattÅæø = (str: string) =>
  camelCase(str.replace(/[åÅæÆøØ]/g, (match) => replacements[match] || match));

export const camelCase = (str: string) =>
  str
    .replace(/^\w|[A-Z]|\b\w/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
