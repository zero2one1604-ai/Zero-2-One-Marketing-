import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const awb = searchParams.get('awb')

    if (!awb) {
      return NextResponse.json({ error: 'AWB required' }, { status: 400 })
    }

    const labelUrl =
      `https://demodashboardapi.shipsy.in/api/customer/integration/consignment/shippinglabel/stream` +
      `?reference_number=${awb}` +
      `&label_code=SHIP_LABEL_4X6` +
      `&label_format=pdf`

    const res = await fetch(labelUrl, {
      headers: {
        'api-key': process.env.DTDC_API_KEY
      }
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Label fetch failed' }, { status: 500 })
    }

    const pdfBuffer = await res.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="label-${awb}.pdf"`
      }
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Label generation crashed', message: err.message },
      { status: 500 }
    )
  }
}
