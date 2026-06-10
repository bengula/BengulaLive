<?xml version="1.0" encoding="UTF-8"?>
<!--
  Branded, human-friendly rendering of sitemap.xml for browsers.
  Search engines ignore this entirely; it has no SEO effect.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Sitemap — Bengula Inc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          :root { color-scheme: light; }
          body {
            margin: 0;
            background: #F6F5FB;
            color: #334155;
            font: 15px/1.6 "Helvetica Neue", Inter, "Segoe UI", Helvetica, Arial, sans-serif;
          }
          .wrap { max-width: 880px; margin: 0 auto; padding: 48px 24px 64px; }
          .kicker {
            color: #5B21B6;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }
          h1 {
            margin: 6px 0 4px;
            color: #0F172A;
            font-family: Georgia, Charter, "Times New Roman", serif;
            font-size: 30px;
            line-height: 1.2;
          }
          .sub { margin: 0 0 28px; color: #64748B; font-size: 13px; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px -12px rgba(76, 29, 149, 0.25);
          }
          th {
            background: #2E1065;
            color: #FFFFFF;
            text-align: left;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 12px 16px;
          }
          td { padding: 10px 16px; border-top: 1px solid #E2E8F0; font-size: 14px; }
          tr:nth-child(even) td { background: #F5F3FF; }
          a { color: #5B21B6; text-decoration: none; }
          a:hover { color: #7C3AED; text-decoration: underline; }
          .mod { color: #64748B; white-space: nowrap; font-size: 12.5px; }
          .foot { margin-top: 22px; color: #64748B; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="kicker">Bengula Inc</div>
          <h1>XML Sitemap</h1>
          <p class="sub">
            <xsl:value-of select="count(s:urlset/s:url)"/> URLs — this page is a
            readable view of the machine sitemap that search engines crawl.
          </p>
          <table>
            <tr>
              <th>URL</th>
              <th>Last modified</th>
            </tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td>
                  <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                </td>
                <td class="mod"><xsl:value-of select="s:lastmod"/></td>
              </tr>
            </xsl:for-each>
          </table>
          <p class="foot">Generated automatically at build time — bengula.co.ke</p>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
