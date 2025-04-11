import { motion } from "framer-motion"

const BgDecorativeBalls = () => {
  return (
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary/30 to-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/30 to-secondary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-primary/20 to-secondary/10 rounded-full blur-3xl"
          />
        </div>
  )
}

export default BgDecorativeBalls
