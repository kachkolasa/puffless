import {IonButton, useIonAlert} from "@ionic/react";
import {db, getCurrentUser} from "../../firebase";
import {doc, setDoc} from "@firebase/firestore";
import {useState} from "react";
import {userSlice} from "../redux/slices/userSlice";
import {useDispatch} from "react-redux";

const ISmoked = () => {
    const [presentAlert] = useIonAlert();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSmoked = async () => {
        setIsLoading(true);

        const currentUser = await getCurrentUser();
        const data = {
            uid: currentUser.uid,
            smokedAt: new Date().toISOString()
        };

        try{
            const docRef = doc(db, 'userCigarette', currentUser.uid);
            await setDoc(docRef, data);
            setIsLoading(false);
        } catch (error){
            console.error('Error saving smoke:', error);
            await presentAlert({
                header: 'Error',
                message: 'It looks like something went wrong just like your lungs. Please try again later.',
                buttons: ['OK'],
            });

            setIsLoading(false);
            return;
        }

        dispatch(userSlice.actions.setLastCigarette(data));

        await presentAlert({
            header: 'Smoked',
            message: 'Your cigarette has been recorded. You should be ashamed of yourself.',
            buttons: ['OK'],
        });
    }

    return (
        <IonButton color={"danger"} size={"large"} expand={"full"} shape={"round"} disabled={isLoading} onClick={handleSmoked}>
            <span className={"text-white"}>I Smoked!</span>
        </IonButton>
    );
}

export default ISmoked;