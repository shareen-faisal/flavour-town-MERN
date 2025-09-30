function orderEmailTemplate(order) {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background: #ff6600; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0;">Thank you for your order, ${order.name}! 🎉</h1>
      </div>
      
      <div style="padding: 20px;">
        <p>We’ve received your order and it is currently <strong>${order.status}</strong>.</p>
        
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f9f9f9;">
              <th align="left" style="padding: 8px;">Item</th>
              <th align="center" style="padding: 8px;">Qty</th>
              <th align="right" style="padding: 8px;">Item Total (PKR)</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
                <tr>
                  <td style="padding: 8px;">
                    ${item.name} <br/>
                    <small style="color: #555;">Price: ${item.basePrice}</small>
                    ${
                      item.addons && item.addons.length > 0
                        ? `<br/><em>Add-ons:</em> ${item.addons
                            .map((a) => `${a.name} (+${a.price})`)
                            .join(", ")}`
                        : ""
                    }
                  </td>
                  <td align="center" style="padding: 8px;">${item.quantity}</td>
                  <td align="right" style="padding: 8px;">${item.finalPrice}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        
        <h3 style="text-align: right; margin-top: 20px;">Total: PKR ${order.totalAmount}</h3>
        
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Delivery Details</h2>
        <p>
          <strong>Name:</strong> ${order.name}<br/>
          <strong>Phone:</strong> ${order.phone}<br/>
          <strong>Email:</strong> ${order.email}<br/>
          <strong>Address:</strong> ${order.address}, ${order.area}, ${order.city}
        </p>
        
        <p style="margin-top: 20px;">We’ll notify you once your food is out for delivery 🚚.</p>
        <p style="color: #777; font-size: 12px;">If you have any questions, please reply to this email.</p>
      </div>
      
      <div style="background: #f3f3f3; padding: 15px; text-align: center; font-size: 12px; color: #555;">
        &copy; ${new Date().getFullYear()} Food Ordering App. All rights reserved.
      </div>
    </div>
    `;
  }
  
  module.exports = orderEmailTemplate;
  