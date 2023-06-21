import { uploadImage } from 'api/image'
import { PROFILE_IMAGE_ONLY_UPLOAD_IMAGE } from 'constants/SIGN_ERROR'

export const handleUploadImageAPI = async ({ images, setImageFile }) => {
  const formData = new FormData()
  // 이미지가 1개일 때 ( 프로필, 상품 )
  if (images.length === 1) {
    formData.append('image', images[0])
    const res = await uploadImage(formData)

    if (res.data.message === PROFILE_IMAGE_ONLY_UPLOAD_IMAGE) alert(PROFILE_IMAGE_ONLY_UPLOAD_IMAGE)
    else setImageFile(`https://api.mandarin.weniv.co.kr/${res.data.filename}`)
  }
  // 이미지가 2개 이상일 때
  else {
    images.forEach(image => formData.append('image', image))
    // 2개 이상일 때 API 코드 작성해주시면됩니다.
  }
}
