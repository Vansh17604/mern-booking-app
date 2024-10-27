import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = ()=>{
    const {register,formState:{errors}}=useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4"> 
                
                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles",{
                    validate: (imageFiles)=>{
                        const totalLength=imageFiles.length;
                        if(totalLength===0){
                            return "Please select at least one image";
                            }
                        if(totalLength > 6){
                            return "Total number of image cannot be more than 6";
                        }
                        return true;
                    }
                })}/>
            </div>
            {errors.imageFiles &&(<span className="text-sm text-red-500 font-bold">{errors.imageFiles.message}</span>)}
        </div>
    );
}

export default ImageSection;