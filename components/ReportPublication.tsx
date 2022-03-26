import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { styled } from "@/stitches.config";
import { TextDefault } from "@/components/Text";
import { StatsItem } from "./Post";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "@/components/Select";

import WarningSvg from "@/icons/warning.svg";
import { H1 } from "./Heading";

interface ReportPublicationProps {
  publicationId: string;
}

const ReportPublication: React.FC<ReportPublicationProps> = ({
  publicationId,
}) => {
  const onSelectValChange = (val: string) => {
    if (val) {
      console.log(val);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <StatsItem css={{ width: "fit-content" }}>Report Publication</StatsItem>
      </DialogTrigger>

      <DialogContent css={{ width: "50rem" }}>
        <DialogTitle css={{ color: "$grey100" }}>
          Report Publication
        </DialogTitle>

        {/* <DialogClose /> */}

        <FlexDialogDescription></FlexDialogDescription>

        <Select
          defaultValue={"SENSITIVE"}
          value={"SENSITIVE"}
          onValueChange={onSelectValChange}>
          <SelectTrigger css={{ minWidth: "20rem", textAlign: "center" }}>
            <SelectValue>{"SENSITIVE"}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectViewport>
              <SelectItem value={"SENSITIVE"}>
                <SelectItemText>Post</SelectItemText>
              </SelectItem>
              <SelectItem value={"ILLEGAL"}>
                <SelectItemText>Subject</SelectItemText>
              </SelectItem>
              <SelectItem value={"FRAUD"}>
                <SelectItemText>Dsicussion</SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPublication;

const FlexDialogDescription = styled(DialogDescription, {
  display: "flex",
  flexDirection: "column",

  gap: "1rem",
});
