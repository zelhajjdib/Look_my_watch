/* ===========================
   LOOK MY WATCH — AUTH
   Firebase Auth + Firestore
=========================== */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';

/* ---------------------------
   🔧 REMPLACE CES VALEURS
   (Firebase Console → Paramètres du projet → Tes applications)
--------------------------- */
const firebaseConfig = {
  apiKey:            "REMPLACE_PAR_TON_API_KEY",
  authDomain:        "REMPLACE_PAR_TON_AUTH_DOMAIN",
  projectId:         "REMPLACE_PAR_TON_PROJECT_ID",
  storageBucket:     "REMPLACE_PAR_TON_STORAGE_BUCKET",
  messagingSenderId: "REMPLACE_PAR_TON_SENDER_ID",
  appId:             "REMPLACE_PAR_TON_APP_ID",
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

/* ---------------------------
   DOM REFS
--------------------------- */
const authModal      = document.getElementById('authModal');
const authBtn        = document.getElementById('authBtn');
const authBtnText    = document.getElementById('authBtnText');
const authModalClose = document.getElementById('authModalClose');
const loginPanel     = document.getElementById('loginPanel');
const registerPanel  = document.getElementById('registerPanel');
const userPanel      = document.getElementById('userPanel');
const loginForm      = document.getElementById('loginForm');
const registerForm   = document.getElementById('registerForm');
const loginError     = document.getElementById('loginError');
const registerError  = document.getElementById('registerError');

/* ---------------------------
   MODAL OPEN / CLOSE
--------------------------- */
function openAuthModal() {
  authModal.classList.add('is-open');
  authModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  authModal.classList.remove('is-open');
  authModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

authBtn.addEventListener('click', openAuthModal);
authModalClose.addEventListener('click', closeAuthModal);
authModal.addEventListener('click', e => { if (e.target === authModal) closeAuthModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAuthModal(); });

/* ---------------------------
   SWITCH LOGIN ↔ REGISTER
--------------------------- */
function showPanel(panel) {
  [loginPanel, registerPanel, userPanel].forEach(p => p.classList.add('hidden'));
  panel.classList.remove('hidden');
  loginError.textContent = '';
  registerError.textContent = '';
}

document.getElementById('toRegister').addEventListener('click', () => showPanel(registerPanel));
document.getElementById('toLogin').addEventListener('click',    () => showPanel(loginPanel));

/* ---------------------------
   AUTH STATE
--------------------------- */
onAuthStateChanged(auth, async user => {
  if (user) {
    const snap = await getDoc(doc(db, 'users', user.uid));
    const data = snap.exists() ? snap.data() : {};
    document.getElementById('userFirstName').textContent = data.prenom || '';
    document.getElementById('userEmail').textContent = user.email || '';
    authBtnText.textContent = data.prenom ? `Bonjour, ${data.prenom}` : 'Mon compte';
    showPanel(userPanel);
  } else {
    authBtnText.textContent = 'Se connecter';
    showPanel(loginPanel);
  }
});

/* ---------------------------
   LOGIN
--------------------------- */
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  loginError.textContent = '';
  const email    = loginForm.loginEmail.value.trim();
  const password = loginForm.loginPassword.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    closeAuthModal();
  } catch (err) {
    loginError.textContent = errorMessage(err.code);
  }
});

/* ---------------------------
   REGISTER
--------------------------- */
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  registerError.textContent = '';

  const nom      = registerForm.regNom.value.trim();
  const prenom   = registerForm.regPrenom.value.trim();
  const email    = registerForm.regEmail.value.trim();
  const phone    = registerForm.regPhone.value.trim();
  const birthday = registerForm.regBirthday.value; // YYYY-MM-DD
  const password = registerForm.regPassword.value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Stocke les infos dans Firestore
    // birthdayMMDD = "MM-DD" pour les requêtes d'anniversaire
    const [, month, day] = birthday.split('-');
    await setDoc(doc(db, 'users', cred.user.uid), {
      nom,
      prenom,
      email,
      phone,
      birthday,
      birthdayMMDD: `${month}-${day}`,
      createdAt: serverTimestamp(),
    });

    closeAuthModal();
  } catch (err) {
    registerError.textContent = errorMessage(err.code);
  }
});

/* ---------------------------
   LOGOUT
--------------------------- */
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await signOut(auth);
});

/* ---------------------------
   MESSAGES D'ERREUR FR
--------------------------- */
function errorMessage(code) {
  const map = {
    'auth/user-not-found':        'Aucun compte avec cet email.',
    'auth/wrong-password':        'Mot de passe incorrect.',
    'auth/email-already-in-use':  'Cet email est déjà utilisé.',
    'auth/weak-password':         'Mot de passe trop court (6 caractères min).',
    'auth/invalid-email':         'Adresse email invalide.',
    'auth/invalid-credential':    'Email ou mot de passe incorrect.',
    'auth/too-many-requests':     'Trop de tentatives. Réessayez plus tard.',
  };
  return map[code] || 'Une erreur est survenue. Réessayez.';
}
