import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {powerOutline} from "ionicons/icons";
import {logout} from "../../firebase";
import {useDispatch} from "react-redux";
import {authSlice} from "../redux/slices/authSlice";

const Layout = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await logout();
        dispatch(authSlice.actions.logout());
    }

    return (
        <>
            {/*<IonMenu contentId="main-content">*/}
            {/*    <IonHeader>*/}
            {/*        <IonToolbar>*/}
            {/*            <div className="flex items-center justify-between pr-5">*/}
            {/*                <IonTitle>Menu</IonTitle>*/}
            {/*                <IonButtons slot="end">*/}
            {/*                    <IonIcon icon={powerOutline} className={"text-xl cursor-pointer"} onClick={handleLogout}></IonIcon>*/}
            {/*                </IonButtons>*/}
            {/*            </div>*/}
            {/*        </IonToolbar>*/}
            {/*    </IonHeader>*/}
            {/*    <IonContent className="ion-padding">This is the menu content.</IonContent>*/}
            {/*</IonMenu>*/}
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        {/*<IonButtons slot="start">*/}
                        {/*    <IonMenuButton></IonMenuButton>*/}
                        {/*</IonButtons>*/}
                        <IonTitle>Puffless</IonTitle>
                        <IonIcon icon={powerOutline} className={"text-xl cursor-pointer mr-5"} slot={"end"} onClick={handleLogout}></IonIcon>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {children}
                </IonContent>
            </IonPage>
        </>
    );
};

export default Layout;
