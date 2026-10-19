/**
 * Lifts the first-paint loader (#boot in index.html) once the first page has
 * rendered. It waits briefly for the web fonts so the hero does not swap
 * faces in view, but never more than FONT_WAIT ms.
 */
const FONT_WAIT = 700;

let lifted = false;

export function liftBootLoader() {
  if (lifted) return;
  lifted = true;

  const boot = document.getElementById("boot");
  if (!boot) return;

  const fonts = document.fonts?.ready ?? Promise.resolve();
  const cap = new Promise((resolve) => setTimeout(resolve, FONT_WAIT));

  Promise.race([fonts, cap]).then(() => {
    boot.classList.add("is-done");
    const remove = () => boot.remove();
    boot.addEventListener("transitionend", (e) => e.target === boot && remove());
    setTimeout(remove, 1500);
  });
}
