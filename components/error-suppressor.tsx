'use client'

/**
 * Injects an inline script into <head> that suppresses R3F removeChild errors
 * BEFORE React or Next.js error overlay can catch them.
 */
export default function ErrorSuppressor() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('error', function(e) {
                        if (e.message && (e.message.indexOf('removeChild') !== -1 || e.message.indexOf('NotFoundError') !== -1 || e.message.indexOf('insertBefore') !== -1)) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            return false;
                        }
                    }, true);
                    window.addEventListener('unhandledrejection', function(e) {
                        var msg = (e.reason && e.reason.message) || String(e.reason || '');
                        if (msg.indexOf('removeChild') !== -1 || msg.indexOf('NotFoundError') !== -1 || msg.indexOf('Context Lost') !== -1) {
                            e.preventDefault();
                        }
                    }, true);
                `,
            }}
        />
    )
}
