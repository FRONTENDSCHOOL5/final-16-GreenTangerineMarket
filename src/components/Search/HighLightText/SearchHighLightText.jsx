import s from './SearchHighLightText.module.scss'

const SearchHighLightText = ({ text, keyword }) => {
  const partText = text.split(keyword)
  return (
    <>
      {partText.map((part, index) => {
        if (index > 0)
          return (
            <>
              <span key={index + part.toString()} className={s.highlight}>
                {keyword}
              </span>
              {part}
            </>
          )
        return part
      })}
    </>
  )
}

export default SearchHighLightText
