import {Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from '@/components/Dialog'
import { styled } from '@/stitches.config';
import { Text } from '../Text';

interface ConstitutionProps {
    constituion: string[]
}

const Constitution: React.FC<ConstitutionProps> = ({ constitutions }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <ConstitutionTriggerText>
                    Constitution
                </ConstitutionTriggerText>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Constitution
                </DialogTitle>

                {/* <DialogClose /> */}

                <FlexDialogDescription>
                        <ConstitutionText key={0}>
                            {constitutions[0]}
                            The Cold War was a period of geopolitical tension between the United States and the Soviet Union and their respective allies, the Western Bloc and the Eastern Bloc, which began following World War II. Historians do not fully agree on its starting and ending points, but the period is generally considered to span the 1947 Truman Doctrine (12 March 1947) to the 1991 dissolution of the Soviet Union (26 December 1991).[1] The term cold war is used because there was no 
                            </ConstitutionText>
                        <ConstitutionText key={1}>{constitutions[1]}
                        large-scale fighting directly between the two superpowers, but they each supported major regional conflicts known as proxy wars. The conflict was based around the ideological and geopolitical struggle for global influence by these two superpowers, following their temporary alliance and victory against Nazi Germany in 1945.[2] Aside from the nuclear arsenal development and conventional military deployment, the struggle for dominance was expressed via indirect means such as psychological warfare, propaganda campaigns, espionage, far-reaching embargoes, rivalry at sports events and technological competitions such as the Space Race.
                        </ConstitutionText>
                        <ConstitutionText key={2}>{constitutions[2]}
                        The Western Bloc was led by the United States as well as the other First World nations of the Western Bloc that were generally liberal democratic but tied to a network of the authoritarian states, most of which were their former colonies.[3][A] The Eastern Bloc was led by the Soviet Union and its Communist Party, which had an influence across the Second World and was also tied to a network of authoritarian states. The US government supported anti-communist governments and uprisings across 
                        </ConstitutionText>
                </FlexDialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default Constitution;

const FlexDialogDescription = styled(DialogDescription, {
    display: 'flex',
})

const ConstitutionText = styled(Text, {
    flex: 1,
    
    fontFamily: "$sansSerif",
    fontWeight: "500",
    fontSize: "1.9rem",

    padding: '1.5rem',
    margin: 0,
  
    border: '1px solid grey',
});

const ConstitutionTriggerText = styled(Text, {
    fontFamily: "$sansSerif",
    fontWeight: "700",
    fontStyle: "italic",
    fontSize: "2rem",

    margin: 0,

    backgroundColor: 'transparent',
  
    '&:hover': {
        cursor: 'pointer'
    }
    // border: '1px solid grey',
})

