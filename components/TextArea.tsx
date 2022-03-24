import { styled } from "@/stitches.config";

export const TextArea = styled("textarea", {
  backgroundColor: "transparent",
  color: "$grey600",

  width: "40rem",
  height: "20rem",

  padding: "1.5rem",

  outline: "none",
  border: "2px solid grey",
  borderRadius: "10px",

  "&::placeholder": {
    fontFamily: "$sansSerif",
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
});
