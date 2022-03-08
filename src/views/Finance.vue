<template>
  <div id="container" class="h-full relative bg-gray-200 grid grid-cols-12">
    <div id="leftCol" class="h-full col-span-3 bg-gray-200 overflow-y-auto">
      <side-menu />
    </div>
    <div
      class="
        relative
        h-full
        w-full
        p-3
        col-span-9
        grid grid-cols-12
        gap-2
        overflow-y-auto
      "
    >
      <div class="bg-white h-full col-span-7 overflow-y-auto pb-3">
        <div class="sticky top-0 bg-white">
          <p class="border-b-2 text-center font-bold uppercase p-2">
            Riwayat Kas Keluar
          </p>
          <div class="grid border-b-2 grid-cols-2">
            <input
              v-model="datePeriod.from"
              type="date"
              class="w-full bg-white p-3 border-r-2 outline-none"
            />
            <input
              v-model="datePeriod.to"
              type="date"
              class="w-full bg-white p-3 outline-none"
            />
          </div>
        </div>
        <div class="py-3">
          <table class="h-full w-full table-auto">
            <thead class="sticky top-20 z-10">
              <tr
                class="
                  bg-gray-100
                  text-gray-600
                  uppercase
                  text-sm
                  leading-normal
                "
              >
                <th class="py-3 px-3 text-left">TANGGAL</th>
                <th class="py-3 px-3 text-right">JUMLAH</th>
                <th class="py-3 px-3 text-left">KETERANGAN</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="(cashOut, index) in cashOutHistory.cash_outs"
                :key="cashOut.key"
                @click="options(index)"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  even:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-3 text-left">
                  <p class="font-bold">{{ formatDateInIDN(cashOut.date) }}</p>
                </td>
                <td class="py-3 px-3 text-right whitespace-nowrap">
                  {{ currency(cashOut.amount) }}
                </td>
                <td class="p-3 relative">
                  {{ cashOut.note }}
                  <button
                    @click="confirmDelete(cashOut.id)"
                    :class="{ hidden: !cashOut.hideOptions }"
                    class="
                      absolute
                      right-0
                      top-0
                      bg-red-300
                      text-red-50
                      h-full
                      px-5
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="h-full col-span-5 overflow-y-auto pb-3">
        <div class="flex justify-end">
          <button
            @click="showCashOutNote()"
            class="flex items-center justify-center p-2 bg-blue-400 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Catat Kas Keluar
          </button>
        </div>
        <div :class="{ hidden: hideCashOutNote }">
          <div class="mt-5 p-3 font-mono bg-white rounded-t-lg">
            <p class="text-center mb-3">Catat Kas Keluar</p>
            <div class="py-1">
              <label for="date" class="p-2">Tanggal</label>
              <input
                v-model="cashOutNote.date"
                type="date"
                id="date"
                class="outline-none w-full p-3 border-2 bg-white rounded"
              />
            </div>
            <div class="py-1">
              <label for="amount" class="p-2">Jumlah</label>
              <input
                v-model="cashOutNote.amount"
                type="number"
                id="amount"
                class="outline-none w-full p-3 border-2 bg-white rounded"
              />
            </div>
            <div class="py-1">
              <label for="note" class="p-2">Keterangan</label>
              <textarea
                v-model="cashOutNote.note"
                type="text"
                id="note"
                class="outline-none w-full p-3 border-2 bg-white rounded"
              />
            </div>
          </div>
          <div class="flex w-full">
            <button
              @click="closeCashOutNote()"
              class="px-10 bg-red-400 text-white"
            >
              Batal
            </button>
            <button
              @click="postCashOut()"
              class="
                flex-grow
                p-6
                bg-blue-400
                text-white
                flex
                justify-center
                items-center
                content-center
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <p class="ml-1 text-xl">Save</p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete -->
    <modal-delete @yes="deleteCashOut" />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import SideMenu from "@/views/components/SideMenu.vue";
import ModalDelete from "@/views/components/ModalDelete.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Finance",
  components: {
    SideMenu,
    ModalDelete,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },

      temporaryId: null,

      cashOutHistory: {
        cashier_info: {
          user_id: null,
          username: "",
          name: "",
          role: "",
          store_id: null,
          store_name: "",
          store_address: "",
        },
        cash_outs: [
          {
            date: "",
            amount: null,
            note: "",
          },
        ],
      },

      cashOutNote: {
        date: moment().format("YYYY-MM-DD"),
        amount: null,
        note: null,
      },

      hideCashOutNote: true,
    };
  },

  watch: {
    datePeriod: {
      handler: function (val, oldVal) {
        this.fetchCashOutHistory();
      },
      deep: true,
    },
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL");
    },
    resetCashOutNote() {
      this.cashOutNote = {
        date: moment().format("YYYY-MM-DD"),
        amount: null,
        note: null,
      };
    },
    showCashOutNote() {
      this.hideCashOutNote = false;
    },
    closeCashOutNote() {
      this.hideCashOutNote = true;
    },

    async fetchCashOutHistory() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(apiHost + "/api/store/cash-outs", {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
          },
        });
        this.cashOutHistory = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },

    async postCashOut() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.post(
          apiHost + "/api/store/cash-outs",
          this.cashOutNote,
          {
            headers,
          }
        );
        console.log(response.data.message);
        this.resetCashOutNote();
        this.fetchCashOutHistory();
      } catch (error) {
        console.log(error.response);
      }
    },

    options(index) {
      if (this.cashOutHistory.cash_outs[index].hideOptions) {
        this.cashOutHistory.cash_outs[index].hideOptions = false;
      } else {
        this.cashOutHistory.cash_outs[index].hideOptions = true;
      }
    },

    confirmDelete(id) {
      this.temporaryId = id;
      let modal = document.getElementById("modal-delete");
      modal.style.display = "block";
    },

    async deleteCashOut() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.delete(
          apiHost + "/api/store/cash-outs/" + this.temporaryId,
          {
            headers,
          }
        );
        console.log(response.data.message);
        this.temporaryId = null;
        this.fetchCashOutHistory();
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  created() {
    this.fetchCashOutHistory();
  },
};
</script>
