export const getCookie = (key: string) => {
  const nameEQ = key + "="
  const arrCookies = document.cookie.split(";")
  for (let i = 0; i < arrCookies.length; i++) {
    const cookie = arrCookies[i].trim()

    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }
  return null
}

export const setCookie = (key: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/;secure`
}

export const deleteCookie = (key: string) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
}

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf("=")
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  }
}

export const checkCookie = (name: string) => {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return true
  }
  return false
}
