
export default function useFetchProduct() {
  const request = async ()=>{
    const response = await fetch('https://66ff92f44da5bd23755114cb.mockapi.io/products')
    const data = await response.json()
    return {
        data: data,
        total: data.length

    }

  }


  return {request}
}
