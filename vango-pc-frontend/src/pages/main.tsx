import React, { useCallback, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';
import { CommonHeader, CommonFooter } from '@/components/layouts';
import AppModal from '@/components/appModal';
import CommonModal from '@/components/modal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// enum ErrorCodes {
//   Success = 0,
//   CertificationFail = 1500, // 인증번호 실패 (백엔드 에러)
//   CheckCertificationFail = 1501, // 인증번호 확인 실패 (백엔드 에러)
//   Expired = 1504, // 인증번호 시간초과
//   UnknownCode = 1505, // 인증번호를 찾을 수 없음 (내가 받은 번호랑 일치하지 않을 때)
//   ReservationFail = 1506, // 사전예약 실패 (백엔드 에러)
//   AlreadyReservation = 1507, // 이미 사전예약을 진행한 경우
//   Deadline = 1508, // 사전예약이 만 건이 넘어간 경우
//   NoCertification = 1509, // 인가되지 않은 사용자인 경우 (인증을 받지 않은 사용자인 경우)
//   RandomFail = 1510, // 랜덤 휴대폰번호 조회 실패 (당첨자 5명 뽑는 api에서만 나는 에러) (백엔드 에러)
//   WrongMobileNo = 1511, // 올바르지 않은 핸드폰 번호
// }

const MainPage = () => {
  const marqueeRef = useRef<HTMLDivElement>();

  const stopAnimation = () => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const animation = marquee.getAnimations()?.[0];
      if (animation?.playState === 'running') {
        const rect = marquee.getClientRects()[0];
        const itemWidth = rect.width / marquee.children.length;
        marquee.style.left = `-${itemWidth}px`;
        animation.cancel();
      }
    }
  };
  const playAnimation = useCallback(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const rect = marquee.getClientRects()[0];
      const itemWidth = rect.width / marquee.children.length;
      marquee.style.left = '0';
      const keyFrame = [{ transform: 'translateX(0)' }, { transform: `translateX(-${itemWidth}px)` }];
      const options: KeyframeAnimationOptions = {
        duration: itemWidth * 10,
        easing: 'linear',
        delay: 0,
        direction: 'normal',
      };
      marquee.animate(keyFrame, options).play();

      const animation = marquee.getAnimations()?.[0];
      if (animation) {
        animation.finished.then(({ playState }) => {
          if (playState === 'finished') {
            options.iterations = Infinity;
            keyFrame.splice(0, 1);
            keyFrame.push({ transform: `translateX(-${itemWidth * 2}px)` });
            marquee.animate(keyFrame, options).play();
          }
        });
      }
    }
  }, [marqueeRef]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      // const child = marquee.children[0];
      // const img = child.firstChild as HTMLImageElement;
      const img = marquee.children[0] as HTMLImageElement;
      img.addEventListener('load', playAnimation);
      return () => img && img.removeEventListener('load', playAnimation);
    }
  }, [marqueeRef, playAnimation]);

  return (
    <>
      <CommonHeader />
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        speed={600}
        mousewheel
        pagination={false}
        modules={[Mousewheel, Pagination]}
        onSlideChangeTransitionStart={(swiper) => swiper.activeIndex === 0 && playAnimation()}
        onSlideChangeTransitionEnd={(swiper) => swiper.activeIndex !== 0 && stopAnimation()}
        className="class-name"
      >
        <SwiperSlide className="main-content-section">
          <section className="common-content">
            <div className="content-area inner">
              <div className="common-title-box">
                <h2 className="title">
                  <span className="point-font">반려가족을 위한</span>
                  <br /> 다양한 <br /> 놀거리, 먹거리, 볼거리
                </h2>
                <p className="sub-text">반려의고수 하나로 시작하세요.</p>
              </div>
              <div className="visual-box">
                <img src={require('./../asset/img/img-main-visual-01.png')} alt="이미지1" />
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="sub-content-section bg-gray">
          <section className="common-content">
            <div className="content-area inner">
              <div className="common-title-box">
                <h2 className="title">
                  <span className="point-font"> 우리 댕댕이에게</span>
                  <br /> 필요한 정보
                  <br /> 이젠 힘들게 찾지 않아도
                </h2>
                <p className="sub-text">반려의고수에서 상황별 맞춤 추천을 해드려요.</p>
              </div>
              <div className="visual-box">
                <div className="slide">
                  <ul className="slide-list">
                    <li>
                      <img src={require('./../asset/img/img-main-visual-02-01.png')} alt="반려의고수 건강" />
                    </li>
                    <li>
                      <img src={require('./../asset/img/img-main-visual-02-02.png')} alt="반려의고수 반려의생활" />
                    </li>
                    <li>
                      <img src={require('./../asset/img/img-main-visual-02-03.png')} alt="반려의고수 플레이스" />
                    </li>
                  </ul>
                </div>
                <img src={require('./../asset/img/img-main-visual-02.png')} alt="반려의고수 맞춤추천" />
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="sub-content-section">
          <section className=" common-content">
            <div className="content-area inner">
              <div className="common-title-box">
                <h2 className="title">
                  <span className="point-font"> 반려가족에게</span>
                  <br /> 필요한 정보들을 한눈에
                </h2>
                <p className="sub-text">내가 필요한 정보를 쉽고 빠르게 찾아드려요.</p>
              </div>
              <div className="visual-box">
                <img src={require('./../asset/img/img-main-visual-03.png')} alt="반려의고수 검색화면" />
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="slide-content-section bg-gray">
          <section className=" common-content">
            <div className="inner">
              <h2 className="title">
                반려의고수에서 <br /> 제공하는 카테고리
              </h2>
              <div className="slider-list-area">
                <div ref={marqueeRef} className="slider-list">
                  {[...new Array(3)].map((_, index) => (
                    <ul className="slider-items">
                      <li key={index}>
                        <div className="content-item">
                          <img src={require('./../asset/img/icon-cate-beauty.png')} alt="카테고리 미용" />
                          <h3 className="name">미용</h3>
                          <p className="info-text">
                            가위컷, 클리핑, 스포팅
                            <br />
                            메뉴 별 예약 기능 제공
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="content-item">
                          <img src={require('./../asset/img/icon-cate-cafe.png')} alt="카테고리 카페" />
                          <h3 className="name">카페</h3>
                          <p className="info-text">
                            운동장, 놀이터, 카페 등등의 <br />
                            애견 전용 카페
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="content-item">
                          <img src={require('./../asset/img/icon-cate-ball.png')} alt="카테고리 유치원" />
                          <h3 className="name">유치원</h3>
                          <p className="info-text">
                            유치원 이용권, 다양한 티켓
                            <br />
                            형식의 구매권 제공
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="content-item">
                          <img src={require('./../asset/img/icon-cate-ticket.png')} alt="카테고리 티켓" />
                          <h3 className="name">티켓</h3>
                          <p className="info-text">
                            버스투어, 렌터카, 투어티켓, <br /> 액티비티 구매권 제공
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="content-item">
                          <img src={require('./../asset/img/icon-cate-trip.png')} alt="카테고리 여행" />
                          <h3 className="name">여행</h3>
                          <p className="info-text">
                            지역별 여행 패키지, 숙박 <br />
                            예약 기능 제공
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="content-item">
                          <img src={require('./../asset/img/icon-cate-play.png')} alt="카테고리 플레이" />
                          <h3 className="name">플레이</h3>
                          <p className="info-text">
                            스튜디오, 클래스, 수영장 등 <br />
                            예약 기능 제공
                          </p>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="last-content-section">
          <section className="common-content">
            <div className="inner">
              <div className="title-box">
                <h2 className="title">
                  Different
                  <br /> And
                  <br /> Better
                </h2>
                <p className="sub-text">
                  ㈜ 바우라움은 좋은 콘텐츠와 서비스를 기반으로 <br />
                  모든 반려견과 반려견주가 더 나은 삶을 살아갈 수 있도록
                  <br />
                  도와주는 서비스를 지향합니다.
                </p>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide className="footer-section">
          <CommonFooter />
        </SwiperSlide>
      </Swiper>
      <CommonModal visible={false} />
      <AppModal visible={false} />
      <div className="btn-floating">
        <button type="button">
          <img src={require('./../asset/img/btn-floating.png')} alt="신규가입 5만원 쿠폰팩 반려의고수앱 다운로드" />
        </button>
      </div>
    </>
  );
};

export default MainPage;
