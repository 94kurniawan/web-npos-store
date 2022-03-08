<template>
  <div
    @click="closeModalWindow()"
    class="
      hidden
      fixed
      inset-0
      bg-gray-600 bg-opacity-50
      overflow-y-auto
      h-full
      w-full
    "
    id="modal-table"
  >
    <!--modal content-->
    <div
      class="
        absolute
        top-10
        right-96
        border
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="bg-white p-5">
        <p class="text-center">Masukkan Nomor Meja</p>
        <input
          @keyup="fill()"
          v-model="tableNumber"
          onfocus="this.select();"
          type="text"
          class="p-3 border-2 rounded-lg text-center outline-none"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalTable",

  data() {
    return {
      tableNumber: null,
    };
  },

  methods: {
    fill() {
      if (this.tableNumber === "") {
        this.tableNumber = null;
      }
      this.$emit("fill-table-number", this.tableNumber);
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-table");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
  },
};
</script>