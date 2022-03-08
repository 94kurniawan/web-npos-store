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
    id="modal-success"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-16
        border
        w-2/6
        h-auto
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="mt-3 text-center">
        <div
          class="
            mx-auto
            flex
            items-center
            justify-center
            h-12
            w-12
            rounded-full
            bg-green-100
          "
        >
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
        <div class="mt-2 px-7 py-3">
          <p v-if="value.change != undefined" class="text-sm text-gray-500">
            Pembayaran berhasil diterima
          </p>
          <p v-if="value.change == undefined" class="text-sm text-gray-500">
            Berhasil Menyimpan Pesanan
          </p>
        </div>
        <h3
          v-if="value.change != undefined"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          Kembalian {{ currency(value.change) }}
        </h3>
        <div class="items-center px-4 py-3">
          <button
            @click="closeModal()"
            class="
              px-4
              py-4
              bg-green-500
              text-white text-base
              font-medium
              rounded-md
              w-full
              shadow-sm
              hover:bg-green-600
              focus:outline-none focus:ring-2 focus:ring-green-300
            "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "ModalSuccess",
  props: {
    value: Object,
  },

  data() {
    return {};
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },

    closeModalWindow() {
      let modal = document.getElementById("modal-success");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    closeModal() {
      let modal = document.getElementById("modal-success");
      modal.style.display = "none";
    },
  },
};
</script>