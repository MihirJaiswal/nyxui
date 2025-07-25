import BubbleBackground from "../ui/bubble-background";

export const BubblesBackgroundDemo = () => {
  return (
    <div className="h-[550px] overflow-hidden rounded-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <BubbleBackground
          bgColorA="rgb(30, 0, 60)"
          bgColorB="rgb(0, 30, 90)"
          bubbleColors={{
            colorA: "50, 150, 255",
            colorB: "200, 80, 255",
            colorC: "120, 240, 255",
            colorD: "220, 60, 80",
            colorE: "200, 200, 80",
            interactive: "160, 120, 255",
          }}
          bubbleSize="70%"
          blendMode="screen"
        />
      </div>
    </div>
  );
};
