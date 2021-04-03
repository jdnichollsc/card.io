import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge
} from '@ionic/react'
import CardsList from '../components/CardsList'
import CardDetails from '../components/CardDetails'
import { getCards, disableCard } from '../api'
import './Home.css'

function Home() {
  const [selectedCardId, setSelectedCardId] = useState()
  const [cards, setCards] = useState([])
  const selectedCard = useMemo(() => cards.find(
    card => card.id === selectedCardId
  ), [cards, selectedCardId])
  const [isLoadingCards, setIsLoadingCards] = useState(false)

  const onRefresh = useCallback(() => {
    getCards()
      .then(json => {
        setIsLoadingCards(false)
        setCards(json)
      })
  }, [])

  const onDisable = useCallback((cardId) => {
    setIsLoadingCards(true)
    disableCard(cardId)
      .finally(onRefresh)
  }, [onRefresh])

  useEffect(() => {
    setIsLoadingCards(true)
    onRefresh()
  }, [onRefresh])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color='secondary'>
            Card.io
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size={selectedCard ? 'auto' : 12}>
              <IonBadge color="danger" mode='ios' className='ion-padding ion-margin ion-float-right'>
              Swipe left to disable a card
              </IonBadge>
              <CardsList
                cards={cards}
                selectedCardId={selectedCardId}
                onClick={(id) => setSelectedCardId(id)}
                isLoading={isLoadingCards}
                onDisable={onDisable}
              />
            </IonCol>
            {!!selectedCard && (
              <IonCol>
                <CardDetails
                  {...selectedCard}
                  onClose={() => setSelectedCardId()}  
                />
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Home