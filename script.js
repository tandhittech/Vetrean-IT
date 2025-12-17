// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Gmail compose helper (opens Gmail web compose)
function openGmailCompose(to, subject, body) {
  const url =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(to) +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
  window.open(url, "_blank", "noopener,noreferrer");
}

// Email buttons
const emailBtn = document.getElementById("gmailEmailBtn");
const quoteBtn = document.getElementById("gmailQuoteBtn");

if (emailBtn) {
  emailBtn.addEventListener("click", () => {
    openGmailCompose(
      "T.and.H.IT.Tech@gmail.com",
      "Website Inquiry - VET IT Services",
      "Hi VET IT Services,\n\nI’m reaching out about:\n\n- Service needed:\n- Location (city):\n- Best time to schedule:\n\nThanks!"
    );
  });
}

if (quoteBtn) {
  quoteBtn.addEventListener("click", () => {
    openGmailCompose(
      "T.and.H.IT.Tech@gmail.com",
      "Request a Quote - VET IT Services",
      "Hi VET IT Services,\n\nPlease quote me for:\n\n- Cameras / Doorbell / NVR-DVR:\n- Wi-Fi / Network / VPN:\n- Malware cleanup / PC-Mac hardening:\n\nLocation (city):\nTimeframe:\n\nThanks!"
    );
  });
}

// Q&A form → Gmail compose
const qForm = document.getElementById("questionForm");
if (qForm) {
  qForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("qName").value.trim();
    const email = document.getElementById("qEmail").value.trim();
    const msg = document.getElementById("qMessage").value.trim();

    const body =
      `Name: ${name}\n` +
      `Email: ${email || "N/A"}\n\n` +
      `Question:\n${msg}\n\n` +
      `Sent from the website.`;

    openGmailCompose(
      "T.and.H.IT.Tech@gmail.com",
      `Website Question - ${name}`,
      body
    );
  });
}

// ===== Subtle BLUE Matrix Background (professional, low opacity) =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
const fontSize = 16;

let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => Math.random() * (canvas.height / fontSize));

function rebuildDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * (canvas.height / fontSize));
}
window.addEventListener("resize", rebuildDrops);

function draw() {
  // fade trail (matches light grey background)
 ctx.fillStyle = "rgba(242, 244, 247, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
 ctx.fillStyle = "rgba(37, 99, 235, 0.75)";
  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(draw);
}
draw();
