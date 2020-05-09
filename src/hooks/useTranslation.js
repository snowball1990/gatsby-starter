import { useIntl } from "react-intl"

export default function useTranslation() {
  const intl = useIntl()
  const t = (token) => intl.formatMessage({ id: token })
  return t
}
