import {IonCard, IonCardContent, IonCardTitle, IonHeader} from "@ionic/react";
import {useEffect, useState} from "react";
import { collection, query, where, getDocs, limit, orderBy, getCountFromServer } from '@firebase/firestore';
import { db, getCurrentUser } from '../../firebase';
import {useSelector} from "react-redux";

const TotalSmoked = () => {
    const totalSmoked = useSelector((state: any) => state.user.totalCigarettes);

    return (
        <>
            <IonCard className={"bg-red-600/[0.2] mt-0"}>
                <IonHeader className={"ion-padding"}>
                    <h3>🚬 Total Smoked</h3>
                </IonHeader>
                <IonCardContent>
                    <IonCardTitle>
                        {totalSmoked}
                    </IonCardTitle>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default TotalSmoked;