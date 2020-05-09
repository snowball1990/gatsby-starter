const path = require('path');
const fs = require("fs-extra");
const yaml = require("js-yaml")

const { I18N_LANGUAGES,DEFAULT_LNG } = require("../../utils/constants")

const PAGE_OPTIONS = {
  languages: I18N_LANGUAGES.map(lang=>(lang.code)),
  defaultLng: DEFAULT_LNG,
  redirect:true,
}

function flattenMessages(nestedMessages, prefix = "") {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key]
    let prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

function loadTranslationFromDir(languageCode) {
  const srcPath = path.join(__dirname, `../../i18n/locales/${languageCode}/`);
  const translationObjects = fs.readdirSync(srcPath).map(file => {
    let contents = ""
    const fileExtension = file.replace(/.+\./,"")
    if(fileExtension==="json"){
      contents = fs.readFileSync(path.join(srcPath, file), 'utf8')
      return JSON.parse(contents)
    }else if(fileExtension==="yaml" || fileExtension==="yml"){
      contents = yaml.load(fs.readFileSync(path.join(srcPath, file)), {encoding: "utf-8"})
      return contents
    }else{
      console.warn(`The file with ${fileExtension} extension is not supported!`)
      return contents
    }
  });
  return Object.assign({}, ...translationObjects)
}


module.exports = async ({ page, actions }) => {
  //Exit if the page has already been processed.
  if (typeof page.context.intl === "object") {
    return
  }
  const { createPage, deletePage } = actions
  const {
    languages,
    defaultLng,
    redirect,
  } = PAGE_OPTIONS

  const getMessages = (language) => {
    try {
      const messages = loadTranslationFromDir(language)
      return flattenMessages(messages)
    } catch (error) {
      throw error
    }
  }

  const generatePage = (routed, language) => {
    const messages = getMessages(language)
    const newPath = routed ? `/${language}${page.path}` : page.path
    return {
      ...page,
      path: newPath,
      context: {
        ...page.context,
        language,
        intl: {
          language,
          languages,
          messages,
          routed,
          originalPath: page.path,
          redirect,
          defaultLng,
        },
      },
    }
  }

  const newPage = generatePage(false, defaultLng)
  deletePage(page)
  createPage(newPage)

  languages.forEach(language => {
    const localePage = generatePage(true, language)
    const regexp = new RegExp("/404/?$")
    if (regexp.test(localePage.path)) {
      localePage.matchPath = `/${language}/*`
    }
    createPage(localePage)
  })
}