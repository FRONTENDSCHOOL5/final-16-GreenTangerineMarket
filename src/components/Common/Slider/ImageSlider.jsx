import Slider from 'react-slick'

import s from './ImageSlider.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ImageSlider = ({ imageType, children }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
  }

  return (
    <ul className={s.container}>
      <h2 className='a11y-hidden'>{`${imageType}이미지 슬라이더`}</h2>
      <Slider className={s.sliderContainer} {...settings}>
        {children}
      </Slider>
    </ul>
  )
}

export default ImageSlider
