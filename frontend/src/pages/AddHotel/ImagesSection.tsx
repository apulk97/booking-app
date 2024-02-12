import { useFormContext } from "react-hook-form";
import { HotelType } from "./index.types";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";


const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelType>();

  const existingImageUrls = watch("imageUrls");
  // const imageFiles = watch("imageFiles");
  // const [selectedImages, setSelectedImages] = useState<File[]>([]);
  // const [imgPrevURL, setImgPrevURL] = useState<string[]>([]);
  
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };


  
  
    // useEffect(()=>{
    //   if(imageFiles){
    //     const previewPromises = Array.from(imageFiles).map((file) => {
    //     return new Promise<string>((resolve) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         resolve(reader.result as string);
    //       };
    //       reader.readAsDataURL(file);
    //     });
    //   });

    //   // Update state with selected images and their previews
    //   Promise.all(previewPromises).then((previews) => {
    //     setSelectedImages((prevImages) => [...prevImages, ...Array.from(imageFiles)]);
    //     setImgPrevURL((prevPreviews) => [...prevPreviews, ...previews]);
    //   });}
    // },[imageFiles])
    

  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
            {/* <img src={'https://fastly.picsum.photos/id/643/200/300.jpg?hmac=rS-MHa0BIMHdAgm-FZ7QM36aRKEAzzhSRNRv5n4uqGc'} 
             /> */}
            {/* {imgPrevURL.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))} */}
            
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
