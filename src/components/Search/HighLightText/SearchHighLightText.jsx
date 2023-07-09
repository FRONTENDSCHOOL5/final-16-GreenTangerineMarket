import s from './SearchHighLightText.module.scss'

const SearchHighLightText = ({ text, keyword }) => {
  const partText = text.split(keyword)
  return (
    <>
      {partText.map((part, index) => {
        if (index > 0)
          return (
            <>
              <strong key={index + part.toString()} className={s.highlight}>
                {keyword}
              </strong>
              {part}
            </>
          )
        return part
      })}
    </>
  )
}

export default SearchHighLightText
