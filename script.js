document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('telegram-join');
  if (!button) return;
  button.addEventListener('pointerdown', () => button.classList.add('pressed'));
  ['pointerup','pointercancel','pointerleave'].forEach(type =>
    button.addEventListener(type, () => button.classList.remove('pressed'))
  );

  let navigating = false;
  button.addEventListener('click', (event) => {
    // Track only the intent to visit Telegram, not a verified subscription.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (navigating) return;
    navigating = true;
    const url = button.href;
    button.classList.add('pressed');
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Subscribe', {destination: 'telegram', action: 'join_button_click'});
        window.fbq('trackCustom', 'TelegramJoinClick', {destination: 'telegram'});
      }
    } catch (error) {
      console.warn('Meta Pixel event could not be queued:', error);
    }
    // Allow the browser a brief chance to send the queued pixel request.
    // Delivery is not guaranteed by this delay (ad blockers/consent may prevent it).
    window.setTimeout(() => { window.location.assign(url); }, 900);
  });
});
