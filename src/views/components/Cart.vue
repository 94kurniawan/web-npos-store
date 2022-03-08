<template>
  <div
    id="rightCol"
    class="h-full py-3 px-3 col-span-5 bg-gray-100 overflow-y-auto"
  >
    <div class="relative h-4/5 pb-3 bg-white rounded-t-lg overflow-y-auto">
      <div class="flex mb-3 bg-white sticky top-0">
        <button
          @click="showTable()"
          class="bg-gray-400 py-3 px-4 text-center text-white"
        >
          <p v-if="header.table_number === null">+ Table</p>
          <p v-if="header.table_number != null">
            Table -
            <i class="not-italic font-bold">{{ header.table_number }}</i>
          </p>
        </button>
        <input
          @click="showListCustomer()"
          v-model="header.customer_name"
          type="text"
          onfocus="this.select();"
          class="
            flex-grow
            px-3
            text-right
            border-t-2 border-r-2 border-b-2 border-gray-400
            outline-none
          "
          placeholder="input nama customer"
        />
        <button
          @click="showSavedOrdersList()"
          class="
            bg-gray-400
            px-4
            text-center text-white
            flex
            justify-center
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <p class="ml-1 text">{{ savedOrdersList.length }}</p>
        </button>
      </div>
      <!-- customer list -->
      <div
        :class="{ hidden: hideListCustomer }"
        class="absolute top-12 right-0 w-3/4"
      >
        <table class="h-full w-full table-auto">
          <tbody class="text-gray-800 text-sm font-light">
            <tr
              v-for="cust in filterCustomer"
              :key="cust.key"
              @click="selectCustomer(cust)"
              class="border-b border-gray-200 bg-blue-50 mb-2"
            >
              <td class="py-4 px-4 text-left whitespace-nowrap">
                {{ cust.id }}
              </td>
              <td class="py-3 px-4 text-left whitespace-nowrap">
                {{ cust.name }}
              </td>
              <td class="py-3 px-4 text-left whitespace-nowrap">
                {{ cust.phone_number }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
      <div
        v-for="(item, index) in cart"
        :key="item.key"
        class="flex border-b border-gray-200"
      >
        <div
          @click="options(index)"
          class="flex-grow px-4 grid grid-cols-8 active:bg-gray-100"
        >
          <div class="col-span-4">
            <p class="truncate">{{ item.name }}</p>
            <p class="text-sm text-gray-400">
              {{ item.variant.name }}
            </p>
          </div>
          <div class="col-span-2 pl-5">
            <p>x{{ item.quantity }}</p>
          </div>
          <div class="col-span-2 text-right">
            <p>{{ currency(item.price * item.quantity) }}</p>
          </div>

          <div class="col-span-6">
            <p class="text-sm text-gray-400">
              {{ item.option.name }}
            </p>
          </div>
          <div class="col-span-2 text-right">
            <p v-if="item.option.name" class="text-sm text-gray-400">
              {{ currency(item.option.price * item.quantity) || null }}
            </p>
          </div>

          <div class="col-span-6">
            <p class="text-sm text-gray-400">
              {{ item.discount.name }}
            </p>
          </div>
          <div class="col-span-2 text-right">
            <p v-if="item.discount.name" class="text-sm text-gray-400">
              ({{
                currency(
                  item.discount.percentage *
                    item.sales_type.price *
                    item.quantity
                ) || null
              }})
            </p>
          </div>

          <div class="col-span-8">
            <p class="text-sm text-gray-400">{{ item.sales_type.name }}</p>
          </div>
          <div
            v-for="cost in item.additional_cost"
            :key="cost.key"
            class="col-span-8"
          >
            <p class="text-sm text-gray-400">
              + {{ cost.name }}({{ currency(cost.total) }})
            </p>
          </div>

          <div
            v-if="item.note != '' && item.note != null"
            class="col-span-8 py-1"
          >
            <p
              class="
                px-1
                border-2 border-gray-300
                rounded
                text-sm text-gray-400
              "
            >
              Note: {{ item.note }}
            </p>
          </div>
        </div>
        <div
          :class="{ hidden: item.hideOptions }"
          class="flex-none border-r border-gray-200"
        >
          <button
            @click="editItem(item, index)"
            class="bg-gray-500 text-white h-full px-6"
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <div :class="{ hidden: item.hideOptions }" class="flex-none">
          <button
            @click="removeItem(index)"
            class="bg-red-400 text-white h-full px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="h-1/5">
      <div class="flex h-1/2 gap-0.5 border-b-2">
        <button
          @click="testPrint()"
          class="flex flex-grow py-4 justify-center bg-gray-500 text-white"
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
          <p class="uppercase ml-1 my-auto">test print</p>
        </button>
        <button
          @click="saveOrder()"
          class="flex flex-grow justify-center py-4 bg-gray-500 text-white"
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <p class="uppercase ml-1 my-auto">Simpan Pesanan</p>
        </button>
      </div>
      <div class="flex h-1/2">
        <button
          @click="modalPayOrder('block')"
          class="flex-grow h-full bg-modern-green text-white"
        >
          <p class="">
            <i class="uppercase not-italic tracking-widest text-2xl font-bold"
              >Bayar
            </i>
            <i class="text-2xl not-italic font-normal"
              >( {{ currency(totalPay) }} )</i
            >
          </p>
        </button>
      </div>
    </div>

    <!-- Modal Table -->
    <modal-table @fill-table-number="fillTableNumber" />

    <!-- Modal Saved Orders List -->
    <modal-saved-orders-list
      :savedOrdersList="savedOrdersList"
      @select-order="selectSavedOrder"
    />

    <!-- edit item -->
    <edit-item-options
      :item="temporaryItem"
      :items="items"
      :discounts="discounts"
      @save-item="saveItem"
    ></edit-item-options>

    <!-- Pay Order -->
    <pay-order
      :totalPay="totalPay"
      :paymentTypes="paymentTypes"
      @pay="postPayment"
    ></pay-order>

    <!-- modal payment success -->
    <modal-success :value="change" />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import EditItemOptions from "@/views/components/EditItemOptions.vue";
import PayOrder from "@/views/components/PayOrder.vue";
import ModalTable from "@/views/components/ModalTable.vue";
import ModalSavedOrdersList from "@/views/components/ModalSavedOrdersList.vue";
import ModalSuccess from "@/views/components/ModalSuccess.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Cart",
  components: {
    EditItemOptions,
    PayOrder,
    ModalTable,
    ModalSavedOrdersList,
    ModalSuccess,
  },
  props: ["cart", "items", "discounts"],
  data() {
    return {
      token: localStorage.getItem("token"),
      today: moment().format("dddd, LL"),

      hideListCustomer: true,
      customers: [
        {
          id: null,
          store_id: null,
          name: "",
          phone_number: "",
          created_at: "",
          updated_at: "",
        },
      ],

      editIndex: null,
      temporaryItem: {
        name: "",
        variants: [{ id: null }], //
        variant: {}, //
        variant_id: null,
        options: [{ id: null }], //
        option: {}, //
        option_id: null,
        discount: {}, //
        discount_id: null,
        quantity: 1, //
        sales_type: {
          additional_cost: [
            {
              name: "",
            },
          ],
        }, //
        sales_type_id: null,
        price: null,
        id: null,
        sub_total: null,
        total_additional_cost: null,
        additional_cost: [
          {
            name: "",
            total: null,
          },
        ],
      },

      paymentTypes: [{ id: null, name: "" }],

      header: {
        saved_order_id: null,
        order_number: "", //timestamp
        customer_id: null,
        customer_name: null,
        table_number: null,
        order_date: moment().format("YYYY-MM-DD, h:mm:ss"),
        payment: {
          type_id: null,
          received: null,
        },
        items: [], //from orderDetails
      },

      receipt: {
        id: 4,
        order_number: 1638500945,
        customer_name: null,
        table_number: null,
        order_date: "2021-12-03",
        items: [
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
              {
                name: "PB 1",
                percentage: 0.1,
              },
            ],
          },
          {
            id: 3,
            name: "Air Mineral",
            sku: "MNRL-1",
            variant: null,
            sales_type: "Dine in",
            quantity: 3,
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
              {
                name: "PB 1",
                percentage: 0.1,
              },
            ],
          },
        ],
        payment: {
          id: 4,
          number: "PYMT-1638500945",
          date: "2021-12-03",
          type: "Cash",
          received: 50000,
        },
        total_price: 69000,
        total_option: 0,
        total_discount: 30000,
        additional_cost: [
          {
            name: "PPN 5%",
            total: 1950,
          },
          {
            name: "PB 1",
            total: 3900,
          },
        ],
        total_additional_cost: 5850,
        sub_total: 44850,
        change: 5150,
      },

      change: {},

      savedOrders: {
        id: null,
        store_id: null,
        order: {},
      },

      savedOrdersList: [],
    };
  },

  computed: {
    orderDetails() {
      let items = [];
      this.cart.forEach((item) => {
        let obj = Object.entries(item).reduce(
          (a, [k, v]) =>
            v != null &&
            typeof v != "object" &&
            k != "name" &&
            k != "hideOptions" &&
            k != "sub_total" &&
            k != "total_additional_cost"
              ? ((a[k] = v), a)
              : a,
          {}
        );
        items.push(obj);
      });

      return items;
    },

    totalPay() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.sub_total;
      });
      return total;
    },

    filterCustomer() {
      let arr = [];
      if (this.header.customer_name == "") {
        this.header.customer_name = null;
        // arr = [{ name: "Data Customer Tidak Ditemukan" }];
      } else if (this.header.customer_name == null) {
        console.log("name null ....");
      } else {
        let customer = this.header.customer_name.toLowerCase();
        arr = this.customers.filter((cust) => {
          let data = cust.name.toLowerCase();
          return data.includes(customer);
        });
      }
      return arr;
    },
  },

  methods: {
    resetTemporaryItem() {
      this.temporaryItem = {
        name: "",
        variants: [{ id: null }], //
        variant: {}, //
        variant_id: null,
        options: [{ id: null }], //
        option: {}, //
        option_id: null,
        discount: {}, //
        discount_id: null,
        quantity: 1, //
        sales_type: {
          additional_cost: [
            {
              name: "",
            },
          ],
        }, //
        sales_type_id: null,
        price: null,
        id: null,
        sub_total: null,
        total_additional_cost: null,
        additional_cost: [
          {
            name: "",
            total: null,
          },
        ],
      };
      this.editIndex = null;
    },
    resetHeader() {
      this.header = {
        order_number: "", //timestamp
        customer_id: null,
        customer_name: null,
        table_number: null,
        order_date: moment().format("YYYY-MM-DD"),
        payment: {
          type_id: null,
          received: null,
        },
        items: [], //from orderDetails
      };
      this.savedOrders = {
        id: null,
        store_id: null,
        order: {},
      };
    },

    showTable() {
      let modal = document.getElementById("modal-table");
      modal.style.display = "block";
    },

    showListCustomer() {
      this.hideListCustomer = false;
    },

    showSavedOrdersList() {
      let modal = document.getElementById("modal-saved-orders-list");
      modal.style.display = "block";
    },

    selectSavedOrder(order) {
      this.header = {
        saved_order_id: order.id,
        order_number: order.order.order_number,
        customer_id: order.order.customer_id,
        customer_name: order.order.customer_name,
        table_number: order.order.table_number,
        order_date: order.order.order_date,
        payment: {
          type_id: null,
          received: null,
        },
        items: [],
      };
      this.$emit("select-items", order.order.items);
    },

    selectCustomer(customer) {
      this.header.customer_name = customer.name;
      this.header.customer_id = customer.id;
      this.hideListCustomer = true;
    },

    fillTableNumber(number) {
      this.header.table_number = number;
    },

    options(index) {
      if (this.cart[index].hideOptions) {
        this.cart[index].hideOptions = false;
      } else {
        this.cart[index].hideOptions = true;
      }
    },

    removeItem(index) {
      this.cart.splice(index, 1);
      // let conf = confirm(`hapus data  "${name}"  ?`);
      // if (conf) {
      //   this.cart.splice(index, 1);
      // }
    },

    editItem(item, index) {
      this.editIndex = index;
      let modal = document.getElementById("edit-item");
      modal.style.display = "block";
      this.temporaryItem = Object.assign({}, item);
      // this.cart.splice(0, 2);
    },

    saveItem() {
      this.$emit("save-edit-item", this.temporaryItem, this.editIndex);
      this.resetTemporaryItem();
    },

    currency(number) {
      return numberFormat.currency(number);
    },

    thousandSeparator(number) {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
      }).format(number);
    },

    printBill() {
      // let header = Object.assign({}, this.header);
      // let items = this.cart;
      // header.items = items;
      // Android.printInvoice("printttttt");
      alert("print bill");
    },

    testPrint() {
      console.log("test print ...");
      try {
        Android.testPrint();
      } catch (error) {
        console.log("gagal mengirim print ke android");
      }
    },

    async fetchSavedOrdersList() {
      let user = JSON.parse(localStorage.getItem("user"));
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/saved-orders", {
        headers,
        params: {
          date_from: moment().format("YYYY-MM-DD"),
          date_to: moment().format("YYYY-MM-DD"),
          store_id: user.info.store_id,
          user_id: user.info.user_id,
        },
      });
      this.savedOrdersList = response.data.data;
    },

    async saveOrder() {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        let header = Object.assign({}, this.header);
        header.order_number = this.timeStamp();
        header.items = this.cart;
        this.savedOrders.store_id = user.info.store_id;
        this.savedOrders.id = header.saved_order_id;
        this.savedOrders.order = header;

        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.post(
          apiHost + "/api/store/saved-orders",
          this.savedOrders,
          {
            headers,
          }
        );
        this.change = {};
        this.modalSuccess();
        this.resetTemporaryItem();
        this.resetHeader();
        this.$emit("reset-cart");
        this.fetchSavedOrdersList();
      } catch (error) {
        console.log(error);
      }
    },

    async fetchPaymentTypes() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/payment-types", {
        headers,
      });
      this.paymentTypes = response.data.data;
    },

    async fetchCustomers() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/customers", {
        headers,
      });
      this.customers = response.data.data;
    },

    modalPayOrder(display) {
      let modal = document.getElementById("pay-order");
      modal.style.display = display;
    },

    timeStamp() {
      return (Date.now() / 1000) | 0;
    },

    modalSuccess() {
      let modal = document.getElementById("modal-success");
      modal.style.display = "block";
    },

    async postPayment(payment) {
      try {
        // this.header.saved_order_id = this.savedOrders.id;
        if (this.header.saved_order_id == null) {
          this.header.order_number = this.timeStamp();
        }
        this.header.payment.type_id = payment.type_id;
        this.header.payment.received = payment.received;
        this.header.items = this.orderDetails;
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.post(
          apiHost + "/api/store/order",
          this.header,
          {
            headers,
          }
        );
        this.modalPayOrder("none");
        this.modalSuccess();
        this.resetTemporaryItem();
        this.resetHeader();
        this.$emit("reset-cart");
        this.fetchSavedOrdersList();
        this.change = response.data.data;
        this.saveReceipt(response.data.data);
      } catch (error) {
        console.log(error);
        // alert("Gagal. silahkan coba lagi atau periksa koneksi internet");
      }
    },

    saveReceipt(receipt) {
      let user = JSON.parse(localStorage.getItem("user"));
      let data = receipt;
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
        name: user.info.store_name.toUpperCase(),
        address: user.info.store_address,
        cashier_name: user.info.name,
      };

      let dataString = JSON.stringify(data);

      localStorage.setItem("receipt", dataString);

      Android.printReceipt(dataString);
    },
  },

  mounted() {
    this.fetchPaymentTypes();
    this.fetchCustomers();
    this.fetchSavedOrdersList();
  },
};
</script>
