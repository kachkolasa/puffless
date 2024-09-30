import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonIcon,
    IonInput, useIonAlert,
} from "@ionic/react";
import {cashOutline} from "ionicons/icons";
import { setDoc, doc } from '@firebase/firestore';
import {db, getCurrentUser} from '../../firebase';
import {useDispatch} from "react-redux";
import {userSlice} from "../redux/slices/userSlice";

const KYC = () => {
    const [presentAlert] = useIonAlert();

    const dispatch = useDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initial = formData.get("initial") as string;
        const goal = formData.get("goal") as string;
        const cost = formData.get("cost") as string;

        if(!initial || !goal || !cost){
            await presentAlert({
                header: 'Invalid Data',
                message: 'Please enter all the fields.',
                buttons: ['OK'],
            });

            return
        }

        if(parseInt(initial) <= parseInt(goal)){
            await presentAlert({
                header: 'Invalid Data',
                message: 'Your goal should be less than your current cigarette consumption.',
                buttons: ['OK'],
            });

            return
        }

        try{
            const currentUser = await getCurrentUser();
            const docRef = doc(db, 'userGoal', currentUser.uid);
            await setDoc(docRef, {
                uid: currentUser.uid,
                initial: parseInt(initial),
                goal: parseInt(goal),
                cost: parseFloat(cost),
                updatedAt: new Date().toISOString()
            });
        } catch (error){
            console.error('Error saving user goals:', error);
            await presentAlert({
                header: 'Error',
                message: 'An error occurred while saving your goals. Please try again later.',
                buttons: ['OK'],
            });

            return;
        }

        dispatch(userSlice.actions.setKYC(true));

        await presentAlert({
            header: 'Success',
            message: 'Your goals have been saved successfully.',
            buttons: ['OK'],
        });
    }

    return (
        <div>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        Let's get started!
                    </IonCardTitle>
                    <IonCardSubtitle>
                        Please enter your goals and some information to being with.
                    </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent className={"space-y-2"}>
                    <form action="" method={"post"} onSubmit={handleSubmit}>
                        <IonInput name={"initial"} labelPlacement="floating" type={"number"} label={"Current Cigarette Per Day"} helperText={"How much cigarette you smoke a day"}></IonInput>
                        <IonInput name={"goal"} labelPlacement="floating" type={"number"} label={"Goal"} helperText={"Since carving can be difficult to handle, you might want to start with less cigarette per day then directly avoiding it. Enter a as much low number as you can."}></IonInput>
                        <IonInput name={"cost"} labelPlacement="floating" step={"0.1"} type={"number"} label={"Cigarette Cost"} helperText={"How much a packet of your cigarette costs? (OMR)"}>
                            <IonIcon slot={"start"} icon={cashOutline} />
                        </IonInput>

                        <IonButton expand={"block"} type={"submit"}>Submit</IonButton>
                    </form>
                </IonCardContent>
            </IonCard>
        </div>
    )
}

export default KYC;