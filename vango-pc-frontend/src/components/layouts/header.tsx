import React from 'react';

function CommonHeader(): React.ReactElement {
  return (
    <>
      <header className="header-section">
        <div className="header-inner">
          <div className="header-left">
            <h1>
              <a href="#" target="_blank">
                <span className="logo">
                  <span className="blind">반려의고수</span>
                </span>
              </a>
            </h1>
          </div>
          <div className="header-right">
            <div className="menu-group">
              <a href="#" target="_blank">
                <span className="btn-common btn-apple">
                  <span className="blind">애플스토어</span>
                </span>
              </a>
              <a href="#" target="_blank">
                <span className="btn-common btn-google">
                  <span className="blind">구글스토어</span>
                </span>
              </a>
              <a href="https://www.instagram.com/vango__official/" target="_blank">
                <span className="btn-common btn-insta">
                  <span className="blind">인스타그램</span>
                </span>
              </a>
              <a
                href=" https://www.facebook.com/%EB%B0%98%EB%A0%A4%EC%9D%98%EA%B3%A0%EC%88%98-100815432513220"
                target="_blank"
              >
                <span className="btn-common btn-facebook">
                  <span className="blind">페이스북</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default CommonHeader;
