import { uploadImage } from 'api/image'
import { BASE_URL } from 'constants/BASE_URL'

export const handleUploadImageAPI = async ({ files, inputFileElement }) => {
  if (files.length === 0) return
  else if (files.length > 3) return
  else {
    const resArray = []
    let size = 0

    for (let i = 0; i < files.length; i++) {
      size += files[i].size
      const formData = new FormData()
      formData.append('image', files[i])
      resArray.push(uploadImage(formData).then(res => BASE_URL + '/' + res.data.filename))
    }

    if (size >= 10000000) {
      alert('이미지 총 용량이 10MB가 넘습니다. ')
      inputFileElement.click()
    } else {
      const res = await Promise.all(resArray)
      return res.join(',')
    }
  }
}
