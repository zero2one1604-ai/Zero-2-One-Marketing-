export function orderPlacedEmail({ order, items }) {
  const orderId = order.id.slice(0, 8).toUpperCase();
  const date = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.02); border: 1px solid #eeeeee;">
              
              <tr>
                <td align="center" style="padding: 40px 40px 20px 40px;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; color: #000000;">SAAVI</h1>
                  <p style="margin: 10px 0 0 0; font-size: 10px; font-weight: bold; color: #999999; text-transform: uppercase; letter-spacing: 0.2em;">Order Confirmation</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 20px 40px; text-align: center;">
                  <h2 style="font-size: 20px; font-weight: 300; color: #1a1a1a; margin: 0;">Thank you for your purchase, ${order.full_name}.</h2>
                  <p style="font-size: 14px; color: #666666; line-height: 1.6; margin-top: 10px;">Your order has been received and is being prepared for fulfillment.</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 20px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcfcfc; border-radius: 16px; border: 1px solid #f1f1f1; padding: 25px;">
                    <tr>
                      <td style="font-size: 11px; font-weight: 900; color: #999999; text-transform: uppercase; letter-spacing: 0.1em; padding-bottom: 15px;">Order Details</td>
                    </tr>
                    ${items.map(item => `
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #f1f1f1;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-size: 14px; font-weight: bold; color: #1a1a1a;">${item.name_snapshot}</td>
                              <td align="right" style="font-size: 13px; color: #666666;">Qty: ${item.quantity}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    `).join('')}
                    <tr>
                      <td style="padding-top: 15px; border-top: 2px solid #eeeeee;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="font-size: 11px; font-weight: 900; color: #1a1a1a; text-transform: uppercase;">Total (COD)</td>
                            <td align="right" style="font-size: 18px; font-weight: 300; color: #000000;">₹${order.total_amount}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 40px 40px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 10px;">
                        <p style="font-size: 10px; font-weight: bold; color: #999999; text-transform: uppercase; margin-bottom: 8px;">Shipping To</p>
                        <p style="font-size: 12px; color: #666666; line-height: 1.5; margin: 0;">
                          <strong>${order.full_name}</strong><br/>
                          ${order.address_line1}<br/>
                          ${order.city}, ${order.state} ${order.pincode}<br/>
                          T: ${order.phone}
                        </p>
                      </td>
                      <td width="50%" valign="top" style="padding-left: 10px;">
                        <p style="font-size: 10px; font-weight: bold; color: #999999; text-transform: uppercase; margin-bottom: 8px;">Meta</p>
                        <p style="font-size: 12px; color: #666666; line-height: 1.5; margin: 0;">
                          ID: #${orderId}<br/>
                          Date: ${date}<br/>
                          Method: Cash on Delivery
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 30px 40px; background-color: #000000; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px;">
                  <p style="margin: 0; font-size: 12px; color: #ffffff; letter-spacing: 0.1em;">We will notify you once your package is dispatched.</p>
                  <p style="margin: 10px 0 0 0; font-size: 10px; font-weight: bold; color: #666666; text-transform: uppercase;">&copy; 2025 SAAVI SKINCARE</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}