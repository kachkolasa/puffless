import {IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Puffless</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Puffless</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonText>Welcome onboard</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
