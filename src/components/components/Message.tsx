import { Button } from "../ui/button"
import { Github, AlertTriangle} from "lucide-react"

export const Message = () => {
    return (
        <div className="mt-2 mx-3 pt-4 border pb-4 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md border-amber-200 dark:border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-amber-500 size-4" />
                <h4 className="text-sm font-medium text-amber-700">Warning: Beta Components</h4>
            </div>
            <p className="text-xs text-amber-600 mb-3">
                Some components may have bugs or unexpected behavior. We're working to resolve these issues as quickly as possible. Please report any problems you encounter.
            </p>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-100">
                    <Github className="size-3.5" />
                    Report Issue
                </Button>
            </div>
        </div>    
    )   
}