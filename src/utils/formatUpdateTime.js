export const formatUpdateTime = time => {
  const startTime = new Date(time)
  const endTime = new Date()
  const timeDiff = Math.abs(endTime - startTime)
  const timeAgo = Math.floor(timeDiff / 1000 / 60)

  if (timeAgo >= 60 * 24 * 365) {
    return '오래 전'
  }
  if (timeAgo >= 60 * 24 * 30) {
    return `${Math.floor(timeAgo / 30 / 24 / 60)}달 전`
  }
  if (timeAgo >= 60 * 24) {
    return `${Math.floor(timeAgo / 24 / 60)}일 전`
  }
  if (timeAgo >= 60) {
    return `${Math.floor(timeAgo / 60)}시간 전`
  }
  if (timeAgo > 0) {
    return `${timeAgo}분 전`
  }
  return '1분미만 전'
}
