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

const CommonModal = ({ visible, hasCancel, onClose, onCancel, onOk }: ModalProps) => {
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
    <div className={`app-modal-popup ${visible ? 'on' : 'off'}`} onClick={close}>
      <div className="app-modal-container">
        <div className="app-modal-inner">
          <div className="app-modal-content " onClick={(e) => e.stopPropagation()}>
            <header className="popup-header">
              <h2 className="title">
                <img src={require('./../asset/img/img-logo-popup.png')} alt="반려의고수" className="logo" />
                앱설치하고 다양한 혜택을 받아보세요.
              </h2>
              <div className="btn-group">
                <Button className="btn-closed" type="button" onClick={cancel}>
                  <span className="icon-closed">
                    <span className="blind">닫기</span>
                  </span>
                </Button>
              </div>
            </header>
            <div className="popup-body">
              <form className="app-form" action="" method="post">
                <fieldset>
                  <legend className="title">앱 설치주소를 문자로 받기</legend>
                  <div className="input-group">
                    <div className="input-flex">
                      <input
                        type="phone"
                        placeholder="휴대폰번호를 입력해주세요. &#40;-제외 &#41;"
                        className="form-control"
                      />
                      <button className="btn-defualt">보내기</button>
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-flex">
                      <input type="phone" placeholder="인증번호 6자리 입력" disabled className="form-control" />
                      <button className="btn-defualt" disabled>
                        확인
                      </button>
                    </div>
                    <p className="guide-text">
                      인증번호가 발송되었습니다.
                      <span className="color-primary">
                        &#40; 남은 시간 <time dateTime="03:00TZD|PTDHMS">03:00</time> &#41;
                      </span>
                    </p>
                  </div>
                  <div className="check-group">
                    <label className="check-box">
                      <input type="checkbox" className="check" />
                      <i>개인정보 수집/이용에 동의합니다.</i>
                    </label>
                  </div>
                </fieldset>
              </form>
              <figure className="terms-table">
                <figcaption className="blind">개인정보 수집/이용</figcaption>
                <table className="table">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="table-head">
                    <tr>
                      <th scope="col">항목</th>
                      <th scope="col">수집목적</th>
                      <th scope="col">보유기간</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <tr>
                      <td> 휴대전화번호</td>
                      <td> SMS발송 및 부정이용방지</td>
                      <td> 목적달성 1일 후 파기</td>
                    </tr>
                  </tbody>
                </table>
              </figure>
              <div className="info-list-gorup">
                <ul className="list">
                  <li>이용자 본인 확인을 목적으로 인증번호 확인 절차가 필요합니다.</li>
                  <li>인증번호 및 앱 설치주소 전송 비용은 무료입니다.</li>
                  <li>한 개의 휴대폰 번호로 하루 최대 3번까지 전송이 가능합니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
