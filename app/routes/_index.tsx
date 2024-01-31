import { json, type ActionFunction, type MetaFunction } from '@remix-run/node'
import { CallToAction } from '~/components/CallToAction'
import { Faqs } from '~/components/Faqs'
import { Hero } from '~/components/Hero'
import { Pricing } from '~/components/Pricing'
import { PrimaryFeatures } from '~/components/PrimaryFeatures'
import { SecondaryFeatures } from '~/components/SecondaryFeatures'
import { StartNow } from '~/components/StartNow'
import Sendgrid from '~/lib/sendgrid.server'

type ActionData = {
  email: null | string
  message: null | string
}

type Success = {
  successMessage: string
}

type Error = {
  errorMessage: string
}

// see https://github.com/lukalaz/remix-custom/blob/main/app/routes/index.tsx
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const email = formData.get('email')
  const message = formData.get('message') || 'Contact form (no body)'

  const errors: ActionData = {
    email: email ? null : 'Email is required',
    message: message ? null : 'Message is required',
  }

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)

  if (hasErrors) {
    return json<ActionData>(errors)
  }

  Sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

  const msg = {
    from: 'info@crossid.io',
    to: 'info@crossid.io',
    subject: 'contact from accessbot.crossid.io: ' + email?.toString(),
    text: message?.toString(),
    html: message?.toString() || '',
  }

  const res = await Sendgrid.send(msg)
    .then(() => {
      return json<Success>({
        successMessage: 'Email sent succesfully.',
      })
    })
    .catch((error) => {
      return json<Error>({
        errorMessage: error.response.body.errors[0].message,
      })
    })

  return res
}

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        {/* Testimonials */}
        <Pricing />
        <StartNow />
        <Faqs />
      </main>
    </div>
  )
}
