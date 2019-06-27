const baseUrl = 'http://localhost:3000/api/bookings/'


export default{



    getBookings(){
      return fetch(baseUrl)
      .then(res => res.json())
    },

    postBooking(payload){
      return fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
    },

    deleteBooking(id){
      return fetch(baseUrl + id, {
        method: 'DELETE'
      })
    },

    updateBooking(payload){
      return fetch(baseUrl + payload._id, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
    }




}
