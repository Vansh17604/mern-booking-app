import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../../../Backend/src/shared/types";
import { useEffect } from "react";


export type HotelFormData ={
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;

}

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData)=> void;
    isLoading: boolean;
}

const ManageHotelForm =({onSave,isLoading,hotel}: Props) =>{
    const formMethods = useForm<HotelFormData>();

    const {handleSubmit, reset}= formMethods;

    useEffect(()=>{
        reset(hotel);
    },[hotel,reset]);
    

    const onSubmit= handleSubmit((FormDataJson: HotelFormData)=>{
        // crete new formData object &call our API
        const formData =new FormData();
        if(hotel){
            formData.append("hotelId",hotel._id);
        }
        formData.append("name",FormDataJson.name);
        formData.append("city",FormDataJson.city);
        formData.append("country",FormDataJson.country);
        formData.append("description",FormDataJson.description);
        formData.append("pricePerNight",FormDataJson.pricePerNight.toString());
        formData.append("starRating",FormDataJson.starRating.toString());
        formData.append("adultCount",FormDataJson.adultCount.toString());
        formData.append("childCount",FormDataJson.childCount.toString());
        formData.append("type",FormDataJson.type);
        FormDataJson.facilities.forEach((facility,index)=>{
                formData.append(`facilities[${index}]`,facility);
        });

        //updated image
        if(FormDataJson.imageUrls){
            FormDataJson.imageUrls.forEach((url,index)=>{
                formData.append(`imageUrls[${index}]`,url);
            });
        }
        Array.from(FormDataJson.imageFiles).forEach((imageFile)=>{
            formData.append("imageFiles",imageFile);
        });
        onSave(formData)

    });

    return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
            <button 
            disabled={isLoading}
            type="submit" className="bg-blue-600 disabled:bg-gray-500 hover:bg-blue-500 text-white p-2 font-bold text-xl">
              {isLoading ? "Saving..." : "Save"}  
            </button>
            
        </span>
    </form>
    </FormProvider>
    );
}

export default ManageHotelForm;