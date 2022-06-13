import React, { useEffect } from 'react';
import Button from './button';

export interface ModalProps {
  visible: boolean;
  size?: 'small' | 'default';
  hasCancel?: boolean;
  cancelText?: string | null;
  okText?: string | null;
  children?: React.ReactNode;
  onClose?(...props: any): any;
  onCancel?(...props: any): any;
  onOk?(...props: any): any;
}

const CommonModal = ({ visible, hasCancel, cancelText, okText, children, onClose, onCancel, onOk }: ModalProps) => {
  const close = () => {
    document.body.classList.remove('no-scroll');
    onClose?.();
  };
  const cancel = () => {
    onCancel?.();
    close();
  };
  const ok = () => {
    onOk?.();
    close();
  };
  useEffect(() => {
    if (visible) {
      document.body.classList.add('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [visible]);
  return (
    <div className={`modal-popup ${visible ? 'on' : 'off'}`} onClick={close}>
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <header className="popup-header">
            <h2 className="title">인증완료!</h2>
          </header>
          <div className="popup-body">
            <div className="info-text">인증받으신 휴대폰번호로 앱 다운로드 주소를 보내드렸어요.</div>
          </div>
          <div className="btn-group">
            {hasCancel && (
              <Button className="btn cancel" onClick={cancel}>
                {cancelText || '닫기'}
              </Button>
            )}
            <Button className="btn btn-primary" type="button" onClick={ok}>
              {okText || '확인'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
