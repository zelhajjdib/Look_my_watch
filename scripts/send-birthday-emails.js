/**
 * LOOK MY WATCH — Birthday Email Script
 * Tourne quotidiennement via GitHub Actions
 * Envoie un email aux membres dont c'est l'anniversaire aujourd'hui
 *
 * Secrets GitHub requis :
 *   FIREBASE_SERVICE_ACCOUNT  → JSON de la clé de service Firebase
 *   EMAIL_USER                → Adresse Gmail expéditrice
 *   EMAIL_PASSWORD            → Mot de passe d'application Gmail
 */

import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

/* ---------------------------
   INIT FIREBASE ADMIN
--------------------------- */
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/* ---------------------------
   AUJOURD'HUI en MM-DD
--------------------------- */
const today = new Date();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayMMDD = `${mm}-${dd}`;

console.log(`Recherche des anniversaires du ${todayMMDD}...`);

/* ---------------------------
   TRANSPORTER NODEMAILER
--------------------------- */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/* ---------------------------
   REQUÊTE FIRESTORE + ENVOI
--------------------------- */
const snap = await db
  .collection('users')
  .where('birthdayMMDD', '==', todayMMDD)
  .get();

if (snap.empty) {
  console.log('Aucun anniversaire aujourd\'hui.');
  process.exit(0);
}

let sent = 0;
for (const docSnap of snap.docs) {
  const { prenom, nom, email } = docSnap.data();

  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"/></head>
  <body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 0;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0f0f0f;border:1px solid rgba(255,255,255,0.07);max-width:560px;width:100%;">
          <!-- Header or -->
          <tr><td style="background:linear-gradient(135deg,#9A7B28,#C9A84C,#F0CC6A,#C9A84C,#9A7B28);padding:3px 0;"></td></tr>
          <!-- Content -->
          <tr><td style="padding:40px 40px 32px;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C9A84C;">Look My Watch</p>
            <h1 style="margin:0 0 24px;font-size:28px;font-weight:900;color:#ffffff;">Joyeux Anniversaire,<br/>${prenom} ! 🎉</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#a0a0a0;line-height:1.7;">
              Toute l'équipe Look My Watch vous souhaite un très bel anniversaire.<br/>
              Pour célébrer ce jour spécial, nous avons pensé à vous.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#a0a0a0;line-height:1.7;">
              Profitez-en pour découvrir notre dernière collection — peut-être que la montre de vos rêves vous attend.
            </p>
            <a href="https://zelhajjdib.github.io/Look_my_watch/" style="display:inline-block;background:linear-gradient(135deg,#9A7B28,#C9A84C,#F0CC6A);color:#080808;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;padding:14px 32px;">
              Voir la collection →
            </a>
          </td></tr>
          <!-- Footer -->
          <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.6;">
              © ${today.getFullYear()} Look My Watch · Vous recevez cet email car vous êtes membre.<br/>
              Vendu sur <strong style="color:rgba(255,255,255,0.35)">Amazon</strong> · Paiement sécurisé
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;

  await transporter.sendMail({
    from: `"Look My Watch" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🎂 Joyeux Anniversaire ${prenom} ! Un cadeau vous attend`,
    html,
  });

  console.log(`Email envoyé à ${prenom} ${nom} (${email})`);
  sent++;
}

console.log(`${sent} email(s) envoyé(s).`);
