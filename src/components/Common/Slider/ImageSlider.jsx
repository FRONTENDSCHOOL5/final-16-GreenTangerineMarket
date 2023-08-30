import Slider from 'react-slick'

import s from './ImageSlider.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomPrevArrow = ({ currentSlide, slideCount, ...props }) => (
  <button {...props} className={s.prev} type='button'></button>
)

const CustomNextArrow = ({ currentSlide, slideCount, ...props }) => (
  <button {...props} className={s.next} type='button'></button>
)

const ImageSlider = ({ children }) => {
  const settings = {
    dots: true,
    dotsClass: s.dots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  }

  return (
    <ul className={s.container}>
      <Slider className={s.sliderContainer} {...settings}>
        {children}
      </Slider>
    </ul>
  )
}

export default ImageSlider
