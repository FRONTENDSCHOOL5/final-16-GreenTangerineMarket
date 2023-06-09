import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = 'https://api.mandarin.weniv.co.kr'
const useAxios = params => {
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async params => {
    try {
      const res = await axios(params)
      setResponse(res.data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(params)
  }, [])
  return { response, error, loading }
}
export default useAxios
