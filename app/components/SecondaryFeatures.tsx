'use client'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useId } from 'react'

import { Container } from '~/components/Container'
import screenshotAnalytics from '~/images/screenshots/analytics.png'
import screenshotSurveillance from '~/images/screenshots/surveillance.png'
import screenshotTemporalAccess from '~/images/screenshots/temporal-access.png'

interface Feature {
  name: React.ReactNode
  summary: string
  description: string
  // image: ImageProps['src']
  image: string
  icon: React.ComponentType
}

const features: Array<Feature> = [
  {
    name: 'Automated Time-Bound Access',
    summary: 'Flexible Temporal Access Control.',
    description:
      "Our chatbot enables precise control over access duration, allowing you to grant permissions for defined time periods. This ensures adherence to the Principle of Least Privilege (PoLP) by automatically revoking access when it's no longer needed, enhancing security and minimizing unnecessary access risks.",
    image: screenshotTemporalAccess,
    icon: function InventoryIcon() {
      return (
        <>
          <path opacity=".5" d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff" />
          <path opacity=".3" d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff" />
          <path d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff" />
        </>
      )
    },
  },
  {
    name: 'Access Surveillance',
    summary: 'Business Compliance Access Surveillance.',
    description:
      "Our chatbot excels in identifying access requests that do not align with a user’s defined business role. By analyzing each request against role-specific parameters, it flags any inappropriate or unusual access patterns, ensuring that every granted privilege strictly adheres to the individual's job responsibilities and organizational access policies.",
    image: screenshotSurveillance,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="#fff"
          />
          <path
            d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
            fill="#fff"
          />
        </>
      )
    },
  },
  {
    name: 'Real-Time Analytics and Reporting',
    summary: 'Insightful Analytics.',
    description:
      'Gain valuable insights with real-time analytics and reporting features, enabling you to track usage patterns, request trends, and compliance metrics effectively.',
    image: screenshotAnalytics,
    icon: function ReportingIcon() {
      const id = useId()
      return (
        <>
          <defs>
            <linearGradient id={id} x1="11.5" y1={18} x2={36} y2="15.5" gradientUnits="userSpaceOnUse">
              <stop offset=".194" stopColor="#fff" />
              <stop offset={1} stopColor="#6692F1" />
            </linearGradient>
          </defs>
          <path
            d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )
    },
  },
]

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')} {...props}>
      <div className={clsx('w-9 rounded-lg', isActive ? 'bg-blue-600' : 'bg-slate-500')}>
        <svg aria-hidden="true" className="size-9" fill="none">
          <feature.icon />
        </svg>
      </div>
      <h3
        className={clsx('mt-6 text-sm font-medium', isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300')}
      >
        {feature.name}
      </h3>
      <p className="font-display mt-2 text-xl text-slate-900 dark:text-slate-400">{feature.summary}</p>
      <p className="mt-4 text-sm text-slate-600 dark:text-white">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <img className="w-full" src={feature.image} alt="" sizes="52.75rem" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="rounded-4xl relative mt-20 overflow-hidden bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.summary}
                  className={clsx(
                    'ui-not-focus-visible:outline-none px-5 transition duration-500 ease-in-out',
                    featureIndex !== selectedIndex && 'opacity-60',
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <img className="w-full" src={feature.image} alt="" sizes="52.75rem" />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="rounded-4xl pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Additional Capabilities to Enhance Your Experience"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Additional Capabilities to Enhance Your Experience.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-400">
            Our chatbot offers more than just access management. Explore these added functionalities to further optimize
            your IT operations
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}