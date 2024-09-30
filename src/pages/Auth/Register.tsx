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
    IonToolbar, useIonAlert
} from '@ionic/react';
import {Link} from "react-router-dom";
import {register} from "../../../firebase";
import {authSlice} from "../../redux/slices/authSlice";
import {useDispatch} from "react-redux";

const Login: React.FC = () => {
    const [presentAlert] = useIonAlert();

    const dispatch = useDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cpassword = formData.get("cpassword") as string;
        const name = formData.get("name") as string;

        if (password !== cpassword) {
            await presentAlert({
                header: 'Password Mis-match',
                message: 'The passwords you entered do not match.',
                buttons: ['OK'],
            });
            return;
        }

        // All fields are required
        if (!name || !email || !password || !cpassword) {
            await presentAlert({
                header: 'Missing Fields',
                message: 'All fields are required.',
                buttons: ['OK'],
            });
            return;
        }

        // Register the user
        const res = await register(name, email, password);
        if (!res.status) {
            let errorMessage = 'An error occurred.';
            let errorTitle = 'Registration Failed';

            // @ts-ignore
            if(res.error?.code === "auth/invalid-email"){
                errorMessage = 'The email you entered is invalid.';
                errorTitle = 'Invalid Email';
            }

            // @ts-ignore
            if(res.error?.code === "auth/email-already-in-use"){
                errorMessage = 'The email you entered is already in use.';
                errorTitle = 'Email Already In Use';
            }

            // @ts-ignore
            if(res.error?.code === "auth/weak-password"){
                errorMessage = 'The password you entered is too weak.';
                errorTitle = 'Weak Password';
            }

            await presentAlert({
                header: errorTitle,
                message: errorMessage,
                buttons: ['OK'],
            });

            return;
        }

        dispatch(authSlice.actions.login());

        await presentAlert({
            header: 'Registration Successful',
            message: 'You have successfully registered.',
            buttons: ['OK'],
        });
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className={"h-screen w-full flex items-center justify-center"}>
                    <IonCard className={"w-full max-w-[350px] rounded py-3"}>
                        <IonCardHeader>
                            <IonCardTitle className={"text-center"}>Register</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <form action="" method={"post"} onSubmit={handleSubmit}>
                                <IonList>
                                    <IonItem>
                                        <IonInput labelPlacement="floating" name={"name"} type={"text"}
                                                  label={"Display Name"}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput labelPlacement="floating" name={"email"} type={"email"}
                                                  label={"Email"}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput labelPlacement="floating" name={"password"} label={"Password"}
                                                  type={"password"}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput labelPlacement="floating" name={"cpassword"}
                                                  label={"Confirm Password"} type={"password"}></IonInput>
                                    </IonItem>
                                </IonList>

                                <IonButton shape="round" type={"submit"} expand={"full"}>Sign In</IonButton>
                                <IonText>
                                    Already have an account? <IonText color={"primary"}><Link to={"/login"}>Click here
                                    to login</Link></IonText>
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
