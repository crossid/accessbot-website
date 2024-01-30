"use client";

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { Container } from "~/components/Container";
import backgroundImage from "~/images/background-features.jpg";
import approvalImg from "~/images/screenshots/approval.png";
import complianceImg from "~/images/screenshots/compliance.png";
import provisioningImg from "~/images/screenshots/provisioning.png";
import recommendationsImg from "~/images/screenshots/recommendations.png";

const features = [
  // {
  //   title: 'Intelligent Access Recommendations',
  //   description:
  //     "Our chatbot intelligently suggests application access tailored to each user, leveraging their input and role-specific data. This personalized approach ensures users get exactly the access they need, streamlining their workflow and enhancing productivity.",
  //   image: screenshotPayroll,
  // },
  {
    title: "Intelligent Access Recommendations",
    description:
      "Our chatbot excels in delivering finely-tuned access recommendations. Whether a user specifies an intended action or seeks solutions for troubleshooting errors, the bot analyzes their input to propose the most appropriate access level, streamlining their workflow and enhancing productivity.",
    image: recommendationsImg,
  },
  {
    title: "Seamless Approval Request Handling",
    description:
      "Once a user requests access, our chatbot takes over the approval process. It automatically identifies and contacts the relevant data owner, expediting the approval chain and reducing the administrative burden on your IT team through familiar messaging platforms like Slack. This allows for quick and easy approvals, seamlessly integrating into the daily workflow of your team.",
    image: approvalImg,
  },
  {
    title: "Automated Access Provisioning",
    description:
      "Upon receiving approval, our chatbot promptly provisions the requested access with the flexibility of temporal access. Integrated with directories like Azure and Okta, it ensures a smooth and immediate transition from approval to access, eliminating manual processing delays.",
    image: provisioningImg,
  },
  {
    title: "Secure and Compliant Process",
    description:
      "Our chatbot intelligently aligns recommended access with your organization's policies and best practices, using AI that considers user access clusters based on role, title, and organizational unit. This, coupled with thorough auditing capabilities, ensures a secure and compliant access management process.",
    image: complianceImg,
  },
];

export function PrimaryFeatures() {
  const [tabOrientation, setTabOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");

  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-indigo-600 pb-28 pt-20 sm:py-32"
    >
      <img
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Key Features: Enhancing Access Management with AI Efficiency
          </h2>
          <p className="mt-6 text-lg tracking-tight text-indigo-100">
            Discover how our AI chatbot revolutionizes application access
            management, from request to approval, ensuring security and
            compliance at every step.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                        selectedIndex === featureIndex
                          ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                          : "hover:bg-white/10 lg:hover:bg-white/5"
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg ui-not-focus-visible:outline-none",
                            selectedIndex === featureIndex
                              ? "text-indigo-600 lg:text-white"
                              : "text-indigo-100 hover:text-white lg:text-white"
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          "mt-2 hidden text-sm lg:block",
                          selectedIndex === featureIndex
                            ? "text-white"
                            : "text-indigo-100 group-hover:text-white"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-indigo-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <img
                        className="w-full"
                        src={feature.image}
                        alt=""
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
