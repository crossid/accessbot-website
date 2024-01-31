import { Container } from '~/components/Container'
import backgroundImage from '~/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'What is the primary function of this AI chatbot?',
      answer:
        'Our AI chatbot is designed not only to facilitate and automate the process of requesting application access within organizations but also to provide intelligent access recommendations. It analyzes user inputs and roles to suggest the most appropriate access levels, streamlining the approval process and enhancing overall efficiency.',
    },
    {
      question: 'Can the chatbot handle temporary or time-bound access requests?',
      answer:
        'Yes, our chatbot is equipped to manage temporal access, granting permissions for specific timeframes and automatically revoking them when they’re no longer needed, adhering to the Principle of Least Privilege.',
    },
    {
      question: 'How does the chatbot integrate with existing IT infrastructure?',
      answer:
        'The chatbot seamlessly integrates with current IT systems, including popular directories like Azure and Okta, and works with native messaging apps like Slack and Teams. It’s designed to complement and enhance your existing IT infrastructure.',
    },
  ],
  [
    {
      question: 'Does the chatbot support multiple languages?',
      answer:
        'Yes, our chatbot is equipped with multi-language support to cater to a diverse global workforce. It can handle requests and provide assistance in several major languages, making it an accessible and inclusive tool for organizations with international teams.',
    },
    {
      question: ' Is the chatbot user-friendly and easy to use for all employees?',
      answer:
        'Absolutely. The chatbot is designed with a user-friendly interface and offers guidance throughout the access request process, making it accessible and easy to use for all employees, regardless of their technical expertise.',
    },
    {
      question: 'What are the different ways the workforce can interact with the chatbot?',
      answer:
        'Our chatbot is designed for versatility and ease of use across various platforms. Users can interact with it through a mobile-friendly web-based chat interface, ensuring accessibility on-the-go. Additionally, it integrates seamlessly with popular messaging apps such as Slack and Microsoft Teams, allowing users to communicate in the environments they are already familiar with and use daily.',
    },
  ],
  [
    {
      question: 'How does the chatbot ensure security and compliance?',
      answer:
        'Security is a top priority. The chatbot operates in accordance with strict security policies, utilizing AI to make access recommendations based on user roles and titles. It also features role-based inappropriate access detection to maintain high security and compliance standards.',
    },
    {
      question: 'Can the system generate reports or analytics?',
      answer:
        'For every access request made through our chatbot, a detailed history is stored and analyzed, including the complete approval chain, specific access granted, and the timeline of access provisioning and deprovisioning, especially for temporal access. This comprehensive tracking ensures transparency and aids in auditing, compliance, and optimizing future access management.',
    },
  ],
]

export function Faqs() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
      <img
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 id="faq-title" className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team and if you’re lucky someone will get back
            to you.
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">{faq.question}</h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
