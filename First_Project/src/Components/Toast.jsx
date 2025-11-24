// This component displays a temporary notification message (toast) on the screen.
// It appears at the top center of the viewport and automatically hides when there's no message to show.

export default function Toast({ message }) {
  // If there is no message, do not render anything (return null).
  // This prevents the toast from taking up space or being visible when not needed.
  if (!message) return null;

  return (
    <div
      style={{
        // Fixed positioning ensures the toast stays in place even when scrolling.
        position: "fixed",
        // Positioned slightly below the safe area inset top (for devices with notches) plus 8px margin.
        top: "calc(env(safe-area-inset-top, 1.0rem) + 8px)",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        // Opacity is 1 (fully visible) if message exists, otherwise 0 (invisible).
        opacity: message ? 1 : 0,
      }}
    >
      <div
        style={{
          background: "#D4AF37",
          color: "#0F1E13",
          borderRadius: 12,
          padding: "7px 4vw",
          fontWeight: 600,
          minWidth: 110,
          width: "auto",
          maxWidth: "min(98vw, 445px)",
          textAlign: "center",
         
        }}
      >
        {/* Display the message text passed as a prop */}
        {message}
      </div>
    </div>
  );
}
