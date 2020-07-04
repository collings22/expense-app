import React from 'react';
import {
  IonFab, IonFabButton, IonIcon
} from '@ionic/react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar
} from '@ionic/react';
import Gallery from '../components/Gallery';
import ExpenseTotal from '../components/ExpenseTotal';


interface ContainerProps { }

const Camera: React.FC<ContainerProps> = () => {
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <div className="container">
            <IonContent>
        <Gallery />
      </IonContent>

      <IonContent>
        <ExpenseTotal />
      </IonContent>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
    </div>
  );
};

export default Camera;
