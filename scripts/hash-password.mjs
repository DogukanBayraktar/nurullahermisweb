/**
 * Kullanım: node scripts/hash-password.mjs
 *
 * Bu script ADMIN_PASSWORD_HASH değerini üretir.
 * Bir kez çalıştırın, çıktıyı .env.local'e ve Vercel env'ye ekleyin.
 */
import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Şifrenizi girin: ', async (password) => {
  const hash = await bcrypt.hash(password.trim(), 12);
  console.log('\n✅ .env.local dosyanıza ekleyin:\n');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
  rl.close();
});
