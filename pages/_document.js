import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MainDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />

          <title>WebRTC Roulette</title>

          <meta name='description' content='Random one2one video calls' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#222' />
          {/* <link rel='manifest' href='manifest.json' /> */}
          {/* <link rel='shortcut icon' type='image/png' href='/static/img/favicon.png' /> */}

          <link rel='stylesheet' href='/static/css/font-awesome/css/font-awesome.css' />
          {/* <link rel='stylesheet' href='/static/css/bulma.css' />
          <link rel='stylesheet' href='/static/css/nprogress.css' />
          <link rel='stylesheet' href='/static/css/flatpickr.min.css' /> */}
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
