// app.js – async/await + try/catch enligt uppgiften
// API: https://icanhazdadjoke.com/ (returnerar { id, joke, status })

const jokeEl = document.getElementById("joke");
const errorEl = document.getElementById("error");
const getJokeBtn = document.getElementById("getJokeBtn");
const copyBtn = document.getElementById("copyBtn");
const cardEl = document.querySelector(".card");

// Hämta första skämtet när sidan laddas
window.addEventListener("DOMContentLoaded", () => {
  fetchJoke();
});

getJokeBtn.addEventListener("click", fetchJoke);

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(jokeEl.textContent.trim());
    copyBtn.textContent = "✅ Kopierat!";
    setTimeout(() => (copyBtn.textContent = "📋 Kopiera"), 1200);
  } catch {
    // Fallback om clipboard blockeras
    selectText(jokeEl);
    alert("Kunde inte kopiera automatiskt – markeringen är vald, kopiera manuellt (Ctrl/Cmd+C).");
  }
});

async function fetchJoke() {
  setBusy(true);
  clearError();

  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
      cache: "no-store"
    });

    if (!res.ok) {
      // Ger mer hjälpsam felsignal i UI
      throw new Error(`API svarade med status ${res.status}`);
    }

    const data = await res.json();
    renderJoke(data.joke);
  } catch (err) {
    showError("Oj! Kunde inte hämta ett skämt just nu. Testa igen om en stund.");
    console.error(err);
  } finally {
    setBusy(false);
  }
}

// UI helpers
function renderJoke(text) {
  jokeEl.textContent = text;
}
function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}
function clearError() {
  errorEl.hidden = true;
  errorEl.textContent = "";
}
function setBusy(isBusy) {
  cardEl.setAttribute("aria-busy", String(isBusy));
  getJokeBtn.disabled = isBusy;
  copyBtn.disabled = isBusy;
}

// Litet kopierings-fallback för vissa browsers
function selectText(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
