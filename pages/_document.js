import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <Script
            // Restrict access on this API key
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8eCp01879hP7I3L54u-VZz8iH8bPQwtE&libraries=places"
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
