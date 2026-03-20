'use client'

/**
 * Monkey-patches Node.prototype.removeChild to silently handle
 * the case where the child isn't actually a child of the parent.
 * This is caused by React Three Fiber creating DOM nodes that
 * React can't track during unmount. Standard fix for R3F + Next.js.
 */
export default function ErrorSuppressor() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
(function() {
    var orig = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
        if (child && child.parentNode !== this) {
            return child;
        }
        return orig.apply(this, arguments);
    };
    var origInsert = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, refNode) {
        if (refNode && refNode.parentNode !== this) {
            return newNode;
        }
        return origInsert.apply(this, arguments);
    };
})();
                `,
            }}
        />
    )
}
