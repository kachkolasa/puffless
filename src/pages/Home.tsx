import {
    IonButton,
    IonButtons, IonCard, IonCardContent,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import {getCurrentUser} from "../../firebase";
import {useSelector} from "react-redux";
import KYC from "../components/KYC";
import Timer from "../components/Timer";
import ISmoked from "../components/ISmoked";
import MoneySaved from "../components/MoneySaved";
import TotalSmoked from "../components/TotalSmoked";
import AvgPerDay from "../components/AvgPerDay";

const Home: React.FC = () => {
    const isKYCDone = useSelector((state: any) => state.user.isKYCDone);

    return (
    <>
        <Layout>
            {!isKYCDone && <KYC />}

            {isKYCDone && (
                <>
                    <Timer />
                    <ISmoked />
                    <MoneySaved />

                    <div className="grid grid-cols-2">
                        <TotalSmoked />
                        <AvgPerDay />
                    </div>

                    <IonText>
                        <p className={"mt-5 text-center text-gray-400 dark:text-gray-600"}>Built by Kachkol Asa for no absolute Reasons</p>
                    </IonText>
                </>
            )}

        </Layout>
    </>
    );
};

export default Home;
