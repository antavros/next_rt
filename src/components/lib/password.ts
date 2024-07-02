import bcrypt from 'bcrypt';

/**
 * Хеширует пароль с использованием bcrypt.
 * @param password Пароль в виде простой строки.
 * @returns Хешированный пароль.
 */
export function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Проверяет, соответствует ли предоставленный пароль хешу.
 * @param password Пароль в виде простой строки.
 * @param hash Хешированный пароль.
 * @returns True, если пароль соответствует хешу.
 */
export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
