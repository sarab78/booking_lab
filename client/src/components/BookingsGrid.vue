<template lang="html">
  <div id="grid">


    <div  v-for="(booking, index) in bookings" >
      <p>{{booking.name}}</p>
      <p>{{booking.email}}</p>

      <input type="checkbox" name="" :checked="booking.checkedIn" v-model='booking.checkedIn' @change="handleChange(booking)">
      <button type="button" name="button" v-on:click="handleDelete(booking._id)" >Delete Booking</button>
    </div>
  </div>

</template>




<script>
import BookingsService from '@/services/BookingsService.js'
import {eventBus} from '@/main.js'

export default {
  name: "bookings-grid",
  props: ['bookings'],
  data(){
    return{
      name: "",
      email: "",
      checkedIn: false
    }
  },

  methods: {
    handleDelete(id){
      BookingsService.deleteBooking(id)
      .then(response => eventBus.$emit('booking-deleted', id))
    },
    handleChange(booking){
      BookingsService.updateBooking(booking)
      .then(response => eventBus.$emit('booking-updated', booking))
    }
  },

  mounted(){


  }
}
</script>






<style lang="css" scoped>
#grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: white;


}
h2 {
  padding: 0;
  margin: 0;
}

.booking {
  width: 40%;
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  padding: 20px;
}

button {
  color: red;
  border: none;
  font-size: 15px;
  padding: 10px;
  margin-top: 10px;
  background: teal;

}
p {
  background: gray;
  width: 20%;
  display: block;
}

</style>
