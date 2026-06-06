import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const FROM_EMAIL     = 'KaribuStay <info@karibustay.co.tz>';

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const body = await req.json();
    const { booking, listing, type = 'confirmation' } = body;

    if (!booking || !booking.guest_email) {
      return new Response(JSON.stringify({ error: 'Missing booking or guest_email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const propName  = listing?.name     || 'Your booking';
    const propLoc   = listing?.location || '';
    const nights    = booking.checkin && booking.checkout
      ? Math.max(0, Math.round((new Date(booking.checkout).getTime() - new Date(booking.checkin).getTime()) / 86400000))
      : 0;
    const totalAmt  = booking.total_amount
      ? 'TZS ' + Number(booking.total_amount).toLocaleString()
      : '—';
    const shortId   = (booking.id || '').slice(0, 8).toUpperCase();
    const fmtDate   = (d: string) => d ? new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) : '—';

    // ── EMAIL TEMPLATES ────────────────────────────────────────
    const templates: Record<string, { subject: string; html: string }> = {

      confirmation: {
        subject: `✅ Booking Confirmed – ${propName} | KaribuStay`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:'DM Sans',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 0">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#0f2518,#27a65d);padding:32px 40px;text-align:center">
          <div style="font-family:Georgia,serif;font-size:28px;color:#fff;letter-spacing:-.5px">
            Karibu<em style="color:#a8f0c6;font-style:italic">Stay</em>
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:6px;letter-spacing:.08em;text-transform:uppercase">Tanzania's Home Away From Home</div>
        </td></tr>

        <!-- GREEN BAND -->
        <tr><td style="background:#27a65d;padding:14px 40px;text-align:center">
          <span style="font-size:13px;font-weight:700;color:#fff;letter-spacing:.06em;text-transform:uppercase">✅ Booking Confirmed</span>
        </td></tr>

        <!-- BODY -->
        <tr><td style="padding:36px 40px">
          <p style="margin:0 0 8px;font-size:16px;color:#111">Hi ${booking.guest_name || 'Guest'},</p>
          <p style="margin:0 0 28px;font-size:14px;color:#555;line-height:1.6">
            Your booking at <strong style="color:#0f2518">${propName}</strong> is confirmed. We're excited to welcome you!
          </p>

          <!-- BOOKING DETAILS BOX -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7faf8;border:1px solid #d4ead9;border-radius:12px;margin-bottom:28px">
            <tr><td style="padding:20px 24px">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#27a65d;letter-spacing:.1em;text-transform:uppercase">Booking Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:13px;color:#888;padding:5px 0;width:40%">Property</td>
                  <td style="font-size:13px;color:#111;font-weight:600;padding:5px 0">${propName}</td>
                </tr>
                ${propLoc ? `<tr>
                  <td style="font-size:13px;color:#888;padding:5px 0">Location</td>
                  <td style="font-size:13px;color:#111;padding:5px 0">📍 ${propLoc}</td>
                </tr>` : ''}
                <tr>
                  <td style="font-size:13px;color:#888;padding:5px 0">Check-in</td>
                  <td style="font-size:13px;color:#111;font-weight:600;padding:5px 0">${fmtDate(booking.checkin)}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding:5px 0">Check-out</td>
                  <td style="font-size:13px;color:#111;font-weight:600;padding:5px 0">${fmtDate(booking.checkout)}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding:5px 0">Nights</td>
                  <td style="font-size:13px;color:#111;padding:5px 0">🌙 ${nights}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding:5px 0">Guests</td>
                  <td style="font-size:13px;color:#111;padding:5px 0">👥 ${booking.guests || 1}</td>
                </tr>
                <tr style="border-top:1px solid #d4ead9">
                  <td style="font-size:14px;color:#0f2518;font-weight:700;padding:12px 0 5px">Total</td>
                  <td style="font-size:16px;color:#27a65d;font-weight:700;padding:12px 0 5px">${totalAmt}</td>
                </tr>
                <tr>
                  <td style="font-size:11px;color:#aaa;padding:0">Booking ID</td>
                  <td style="font-size:11px;color:#aaa;padding:0;font-family:monospace">#${shortId}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
            <tr><td align="center">
              <a href="https://karibustay.co.tz/bookings.html"
                 style="display:inline-block;background:linear-gradient(135deg,#1db954,#27a65d);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 36px;border-radius:50px;box-shadow:0 6px 20px rgba(39,166,93,.35)">
                View My Bookings
              </a>
            </td></tr>
          </table>

          <p style="font-size:13px;color:#555;line-height:1.7;margin:0 0 8px">
            Questions? Contact us on <a href="https://wa.me/255745999918" style="color:#27a65d;text-decoration:none">WhatsApp</a> or reply to this email.
          </p>
          <p style="font-size:13px;color:#555;margin:0">Asante sana for choosing KaribuStay! 🌍</p>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#f7faf8;border-top:1px solid #e8ede9;padding:20px 40px;text-align:center">
          <p style="font-size:11px;color:#aaa;margin:0">
            © ${new Date().getFullYear()} KaribuStay · <a href="https://karibustay.co.tz" style="color:#27a65d;text-decoration:none">karibustay.co.tz</a>
            · <a href="https://karibustay.co.tz/bookings.html" style="color:#aaa;text-decoration:none">Manage bookings</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      },

      cancellation: {
        subject: `❌ Booking Cancelled – ${propName} | KaribuStay`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 0">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
        <tr><td style="background:linear-gradient(135deg,#0f2518,#27a65d);padding:28px 40px;text-align:center">
          <div style="font-family:Georgia,serif;font-size:26px;color:#fff">Karibu<em style="color:#a8f0c6">Stay</em></div>
        </td></tr>
        <tr><td style="background:#ef5350;padding:12px 40px;text-align:center">
          <span style="font-size:13px;font-weight:700;color:#fff;letter-spacing:.06em;text-transform:uppercase">❌ Booking Cancelled</span>
        </td></tr>
        <tr><td style="padding:32px 40px">
          <p style="font-size:15px;color:#111;margin:0 0 12px">Hi ${booking.guest_name || 'Guest'},</p>
          <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 24px">
            Your booking at <strong>${propName}</strong> (ID: #${shortId}) has been cancelled.
          </p>
          <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 24px">
            Dates: <strong>${fmtDate(booking.checkin)}</strong> → <strong>${fmtDate(booking.checkout)}</strong>
          </p>
          <p style="font-size:13px;color:#555;line-height:1.7;margin:0">
            Need help or made a mistake? Contact us on <a href="https://wa.me/255745999918" style="color:#27a65d">WhatsApp</a>.
          </p>
        </td></tr>
        <tr><td style="background:#f7faf8;border-top:1px solid #e8ede9;padding:16px 40px;text-align:center">
          <p style="font-size:11px;color:#aaa;margin:0">© ${new Date().getFullYear()} KaribuStay · <a href="https://karibustay.co.tz" style="color:#27a65d;text-decoration:none">karibustay.co.tz</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      },
    };

    const template = templates[type] || templates.confirmation;

    // ── SEND VIA RESEND ───────────────────────────────────────
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [booking.guest_email],
        subject: template.subject,
        html:    template.html,
        reply_to: 'info@karibustay.co.tz',
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: resData }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: resData.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
