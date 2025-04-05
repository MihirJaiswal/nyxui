import BubbleBackground from '@/nyxui/components/BubbleBackground';

export const BubblesBackgroundDemo = () => {
  return (
    <BubbleBackground 
      backgroundColorA="rgb(30, 0, 60)"
      backgroundColorB="rgb(0, 30, 90)"
      bubbleColors={{
        colorA: '50, 150, 255',
        colorB: '200, 80, 255',
        colorC: '120, 240, 255',
        colorD: '220, 60, 80',
        colorE: '200, 200, 80',
        interactive: '160, 120, 255',
      }}
      bubbleSize="70%"
      blendMode="screen"
    />
  );
}