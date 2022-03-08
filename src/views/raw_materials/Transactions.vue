<template>
  <div class="h-full w-full p-3 col-span-9 overflow-y-auto">
    <div class="h-1/6 grid grid-flow-row">
      <div
        class="
          grid grid-cols-12
          auto-rows-min
          content-center
          items-center
          gap-2
        "
      >
        <div class="col-span-5"></div>
        <div class="text-right">Periode</div>
        <div class="col-span-3">
          <input
            v-model="datePeriod.from"
            class="w-full bg-white p-2 rounded focus:outline-none text-black"
            type="date"
          />
        </div>
        <div class="col-span-3">
          <input
            v-model="datePeriod.to"
            class="w-full bg-white p-2 rounded focus:outline-none text-black"
            type="date"
          />
        </div>
      </div>
      <div class="flex">
        <button
          @click="select('stockIn')"
          :class="{ 'bg-gray-500 font-bold text-white': menuSelected.stockIn }"
          class="
            flex
            items-center
            border-l border-t border-gray-300
            px-3
            rounded-t-lg
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <p class="text-center uppercase ml-2">Stok Masuk</p>
        </button>
        <button
          @click="select('return')"
          :class="{ 'bg-gray-500 font-bold text-white': menuSelected.return }"
          class="
            flex
            items-center
            border-t border-r border-gray-300
            px-3
            rounded-t-lg
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <p class="text-center uppercase ml-2">Retur Stok</p>
        </button>
        <button
          @click="select('sendStock')"
          :class="{
            'bg-gray-500 font-bold text-white': menuSelected.sendStock,
          }"
          class="
            flex
            items-center
            border-t border-r border-gray-300
            px-3
            rounded-t-lg
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
          <p class="text-center uppercase ml-2">Kirim Stok</p>
        </button>
      </div>
    </div>

    <!-- Stock In History -->
    <stock-in-history
      :datePeriod="datePeriod"
      :deliveriesHistory="deliveriesHistory"
      :receivedFromAnotherStore="receivedFromAnotherStore"
      :addedStocks="addedStocks"
      :showStockIn="menuSelected.stockIn"
      :rawMaterials="rawMaterials"
      @fetchAddedStocks="fetchAddedStocks"
    ></stock-in-history>

    <!-- Return History -->
    <return-history
      :datePeriod="datePeriod"
      :returnHistory="returnHistory"
      :showReturn="menuSelected.return"
    ></return-history>

    <!-- Sending History -->
    <sending-history
      :datePeriod="datePeriod"
      :sendingHistory="sendingHistory"
      :showSendingHistory="menuSelected.sendStock"
      :rawMaterials="rawMaterials"
      @cancelTransferStock="confirmDelete"
      @fetchSendingHistory="fetchSendingHistory"
    ></sending-history>

    <!-- Modal Delete -->
    <modal-delete @yes="cancelTransferStock" />
  </div>
</template>

<script>
// @ is an alias to /src
// import Cart from "@/views/components/Cart.vue";
// import * as numberFormat from "@/custom_package/number.js";
import StockInHistory from "@/views/raw_materials/components/StockInHistory.vue";
import ReturnHistory from "@/views/raw_materials/components/ReturnHistory.vue";
import SendingHistory from "@/views/raw_materials/components/SendingHistory.vue";
import moment from "moment";
import "moment/locale/id";
import axios from "axios";
import ModalDelete from "@/views/components/ModalDelete.vue";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Transactions",
  components: {
    StockInHistory,
    ReturnHistory,
    SendingHistory,
    ModalDelete,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),

      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },

      temporaryId: null,

      menuSelected: {
        stockIn: false,
        return: false,
        sendStock: false,
      },

      deliveriesHistory: [],
      receivedFromAnotherStore: [],
      addedStocks: [],

      returnHistory: [],

      sendingHistory: [],

      rawMaterials: [],
    };
  },

  watch: {
    datePeriod: {
      handler: function (val, oldVal) {
        this.fetchDeliveriesHistory();
        this.fetchReceivedFromAnotherStore();
        this.fetchReturnHistory();
        this.fetchSendingHistory();
        this.fetchAddedStocks();
      },
      deep: true,
    },
  },

  methods: {
    select(menu) {
      if (menu === "stockIn") {
        this.menuSelected.stockIn = true;
        this.menuSelected.return = false;
        this.menuSelected.sendStock = false;
      } else if (menu === "return") {
        this.menuSelected.stockIn = false;
        this.menuSelected.return = true;
        this.menuSelected.sendStock = false;
      } else {
        this.menuSelected.stockIn = false;
        this.menuSelected.return = false;
        this.menuSelected.sendStock = true;
      }
    },

    async fetchDeliveriesHistory() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/warehouses/deliveries", {
        headers,
        params: {
          recipient_type: "STORE",
          recipient_id: this.user.info.store_id,
          date_from: this.datePeriod.from,
          date_to: this.datePeriod.to,
        },
      });
      this.deliveriesHistory = response.data.data;
    },
    async fetchReceivedFromAnotherStore() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(
        apiHost + "/api/store/ingredients/transfer-stocks",
        {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            recipient_id: this.user.info.store_id,
          },
        }
      );
      this.receivedFromAnotherStore = response.data.data;
    },
    async fetchAddedStocks() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(
        apiHost + "/api/store/ingredients/add-stocks",
        {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            store_id: this.user.info.store_id,
          },
        }
      );
      this.addedStocks = response.data.data;
    },

    async fetchReturnHistory() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(
        apiHost + "/api/warehouses/transactions/fetch-returns",
        {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            sender_type: "STORE",
            sender_id: this.user.info.store_id,
          },
        }
      );
      this.returnHistory = response.data.data;
    },

    async fetchSendingHistory() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(
        apiHost + "/api/store/ingredients/transfer-stocks",
        {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            sender_id: this.user.info.store_id,
          },
        }
      );
      this.sendingHistory = response.data.data;
    },
    async fetchRawMaterials() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/ingredients", {
        headers,
        params: {
          store_id: this.user.info.store_id,
        },
      });
      this.rawMaterials = response.data.data;
    },

    confirmDelete(id) {
      this.temporaryId = id;
      let modal = document.getElementById("modal-delete");
      modal.style.display = "block";
    },
    async cancelTransferStock() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.delete(
          apiHost +
            "/api/store/ingredients/transfer-stocks/" +
            this.temporaryId,
          {
            headers,
          }
        );
        alert("Berhasil Membatalkan Pengiriman");
        this.fetchSendingHistory();
      } catch (error) {
        alert(error);
      }
    },
  },

  mounted() {
    this.menuSelected.stockIn = true;
    this.fetchDeliveriesHistory();
    this.fetchReceivedFromAnotherStore();
    this.fetchAddedStocks();
    this.fetchReturnHistory();
    this.fetchSendingHistory();
    this.fetchRawMaterials();
  },
};
</script>
