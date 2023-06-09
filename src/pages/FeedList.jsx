import { LargeButton, LargeButtonDisabled } from 'components/Common/Button/Large/LargeButton'
import { MsmallButton, MsmallWhiteButton, MsmallWhiteButtonHover } from 'components/Common/Button/Msmall/MsmallButton'
import {
  MediumButton,
  MediumButtonDisabled,
  MediumDarkButton,
  MediumWhiteButton,
} from 'components/Common/Button/Medium/MediumButton'
import { SmallButton, SmallWhiteButton, SmallWhiteButtonHover } from 'components/Common/Button/Small/SmallButton'

const FeedList = () => {
  return (
    <div>
      <LargeButton />
      <LargeButtonDisabled />
      <MediumButton />
      <MediumButtonDisabled />
      <MediumDarkButton />
      <MediumWhiteButton />
      <MsmallButton />
      <MsmallWhiteButton />
      <MsmallWhiteButtonHover />
      <SmallButton />
      <SmallWhiteButton />
      <SmallWhiteButtonHover />
    </div>
  )
}

export default FeedList
