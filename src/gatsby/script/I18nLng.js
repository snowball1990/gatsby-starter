import React from "react"
import Terser from "terser"

import { 
  DEFAULT_LNG,
  I18N_LANGUAGES,
  SPEC_LNGS_MAP,
  SHORT_HAND_LNGS,
  LS_I18N_LNG_KEY,
} from "@/utils/constants"

const setI18nByLng = () => {
  const defaultLng = '🎈';
  const i18nLanguages = '🌐';
  const i18nLngKey = '🔑';
  const specLngMap = '🍻'
  const shorthandLngs = '🙋‍♂️'

  function getBrowserLng() {
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
  
    if(Object.keys(specLngMap).includes(formatLng)){
      formatLng = specLngMap[formatLng]
    }
    // startsWith can cause some problem
    // example: ko and kok
    shorthandLngs.forEach(lang=>{
      if(formatLng.startsWith(`${lang}-`)){
        formatLng = lang
      }
    })
  
    return formatLng
  }
  
  const getBrowerLngPrefer = (options) => {
  
    // browser language can be en-US or en_US
    let browserLng = normalizeLng(getBrowserLng())
  
    const { languages, defaultLng } = options
  
    const lngMatch = languages.filter(lng=>(lng === browserLng))
    
    if(!lngMatch.length){
      browserLng = defaultLng
    }
  
    return browserLng
  }

  let root = document.documentElement
  const languages = i18nLanguages.map(lang=>(lang.code))
  const langQuery = window.location.pathname.split('/')[1]
  let lang = "en"
  if(languages.includes(langQuery)){
    const localLng = localStorage.getItem(i18nLngKey)
    if(localLng !== langQuery){
      localStorage.setItem(i18nLngKey,langQuery)
      // localStorage.removeItem(i18nLngKey)
    }
    lang = langQuery
  }else{
    lang = localStorage.getItem(i18nLngKey)
    if (!lang) {
      lang = getBrowerLngPrefer({
        languages,
        defaultLng,
      })
    }
  }
  root.setAttribute("lang",lang)
}

const MagicI18nScriptTag = () => {

  const boundFn = String(setI18nByLng)
    .replace("'🌐'", JSON.stringify(I18N_LANGUAGES))
    .replace("'🍻'", JSON.stringify(SPEC_LNGS_MAP))
    .replace("'🙋‍♂️'", JSON.stringify(SHORT_HAND_LNGS))
    .replace('🎈', DEFAULT_LNG)
    .replace('🔑', LS_I18N_LNG_KEY)

  let calledFunction = `(${boundFn})()`
    

  calledFunction = Terser.minify(calledFunction).code

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />
}

export default MagicI18nScriptTag