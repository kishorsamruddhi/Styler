// import { useQuery } from "@tanstack/react-query";
import CircularGallery from "./CircularGallery";
import { memo } from "react";
// import MobileGallery from "./MobileGallery";

const CircularGalleryMemo = memo((props) => <CircularGallery{...props} />)

const ResponsiveGallery = () => {
//  return <MobileGallery/>
 
  // const { isLoading, isError, data } = useQuery({ queryKey: ['getCurveImages'], queryFn: getCurveImages, })
  // const { isLoading, isError, data } = useQuery({ queryKey: ['getMultiImages'], queryFn: getMultiImages, })
  // console.log("getMultiImagesData", getMultiImagesData)
  // const verifyResp = isLoading || isError || data?.data?.success == false
  //   ? null : data?.data
  // const cardsImages = verifyResp === null ? undefined : data?.data?.images || data?.data?.data
  return (
    <div className="desktop-gallery-wrapper">
      <CircularGalleryMemo images={null} />
    </div>
  );
};

export default ResponsiveGallery;
