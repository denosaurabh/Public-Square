import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { styled } from "@/stitches.config";
import { TextDefault } from "../Text";

interface ConstitutionProps {
  constitutions: string[];
}

const Constitution: React.FC<ConstitutionProps> = ({ constitutions }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <ConstitutionTriggerText>Constitution</ConstitutionTriggerText>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle css={{ color: "$grey100" }}>Constitution</DialogTitle>

        {/* <DialogClose /> */}

        <FlexDialogDescription>
          {constitutions?.length && (
            <>
              <ConstitutionText key={0}>{constitutions[0]}</ConstitutionText>
              <ConstitutionText key={1}>{constitutions[1]}</ConstitutionText>
              <ConstitutionText key={2}>{constitutions[2]}</ConstitutionText>
            </>
          )}
        </FlexDialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Constitution;

const FlexDialogDescription = styled(DialogDescription, {
  display: "flex",
});

const ConstitutionText = styled(TextDefault, {
  flex: 1,

  fontFamily: "$sansSerif",
  fontWeight: "500",
  fontSize: "1.6rem",
  color: "$grey200",

  padding: "1.5rem",
  margin: 0,

  borderRight: "1px solid $grey400",
});

const ConstitutionTriggerText = styled(TextDefault, {
  fontFamily: "$sansSerif",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "2rem",

  margin: 0,

  backgroundColor: "transparent !important",

  "&:hover": {
    cursor: "pointer",
  },
  // border: '1px solid grey',
});
