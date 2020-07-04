import React, { useState } from 'react';
import Camera from '../components/Camera';
import Gallery from '../components/Gallery';
import ExpenseTotal from '../components/ExpenseTotal';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonActionSheet, IonInput, IonLabel, IonItem
} from '@ionic/react';

const Home: React.FC = () => {
  const { photos, takePhoto, updateExpense } = usePhotoGallery();


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
              <IonCol size="3" key={index}>
                <IonImg src={photo.base64 ?? photo.webviewPath} />
                <IonItem>
                  <IonLabel>Enter expense: £</IonLabel>
                  <IonInput type="number" step="0.01" min="0" placeholder={photo.expense > 0 ? photo.expense : 0} onIonInput={e => updateExpense(photo.filepath, e)}></IonInput>
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
