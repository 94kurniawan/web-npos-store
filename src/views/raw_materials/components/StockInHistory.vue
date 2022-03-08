<template>
  <!-- Table -->
  <div id="stockIn" class="bg-white h-5/6 overflow-y-auto pb-16 hidden">
    <div class="px-4 pt-2 flex justify-end w-full">
      <button
        @click="showModalAddStocks()"
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
        Tambah Stok Manual
      </button>
    </div>
    <div
      v-if="
        deliveriesHistory.length == 0 &&
        receivedFromAnotherStore.length == 0 &&
        addedStocks.length == 0
      "
      class="h-4/6 w-full flex items-center justify-center"
    >
      <div class="text-center text-gray-400 text-sm">
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p>Data Tidak Ditemukan untuk Periode :</p>
        <p class="underline">
          {{ formatDateInIDN(datePeriod.from) }} s/d
          {{ formatDateInIDN(datePeriod.to) }}
        </p>
        <p class="mt-2">Silahkan coba dengan periode yang lain</p>
      </div>
    </div>
    <div class="w-full h-full overflow-x-auto">
      <table
        v-if="
          deliveriesHistory.length != 0 ||
          receivedFromAnotherStore.length != 0 ||
          addedStocks.length != 0
        "
        class="min-w-max w-full table-auto"
      >
        <thead class="sticky top-0">
          <tr class="bg-white text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">
              nomor / pengirim ({{ deliveriesHistory.length }})
            </th>
            <th class="py-3 px-6 text-left">tanggal</th>
            <th class="py-3 px-6 text-left">item</th>
            <th class="py-3 px-6 text-left">note</th>
          </tr>
        </thead>

        <tbody class="text-gray-800 text-sm font-light">
          <tr
            v-for="data in deliveriesHistory"
            :key="data.key"
            class="border-b border-gray-200 hover:bg-gray-100 align-top"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.number }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ formatDateInIDN(data.date) }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <table class="w-full">
                <tbody v-for="item in data.items" :key="item.key">
                  <tr>
                    <td class="font-bold"># {{ item.name }}</td>
                    <td>+{{ item.quantity }}</td>
                    <td>{{ item.unit }}</td>
                  </tr>
                  <!-- <tr v-if="item.note != null">
                  <td>Note: {{ item.note }}</td>
                </tr> -->
                </tbody>
              </table>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.note }}
            </td>
          </tr>
          <tr
            v-for="data in receivedFromAnotherStore"
            :key="data.key"
            class="border-b border-gray-200 hover:bg-gray-100 align-top"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.store_sender_name }}
              <p>Kasir - {{ data.underwriter }}</p>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ formatDateInIDN(data.date) }}
              <p>Jam - {{ data.time }}</p>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <table class="w-full">
                <tbody v-for="item in data.items" :key="item.key">
                  <tr>
                    <td class="font-bold"># {{ item.name }}</td>
                    <td>+{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.note }}
            </td>
          </tr>
          <tr
            v-for="data in addedStocks"
            :key="data.key"
            class="border-b border-gray-200 hover:bg-gray-100 align-top"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.number }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ formatDateInIDN(data.date) }}
              <p>Jam - {{ data.time }}</p>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <table class="w-full">
                <tbody v-for="item in data.ingredients" :key="item.key">
                  <tr>
                    <td class="font-bold"># {{ item.name }}</td>
                    <td>+{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.note }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Add stock -->
    <modal-add-stocks
      :rawMaterials="rawMaterials"
      @updateAddedStocks="updateAddedStocks"
    />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import ModalAddStocks from "@/views/components/ModalAddStocks.vue";

export default {
  components: { ModalAddStocks },
  name: "StockInHistory",
  props: {
    datePeriod: Object,
    deliveriesHistory: Array,
    receivedFromAnotherStore: Array,
    addedStocks: Array,
    showStockIn: Boolean,
    rawMaterials: Array,
  },

  watch: {
    showStockIn: function (newVal, oldVal) {
      if (this.showStockIn === true) {
        this.show();
      } else {
        this.hide();
      }
    },
  },

  methods: {
    show() {
      let component = document.getElementById("stockIn");
      component.style.display = "block";
    },
    hide() {
      let component = document.getElementById("stockIn");
      component.style.display = "none";
    },
    formatDateInIDN(date) {
      return moment(date).format("dddd, LL");
    },
    showModalAddStocks() {
      let component = document.getElementById("modal-add-stocks");
      component.style.display = "block";
    },
    updateAddedStocks() {
      this.$emit("fetchAddedStocks");
    },
  },
};
</script>
