import toast from 'react-hot-toast';

// Single entry point for popups. Components call notify.*, they never
// know which library (or style) actually renders the message.
export const notify = {
  success: (message) => toast.success(message),
  info: (message) => toast(message, { icon: '💔' }),
  error: (message) => toast.error(message)
};
