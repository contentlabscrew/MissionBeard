import { Block, BlockType, HeaderProps, HeroProps, ProductProps, ProductGridProps, TextProps, CTAButtonProps, DividerProps, ImageProps, DiscountProps, FooterProps } from "@/types";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHeader(p: HeaderProps): string {
  const links = p.links
    .map(
      (link, i) =>
        `<a href="${escapeHtml(link.url)}" style="color:#CCCCCC;text-decoration:none;font-size:13px;font-family:Arial,Helvetica,sans-serif;${i > 0 ? "margin-left:16px;" : ""}">${escapeHtml(link.text)}</a>`
    )
    .join("");

  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${p.backgroundColor}">
  <tr>
    <td style="padding:16px 24px">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="left" style="vertical-align:middle">
            <img src="${escapeHtml(p.logoUrl)}" alt="${escapeHtml(p.logoAlt)}" height="40" style="display:block;height:40px;width:auto" />
          </td>
          <td align="right" style="vertical-align:middle">${links}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderHero(p: HeroProps): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${p.backgroundColor}">
  <tr><td><img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.imageAlt)}" width="600" style="display:block;width:100%;height:auto" /></td></tr>
  <tr>
    <td style="padding:32px 24px;text-align:center">
      <h1 style="font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:bold;color:${p.textColor};margin:0 0 12px 0;line-height:1.3">${escapeHtml(p.headline)}</h1>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:${p.textColor};opacity:0.85;margin:0 0 24px 0;line-height:1.5">${escapeHtml(p.subheadline)}</p>
      <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
        <tr>
          <td style="background-color:#E98517;border-radius:6px;text-align:center">
            <a href="${escapeHtml(p.ctaUrl)}" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#FFFFFF;text-decoration:none">${escapeHtml(p.ctaText)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderProduct(p: ProductProps): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#FFFFFF">
  <tr>
    <td style="padding:24px">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="200" style="vertical-align:top">
            <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.imageAlt)}" width="180" style="display:block;width:180px;height:180px;object-fit:cover;border-radius:8px" />
          </td>
          <td style="vertical-align:top;padding-left:20px">
            <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#01070E;margin:0 0 8px 0">${escapeHtml(p.name)}</h2>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666666;margin:0 0 12px 0;line-height:1.5">${escapeHtml(p.description)}</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#01070E;margin:0 0 16px 0">${escapeHtml(p.price)}</p>
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background-color:#E98517;border-radius:6px">
                  <a href="${escapeHtml(p.ctaUrl)}" style="display:inline-block;padding:10px 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#FFFFFF;text-decoration:none">${escapeHtml(p.ctaText)}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderProductGrid(p: ProductGridProps): string {
  const products = p.products.slice(0, 4);
  const width = Math.floor(100 / products.length);
  const productCells = products
    .map(
      (prod) => `<td width="${width}%" style="vertical-align:top;text-align:center;padding:0 8px">
        <a href="${escapeHtml(prod.ctaUrl)}" style="text-decoration:none">
          <img src="${escapeHtml(prod.imageUrl)}" alt="${escapeHtml(prod.imageAlt)}" width="240" style="display:block;width:100%;height:auto;border-radius:8px;margin-bottom:12px" />
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#01070E;margin:0 0 4px 0">${escapeHtml(prod.name)}</p>
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666666;margin:0 0 12px 0">${escapeHtml(prod.price)}</p>
          <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
            <tr><td style="background-color:#E98517;border-radius:6px"><span style="display:inline-block;padding:8px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#FFFFFF">${escapeHtml(p.ctaText)}</span></td></tr>
          </table>
        </a>
      </td>`
    )
    .join("\n");

  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${p.backgroundColor}">
  <tr>
    <td style="padding:24px">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>${productCells}</tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderText(p: TextProps): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${p.backgroundColor}">
  <tr>
    <td style="padding:16px 24px">
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:${p.fontSize}px;color:${p.color};text-align:${p.textAlign};margin:0;line-height:1.6">${escapeHtml(p.content)}</p>
    </td>
  </tr>
</table>`;
}

function renderCTAButton(p: CTAButtonProps): string {
  const marginStyle = p.align === "center" ? "margin:0 auto" : p.align === "right" ? "margin-left:auto" : "";
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td style="padding:16px 24px;text-align:${p.align}">
      <table cellpadding="0" cellspacing="0" role="presentation" style="${marginStyle}">
        <tr>
          <td style="background-color:${p.backgroundColor};border-radius:6px;text-align:center">
            <a href="${escapeHtml(p.url)}" style="display:inline-block;padding:14px 36px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:${p.textColor};text-decoration:none">${escapeHtml(p.text)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderDivider(p: DividerProps): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr><td style="padding:${p.spacing}px 24px"><hr style="border:none;border-top:1px solid ${p.color};margin:0" /></td></tr>
</table>`;
}

function renderImage(p: ImageProps): string {
  const img = `<img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.alt)}" width="600" style="display:block;width:${p.width};height:auto;margin:0 auto" />`;
  const content = p.url ? `<a href="${escapeHtml(p.url)}">${img}</a>` : img;
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr><td align="center">${content}</td></tr>
</table>`;
}

function renderDiscount(p: DiscountProps): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${p.backgroundColor}">
  <tr>
    <td style="padding:32px 24px;text-align:center">
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:${p.textColor};margin:0 0 12px 0">${escapeHtml(p.description)}</p>
      <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
        <tr>
          <td style="background-color:${p.accentColor};border-radius:6px;padding:12px 32px">
            <span style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;color:${p.textColor};letter-spacing:3px">${escapeHtml(p.code)}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderFooter(p: FooterProps): string {
  const socialLinks = p.socialLinks
    .map(
      (link) =>
        `<td style="padding:0 8px"><a href="${escapeHtml(link.url)}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${p.textColor};text-decoration:underline">${escapeHtml(link.platform)}</a></td>`
    )
    .join("");

  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${p.backgroundColor}">
  <tr>
    <td style="padding:32px 24px;text-align:center">
      <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
        <tr>${socialLinks}</tr>
      </table>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${p.textColor};margin:16px 0 4px 0">${escapeHtml(p.companyName)}</p>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${p.textColor};opacity:0.6;margin:0 0 16px 0">${escapeHtml(p.address)}</p>
      <a href="${escapeHtml(p.unsubscribeUrl)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${p.textColor};opacity:0.6;text-decoration:underline">Unsubscribe</a>
    </td>
  </tr>
</table>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderers: Record<BlockType, (props: any) => string> = {
  header: renderHeader,
  hero: renderHero,
  product: renderProduct,
  productGrid: renderProductGrid,
  text: renderText,
  ctaButton: renderCTAButton,
  divider: renderDivider,
  image: renderImage,
  discount: renderDiscount,
  footer: renderFooter,
};

function stripHtmlTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function renderBlocksToHtml(blocks: Block[]): { html: string; text: string } {
  const bodyContent = blocks
    .map((block) => {
      const renderer = renderers[block.type];
      if (!renderer) return "";
      return renderer(block.props);
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Mission Beard</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { color: #E98517; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5;">
  <center style="width: 100%; background-color: #F5F5F5;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
    <td>
    <![endif]-->
    <div class="email-container" style="max-width: 600px; margin: 0 auto;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td>
${bodyContent}
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>`;

  const text = stripHtmlTags(bodyContent);
  return { html, text };
}
