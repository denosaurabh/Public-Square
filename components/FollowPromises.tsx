import { styled } from "@/stitches.config";
import { Button } from "./Button";
import { TextDefault } from "./Text";

const FollowPromises = (props: any) => {
  return (
    <PromisesContainer>
      <PromiseBox>
        <TextDefault font="sansSerif">
          World War II is generally considered to have begun on 1 September
          1939, when Nazi Germany, under Adolf Hitler, invaded Poland. The
          United Kingdom and France subsequently declared war on Germany on 3
          September. Under the Molotov–Ribbentrop Pact of August 1939, Germany
          and the Soviet Union had partitioned Poland and marked out their
          spheres of influence across Finland, Estonia, Latvia, Lithuania and
          Romania. From late 1939 to early 1941, in a series of campaigns and
          treaties, Germany conquered or controlled much of continental Europe,
          and formed the Axis alliance with Italy and Japan (along with other
          countries later on). Following the onset of campaigns in North Africa
          and East Africa, and the fall of France in mid-1940.
        </TextDefault>

        <FollowButton>Follow</FollowButton>
      </PromiseBox>
      <PromiseBox>
        <TextDefault font="sansSerif">
          World War II or the Second World War, often abbreviated as WWII or
          WW2, was a global war that lasted from 1939 to 1945. It involved the
          vast majority of the worlds countries—including all of the great
          powers—forming two opposing military alliances: the Allies and the
          Axis powers. In a total war directly involving more than 100 million
          personnel from more than 30 countries, the major participants threw
          their entire economic, industrial, and scientific capabilities behind
          the war effort, blurring the distinction between civilian and military
          resources. Aircraft played a major role in the conflict, enabling the
          strategic bombing of population centres and the only two uses of
          nuclear weapons in war. World War II was by far the deadliest conflict
          in human history; it resulted in 70 to 85 million fatalities, a
          majority being civilians. Tens of millions of people died due to
          genocides (including the Holocaust), starvation, massacres, and
          disease. In the wake of the Axis defeat, Germany and Japan were
          occupied, and war crimes tribunals were conducted against German and
          Japanese leaders.{" "}
        </TextDefault>

        <FollowButton>Follow</FollowButton>
      </PromiseBox>
      <PromiseBox>
        <TextDefault font="sansSerif">
          The war in Europe concluded with the liberation of German-occupied
          territories, and the invasion of Germany by the Western Allies and the
          Soviet Union, culminating in the fall of Berlin to Soviet troops,
          Hitlers suicide and the German unconditional surrender on 8 May 1945.
          Following the Potsdam Declaration by the Allies on 26 July 1945 and
          the refusal of Japan to surrender on its terms, the United States
          dropped the first atomic bombs on the Japanese cities of Hiroshima, on
          6 August, and Nagasaki, on 9 August. Faced with an imminent invasion
          of the Japanese archipelago, the possibility of additional atomic
          bombings, and the Soviets declared entry into the war against Japan on
          the eve of invading Manchuria, Japan announced on 15 August its
          intention to surrender, then signed the surrender document on 2
          September 1945, cementing total victory in Asia for the Allies.
        </TextDefault>

        <FollowButton>Follow</FollowButton>
      </PromiseBox>
    </PromisesContainer>
  );
};

export default FollowPromises;

const PromisesContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  border: "1px solid $grey300",
  borderRadius: "14px",

  margin: "5rem 0",

  width: "100%",
  height: "max-content",
});

const PromiseBox = styled("div", {
  flex: 1,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  minHeight: "100%",

  padding: "1.5rem",
  borderRight: "1px solid #D3D3D3",

  p: {
    fontSize: "1.6rem",
    marginBottom: "4rem",
  },

  "&:last-child": {
    border: "none",
  },
});

const FollowButton = styled(Button, {
  // marginTop: "auto",
  width: "100%",
});
