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
    id="modal-sending-stocks"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-14
        border
        w-5/6
        h-5/6
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="grid grid-cols-10 h-full">
        <!-- items col -->
        <div class="col-span-7 p-3">
          <p class="text-center">Daftar Item / Bahanbaku</p>
          <div class="p-3 grid grid-flow-row grid-cols-12 gap-2">
            <div class="col-span-5">ITEM</div>
            <div class="col-span-4 text-right">JUMLAH</div>
            <div class="col-span-3 text-center">OPT</div>
          </div>
          <div
            v-for="(ingredient, index) in transferStocks.ingredients"
            :key="ingredient.key"
            class="p-3 grid grid-flow-row grid-cols-12 gap-2 odd:bg-gray-50"
          >
            <div class="col-span-5">
              <select
                class="px-2 py-2.5 w-full border-b-2"
                v-model="ingredient.warehouse_item_id"
              >
                <option
                  v-for="item in rawMaterials"
                  :key="item.key"
                  :value="item.warehouse_item_id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="col-span-4 text-right">
              <input
                v-model="ingredient.quantity"
                type="number"
                class="border-2 p-2 w-full rounded"
              />
            </div>
            <div class="col-span-3 flex items-center justify-center gap-2">
              <svg
                @click="removeItem(index)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                @click="addItem()"
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <!-- sending info col -->
        <div class="col-span-3 p-3 bg-gray-200">
          <label for="sendingDate" class="my-1">Tanggal</label>
          <input
            disabled
            v-model="transferStocks.date"
            type="date"
            class="border-2 w-full p-2 mb-2 bg-gray-100"
          />
          <label for="sendingDate" class="">Penerima</label>
          <select
            v-model="transferStocks.store_recipient_id"
            class="border-2 w-full p-2.5 mb-2 bg-gray-50"
          >
            <option
              v-for="store in user.info.stores"
              :key="store.key"
              :value="store.id"
            >
              {{ store.name }}
            </option>
          </select>
          <label for="sendingDate" class="my-1">Catatan</label>
          <textarea
            v-model="transferStocks.note"
            type="date"
            class="border-2 w-full p-2 mb-2 bg-gray-50"
          />
          <button
            @click="postTransferStocks()"
            class="
              flex
              items-center
              justify-center
              bg-modern-green
              text-white
              w-full
              py-3
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Buat Pengiriman
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import * as numberFormat from "@/custom_package/number.js";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "ModalSendingStocks",
  props: {
    rawMaterials: Array,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),

      transferStocks: {
        store_sender_id: null, // from data user > store id
        store_recipient_id: null,
        underwriter: "", // from data user > user name
        date: moment().format("YYYY-MM-DD"),
        note: "",
        ingredients: [
          {
            warehouse_item_id: null,
            quantity: null,
          },
        ],
      },
    };
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    reset() {
      this.transferStocks = {
        store_sender_id: null,
        store_recipient_id: null,
        underwriter: "",
        date: moment().format("YYYY-MM-DD"),
        note: "",
        ingredients: [
          {
            warehouse_item_id: null,
            quantity: null,
          },
        ],
      };
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-sending-stocks");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    closeModal() {
      let modal = document.getElementById("modal-sending-stocks");
      modal.style.display = "none";
    },
    addItem() {
      this.transferStocks.ingredients.push({
        warehouse_item_id: null,
        quantity: null,
      });
    },
    removeItem(index) {
      this.transferStocks.ingredients.splice(index, 1);
    },

    async postTransferStocks() {
      try {
        this.transferStocks.store_sender_id = this.user.info.store_id;
        this.transferStocks.underwriter = this.user.info.name;
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.post(
          apiHost + "/api/store/ingredients/transfer-stocks",
          this.transferStocks,
          {
            headers,
          }
        );
        alert("berhasil membuat transfer stock");
        this.closeModal();
        this.reset();
        this.$emit("updateSendingHistory");
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {},
};
</script>