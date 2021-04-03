import React, { useEffect, useCallback } from 'react'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonLoading,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCardContent,
  IonLabel,
  IonTitle,
  IonText,
  IonSearchbar
} from '@ionic/react'
import { close } from 'ionicons/icons'
import { useDictionary } from 'use-dictionary'

import { getCardDetails, getCardTransactions } from '../api'
import TransactionList from '../components/TransactionList'
import StatusBadge from '../components/StatusBadge'

const initialState = {
  isLoading: true,
  details: null,
  error: null,
  transactions: [],
  filteredTransactions: [],
  searchText: ''
}

const CardDetails = ({
  onClose,
  id,
  active,
  name,
  ...rest
}) => {
  const {
    state,
    onUpdateValue
  } = useDictionary(initialState)

  useEffect(() => {
    onUpdateValue('isLoading', true)
    onUpdateValue('error', null)
    onUpdateValue('details', null)
    onUpdateValue('transactions', [])
    onUpdateValue('searchText', '')
    Promise.all([
      getCardDetails(id),
      getCardTransactions(id)
    ])
    .then(([details, transactions]) => {
      onUpdateValue('details', details)
      onUpdateValue('transactions', transactions)
    })
    .catch((error) => onUpdateValue('error', error))
    .finally(() => onUpdateValue('isLoading', false))
  }, [id, onUpdateValue])

  useEffect(() => {
    onUpdateValue('filteredTransactions', state.transactions)
  }, [state.transactions, onUpdateValue])

  const onSearch = useCallback((searchText) => {
    onUpdateValue('searchText', searchText)
    const search = searchText.trim().toLowerCase()
    onUpdateValue(
      'filteredTransactions',
      search
        ? state.transactions.filter((t) => t.label.toLowerCase().includes(search))
        : state.transactions
    )
  }, [state.transactions, onUpdateValue])

  const { isLoading, details, error, searchText, filteredTransactions } = state

  return (
    <>
      <IonCard>
        <IonCardHeader className='ion-float-right' translucent>
          <IonToolbar>
            <IonButtons slot='end'>
              <IonButton onClick={onClose}>
                <IonIcon slot='icon-only' icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid className='ion-padding'>
            <IonRow>
              <IonCol>
                <IonCard className='ion-padding'>
                  <IonCardHeader>
                    <IonCardTitle>
                      {name}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      {details && details.number}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  {!!details && (
                    <IonCardContent>
                      Exp {details.expiration_month}/{details.expiration_year} CVV {details.cvv}
                      <IonLabel color='dark' className='ion-float-right'>
                        {details.address_city}
                      </IonLabel>
                    </IonCardContent>
                  )}
                </IonCard>
              </IonCol>
              <IonCol className='ion-align-self-start ion-padding'>
                <IonTitle className='ion-no-padding'>
                  Billing Address
                </IonTitle>
                {!!details && (
                  <IonText>
                    <p>{details.address_line1}</p>
                    <p>{details.address_postal_code}</p>
                    <p>{details.address_city}, {details.address_state}</p>
                  </IonText>
                )}
                <br/>
                <StatusBadge
                  active={active}
                  disabled={!active}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSearchbar
                  mode='ios'
                  animated
                  placeholder='Search for a transaction'
                  value={searchText}
                  onIonChange={e => onSearch(e.detail.value)}
                  showCancelButton='never'
                />
                <TransactionList
                  transactions={filteredTransactions}
                  isLoading={isLoading}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      <IonAlert
        isOpen={!!error}
        header='Error loading data'
        message={error && error.message}
        buttons={['Okey']}
      />
      <IonLoading
        isOpen={isLoading}
        message={'Loading data...'}
      />
    </>
  )
}

export default CardDetails
