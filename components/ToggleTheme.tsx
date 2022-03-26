import { darkTheme, styled } from "@/stitches.config";

import SunSvg from "@/icons/sun.svg";
import MoonSvg from "@/icons/moon.svg";

import { useObservable } from "@/stores";
import { SettingsStore } from "@/stores/SettingsStore";
import { useEffect } from "react";

const ThemeButton: React.FC = () => {
  // const settingsStore = useStore(SettingsStore);
  const theme = useObservable(SettingsStore.theme);

  useEffect(() => {
    if (!window) return;

    SettingsStore.updateFromLocalStorage();
  }, []);

  return (
    <ThemeSvgContainer>
      {theme === "dark" ? (
        <SunSvg onClick={() => SettingsStore.toggleTheme()} />
      ) : (
        <MoonSvg onClick={() => SettingsStore.toggleTheme()} />
      )}
    </ThemeSvgContainer>
  );
};

export default ThemeButton;

const ThemeSvgContainer = styled("button", {
  backgroundColor: "transparent",
  transition: "all 150ms",

  margin: "0 1rem",

  "& svg": {
    fill: "$grey500",

    [`.${darkTheme} &`]: {
      stroke: "$grey500",
    },
  },

  "&:hover": {
    cursor: "pointer",
  },
});
