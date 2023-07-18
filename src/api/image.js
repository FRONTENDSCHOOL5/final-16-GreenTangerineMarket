import { imageInstance } from 'api'

export const uploadImage = async formData => {
  try {
    const res = await imageInstance.post('/image/uploadfile', formData)
    return res
  } catch (err) {
    return err
  }
}
