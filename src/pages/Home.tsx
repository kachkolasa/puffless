import {
    IonButtons,
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

const Home: React.FC = () => {
    const isKYCDone = useSelector((state: any) => state.user.isKYCDone);

  return (
    <>
        <Layout>
            {isKYCDone && (
                <IonText>This is the home page.</IonText>
            )}

            {!isKYCDone && <KYC />}
        </Layout>
    </>
  );
};

export default Home;
