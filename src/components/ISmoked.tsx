import {IonButton, useIonAlert} from "@ionic/react";
import {db, getCurrentUser} from "../../firebase";
import {doc, setDoc, addDoc, collection} from "@firebase/firestore";
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
            smokedAt: new Date().toISOString(),
        };

        try {
            // Use addDoc to add a new document to the 'userCigarette' collection
            const docRef = collection(db, 'userCigarette', currentUser.uid, 'cigarettes');
            await addDoc(docRef, data);
            setIsLoading(false);

            // Dispatch the action to update the last cigarette in the Redux store
            dispatch(userSlice.actions.setLastCigarette(data));

            // Show success alert
            await presentAlert({
                header: 'Smoked',
                message: 'Your cigarette has been recorded.',
                buttons: ['OK'],
            });

        } catch (error) {
            console.error('Error saving smoke:', error);
            await presentAlert({
                header: 'Error',
                message: 'It looks like something went wrong just like your lungs. Please try again later.',
                buttons: ['OK'],
            });

            setIsLoading(false);
            return;
        }
    };

    return (
        <IonButton color={"danger"} size={"large"} expand={"full"} shape={"round"} disabled={isLoading} onClick={handleSmoked}>
            <span className={"text-white"}>I Smoked!</span>
        </IonButton>
    );
}

export default ISmoked;