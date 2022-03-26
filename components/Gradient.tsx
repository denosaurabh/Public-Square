import { styled } from "@/stitches.config";

const Gradient = styled("div", {
  position: "absolute",
  top: "40rem",
  left: "40rem",

  width: "400px",
  height: "400px",

  borderRadius: "50%",

  opacity: 0.9,

  backgroundImage: "radial-gradient(#f6d365 0%, #fda085 100%)",

  //   backgroundImage:
  //     "radial-gradient(40.23% 40.23% at 50% 50%, #fda085 52.37%, transparent 100%)",

  zIndex: -1,
});

export default Gradient;
