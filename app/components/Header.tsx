'use client'

import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

import { Link } from '@remix-run/react'
import { Container } from '~/components/Container'
import { NavLink } from '~/components/NavLink'
import LogoImg from '~/images/logo.webp'
import { Button } from './Button'

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Popover.Button as={Link} to={to} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M0 1H14M0 7H14M0 13H14" className={clsx('origin-center transition', open && 'scale-90 opacity-0')} />
      <path d="M2 2L12 12M12 2L2 12" className={clsx('origin-center transition', !open && 'scale-90 opacity-0')} />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="ui-not-focus-visible:outline-none relative z-10 flex size-8 items-center justify-center"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50 dark:bg-slate-900/70" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-gray-300"
          >
            <MobileNavLink to="#features">Features</MobileNavLink>
            {/* <MobileNavLink to="#testimonials">Testimonials</MobileNavLink> */}
            <MobileNavLink to="#pricing">Pricing</MobileNavLink>
            {/* <MobileNavLink to="/login">Sign in</MobileNavLink> */}
            <hr className="m-2 border-slate-300/40" />
            {/* <MobileNavLink to="/login">Sign in</MobileNavLink> */}
            <MobileNavLink to="#contact">Contact Us</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link to="#" aria-label="Home">
              {/* <Logo className="h-10 w-auto" /> */}
              <img src={LogoImg} alt="Logo" className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink to="#features">Features</NavLink>
              {/* <NavLink to="#testimonials">Testimonials</NavLink> */}
              <NavLink to="#pricing">Pricing</NavLink>
              <NavLink to="#contact">Contact</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {/* <div className="hidden md:block">
              <NavLink to="/login">Sign in</NavLink>
            </div>
            <Button to="/register" color="blue">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </Button> */}
            <Button to="#contact" color="blue">
              <span>Contact Us</span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
