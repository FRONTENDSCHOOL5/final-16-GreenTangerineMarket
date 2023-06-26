import basicProfileImg from 'assets/img/basic-profile-img.svg'

export const handleSetImage = ({ e, setImages, type }) => {
  // 취소 시
  if (e.target.files.length === 0) {
    if (type === 'profile') return setImages(basicProfileImg)
    else return setImages([])
  }
  // 이미지가 3개 초과 시
  else if (e.target.files.length > 3) return alert('이미지는 3개까지만 등록 가능합니다.')

  // 이미지가 1개
  if (e.target.files.length === 1) setImages(URL.createObjectURL(e.target.files[0]))
  // 이미지가 2-3개
  else {
    const temp = []
    Array(...e.target.files).forEach(image => temp.push(URL.createObjectURL(image)))
    setImages(temp)
  }
}
