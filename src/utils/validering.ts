import groq from 'groq';
import { StringRule, ValidationContext } from 'sanity';

const førsteTegnErLitenBokstavRegex = /^[a-zæøå].*/;

const maskinnavnValideringer = (rule: StringRule) => {
  return [
    rule
      .regex(førsteTegnErLitenBokstavRegex)
      .error('Første tegn i feltet kan ikke være tall eller stor bokstav.'),
  ];
};

const erUniktTekniskNavn = (
  type: string,
  tekniskNavn: string | undefined,
  context: ValidationContext,
) => {
  const { document, getClient } = context;

  const id = document?._id.replace(/^drafts\./, '');

  const params = {
    draft: `drafts.${id}`,
    published: id,
    type,
    tekniskNavn: tekniskNavn,
  };

  /* groq */
  const query = groq`!defined(*[
        !(_id in [$draft, $published]) &&
        tekniskNavn == $tekniskNavn
    ][0]._id)`;

  return getClient({ apiVersion: '2021-06-07' }).fetch(query, params);
};

export const tekniskNavnValideringer = (rule: StringRule, type: string) => [
  ...maskinnavnValideringer(rule),
  rule.custom(async (value, context) => {
    const erUnik = await erUniktTekniskNavn(type, value, context);
    if (!erUnik) return 'Teknisk navn er ikke unikt.';
    return true;
  }),
];
