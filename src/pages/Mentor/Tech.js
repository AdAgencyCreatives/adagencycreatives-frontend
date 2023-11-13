import "../../styles/SingleMentor.scss";
import chatgptImg from "../../assets/images/screenshots/screenshot_38_https___chat_openai_com_auth_login_.png";
import magicEraserImg from "../../assets/images/screenshots/screenshot_39_https___magicstudio_com_magiceraser__.png";
import otterAiImg from "../../assets/images/screenshots/screenshot_40_https___otter_ai_.png";
import adobeFireflyImg from "../../assets/images/screenshots/Adobe.png";
import synthesiaImg from "../../assets/images/screenshots/screenshot_42_https___www_synthesia_io_.png";
import blenderImg from "../../assets/images/screenshots/screenshot_43_https___www_blender_org_.png";
import stableDiffusionImg from "../../assets/images/screenshots/Stable Diffusion Online - AI Image Generator.png";
import SingleMentorList from "../../components/SingleMentorList";

const Tech = () => {
  const items = [
    {
      title: "Chatgpt",
      subtitle: "Open AI",
      url: "https://chat.openai.com/auth/login",
      img: chatgptImg,
    },
    {
      title: "MAGIC ERASER",
      subtitle: "Remove parts of an image ",
      url: "https://magicstudio.com/magiceraser/",
      img: magicEraserImg,
    },
    {
      title: "OTTER AI",
      subtitle: "Transcribes audio to text ",
      url: "https://otter.ai",
      img: otterAiImg,
    },
    {
      title: "ADOBE FIREFLY",
      subtitle: "Generative AI  ",
      url: "https://www.adobe.com/sensei/generative-ai.html",
      img: adobeFireflyImg,
    },
    {
      title: "SYNTHESIA",
      subtitle: "AI text to video generator",
      url: "https://www.synthesia.io",
      img: synthesiaImg,
    },
    {
      title: "BLENDER",
      subtitle: "Video editing and animation",
      url: "https://www.blender.org",
      img: blenderImg,
    },
    {
      title: "STABLE DIFFUSION",
      subtitle: "AI text to Image generator",
      url: "https://stablediffusionweb.com",
      img: stableDiffusionImg,
    },
    {
      title: "Suggestions",
      subtitle: "Did we miss something? Please let us know.",
      url: "../contact",
    },
  ];

  return (
    <div className="dark-container page-single-mentor text-white mb-0 mt-4">
      <div className="container-fluid">
        <div className="mentor-wrapper">
          <h2 className="title">Tech</h2>
          <p className="subtitle">
            Collection of resources to follow the technology in our industry
            <br />
            Click on a topic below
          </p>
          <SingleMentorList items={items} />
        </div>
      </div>
    </div>
  );
};

export default Tech;
