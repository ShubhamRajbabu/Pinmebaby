import { useMutation } from "convex/react";
import { useState } from "react"
import { api } from "../../convex/_generated/api";
import { toast } from 'react-toastify';

const FormPage = ({ position, onSubmitSuccess }: {
    position: [number, number];
    onSubmitSuccess: () => void;
}) => {
    const createMarker = useMutation(api.markers.createMarker);
    const [itemName, setItemName] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const isValidImageUrl = (url: string) => {
        const imagePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
        return imagePattern.test(url);
    };

    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        if (!isValidImageUrl(imgUrl)) {
            toast.error("Please enter a valid image URL (jpg, jpeg, png, etc.)");
            return;
        }

        // Proceed with submitting the form data
        createMarker({
            itemName: itemName,
            imageUrl: imgUrl,
            latitude: position[0],
            longitude: position[1],
        });
        setItemName("");
        setImgUrl("");
        onSubmitSuccess();
        toast.success(`${itemName} got added successfully`);
    };



    return (
        <form onSubmit={handleSubmitForm} className="form-container">
            <input placeholder="Enter your item name" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ backgroundColor: "white", color: "black", height: "20px" }} />
            <input type="url" placeholder="upload your image url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} style={{ backgroundColor: "white", color: "black", height: "20px" }} pattern="https://.*" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default FormPage