import {IonCard, IonCardContent, IonCardTitle, IonHeader} from "@ionic/react";
import {useEffect, useState} from "react";
import { collection, query, where, getDocs, limit, orderBy, getCountFromServer } from '@firebase/firestore';
import { db, getCurrentUser } from '../../firebase';
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "../redux/slices/userSlice";

const MoneySaved = () => {
    const [totalSaved, setTotalSaved] = useState("$0.00");
    const [totalSpent, setTotalSpent] = useState("$0.00");
    const userGoal = useSelector((state: any) => state.user.userGoal);
    const lastCigarette = useSelector((state: any) => state.user.lastCigarette);

    const dispatch = useDispatch();

    useEffect(() => {
        const getFirstCigaretteDate = async () => {
            try {
                const currentUser = await getCurrentUser();
                const q = query(
                    collection(db, 'userCigarette', currentUser.uid, 'cigarettes'),
                    orderBy('smokedAt', 'asc'),
                    limit(1)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Get the first document from the query result
                    const firstDoc = querySnapshot.docs[0];
                    const firstCigaretteData = firstDoc.data();

                    return firstCigaretteData.smokedAt;
                } else {
                    console.log("No cigarettes found for this user.");
                }

            } catch (error) {
                console.error("Error fetching first cigarette date:", error);
            }

            return null;
        }

        const fetchTotalCigarettes = async () => {
            try {
                const currentUser = await getCurrentUser();
                const q = query(collection(db, 'userCigarette', currentUser.uid, 'cigarettes'));
                const snapshot = await getCountFromServer(q);
                const totalCig = snapshot.data().count;

                dispatch(userSlice.actions.setTotalCigarettes(totalCig));

                const costPerCigPack = userGoal.cost;

                let spend: number|string = (totalCig / 20) * costPerCigPack;
                spend = spend.toFixed(2);
                setTotalSpent(`$${spend}`);

                const firstCigaretteDate = await getFirstCigaretteDate();
                if (!firstCigaretteDate) {
                    return;
                }
                const lastCigaretteDate = lastCigarette?.smokedAt;
                if (!lastCigaretteDate) {
                    return;
                }

                // Get the days between the first and last cigarette
                const firstDate = new Date(firstCigaretteDate);
                const lastDate = new Date(lastCigaretteDate);
                const days = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
                dispatch(userSlice.actions.setTotalDays(days));

                // Calculate the total saved
                const potentialCig = days * (userGoal.initial - userGoal.goal);
                let saved: number|string = (potentialCig / 20) * costPerCigPack;
                saved = saved.toFixed(2);
                setTotalSaved(`$${saved}`);

            } catch (error) {
                console.error("Error fetching cigarette count:", error);
            }
        };

        fetchTotalCigarettes();
    }, [lastCigarette]);


    return (
        <>
            <div className={""}>
                <IonCard className={"bg-green-600/[0.2]"}>
                    <IonHeader className={"ion-padding"}>
                        <h3>💸 Money Saved</h3>
                    </IonHeader>
                    <IonCardContent>
                        <IonCardTitle>
                            {totalSaved}
                            <span className={"text-red-500 text-base"}> {totalSpent}</span>
                        </IonCardTitle>
                    </IonCardContent>
                </IonCard>
            </div>
        </>
    )
}

export default MoneySaved;