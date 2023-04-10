import { ParsedQs } from 'qs';

export const getSkipAndLimit = (query: ParsedQs, pokemonsNum: number) => {
  const page = +query.page || 1;
  const limit = +query.limit || 12;
  const skip = (page - 1) * limit;

  if (query.page && skip >= pokemonsNum) {
    throw new Error('There is no such page');
  }

  return { skip, limit };
};
