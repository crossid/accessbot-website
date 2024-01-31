export const fadeInAnimation = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true },
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
}

function generateRandomInteger(max: number) {
  return Math.floor(Math.random() * max) + 1
}

export const randomShortInterval = () => generateRandomInteger(30) / 100
