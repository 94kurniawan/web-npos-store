<template>
  <!-- Table -->
  <div
    id="sendingHistory"
    class="bg-white h-5/6 w-full overflow-y-auto pb-8 hidden"
  >
    <div class="px-4 pt-2 flex justify-end w-full">
      <button
        @click="showModalSendingStocks()"
        class="
          bg-modern-green
          text-white
          p-2
          rounded
          flex
          items-center
          justify-center
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Buat Pengiriman
      </button>
    </div>
    <div class="w-full h-full overflow-x-auto">
      <table class="w-full h-full table-auto">
        <thead class="sticky top-0">
          <tr class="bg-white text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">
              Tanggal ({{ sendingHistory.length }})
            </th>
            <th class="py-3 px-6 text-left">Penerima</th>
            <th class="py-3 px-6 text-left">Item</th>
            <th class="py-3 px-6 text-left">Kasir</th>
            <th class="py-3 px-6 text-left">Keterangan</th>
          </tr>
        </thead>

        <tbody class="text-gray-800 text-sm font-light">
          <tr
            v-for="data in sendingHistory"
            :key="data.key"
            class="border-b border-gray-200 hover:bg-gray-100 align-top"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <p>{{ formatDateInIDN(data.date) }}</p>
              <div class="mt-1 flex items-center">Jam {{ data.time }}</div>
              <button
                @click="printDeliveryLetter(data)"
                class="my-2 p-2 bg-yellow-300 flex rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                surat jalan
              </button>
              <button
                @click="cancelTransferStock(data.id)"
                class="px-2 py-1 flex border-red-200 border rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Hapus
              </button>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.store_recipient_name }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <table class="w-full">
                <tbody v-for="item in data.items" :key="item.key">
                  <tr>
                    <td class="font-bold"># {{ item.name }}</td>
                    <td>-{{ item.quantity }}</td>
                  </tr>
                  <tr v-if="item.note != null">
                    <td colspan="3" class="">{{ "Note : " + item.note }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.underwriter }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.note }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Sending Stocks -->
    <modal-sending-stocks
      :rawMaterials="rawMaterials"
      @updateSendingHistory="fetchSendingHistory"
    ></modal-sending-stocks>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import ModalSendingStocks from "@/views/components/ModalSendingStocks.vue";

export default {
  name: "SendingHistory",
  components: { ModalSendingStocks },
  props: {
    datePeriod: Object,
    sendingHistory: Array,
    showSendingHistory: Boolean,
    rawMaterials: Array,
  },

  watch: {
    showSendingHistory: function (newVal, oldVal) {
      if (this.showSendingHistory === true) {
        this.show();
      } else {
        this.hide();
      }
    },
  },

  methods: {
    show() {
      let component = document.getElementById("sendingHistory");
      component.style.display = "block";
    },
    hide() {
      let component = document.getElementById("sendingHistory");
      component.style.display = "none";
    },
    formatDateInIDN(date) {
      return moment(date).format("dddd, LL");
    },
    showModalSendingStocks() {
      let modal = document.getElementById("modal-sending-stocks");
      modal.style.display = "block";
    },
    cancelTransferStock(id) {
      this.$emit("cancelTransferStock", id);
    },
    fetchSendingHistory() {
      this.$emit("fetchSendingHistory");
    },
    printDeliveryLetter(data) {
      console.log("print SJ");
      Android.printDeliveryLetter(JSON.stringify(data));
    },
  },
};
</script>
