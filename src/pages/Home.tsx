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
                </>
            )}

        </Layout>
    </>
  );
};

export default Home;
