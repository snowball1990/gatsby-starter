const CSS_VAR_PREFIX = "gatsby"

const INIT_COLOR_MODE_PROP = "--initial-color-mode"

const LS_I18N_LNG_KEY = "gatsby-i18n-lng"

const LS_COLOR_MODE_KEY = "gatsby-color-mode"

const DEFAULT_LNG = "zh-hans"

const I18N_LANGUAGES = [
  {
    language: "English",
    code: "en",
  },
  {
    language: "中文 (简体)",
    code: "zh-hans",
  },
  {
    language: "中文 (繁體)",
    code: "zh-hant",
  },
  {
    language: "日本語",
    code: "ja",
  },
  {
    language: "한국어",
    code: "ko",
  },
]

const SPEC_LNGS_MAP = {
  'zh-cn':'zh-hans',
  'zh-tw':'zh-hant'
}
const SHORT_HAND_LNGS = ['en','ja','ko']


// 使用 CommonJS 兼容 gatsby-node
module.exports = {
  CSS_VAR_PREFIX,
  INIT_COLOR_MODE_PROP,
  LS_I18N_LNG_KEY,
  LS_COLOR_MODE_KEY,
  DEFAULT_LNG,
  I18N_LANGUAGES,
  SPEC_LNGS_MAP,
  SHORT_HAND_LNGS
}