import React from 'react'
import {
  IonItemSliding,
  IonItem,
  IonIcon,
  IonItemOptions,
  IonItemOption
} from '@ionic/react'
import { archive } from 'ionicons/icons'
import Skeleton from 'react-loading-skeleton'
import CardListItem from './CardListItem'

import './CardsList.css'

const CardsList = ({cards, selectedCardId, onClick, isLoading, onDisable}) => {
  if (isLoading) {
    return (
      <div className='CardsList'>
        <Skeleton
          className='CardsList__loadingPlaceholder'
          height={'90px'}
          count={3}
        />
      </div>
    )
  }

  return (
    <div className='CardsList'>
      {cards.map(card => (
        <IonItemSliding key={card.id}>
          <IonItem
            onClick={() => onClick(card.id)}
            lines='none'
            type='button'
          >
            <CardListItem
              name={card.name}
              network={card.network}
              last4={card.last4}
              active={card.active}
              selected={card.id === selectedCardId}
            />
          </IonItem>
          <IonItemOptions>
            {!!card.active && (
              <IonItemOption
                className='ion-margin-bottom'
                color='danger'
                onClick={() => onDisable(card.id)}
              >
                <IonIcon slot='end' icon={archive} />
                Disable
              </IonItemOption>
            )}
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </div>
  )
}

export default CardsList