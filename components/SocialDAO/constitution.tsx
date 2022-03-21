import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { styled } from "@/stitches.config";
import { Text } from "../Text";

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
        <DialogTitle>Constitution</DialogTitle>

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

const ConstitutionText = styled(Text, {
  flex: 1,

  fontFamily: "$sansSerif",
  fontWeight: "500",
  fontSize: "1.9rem",

  padding: "1.5rem",
  margin: 0,

  border: "1px solid grey",
});

const ConstitutionTriggerText = styled(Text, {
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
