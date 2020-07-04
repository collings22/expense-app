import React from 'react';
import {
  IonTitle, IonGrid, IonRow
} from '@ionic/react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

interface ContainerProps { }

const ExpenseTotal: React.FC<ContainerProps> = () => {
  const { photos, takePhoto } = usePhotoGallery();
    let initValue = 1;

  return (
    <div className="container">
      <IonTitle>Expense Total</IonTitle>

      <IonGrid>
        <IonRow>
          <IonTitle>
            {photos.reduce(
    (accumulator, currentValue) => accumulator + currentValue.expense
    , initValue
)}  

            </IonTitle>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ExpenseTotal;
