import { Form, useActionData, useNavigation } from '@remix-run/react'
// import * as gtag from '@/lib/gtag'
import { action } from '~/routes/_index'
import ErrorMessage from './ErrorMessage'

// TODO should be protected with captcha (example: https://github.com/lukalaz/remix-custom/blob/main/app/features/homepage/components/ContactMe.tsx)
export const StartNow = () => {
  const response = useActionData<typeof action>()
  const navigation = useNavigation()

  return (
    <section id="contact" className="overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {!response?.successMessage && (
          <>
            <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 sm:block sm:text-6xl dark:text-slate-100">
              Contact Us
            </h2>
            <Form
              className="mt-8 rounded-2xl p-5 sm:flex sm:border-2 sm:border-black dark:sm:border-slate-700"
              name="get-started"
              method="POST"
            >
              <label htmlFor="emailAddress" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input w-full rounded-md border-2 px-5 py-3 placeholder:text-gray-400 focus:border-gray-200 focus:ring-gray-200 sm:border-none  dark:bg-slate-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder="Your work email"
              />
              {response?.email ? <em className="text-red-600">{response.email}</em> : null}
              <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:shrink-0">
                <button
                  disabled={navigation.state !== 'idle'}
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 lg:py-5 lg:text-2xl"
                >
                  Submit
                </button>
              </div>
            </Form>
            {/* <div className="text-right pr-8 lg:pr-2 lg:pt-2 text-sm text-indigo-600 font-bold">
                <Link to="/contact">
                  <a>Need help? let's talk</a>
                </Link>
              </div> */}
          </>
        )}
        {response?.successMessage && (
          <>
            <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 sm:block sm:text-6xl">
              Thank you for reaching out!
            </h2>
            <p className="mt-2 max-w-md text-base text-gray-500 sm:text-lg md:mt-3 md:max-w-3xl md:text-xl">
              We will get back to you as soon as we can.
            </p>
          </>
        )}
      </div>
      {response?.errorMessage && <ErrorMessage heading="Error" description={response?.errorMessage} />}
    </section>
  )
}
