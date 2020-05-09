import React from "react"
import { Link } from "@/i18n"

import Layout from "../components/layout"
import SEO from "../components/seo"

import useTranslation from '@/hooks/useTranslation'

const SecondPage = () => {
  const t = useTranslation()
  return (
    <Layout>
      <SEO 
        title={`secondPage: ${t('seo.title')}`} 
        description={`secondPage: ${t('seo.description')}`} 
      />
      <h1>{t('secondPage.greetings')}</h1>
      <p>{t('secondPage.welcome')}</p>
      <Link to="/">{t('secondPage.redirect')}</Link>
    </Layout>
  )
}

export default SecondPage
