import Script from "next/script";
import type { ClientRecord } from "@shared/index";

/**
 * Injects marketing tags into the document based on the client's stored IDs.
 * Only tags with a configured ID are emitted. Sales set these in the dashboard;
 * LPs never hardcode them (docs/lp-platform-spec.md §6).
 */
export default function TagInjector({ client }: { client: ClientRecord }) {
  const { meta_pixel_id, ga4_id, gtm_id, line_tag_id } = client;
  return (
    <>
      {meta_pixel_id && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${meta_pixel_id}');
fbq('track', 'PageView');`}
        </Script>
      )}

      {ga4_id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4_id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4_id}');`}
          </Script>
        </>
      )}

      {gtm_id && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm_id}');`}
        </Script>
      )}

      {line_tag_id && (
        <Script id="line-tag" strategy="afterInteractive">
          {`(function(g,d,o){g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};
var s=d.createElement('script');s.async=1;
s.src='https://d.line-scdn.net/n/line_tag/public/release/v1/lt.js';
var t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);
g._lt('init',{customerType:'lap',tagId:o});g._lt('send','pv',['${line_tag_id}']);
})(window,document,'${line_tag_id}');`}
        </Script>
      )}
    </>
  );
}
