import Script from "next/script"

const Analytics = () => {
  return (
   <>
    <Script async src = "https://www.googletagmanager.com/gtag/js?id=G-24KK7XVXPY" />
    <Script id = "google-analytics" strategy="afterInteractive">
        {
        `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-24KK7XVXPY');
        `
        }
    </Script>
   </>
  )
}

export default Analytics
