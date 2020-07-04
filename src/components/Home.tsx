import React, { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonInput, IonLabel, IonItem
} from '@ionic/react';

const Home: React.FC = () => {
  const { photos, takePhoto, updateExpense } = usePhotoGallery();
  let [expense, setExpense] = useState(0);

  function updateChange(e: any) {
    setExpense(parseFloat(e.value));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expense App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="5" key={index}>
                <IonImg src={photo.base64 ?? photo.webviewPath} />
                  <IonLabel>Timestamp: {photo.timestamp}</IonLabel>

                  <IonItem>
                    <IonLabel>Enter expense: £</IonLabel>
                    <IonInput type="number" step="0.01" min="0" placeholder={photo.expense} onPointerLeave={e => updateChange(e.target)}></IonInput>
                    <a type="btn" onClick={e => updateExpense(photo.filepath, expense)}>Update</a>
                  </IonItem> 
                         
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonContent>
        <IonTitle>
          Expense Total: £{photos.reduce(
          (accumulator, currentValue) => parseFloat(accumulator.toString()) + parseFloat(currentValue.expense)
          , 0
        )}
        </IonTitle>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
