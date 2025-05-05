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

    const isImageLoadable = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const canLoad = await isImageLoadable(imgUrl);
        if (!canLoad) {
            toast.error("Invalid or inaccessible image URL");
            return;
        }

        try {
            const response = await createMarker({
                itemName: itemName,
                imageUrl: imgUrl,
                latitude: position[0],
                longitude: position[1],
            });
            if (response) {
                toast.success(`${itemName} got added successfully`);
            }
            setItemName("");
            setImgUrl("");
            onSubmitSuccess(); // close popup or update map
        } catch (error) {
            toast.error("Failed to add marker. Please try again.");
        }
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