<template>
    <div v-if="showModal" class="modal-backdrop">
      <div id="showModal">
        <button type="button" class = "btn btn-danger" id="closeModal" @click="showModal = false">X</button>
        <h3>Modal Title</h3>
        <p>Modal content goes here...</p>
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
    }
}
</script>

<style scoped>

#showModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: rgb(46, 151, 155);
    border: none;
    padding: 15%;
    text-align: center;
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
</style>