/**
 * Simple toast notification utility
 * Shows error and success messages to users
 */

export const showToast = (message, type = 'error') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ${type === 'error'
            ? 'bg-red-500/90 border border-red-400'
            : 'bg-green-500/90 border border-green-400'
        } backdrop-blur-sm`;

    toast.innerHTML = `
        <div class="flex items-center gap-3 text-white">
            <div class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-200' : 'bg-green-200'}"></div>
            <p class="font-medium">${message}</p>
        </div>
    `;

    // Add to DOM
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 5000);
};

export const showSuccessToast = (message) => showToast(message, 'success');
export const showErrorToast = (message) => showToast(message, 'error');
