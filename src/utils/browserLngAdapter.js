import { SPEC_LNGS_MAP,SHORT_HAND_LNGS } from "@/utils/constants"

function getBrowserLng() {

  if (typeof window === "undefined") {
    return null
  }

  const lang =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.browserLanguage ||
    window.navigator.userLanguage ||
    window.navigator.systemLanguage 

  return lang
}

// https://www.w3.org/International/articles/bcp47/
// https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html
function normalizeLng(lng) {
  if(!lng){
    return null
  }

  let formatLng = lng.toLowerCase().replace(/_/, "-")

  if(Object.keys(SPEC_LNGS_MAP).includes(formatLng)){
    formatLng = SPEC_LNGS_MAP[formatLng]
  }
  // startsWith can cause some problem
  // example: ko and kok
  // 
  SHORT_HAND_LNGS.forEach(lang=>{
    if(formatLng.startsWith(`${lang}-`)){
      formatLng = lang
    }
  })

  return formatLng
}

export const getBrowerLngPrefer = (options) => {

  // browser language can be en-US or en_US
  let browserLng = normalizeLng(getBrowserLng())

  if (!options) {
    return browserLng
  }

  const { languages=[], defaultLng="" } = options

  if(!languages.length){
    console.warn('Please pass international language configuration to parameter languages!')
    return browserLng
  }

  if(!languages.includes(defaultLng)){
    console.warn('Parameter languages must includes default language!')
    return browserLng
  }

  const lngMatch = languages.filter(lng=>(lng === browserLng))
  
  if(!lngMatch.length){
    browserLng = defaultLng ? defaultLng : languages[0]
  }

  return browserLng
}