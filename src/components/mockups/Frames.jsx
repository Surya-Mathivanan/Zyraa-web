import "./mockups.css";

/** A phone shell. Children are the screen; the status bar is drawn here. */
export function PhoneFrame({ children, className = "", time = "9:41" }) {
  return (
    <div className={`phone ${className}`} aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-status">
          <span>{time}</span>
          <span className="phone-notch" />
          <span className="phone-icons">
            <i />
            <i />
            <i />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** A browser window with traffic lights and an address bar. */
export function BrowserFrame({ children, url = "app.zyraa", className = "" }) {
  return (
    <div className={`browser ${className}`} aria-hidden="true">
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{url}</span>
      </div>
      <div className="browser-body">{children}</div>
    </div>
  );
}
