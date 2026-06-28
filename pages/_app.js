import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'
import { Layout } from '../components'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
