import {
  IoChatbubbleEllipsesSharp,
  IoCameraSharp,
  IoImagesSharp,
  IoCloudDownloadSharp,
  IoVideocamSharp,
  IoVolumeHigh,
} from "react-icons/io5";

const CreatePost = () => {
  return (
    <div className="post-form">
      <div class="wall-options">
        <div class="wall-opts-item">
          <IoChatbubbleEllipsesSharp />
          <span>Status</span>
        </div>

        <div class="wall-opts-item">
          <IoCameraSharp />
          <span>Photo</span>
        </div>

        <div class="wall-opts-item">
          <IoImagesSharp />
          <span>GIF</span>
        </div>

        <div class="wall-opts-item">
          <IoCloudDownloadSharp />
          <span>File</span>
        </div>

        <div class="wall-opts-item">
          <IoVideocamSharp />
          <span>Video</span>
        </div>

        <div class="wall-opts-item">
          <IoVolumeHigh />
          <span>Audio</span>
        </div>

        <div class="wall-opts-item wall-opts-show-all">
          <div class="youzify-wall-form-show-all">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
