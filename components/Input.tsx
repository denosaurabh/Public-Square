import { styled } from "@/stitches.config";

const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  fontSize: "$sm",

  width: "auto",
});

const InputLabel = styled("label", {
  fontFamily: "$main",
  color: "$grey500",
  fontSize: "1.4rem",
  marginBottom: "0.8rem",

  svg: {
    fill: "$grey-800",
  },

  "&:hover": {
    cursor: "pointer",
  },

  variants: {
    size: {
      mini: {
        fontSize: "1.2rem",
      },
    },
  },
});

const StyledInput = styled("input", {
  width: "100%",

  fontFamily: "$inter",
  fontSize: "inherit",

  padding: "1.6rem 1.5rem",

  backgroundColor: "transparent",
  color: "$grey600",

  border: "1px solid $grey-700",
  borderRadius: "0.8rem",

  "&::placeholder": {
    color: "$grey500",
  },

  variants: {
    size: {
      mini: {
        fontSize: "1.4rem",
        padding: "1rem",
      },
    },
  },
});

interface InputI {
  size?: "mini";
  label?: string | JSX.Element;
  css?: Record<string, any>;
  [key: string]: unknown;
}

const Input: React.FC<InputI> = ({ size, label, css, ...inputProps }) => {
  return (
    <InputContainer css={css}>
      {label ? (
        <InputLabel htmlFor="input" size={size}>
          {label}
        </InputLabel>
      ) : null}
      <StyledInput id="input" size={size} {...inputProps} />
    </InputContainer>
  );
};

export default Input;
