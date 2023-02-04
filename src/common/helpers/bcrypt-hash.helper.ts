import * as bcrypt from 'bcrypt';

const saltOrRounds: number = 10;

export const encodePassword = (rawPassword: string): string => {
  const hash: string = bcrypt.hashSync(rawPassword, saltOrRounds);
  return hash;
};

export const decodePassword = (
  rawPassword: string,
  hashPassword: string,
): boolean => {
  return bcrypt.compareSync(rawPassword, hashPassword);
};
