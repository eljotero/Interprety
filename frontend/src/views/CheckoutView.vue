<template>
  <div v-if="cart" class="row">
    <div class="col-75">
      <div class="container">
        <form>
          <div class="row">
            <div class="col-50">
              <h3>Billing Address</h3>
              <label for="fname"> Full Name</label>
              <input
                type="text"
                v-model="fname"
                name="firstname"
                placeholder="John M. Doe"
              />
              <label for="email"> Email</label>
              <input
                type="text"
                v-model="email"
                name="email"
                placeholder="john@example.com"
              />
              <label for="adr">Address</label>
              <input
                type="text"
                v-model="adr"
                name="addres s"
                placeholder="542 W. 15th Street"
              />
              <label for="city"> City</label>
              <input
                type="text"
                v-model="city"
                name="city"
                placeholder="New York"
              />
              <label for="state">Phone number</label>
              <input
                type="text"
                v-model="phoneNumber"
                name="phoneNumber"
                placeholder="12345789"
              />
              <label for="zip">Zip</label>
              <input
                type="text"
                v-model="zip"
                name="zip"
                placeholder="10-001"
              />
            </div>
          </div>
          <button class="btn" @click="createOrder">Finish up the order</button>
        </form>
      </div>
    </div>

    <div class="col-25">
      <div class="container">
        <h4>
          Cart
          <span class="price" style="color: black">
            <b>{{ cart.length }}</b>
          </span>
        </h4>
        <tr v-for="(product, index) in cart" :key="index" class="product-row">
          <p class="product-name">{{ product.name }}</p>
          <p class="product-quantity">{{ product.quantity }}</p>
          <p class="product-price">{{ product.price * product.quantity }}$</p>
        </tr>
        <p>
          Total
          <span class="price" style="color: black"
            ><b>{{ totalValue }}$</b></span
          >
        </p>
      </div>
    </div>
  </div>
  <div v-else style="text-align: center">
    <h1>Ups...</h1>
    <h1>Something went wrong</h1>
    <h1>Cart is empty</h1>
  </div>
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix';
export default {
  data() {
    return {
      cart: [],
      totalValue: 0,
      fname: '',
      email: '',
      adr: '',
      city: '',
      phoneNumber: '',
      zip: '',
    };
  },
  mounted() {
    this.cart = JSON.parse(this.$route.params.cart);
    this.totalValue = this.$route.params.totalValue;
  },
  methods: {
    async createOrder() {
      try {
        await axios.post(`http://localhost:3000/orders`, {
          userName: this.fname,
          userEmail: this.email,
          userPhone: parseInt(this.phoneNumber),
          orderStatus: 1,
          orderedProducts: [
            this.cart.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          ],
        });
        Notiflix.Notify.success('Order created successfully');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
}

.col-25 {
  flex: 25%;
}

.col-50 {
  flex: 50%;
}

.col-75 {
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #fae8e0;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  overflow: auto;
}

input[type='text'] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}
.btn {
  background-color: #d8a7b1;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #ef7c8e;
}

span.price {
  float: right;
  color: grey;
}
.product-row {
  display: flex;
  justify-content: space-between;
}

.product-name {
  text-align: left;
}

.product-price {
  text-align: right;
}
</style>
