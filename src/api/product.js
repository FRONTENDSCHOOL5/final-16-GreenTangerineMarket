import { instance } from 'api'

export const getProductListAPI = async () => {
  try {
    const res = await instance.get('/product')
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const getNextProductAPI = async num => {
  try {
    const res = await instance.get(`/product/?limit=20&skip=${num}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const getUserProductList = async ({ num, accountname }) => {
  try {
    const res = await instance.get(`/product/${accountname}/?limit=10&skip=${num}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const postProductAPI = async ({ link, itemName, price, itemImage }) => {
  try {
    const res = await instance.post('/product', {
      product: {
        itemName,
        price,
        link,
        itemImage,
      },
    })
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const getProductDetailAPI = async id => {
  try {
    const res = await instance.get(`/product/detail/${id}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const deleteProductAPI = async id => {
  try {
    const res = await instance.delete(`/product/${id}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const editProductAPI = async ({ product_id, image, itemName, price }) => {
  try {
    const res = await instance.put(`/product/${product_id}`, {
      product: {
        itemImage: image,
        itemName,
        price,
      },
    })
    console.log(res)
    return res
  } catch (err) {
    console.error(err)
    return err
  }
}
