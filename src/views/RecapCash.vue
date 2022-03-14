<template>
  <div id="container" class="h-full relative bg-gray-200 grid grid-cols-12">
    <div id="leftCol" class="h-full col-span-3 bg-gray-200 overflow-y-auto">
      <side-menu />
    </div>
    <div class="relative h-full w-full p-3 col-span-9 overflow-y-auto">
      <div class="h-full flex overflow-y-auto overflow-x-auto">
        <div class="relative font-mono mx-auto top-10">
          <div class="absolute -top-3 -left-2 text-gray-500">
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </div>
          <div class="bg-white px-3 py-3 h-auto shadow-xl">
            <p class="text-center font-bold uppercase">
              {{ recapCash.user_info.store_name }}
            </p>
            <p class="text-center">{{ recapCash.user_info.store_address }}</p>
            <p class="text-center">
              ================================================
            </p>

            <div class="flex">
              <p>Waktu Cetak</p>
              <p class="text-right flex-grow">
                {{ formatDateTime(recapCash.access_time) }}
              </p>
            </div>
            <p class="text-center">
              ------------------------------------------------
            </p>
            <div class="flex">
              <p>Periode</p>
              <p
                v-if="recapCash.date.from != recapCash.date.to"
                class="text-right flex-grow"
              >
                {{ formatDateInIDN(recapCash.date.from) }} -
                {{ formatDateInIDN(recapCash.date.to) }}
              </p>
              <p
                v-if="recapCash.date.from === recapCash.date.to"
                class="text-right flex-grow"
              >
                {{ formatDateInIDN(recapCash.date.from) }}
              </p>
            </div>
            <div class="grid grid-cols-2">
              <p>Kasir</p>
              <p class="text-right">{{ recapCash.user_info.name }}</p>
            </div>

            <p class="text-center">
              ================================================
            </p>
            <div class="flex items-center content-center bg-red-200 w-full">
              <!-- <p class="flex-grow py-2">TAMBAH MODAL</p> -->
              <input
                v-model="pattyCash.amount"
                type="number"
                class="
                  flex-grow
                  bg-white
                  text-right
                  py-2
                  pr-3
                  outline-none
                  border border-red-200
                "
                placeholder="Jumlah Modal"
              />
              <button
                @click="postPattyCash()"
                class="flex items-center px-2 py-2 bg-blue-300 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                simpan
              </button>
            </div>
            <div class="flex items-center content-center py-3">
              <p>MODAL</p>
              <p class="text-right flex-grow">
                {{ currency(recapCash.total_patty_cash) }}
              </p>
            </div>
            <p class="text-center">
              ================================================
            </p>

            <p class="text-center">PENJUALAN</p>
            <p class="text-sm">Type Pembayaran:</p>
            <div
              v-for="sales in recapCash.total_sales"
              :key="sales.key"
              class="grid grid-flow-col grid-cols-6 font-bold"
            >
              <p class="col-span-4 uppercase">{{ sales.name }}</p>
              <p class="col-span-2 text-right">
                {{ currency(sales.total) }}
              </p>
            </div>
            <p class="text-center">
              ------------------------------------------------
            </p>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase text-right">Sub Total</p>
              <p class="col-span-2 text-right">
                {{ currency(totalSales - totalAdditionalCost) }}
              </p>
            </div>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase text-right">
                Tax &amp; Service 10%
              </p>
              <p class="col-span-2 text-right">
                {{ currency(totalAdditionalCost) }}
              </p>
            </div>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase text-right">Total</p>
              <p class="col-span-2 text-right">{{ currency(totalSales) }}</p>
            </div>
            <p class="text-center">
              ================================================
            </p>
            <p class="text-center">KAS KELUAR</p>
            <p class="text-sm">rincian (cash):</p>
            <div
              v-for="(cashOut, index) in recapCash.cash_outs"
              :key="cashOut.key"
              class="grid grid-flow-col grid-cols-6 text-sm"
            >
              <p class="col-span-4 capitalize ml-2">
                {{ ++index }}. {{ cashOut.note }}
              </p>
              <p class="col-span-2 text-right">
                ({{ currency(cashOut.amount) }})
              </p>
            </div>
            <p class="text-center">
              ------------------------------------------------
            </p>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase text-right">Total</p>
              <p class="col-span-2 text-right">
                ({{ currency(totalCashOut) }})
              </p>
            </div>

            <p class="text-center">
              ================================================
            </p>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase">SISA KAS (cash)</p>
              <p class="col-span-2 text-right">{{ currency(totalCash) }}</p>
            </div>
            <p class="text-center">
              ------------------------------------------------
            </p>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase">SISA MODAL</p>
              <p class="col-span-2 text-right">{{ currency(totalModal) }}</p>
            </div>
            <p class="text-center">
              ================================================
            </p>
          </div>
          <br /><br /><br /><br />
        </div>
      </div>

      <!-- Print & refund Button -->
      <div class="absolute w-full flex gap-4 justify-end bottom-3 right-8">
        <button
          @click="printRecapCash()"
          class="
            p-4
            w-36
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          <p class="ml-1 text-xl">Print</p>
        </button>
      </div>
    </div>
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
  name: "RecapCash",
  components: {
    SideMenu,
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
      today: moment().format("LL, h:mm:ss"),

      recapCash: {
        access_time: "",
        date: {
          from: "",
          to: "",
        },
        user_info: {},
        total_sales: [
          {
            id: null,
            name: "",
            total: null,
          },
        ],
        cash_outs: [
          {
            id: null,
            note: "",
            amount: null,
          },
        ],
        total_patty_cash: null,
      },

      pattyCash: {
        amount: null,
        date: moment().format("YYYY-MM-DD"),
      },

      sales: {
        cashier: {},
        orders: [],
      },
    };
  },

  computed: {
    totalSales() {
      let total = 0;
      this.recapCash.total_sales.forEach((sales) => {
        total += sales.total;
      });
      return total;
    },
    totalCashOut() {
      let total = 0;
      this.recapCash.cash_outs.forEach((cash) => {
        total += cash.amount || 0;
      });
      return total;
    },
    totalCash() {
      let cash = this.recapCash.total_sales[0].total;
      let total = cash - this.totalCashOut;
      if (total < 0) {
        total = 0;
      }
      return total;
    },
    totalModal() {
      let modal = +this.recapCash.total_patty_cash;
      let cash = this.recapCash.total_sales[0].total;
      let total = cash - this.totalCashOut;
      if (total < 0) {
        modal = +this.recapCash.total_patty_cash + total;
      }
      return modal;
    },
    totalAdditionalCost() {
      let arr = [];
      let sales = JSON.parse(JSON.stringify(this.sales));
      let user = sales.cashier;
      // let user = JSON.parse(localStorage.getItem("user"));
      sales.orders.forEach((sale) => {
        let data = sale;
        let totalPrice = 0;
        let totalOption = 0;
        let totalDiscount = 0;
        let additionalCost = [];
        let totalAdditionalCost = 0;

        data.items.forEach((item) => {
          if (!item.discount_percentage) {
            item.discount_percentage = 0;
          }

          if (!item.option_price) {
            item.option_price = 0;
          }

          let total = item.quantity * item.price;
          let discount = total * item.discount_percentage || 0;
          let totalAfterDiscount = total - discount;
          totalPrice += total;
          totalOption += item.option_price || 0;
          totalDiscount += discount;
          item.total = total;
          item.total_discount = discount;
          // additional cost
          item.additional_costs.forEach((cost) => {
            let obj = {
              name: cost.name,
              total: cost.percentage * totalAfterDiscount,
            };
            cost.total = obj.total;
            let findAdditionalCost = [];
            additionalCost.forEach((addCost) => {
              if (addCost.name === obj.name) {
                addCost.total += obj.total;
                findAdditionalCost.push(true);
              } else {
                findAdditionalCost.push(false);
              }
            });
            if (!findAdditionalCost.includes(true)) {
              additionalCost.push(obj);
            }
          });
        });
        // total additional cost
        additionalCost.forEach((cost) => {
          totalAdditionalCost += cost.total;
        });

        data.total_price = totalPrice;
        data.total_option = totalOption;
        data.total_discount = totalDiscount;
        data.additional_cost = additionalCost;
        data.total_additional_cost = totalAdditionalCost;
        data.total =
          totalPrice + totalOption + totalAdditionalCost - totalDiscount;
        data.change = data.payment.received - data.total;
        data.store = {
          // name: user.store_name.toUpperCase(),
          address: user.store_address,
          cashier_name: user.name,
        };
        arr.push(data);
      });
      let total = 0;
      arr.forEach((order) => {
        total += order.total_additional_cost;
      });

      return total;
    },
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("ll");
    },
    formatDateTime(date) {
      return moment(date).format("LL, LTS");
    },
    printRecapCash() {
      let recapCash = JSON.parse(JSON.stringify(this.recapCash));
      recapCash.access_time = this.formatDateTime(recapCash.access_time);
      recapCash.date.from = this.formatDateInIDN(recapCash.date.from);
      recapCash.date.to = this.formatDateInIDN(recapCash.date.to);
      let total = {
        additionalCost: this.totalAdditionalCost,
        sales: this.totalSales,
        cash_outs: this.totalCashOut,
        cash: this.totalCash,
        patty_cash: this.totalModal,
      };
      recapCash.total = total;

      localStorage.setItem("recapCash", JSON.stringify(recapCash));

      let router = this.$router.resolve({
        name: "PrintRecapCash",
      });
      window.open(router.href, "", "width=1000,height=650");
      // console.log(recapCash);
      // try {
      //   Android.printRecapCashier(JSON.stringify(recapCash));
      // } catch (error) {
      //   console.log(error.message);
      // }
    },

    async fetchRecapCash() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(apiHost + "/api/store/recap-cashier", {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
          },
        });
        this.recapCash = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },

    async postPattyCash() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        await axios.post(apiHost + "/api/store/patty-cashes", this.pattyCash, {
          headers,
        });
        this.fetchRecapCash();
        this.pattyCash.amount = null;
      } catch (error) {
        console.log(error.response);
      }
    },

    async fetchSales() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(apiHost + "/api/store/order", {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
          },
        });
        this.sales = response.data.data;
        this.closeReceipt();
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  mounted() {
    this.fetchRecapCash();
    this.fetchSales();
  },
};
</script>
