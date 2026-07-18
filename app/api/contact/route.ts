import { NextResponse } from 'next/server';

const recipient = 'nah.beade@gmail.com';
const sender = 'Nahuel Beade <contacto@nahuelbeade.com>';

export async function POST(request: Request) {
  const formData = await request.formData();
  const nombre = String(formData.get('nombre') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const mensaje = String(formData.get('mensaje') ?? '').trim();

  if (!nombre || !email || !mensaje || !process.env.RESEND_API_KEY) {
    return NextResponse.redirect(new URL('/contacto?error=1', request.url), 303);
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    }),
  });

  return NextResponse.redirect(
    new URL(response.ok ? '/contacto?sent=1' : '/contacto?error=1', request.url),
    303,
  );
}
