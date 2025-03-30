import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth"

export function GlassmorphismDepthDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 rounded-xl">
      {/* Light Theme */}
      <GlassmorphismDepth theme="light" depth={3} className="h-full">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Analytics Overview</h3>
          <p className="text-sm text-gray-600">Hover to see depth change and tilt effect</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white/50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Users</div>
              <div className="text-2xl font-bold">2,845</div>
            </div>
            <div className="bg-white/50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Revenue</div>
              <div className="text-2xl font-bold">$9,271</div>
            </div>
          </div>
        </div>
      </GlassmorphismDepth>

      {/* Blue Theme */}
      <GlassmorphismDepth theme="blue" depth={2} className="h-full">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Performance Metrics</h3>
          <p className="text-sm opacity-70">Interactive depth indicator with blue theme</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 bg-blue-200 rounded-full w-full">
              <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
            </div>
            <span className="text-sm font-medium">75%</span>
          </div>
        </div>
      </GlassmorphismDepth>

      {/* Purple Theme */}
      <GlassmorphismDepth theme="purple" depth={4} rounded="xl" className="h-full">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Project Status</h3>
          <p className="text-sm opacity-70">Deep glass effect with purple theme</p>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-purple-500/20 p-2 rounded-md text-center">
              <div className="text-xs">Tasks</div>
              <div className="font-bold">24</div>
            </div>
            <div className="bg-purple-500/20 p-2 rounded-md text-center">
              <div className="text-xs">Done</div>
              <div className="font-bold">18</div>
            </div>
            <div className="bg-purple-500/20 p-2 rounded-md text-center">
              <div className="text-xs">Pending</div>
              <div className="font-bold">6</div>
            </div>
          </div>
        </div>
      </GlassmorphismDepth>

      {/* Teal Theme */}
      <GlassmorphismDepth theme="teal" depth={3} tiltMax={15} className="h-full">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Activity Feed</h3>
          <p className="text-sm opacity-70">Enhanced tilt effect with teal theme</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm">New user registered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm">Payment processed</span>
            </div>
          </div>
        </div>
      </GlassmorphismDepth>
    </div>
  )
}

