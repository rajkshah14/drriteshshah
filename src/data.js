// Contact details. Set phone / whatsapp (digits with country code, e.g. '919800000000')
// to switch the booking widget from email to WhatsApp and to show a call link.
export const CONTACT = {
  email: 'appointments@drriteshshah.com',
  phone: null,
  whatsapp: null,
}

export const CLINIC = {
  name: 'Narayana Multispeciality Hospital',
  lines: ['Plot 1, opposite Rakhial Bus Stop', 'near Rakhial Police Station, Rakhial Cross Road', 'Ahmedabad 380023, Gujarat'],
  hours: 'Monday to Saturday, 10 am – 8 pm',
  map: 'https://www.google.com/maps/search/?api=1&query=Narayana+Multispeciality+Hospital+Rakhial+Ahmedabad',
  openHour: 10,
  closeHour: 20,
}

export const TREATMENTS = [
  {
    title: 'Slipped disc and sciatica',
    text: 'Pain that runs from the lower back down a leg, numbness in the foot, a leg that gives way.',
    does: ['Endoscopic discectomy', 'Microdiscectomy', 'Nerve root decompression'],
  },
  {
    title: 'Neck pain and cord compression',
    text: 'Neck pain spreading to the arm, tingling fingers, a weak grip, unsteady walking.',
    does: ['Cervical discectomy and fusion', 'Posterior decompression', 'Endoscopic foraminotomy'],
  },
  {
    title: 'Narrow canal and slipped vertebra',
    text: 'Legs that ache and tire after a short walk and ease when you sit or bend forward.',
    does: ['Minimally invasive decompression', 'Spinal fusion and fixation'],
  },
  {
    title: 'Scoliosis and spinal deformity',
    text: 'A curve or stoop that is worsening, or that causes pain and imbalance.',
    does: ['Deformity correction', 'Instrumented fusion'],
  },
  {
    title: 'Spine tumours and fractures',
    text: 'Growths in or around the spinal cord, and fractures after a fall or an accident.',
    does: ['Tumour removal', 'Spinal fixation', 'Emergency decompression'],
  },
  {
    title: 'Brain and nerve surgery',
    text: 'Brain and pituitary tumours, aneurysms, hydrocephalus, head injury and nerve entrapment.',
    does: ['Microscopic craniotomy', 'Endoscopic brain surgery', 'Aneurysm clipping', 'Peripheral nerve surgery'],
  },
]

export const VISIT = [
  {
    heading: 'Before you come',
    rows: [
      ['MRI, CT and X-ray films with reports', 'all of them'],
      ['A list of the medicines you take', 'one page'],
      ['Notes from earlier doctors', 'if any'],
    ],
  },
  {
    heading: 'At the consultation',
    rows: [
      ['Your story: where it hurts, since when', '10 min'],
      ['Examination of nerves, strength and walking', '10 min'],
      ['Reading your scans together', '10 min'],
    ],
  },
  {
    heading: 'If surgery is advised',
    rows: [
      ['Tests and fitness check before surgery', '1 day'],
      ['The operation, explained in advance', 'as planned'],
      ['Follow-up visits', '2 and 6 weeks'],
    ],
  },
]

export const FAQ = [
  {
    q: 'Does a slipped disc always need surgery?',
    a: 'No. Most settle with time, medicines and physiotherapy. Surgery is advised when pain does not ease over several weeks, when a leg or foot grows weak, or when bladder or bowel control is affected.',
  },
  {
    q: 'What is endoscopic spine surgery?',
    a: 'The operation is done through a small tube with a camera, so muscle is moved aside rather than cut. Where it suits your problem, it usually means less pain afterwards and a shorter stay.',
  },
  {
    q: 'Do I need a referral?',
    a: 'No. You can book directly. If another doctor has seen you, bring their notes.',
  },
  {
    q: 'What should I bring?',
    a: 'Every scan you have, films and reports, old and new, and a list of your medicines. Old scans help show how the problem has changed.',
  },
  {
    q: 'How soon can I walk after spine surgery?',
    a: 'After most minimally invasive operations people stand and walk within a day. Dr Shah will tell you what to expect for your own operation before you decide.',
  },
  {
    q: 'What if it is an emergency?',
    a: 'Sudden weakness in the legs, loss of bladder or bowel control, or a serious head injury cannot wait for an appointment. Go to the nearest emergency department at once.',
  },
]
