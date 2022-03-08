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
      z-20
    "
    id="modal-info"
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
            bg-red-100
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 class="mt-2 text-lg leading-6 font-medium text-gray-900">
          Please be Carefull !!
        </h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">{{ message }}</p>
        </div>
        <div class="flex gap-2 items-center px-4 py-3">
          <button
            @click="closeModal()"
            class="
              flex-grow
              px-8
              py-4
              bg-gray-300
              text-gray-600 text-base
              font-medium
              rounded
              shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-300
            "
          >
            keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalInfo",
  props: {
    message: String,
  },

  methods: {
    closeModal() {
      let modal = document.getElementById("modal-info");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-info");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
  },
};
</script>