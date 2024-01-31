import { XCircleIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { fadeInAnimation, randomShortInterval } from '../utils/animations'

interface IErrorMessage {
  heading: string
  description: string
}

const SuccessMessage: React.FC<IErrorMessage> = ({ heading, description }: IErrorMessage) => {
  return (
    <motion.div {...fadeInAnimation} transition={{ delay: randomShortInterval() }}>
      <div className="rounded-b border-t-4 border-red-500 bg-red-100 px-4 py-3 text-teal-900 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1">
            <XCircleIcon className="mr-4 size-6 text-red-500" />
          </div>
          <div>
            <p className="font-bold">{heading}</p>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default SuccessMessage
