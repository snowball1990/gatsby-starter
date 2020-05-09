import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import useTranslation from "@/hooks/useTranslation"

const NotFoundPage = () => {
  const t = useTranslation()
  return (
    <Layout>
      <SEO 
        title={`404: ${t('seo.title')}`}
        description={`404: ${t('seo.description')}`} 
      />
      <h1>{t("notFoundPage.heading")}</h1>
      <p>{t("notFoundPage.des")}</p>
    </Layout>
  )
}

export default NotFoundPage
