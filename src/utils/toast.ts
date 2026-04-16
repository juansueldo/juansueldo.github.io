type ToastType = 'loading' | 'success' | 'error';

function getIcon(type: ToastType) {
  if (type === 'loading') {
    return `
      <svg width="16" height="16" viewBox="0 0 50 50" style="animation: spin 1s linear infinite;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="90,150"/>
      </svg>
    `;
  }

  if (type === 'success') {
    return `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  return `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

export function showToast(type: ToastType) {
  const toast = document.getElementById('toast-msg') as HTMLDivElement | null;
  if (!toast) return;

  const text =
    type === 'loading' ? toast.dataset.sending :
    type === 'success' ? toast.dataset.success :
    toast.dataset.error;

  const icon = getIcon(type);

  // reset clases
  toast.className = 'toast';

  if (type === 'success') toast.classList.add('toast-success');
  if (type === 'error') toast.classList.add('toast-danger');
  if (type === 'loading') toast.classList.add('toast-info');

  toast.innerHTML = `
    <div class="toast-header">
      <div class="toast-icon">${icon}</div>
      <div class="toast-title">
        ${type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Loading'}
      </div>
    </div>
    <div class="toast-desc">${text}</div>
  `;

  toast.style.opacity = '1';

  // @ts-ignore
  clearTimeout(window._toastTimeout);

  if (type !== 'loading') {
    // @ts-ignore
    window._toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
    }, 3500);
  }
}
