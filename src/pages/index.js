import React from "react"

import { Link } from "@/i18n"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import useTranslation from "@/hooks/useTranslation"

const IndexPage = () => {
  const t = useTranslation()
  return (
    <Layout>
      <SEO 
        title={`home: ${t('seo.title')}`} 
        description={`home: ${t('seo.description')}`}
        keywords={[`gatsby`, `react`,`javascript`]}
      />
      <h1>{t('homePage.greetings')}</h1>
      <p>{t('homePage.welcome')}</p>
      <p>{t('homePage.des')}</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">{t('homePage.redirect')}</Link>
    </Layout>
  )
}

export default IndexPage
