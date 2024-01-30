import { FormEvent, useState } from 'react'
// import * as gtag from '@/lib/gtag'

export const StartNow = () => {
  const [form, setForm] = useState({ emailAddress: '' })
  const [inSubmit, setInSubmit] = useState(false)
  const [sentMode, setSentMode] = useState(false)

  const encode = (data: Record<string,string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // gtag.event({
    //   action: 'submit_getStarted',
    //   category: 'Contact',
    //   label: form.emailAddress,
    // })

    setInSubmit(true)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'get-started', ...form }),
    })
      .then(() => {
        setSentMode(true)
      })
      .catch((error) =>
        console.error(error)
      )
      .finally(() => {
        setInSubmit(false)
      })

    e.preventDefault()
  }

  return (
      <section id="contact" className="overflow-hidden py-32">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
          {!sentMode && (
            <>
              <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 dark:text-slate-100 sm:block sm:text-6xl">
                Contact Us
              </h2>
              <form
                className="mt-8 rounded-2xl p-5 sm:flex sm:border-2 sm:border-black dark:sm:border-slate-700"
                name="get-started"
                onSubmit={handleSubmit}
                data-netlify-honeypot="bot-field"
                data-netlify="true"
              >
                <label htmlFor="emailAddress" className="sr-only">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input w-full rounded-md border-2 px-5 py-3 placeholder-gray-400 focus:border-gray-200 focus:ring-gray-200 dark:bg-slate-900  dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:border-none"
                  placeholder="Your work email"
                  value={form.emailAddress}
                  onChange={handleChange}
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    disabled={inSubmit}
                    type="submit"
                    className="w-full flex items-center justify-center px-8 py-3 lg:py-5 text-base lg:text-2xl border border-transparent font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
                  >
                    Get Started
                  </button>
                </div>
              </form>
              {/* <div className="text-right pr-8 lg:pr-2 lg:pt-2 text-sm text-indigo-600 font-bold">
                <Link to="/contact">
                  <a>Need help? let's talk</a>
                </Link>
              </div> */}
            </>
          )}
          {sentMode && (
            <>
              <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 sm:block sm:text-6xl">
                Thank you for reaching out!
              </h2>
              <p className="mt-2 max-w-md text-base text-gray-500 sm:text-lg md:mt-3 md:text-xl md:max-w-3xl">
                We will get back to you as soon as we can.
              </p>
            </>
          )}
        </div>
      </section>
  )
}
