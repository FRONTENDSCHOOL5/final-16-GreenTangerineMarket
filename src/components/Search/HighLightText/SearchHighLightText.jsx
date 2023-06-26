import s from './SearchHighLightText.module.scss'

const SearchHighLightText = ({ text, keyword, className }) => {
  const partText = text.split(keyword)
  return (
    <p className={className}>
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
    </p>
  )
}

export default SearchHighLightText
