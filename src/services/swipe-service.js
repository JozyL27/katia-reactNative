import config from '../config';

const SwipeService = {
  getPotentialMatches(userId) {
    return fetch(`${config.API_ENDPOINT}/swipe/${userId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  addMatch(userId, id) {
    return fetch(`${config.API_ENDPOINT}/swipe/${userId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
      .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
      );
  },

  addRejection(userId, id) {
    return fetch(`${config.API_ENDPOINT}/swipe/reject/${userId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
};

export default SwipeService;
