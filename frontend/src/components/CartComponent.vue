<template>
    <div v-if="showModal" class="modal-backdrop">
      <div id="showModal">
        <button type="button" class = "btn btn-danger" id="closeModal" @click="showModal = false">X</button>
        <table class="table">
            <thead class = "thead">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in cart" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }} $</td>
                    <td> 
                        <button type="button" class="btn btn-icon btn-secondary" @click = "quantityDown(product)">
                        <span style = "font-weight: bold;"  class="visually-hidden">-</span>
                        </button>
                        <input type="number" v-model="product.quantity" min="1" max="1000" step="1" @input="validateQuantity(product)" />
                        <button type="button" class="btn btn-icon btn-secondary" @click = "quantityUp(product)">
                        <span style = "font-weight: bold;" class="visually-hidden">+</span>
                        </button>
                    </td>
                    <td> <button id = "removeFromCart" @click="removeFromCart(product)">Remove</button></td> 
                </tr>
            </tbody>
        </table>
        <label id="totalValue" for="total">Total: {{ this.evaluateTotal() }} $</label>
        <button id="checkout" @click="goToCheckout()">Proceed to checkout screen</button>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cart: [],
            showModal: false
        }
    },
    methods: {
        addToCart(product) {
            const productIndex = this.cart.findIndex(item => item.name === product.name);
            if (productIndex === -1) {
                this.cart.push({
                    ...product,
                    quantity: 1
                });
            } else {
                return;
            }
        },
        removeFromCart(product) {
            const productIndex = this.cart.findIndex(item => item.name === product.name);
            if (productIndex !== -1) {
                this.cart.splice(productIndex, 1);
            }
        }, 
        evaluateTotal() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        quantityUp(product) {
            const productIndex = this.cart.findIndex(item => item.name === product.name);
            if (productIndex !== -1) {
                this.cart[productIndex].quantity++;
            }
        },
        quantityDown(product) {
            const productIndex = this.cart.findIndex(item => item.name === product.name);
            if (productIndex !== -1) {
                if (this.cart[productIndex].quantity > 1) {
                    this.cart[productIndex].quantity--;
                }
            }
        },
        goToCheckout() {
            this.$router.push({ name: 'Checkout', params: { cart: JSON.stringify(this.cart), totalValue: this.evaluateTotal() } });
        },
        validateQuantity(product) {
            if (product.quantity < 1) {
                product.quantity = 1;
            }   
        },

    }
}

</script>

<style scoped>

#showModal {
    position: fixed;
    top: 25%;
    left: 40%;
    width: 20%;
    height: 50%;
    z-index: 1000;
    background-color: #FAE8E0;
    border: black solid 1px;
    border-radius: 10px;
}
#closeModal {
    position: absolute;
    top: 0;
    right: 0;    
    background-color: #dc3545;
    border-color: #dc3545;
    text-align: center;
}
.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.table {
    margin-left: 2%;
    margin-right: 2%;
    width: 100%;
    height: 50%;
    text-align: center;
    display: contents;
    overflow: auto;
    justify-content: space-between;
}
#removeFromCart {
    background-color: #D8A7B1;
    border-color: #EF7C8E;
}
#totalValue {
    position: absolute;
    bottom: 2%;
    right: 2%;
}
#checkout {
    position: absolute;
    bottom: 2%;
    left: 2%;
    background-color: #D8A7B1;
    border-color: #EF7C8E;
}
#checkout:hover {
    background-color: #EF7C8E;
}
</style>