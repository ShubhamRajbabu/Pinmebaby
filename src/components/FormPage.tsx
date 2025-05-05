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
    // Regex pattern for validating image URLs (ends with image extensions like .jpg, .png, .jpeg)
    const imageUrlPattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        // Validate image URL
        if (!imageUrlPattern.test(imgUrl)) {
            toast.error("Please enter a valid image URL.");
            return;
        }
        try {
            createMarker({
                itemName: itemName,
                imageUrl: imgUrl,
                latitude: position[0],
                longitude: position[1],
            })
            setItemName("");
            setImgUrl("");
            toast.success(`${itemName} got added newly`);
            onSubmitSuccess();

        } catch (error) {
            toast.error("Couldn't add the marker. Please try again");
        }
    }

    return (
        <form onSubmit={handleSubmitForm} className="form-container">
            <input placeholder="Enter your item name" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ backgroundColor: "white", color: "black", height: "20px" }} />
            <input type="url" placeholder="upload your image url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} style={{ backgroundColor: "white", color: "black", height: "20px" }} pattern="https://.*" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default FormPage