import { useContext } from "react";

const useUploadHelper = () => {
    const defaultUploadGuides = {
        "image": {
            type: "image",
            maxSize: 1024 * 1024 * 6,
            maxSizeLabel: "8 MB",
            aspectRatio: "1:1",
            aspectRatioLabel: "200x200, 400x400, 1024x1024 etc.",
            acceptTypes: "image/*",
            acceptTypesLabel: ".JPG, .GIF, .PNG, etc.",
        },
        "video": {
            type: "video",
            maxSize: 1024 * 1024 * 12,
            maxSizeLabel: "32 MB",
            aspectRatio: "16:9 (horizontal), 9:16 (full portrait)",
            aspectRatioLabel: "1280x720 pixels for Landscape and Portrait 720x1280, etc.",
            acceptTypes: "video/*",
            acceptTypesLabel: ".MP4, .MOV, .AVI, etc.",
        },
        "application": {
            type: "application",
            maxSize: 1024 * 1024 * 16,
            maxSizeLabel: "16 MB",
            aspectRatio: "",
            aspectRatioLabel: "",
            acceptTypes: "application/*",
            acceptTypesLabel: ".DOC, .DOCX, .PDF, .TXT etc.",
        }
    };

    const getUploadGuide = (key, page) => {
        let result = defaultUploadGuides[key];

        // if (page == "lounge") {
        //     if (key == 'image') {
        //         let unit = 8;
        //         result = {
        //             ...result,
        //             maxSize: 1024 * 1024 * unit,
        //             maxSizeLabel: "" + unit + " MB",
        //         };
        //     } else if (key == 'video') {
        //         let unit = 32;
        //         result = {
        //             ...result,
        //             maxSize: 1024 * 1024 * unit,
        //             maxSizeLabel: "" + unit + " MB",
        //         };
        //     }
        // }

        return result;
    };

    const isFileValid = (file, type, page) => {

        let isTypeValid = file.type.indexOf(type) >= 0;

        if (!isTypeValid) {
            return { status: false, message: "The file selected is expected to be of type: " + type };
        }

        let uploadGuide = getUploadGuide(type, page);

        let sizeLimit = uploadGuide.maxSize;
        let sizeLimitLabel = uploadGuide.maxSizeLabel;

        let fileSize = file.size;

        if (fileSize > sizeLimit) {
            return { status: false, message: "The selected file must be less than or equal to " + sizeLimitLabel };
        }

        return { status: true, message: "Validation Sucessful" };
    };

    const getUploadGuideMessage = (uploadGuide) => {
        return "Upload Guidelines:" + "<br />\n"
            + (uploadGuide.maxSizeLabel ? "Max Size: " + uploadGuide.maxSizeLabel + "<br />\n" : "")
            + (uploadGuide.aspectRatio ? "Aspect Ratio: " + uploadGuide.aspectRatio + "<br />\n" : "")
            + (uploadGuide.aspectRatioLabel ? "For Example: " + uploadGuide.aspectRatioLabel + "<br />\n" : "")
            + (uploadGuide.acceptTypesLabel ? "Accept Types: " + uploadGuide.acceptTypesLabel + "<br />\n" : "");
    };

    return { defaultUploadGuides, isFileValid, getUploadGuide, getUploadGuideMessage };
}

export default useUploadHelper;