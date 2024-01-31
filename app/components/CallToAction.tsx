import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import backgroundImage from '~/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section id="get-started-today" className="relative overflow-hidden bg-indigo-600 py-32">
      <img
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">Get started today</h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Elevate your IT access management with our AI-powered chatbot. Experience streamlined, secure application
            access management that integrates effortlessly with your existing systems. Don&apos;t wait to revolutionize
            your IT operations—see the difference today.
          </p>
          <Button to="#contact" color="white" className="mt-10">
            Get 3 months free
          </Button>
        </div>
      </Container>
    </section>
  )
}
