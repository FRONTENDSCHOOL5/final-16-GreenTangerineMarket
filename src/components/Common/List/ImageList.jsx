import s from './ImageList.module.scss'

const ImageList = ({ src, alt }) => {
  return (
    <li className={s.list}>
      <img className={s.img} src={src} alt={alt} />
    </li>
  )
}

export default ImageList
