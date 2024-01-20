<template>
  <div>
    <AddCategoryComponent />
    <AddProductComponent />
  </div>
</template>

<script>
import AddCategoryComponent from '../components/AddCategoryComponent.vue'
import AddProductComponent from '../components/AddProductComponent.vue'

export default {
  components: {
    AddCategoryComponent,
    AddProductComponent
  }
}
</script>