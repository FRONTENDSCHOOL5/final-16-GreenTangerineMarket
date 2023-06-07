import { LargeButton, LargeButtonDisabled } from 'components/Common/Button/Large/LargeButton'
import { MsmallButton, MsmallButtonDisabled, MsmallWhiteButton } from 'components/Common/Button/Msmall/MsmallButton'
import {
  MediumButton,
  MediumButtonDisabled,
  MediumDarkButton,
  MediumWhiteButton,
} from 'components/Common/Button/Medium/MediumButton'
import { SmallButton, SmallButtonDisabled, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'

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
      <MsmallButtonDisabled />
      <MsmallWhiteButton />
      <SmallButton />
      <SmallButtonDisabled />
      <SmallWhiteButton />
    </div>
  )
}

export default FeedList
