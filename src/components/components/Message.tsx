import Link from "next/link"
import { Button } from "../ui/button"
import { Github} from "lucide-react"

export const Message = () => {
    return (
        <div className="mt-2 mx-3 flex flex-wrap items-center justify-between gap-2 pt-4 border pb-4 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md border-amber-200 dark:border-amber-500/30">
            <p className="text-xs text-amber-600 mb-3">
                Some components may have bugs or unexpected behavior. We&apos;re working to resolve these issues as quickly as possible. Please report any problems you encounter.
            </p>
            <div className="flex gap-2">
                <Link href="https://github.com/Nyxui-Labs/nyxui/issues/new">
                    <Button variant="outline" size="sm" className="text-xs gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-100">
                        <Github className="size-3.5" />
                        Report Issue
                    </Button>
                </Link>
            </div>
        </div>    
    )   
}