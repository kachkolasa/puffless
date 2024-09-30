import { Redirect, Route } from 'react-router-dom';
import {IonApp, IonLoading, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { getDoc, doc, collection, orderBy, limit, query, getDocs } from '@firebase/firestore';
import { db } from '../firebase';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/globals.scss';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./redux/store";
import {useEffect, useState} from "react";
import {getCurrentUser} from "../firebase";
import {authSlice} from "./redux/slices/authSlice";
import {userSlice} from "./redux/slices/userSlice";

setupIonicReact();

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await getCurrentUser();

                if (currentUser) {
                    dispatch(authSlice.actions.login());
                } else {
                    dispatch(authSlice.actions.logout());
                }

                // Check if the user has completed KYC
                const userGoalDocRef = doc(db, 'userGoal', currentUser.uid);
                const userGoalDSnap = await getDoc(userGoalDocRef);
                if (userGoalDSnap.exists()) {
                    dispatch(userSlice.actions.setKYC(true));
                    dispatch(userSlice.actions.setUserGoal(userGoalDSnap.data()));
                } else {
                    dispatch(userSlice.actions.setKYC(false));
                }

                const userCigaretteRef = collection(db, 'userCigarette', currentUser.uid, 'cigarettes');
                const q = query(userCigaretteRef, orderBy('smokedAt', 'desc'), limit(1));
                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const lastCigaretteData = querySnapshot.docs[0].data();
                        dispatch(userSlice.actions.setLastCigarette(lastCigaretteData));
                    } else {
                        console.log('No cigarettes found.');
                    }
                } catch (error) {
                    console.error('Error fetching last cigarette: ', error);
                }

            } catch (error) {
                console.error('Error during authentication:', error);
            } finally {
                setIsAuthenticating(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    if(isAuthenticating){
        return <IonLoading message="Just a second..." duration={0} isOpen={true} />
    }

  return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route
                exact
                path="/"
                render={(props) => {
                  return isLoggedIn ? <Home /> : <Redirect to={"/login"} />;
                }}
            />
            <Route
                exact
                path="/login"
                render={(props) => {
                    return isLoggedIn ? <Redirect to={"/"} /> : <Login />;
                }}
            />
            <Route
                exact
                path="/register"
                render={(props) => {
                    return isLoggedIn ? <Redirect to={"/"} /> : <Register />;
                }}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  )
};

export default App;
