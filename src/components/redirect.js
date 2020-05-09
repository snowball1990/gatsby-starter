import React from "react"
import useTranslation from "@/hooks/useTranslation"
import SEO from "@/components/seo"

const Redirect = () => {
  const t = useTranslation()
  return <SEO title={t('seo.title')}  description={t('seo.description')} />
}

export default Redirect
