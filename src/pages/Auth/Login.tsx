import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader, IonInput, IonItem, IonList, IonNavLink,
    IonPage, IonText,
    IonTitle,
    IonToolbar, useIonAlert, useIonToast
} from '@ionic/react';
import Register from "./Register";
import {Link, useHistory} from "react-router-dom";
import {getCurrentUser, login} from "../../../firebase";
import {useDispatch} from "react-redux";
import {authSlice} from "../../redux/slices/authSlice";

const Login: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const history = useHistory();

    const dispatch = useDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const loggedIn = await login(email, password);
        if(!loggedIn) {
            await presentAlert({
                header: 'Invalid Credentials',
                message: 'The email or password you entered is incorrect.',
                buttons: ['OK'],
            })

            return;
        }

        dispatch(authSlice.actions.login());

        history.push('/');
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className={"h-screen w-full flex items-center justify-center"}>
                    <IonCard className={"w-full max-w-[350px] rounded py-3"}>
                        <IonCardHeader>
                            <IonCardTitle className={"text-center"}>Login</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <form action="" method={"post"} onSubmit={handleSubmit}>
                                <IonList>
                                    <IonItem>
                                        <IonInput name={"email"} labelPlacement="floating" type={"email"} label={"Email"}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput name={"password"} labelPlacement="floating" label={"Password"} type={"password"}></IonInput>
                                    </IonItem>
                                </IonList>

                                <IonButton type={"submit"} shape="round" expand={"full"}>Sign In</IonButton>
                                <IonText>
                                    Don't have an account? <IonText color={"primary"}><Link to={"/register"}>Click here to register</Link></IonText>
                                </IonText>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
