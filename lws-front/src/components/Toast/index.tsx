import { useEffect, /* useState */ } from "react";
import { ToastProps } from "../../types";

const Toast: React.FC<ToastProps> = ({ show, toggle, children }) => { 
  /* const [visible, setVisible] = useState(show); */

  useEffect(() => {
    /* setVisible(show); */

    if (show) {
      const timer = setTimeout(() => {
        toggle(false);
        /* setVisible(false); */
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, toggle]);

  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className={`shadow toast ${show && "show"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header bg-secondary">
            <div className="me-auto">LWSolution</div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => toggle(false)}
            />
          </div>
          <div className="toast-body fw-bold">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Toast;
