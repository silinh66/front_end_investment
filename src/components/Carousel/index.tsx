import React from 'react';
import { StyledCarouselPost } from './styled';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export const CarouselPost = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);

  return (
    <StyledCarouselPost screen_mode={screenMode}>
      {/* <div className="box-carousel"> */}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 8,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 2,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 5,
            partialVisibilityGutter: 30,
          },
        }}
        rewind
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-caroulsel">
          <div className="title">
            <div className="text-title">VN_INDEX</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="19"
              viewBox="0 0 50 19"
              fill="none"
            >
              <path
                d="M2 18L8.75 2L16.75 5.02703L21.75 2L27.75 5.02703L32.75 3.2973L37.75 5.02703L42.75 2L48.5479 4.81081"
                stroke="#E43637"
                stroke-width="2.28"
              />
            </svg>
          </div>
          <div className="body">
            <div className="body-first">
              <div className="item-first">1,239</div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
              <div
                style={{
                  color: '#42A732',
                }}
                className="item-first"
              >
                +1,239
              </div>
            </div>
            <div className="body-second">
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
              <div className="item-second">
                <div className="item">12387.90</div>
                <div className="item-value">CP</div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      {/* </div> */}
    </StyledCarouselPost>
  );
};
