import "./style.scss";
import logo from "@/assets/images/LW_logo_w_light.png";

interface ModalProps {
    showModal: boolean;
    handler: (show: boolean) => void;
    header?: () => JSX.Element;
    footer?: () => JSX.Element;
    children: JSX.Element;
}

const Modal = (props: ModalProps) => {
  const { showModal, handler, header, footer, children } = props;

  return (
    <>
    <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex={-1}
        role="dialog"
    >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="col-4 text-center">{header && header()}</div>
              <div className="col-4 text-center">
                <img
                  src={logo}
                  alt="LWS Logo"
                  width="90"
                  className="mx-auto"
                ></img>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <button className="btn-close" onClick={() => handler(false)} />
              </div>
            </div>

            <div className="modal-body">{children}</div>

            {footer && <div className="modal-footer mx-auto">{footer()}</div>}
          </div>
        </div>
      </div>

      <div className={`modal-backdrop ${showModal ? "show" : ""}`} />
    </>
  );
};

export default Modal;