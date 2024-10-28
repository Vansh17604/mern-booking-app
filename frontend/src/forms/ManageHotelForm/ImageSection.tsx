import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = ()=>{
    const {register,formState:{errors},watch,setValue}=useFormContext<HotelFormData>();
    const exstingImageUrls =watch("imageUrls");

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl:string)=>{
        event.preventDefault();
        setValue("imageUrls",exstingImageUrls.filter((url)=>url !== imageUrl));
    
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4"> 
                {exstingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {exstingImageUrls.map((url)=>(
                            <div className="relative group">
                                <img src={url} alt="Hotel Image" className="min-h-full object-cover" />
                                <button onClick={(event)=> handleDelete(event,url) } type="button" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                            </div>
                        ))};
                    </div>
                )}
                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles",{
                    validate: (imageFiles)=>{
                        const totalLength=imageFiles.length +(exstingImageUrls?.length || 0);
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