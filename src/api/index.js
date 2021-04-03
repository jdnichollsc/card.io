export const getCards = () => {
  return fetch("/api/cards")
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => {
      return json
    });
}

export const getCardDetails = (cardId) => {
  return fetch(`/api/cards/${cardId}/card_details`)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => {
      return json
    });
}

export const getCardTransactions = (cardId) => {
  return fetch(`/api/cards/${cardId}/transactions`)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => {
      return json
    });
}

export const disableCard = (cardId) => {
    return fetch(`/api/cards/${cardId}/disable`, {method: 'POST'})
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => {
      return json
    });
}
