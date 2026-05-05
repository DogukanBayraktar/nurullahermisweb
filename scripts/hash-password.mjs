/**
 * Usage: node scripts/hash-password.mjs
 *
 * Generates ADMIN_PASSWORD_HASH for .env.local.
 * The output escapes "$" characters because Next.js expands "$VAR" in env files.
 */
import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter your password: ', async (password) => {
  const hash = await bcrypt.hash(password.trim(), 12);
  const escapedHash = hash.replaceAll('$', '\\$');

  console.log('\nAdd this to .env.local:\n');
  console.log(`ADMIN_PASSWORD_HASH="${escapedHash}"\n`);
  rl.close();
});
