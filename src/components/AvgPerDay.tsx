import {IonCard, IonCardContent, IonCardTitle, IonHeader} from "@ionic/react";
import {useEffect, useState} from "react";
import { collection, query, where, getDocs, limit, orderBy, getCountFromServer } from '@firebase/firestore';
import { db, getCurrentUser } from '../../firebase';
import {useSelector} from "react-redux";

const AvgPerDay = () => {
    const totalSmoked = useSelector((state: any) => state.user.totalCigarettes);
    const totalDays = useSelector((state: any) => state.user.totalDays);
    const userGoal = useSelector((state: any) => state.user.userGoal);

    const avgPerDay = (totalSmoked / totalDays).toFixed(1);

    let color = "indigo";
    if(avgPerDay > userGoal.goal){
        color = "red";
    } else if(avgPerDay < userGoal.goal){
        color = "green";
    }

    return (
        <>
            <IonCard className={`bg-${color}-600/[0.2] mt-0`}>
                <IonHeader className={"ion-padding"}>
                    <h3>🚬 Avg Per Day</h3>
                </IonHeader>
                <IonCardContent>
                    <IonCardTitle>
                        {avgPerDay}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default AvgPerDay;