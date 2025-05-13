import {
  ImageSlider,
  ImageLayer,
  Divider,
} from "../ui/image-comparison";

export const ImageComparisonDemo = () => {
  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <ImageSlider className="h-96 overflow-hidden">
        <ImageLayer
          src="/assets/images/image-comparison/2.jpg"
          alt="Original Image"
          layer="first"
        />
        <ImageLayer
          src="/assets/images/image-comparison/1.jpg"
          alt="Processed Image"
          layer="second"
        />
        <Divider width={4} handleSize={32} />
      </ImageSlider>
    </div>
  );
};
