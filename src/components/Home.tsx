import React, { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonInput, IonLabel, IonItem, IonButton, IonText, IonCard, IonCardContent
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
      <IonCard>
        <IonCardContent>
          <IonText>Enter expenses into the input fields and use the update button to log how much is claimable against that receipt.</IonText>
          <IonTitle>
            Expense Total: £{photos.reduce(
            (accumulator, currentValue) => parseFloat(accumulator.toString()) + parseFloat(currentValue.expense)
            , 0
          )}
          </IonTitle>
        </IonCardContent>
      </IonCard>


      <IonGrid>
        <IonRow>

          {photos.map((photo, index) => (
            <IonCard>
              <IonCardContent>
                <IonCol size="6" key={index}>
                  <IonImg src={photo.base64 ?? photo.webviewPath} />
                  <IonLabel>Timestamp: {photo.timestamp}</IonLabel>


                  <IonItem>
                    £<IonInput type="number" step="0.01" min="0" placeholder={photo.expense} onPointerLeave={e => updateChange(e.target)}></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonButton onClick={e => updateExpense(photo.filepath, expense)}>Update</IonButton>
                  </IonItem>

                </IonCol>
              </IonCardContent>

            </IonCard>
          ))}


        </IonRow>
      </IonGrid>

      <IonContent>
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
