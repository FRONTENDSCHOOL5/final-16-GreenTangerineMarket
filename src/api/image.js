import { instance } from 'api'

export const uploadImage = async formData => {
  try {
    const res = await instance.post('/image/uploadfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res
  } catch (err) {
    return err
  }
}

export const uploadImages = async formData => {
  try {
    const res = await instance.post('/image/uploadfiles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res
  } catch (err) {
    return err
  }
}