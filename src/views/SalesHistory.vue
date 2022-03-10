<template>
  <div id="container" class="h-full relative bg-gray-200">
    <div class="relative h-full w-full p-3 grid grid-cols-12 overflow-y-auto">
      <div class="bg-white h-full col-span-5 overflow-y-auto pb-20">
        <div class="sticky top-0">
          <input
            type="text"
            class="
              p-3
              w-full
              bg-white
              border-b-2
              text-center
              outline-none
              focus:bg-gray-100
            "
            placeholder="cari nomor kwitansi/receipt..."
          />
          <div class="grid grid-cols-2">
            <input
              @change="fetchSales()"
              v-model="datePeriod.from"
              type="date"
              class="w-full bg-white p-3 border-b-2 border-r-2 outline-none"
            />
            <input
              @change="fetchSales()"
              v-model="datePeriod.to"
              type="date"
              class="w-full bg-white p-3 border-b-2 outline-none"
            />
          </div>
        </div>
        <div class="py-3">
          <!-- <table class="h-full w-full">
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="history in salesHistory"
                :key="history.key"
                @click="showReceipt(history)"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left">
                  <p class="font-bold">
                    {{ history.payment.number }}
                  </p>
                  <p class="">
                    {{ formatDateInIDN(history.order_date) }}
                  </p>
                </td>
                <td class="py-3 px-4 text-left whitespace-nowrap">
                  <p>{{ history.customer_name }}</p>
                  <p>Table: {{ history.table_number }}</p>
                </td>
                <td class="py-3 px-4 text-right whitespace-nowrap">
                  {{ currency(history.total) }}
                </td>
              </tr>
            </tbody>
          </table> -->
          <div
            v-for="history in salesHistory"
            :key="history.key"
            @click="showReceipt(history)"
            class="
              px-4
              py-1
              grid grid-cols-11
              gap-1
              border-b
              odd:bg-gray-50
              active:bg-gray-100
            "
          >
            <div class="col-span-3 text-sm">
              <p class="truncate">{{ history.payment.number }}</p>
              <p class="text-sm text-gray-400">
                {{ formatDateInIDN(history.order_date) }}
              </p>
            </div>
            <div class="col-span-4">
              <p class="truncate">{{ history.customer_name }}</p>
              <p v-if="history.table_number" class="text-sm text-gray-400">
                {{ "TABLE :" + history.table_number }}
              </p>
            </div>
            <div class="col-span-4 text-right">
              <p class="truncate">{{ currency(history.total) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative h-full col-span-7 flex overflow-y-auto overflow-x-auto"
      >
        <div
          :class="{ hidden: hideReceipt }"
          class="relative font-mono mx-auto top-10"
        >
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
            <p class="text-center font-bold">{{ user.info.store_name }}</p>
            <p class="text-center">{{ user.info.store_address }}</p>
            <p
              class="text-center border-b-2 border-gray-400 border-dashed mt-1"
            ></p>
            <p
              class="text-center border-b-2 border-gray-400 border-dashed mb-1"
            ></p>

            <div class="flex justify-center">
              <p class="text-right">
                {{ formatDateInIDN(receipt.order_date) }} -
                {{ receipt.payment.time }}
              </p>
            </div>
            <p
              class="text-center border-b-2 border-gray-400 border-dashed my-1"
            ></p>

            <div class="grid grid-cols-2">
              <p>Nomor</p>
              <p class="text-right">{{ receipt.payment.number }}</p>
            </div>
            <div class="grid grid-cols-2">
              <p>Kasir</p>
              <p class="text-right">{{ sales.cashier.name }}</p>
            </div>
            <div v-if="receipt.customer_name != null" class="grid grid-cols-2">
              <p>Customer</p>
              <p class="text-right">{{ receipt.customer_name }}</p>
            </div>
            <div v-if="receipt.table_number != null" class="grid grid-cols-2">
              <p>Table</p>
              <p class="text-right">{{ receipt.table_number }}</p>
            </div>

            <p
              class="text-center border-b-2 border-gray-400 border-dashed my-1"
            ></p>

            <div v-for="item in receipt.items" :key="item.key">
              <div class="grid grid-flow-col grid-cols-6">
                <div class="col-span-3 font-bold">
                  <p class="truncate ...">{{ item.name }}</p>
                </div>
                <p class="text-right">x{{ item.quantity }}</p>
                <p class="col-span-2 text-right">{{ currency(item.total) }}</p>
              </div>
              <p>{{ item.variant }}</p>
              <div class="grid grid-flow-col grid-cols-6">
                <p class="col-span-4">{{ item.option }}</p>
                <p v-if="item.option_price != 0" class="col-span-2 text-right">
                  {{ item.option_price }}
                </p>
              </div>
              <div
                v-if="item.total_discount != 0"
                class="grid grid-flow-col grid-cols-6"
              >
                <p class="col-span-4">{{ item.discount_name }}</p>
                <p class="col-span-2 text-right">
                  ({{ currency(item.total_discount) }})
                </p>
              </div>
              <div class="grid grid-flow-col grid-cols-6">
                <p class="col-span-4">{{ item.sales_type }}</p>
              </div>
              <div
                v-for="cost in item.additional_costs"
                :key="cost.key"
                class="grid grid-flow-col grid-cols-6"
              >
                <p class="col-span-4">+ {{ cost.name }}</p>
                <p class="col-span-2 text-right">{{ currency(cost.total) }}</p>
              </div>
              <p class="col-span-4">{{ item.note }}</p>
            </div>

            <p
              class="text-center border-b-2 border-gray-400 border-dashed my-1"
            ></p>

            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4">SUB TOTAL</p>
              <p class="col-span-2 text-right">
                {{ currency(receipt.total_price) }}
              </p>
            </div>
            <div
              v-if="receipt.total_option != 0"
              class="grid grid-flow-col grid-cols-6 font-bold"
            >
              <p class="col-span-4">SUB TOTAL TAMBAHAN</p>
              <p class="col-span-2 text-right">
                {{ currency(receipt.total_option) }}
              </p>
            </div>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4">SUB TOTAL Disc</p>
              <p class="col-span-2 text-right">
                ({{ currency(receipt.total_discount) }})
              </p>
            </div>
            <div
              v-for="cost in receipt.additional_cost"
              :key="cost.key"
              class="grid grid-flow-col grid-cols-6 font-bold"
            >
              <p class="col-span-4">+ {{ cost.name }}</p>
              <p class="col-span-2 text-right">{{ currency(cost.total) }}</p>
            </div>

            <p
              class="text-center border-b-2 border-gray-400 border-dashed my-1"
            ></p>

            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4">TOTAL</p>
              <p class="col-span-2 text-right">{{ currency(receipt.total) }}</p>
            </div>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4 uppercase">{{ receipt.payment.type }}</p>
              <p class="col-span-2 text-right">
                {{ currency(receipt.payment.received) }}
              </p>
            </div>
            <div class="grid grid-flow-col grid-cols-6 font-bold">
              <p class="col-span-4">CHANGE</p>
              <p class="col-span-2 text-right">
                {{ currency(receipt.change) }}
              </p>
            </div>
          </div>
          <br /><br /><br /><br />
        </div>
      </div>
      <!-- Print & refund Button -->
      <div
        :class="{ hidden: hideReceipt }"
        class="absolute w-1/2 flex gap-4 justify-end bottom-3 right-4"
      >
        <button
          @click="rePrintReceipt()"
          class="
            py-4
            w-52
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
          <p class="ml-1 text-xl">rePrint Receipt</p>
        </button>
        <!-- <button
          @click="rePrintKitchen()"
          class="
            py-4
            w-52
            bg-green-400
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
          <p class="ml-1 text-xl">Print Kitchen</p>
        </button> -->
        <button
          @click="confirmDelete()"
          class="py-4 w-40 bg-red-400 text-white"
        >
          Refund
        </button>
      </div>

      <!-- modal confirm Delete -->
      <modal-delete @yes="inputKey" />

      <!-- modal input validation key -->
      <modal-input-validation-key @yes="deleteSale" />
    </div>

    <!-- side menu -->
    <button
      @click="showMenu()"
      type="submit"
      class="absolute top-6 left-4 z-20"
    >
      <svg
        v-if="showSideMenu === false"
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-if="showSideMenu === true"
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div v-if="showSideMenu === true" class="absolute h-full w-full top-0">
      <div
        id="sideMenuSalesHistory"
        @click="closeMenuWindow()"
        class="h-full bg-gray-500 bg-opacity-40 grid grid-cols-12"
      >
        <div class="h-full col-span-3 bg-gray-200 overflow-y-auto">
          <side-menu />
        </div>
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
import ModalInputValidationKey from "@/views/components/ModalInputValidationKey.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "SalesHistory",
  components: {
    SideMenu,
    ModalDelete,
    ModalInputValidationKey,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },

      sales: {
        cashier: {
          id: null,
          name: "",
          store_name: "a",
          store_address: "",
        },
        orders: [
          {
            id: 1,
            order_number: "1638785651",
            customer_name: null,
            table_number: null,
            order_date: "2021-12-06",
            items: [
              {
                id: 4,
                name: "Teh Botol",
                sku: "TH-1",
                variant: null,
                sales_type: "Dine in",
                quantity: 2,
                price: 5000,
                option: null,
                option_price: null,
                discount_name: null,
                discount_percentage: null,
                additional_costs: [
                  {
                    name: "PPN 5%",
                    percentage: 0.05,
                  },
                ],
              },
              {
                id: 3,
                name: "Air Mineral",
                sku: "MNRL-1",
                variant: null,
                sales_type: "Dine in",
                quantity: 1,
                price: 3000,
                option: null,
                option_price: null,
                discount_name: null,
                discount_percentage: null,
                additional_costs: [
                  {
                    name: "PPN 5%",
                    percentage: 0.05,
                  },
                ],
              },
              {
                id: 2,
                name: "Paket betina",
                sku: "PKTBTN-D",
                variant: "Dada",
                sales_type: "Dine in",
                quantity: 3,
                price: 20000,
                option: "Nasi TO",
                option_price: 0,
                discount_name: "50%",
                discount_percentage: 0.5,
                additional_costs: [
                  {
                    name: "PPN 5%",
                    percentage: 0.05,
                  },
                ],
              },
            ],
            payment: {
              id: 1,
              number: "PYMT-1638785651",
              date: "2021-12-06",
              type: "Cash",
              received: 100000,
            },
          },
        ],
      },

      hideReceipt: true,
      receipt: {
        id: null,
        order_number: "",
        customer_name: null,
        table_number: null,
        order_date: "",
        items: [
          // {
          //   id: 4,
          //   name: "Teh Botol",
          //   sku: "TH-1",
          //   variant: null,
          //   sales_type: "Dine in",
          //   quantity: 2,
          //   price: 5000,
          //   option: null,
          //   option_price: 0,
          //   discount_name: null,
          //   discount_percentage: 0,
          //   additional_costs: [
          //     { name: "PPN 5%", percentage: 0.05, total: 500 },
          //   ],
          //   total: 10000,
          //   total_discount: 0,
          // },
          // {
          //   id: 3,
          //   name: "Air Mineral",
          //   sku: "MNRL-1",
          //   variant: null,
          //   sales_type: "Dine in",
          //   quantity: 1,
          //   price: 3000,
          //   option: null,
          //   option_price: 0,
          //   discount_name: null,
          //   discount_percentage: 0,
          //   additional_costs: [
          //     { name: "PPN 5%", percentage: 0.05, total: 150 },
          //   ],
          //   total: 3000,
          //   total_discount: 0,
          // },
          // {
          //   id: 2,
          //   name: "Paket betina",
          //   sku: "PKTBTN-D",
          //   variant: "Dada",
          //   sales_type: "Dine in",
          //   quantity: 3,
          //   price: 20000,
          //   option: "Nasi TO",
          //   option_price: 0,
          //   discount_name: "50%",
          //   discount_percentage: 0.5,
          //   additional_costs: [
          //     { name: "PPN 5%", percentage: 0.05, total: 1500 },
          //   ],
          //   total: 60000,
          //   total_discount: 30000,
          // },
        ],
        payment: {
          // id: 1,
          // number: "PYMT-1638785651",
          // date: "2021-12-06",
          // type: "Cash",
          // received: 100000,
        },
        total_price: null,
        total_option: null,
        total_discount: null,
        additional_cost: [{ name: "", total: null }],
        total_additional_cost: null,
        total: null,
        change: null,
        store: {
          name: "", //user.info.store_name
          address: "", // user.info.store_address
          cashier_name: "", // user.info.name
        },
      },

      showSideMenu: true,
    };
  },

  computed: {
    salesHistory() {
      let arr = [];
      let user = this.sales.cashier;
      // let user = JSON.parse(localStorage.getItem("user"));
      this.sales.orders.forEach((sale) => {
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
      return arr;
    },
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL, LTS");
    },
    showMenu() {
      if (this.showSideMenu === false) {
        this.showSideMenu = true;
      } else {
        this.showSideMenu = false;
      }
    },
    closeMenuWindow() {
      let win = document.getElementById("sideMenuSalesHistory");
      if (window.event.target == win) {
        this.showSideMenu = false;
      }
    },
    resetReceipt() {
      this.receipt = {
        id: null,
        order_number: "",
        customer_name: null,
        table_number: null,
        order_date: "",
        items: [{}],
        payment: {},
        total_price: null,
        total_option: null,
        total_discount: null,
        additional_cost: [{ name: "", total: null }],
        total_additional_cost: null,
        total: null,
        change: null,
        store: {
          name: "",
          address: "",
          cashier_name: "",
        },
      };
    },
    showReceipt(receipt) {
      this.receipt = receipt;
      this.hideReceipt = false;
    },
    closeReceipt() {
      this.resetReceipt();
      this.hideReceipt = true;
    },

    rePrintReceipt() {
      console.log("re print receipt");
      let store = {
        name: this.user.info.store_name,
        address: this.user.info.store_address,
        cashier_name: this.user.info.name,
      };
      this.receipt.store = store;
      localStorage.setItem("receipt", JSON.stringify(this.receipt));

      let router = this.$router.resolve({
        name: "PrintReceipt",
      });
      window.open(router.href, "", "width=1000,height=650");
      // Android.rePrintReceipt(JSON.stringify(this.receipt));
    },

    // rePrintKitchen() {
    //   console.log("re print kitchen");
    //   let store = {
    //     name: this.user.info.store_name,
    //     address: this.user.info.store_address,
    //     cashier_name: this.user.info.name,
    //   };
    //   this.receipt.store = store;

    //   Android.rePrintKitchen(JSON.stringify(this.receipt));
    // },

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
    confirmDelete() {
      let modal = document.getElementById("modal-delete");
      modal.style.display = "block";
    },
    inputKey() {
      let modal = document.getElementById("modal-input-validation-key");
      modal.style.display = "block";
    },
    async deleteSale(key) {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.delete(
          apiHost + "/api/store/order/" + this.receipt.id,
          {
            headers,
            params: {
              key: key,
            },
          }
        );
        this.fetchSales();
        alert(response.data.message);
      } catch (error) {
        console.log(error.response.status);
        let msg = error.response.status;
        if (msg == 422) {
          alert("Validation Key Tidak Ditemukan");
        }
      }
    },
  },

  created() {
    this.fetchSales();
  },
};
</script>
