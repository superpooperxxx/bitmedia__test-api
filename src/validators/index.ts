import Joi from 'joi';

export const addPokemonReqBodySchema = Joi.object({
  pokemonId: Joi.string()
    .regex(/^[1-9]\d*$/)
    .required(),
  signedMessage: Joi.string()
    .regex(/^0x[0-9a-fA-F]{130}$/)
    .required(),
});

export const evolvePokemonReqBodySchema = Joi.object({
  userPokemonsIDFrom: Joi.string()
    .regex(/^[1-9]\d*$/)
    .required(),
  userPokemonsIDto: Joi.string()
    .regex(/^[1-9]\d*$/)
    .required(),
  signedMessage: Joi.string()
    .regex(/^0x[0-9a-fA-F]{130}$/)
    .required(),
});

export const paginationSchema = Joi.object({
  page: Joi.string().regex(/^[1-9]\d*$/),
  limit: Joi.string().regex(/^[1-9]\d*$/),
});

export const userIdSchema = Joi.object({
  userId: Joi.string()
    .regex(/^0x[0-9a-fA-F]{40}$/)
    .required(),
});

export const pokemonRequestSchema = Joi.object({
  pokemonId: Joi.string()
    .regex(/^[1-9]\d*$/)
    .required(),
});
