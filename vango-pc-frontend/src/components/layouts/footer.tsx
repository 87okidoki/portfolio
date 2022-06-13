import React from 'react';

function CommonFooter(): React.ReactElement {
  return (
    <>
      <footer className="inner">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={require('../../asset/img/img-logo-footer.png')} alt="반려의고수" />
          </div>
          <div className="footer-info-area">
            <dl className="company-info-list">
              <dt className="company-name">㈜바우라움</dt>
              <dd>사업자등록번호 : 850-88-02022</dd>
              <dd>주소 : 서울시 광진구 아차산로 378, 3층 395호</dd>
              <dd>
                고객센터 : <a href="mailto:vango.cs@bowraum.com">vango.cs@bowraum.com</a>
              </dd>
              <dd>
                입점/제휴문의 : <a href="mailto:vango.partner@bowraum.com">vango.partner@bowraum.com</a>
              </dd>
            </dl>
          </div>
        </div>
      </footer>
    </>
  );
}
export default CommonFooter;
