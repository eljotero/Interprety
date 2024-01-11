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
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td> <button @click="removeFromCart(product)">Remove</button></td> 
                </tr>
            </tbody>
        </table>
        <label for="total">Total: {{ this.evaluateTotal() }}</label>
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
        addToCart(product, q) {
            const productIndex = this.cart.findIndex(item => item.name === product.name);
            console.log(q);
            if (productIndex === -1) {
                this.cart.push({
                    ...product,
                    quantity: q
                });
            } else {
                this.cart[productIndex].quantity += q;
            }
        },
        removeFromCart(product) {
            const productIndex = this.cart.findIndex(item => item.id === product.id);
            if (productIndex !== -1) {
                this.cart.splice(productIndex, 1);
            }
        }, 
        evaluateTotal() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }

    }
}
</script>

<style scoped>

#showModal {
    position: fixed;
    top: 40%;
    left: 40%;
    width: 20%;
    height: 20%;
    z-index: 1000;
    background-color: #FAE8E0;
    border: none;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.table {
    position: relative;
    top : 10%;
    width: 100%;
    height: 100%;
}
.table-class td {
    vertical-align: top;
}
</style>