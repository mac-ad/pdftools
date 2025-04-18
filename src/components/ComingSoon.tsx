import Link from "next/link"
import { Button } from "./ui/Button"
import { Zap } from "lucide-react"

const ComingSoon = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="flex py-50 items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center animate-pulse">
              <Zap className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title} Coming <span className="text-primary">Soon</span>
          </h1>
          <p className="text-lg text-center text-foreground/70 max-w-md mx-auto">
            {description}
            Check back soon!
          </p>
          <div className="pt-4">
            <Link href="/">
              <Button
                variant="outline"
                className="animate-pulse mx-auto"
              >
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ComingSoon
