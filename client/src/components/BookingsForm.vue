<template lang="html">
  <div id="form">
    <h1>CodeClan Hotel</h1>
    <form v-on:submit="addBooking" id="bookings-form">
  		<h2>Add a Booking</h2>
  		<div class="formWrap">
  			<label for="name">Name:</label>
  			<input  v-model="name" type="text" id="name" />
  		</div>
  		<div class="formWrap">
  			<label for="email">Email:</label>
  			<input v-model="email" type="text" id="email" />
  		</div>
  		<div class="formWrap">
  			<label for="checkedIn">Checked in:</label>
  			<input v-model="checkedIn" type="checkbox" id="checkedIn" :checked="checkedIn" />
  		</div>

  		<input type="submit" value="Save" id="save"/>
  	</form>
  </div>
</template>

<script>
import BookingsService from '@/services/BookingsService.js'
import { eventBus } from '../main.js'

export default {
  name: 'bookings-form',
  data() {
    return {
      name: "",
      email: "",
      checkedIn: false
    }
  },

  methods: {
      addBooking(event){
        event.preventDefault()

        const payload = {
          name: this.name,
          email: this.email,
          checkedIn: this.checkedIn
        };

        BookingsService.postBooking(payload)
        .then(booking => {
          eventBus.$emit('booking-added', booking)
        })
      }
  }
}
</script>

<style lang="css" scoped>

form {
  width: 35%;
  margin: 0 auto;
  background: gray;
  padding: 10px;
  margin-bottom: 50px;
  margin-top: 10px;
  text-align: left;
}
h2 {
  margin: 10px 0;
  padding: 0;
}

/* label {
  min-width: 100%;
  display: inline-block;
} */

.formWrap {
  margin-bottom: 10px;

}
</style>
