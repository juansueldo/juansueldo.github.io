type ToastType = 'loading' | 'success' | 'error';

function getToastColors(type: ToastType, dark: boolean) {
  const themes = {
    dark: {
      loading: { color: '#e5e7eb', border: '#374151', iconBg: '#374151' },
      success: { color: '#86efac', border: '#166534', iconBg: '#14532d' },
      error:   { color: '#fca5a5', border: '#991b1b', iconBg: '#7f1d1d' },
    },
    light: {
      loading: { color: '#374151', border: '#e5e7eb', iconBg: '#f3f4f6' },
      success: { color: '#166534', border: '#bbf7d0', iconBg: '#dcfce7' },
      error:   { color: '#991b1b', border: '#fecaca', iconBg: '#fee2e2' },
    },
  };
  return themes[dark ? 'dark' : 'light'][type];
}

export function showToast(type: ToastType) {
  const toast = document.getElementById('toast-msg') as HTMLDivElement | null;
  if (!toast) return;

  const dark = document.documentElement.classList.contains('dark');
  const c = getToastColors(type, dark);

  // Lee los textos desde el data attribute, sin diccionario en el cliente
  const text =
    type === 'loading' ? toast.dataset.sending :
    type === 'success' ? toast.dataset.success :
    toast.dataset.error;

  const icon =
    type === 'loading' ? '<div class="toast-spinner"></div>' :
    type === 'success' ? '✓' : '✕';

  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', right: '24px', zIndex: '9999',
    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
    borderRadius: '12px', border: `1px solid ${c.border}`, fontSize: '14px',
    background: dark ? '#1b1b1b' : '#ffffff', color: c.color,
    boxShadow: dark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.08)',
    animation: 'toast-in 0.3s ease', opacity: '1', transition: 'opacity 0.3s',
  });

  toast.innerHTML = `
    <div style="width:18px;height:18px;border-radius:50%;background:${c.iconBg};display:flex;align-items:center;justify-content:center;font-size:11px;color:${c.color};">
      ${icon}
    </div>
    <span>${text}</span>
  `;

  // @ts-ignore
  clearTimeout(window._toastTimeout);
  if (type !== 'loading') {
    // @ts-ignore
    window._toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
    }, 3500);
  }
}