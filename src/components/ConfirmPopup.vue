<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-5 rounded shadow-md text-center" :style="{ width: popupWidth}">
      <slot name="displayMessage"></slot>
      <div class="mt-2 flex justify-center">
        <button @click="$emit('cancel')" class="px-2 py-1 bg-gray-300 text-black text-xs rounded m-2">Cancel</button>
        <button @click="$emit('confirm')" class="px-2 py-1 bg-red-400 text-white text-xs rounded m-2">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        popupWidth: 'auto',
      }
    },
    watch: {
      $slots: {
        immediate: true,
        handler() {
          this.$nextTick(() => {
            const popupContent = this.$el.querySelector('.bg-white');
            popupContent.style.whiteSpace = 'pre'; // 改行位置を調整
            this.popupWidth = popupContent.scrollWidth + 'px';
          });
        }
      }
    }
  };
</script>