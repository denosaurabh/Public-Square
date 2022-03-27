import { styled } from "@/stitches.config";
import { getIPFSUrlCID } from "@/utils";

interface MediaProps {
  mediaArr: object[];
}

const Media: React.FC<MediaProps> = ({ mediaArr }) => {
  if (!mediaArr?.length) return <></>;

  return (
    <MediaContainer>
      {mediaArr.map((media, index) => {
        if (media?.original.mimeType === "video/mp4") {
          return <Video {...media?.original} key={index} />;
        } else if (media?.original.mimeType === "image/gif") {
          return <Image {...media?.original} key={index} />;
        } else if (media?.original.mimeType === "image/jpg") {
          return <Image {...media?.original} key={index} />;
        } else if (media?.original.mimeType === "image/png") {
          return <Image {...media?.original} key={index} />;
        }

        return <></>;
      })}
    </MediaContainer>
  );
};

export default Media;

interface MediaProps {
  url: string;
  type: string;
}

const Video: React.FC<MediaProps> = ({ mimeType, url }) => {
  console.log(mimeType, url);

  let httpUrl = url;

  if (url.startsWith("ipfs://")) {
    const cid = getIPFSUrlCID(url);
    httpUrl = `https://ipfs.io/ipfs/${cid}`;
  }

  return (
    <VideoStyled controls>
      <source src={httpUrl + ".gif"} type={mimeType} />
    </VideoStyled>
  );
};

const Image: React.FC<MediaProps> = ({ mimeType, url }) => {
  console.log(mimeType, url);

  let httpUrl = url;

  if (url.startsWith("ipfs://")) {
    const cid = getIPFSUrlCID(url);
    httpUrl = `https://ipfs.io/ipfs/${cid}`;
  }

  return <ImageStyled src={httpUrl} width={300} height={300} />;
};

const MediaContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "2rem",

  width: "100%",
  height: "fit-content",
});

const VideoStyled = styled("video", {
  width: "90%",
  height: "auto",
});

const ImageStyled = styled("img", {
  width: "90%",
  height: "auto",
});
