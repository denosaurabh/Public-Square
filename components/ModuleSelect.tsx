import { Amount, Module, ModulesI } from "@/contratcts";
import { styled } from "@/stitches.config";
import { ChangeEvent } from "react";
import Input from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "./Select";
import { BoldText, LightSansSerifText } from "./Text";

export interface ModuleSelectProps {
  name: "Collect" | "Reference";
  modules: ModulesI;
  value: Module;
  onSelectChange: (value: string) => void;
  onInputChange: (e: any, name: string, key: string, innerKey: string) => void;
  inputValues: { [key: string]: Amount } | {};
}

export const ModuleSelect: React.FC<ModuleSelectProps> = ({
  name,
  modules,
  value,
  onSelectChange,
  onInputChange,
  inputValues,
}) => {
  return (
    <ModuleBox>
      <BoldText>{name} Module</BoldText>
      <LightSansSerifText>
        This is a {name} module. Here you can add any functionality to when
        someone tries to {name} this post
      </LightSansSerifText>

      <Select
        defaultValue={value.address}
        value={value.address}
        onValueChange={onSelectChange}>
        <SelectTrigger css={{ width: "40rem", marginBottom: "3rem" }}>
          <SelectValue>{value.name}</SelectValue>
        </SelectTrigger>

        <SelectContent css={{ width: "40rem" }}>
          <SelectViewport>
            {Object.values(modules).map((module, i) => {
              const { name, address } = module;

              return (
                <SelectItem value={address} key={name}>
                  <SelectItemText>{name}</SelectItemText>
                </SelectItem>
              );
            })}
          </SelectViewport>
        </SelectContent>
      </Select>

      <LightSansSerifText>{value.message}</LightSansSerifText>

      <ModuleInputs>
        {typeof value.dataType === "object" ? (
          <>
            {Object.keys(value.dataType).map((key: string, i, arr) => {
              if (typeof value.dataType[`${key}`] === "object") {
                const vals = Object.keys(value.dataType[`${key}`]).map(
                  (innerKey: string, innerI, innerArr) => {
                    return (
                      <LineInput
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onInputChange(e, name, key, innerKey)
                        }
                        name={innerKey}
                        key={innerI}
                        type={value.dataType[key][innerKey].toLowerCase()}
                        placeholder={innerKey}
                        value={inputValues[name][key][innerKey]}
                        required
                      />
                    );
                  }
                );

                return vals;
              }

              if (typeof value.dataType[`${key}`] === "string") {
                return (
                  <LineInput
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e, name, key)
                    }
                    key={key}
                    type={value.dataType[key].toLowerCase()}
                    placeholder={key}
                    value={inputValues[name][key]}
                    required
                  />
                );
              }

              // return <Input key={i} type="" />;
            })}
          </>
        ) : (
          <></>
        )}
      </ModuleInputs>
    </ModuleBox>
  );
};

const ModuleBox = styled("div", {});

const LineInput = styled(Input, {
  border: "1px solid $grey300",
  borderRadius: 0,
  color: "$grey600",
});

const ModuleInputs = styled("form", {
  marginBottom: "6rem",
});
