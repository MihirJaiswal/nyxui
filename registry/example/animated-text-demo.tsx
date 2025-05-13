import { AnimateText } from "../ui/animated-text";

export const AnimationTextDemo = () => {
  return (
    <>
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col py-2 sm:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Cascade</p>
                <div className="overflow-hidden">
                  <AnimateText text="Cascade" type="cascade" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Flicker</p>
                <div className="overflow-hidden">
                  <AnimateText text="Flicker" type="flicker" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Blink</p>
                <div className="overflow-hidden">
                  <AnimateText text="Blink" type="blink" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Expand</p>
                <div className="overflow-hidden">
                  <AnimateText text="Expand" type="expand" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Rise</p>
                <div className="overflow-hidden">
                  <AnimateText text="Rise" type="rise" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Glide</p>
                <div className="overflow-hidden">
                  <AnimateText text="Glide" type="glide" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Elastic</p>
                <div className="overflow-hidden">
                  <AnimateText text="Elastic" type="elastic" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold mb-2">Float</p>
                <div className="overflow-hidden">
                  <AnimateText text="Float" type="float" custom={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
