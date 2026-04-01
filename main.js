import './style.css'

// --- 0. Global Auto-Tracker System ---
const solvedPuzzles = new Set();
const progressFill = document.getElementById('progress-fill');
const solvedCount = document.getElementById('solved-count');

window.markSolved = (id) => {
  if (solvedPuzzles.has(id)) return;
  solvedPuzzles.add(id);
  
  const module = document.getElementById(`puzzle${id}`);
  if(module) module.classList.add('solved');
  
  const count = solvedPuzzles.size;
  if(solvedCount) solvedCount.innerText = count;
  if(progressFill) progressFill.style.width = `${(count / 8) * 100}%`;
  
  console.log(`%c[VAULT] FRAGMENT 0${id} DECRYPTED.`, 'color: #00ff41; font-weight: bold;');
  
  if (count === 8) {
    setTimeout(() => alert('CRITICAL SUCCESS: ALL VAULT FRAGMENTS DECRYPTED. YOU HAVE MASTER ACCESS.'), 500);
  }
};

// --- 1. Phantom Blueprint Flashlight Effect ---
const blueprintContainer = document.getElementById('blueprint-container');
const maskLayer = document.getElementById('blueprint-mask');
let puz1Timer = null;

blueprintContainer.addEventListener('mousemove', (e) => {
  const rect = blueprintContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  maskLayer.style.setProperty('--mouse-x', `${x}px`);
  maskLayer.style.setProperty('--mouse-y', `${y}px`);
  
  // Auto-detect if hovering near center
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
  
  if (dist < 40) {
    if (!puz1Timer) {
      puz1Timer = setTimeout(() => { markSolved(1); }, 1000);
    }
  } else {
    clearTimeout(puz1Timer);
    puz1Timer = null;
  }
});

blueprintContainer.addEventListener('mouseleave', () => {
  maskLayer.style.setProperty('--mouse-x', `-100px`);
  maskLayer.style.setProperty('--mouse-y', `-100px`);
  clearTimeout(puz1Timer);
  puz1Timer = null;
});

// --- 2. Cipher Log ---
const cipherText = document.querySelector('.hidden-text');
document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  if (selection.toString().trim().length > 5 && selection.containsNode(cipherText, true)) {
    markSolved(2);
  }
});
cipherText.addEventListener('copy', () => markSolved(2));

// --- 3. Ghost Protocol ---
window.executeProtocol = () => {
  const modal = document.createElement('div');
  modal.className = 'ghost-modal';
  modal.innerHTML = `
    <h2 style="color: var(--accent); text-shadow: 0 0 10px var(--accent); margin-bottom: 1rem;">PROTOCOL ACCEPTED</h2>
    <p style="font-size: 1.2rem; margin-bottom: 2rem;">KEY_3: NEURAL_LINK</p>
    <button id="close-ghost" class="cyber-btn" style="position: relative; top: 0; z-index: 100">DISCONNECT</button>
  `;
  document.body.appendChild(modal);
  
  setTimeout(() => {
    document.getElementById('close-ghost').addEventListener('click', () => {
      modal.remove();
    });
  }, 10);
  
  markSolved(3);
  return "Protocol successful. Check the UI.";
};
console.log('%c[SYSTEM] AWAITING PROTOCOL EXECUTION... (Hint: window.executeProtocol())', 'color: #008f11; font-size: 12px');

// --- 4. Glitch Keypad (Evasive Action) ---
const glitchBtn = document.getElementById('glitch-btn');
const keypadContainer = document.getElementById('keypad-container');

setTimeout(() => {
  const containerRect = keypadContainer.getBoundingClientRect();
  const btnRect = glitchBtn.getBoundingClientRect();
  glitchBtn.style.left = `${(containerRect.width - btnRect.width) / 2}px`;
  glitchBtn.style.top = `${(containerRect.height - btnRect.height) / 2}px`;
}, 100);

const moveBtn = () => {
  const containerRect = keypadContainer.getBoundingClientRect();
  const btnRect = glitchBtn.getBoundingClientRect();
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
  glitchBtn.style.left = `${Math.max(0, Math.random() * maxX)}px`;
  glitchBtn.style.top = `${Math.max(0, Math.random() * maxY)}px`;
};

glitchBtn.addEventListener('mousemove', moveBtn);
glitchBtn.addEventListener('mouseover', moveBtn);

glitchBtn.addEventListener('click', () => {
  glitchBtn.innerHTML = "ACCESS GRANTED";
  glitchBtn.style.background = "var(--text-primary)";
  glitchBtn.style.color = "#000";
  markSolved(4);
});

// --- 5. Dimension Restrictor ---
const checkDimension = () => {
  if (window.innerWidth === 404) markSolved(5);
};
window.addEventListener('resize', checkDimension);
checkDimension();

// --- 6. Network Phantom (Fake API Call) ---
window.unlockNetwork = () => {
  markSolved(6);
  return "Network Phantom bypass successful.";
};
setTimeout(() => {
  fetch('/phantom-key.json')
    .then(res => res.json())
    .then(() => {
      document.getElementById('network-status').innerText = "CONNECTION FAILED: 403 FORBIDDEN";
    })
    .catch(() => {
      document.getElementById('network-status').innerText = "CONNECTION FAILED: 403 FORBIDDEN";
    });
}, 1500);

// --- 7. Local Stash (LocalStorage Polling) ---
setInterval(() => {
  try {
    let isSolved = false;
    const valLocal = localStorage.getItem('vault_access') || '';
    const valSession = sessionStorage.getItem('vault_access') || '';
    
    // Check strictly but ignoring quotes and spaces
    if (valLocal.replace(/['"\s]/g, '').toLowerCase() === 'granted' || 
        valSession.replace(/['"\s]/g, '').toLowerCase() === 'granted') {
      isSolved = true;
    }
    
    // Forgiving check for swapped keys/values or partial matches
    for (let i = 0; i < localStorage.length; i++) {
      const k = String(localStorage.key(i)).toLowerCase();
      const v = String(localStorage.getItem(localStorage.key(i))).toLowerCase();
      if ((k.includes('vault') && v.includes('grant')) || (k.includes('grant') && v.includes('vault'))) {
        isSolved = true;
      }
    }

    if (isSolved) {
      const hint = document.getElementById('storage-hint');
      const keyStr = document.getElementById('storage-key');
      if (hint) hint.style.display = 'none';
      if (keyStr) keyStr.style.display = 'block';
      markSolved(7);
    } else {
      const hint = document.getElementById('storage-hint');
      const keyStr = document.getElementById('storage-key');
      if (hint) hint.style.display = 'block';
      if (keyStr) keyStr.style.display = 'none';
    }
  } catch(e) {}
}, 1000);

// --- 8. Ghost in the Machine (Konami Code) ---
const secretSequence = ['v', 'a', 'u', 'l', 't'];
let sequenceIndex = 0;

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (e.key.toLowerCase() === secretSequence[sequenceIndex]) {
    sequenceIndex++;
    if (sequenceIndex === secretSequence.length) {
      document.getElementById('konami-key').style.display = 'block';
      markSolved(8);
      sequenceIndex = 0;
    }
  } else {
    if (e.key.toLowerCase() === secretSequence[0]) sequenceIndex = 1;
    else sequenceIndex = 0;
  }
});

// --- Hints UI Logic ---
const hints = [
  "Look closely at the dark area. Hover your mouse around the center for a second.",
  "The information is right there, but perfectly matches the background color. Try highlighting the text.",
  "The UI doesn't exist yet. Open your Developer Console (F12) and type window.executeProtocol()",
  "The button runs away from your mouse. Use your keyboard's 'Tab' key to focus it, then press 'Enter'.",
  "The viewport requires a very specific width. Try resizing the browser window to exactly 404px wide using DevTools responsive mode.",
  "A network request failed. Check the 'Network' tab in your DevTools (F12) to examine the payload of the failed request.",
  "The vault is checking your browser's local storage. In DevTools, go to 'Application', find Local Storage, and add the key 'vault_access' with value 'granted'.",
  "A classic gaming keystroke is required. Type the word 'VAULT' sequentially on your keyboard."
];

const hintsList = document.getElementById('hints-list');
hints.forEach((hint, index) => {
  const item = document.createElement('div');
  item.className = 'hint-item';
  item.innerHTML = `
    <div class="hint-header">
      <span>FRAG 0${index + 1}</span>
      <button class="hint-btn">SHOW HINT</button>
    </div>
    <p class="hint-text">${hint}</p>
  `;
  hintsList.appendChild(item);
  item.querySelector('.hint-btn').addEventListener('click', (e) => {
    const text = item.querySelector('.hint-text');
    if (text.style.display === 'block') {
      text.style.display = 'none';
      e.target.innerText = 'SHOW HINT';
    } else {
      text.style.display = 'block';
      e.target.innerText = 'HIDE HINT';
    }
  });
});
