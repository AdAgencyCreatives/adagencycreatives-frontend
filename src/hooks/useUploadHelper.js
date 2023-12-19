import { useContext } from "react";

const useUploadHelper = () => {
    const defaultUploadGuides = {
        "image": {
            type: "image",
            maxSize: 1024 * 1024 * 8,
            maxSizeLabel: "8 MB",
            aspectRatio: "1:1",
            aspectRatioExamples: "For Example: 200x200, 400x400, 1024x1024 etc.",
            allowed: "image/*",
            allowedExamples: ".JPG, .GIF, .PNG, etc."
        },
        "video": {
            type: "video",
            maxSize: 1024 * 1024 * 32,
            maxSizeLabel: "32 MB",
            aspectRatio: "16:9 (horizontal), 9:16 (full portrait)",
            aspectRatioExamples: "For Example: 1280x720 pixels for Landscape and Portrait 720x1280, etc.",
            allowed: "video/*",
            allowedExamples: ".JPG, .GIF, .PNG, etc."
        },
        "file": {
            type: "file",
            maxSize: 1024 * 1024 * 8,
            maxSizeLabel: "16 MB",
            aspectRatio: "",
            aspectRationExamples: "",
            allowed: "application/*",
            allowedExamples: ".MP4, .MOV, .AVI, etc."
        }
    };

    const getUploadGuide = (key, page) => {
        
        return defaultUploadGuides[key];
    };

    return { defaultUploadGuides, getUploadGuide };
}

export default useUploadHelper;